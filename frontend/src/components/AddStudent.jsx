import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/students";

const emptyForm = { name: "", email: "", course: "" };

export default function AddStudent() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (!id) {
      setFormData(emptyForm);
      return;
    }

    const fetchStudent = async () => {
      try {
        setPageLoading(true);
        setError("");
        const response = await axios.get(`${API_URL}/${id}`);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          course: response.data.course || ""
        });
      } catch (err) {
        setError(err.response?.data?.message || "Could not load student details.");
      } finally {
        setPageLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      navigate("/students");
    } catch (err) {
      setError(err.response?.data?.message || "Could not save student. Check the backend and MongoDB.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="empty-state">Loading student details...</div>;
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{isEditing ? "UPDATE RECORD" : "NEW RECORD"}</p>
          <h2>{isEditing ? "Edit student" : "Add a student"}</h2>
          <p className="muted">{isEditing ? "Make changes to the student details." : "Enter the details below to create a student record."}</p>
        </div>
        <Link className="button secondary" to="/students">← Back to students</Link>
      </div>

      {error && <div className="alert error">{error}</div>}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-intro">
          <div className="form-icon">＋</div>
          <div>
            <h3>Student information</h3>
            <p>All fields are required.</p>
          </div>
        </div>

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Anu Mathew"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. anu@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="course">Course</label>
        <input
          id="course"
          name="course"
          type="text"
          placeholder="e.g. MERN Stack"
          value={formData.course}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <Link className="button secondary" to="/students">Cancel</Link>
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Save changes" : "Create student"}
          </button>
        </div>
      </form>
    </section>
  );
}
