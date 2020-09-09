import { ariesActionTypes } from "../../actions_types";
const initialState = {
    loading_schema: false, schema: [], loading_schema_detail: false, schema_detail: {},
    send_offer_response: {}, sending_offer: false, send_offer_success: false, certificate_request_status: {}
};
const AriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ariesActionTypes.getSchemaFromAries:
            return { ...state, loading_schema: true };
        case ariesActionTypes.getSchemaFromAriesFailure:
            return { ...state, schema: [], loading_schema: false };
        case ariesActionTypes.saveSchemaFromAries:
            return { ...state, schema: action.value, loading_schema: false };
        case ariesActionTypes.getSchemaDetailFromAries:
            return { ...state, loading_schema_detail: true, schema_detail:{}};
        case ariesActionTypes.getSchemaDetailFromAriesFailure:
            return { ...state, schema_detail: [], loading_schema_detail: false };
        case ariesActionTypes.saveSchemaDetailFromAries:
            return { ...state, schema_detail: action.value, loading_schema_detail: false };
        case ariesActionTypes.sendOffer:
            return { ...state, sending_offer: true, send_offer_response:{}, send_offer_success: false};
        case ariesActionTypes.sendOfferSuccess:
            return { ...state, send_offer_response: action.value, sending_offer: false, send_offer_success: true };
        case ariesActionTypes.sendOfferFailure:
            return { ...state, send_offer_response: {}, sending_offer: false, send_offer_success: false };
        case ariesActionTypes.getCertificateRequestStatus:
            return { ...state };
        case ariesActionTypes.getCertificateRequestStatusSuccess:
            return { ...state, certificate_request_status: action.value };

        default:
            return state;
    }
};
export default AriesReducer;
