import auth from "./views/auth";
import Landing from "./views/components/Landing";
import setPassword from "./views/components/SetPassword";
import ForgotPassword from "./views/components/ForgotPassword";
import Signup from "./views/components/Signup";
import Credentials from "./views/components/Credentials.vue";
import OtpVerify from "./views/components/OtpVerify.vue";

export default [
  {
    path: "/auth",
    component: auth,
    children: [
      {
        path: "",
        redirect: "/auth/login",
      },
      {
        path: "login",
        name: "login",
        component: Landing,
      },
      {
        path: "setPassword/:token",
        name: "setPassword",
        component: setPassword,
      },
      {
        path: "reset",
        name: "reset",
        component: ForgotPassword,
      },
      {
        path: "signup",
        name: "Signup",
        component: Signup,
      },
      {
        path: "activate",
        name: "Credentials",
        component: Credentials,
      },
      {
        path: "verify/otp",
        name: "OtpVerify",
        component: OtpVerify,
      },
    ],
  },
];
