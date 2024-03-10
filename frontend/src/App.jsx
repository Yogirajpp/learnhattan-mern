import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
// import Sidebar from "./components/Sidebar";
import TopNavBar from "./components/TopNavBar";
import Home from "./pages/Home";
// import PostPage from "./components/postComponent/PostPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Marketplace from "./pages/Marketplace";
import CourseDetail from "./pages/CourseDetail";
import courseDetailData from "./JSON/courseDetailData.json";
import coursesCompleted from "./JSON/coursesCompleted.json";
import rankings from "./JSON/rankings.json";
import users from "./JSON/user.json";
// import Posts from "./pages/Post";
// import PostForm from "./components/postComponent/PostForm";
import Contributer from "./pages/Contributer";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <Routes>

        <Route path="/" element={!user ? <Home /> : <Navigate to="/Dashboard" />} />

        <Route exact path="/register" element={!user ? <Register /> : <Navigate to="/Dashboard" />} />

        <Route path="/login" element={!user ? <Login /> : <Navigate to="/Dashboard" />} />

        <Route path="/Dashboard" element={user ?
          <Dashboard
            users={users}
            rankings={rankings}
            coursesCompleted={coursesCompleted}
          /> : <Navigate to="/login" />
        }
        />
        <Route path="/Profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/Courses" element={user ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/Marketplace" element={user ? <Marketplace /> : <Navigate to="/login" />} />
        {/* <Route path="/PostPage" element={<PostPage />} /> */}
        {/* <Route path="add-post" element={<PostForm />} /> */}
        <Route
          path="/CourseDetail/:id"
          element={user ? <CourseDetail courseDetailData={courseDetailData} /> : <Navigate to="/login" />}
        />
        <Route path="/Contributer" element={user ? <Contributer /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
