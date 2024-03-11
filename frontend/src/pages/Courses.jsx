import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/allcourses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  return (
    <div className="coursebackgroundBlack">
      <div className="courseswrapper">
        <div className="coursesidebar">
          <Sidebar />
        </div>
        <div className="courses-container">
          <div className="course-cards">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
                {/* Course card content */}
                <div className="Enrollbtn">
                  {/* Render course details */}
                  <h3>{course.title}</h3>
                  <p>Description: {course.description}</p>
                  <p>Category: {course.category}</p>
                  {/* Additional course information can be rendered here */}
                  <button onClick={() => navigate(`/coursedetail/${course._id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
