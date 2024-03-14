import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Sidebar />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  {/* Course card content */}
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-300 mb-2">Description: {course.description}</p>
                  <p className="text-gray-300 mb-4">Category: {course.category}</p>
                  {/* Additional course information can be rendered here */}
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate(`/coursedetail/${course._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
