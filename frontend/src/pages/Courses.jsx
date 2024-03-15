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
        const response = await axios.get(
          "http://localhost:8080/api/users/allcourses"
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  return (
    <div className=" bg-zinc-200 min-h-screen">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <Sidebar />
          </div>
          <div className="md:col-span-2 ml-48">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id}>
                  <div className="flex flex-col rounded-lg overflow-hidden">
                    <img
                      alt="Course thumbnail"
                      className="aspect-[16/9]"
                      height={225}
                      src="/assets/images/img6.png"
                      width={400}
                    />
                    <div className="p-4 flex-1">
                      <h2 className="text-lg font-semibold">{course.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        Description: {course.description}{" "}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Category: {course.category}
                      </p>
                    </div>
                    <button
                      className="flex items-center justify-center p-4 bg-gray-100 text-sm w-full"
                      onClick={() => navigate(`/coursedetail/${course._id}`)}
                    >
                      View Details
                    </button>
                  </div>
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
