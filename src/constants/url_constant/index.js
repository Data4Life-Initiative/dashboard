export const apiUrl = "https://mydata4life-api.igrant.io/v1/";
const orgID = '603e683c69dd720001c74f93'
export const isProduction = window.location.hostname !== 'localhost';
export const ariesURL =`https://cloudagent.igrant.io/v1/${orgID}/admin` 
export const connectionsEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/connections?state=active`
export const websocketEndpoint = 'wss://demo-socket.igrant.io:443/ws/demo/';
export const createQrEndpoint = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr/25c95bd2-15ce-4991-b928-3f9599110a7c`
export const qrBaseURl = `https://cloudagent.igrant.io/v1/${orgID}/admin/igrantio-operator/data-exchange/qr-link/`
export const apiKey = 'ApiKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MDNlNjdkYjY5ZGQ3MjAwMDFjNzRmOTAiLCJleHAiOjE2NDU4ODI0NjN9.9GxRitStk3eaggQL-lCAfY1z2cRMZlq3TPqwdTq0aSQ'
export const pollPatientInfoUrl = `https://cloudagent.igrant.io/v1/${orgID}/admin/present-proof/records?qr_id=`
export const covid19CredDefID = 'Y5nU1ngHKsKBj9xF2hH5iM:3:CL:51:test'