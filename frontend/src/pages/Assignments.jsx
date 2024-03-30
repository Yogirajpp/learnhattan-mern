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
const Assignments = () => {

  const { courseId } = useParams(); // Make sure courseId is correctly extracted

  const [course, setCourse] = useState(null);
  const [code, setCode] = useState(""); // State to store the code

  const user2 = JSON.parse(localStorage.getItem("user"));
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
    fetchCourseDetail();
  }, [courseId]);
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
            <PopoverContent className="w-full">
              <Card>
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
                        <button
                          onClick={() =>
                            handleAssignmentSubmission(assignmentId)
                          }
                        >
                          Submit Assignment
                        </button>
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
      <div className="sm:ml-52 mt-16 ">


      </div>
    </>
  )
}

export default Assignments
