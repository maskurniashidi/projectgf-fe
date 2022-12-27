/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/panel",
    icon: "FormsIcon",
    name: "Panel",
  },
  {
    path: "/app/daya",
    icon: "ChartsIcon",
    name: "Penggunaan",
  },

  {
    icon: "PagesIcon",
    name: "Pengaturan",
    routes: [
      // submenu
      {
        path: "/app/user",
        name: "Pengguna",
      },
      // {
      //   path: "/app/role",
      //   name: "Role",
      // },
    ],
  },
];

export default routes;
