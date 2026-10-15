import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/students";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setError("");
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load students. Check the backend and MongoDB.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents((current) => current.filter((student) => student._id !== id));
    } catch (err) {
      window.alert(err.response?.data?.message || "Could not delete student.");
    }
  };

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>Students</h2>
          <p className="muted">View, edit or remove student records.</p>
        </div>
        <Link className="button primary" to="/add">+ Add student</Link>
      </div>

      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <div className="empty-state">Loading students...</div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">◎</div>
          <h3>No students yet</h3>
          <p>Add your first student to see their details here.</p>
          <Link className="button primary" to="/add">Add a student</Link>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-topline">
            <span>Student records</span>
            <span className="count-pill">{students.length} total</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th className="actions-heading">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <div className="student-name">
                        <span className="avatar">{student.name?.charAt(0)?.toUpperCase() || "S"}</span>
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td>{student.email}</td>
                    <td><span className="course-pill">{student.course}</span></td>
                    <td>
                      <div className="actions">
                        <Link className="button small secondary" to={`/edit/${student._id}`}>Edit</Link>
                        <button className="button small danger" onClick={() => deleteStudent(student._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
