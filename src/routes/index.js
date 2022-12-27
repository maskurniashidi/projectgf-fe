import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));

// pasien
const Panel = lazy(() => import("../pages/Panel/Panel"));
const AddPanel = lazy(() => import("../pages/Panel/AddPanel"));
const ViewPanel = lazy(() => import("../pages/Panel/ViewPanel"));
const EditPanel = lazy(() => import("../pages/Panel/EditPanel"));

// dokter
const Daya = lazy(() => import("../pages/Daya/Daya"));
const AddDaya = lazy(() => import("../pages/Daya/AddDaya"));
const ViewDaya = lazy(() => import("../pages/Daya/ViewDaya"));
const EditDaya = lazy(() => import("../pages/Daya/EditDaya"));

// setting
const Role = lazy(() => import("../pages/Settings/Role"));
const User = lazy(() => import("../pages/User/User"));
const Adduser = lazy(() => import("../pages/User/AddUser"));

// profile
const Profile = lazy(() => import("../pages/Profile/Profile"));
const EditProfile = lazy(() => import("../pages/Profile/EditProfile"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/panel", // patient
    component: Panel,
  },
  {
    path: "/panel/tambah-panel",
    component: AddPanel,
  },
  {
    path: "/panel/edit-panel/:id",
    component: EditPanel,
  },
  {
    path: `/panel/:id`,
    component: ViewPanel,
  },
  {
    path: "/daya", // Doctor
    component: Daya,
  },
  {
    path: "/daya/tambah-daya",
    component: AddDaya,
  },
  {
    path: "/daya/edit-daya/:id",
    component: EditDaya,
  },
  {
    path: "/daya/:id", // Doctor
    component: ViewDaya,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/user/add-user",
    component: Adduser,
  },
  {
    path: "/role",
    component: Role,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
];

export default routes;
