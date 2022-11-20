import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";

import "./App.scss";
import SwitchRoute from "routes/SwitchRoute";
import fakeData from "assets/fakeData.json";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("userList"))
      localStorage.setItem("userList", JSON.stringify(fakeData.userList));
  });

  return (
    <BrowserRouter>
      <SwitchRoute />
    </BrowserRouter>
  );
}

export default App;
