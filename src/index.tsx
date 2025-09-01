
import { createRoot } from "react-dom/client";
import { App } from "./app";
import '@/assets/styles/index.scss';

const root = createRoot(document.querySelector("body")!);
root.render(<App/>);
