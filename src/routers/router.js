import React from "react"
import SignOTP from "../features/authen/pages/SignOTP.js"

const SignUp = React.lazy(() => import("../features/authen/pages/Signup.js"))
const Login = React.lazy(() => import("../features/authen/pages/Login.js"))
const Agreement = React.lazy(() =>
  import("../features/authen/pages/Agreement.js")
)
const ForgotPassword = React.lazy(() =>
  import("../features/authen/pages/ForgotPassword.js")
)
const ResetPassword = React.lazy(() =>
  import("../features/authen/pages/ResetPassword.js")
)

const Home = React.lazy(() => import("../features//shared/pages/Home.js"))
const Test = React.lazy(() => import("../features//search/Test.js"))
const ZingChart = React.lazy(() => import("../features/shared/pages/ZingChart"))
const Search = React.lazy(() => import("../features//search/Search.js"))
const SpeechToText = React.lazy(() =>
  import("../features//search/SpeechToText.js")
)

// Những route chỉ truy xuất khi chưa đăng nhập
const publicRoute = [
  { path: "/sign-up", name: "SignUp", element: <SignUp /> },
  { path: "/login", name: "Login", element: <Login /> },
  { path: "/agreement", name: "Agreement", element: <Agreement /> },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    element: <ResetPassword />
  },
  {
    path: "/sign-otp",
    name: "Sign OTP",
    element: <SignOTP />
  },
  { path: "/", name: "Home", element: <Home /> }
]

// Những route dùng khi đã đăng nhập
const protectedRoute = []

// route dùng cho mọi trường hợp
const commonRoute = [
  { path: "/zing-chart", name: "Zing Chart", element: <ZingChart /> },
  { path: "/search", name: "Search", element: <Search /> },
  { path: "/test", name: "Test", element: <Test /> },
  { path: "/speech-2-text", name: "SpeechToText", element: <SpeechToText /> },
  { path: "/", name: "Home", element: <Home /> }
]

// Route dùng cho manager
const managerRoute = []

const routes = {
  publicRoute,
  commonRoute,
  protectedRoute,
  managerRoute
}

export default routes
