import AppDashboard from "../../app/layout/AppDashboard";
import Dashboard from "./views/Dashboard";
import Auth from "../auth/middleware/Auth";
import Admin from "../auth/middleware/Auth";
import JobDescription from "./components/JobDescription";
import Contract from "./components/Contract";
import ContractDocument from "./components/contracts/viewContract.vue";
import contractLetter from "./components/contracts/viewContractLetter.vue";

export default [
  {
    path: "/dashboard",
    component: AppDashboard,
    children: [
      {
        path: "",
        redirect: "/dashboard/main",
      },
      {
        path: "main",
        components: {
          view: Dashboard,
        },
        meta: {
          middleware: Auth,
          breadcrumb: [
            { text: "Dashboard", disabled: false, href: "/dashboard/main" },
          ],
        },
      },
      {
        path: "job-description:position",
        name: "JobDescription",
        components: {
          view: JobDescription,
        },
      },
      {
        path: "contract",
        name: "Contract",
        components: {
          view: Contract,
        },
      },
      {
        path: "contract/document/:contractNo",
        name: "ContractDocument",
        components: {
          view: ContractDocument,
        },
      },
      {
        path: "contract/letter/:contractNo",
        name: "ContractLetter",
        components: {
          view: contractLetter,
        },
      },
    ],
  },
];
