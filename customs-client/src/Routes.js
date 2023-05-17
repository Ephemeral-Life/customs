import Index from "./page/index";
import Main from "./page/main";
import Result from "./page/resultPage";
import SensitiveRulesContent from "./page/components/sensitive_rules_content";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RootRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Main />} />
        <Route path="/result" element={<Result />} />
        <Route path="/components/sensitive_rules_content" element={<SensitiveRulesContent />} />
      </Routes>
    </BrowserRouter>
  );
}