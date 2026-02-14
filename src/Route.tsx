import { Routes, Route } from "react-router";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";

function Router() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

      </Routes>
    </>
  );
}

export default Router;
