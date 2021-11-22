import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./layout/Layout";
// Screens
import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import ViewPost from "./screens/Post/ViewPost";
import WriteArticle from "./screens/Article/WriteArticle";
import Page404 from "./screens/Page404";

export default function App() {
  toast.configure();

  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            element={<Login />}
            path="/login"
            exact
            shouldProtect={false}
          />
          <Route
            element={<SignUp />}
            path="/signUp"
            exact
            shouldProtect={false}
          />
          <Route
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            path="/profile"
          />
          <Route
            element={
              <PrivateRoute>
                <ViewPost />
              </PrivateRoute>
            }
            path="/post/:name"
          />
          <Route
            element={
              <PrivateRoute>
                <WriteArticle />
              </PrivateRoute>
            }
            path="/write"
          />
          <Route
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            path="/"
          />
          <Route element={<Navigate from="*" to="/pageNotFound" />} path="*" />
          <Route element={<Page404 />} path="/pageNotFound" />
        </Switch>
      </Layout>
    </Router>
  );
}
