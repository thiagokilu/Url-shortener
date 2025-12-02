import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Page";
import Analytics from "./Pages/Dashboard/Page";
import Menu from "./Components/Menu/Menu";

export default function App() {
  const userAgent = navigator.userAgent;
  let device = "Desconhecido";

  if (/Windows/i.test(userAgent)) device = "Windows";
  else if (/Linux/i.test(userAgent)) device = "Linux";
  else if (/Android/i.test(userAgent)) device = "Android";
  else if (/iPhone|iPad|iOS/i.test(userAgent)) device = "iOS";
  else if (/Mac/i.test(userAgent)) device = "MacOS";

  console.log(device);
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}
