const storeAuthCredentials = ({ headers }) => {
  const credentials = {
    uid: headers["uid"],
    client: headers["client"],
    access_token: headers["access-token"],
    expiry: headers["expiry"],
    token_type: "Bearer"
  }
  sessionStorage.setItem("credentials", JSON.stringify(credentials))
}

const getAuthHeaders = async () => {
  let credentials = await JSON.parse(sessionStorage.getItem("credentials"))
  let headers = {
    ...credentials,
    "Content-type": "application/json",
    Accept: "application/json"
  }
  return headers
}


export { storeAuthCredentials, getAuthHeaders }