export const apiUrl = "https://mydata4life-api.igrant.io/v1/";
export const isProduction = window.location.hostname !== 'localhost';
export const ariesURL = isProduction ? 'https://demo-aries.igrant.io/v1/issuer/5f5238ddc67001000100f9d9/admin/' :
    "https://tf-admin.igrant.io/";
export const connectionsEndpoint = isProduction ? 'https://demo-ssi.igrant.io/v1/ssi/organizations/5f5238ddc67001000100f9d9/issuer/connections/users' :
    "https://tf-admin.igrant.io/connections?state=active"
export const websocketEndpoint = 'wss://demo-socket.igrant.io:443/ws/demo/';
