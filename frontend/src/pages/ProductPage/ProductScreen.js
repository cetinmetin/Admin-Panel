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
import "./product.css"
import { connect } from "react-redux";
import { loadProduct, addProduct, deleteProduct, updateProduct } from "../../redux/actions/product";

const ProductScreen = ({ products, loadProduct, addProduct, deleteProduct, updateProduct }) => {
    const [isLoading, setLoading] = React.useState(true);
    useEffect(() =>
        getProducts(), [])

    const getProducts = () => {
        loadProduct().then(() =>
            setLoading(false)
        )
    }
    const service = {
        fetchItems: (payload) => {
            const { activePage, itemsPerPage } = payload.pagination;
            const start = (activePage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            let result = Array.from(products.flat());
            result = result.sort(getSorter(payload.sort));
            return Promise.resolve(result.slice(start, end));
        },
        fetchTotal: payload => {
            return Promise.resolve(products.length);
        },
        create: async (product) => {
            setLoading(true)
            console.log(product.productName, product.productAmount, product.amountUnit, product.company)
            await addProduct(product.productName, product.productAmount, product.amountUnit, product.company)
            getProducts()
            return Promise.resolve(product);
        },
        delete: data => {
            const product = products.find(t => t._id === data._id);
            deleteProduct(product._id)
            products = products.filter(t => t._id !== product._id);
            getProducts()
            return Promise.resolve(product);
        },
        update: async (data) => {
            setLoading(true)
            const product = products.find(t => t._id === data._id);
            await updateProduct(data._id, data.productName, data.productAmount, data.amountUnit, data.company)
            getProducts()
            return Promise.resolve(product);
        }
    }
    if (isLoading) {
        return <div className="App" style={styles.loading}>Loading...</div>;
    }
    return (
        <div style={styles.container}>
            <CRUDTable
                caption="Products"
                showQueryBuilder={true}
                fetchItems={(payload) =>
                    service.fetchItems(payload)
                }>
                <Fields>
                    <Field name="_id" label="Id" hideInCreateForm />
                    <Field name="productName" label="Product Name" placeholder="Product Name" />
                    <Field name="productAmount" label="Product Amount" placeholder="Product Amount" />
                    <Field name="amountUnit" label="Amount Unit" placeholder="Amount Unit" />
                    <Field name="company" label="Company" placeholder="Company" />
                </Fields>
                <Pagination
                    itemsPerPage={5}
                    fetchTotalOfItems={payload => service.fetchTotal(payload)}
                />
                <CreateForm
                    title="Product Creation"
                    message="Create a new product!"
                    trigger="Create Product"
                    onSubmit={product => service.create(product)}
                    submitText="Create"
                    validate={(values) => {
                        const errors = {};
                        if (!values.productName) {
                            errors.title = "Please, provide product's title";
                        }

                        if (!values.productAmount) {
                            errors.description = "Please, provide product's description";
                        }
                        if (!values.amountUnit) {
                            errors.description = "Please, provide product's description";
                        }
                        if (!values.company) {
                            errors.description = "Please, provide product's description";
                        }
                        return errors;
                    }}
                />

                <UpdateForm
                    title="Product Update Process"
                    message="Update product"
                    trigger="Update"
                    onSubmit={(product) => service.update(product)}
                    submitText="Update"
                    validate={(values) => {
                        const errors = {};

                        if (!values._id) {
                            errors.id = "Please, provide id";
                        }

                        if (!values.productName) {
                            errors.title = "Please, provide product's title";
                        }

                        if (!values.productAmount) {
                            errors.description = "Please, provide product's description";
                        }
                        if (!values.amountUnit) {
                            errors.description = "Please, provide product's description";
                        }
                        if (!values.company) {
                            errors.description = "Please, provide product's description";
                        }

                        return errors;
                    }}
                />

                <DeleteForm
                    title="Product Delete Process"
                    message="Are you sure you want to delete the product?"
                    trigger="Delete"
                    onSubmit={(product) => service.delete(product)}
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
    products: state.product.products,
});

export default connect(mapStateToProps, { loadProduct, addProduct, deleteProduct, updateProduct })(ProductScreen);

const styles = {
    container: { margin: "auto", width: "fit-content", backgroundColor: "white", marginTop: "2%" },
    loading: { margin: "auto", width: "fit-content", marginTop: "12%", fontSize: 24, fontWeight:"bold" }
};



