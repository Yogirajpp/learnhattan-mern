import { useState } from "react";
import google from "../pages/google.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', { username, email, password });
      console.log('Successfully registered user:', response.data);
      alert('Register successful!');
      setAction("Login");
      navigate('/Profile');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      console.log('Successfully logged in:', response.data);

      // Redirect to dashboard or profile page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="none">
      <div className="login-box">
        <h2 className="text-3xl loginboxH2">{action}</h2>
        <p className="text-base mb-1 text-">
          Welcome Back! Please Enter Your Details.
        </p>

        <div className="loginboxH2">
          {action !== "Register" ? <div></div> : <input
            type="text"
            className="w-full py-2 my-1 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />}
          
          <input
            type="email"
             className="w-full py-2 my-1 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            className="w-full py-2 my-1 border-b bg-transparent border-black outline-none focus:outline-none"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full py-5 flex items-center justify-between my-2">
          <div className="w-full flex ">
            <input type="checkbox" className="w-4 h-4 mr-2" value="" />
            <p className="text-sm text-">Remember me for 30 days</p>
          </div>
          {action === "Register" ? <div></div> : <p className="text-sm font-sm space-nowrap cursor-pointer underline underline-offset-2 " style={{ color: '#1473e6' }}>Forget Password ?</p>}
        </div>

        <div className="w-full flex flex-col my-2">
          {action === "Register" ?
            <button
              className={action === "Register" ? "loginButtonStyle" : "loginButtonStyle "}
              onClick={() => {
                setAction("Register");
                handleRegister();
              }}
            >
              Register
            </button> :
            <button
              className={action === "Login" ? "loginButtonStyle " : "loginButtonStyle "}
              onClick={() => {
                setAction("Login");
                handleLogin()
              }}
            >
              LogIn
            </button>
          }
        </div>

        <div className="w-full flex items-center justify-center relative py-2">
          <div className="w-full my-4 h-[1px] bg-black/40 "></div>
          <p className="text-lg absolute text-black " style={{ color: ' ' }}>or</p>
        </div>

        <div className="w-60 ml-10 my-4 text-[#060606] font-semibold bg-  border border-black/40 rounded-md p-2  text-center flex items-center justify-center cursor-pointer" type="">
          <img src={google} className="h-6 mr-2" alt="" />
          Sign In with Google
        </div>

        <div className="w-full flex items-center justify-center">
          {action === "Register" ?
            <p className="text-sm font-normal text-">
              Already have an account?
              <span className="font-semibol px-5 underline underline-offset-2 cursor-pointer" style={{ color: '#5865f2' }} onClick={() => setAction("Login")}>
                Login
              </span>
            </p> :
            <p className="text-sm font-normal text-">
              Don't have an account? &nbsp;
              <span className="font-semibol underline underline-offset-2 cursor-pointer " style={{ color: '#1473e6' }} onClick={() => setAction("Register")}>
                Register
              </span>
            </p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
