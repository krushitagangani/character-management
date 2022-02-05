import React from "react";

// style import
import "./assets/scss/app.scss";

// components import
import Layout from "./layout/index";
import Dashboard from "./pages/Dashboard/index";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
};

export default App;
