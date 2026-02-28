import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import useGetCurrentUser from './hooks/useGetCurrentUser.js'
export const serverUrl = "http://localhost:8000"


export default function App() {

  useGetCurrentUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
