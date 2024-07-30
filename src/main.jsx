import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvytbfghlaspcuvbtwck.supabase.co";
const supabaseKey = import.meta.env.VITE_APIKEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
