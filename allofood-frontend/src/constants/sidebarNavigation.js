import React from "react";
import { MdHome, MdPerson } from "react-icons/md";
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Orders from "views/admin/orders";
import Restaurant from "views/superadmin/Restaurants";
import RTLDefault from "views/rtl/default";
import Requests from "views/superadmin/Requests";
import DeliveryRequests from "views/delivery/requests";

const allRoutes = [
  {
    name: "Main Dashboard",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: MainDashboard,
    roles: ["manager", "delivery", "superAdmin"],
  },
  {
    name: "Users",
    path: "users",
    icon: <i className="bi bi-people-fill"></i>,
    component: NFTMarketplace,
    secondary: true,
    roles: ["superAdmin"],
  },
  {
    name: "Requests",
    path: "requests",
    icon: <i class="bi bi-bell-fill"></i>,
    component: Requests,
    roles:["superAdmin"]
  },
  {
    name: "Requests",
    path: "requests",
    icon: <i class="bi bi-bell-fill"></i>,
    component: DeliveryRequests,
    roles:["delivery"]
  },
  {
    name: "Orders",
    icon: <i className="bi bi-box-seam-fill"></i>,
    path: "orders",
    component: Orders,
    roles: ["manager", "delivery"],
  },
  {
    name: "Restaurants",
    path: "restaurant",
    icon: <i className="bi bi-shop"></i>,
    component: Restaurant,
    roles: ["superAdmin"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: <i className="bi bi-grid-1x2-fill"></i>,
    component: RTLDefault,
    roles: ["superAdmin"],
  },
  {
    name: "Profile",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: Profile,
    roles: ["manager", "delivery", "superAdmin"],
  },
];

// Export the function along with routes
export const getRoutesByRole = (role) => {
  return allRoutes.filter(route => route.roles.includes(role));
};

export default allRoutes;