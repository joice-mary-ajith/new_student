import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import StudentList from "./components/StudentList.jsx";
import AddStudent from "./components/AddStudent.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div>
            <h1>Student Manager</h1>
            <p>Simple MERN CRUD application</p>
          </div>
        </div>
        <nav>
          <NavLink to="/students" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Students
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Add Student
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/students" replace />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<AddStudent />} />
          <Route path="*" element={<Navigate to="/students" replace />} />
        </Routes>
      </main>

      <footer>Built with React, Express, Node.js and MongoDB</footer>
    </div>
  );
}
