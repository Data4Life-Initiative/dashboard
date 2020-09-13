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
    "auto_remove": false,
    "auto_issue": false,
    "connection_id": payload.connection_id,
    "comment": "",
    "credential_preview": {
      "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
      "attributes": Object.keys(payload.attributes).map(key => {
        return {name: key, value: payload.attributes[key]}
      })
    },
    "cred_def_id": isProduction ? 'QfYUgB4GrLPE5U16PzbSH2:3:CL:251:default' : "AGmo1HxEdSrSeD3whBDdnV:3:CL:271:default"
  };
  return ariesAxiosInstance.post("/issue-credential/send-offer", _payload);
}

export function getCertificateRequestStatus(payload) {

  const URL = "/issue-credential/records?thread_id=" + payload;
  return ariesAxiosInstance.get(URL);
}

export function getPresentProofRecord (payload) {
  return ariesAxiosInstance.get('present-proof/records?state=verified&thread_id=' + payload.threadID)
}