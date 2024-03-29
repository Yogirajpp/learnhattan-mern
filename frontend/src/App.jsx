import { Routes, Route } from "react-router-dom";
import AuthLayout from "./auth/AuthLayout";
import RootLayout from "./root/RootLayout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Marketplace from "./pages/Marketplace";
import CourseDetail from "./pages/CourseDetail";
import CourseEnroll from "./pages/CourseEnroll";
// import courseDetailData from "./JSON/courseDetailData.json";
// import coursesCompleted from "./JSON/coursesCompleted.json";
// import rankings from "./JSON/rankings.json";
// import users from "./JSON/user.json";
import Contributor from "./pages/Contributor";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <div className="">
      <Routes>
        {/* Redirect to /home if user is authenticated */}
        {!user ? (
          <Route element={<AuthLayout />}>
            <Route exact index element={<HomePage />} />
            <Route exact path="login" element={<Login />} />
            <Route exact path="register" element={<Register />} />
          </Route>
        ) : (
          <Route element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/courses" element={<Courses />} />
            <Route exact path="/marketplace" element={<Marketplace />} />
            <Route path="/coursedetail/:courseId" element={<CourseDetail />} />
            <Route exact path="/Contributor" element={<Contributor />} />
            <Route
              exact
              path="/courseEnroll/:courseId"
              element={<CourseEnroll />}
            />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
