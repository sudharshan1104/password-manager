import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const container = document.getElementById("root");
const rootContainer = ReactDOM.createRoot(container);
rootContainer.render(<App />);

