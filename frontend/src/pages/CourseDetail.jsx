import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
const CourseDetail = () => {
  const { courseId } = useParams(); // Make sure courseId is correctly extracted
  const [course, setCourse] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/${courseId}`
        );
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
  const renderVideoTitles = (
    course,
    selectedVideoTitle,
    handleVideoTitleClick
  ) =>
    course.videos.map((video, index) => (
      <li key={index}>
        <h4
          className={`text-lg font-medium cursor-pointer ${
            video.title === selectedVideoTitle ? "text-blue-500" : ""
          }`}
          onClick={() => handleVideoTitleClick(video.title)}
        >
          {video.title}
        </h4>
      </li>
    ));

  const renderVideos = (course, selectedVideoTitle) =>
    course.videos.map((video, index) => (
      <li key={index}>
        {video.title === selectedVideoTitle && (
          <video controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </li>
    ));

  const renderResources = (course) =>
    course.resources.map((resource, index) => (
      <li key={index}>
        <a
          href={resource.url}
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {resource.title}
        </a>
        <p className="text-gray-300">{resource.description}</p>
      </li>
    ));

  const renderAssignments = (course) =>
    course.assignments.map((assignment, index) => (
      <li key={index}>
        <h4 className="text-lg font-medium">{assignment.title}</h4>
        <p className="text-gray-300">{assignment.description}</p>
        <p className="text-gray-300">
          Deadline: {new Date(assignment.deadline).toLocaleString()}
        </p>
      </li>
    ));

  return (
    <>
      <Sidebar />
      {course ? (
        <div className="bg-gray-800 ml-44 mt-4 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
          <p className="text-gray-300 mb-4">
            Description: {course.description}
          </p>
          <p className="text-gray-300 mb-4">Category: {course.category}</p>
          <p className="text-gray-300 mb-4">Tutor: {course.tutor}</p>
          <h3 className="text-xl font-semibold mb-2">Videos</h3>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <ul>
              {renderVideoTitles(
                course,
                selectedVideoTitle,
                handleVideoTitleClick
              )}
            </ul>

            {/* Render only the videos */}
            <ul>{renderVideos(course, selectedVideoTitle)}</ul>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Resources</h3>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <ul>{renderResources(course)}</ul>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Assignments</h3>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <ul>{renderAssignments(course)}</ul>
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-300">Loading...</p>
      )}
    </>
  );
};

export default CourseDetail;
