import { Toaster } from "react-hot-toast";
import { UsersPage } from "./components/UsersPage";

import "./App.css";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <UsersPage />
    </>
  );
}

export default App;
