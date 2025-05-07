# Save all files as structured.

# Run the server:
node index.js
#request for register:
{
  "username": "rudra",
  "password": "123456"
}
#response:
{
  "message": "User registered successfully"
}

# request Login to get token: 
POST /login
{
  "username": "rudra",
  "password": "123456"
}

#response:
{"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJ1ZHJhIiwiaWF0IjoxNzQ2NjQzMzk4LCJleHAiOjE3NDY2NDY5OTh9.Lwdx3EjJa_0_IP2hYe8ff8R_x87ag4ko8-H80-GjxEA"
}

#  Sample Request/Response
# POST /tasks
# Request:
{
  "title": "xyz",
  "description": "hello"
}
# Response:
  {
      "id": "fc437db2-95e9-4f7a-9930-0240f60df575",
      "title": "xyz",
      "description": "hello",
      "status": "pending",
      "createdAt": "2025-05-07T18:47:35.624Z"
    }

# PUT /tasks
# Request:
{
  "title": "xyzm",
  "description": "helldso"
}
# Response:
{
  "id": "fc437db2-95e9-4f7a-9930-0240f60df575",
  "title": "xyzm",
  "description": "helldso",
  "status": "pending",
  "createdAt": "2025-05-07T18:47:35.624Z"
}
# GET /tasks
# Response:
{
  "page": 1,
  "total": 1,
 "tasks":
 [
  {
    "id": "fc437db2-95e9-4f7a-9930-0240f60df575",
    "title": "xyzm",
    "description": "helldso",
    "status": "pending",
    "createdAt": "2025-05-07T18:47:35.624Z"
  }
]
}

# DELETE /tasks/:id
# Response:
{
  "message": "Task deleted successfully"
}