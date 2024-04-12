// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// contract address = 0x28bf93bd2df975edcb71d1588bac73cc4ed9f05a deployed on sepolia
contract Contributor {
    struct Course {
        uint id;
        string title;
        string description;
        string category;
        string assignedDate;
        string deadline;
        address contributorAddress; 
    }
    
    struct Submission {
        uint id;
        uint courseId;
        address userAddress;
        string submittedAt;
        string code;
        bool approved;
        bool rejected;
    }

    mapping(uint => Course) public courses;
    mapping(uint => Submission[]) public courseSubmissions;

    uint public courseCount;
    
    // Events
    event CourseAssigned(uint indexed id, string title, address indexed contributorAddress);
    event SubmissionReceived(uint indexed courseId, uint indexed submissionId, address indexed userAddress);
    event SubmissionApproved(uint indexed courseId, uint indexed submissionId);
    event SubmissionRejected(uint indexed courseId, uint indexed submissionId);

    // Assign a new course
    function assignCourse(string memory _title, string memory _description, string memory _category, string memory _assignedDate, string memory _deadline) public {
        courseCount++;
        courses[courseCount] = Course(courseCount, _title, _description, _category, _assignedDate, _deadline, msg.sender);
        emit CourseAssigned(courseCount, _title, msg.sender);
    }

    // Get marked courses
    function getMarkedCourses() public view returns (Course[] memory) {
        Course[] memory markedCourses = new Course[](courseCount);
        uint markedCount = 0;
        for (uint i = 1; i <= courseCount; i++) {
            if (courses[i].contributorAddress == msg.sender) {
                markedCourses[markedCount++] = courses[i];
            }
        }
        return markedCourses;
    }

    // Submit assignment 
    function submitAssignment(uint _courseId, string memory _submittedAt, string memory _code) public {
        courseSubmissions[_courseId].push(Submission(courseSubmissions[_courseId].length + 1, _courseId, msg.sender, _submittedAt, _code, false, false));
        emit SubmissionReceived(_courseId, courseSubmissions[_courseId].length, msg.sender);
    }

    // Approve submission
    function approveSubmission(uint _courseId, uint _submissionId) public {
        courseSubmissions[_courseId][_submissionId - 1].approved = true;
        emit SubmissionApproved(_courseId, _submissionId);
    }

    // Reject submission
    function rejectSubmission(uint _courseId, uint _submissionId) public {
        courseSubmissions[_courseId][_submissionId - 1].rejected = true;
        emit SubmissionRejected(_courseId, _submissionId);
    }
}
