# TikTok REST API (WEB102 Practical 2)

## Overview
This project is a RESTful API for a TikTok-like application built using Node.js and Express.js. It manages users, videos, and comments.

## Features
- CRUD operations for Users, Videos, Comments
- Like/Unlike functionality
- Follow/Unfollow users
- Nested routes (comments, user videos)

## Technologies Used
- Node.js
- Express.js
- Nodemon
- CORS
- Morgan

## Installation
```bash
npm install
npm run dev

API Endpoints
Users
GET /api/users
POST /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
Videos
GET /api/videos
POST /api/videos
GET /api/videos/:id
Comments
GET /api/comments
POST /api/comments

# Testing

Use Postman or curl:
curl http://localhost:3000/api/users

I face trouble like the npm packages were not able to install properly causing 3 vulnerabilitires which i used OpenAi Chatbox to seek s assitnace nad the root of the problem i used "npm audit fix" and to check how and whereot wemt wrong i used npm audit