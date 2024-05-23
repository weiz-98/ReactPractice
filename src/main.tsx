import React from "react";
import ReactDOM from "react-dom/client";
import FormComponent from "./component/FormComponent";
import TablePage from "./component/aggrid";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TablePage />
    <BrowserRouter>
      <FormComponent />
    </BrowserRouter>
  </React.StrictMode>
);
