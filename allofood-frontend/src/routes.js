import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import RTLDefault from "views/rtl/default";


// Icon Imports
import {
  MdHome,
  MdPerson,
} from "react-icons/md";
import Orders from "views/admin/orders";
import Requests from "views/superadmin/Requests";
import Restaurants from "views/superadmin/Restaurants";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <i class="bi bi-people-fill"></i>,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Orders",
    layout: "/admin",
    icon: <i class="bi bi-box-seam-fill"></i>,
    path: "orders",
    component: <Orders />,
  },
  {
    name: "Requests",
    layout: "/admin",
    path: "Requests",
    icon: <i class="bi bi-bell-fill"></i>,
    component: <Requests />,
  },
  {
    name: "Restaurants",
    layout: "/admin",
    path: "Restaurants",
    icon: <i class="bi bi-shop"></i>,
    component: <Restaurants />,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "categories",
    icon: <i class="bi bi-grid-1x2-fill"></i>,
    component: <RTLDefault />,
  },
  {
    name: "Admin",
    layout: "/admin",
    path: "default",
    icon: <i class="bi bi-person-fill-lock"></i>,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default routes;
