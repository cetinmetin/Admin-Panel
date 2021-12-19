import {
    PRODUCT_LOADED,
    PRODUCT_LOADED_FAIL
} from "../actions/actionTypes";

const initialState = {
    loading: true,
    products: []
};

export default function (payload = initialState, action) {

    switch (action.type) {
        case PRODUCT_LOADED:
            return {
                ...payload,
                loading: false,
                products: [...action.status],
            };
        case PRODUCT_LOADED_FAIL:
            return {
                ...payload,
                products: payload.products,
                loading: false,
            };
        default:
            return payload;
    }
}
