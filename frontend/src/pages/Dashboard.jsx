import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  let i = 1;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [achievements, setAchievements] = useState(null);
  const [check, setCheck] = useState(false); // Define check state

  const user2 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://learnhattan-mern.vercel.app/api/users/${user2.user}`);
        setUser(response.data.user);

        const achievementsData = await Promise.all(
          response.data.user.achievements.map(async (achievementId) => {
            const achievementResponse = await axios.get(`https://learnhattan-mern.vercel.app/api/achivements/${achievementId}`);
            return achievementResponse.data;
          })
        );
        setAchievements(achievementsData);

        const checkResponse = await axios.get(`https://learnhattan-mern.vercel.app/api/dashboard/user/${user2.user}`);
        setCheck(checkResponse.data);

        if (checkResponse.data) {
          const profileData = await axios.get(`https://learnhattan-mern.vercel.app/api/dashboard/user/display/${user2.user}`);
          console.log(profileData.data)
        }

        const enrolledCoursesResponse = await axios.get(`https://learnhattan-mern.vercel.app/api/users/enrolled-courses/${user2.user}`);
        setEnrolledCourses(enrolledCoursesResponse.data.enrolledCourses);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Sidebar />
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {user && (
        <div className=" sm:ml-52 text-black min-h-screen">
          <div className="flex flex-col shadow-xl  rounded-xl items-center p-6">
            <div className="flex items-center space-x-4 mb-6">
              <h1 className="text-4xl font-bold mt-10">Dashboard</h1>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg w-full max-w-4xl">
              <div className="flex flex-col items-center mb-6">
                {/* <Avatar>
                  <AvatarImage alt="user name" src={user.photo} />
                  <AvatarFallback>VM</AvatarFallback>
                </Avatar> */}
                <img src={user.photo} alt="userPhoto" className="w-32 rounded-full" />
                <h2 className="text-3xl font-semibold mt-4">{user.username}</h2>
                <p className="text-sm text-gray-400 mt-2">{user.description}</p>
              </div>
              <div className="flex flex-col lg:flex-row lg:space-x-6 w-full">
                <div className="flex-1 mb-6 lg:mb-0">
                  <div className=" p-4 shadow-xl  rounded-xl ">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Elite</span>
                      <span className="text-xs font-bold text-gray-400">425</span>
                    </div>
                    <div className="shadow-xl  h-2 rounded-full">
                      <div
                        className="bg-[#bd1e59] h-2 shadow-xl rounded-full"
                        style={{
                          width: "60%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 mt-6">
                  </div>
                </div>
                <div className="flex-1">
                  <div className="p-4 shadow-xl  rounded-xl h-full">
                    <h3 className="text-xl font-semibold mb-4">ACHIEVEMENTS</h3>
                    <ul>
                      {achievements && achievements.map(achievement => (
                        <li key={achievement._id}><span className="font-bold">{i++}.</span> {achievement.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="shadow-xl  rounded-xl p-4 h-full">
                    <h3 className="text-xl font-semibold mb-4">PROFILE</h3>
                    {!check && <p>Please Fill Profile Info</p>}
                    {check && (
                      <div>
                        <p><strong>Interests:</strong> {user.interests.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map(course => (
                  <div
                    key={course._id}
                    className="course flex flex-col shadow-lg rounded-3xl overflow-hidden"
                  >
                    <img
                      alt="Course thumbnail"
                      height={225}
                      src={course.image}
                      className=" h-200 object-cover w-full"
                    />
                    <div className="p-4 flex-1">
                      <h2 className="text-lg font-semibold">{course.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {course.description}{" "}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">{course.category}</p>
                    </div>
                    <button
                      className="flex items-center justify-center p-4 bg-gray-100 text-sm w-full"
                      onClick={() => navigate(`/courseEnroll/${course._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

