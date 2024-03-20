import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";
import { signData } from "../components/EnrollContract";

const CourseEnroll = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams(); // Get the courseId from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    // Fetch the specific course when the component mounts
    fetchCourse();
  }, [courseId]);

  const enrollCourse = async () => {
    try {
      // Call the signData function to get the signature
      const signature = await signData(courseId);
      console.log("Signature:", signature);
      
      // Navigate to the course detail page
      navigate(`/coursedetail/${courseId}`);
    } catch (error) {
      console.error("Error signing data:", error);
    }
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Sidebar />
      <main className="p-8 ml-52 mt-16 bg-white text-black">
        <section className="grid md:grid-cols-3 gap-8 p-5 shadow-xl rounded-xl">
          {/* Course Title */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-sm mb-4">{course.description}</p>
          </div>
          {/* Enroll Button */}
          <div className="bg-white text-black shadow-xl p-4 rounded">
            <div className="text-sm">
              <div className="mb-2 flex justify-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 px-16"
                  onClick={enrollCourse}
                >
                  Enroll
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseEnroll;
