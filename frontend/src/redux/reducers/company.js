import {
    COMPANY_LOADED,
    COMPANY_LOADED_FAIL
} from "../actions/actionTypes";

const initialState = {
    loading: true,
    companies: []
};

export default function (payload = initialState, action) {

    switch (action.type) {
        case COMPANY_LOADED:
            return {
                ...payload,
                loading: false,
                companies: [...action.status],
            };
        case COMPANY_LOADED_FAIL:
            return {
                ...payload,
                companies: payload.products,
                loading: false,
            };
        default:
            return payload;
    }
}