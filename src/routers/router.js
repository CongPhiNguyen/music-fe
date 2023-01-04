import React from "react"
import SignOTP from "../features/authen/pages/SignOTP.js"
import Radio from "../features/radio/pages/Radio.js"
import UserProfile from "../features/shared/components/UserProfile.js"
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

const MainHomeZingChart = React.lazy(() =>
  import("../features/shared/components/MainHomeZingChart")
)
const MainHome = React.lazy(() =>
  import("../features/shared/components/MainHome")
)
const Interactive = React.lazy(() =>
  import("../features/interactive/Interactive.js")
)
const SingerPage = React.lazy(() =>
  import("../features/shared/pages/SingerPage")
)
const SongPage = React.lazy(() =>
  import("../features/shared/pages/SongPage.js")
)
const Search = React.lazy(() => import("../features/shared/pages/Search"))
const Home = React.lazy(() => import("../features/shared/pages/Home.js"))
const Playlist = React.lazy(() =>
  import("../features/shared/pages/Playlist.js")
)

const mainRoute = [
  { path: "/", name: "Home", element: <MainHome /> },
  { path: "/home", name: "Home", element: <MainHome /> },
  { path: "/zing-chart", name: "Home", element: <MainHomeZingChart /> },
  { path: "/search", name: "Home", element: <Search /> },
  { path: "/singer", name: "Singer", element: <SingerPage /> }
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
  },
  {
    path: "/sign-otp/:id",
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
  { path: "/", name: "home", element: <Home /> },
  { path: "/personal", name: "personal", element: <MainHome /> },
  { path: "/zing-chart", name: "zing chart", element: <MainHomeZingChart /> },
  { path: "/search", name: "search", element: <Search /> },
  { path: "/singer", name: "Singer", element: <SingerPage /> },
  { path: "/song", name: "Song", element: <SongPage /> },
  { path: "/radio", name: "Radio", element: <Radio /> },
  { path: "/user-profile", name: "User Profile", element: <UserProfile /> },
  {
    path: "/home",
    name: "Home",
    element: <Home />
  },
  {
    path: "/playlist/:id",
    name: "playlist",
    element: <Playlist />
  },
  { path: "*", name: "personal", element: <MainHome /> }
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
