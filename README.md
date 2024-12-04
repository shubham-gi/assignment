# EmployWise Assignment

Deployed Link: https://employwise.netlify.app/
Tech Stack: ReactJs, Tailwind CSS, ContextAPI
Level 1: Authentication Screen
● Create a basic authentication screen where the user can log in using credentials.
● Use the following endpoint for authentication:
○ POST /api/login with email and password in the body.
○ Email : eve.holt@reqres.in
○ Password : cityslicka
● On successful login, store the token (returned by the API) and navigate to the Users List page
(Level 2).
Level 2: List All Users
● After logging in, display a paginated list of users.
● Use the following endpoint to fetch user data:
○ GET /api/users?page=1
● Display the user's first name, last name, and avatar in a structured layout (table or card
format).
● Implement pagination to navigate through different pages of users.
● Pagination or lazy loading both are accepted
Level 3: Edit, Delete, and Update Users
● Each user in the list should have options to Edit or Delete their details.
● Edit:
○ Clicking Edit should open a form pre-filled with the user's data.
○ Allow updating the user's first name, last name, and email.
○ Use the following endpoint for updates:
■ PUT /api/users/{id}
● Delete:
○ Clicking Delete should remove the user from the list.
○ Use the following endpoint for deletion:
■ DELETE /api/users/{id}
● Show appropriate success or error messages based on the outcome of each operation.
