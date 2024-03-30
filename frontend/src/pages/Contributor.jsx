import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const Contributor = () => {
  const [markedCourses, setMarkedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const user2 = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMarkedCourses = async () => {
      try {
        const response = await axios.get(`https://learnhattan-mern.vercel.app/api/users/${user2.user}/marked-courses`);
        setMarkedCourses(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching marked courses:', error);
        setIsLoading(false);
      }
    };

    fetchMarkedCourses();
  }, []);

  const handleReviewClick = async (courseId) => {
    try {
      const response = await axios.get(`https://learnhattan-mern.vercel.app/api/submissions/allSubmissions/${courseId}`);
      setSubmissions(response.data.submissions);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleApproveSubmission = async (assignmentId) => {
    try {
      await axios.put(`https://learnhattan-mern.vercel.app/api/users/mark-complete/${user2.user}/${assignmentId}`);
      // Refresh submissions
      handleReviewClick(selectedCourse);
      console.log("approved successfully");
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };

  const handleRejectSubmission = async (assignmentId) => {
    try {
      await axios.put(`https://learnhattan-mern.vercel.app/api/users/mark-reject/${user2.user}/${assignmentId}`);
      // Refresh submissions
      handleReviewClick(selectedCourse);
      console.log("rejected successfully");
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <Card className="w-full max-w-5xl sm:ml-56 mt-20">
        <CardHeader className="pb-0">
          <CardTitle>Contributor Panel</CardTitle>
          <CardDescription>View contributor details and course assignments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile details */}
        </CardContent>

        <CardContent className="p-6 md:p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold">Marked Courses</h2>
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="border-t border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-row p-6 flex-wrap gap-6">
                  {markedCourses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        alt="Course thumbnail"
                        src={course.image}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{course.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{course.category}</p>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Assigned Date: {course.assignedDate}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Deadline: {course.deadline}</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => handleReviewClick(course._id)}>Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedCourse && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <Card className="w-full h-screen md:w-1/2 overflow-y-auto mt-4 ">
            <CardHeader>
              <div className="flex justify-between">
                <h1 className="text-lg font-bold">Review Assignments</h1>
                <Button size="sm" onClick={() => setSelectedCourse(null)}>Close</Button>
              </div>
              <div>
                You are reviewing assignments for the
                <strong> {selectedCourse} </strong>
                course.{"\n              "}
              </div>
            </CardHeader>
            <div className="flex flex-col gap-4">
              <ul>
                {submissions.map((submission) => (
                  <li key={submission._id}>
                    <CardContent className="flex flex-col gap-2">
                      <div>
                        <h2 className="text-lg font-bold">Submitted by:  </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{submission.userId}</p>
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">Date</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{submission.submittedAt}</p>
                      </div>
                      <h2 className="text-text-base font-semibold">Submission</h2>
                      <div className="border rounded-lg p-4">
                        <pre className="text-sm/relaxed">
                          {submission.code}
                        </pre>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button size="sm" onClick={() => handleApproveSubmission(submission._id)}>Approve</Button>
                      <Button size="sm" variant="outline" onClick={() => handleRejectSubmission(submission._id)}>Reject</Button>
                    </CardFooter>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Contributor;
