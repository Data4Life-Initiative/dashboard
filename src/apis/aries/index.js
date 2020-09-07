import axios from "axios";

import { ariesURL, isProduction } from "../../constants";
import { responseErrorInterceptor, requestInterceptor } from "../interceptors";


const ariesAxiosInstance = axios.create({
  baseURL: ariesURL
});
ariesAxiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);
ariesAxiosInstance.interceptors.request.use(requestInterceptor);


export function getSchemaFromAries() {
  return ariesAxiosInstance.get("/schemas/created");
}


export function getSchemaDetailFromAries(payload) {
  return ariesAxiosInstance.get("/schemas/" + payload);
}

export function sendOffer(payload) {
  console.log(payload);
  const _payload = {
    "trace": false,
    "auto_remove": true,
    "auto_issue": true,
    "connection_id": payload.connection_id,
    "comment": "",
    "credential_preview": {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
      "attributes": Object.keys(payload.attributes).map(key => {
        return {name: key, value: payload.attributes[key]}
      })
    },
    "cred_def_id": isProduction ? 'QfYUgB4GrLPE5U16PzbSH2:3:CL:251:default' : "NMja9YxbTJWXExhY2Vbv3D:3:CL:267:default"
  };
  return ariesAxiosInstance.post("/issue-credential/send-offer", _payload);
}