import React from "react";
import Sidebar from "../components/Sidebar";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Contributor = () => {
  return (
    <>
      <Sidebar />
      <Card className="w-full max-w-3xl sm:ml-52 mt-16">
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
                <h2 className="text-lg font-bold">My Courses</h2>
                <p className="text-sm leading-none text-gray-500 dark:text-gray-400">Welcome back, Alice Johnson!</p>
              </div>
            </div>
            <div className="border-t border-b border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-3 items-center py-3 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400">
                <span className="ml-8">Course</span>
                <span>Assigned</span>
                <span>Deadline</span>
              </div>
              <div className="grid grid-cols-3 items-center py-3 border-t">
                <span className="flex items-center space-x-2">
                  <span className="font-semibold">Introduction to Biology</span>
                </span>
                <span>Mar 12, 2023</span>
                <span>Mar 30, 2023</span>
                <Button className="w-20">Review</Button>
              </div>
              <div className="grid grid-cols-3 items-center py-3 border-t">
                <span className="flex items-center space-x-2">
                  <span className="font-semibold">History of Art</span>
                </span>
                <span>Jan 20, 2023</span>
                <span>Feb 10, 2023</span>
                <Button className="w-20">Review</Button>
              </div>
              <div className="grid grid-cols-3 items-center py-3 border-t">
                <span className="flex items-center space-x-2">
                  <span className="font-semibold">Creative Writing Workshop</span>
                </span>
                <span>Apr 5, 2023</span>
                <span>Apr 25, 2023</span>
                <Button className="w-20" >Review</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Contributor;
