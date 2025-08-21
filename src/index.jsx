import { createRoot } from "react-dom/client";
import App from "./App";
import { SupabaseProvider } from "./context/SupabaseContext";
import "./index.css"; // only if you added Tailwind or custom CSS

const root = createRoot(document.getElementById("root"));
root.render(
  <SupabaseProvider>
    <App />
  </SupabaseProvider>
);
