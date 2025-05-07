#  Task Manager API

A simple RESTful API built with **Node.js** and **Express.js** to manage tasks (to-do items) with **in-memory storage**, **user authentication using JWT**, and support for **pagination, filtering, and sorting**.

---

##  Features

-  User Registration and Login (JWT auth via cookies)
-  Create, Read, Update, and Delete (CRUD) operations on tasks
-  In-memory task storage (no database)
-  Pagination (`?page=1&limit=10`)
- Sorting (`?sortBy=title&order=asc`)
-  Filtering (`?status=completed`)
-  Protected routes using middleware
-  Graceful error handling and validation

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rudra-Maity/task-assignment.git
cd task-assignment
