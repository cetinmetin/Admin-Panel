import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
    Fields,
    Field,
    CreateForm,
    UpdateForm,
    DeleteForm, Pagination
} from "react-crud-table";

// Component's Base CSS
import "./company.css"
import { connect } from "react-redux";
import { loadCompany, addCompany, deleteCompany, updateCompany } from "../../redux/actions/company";

const CompanyScreen = ({ companies, loadCompany, addCompany, deleteCompany, updateCompany }) => {
    const [isLoading, setLoading] = React.useState(true);
    useEffect(() =>
        getCompanies(), [])

    const getCompanies = () => {
        loadCompany().then(() =>
            setLoading(false)
        )
    }
    const service = {
        fetchItems: (payload) => {
            const { activePage, itemsPerPage } = payload.pagination;
            const start = (activePage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            let result = Array.from(companies.flat());
            result = result.sort(getSorter(payload.sort));
            return Promise.resolve(result.slice(start, end));
        },
        fetchTotal: payload => {
            return Promise.resolve(companies.length);
        },
        create: async (company) => {
            setLoading(true)
            await addCompany(company.companyName, company.legalNumber, company.incorporationCountry, company.website)
            getCompanies()
            return Promise.resolve(company);
        },
        delete: data => {
            const company = companies.find(t => t._id === data._id);
            deleteCompany(company._id)
            companies = companies.filter(t => t._id !== company._id);
            getCompanies()
            return Promise.resolve(company);
        },
        update: async (data) => {
            setLoading(true)
            const company = companies.find(t => t._id === data._id);
            await updateCompany(data._id, data.companyName, data.legalNumber, data.incorporationCountry, data.website)
            getCompanies()
            return Promise.resolve(company);
        }
    }
    if (isLoading) {
        return <div className="App" style={styles.loading}>Loading...</div>;
    }
    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Companies"
                showQueryBuilder={true}
                fetchItems={(payload) =>
                    service.fetchItems(payload)
                }>
                <Fields>
                    <Field name="_id" label="Id" hideInCreateForm />
                    <Field name="companyName" label="Company Name" placeholder="Company Name" />
                    <Field name="legalNumber" label="Legal Number" placeholder="Legal Number" />
                    <Field name="incorporationCountry" label="Incorporation Country" placeholder="Incorporation Country" />
                    <Field name="website" label="Website" placeholder="Website" />
                </Fields>
                <Pagination
                    itemsPerPage={5}
                    fetchTotalOfItems={payload => service.fetchTotal(payload)}
                />
                <CreateForm
                    title="Company Creation"
                    message="Create a new company!"
                    trigger="Create Company"
                    onSubmit={company => service.create(company)}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.companyName) {
                            errors.title = "Please, provide company's title";
                        }

                        if (!values.legalNumber) {
                            errors.description = "Please, provide company's description";
                        }
                        if (!values.incorporationCountry) {
                            errors.description = "Please, provide company's description";
                        }
                        if (!values.website) {
                            errors.description = "Please, provide company's description";
                        }
                        return errors;
                    }}
                />

                <UpdateForm
                    title="Company Update Process"
                    message="Update company"
                    trigger="Update"
                    onSubmit={(company) => service.update(company)}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};

                        if (!values._id) {
                            errors.id = "Please, provide id";
                        }

                        if (!values.companyName) {
                            errors.title = "Please, provide company's title";
                        }

                        if (!values.legalNumber) {
                            errors.description = "Please, provide company's description";
                        }
                        if (!values.incorporationCountry) {
                            errors.description = "Please, provide company's description";
                        }
                        if (!values.website) {
                            errors.description = "Please, provide company's description";
                        }

                        return errors;
                    }}
                />

                <DeleteForm
                    title="Company Delete Process"
                    message="Are you sure you want to delete the company?"
                    trigger="Delete"
                    onSubmit={(company) => service.delete(company)}
                    submitText="Delete"
                    validate={(values) => {
                        const errors = {};
                        if (!values._id) {
                            errors.id = "Please, provide id";
                        }
                        return errors;
                    }}
                />
            </CRUDTable>
        </div>
    );

};
const SORTERS = {
    NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
    NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
    STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
    STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = (data) => {
    const mapper = (x) => x[data.field];
    let sorter = SORTERS.STRING_ASCENDING(mapper);

    if (data.field === "id") {
        sorter =
            data.direction === "ascending"
                ? SORTERS.NUMBER_ASCENDING(mapper)
                : SORTERS.NUMBER_DESCENDING(mapper);
    } else {
        sorter =
            data.direction === "ascending"
                ? SORTERS.STRING_ASCENDING(mapper)
                : SORTERS.STRING_DESCENDING(mapper);
    }

    return sorter;
};

const mapStateToProps = state => ({
    companies: state.company.companies,
});

export default connect(mapStateToProps, { loadCompany, addCompany, deleteCompany, updateCompany })(CompanyScreen);

const styles = {
    container: { margin: "auto", width: "fit-content", backgroundColor: "white", marginTop: "2%" },
    loading: { margin: "auto", width: "fit-content", marginTop: "12%", fontSize: 24, fontWeight: "bold" }
};



