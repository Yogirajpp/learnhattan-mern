import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
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
        const response = await axios.get(`http://localhost:8080/api/users/${user2.user}/marked-courses`);
        setMarkedCourses(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching marked courses:', error);
        setIsLoading(false);
      }
    };

    fetchMarkedCourses();
  }, [user2]);

  const handleReviewClick = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/submissions/allSubmissions/${courseId}`);
      setSubmissions(response.data.submissions);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleApproveSubmission = async (assignmentId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/mark-complete/${user2.user}/${assignmentId}`);
      // Refresh submissions
      handleReviewClick(selectedCourse);
      console.log("approved successfully");
    } catch (error) {
      console.error('Error approving submission:', error);
    }
  };
  
  const handleRejectSubmission = async (assignmentId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/mark-reject/${user2.user}/${assignmentId}`);
      // Refresh submissions
      handleReviewClick(selectedCourse);
      console.log("rejected successfully");
    } catch (error) {
      console.error('Error rejecting submission:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <Card className="w-full max-w-5xl sm:ml-52 mt-16">
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
                <div className="grid grid-cols-3 items-center py-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                  <span className="ml-8">Course Title</span>
                  <span>Assigned Date</span>
                  <span>Deadline</span>
                </div>
                {markedCourses.map((course) => (
                  <div key={course._id} className="grid grid-cols-3 items-center py-3 border-t">
                    <span className="flex items-center space-x-2">
                      <span className="font-semibold text-lg">{course.title}</span>
                    </span>
                    <span>{course.assignedDate}</span>
                    <span>{course.deadline}</span>
                    <Button className="w-20 h-8" onClick={() => handleReviewClick(course._id)}>Review</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Card className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle>Submissions for {selectedCourse} </CardTitle>
              <Button onClick={() => setSelectedCourse(null)}>Close</Button>
            </CardHeader>
            <CardContent>
              <div>
                <h2>Submissions:</h2>
                <ul>
                  {submissions.map((submission) => (
                    <li key={submission._id}>
                      <p>Submitted By: {submission.userId}</p>
                      <p>Submission Date: {submission.submittedAt}</p>
                      <p>Code: {submission.code}</p>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleApproveSubmission(submission._id)}>Approve</Button>
                        <Button onClick={() => handleRejectSubmission(submission._id)}>Reject</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Contributor;
