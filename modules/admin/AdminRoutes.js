import AdminSettings from "./views/AdminSettings";
import AdminUsers from "./views/AdminUsers";
import AppDashboard from "../../app/layout/AppDashboard";
import Auth from "../auth/middleware/Auth";
import Admin from "../auth/middleware/Auth";

export default [
  {
    path: "/admin",
    component: AppDashboard,
    children: [
      {
        path: "",
        redirect: "/admin/settings",
      },
      {
        path: "settings",
        name: "AdminSettings",
        components: {
          view: AdminSettings,
        },
        meta: { middleware: [Auth, Admin] },
      },
      {
        path: "user-settings",
        name: "AdminUsers",
        components: {
          view: AdminUsers,
        },
        meta: { middleware: [Auth, Admin] },
      },
    ],
  },
];
