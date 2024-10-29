export const filterRoutesByRole = (routes, role) => {
  return routes.filter(route => route.roles.includes(role));
};