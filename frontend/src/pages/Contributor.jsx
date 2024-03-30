// Contributor.jsx

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

// import { useParams } from 'react-router-dom';

const Contributor = () => {
  const [markedCourses, setMarkedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user2 = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMarkedCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${user2.user}/marked-courses`);
        setMarkedCourses(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching marked courses:', error);
        setIsLoading(false);
      }
    };

    fetchMarkedCourses();
  }, [user2]);

  return (
    <>
      <Sidebar />
      <Card className="w-full max-w-5xl sm:ml-52 mt-16">
        <CardHeader className="pb-0">
          <CardTitle>Contributor Panel</CardTitle>
          <CardDescription>View contributor details and course assignments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden w-12 h-12">
              <img
                alt="Image"
                className="border border-gray-200 dark:border-gray-800 rounded-full aspect-square"
                height="48"
                src="https://avatars.githubusercontent.com/u/11247099?v=4"
                width="48"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Alice Johnson</h2>
              <p className="text-gray-500 dark:text-gray-400">Contributor</p>
            </div>
          </div>
          <div className="grid gap-1">
            <p className="text-sm">
              Alice Johnson is a dedicated contributor who is passionate about learning and sharing knowledge with the
              world.
            </p>
          </div>
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
                    <Button className="w-20 h-8">Review</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contributor;
