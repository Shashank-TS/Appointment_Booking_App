# 🩺 Clinic Appointment Management System

A full-stack MERN application designed to streamline doctor appointment bookings. Built with a focus on user experience and data integrity, it features a fully responsive UI, robust backend validation, and an AI-powered integration that generates professional clinical summaries.

## ✨ Key Features

* **Smart Booking:** Intuitive form with dynamic date/time constraints that strictly prevent booking in the past.
* **AI-Powered Summaries:** Integrates Google's Gemini API to automatically generate a one-sentence clinical summary based on the patient's reason for visiting.
* **Interactive Dashboard:** View all appointments in a responsive, scrollable table with expandable rows to view AI notes.
* **Status Management:** Easily update appointment statuses (Pending, Completed, Cancelled) or delete records.
* **Robust Validation:** Regex-enforced validation on both the frontend and backend to ensure clean name formatting and exact 10-digit mobile numbers.
* **Mobile-First Design:** Styled with Tailwind CSS to ensure seamless functionality across desktop and mobile devices.

## 🛠️ Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, date-fns
* **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
* **AI Integration:** Google Gemini API (`gemini-2.5-flash`)

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed and set up:
* [Node.js](https://nodejs.org/) (v16 or higher)
* [Git](https://git-scm.com/)
* A MongoDB Atlas cluster (or local MongoDB installation)
* A free Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository

Open your terminal and clone the project to your local machine:
```bash
git clone [https://github.com/Shashank-TS/Appointment_Booking_App.git](https://github.com/Shashank-TS/Appointment_Booking_App.git)
cd Appointment_Booking_App
```

### 2. Backend Setup
* Open a terminal and navigate to the backend directory to install its dependencies:

```bash
cd backend
npm install
```

#### Create a .env file in the root of the backend directory and add your environment variables:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Frontend Setup
* Open a new terminal window/tab, navigate to the frontend directory, and install its dependencies:

```bash
cd frontend
npm install
```

### 4. 💻 Running the Application
* To run the full stack, you will need to start both the backend and frontend servers simultaneously in separate terminal windows.

#### Start the Backend Server:
* In your backend terminal, run:

```bash
npm run dev
(The server should log that it is running on port 5000 and connected to MongoDB).
```

#### Start the Frontend Server:
* In your frontend terminal, run:

```bash
npm run dev
```
* visit http://localhost:5000 in browser
