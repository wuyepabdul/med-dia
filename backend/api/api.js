// POST /login?format={format} HTTP/1.1
// Host: authservice.priaid.ch
// Authorization: Bearer {api_key}:{hashed_credentials}


let url = `${this.config.getAPIURL()}/symptoms`;
this.http.get(url, { headers: headers });
let mainURL = "https://sandbox-healthservice.priaid.ch";
let token;
let language;
let format;
let symptoms;
let config_info = {
  method: "Get",
  transformRequest: [null],
  transformResponse: [null],
  URL: "",
  url: "",
  headers: {
    Accept: "application/json, text/plain, */*",
  },
};
