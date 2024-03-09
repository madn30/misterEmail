import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import { userService } from "./services/user.service";
import { Snackbar } from "./components/SnackBar/SnackBar";
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
      <Router basename="/">{createRouting(routes)}</Router>
      <Snackbar />
    </>
  );
}

export default App;
