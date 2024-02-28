import "./App.css";

import { HashRouter as Router } from 'react-router-dom';
import { createRouting, routes } from "./routes";

function App() {

  return (
    <Router>
      {createRouting(routes)}
    </Router>
  );
}

export default App;
