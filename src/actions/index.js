export { getNews } from "./news";
export {
    getOtp,
    getReceivedOtp,
    verifyOtp,
    otpVerified,
    restAllOtpData,
    adminSignIn,
    adminSignInSuccessfully,
} from "./login";
export { userRegistration, userRegistrationStart } from "./registration";
export {
    getDashboardStats,
    getHotspotData,
    addLocationData,
    setCenterData,
    setInfectionStatusData,
    deleteLocation,
} from "./dashboard";
export {
    addPatientFail,
    addPatientStart,
    addPatientSuccessfuly,
} from "./patient";
