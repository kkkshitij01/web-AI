import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Generate from "./pages/Generate.jsx"
import WebsiteEditor from "./pages/WebsiteEditor.jsx"
import useGetCurrentUser from './hooks/useGetCurrentUser.js'
import { useSelector } from 'react-redux'
import Live from './pages/Live.jsx';
export const serverUrl = "http://localhost:8000"


export default function App() {
  useGetCurrentUser();
  const { userData } = useSelector(state => state.user);
  return (
    <BrowserRouter>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Home />} />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route path="/editor/:id" element={userData ? <WebsiteEditor /> : <Home />} />
        <Route path="/site/:id" element={<Live />} />
      </Routes>
    </BrowserRouter>
  )
}
