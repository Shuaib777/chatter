import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './style.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  //if the user is not login currentUser will be empty
  const {currentUser} = useContext(AuthContext);

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={currentUser?<Home />:<Login />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;