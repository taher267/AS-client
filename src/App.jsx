import { Toaster } from "react-hot-toast";
import "./App.css";
import Nav from "./components/Nav2";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes />
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default App;
