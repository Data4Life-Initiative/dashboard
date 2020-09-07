import { patientActionTypes } from "../../actions_types";
const initialState = {
    patient: { loading: false, connection_loading: false },
};
const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case patientActionTypes.addPatientStart:
            return { ...state, loading: true };
        case patientActionTypes.addPatientSuccessfuly:
            return { ...state, patient: action.value, loading: false };
        case patientActionTypes.addPatientFailure:
            return { ...state, patient: null, loading: false };

        case patientActionTypes.getPatientConnections:
            return { ...state, connection_loading: true };
        case patientActionTypes.getPatientConnectionsFailure:
            return { ...state, connection_loading: true, connections: [] };
        case patientActionTypes.savePatientConnections:
            return { ...state, connection_loading: true, connections: action.value };
        default:
            return state;
    }
};
export default PatientReducer;
