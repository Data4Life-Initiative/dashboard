import { registrationActionTypes } from "../../actions_types";

export const userRegistration = (payload) => {
  return {
    type: registrationActionTypes.signUpSuccessfuly,
    payload: payload,
  };
};
export const userRegistrationStart = (payload) => {
  return {
    type: registrationActionTypes.signUpStart,
    payload: payload,
  };
};
export const userRegistrationFail = () => {
  return {
    type: registrationActionTypes.signUpFailure,
  };
};
