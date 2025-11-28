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
