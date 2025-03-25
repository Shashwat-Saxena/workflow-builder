import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import workFlowReducer from "../src/redux/workFlowSlice";

import Sidebar from "./component/Sidebar";
// import WorkflowCanvas from "./components/WorkflowCanvas";
import WorkFlowCanvas from "./component/workFlowCanva";

const store = configureStore({ reducer: { workflow: workFlowReducer } });

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <Sidebar/>
        <WorkFlowCanvas/>
      </div>
    </Provider>
  );
}

export default App;