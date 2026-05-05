import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/create" element={<FormPage />} />
        <Route path="/edit/:id" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}