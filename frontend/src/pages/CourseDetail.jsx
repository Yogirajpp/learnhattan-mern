import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
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

  const renderVideos = (course, selectedVideoTitle) =>
    course.videos.map((video, index) => (
      <div key={index}>
        {video.title === selectedVideoTitle && (
          <video controls autoPlay>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
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
        <p className="text-gray-400">{resource.description}</p>
      </li>
    ));

  const renderAssignments = (course) =>
    course.assignments.map((assignment, index) => (
      <li key={index}>
        <h4 className="text-lg font-medium">{assignment.title}</h4>
        <p className="text-gray-400">{assignment.description}</p>
        <p className="text-gray-400">
          Deadline: {new Date(assignment.deadline).toLocaleString()}
        </p>
      </li>
    ));

  return (
    <>
      <Sidebar />
      {course ? (
        <div className="grid md:grid-cols-[145%_50%] p-4 sm:ml-52 mt-16 gap-6 max-w-2xl w-full items-start">
          <div className="flex flex-col gap-4">
            <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg">
              <span className="w-full h-full object-cover rounded-md bg-muted">
                {renderVideos(course, selectedVideoTitle)}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-gray-400 mb-4">{course.category}</p>
                <p className="text-sm text-gray-500">{course.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      alt="Avatar"
                      className="rounded-full"
                      height="40"
                      src="https://avatars.githubusercontent.com/u/266302?v=4"
                      style={{
                        aspectRatio: "40/40",
                        objectFit: "cover",
                      }}
                      width="40"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-medium text-sm">
                        Dr. Maria Rodriguez
                      </h3>
                      <p className="text-xs text-gray-500">
                        Professor of Physics, MIT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 w-3/5">
              <p className="text-sm leading-6">
                In this course, you will gain a deep understanding of quantum
                mechanics, covering topics such as wave-particle duality,
                quantum superposition, and entanglement. The course includes
                video lectures, interactive simulations, and quizzes to test
                your knowledge.
              </p>
            </div>
            <div className="grid gap-4 p-4 bg-white rounded-lg shadow-lg w-3/5">
              <h3 className="text-lg font-semibold">Course Resources</h3>
              <ul className="grid gap-2">{renderResources(course)}</ul>
            </div>

            <div className="grid gap-4 p-4 bg-white rounded-lg shadow-lg w-3/5">
              <h3 className="text-lg font-semibold">Assignments</h3>
              <ul className="grid gap-2">{renderAssignments(course)}</ul>
            </div>
          </div>

          <div
            className="grid gap-4 bg-white rounded-lg  shadow-md overflow-y-auto md:w-[100%] md:mr-10"
            style={{
              maxHeight: "calc(140vh - 400px)",
            }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Course Playlist</h2>

              <ul className="space-y-2">
                {course.videos.map((video, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2"></div>
                    <VideoIcon className="h-6 w-6" />
                    <div>
                      <p
                        className="font-medium"
                        onClick={() => handleVideoTitleClick(video.title)}
                      >
                        {video.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {video.description}unit-1
                      </p>
                    </div>
                    <span className="text-sm">{video.duration}5:45</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-300">Loading...</p>
      )}
    </>
  );
};
function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
export default CourseDetail;
