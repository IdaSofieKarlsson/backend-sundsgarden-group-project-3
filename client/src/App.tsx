import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import AdminHome from "./pages/AdminHome";
import StudentGrades from "./pages/StudentGrades";
import StudentList from "./components/studentList";
import AdminGrades from "./pages/AdminGrades";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* Admin pages */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminHome />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <StudentList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/grades"
          element={
            <AdminRoute>
              <AdminGrades />
            </AdminRoute>
          }
        />

        {/* Student page */}
        <Route
          path="/student/grades"
          element={
            <ProtectedRoute>
              <StudentGrades />
            </ProtectedRoute>
          }
        />

        {/* No access page */}
        <Route path="/no-access" element={<div>Du saknar access. Kontakta Webmaster</div>} />
      </Routes>
    </div>
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