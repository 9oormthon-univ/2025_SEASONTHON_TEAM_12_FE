
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeCapacitor } from "./utils/capacitor";

// Capacitor 초기화
initializeCapacitor();

createRoot(document.getElementById("root")!).render(<App />);
  