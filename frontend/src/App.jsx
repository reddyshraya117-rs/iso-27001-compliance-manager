import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}