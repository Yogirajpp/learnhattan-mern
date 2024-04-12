// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
//contract address = "0xa1e7ab36e359497bdfc822e57232c3d98e119a87" deployed on sepolia

contract CourseEnrollment {
    struct Course {
        uint id;
        string title;
        address instructor;
        bool isActive;
    }

    struct Enrollment {
        uint courseId;
        address student;
        bool enrolled;
    }

    Course[] public courses;
    mapping(uint => Enrollment[]) public enrollments;
    mapping(address => uint[]) public studentCourses;

    // Event declarations
    event CourseCreated(uint courseId, string title, address instructor);
    event StudentEnrolled(uint courseId, address student);
    event StudentUnenrolled(uint courseId, address student);

    // Create a new course
    function createCourse(string memory _title) public {
        uint courseId = courses.length;
        courses.push(Course(courseId, _title, msg.sender, true));
        emit CourseCreated(courseId, _title, msg.sender);
    }

    // Enroll a student in a course
    function enrollStudent(uint _courseId) public {
        require(courses[_courseId].isActive, "Course is not active.");
        Enrollment memory newEnrollment = Enrollment({
            courseId: _courseId,
            student: msg.sender,
            enrolled: true
        });
        enrollments[_courseId].push(newEnrollment);
        studentCourses[msg.sender].push(_courseId);
        emit StudentEnrolled(_courseId, msg.sender);
    }

    // Check if a student is enrolled in a specific course
    function isEnrolled(uint _courseId, address _student) public view returns (bool) {
        for (uint i = 0; i < enrollments[_courseId].length; i++) {
            if (enrollments[_courseId][i].student == _student && enrollments[_courseId][i].enrolled) {
                return true;
            }
        }
        return false;
    }

    // Get all courses created by an instructor
    function getCoursesByInstructor(address _instructor) public view returns (Course[] memory) {
        uint count = 0;
        // First, count the courses
        for (uint i = 0; i < courses.length; i++) {
            if (courses[i].instructor == _instructor) {
                count++;
            }
        }

        // Then, collect the courses
        Course[] memory instructorCourses = new Course[](count);
        uint index = 0;
        for (uint i = 0; i < courses.length; i++) {
            if (courses[i].instructor == _instructor) {
                instructorCourses[index] = courses[i];
                index++;
            }
        }

        return instructorCourses;
    }
}