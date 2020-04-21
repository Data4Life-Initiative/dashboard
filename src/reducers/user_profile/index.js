import { userActionTypes, registrationActionTypes } from "../../actions_types";
const initialState = {
  profile: null,
};
const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.userProfile:
      return { ...state, profile: action.json, loading: false };
    case registrationActionTypes.signUpStart:
      return { ...state, loading: true };
    case registrationActionTypes.signUpSuccessfuly:
      return { ...state, userRegister: action.value, loading: false };
    case registrationActionTypes.signUpFailure:
      return { ...state, userRegisterError: action.value, loading: false };
    default:
      return state;
  }
};
export default UserProfileReducer;
