import { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";

import { createRouting, routes } from "./routes";
import { userService } from "./services/user.service";

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
  return <Router>{createRouting(routes)}</Router>;
}

export default App;
