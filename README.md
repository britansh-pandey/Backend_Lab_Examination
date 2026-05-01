Task 2 -:
Online Course Platform with Session and Cookies
Scenario
You are building a simple online course platform where users can log in as student or instructor. Users should stay logged in using sessions and cookies. Access to certain routes depends on user role.
Requirements
Use Node.js with Express
Use cookie parser
Use express session
Routes to implement
GET /
Return welcome message
POST /login
Accept username and role
Store user data in session
Set cookie user with username
GET /courses
Accessible only if user is logged in
Return list message like You can view courses
GET /create course
Allow access only if role is instructor
If not instructor return access denied
GET /profile
Display username and role from session
GET /logout
Destroy session
Clear cookies
Return logout message
Extra Requirement
If user revisits after logout and cookie still exists
Display message Welcome back last time you logged in as username

