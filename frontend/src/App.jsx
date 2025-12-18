
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Protected from './components/Protected'
import DashboardPage from './pages/DashboardPage'


function App() {

  return (
   <Routes>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/dashboard" element={
      <Protected>
        <DashboardPage/>
      </Protected>}/>
   </Routes>
  )
}

export default App
