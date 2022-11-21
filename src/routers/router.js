import React from "react"
import SignOTP from "../features/authen/pages/SignOTP.js"
import Test from "../features/test/Test.js"

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

// const Home = React.lazy(() => {
//   import("../features/shared/pages/Home.js")
// })

const MainHomeZingChart = React.lazy(() =>
  import("../features/shared/components/MainHomeZingChart")
)
const MainHome = React.lazy(() =>
  import("../features/shared/components/MainHome")
)
const Interactive = React.lazy(() =>
  import("../features/interactive/Interactive.js")
)

const mainRoute = [
  { path: "/", name: "Home", element: <MainHome /> },
  { path: "/home", name: "Home", element: <MainHome /> },
  { path: "/zing-chart", name: "Home", element: <MainHomeZingChart /> }
]

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
  }
]

// Những route dùng khi đã đăng nhập
const protectedRoute = [
  { path: "/interactive", name: "Lofi", element: <Interactive /> },
  { path: "/test", name: "Test", element: <Test /> }
]

// route dùng cho mọi trường hợp
const commonRoute = [
  { path: "/", name: "Home1", element: <MainHome /> },
  { path: "/home", name: "Home", element: <MainHome /> },
  { path: "/zing-chart", name: "Home", element: <MainHomeZingChart /> }
]

// Route dùng cho manager
const managerRoute = []

const routes = {
  publicRoute,
  commonRoute,
  protectedRoute,
  managerRoute,
  mainRoute
}

export default routes
