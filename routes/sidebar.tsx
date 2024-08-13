/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  checkActive?(pathname: String, route: IRoute): boolean;
  exact?: boolean;
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route);
  }

  return route?.exact
    ? pathname == route?.path
    : route?.path
    ? pathname.indexOf(route.path) === 0
    : false;
}

const routes: IRoute[] = [
  {
    path: "/example", // the url
    icon: "ChartsIcon", // the component being exported from icons/index.js
    name: "Performance Metrics", // name that appear in Sidebar
    exact: true,
  },
  {
    path: "/example/forms",
    icon: "FormsIcon",
    name: "Edit Snapshot Policy",
  },
];

export type { IRoute };
export default routes;
