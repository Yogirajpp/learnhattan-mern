import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios library for making HTTP requests
import "./CourseDetail.css";
import Sidebar from "../components/Sidebar";

const CourseDetail = ({ courseDetailData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [videoPoints, setVideoPoints] = useState(
    Array(courseDetailData.length).fill(0)
  );
  const [videoCompletion, setVideoCompletion] = useState(
    Array(courseDetailData.length).fill(false)
  );
  const [assignments, setAssignments] = useState([]);
  const [videoLoading, setVideoLoading] = useState(true);

  const { id } = useParams();
  const course = courseDetailData.find(
    (course) => course.id.toString() === id
  );

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const loadVideo = (videoIndex) => {
    setSelectedVideo(videoIndex);
    setVideoLoading(true);
  };

  const completeVideo = async () => {
    try {
      // Make a POST request to mark video as complete and update points
      const response = await axios.post(
        `http://localhost:8080/completeVideo`,
        {
          userId: "USER_ID",
          videoId: course.videos[selectedVideo].id,
        }
      );
      console.log(response.data); // Log the response data if needed
    } catch (error) {
      console.error("Error completing video:", error);
    }
  };

  useEffect(() => {
    // Fetch video points when component mounts
    const fetchVideoPoints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/videoPoints?userId=USER_ID`
        );
        setVideoPoints(response.data);
      } catch (error) {
        console.error("Error fetching video points:", error);
      }
    };
    fetchVideoPoints();
  }, [courseDetailData]);

  useEffect(() => {
    // Fetch assignments for the selected video
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/assignments?videoId=${course.videos[selectedVideo].id}`
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [selectedVideo]);

  return (
    <>
      <div className="coursedetailsidebar">
        <Sidebar />
      </div>
      <div className={`course-container `}>
        <div className="left-container">
          <div className="video-item">
            <video
              key={course.videos[selectedVideo].id}
              controls
              autoPlay
              name="media"
              onEnded={completeVideo}
              className={` video-container ${
                videoLoading ? "mint-background" : ""
              }`}
            >
              <source
                src={course.videos[selectedVideo].url}
                type="video/webm"
              />
            </video>
            {videoCompletion[selectedVideo] &&
              !hasUserReceivedPoints[selectedVideo] && (
                <button onClick={completeVideo}>Complete</button>
              )}
          </div>
          <div className="column">
            <div className="collapsible-box">
              <h1 className="headingAboutthiscourse">{course.name} Details</h1>
              <p className={`content ${isExpanded ? "expanded" : ""}`}>
                {course.description}
              </p>
              <button className="collapse-button" onClick={toggleText}>
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>

          <div className="contributors-container">
            <div className="contributor-section">
              <h2 className="h4 mb-3">Contributors</h2>
              <ul className="contributor-list">
                {course.contributors.map((contributor, index) => (
                  <li key={index} className="contributor-item">
                    <a href={`https://github.com/${contributor.name}`}>
                      <img
                        src={contributor.avatar}
                        alt={`@${contributor.name}`}
                        className="avatar"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="add-contributor">
                <a href="/your-link" className="additional-link">
                  + Additional contributors
                </a>
              </div>
            </div>
          </div>
          <div className="assignments-container">
            <h2>Assignments for Video {selectedVideo + 1}</h2>
            <ul>
              {assignments.map((assignment, index) => (
                <li key={index}>{assignment}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-container">
          <p className="course-progress-title">{course.name} Progress</p>
          <ul id="videoItems" className="video-list">
            <div className="video-list-container">
              {course.videos.map((video, index) => (
                <li
                  key={index}
                  className={`video-list-item ${
                    selectedVideo === index ? "active" : ""
                  }`}
                  onClick={() => loadVideo(index)}
                >
                  <div className="video-info">
                    {/* <img
                        className="video-thumbnail"
                        src="images/img_image.png"
                        alt="image"
                      /> */}
                    <div className="video-details">
                      <p className="unit-title">{`Unit ${index + 1}`}</p>
                      <span>{`Points: ${videoPoints[index]}`}</span>
                      <p className="video-duration">1:57</p>
                      {/* <span>{`Video ${index + 1}`}</span> */}
                      {videoCompletion[index] && <span>{`(Completed)`}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
