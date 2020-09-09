import { ariesActionTypes } from "../../actions_types";

export const getSchemaFromAries = (payload) => {
    return {
        type: ariesActionTypes.getSchemaFromAries,
        payload: payload,
    };
};
export const getSchemaFromAriesFailure = (payload) => {
    return {
        type: ariesActionTypes.getSchemaFromAriesFailure,
        payload: payload,
    };
};

export const saveSchemaFromAries = (payload) => {
    return {
        type: ariesActionTypes.saveSchemaFromAries,
        payload: payload,
    };
};


export const getSchemaDetailFromAries = (payload) => {
    return {
        type: ariesActionTypes.getSchemaDetailFromAries,
        payload: payload,
    };
};
export const getSchemaDetailFromAriesFailure = (payload) => {
    return {
        type: ariesActionTypes.getSchemaDetailFromAriesFailure,
        payload: payload,
    };
};

export const saveSchemaDetailFromAries = (payload) => {
    return {
        type: ariesActionTypes.saveSchemaDetailFromAries,
        payload: payload,
    };
};

export const sendOffer = (payload) => {
    return {
        type: ariesActionTypes.sendOffer,
        payload: payload,
    };
};
export const sendOfferFailure = (payload) => {
    return {
        type: ariesActionTypes.sendOfferFailure,
        payload: payload,
    };
};

export const sendOfferSuccess = (payload) => {
    return {
        type: ariesActionTypes.sendOfferSuccess,
        payload: payload,
    };
};

export const getCertificateRequestStatus = (payload) => {
    return {
        type: ariesActionTypes.getCertificateRequestStatus,
        payload: payload,
    };
};
export const getCertificateRequestStatusFailure = (payload) => {
    return {
        type: ariesActionTypes.getCertificateRequestStatusFailure,
        payload: payload,
    };
};

export const getCertificateRequestStatusSuccess = (payload) => {
    return {
        type: ariesActionTypes.getCertificateRequestStatusSuccess,
        payload: payload,
    };
};