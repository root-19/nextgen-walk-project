Walk Counter Web Application

Overview

The Walk Counter Web Application tracks a user's steps when they click a button. It logs their walking activity and stores the data in a MySQL database. The application is built using React.js (frontend), Node.js (backend), and MySQL (database).

Features

Core Features:

Step Counter Button: Users click a button to register a step.

Live Step Count Display: The total steps are displayed on the screen in real-time.

User Authentication: Users can register and log in to save their progress.

Daily Step Tracking: Steps are stored per user on a daily basis.

Progress History: Users can view their step history in a table format.

Additional Features:

Leaderboard: Ranks users based on the highest number of steps.

Goals & Achievements: Users can set daily/weekly goals and earn badges.

Notifications: Sends reminders to encourage users to walk more.

Analytics Dashboard: Provides insights like average steps per day.

Social Sharing: Users can share their progress on social media.

Dark Mode: A theme toggle for better user experience.

Pedometer Integration: Option to sync with mobile sensors for auto-tracking.

Tech Stack

Frontend: React.js, Tailwind CSS (for styling)

Backend: Node.js with Express.js

Database: MySQL

Authentication: JWT (JSON Web Tokens)

Real-Time Updates: WebSockets or polling

Database Schema

Users Table

Column

Type

Description

id

INT (PK)

Unique user ID

username

VARCHAR(50)

User's name

email

VARCHAR(100)

User's email

password

VARCHAR(255)

Hashed password

created_at

TIMESTAMP

Account creation time

Steps Table

Column

Type

Description

id

INT (PK)

Unique step entry ID

user_id

INT (FK)

References Users table

steps

INT

Number of steps counted

date

DATE

Date of entry

API Endpoints

User Authentication

POST /api/register → Register a new user

POST /api/login → User login

GET /api/user → Get user details

Step Management

POST /api/steps → Add a step count

GET /api/steps/:userId → Get step history for a user

GET /api/leaderboard → Get top users by steps

Future Enhancements

Wearable Device Integration (Sync with fitness bands)

AI-based Suggestions (Personalized walking goals)

Multiplayer Mode (Challenge friends in step competitions)

Conclusion

This project provides a fun and engaging way for users to track their steps and maintain a healthy lifestyle. The combination of a step counter, leaderboard, and analytics ensures user engagement and motivation.