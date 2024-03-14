import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams(); // Make sure courseId is correctly extracted
  const [course, setCourse] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    // Fetch course details when the component mounts
    fetchCourseDetail();
  }, [courseId]);

  const handleVideoTitleClick = (title) => {
    setSelectedVideoTitle(title);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {course ? (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
              <p className="text-gray-300 mb-4">Description: {course.description}</p>
              <p className="text-gray-300 mb-4">Category: {course.category}</p>
              <p className="text-gray-300 mb-4">Tutor: {course.tutor}</p>
              <h3 className="text-xl font-semibold mb-2">Videos</h3>
              <ul className="list-disc list-inside text-gray-300 mb-4">
                {course.videos.map((video, index) => (
                  <li key={index}>
                    <h4
                      className={`text-lg font-medium cursor-pointer ${
                        video.title === selectedVideoTitle ? "text-blue-500" : ""
                      }`}
                      onClick={() => handleVideoTitleClick(video.title)}
                    >
                      {video.title}
                    </h4>
                    {video.title === selectedVideoTitle && (
                      <video controls>
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </li>
                ))}
              </ul>
              {/* Render additional course details as needed */}
            </div>
          ) : (
            <p className="text-center text-gray-300">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
