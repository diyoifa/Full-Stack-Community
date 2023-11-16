import Login from "./components/Login"
import NavBar from "./components/Navbar"
// import useUser from './hooks/useUser'
import { Toaster } from "@/components/ui/toaster"

import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

function App() {
  // const {user} = useUser()
  
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        {/* ...otros componentes Route... */}
        <Route path="/" element={<h1 className="text-center mt-10 bg-gradient">Landing page</h1>}/>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App