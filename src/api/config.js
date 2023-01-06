// const URL_SYSTEM_V1 = "https://music-be-api.onrender.com/api/v1"
const URL_SYSTEM_V1 = "http://localhost:5050/api/v1"
const URL = {
  BASE_API_ENDPOINT: URL_SYSTEM_V1,
  URL_REQUEST_OTP: URL_SYSTEM_V1 + "/user/request-otp",
  URL_SIGN_UP: URL_SYSTEM_V1 + "/user/sign-up",
  URL_VERIFY_OTP: URL_SYSTEM_V1 + "/user/verify-otp",
  URL_SIGN_IN: URL_SYSTEM_V1 + "/user/sign-in",
  URL_REFRESH: URL_SYSTEM_V1 + "/user/refresh"
}

export default URL
