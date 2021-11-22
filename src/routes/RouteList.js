import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";

export default function RouteList() {
  return [
    {
      key: "Home",
      path: "/",
      name: "خانه",
      Component: Home,
    },
  ];
}
