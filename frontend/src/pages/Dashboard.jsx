import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  // const { userId } = useParams();
  const [user, setUser] = useState(null);

  const user2 = JSON.parse(localStorage.getItem("user"));
  // console.log(user2);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${user2.user}`);
        setUser(response.data.user);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user2]);

  return (
    <>
      <Sidebar />
      <h1 className="text-4xl font-bold">Dashboard</h1>
      {user && (
        <div className=" sm:ml-52 text-black min-h-screen">
          <div className="flex flex-col shadow-xl  rounded-xl items-center p-6">
            <div className="flex items-center space-x-4 mb-6">
              {/* <MenuIcon className="text-white" /> */}
              <h1 className="text-4xl font-bold mt-10">Dashboard</h1>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg w-full max-w-4xl">
              <div className="flex flex-col items-center mb-6">
                <Avatar>
                  <AvatarImage alt="user name" src={user.photo} />
                  <AvatarFallback>VM</AvatarFallback>
                </Avatar>
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
                    {/* <CameraIcon className="text-gray-400" />
                    <VideoIcon className="text-gray-400" />
                    <TwitterIcon className="text-gray-400" />
                    <LinkedinIcon className="text-gray-400" /> */}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="p-4 shadow-xl  rounded-xl h-full">
                    <h3 className="text-xl font-semibold mb-4">ACHIVEMENTS</h3>
                    <ul>
                      <li className="flex items-center mb-2">
                        {/* <TrophyIcon className="text-[#bd1e59] mr-2" /> */}
                        <span className="text-sm">Dev Hackathon – Aug 2023</span>
                      </li>
                      <li className="flex items-center mb-2">
                        {/* <TrophyIcon className="text-[#bd1e59] mr-2" /> */}
                        <span className="text-sm">Eth India – Apr 2024</span>
                      </li>
                      <li className="flex items-center">
                        {/* <TrophyIcon className="text-[#bd1e59] mr-2" /> */}
                        <span className="text-sm">Speed Code – Aug 2022</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="shadow-xl  rounded-xl p-4 h-full">
                    <h3 className="text-xl font-semibold mb-4">PROFILE</h3>
                    <ul>
                      <li className="flex items-center mb-2">
                        {/* <CalendarIcon className="text-gray-400 mr-2" /> */}
                        <span className="text-sm">23 Years</span>
                      </li>
                      <li className="flex items-center mb-2">
                        {/* <LocateIcon className="text-gray-400 mr-2" /> */}
                        <span className="text-sm">Noida, UP, India</span>
                      </li>
                      <li className="flex items-center">
                        {/* <BedSingleIcon className="text-gray-400 mr-2" /> */}
                        <span className="text-sm">Single</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default Dashboard;
