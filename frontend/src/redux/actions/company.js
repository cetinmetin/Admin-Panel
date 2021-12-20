import axios from "axios";
import { setAlert } from "./alert";
import {
    COMPANY_LOADED,
    COMPANY_LOADED_FAIL
} from "./actionTypes";
import { companyUrl } from "../../helper/APIUtils";

export const loadCompany = () => async dispatch => {
    try {
        const res = await axios.post(companyUrl + "/");
        dispatch({
            type: COMPANY_LOADED,
            status: res.data,
        });
    } catch (err) {
        dispatch({
            type: COMPANY_LOADED_FAIL,
        });
    }
};

export const addCompany =
    (companyName, legalNumber, incorporationCountry, website) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ companyName, legalNumber, incorporationCountry, website });
            try {
                await axios.post(companyUrl + "/add", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }
            }
        };

export const deleteCompany =
    (companyID) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ companyID });

            try {
                await axios.post(companyUrl + "/delete", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }

            }
        };

export const updateCompany =
    (companyID, companyName, legalNumber, incorporationCountry, website) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ companyID, companyName, legalNumber, incorporationCountry, website });
            try {
                await axios.post(companyUrl + "/update", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }
            }
        };