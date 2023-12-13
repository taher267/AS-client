import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Nav from "./components/Nav2";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/form" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
