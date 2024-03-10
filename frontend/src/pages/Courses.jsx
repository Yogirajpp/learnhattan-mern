import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios library for making HTTP requests
import "./Courses.css";
import Sidebar from "../components/Sidebar";

const Courses = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedCourses, setDisplayedCourses] = useState(6);
  const navigate = useNavigate(); // Hook for navigation
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [tagsFilterVisible, setTagsFilterVisible] = useState(false); // State variable for tags filter visibility

  const handleTagChange = (tag) => {
    // Toggle the selected state of the tag
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleLoadMore = () => {
    // Increase the number of displayed courses by 6
    setDisplayedCourses((prevCount) => prevCount + 6);
  };

  const handleCourseEnroll = async (courseId) => {
    try {
      // Make a POST request to enroll in the course
      const response = await axios.post(
        `http://localhost:8080/enroll`,
        { courseId }
      );
      console.log(response.data); // Log the response data if needed

      // Update enrollment status for the specific course
      setEnrollmentStatus((prevStatus) => ({
        ...prevStatus,
        [courseId]: true,
      }));

      // Navigate after enrollment
      navigate(`/coursedetail/${courseId}`);
    } catch (error) {
      console.error("Enrollment error:", error);
    }
  };

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      try {
        // Fetch enrollment status from the backend
        const response = await axios.get(`http://localhost:8080/enrollment`);
        setEnrollmentStatus(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollment status:", error);
        setLoading(false);
      }
    };

    fetchEnrollmentStatus();
  }, []);

  // Filtered courses based on search term and selected tags
  const filteredCourses = coursesData.filter((course) => {
    const matchSearchTerm =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => course.tags.includes(tag));
    return matchSearchTerm && matchTags;
  });

  return (
    <div className="coursebackgroundBlack">
      <div className="courseswrapper">
        <div className="coursesidebar">
          <Sidebar />
        </div>
        <div className="courses-container">
          <div className="filter-search-bar">
            <div className="row1stBar">
              {/* Search input */}
              <input
                className="Searchinput"
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="filterAndTagbuttons">
                {/* Filter button with click handler to toggle tags filter visibility */}
                <button
                  className="filterButton"
                  onClick={() => setTagsFilterVisible(!tagsFilterVisible)}
                >
                  Filter
                </button>
                <button className="tagButton">Tags</button>
              </div>
            </div>

            {/* Tags filter */}
            {/* Tags filter with conditional rendering based on visibility state */}
            {tagsFilterVisible && (
              <div className="tags-filter">
                {alltags.map((tag) => (
                  <label key={tag}>
                    <input
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                    />
                    {tag}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="course-cards">
            {/* <img
              src="https://assets-global.website-files.com/637359c81e22b715cec245ad/6464a7ec8c8fd22869e80364_home-hero-new-bg1.svg"
              alt=""
              className="new-bg1"
            /> */}
            {filteredCourses.slice(0, displayedCourses).map((course) => (
              <div className="course-card" key={course.id}>
                <img
                  src={course.image}
                  className="coursesImage"
                  alt={`${course.title} Image`}
                />
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p>Teacher: {course.teacher}</p>
                  <p>Tags: {course.tags.join(", ")}</p>
                  {/* Add additional information as needed */}
                </div>
                <div className="Enrollbtn">
                  {isEnrolled || enrollmentStatus[course.id] ? (
                    <button
                      onClick={() => navigate(`/coursedetail/${course.id}`)}
                    >
                      Enrolled
                    </button>
                  ) : (
                    <button onClick={() => handleCourseEnroll(course.id)}>
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Load More button */}
          {displayedCourses < filteredCourses.length && (
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
