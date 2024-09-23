import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage/index"
import LoginPage from "./scenes/loginPage/index"

import ProfilePage from "./scenes/profilePage/index"

const App = () => {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<LoginPage/>} />
      <Route path = "/home" element={<HomePage/>} />
      <Route path = "/profile" element={<ProfilePage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App