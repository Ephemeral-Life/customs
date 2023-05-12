import Index from "./page/index";
import Main from "./page/main";
import Result from "./page/resultPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Main />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}