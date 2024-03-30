import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardContent, Card, CardFooter } from "@/components/ui/card";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ethers } from "ethers";
const CourseDetail = () => {
  const { courseId } = useParams(); // Make sure courseId is correctly extracted

  const [course, setCourse] = useState(null);
  const [code, setCode] = useState(""); // State to store the code
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null);

  const user2 = JSON.parse(localStorage.getItem("user"));

  const completeCourse = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = "0xAA71824Ac7c4C82A2E0d8dDcA71Cf395Ee554979";
    const abi = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const contract = new ethers.Contract(addr, abi, signer);
    const tx = await contract.mint(100);
    console.log(tx);
    console.log(contract);

    const wasAdded = await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            // The address of the token.
            address: addr,
            // A ticker symbol or shorthand, up to 5 characters.
            symbol: "LHT",
            // The number of decimals in the token.
            decimals: 0,
            // A string URL of the token logo.
            // image: tokenImage,
          },
        },
      });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `https://learnhattan-mern.vercel.app/api/courses/${courseId}`
        );
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    // Fetch course details when the component mounts
    fetchCourseDetail();
  }, [courseId]);

  const handleVideoTitleClick = (title) => {
    setSelectedVideoTitle(title);
  };

  const handleSubmitAssignment = async (assignmentId) => {
    try {
      if (!assignmentId) {
        console.error("No assignment selected.");
        return;
      }
      // Submit assignment to backend
      const userId = user2.user;
      const courseId = course._id;
      const response = await axios.post(
        `https://learnhattan-mern.vercel.app/api/submissions/submit/${userId}/${courseId}/${assignmentId}`,
        { code }
      );

      if (response.data.success) {
        // Assignment submitted successfully
        console.log("Assignment submitted successfully");
      } else {
        console.error("Error submitting assignment:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting assignment:", error.message);
    }
  };

  // Inside CourseDetail component
  const handleAssignmentSubmission = (assignmentId, courseId, code) => {
    handleSubmitAssignment(assignmentId, courseId, code);
  };


  const renderVideos = (course, selectedVideoTitle) =>
    course.videos.map((video, index) => (
      <div key={index}>
        {(!selectedVideoTitle || selectedVideoTitle === "") && index === 0 && (
          <video controls autoPlay>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {video.title === selectedVideoTitle && (
          <video controls autoPlay>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    ));

  const renderResources = (course) =>
    course.resources.map((resource, index) => (
      <li key={index}>
        <a
          href={resource.url}
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {resource.title}
        </a>
        <p className="text-gray-400">{resource.description}</p>
      </li>
    ));

  const renderAssignments = (course) =>
    course.assignments.map((assignment, index) => {
      const assignmentId = assignment._id; // Extract ID dynamically
      return (
        <li key={index}>
          <h4 className="text-lg font-medium">{assignment.title}</h4>
          <p className="text-gray-400">{assignment.description}</p>
          <p className="text-gray-400">
            Deadline: {new Date(assignment.deadline).toLocaleString()}
          </p>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">View Detail</Button>
            </PopoverTrigger>
            <PopoverContent className="ml-80 mt-16" style={{ width: "60rem" }}>
              <Card className="h-96">
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold hover:underline" href="#">
                      {assignment.title}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {assignment.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <div className="grid w-full gap-4 p-4">
                      <p className="text-sm text-gray-500">
                        Paste your code here. Click submit when you are ready.
                      </p>
                      <Textarea
                        className="min-h-[100px]"
                        id={`assignment-code-${index}`} // Ensure unique ID for each assignment
                        placeholder="Paste your code here."
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <div className="flex justify-end w-full gap-2">
                        <Button variant="outline"
                          onClick={() =>
                            handleAssignmentSubmission(assignmentId)
                          }
                        >
                          Submit Assignment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
        </li>
      );
    });

  return (
    <>
      <Sidebar />
      {course ? (
        <div className=" p-4 sm:ml-52 mt-16">
          <div className="md:flex justify-between gap-2 md:w-full items-start">
            {/* <div className="flex flex-col gap-4 md:w-[65%]"> */}
            <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg">
              <span className="w-full h-full object-cover rounded-md bg-muted">
                {renderVideos(course, selectedVideoTitle)}
              </span>
            </div>
            <div className="md:w-[65%] w-[100%] ">
              <section className="bg-white rounded-lg shadow-md p-6 max-w-sm ">
                <h2 className="text-2xl font-bold mb-4">Course content</h2>
                <ul className="space-y-2">
                  {course.videos.map((video, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleVideoTitleClick(video.title)}
                    >
                      <div className="flex items-center space-x-2">
                        <VideoIcon className="w-6 h-6" />
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-gray-600">
                            {video.unit}unit1
                          </p>
                        </div>
                      </div>
                      <span>{video.duration}5:00</span>
                    </li>
                  ))}
                </ul>
              </section>
              <button
                className="w-25 mt-8 mb-8 bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                onClick={completeCourse}
              >
                Complete Course and Claim tokens
              </button>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-4 sm:w-[70%]">
              <div className="flex flex-col gap-4 w-full">
                <div>
                  <h1 className="text-2xl font-bold">{course.title}</h1>
                  <p className="text-gray-400 mb-4">{course.category}</p>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        alt="Avatar"
                        className="rounded-full"
                        height="50"
                        src="https://avatars.githubusercontent.com/u/266302?v=4"
                        style={{
                          aspectRatio: "50/50",
                          objectFit: "cover",
                        }}
                        width="50"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-medium text-sm">
                          Dr. Maria Rodriguez
                        </h3>
                        <p className="text-xs text-gray-500">
                          Professor of Physics, MIT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 w-3/5 ">
                <p className="text-sm leading-6">
                  In this course, you will gain a deep understanding of quantum
                  mechanics, covering topics such as wave-particle duality,
                  quantum superposition, and entanglement. The course includes
                  video lectures, interactive simulations, and quizzes to test
                  your knowledge.
                </p>
              </div>
              <div className="flex flex-col w-96 gap-2 shadow-lg rounded-xl py-4 ">
                <p className="px-2 text-base font-medium">Contributors</p>
                <div className="flex px-4 gap-2">
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src="https://avatars.githubusercontent.com/u/31030257?v=4"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src="https://avatars.githubusercontent.com/u/15614124?v=4"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src="https://avatars.githubusercontent.com/u/63950637?v=4"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                </div>
              </div>
              <div className="w-full sm:h-16">
                <div className="grid gap-4 p-4 bg-white rounded-lg shadow-lg w-3/5">
                  <h3 className="text-lg font-semibold">Assignments</h3>
                  <ul className="grid gap-2">{renderAssignments(course)}</ul>
                </div>
              </div>

            </div>
            <div>

              <div className="grid gap-4 p-4 bg-white rounded-lg shadow-lg  w-[100%] ">
                <h3 className="text-lg font-semibold">Course Resources</h3>
                <ul className="grid gap-2">{renderResources(course)}</ul>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-300">Loading...</p>
      )}
    </>
  );
};
function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
export default CourseDetail;
