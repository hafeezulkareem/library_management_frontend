import { createRoot } from "react-dom/client";

import "@atlaskit/css-reset";

import App from "./App.tsx";
import { FlagsProvider } from "@atlaskit/flag";

createRoot(document.getElementById("root")!).render(
   <FlagsProvider>
      <App />
   </FlagsProvider>
);
