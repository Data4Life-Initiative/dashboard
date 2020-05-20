import { patientActionTypes } from "../../actions_types";
const initialState = {
    patient: { loading: false },
};
const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case patientActionTypes.addPatientStart:
            return { ...state, loading: true };
        case patientActionTypes.addPatientSuccessfuly:
            return { ...state, patient: action.value, loading: false };
        case patientActionTypes.addPatientFailure:
            return { ...state, patient: null, loading: false };
        default:
            return state;
    }
};
export default PatientReducer;
