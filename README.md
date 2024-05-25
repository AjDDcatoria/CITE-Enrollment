# CITE ENROLLMENT SYSTEM

## Overview
The Classroom Management System is a web application built using React, Node.js, Express, Sequelize, and MySQL. It provides a platform for instructors to create rooms for their classes, automatically generating Google Classroom (GC) instances. Students can then enroll in these rooms, and upon acceptance by the instructor, they are added to the corresponding Google Classroom.

## Features

- **Room Creation:** Instructors can create rooms for their classes through the web interface.
  
- **Automatic GC Creation:** Upon creating a room, the system automatically generates a corresponding Online Classroom instance.

- **Student Enrollment:** Students can enroll in available rooms by providing necessary details.

- **Instructor Approval:** Instructors have the authority to approve or reject student enrollment requests.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **ORM:** Sequelize

## Setup Instructions

1. **Clone the Repository:**
   ```
   git clone <git@github.com:AjProgrammer1/CITE-Enrollment.git>
   ```

2. **Install Dependencies:**
   ```
   cd CITE-Enrollment
   npm install
   ```

3. **Database Configuration:**
   - Set up a MySQL database and update the database configuration in `config/config.json` file.

4. **Google Classroom API Configuration:**
   - Follow the Google Classroom API documentation to obtain credentials and set up OAuth for integration.

5. **Run the Application node server:**
   ```
   npm run test
   ```
6. **Run the Application react server:**
   ```
   npm run dev
   ```

7. **Access the Application:**
   - Open your web browser and navigate to `http://localhost:5173` to access the application.

## Usage

1. **Chair Workflow:**
   - Log in as an instructor.
   - Create a new room for your class.
   - Approve or reject student enrollment requests.
   - Approve or reject account request.

2. **Instructor Workflow:**
   - Log in as an instructor.
   - Create a new room for your class.
   - Approve or reject student enrollment requests.

3. **Student Workflow:**
   - Log in as a student.
   - Browse available rooms and enroll in desired classes.
   - Await instructor approval.

## Future Enhancements

- Implement real-time notifications for instructors and students.
- Add support for multiple instructors per room.
- Enhance user interface for better user experience.
- Implement additional features for classroom management, such as assignment submissions, grading, etc.

## Contributors

- [AJ](https://github.com/AjProgrammer1)
