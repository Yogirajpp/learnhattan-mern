import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";
import React from "react";
import { signData } from "../components/EnrollContract";
const CourseEnroll = () => {
  const enrollCourse = async (courseId) => {
    try {
      const signature = await signData(courseId);

      console.log("Signature:", signature);
    } catch (error) {
      console.error("Error signing data:", error);
    }
  };
  return (
    <>
      <Sidebar />
      <main className="p-8 ml-52 mt-16 bg-white text-black">
        <section className="grid md:grid-cols-3 gap-8 p-5 shadow-xl rounded-xl">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">
              The Complete 2024 Web3 Development Bootcamp
            </h1>
            <p className="text-sm mb-4">
              Become a Full-Stack Web Developer with just ONE course. HTML, CSS,
              Javascript, Node, React, PostgreSQL, Web3 and DApps
            </p>
            <div className="flex items-center text-sm mb-4">
              <StarIcon className="text-yellow-400 w-4 h-4" />
              <span className="ml-1">4.7 (352,834 ratings)</span>
              <span className="mx-2">·</span>
              <span>1,192,940 students</span>
            </div>
            <div className="text-sm mb-4">
              Created by
              <span className="text-violet-300"> Devin</span>
            </div>
            <div className="flex items-center text-sm mb-4">
              <span>Last updated 3/2024</span>
              <span className="mx-2">·</span>
              <span className="text-violet-300">English, Arabic, [Auto]</span>
              <span className="mx-2">·</span>
              <span>3 more</span>
            </div>
            <Button className="bg-violet-600 text-white py-2 px-4 rounded">
              Go to course
            </Button>

            <div className="flex space-x-2 mt-4">
              <Button
                className="border border-violet-600 text-violet-600"
                variant="outline"
              >
                Gift this course
              </Button>
              <Button
                className="border border-violet-600 text-violet-600"
                variant="outline"
              >
                Apply Coupon
              </Button>
            </div>
          </div>
          <div className="bg-white text-black shadow-xl t p-4 rounded">
            <div className="bg-white h-56 shadow-xl w-full mb-4 rounded-xl" />
            <div className="text-sm">
              <div className="mb-2 flex justify-center ">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 px-16"
                  onClick={() => enrollCourse(course._id)}
                >
                  Enroll
                </Button>
              </div>
              <div className="mt-4">
                <div className="text-sm mb-2">This course includes:</div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>67 hours on-demand video</li>
                  <li>6 articles</li>
                  <li>74 downloadable resources</li>
                  <li>Access on mobile and TV</li>
                  <li>Certificate of completion</li>
                  <li>Full lifetime access</li>
                </ul>
              </div>
              <div className="mb-2">Share this course</div>
            </div>
          </div>
        </section>
        <section className="mt-8 shadow-xl rounded-xl p-5">
          <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm">
                Build 10+ web development projects for your portfolio, ready to
                apply for junior developer jobs.
              </p>
              <p className="text-sm">
                Learn the latest technologies, including Javascript, React, Node
                and even Web3 and DApps.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">
                Be sure you're able to build your fully-fledged websites and web
                apps fast and understand browser React Master frontend
                development with React.
              </p>
              <p className="text-sm">
                Learn professional developer best practices.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Course content</h2>
          <div className="text-sm mb-4">
            45 sections • 320 lectures • 45h 4m total length
          </div>
          <button className="text-violet-300 text-sm mb-4">
            Expand all sections
          </button>
          <div className=" shadow-xl p-4 rounded mb-4">
            <h3 className="text-sm font-bold mb-2">
              Front-End Web Development Lectures • 37min
            </h3>
            <ul className="text-sm list-none space-y-1">
              <li>What You'll Get In This Course Preview 03:18</li>
              <li>Download the Course Syllabus Preview 00:32</li>
              <li>
                Download the 12 Rules to Learn to Code eBook [Latest Edition]
                00:42
              </li>
              <li>Assignment 1: Make a Website 00:43</li>
              <li>How Does the Internet Actually Work? Preview 03:27</li>
              <li>How Does JavaScript Work? 05:22</li>
              <li>How to Get the Most Out of the Course 03:33</li>
              <li>How to Get Help When You're Stuck 04:39</li>
              <li>Pathfinder 02:23</li>
            </ul>
          </div>
          <div className="shadow-xl p-4 rounded mb-4">
            <h3 className="text-sm font-bold mb-2">
              Front-End Web Development Lectures • 37min
            </h3>
            <ul className="text-sm list-none space-y-1">
              <li>What You'll Get In This Course Preview 03:18</li>
              <li>Download the Course Syllabus Preview 00:32</li>
              <li>
                Download the 12 Rules to Learn to Code eBook [Latest Edition]
                00:42
              </li>
              <li>Assignment 1: Make a Website 00:43</li>
              <li>How Does the Internet Actually Work? Preview 03:27</li>
              <li>How Does JavaScript Work? 05:22</li>
              <li>How to Get the Most Out of the Course 03:33</li>
              <li>How to Get Help When You're Stuck 04:39</li>
              <li>Pathfinder 02:23</li>
            </ul>
          </div>
        </section>
        <section className="mt-8 p-7 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Instructor</h2>
          <div className="flex items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-[#222] mr-4" />
            <div>
              <h3 className="text-lg font-bold">Devin </h3>
              <p className="text-sm">Developer and Lead Instructor</p>
              <p className="text-sm">4.7 Instructor Rating</p>
              <p className="text-sm">72,046 Reviews</p>
              <p className="text-sm">202,455 Students</p>
              <p className="text-sm">5 Courses</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            I'm devin, I'm a developer with a passion for teaching. I've had the
            instructor at the London App Brewery, London's leading Programming
            Bootcamp. I've helped hundreds of thousands of students learn to
            code and change their lives by becoming developers. But most
            importantly, I realized that my greatest joy is teaching others what
            I was once desperate to learn.
          </p>
          <p className="text-sm mb-4">
            I've spent close to two years teaching myself Java at 12 years old,
            wanting to build my own Space Invader game. Since then, I've
            launched hundreds of websites, apps and games. But most importantly,
            I realized that my greatest pleasure is teaching.
          </p>
          <p className="text-sm">
            I spend most of my time researching how to make learning to code fun
            and make hard concepts easy to understand. I apply my love of
            teaching to my bootcamp courses. My courses could feel different,
            but also lots of explanations and animations to make sure everything
            is easy to understand.
          </p>
        </section>
        <section className="mt-8 shadow-xl p-7 rounded-xl">
          <h2 className="text-xl font-bold mb-4">4.7 course rating</h2>
          <p className="text-sm mb-4">366K ratings</p>
          <div className=" grid md:grid-cols-2 gap-8">
            <div className=" shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Akshay K.</p>
                  <p className="text-xs">2 months ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                I really liked the build first approach in this course, very
                basically build a mini project for every section you learn. Some
                sections are quite outdated but Angela is adding constant
                updates.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Zarko N.</p>
                  <p className="text-xs">a month ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Great! Great! worth all the money + has frequent updates
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Bijmohan</p>
                  <p className="text-xs">2 months ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Course is well organized and well taught. After completing this
                course your concepts on frontend and backend will be crystal
                clear. After that all depends on your practice.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
            <div className="shadow-xl p-4 rounded-xl mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#333] mr-4" />
                <div>
                  <p className="text-sm font-bold">Steven</p>
                  <p className="text-xs">over a month ago</p>
                </div>
              </div>
              <p className="text-sm mb-4">
                Covered basic topic of web development industry. Explained a lot
                of basic programming knowledge with easy to understand
                explanation.
              </p>
              <button className="text-violet-300 text-xs">Helpful</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseEnroll;

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
