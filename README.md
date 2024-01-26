# Node.js API using JSON Files

This project is a Node.js API that uses JSON files for data storage. It manages user data, including creating and retrieving user information. 

## Features

- Manage users with properties: `id`, `name`, `username`, and `email`.
- Store user data in JSON files.
- Auto-increment user IDs with a separate JSON file for ID tracking.
- Enable CORS for cross-origin requests.

## Installation

To get started with this project, follow these steps:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/BrightBoost/dummyapi.git
``` 

2. Install Dependencies
Navigate to the project directory and install the required dependencies:

```bash
cd your_project
npm install
``` 
This will install Express, CORS, and any other necessary packages.

3. Start the Server
Run the following command to start the server:

```
npm start
``` 

By default, the server will run on http://localhost:3000. You can change this in the `server.js` file.

4. API Endpoints
The following endpoints are available:

GET /api/users: Fetch all users.
POST /api/users: Add a new user.
PUT /api/users/:id: Update an existing user.
DELETE /api/users/:id: Delete a user.

Data Storage
User data is stored in the ./data/users.json file, and the current user ID is tracked in ./data/currentId.json.