export const apiUrl = "https://mydata4life-api.igrant.io/v1/";
const orgID = '5f5238ddc67001000100f9d9'
const QRVerificationID = '5a4e8329-b2fc-461b-8b7f-dbb416ffc66c'
export const isProduction = window.location.hostname !== 'localhost';
export const ariesURL =`https://cloudagent.igrant.io/v1/${orgID}/admin` 
export const connectionsEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/connections?state=active`
export const websocketEndpoint = 'wss://demo-socket.igrant.io:443/ws/demo/';
export const createQrEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr/${QRVerificationID}`
export const qrBaseURl = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr-link/`
export const apiKey = 'ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjUyNGZhYmM2NzAwMTAwMDEwMGY5ZTUiLCJleHAiOjE2MzAzMzQ1Nzl9.mE0WH81Y40xImEcEVwhHa5KA8uaxPF4SwrZPKW-SiYc'
export const pollPatientInfoUrl = `https://cloudagent.igrant.io/v1/${orgID}/admin/present-proof/records?qr_id=`
export const covid19CredDefID = 'A3t7Wut7qgih6ZtMV1zcYH:3:CL:111:covid-19-results'
/* Issue credential template attribute
Must follow below naming convention or update code as new naming convention in mapAttributes(components->patient->patient.jsx)
Name
Phone
Email
*/