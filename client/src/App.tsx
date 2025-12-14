// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentForm from "./components/studentForm";
import StudentList from "./components/studentList";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Admin pages */}
      <Route
        path="/admin/students"
        element={
          <AdminRoute>
            <StudentList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/register-student"
        element={
          <AdminRoute>
            <StudentForm />
          </AdminRoute>
        }
      />

      {/* Student page (grades etc, can be implemented later) */}
      <Route
        path="/student/grades"
        element={
          <ProtectedRoute>
            <div>Student grades page (to be implemented)</div>
          </ProtectedRoute>
        }
      />

      {/* Optional: No access page */}
      <Route path="/no-access" element={<div>No access</div>} />
    </Routes>
  );
}

export default App;




/*
//import { useState } from 'react'

import './App.css'
import StudentForm from './components/studentForm'
import StudentList from './components/studentList'

function App() {

  return (
    <>
      <div>
        <StudentForm/>
      </div>
      
      <div>
        <StudentList/>
      </div>
      
    </>
  )
}

export default App
*/