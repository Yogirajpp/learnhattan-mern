// Import necessary components and libraries
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
// import Sidebar from "./components/Sidebar";
import Navigation from "./components/NavigationLP/Navigation";
import TopNavBar from "./components/TopNavBar";
import Home from "./pages/Home";
// import PostPage from "./components/postComponent/PostPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Marketplace from "./pages/Marketplace";
import CourseDetail from "./pages/CourseDetail";
import courseDetailData from "./JSON/courseDetailData.json";
import coursesCompleted from "./JSON/coursesCompleted.json";
import rankings from "./JSON/rankings.json";
import user from "./JSON/user.json";
// import Posts from "./pages/Post";
// import PostForm from "./components/postComponent/PostForm";
import Contributer from "./pages/Contributer";
// Main App Component
const App = () => {
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("YOUR_BACKEND_API_URL/checkAuthentication");
        if (response.data.isAuthenticated) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuthentication();
  }, []);

  // Check if the user is on the home page
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <>
        {/* Always render Navigation by default unless conditions below override this */}
        {isHomePage && <Navigation />}

        {/* If it's not the home page, decide which component to render based on login status */}
        {!isHomePage && (isLoggedIn ? <TopNavBar /> : <Navigation />)}

        {/* If it's not the home page and user is logged in, render Sidebar. This seems to contradict with rendering TopNavBar above when isLogIn is true. */}
        {/* The condition below might need to be adjusted based on the actual requirement. If Sidebar and TopNavBar are mutually exclusive, you'll have to consolidate their conditions */}
        {/* {!isHomePage && isLogIn && <Sidebar />} */}
      </>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Login"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            path="/Dashboard"
            element={
              <Dashboard
                user={user}
                rankings={rankings}
                coursesCompleted={coursesCompleted}
              />
            }
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Marketplace" element={<Marketplace />} />
          {/* <Route path="/PostPage" element={<PostPage />} /> */}
          {/* <Route path="add-post" element={<PostForm />} /> */}
          <Route
            path="/CourseDetail/:id"
            element={<CourseDetail courseDetailData={courseDetailData} />}
          />
          <Route path="/Contributer" element={<Contributer />} />
        </Route>
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
