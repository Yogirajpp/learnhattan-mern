import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Dashboard = ({ users, coursesCompleted }) => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from backend
        const response = await axios.get("http://localhost:8080/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        // Fetch user photo from backend
        const response = await axios.get("http://localhost:8080/user/photo");
        setUser((prevUser) => ({ ...prevUser, photo: response.data }));
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };

    fetchUserPhoto();
  }, []);

  // Similar useEffect hooks for fetching rankings, spaces, achievements, etc.

  const handleSignOut = async () => {
    try {
      // Implement sign-out functionality using backend API
      await axios.post("http://localhost:8080/logout");
      console.log("User is logged out");
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <>
      <div className="dashboardsidebar">
        <Sidebar />
      </div>
      <div className="dashboard">
        {user && user.username && (
          <div className="name">Welcome {user.username}</div>
        )}
        <div className="welcome">
          <div className="elite-space-achievement">
            <div className="gradient-box">
              <div id="rectangle-48"></div>
              <div className="elite">
                <h1 className="eliteHeading">Elite 3 </h1>
                <h1 className="eliteDetails">
                  {user && user.eliteStatus ? user.eliteStatus : "N/A"}
                </h1>
              </div>
            </div>
            <div className="space">
              <div className="section-title">Spaces</div>
              <div className="space-container">
                <div className="space-box bg1">
                  <h1 className="spaceHeading">
                    Advanced Arbitrium Development
                  </h1>
                  <img
                    src={spaceimg}
                    className="spaceimage object-cover"
                    alt="Sorry"
                  />
                </div>
                <div className="space-box bg2">
                  <h1 className="spaceHeading ml-2">
                    Bitcoin <br /> Mining
                  </h1>
                  <img
                    src={spaceimg2}
                    className="spaceimage object-cover"
                    alt="Sorry"
                  />
                </div>
              </div>
            </div>
            <div className="achievements">
              <div className="section-title">Achievements</div>
              <div className="achieveContainer">
                <div className="innerCont">
                  <div className="b1"></div>
                  <h1 className="btext">
                    DevHackathon <br />
                    Aug 2023
                  </h1>
                </div>
                <div className="innerCont">
                  <div className="b1"></div>
                  <h1 className="btext">
                    SpeedCode <br /> Aug 2023
                  </h1>
                </div>
                <div className="innerCont">
                  <div className="b1"></div>
                  <h1 className="btext">
                    FastestBug <br />
                    Aug 2023
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="divForRankingTileAndBox">
            <div className="ranking-title">Ranking</div>
            <div className="ranking-box">
              <table border="1">
                <thead>
                  <tr>
                    <th>Ranking</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Tier</th>
                    <th>XP</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((rank, index) => (
                    <tr key={index}>
                      <td>{rank.ranking}</td>
                      <td className="photoInsideRankingBox">{rank.photo}</td>
                      <td>{rank.name}</td>
                      <td>{rank.tier}</td>
                      <td>{rank.xp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
