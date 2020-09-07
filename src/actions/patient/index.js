import { patientActionTypes } from "../../actions_types";

export const addPatientSuccessfuly = (payload) => {
    return {
        type: patientActionTypes.addPatientSuccessfuly,
        payload: payload,
    };
};
export const addPatientStart = (payload) => {
    return {
        type: patientActionTypes.addPatientStart,
        payload: payload,
    };
};
export const addPatientFail = () => {
    return {
        type: patientActionTypes.addPatientFailure,
    };
};

export const getPatientConnections = () => {
    return {
        type: patientActionTypes.getPatientConnections
    }
};

export const savePatientConnections = (payload) => {
    return {
        type: patientActionTypes.addPatientStart,
        payload: payload,
    };
};
