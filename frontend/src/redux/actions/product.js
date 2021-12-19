import axios from "axios";
import { setAlert } from "./alert";
import {
    PRODUCT_LOADED,
    PRODUCT_LOADED_FAIL
} from "./actionTypes";
import { productUrl } from "../../helper/APIUtils";

export const loadProduct = () => async dispatch => {
    try {
        const res = await axios.post(productUrl + "/");
        dispatch({
            type: PRODUCT_LOADED,
            status: res.data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_LOADED_FAIL,
        });
    }
};

export const addProduct =
    (productName, productAmount, amountUnit, company) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ productName, productAmount, amountUnit, company });
            try {
                await axios.post(productUrl + "/add", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }
            }
        };

export const deleteProduct =
    (productID) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ productID });

            try {
                await axios.post(productUrl + "/delete", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }

            }
        };

export const updateProduct =
    (productID, productName, productAmount, amountUnit, company) =>
        async dispatch => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ productID, productName, productAmount, amountUnit, company });
            try {
                await axios.post(productUrl + "/update", body, config);

            } catch (err) {
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
                }
            }
        };