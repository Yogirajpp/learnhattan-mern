import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      <h1>User Dashboard</h1>
      {user && (
        <div>
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Description: {user.description}</p>
          {/* Render additional user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
