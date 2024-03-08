import { useEffect } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import { createRouting, routes } from "./routes";
import { userService } from "./services/user.service";
import { Snackbar } from "./components/SnackBar/SnackBar";
import EmailIndex from "./pages/EmailIndex/EmailIndex";
import EmailCompose from "./components/Emails/EmailCompose/EmailCompose";
import EmailDetails from "./pages/EmailDetails/EmailDetails";
import { createRouting, routes } from "./routes";

function App() {
  useEffect(() => {
    const loadUser = async () => {
      try {
        await userService.query();
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, []);

  return (
    <>
      <Router basename="/">
        {createRouting(routes)}
      </Router>
      <Snackbar />
    </>
  );
}

export default App;
