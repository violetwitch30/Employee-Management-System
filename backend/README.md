# Fidan Zeynalli - 101504996
## COMP3133 – Assignment 1

This project allows user to:
* Sign up and log in
* Authenticate using JWT
* Add employees
* Update employee details
* Delete employees
* Search employees by department or designation
* Upload employee profile images to Cloudinary

## Installation Instructions
1. Install dependencies: `npm install`
2. Run the server: `node server.js`
3. Open `http://localhost:5000/` in your browser

## Authentication
The API uses JWT authentication to authenticate users.
After login, copy the returned JWT token and use it in Postman:
* Authorization → Bearer Token
* Paste your JWT token.