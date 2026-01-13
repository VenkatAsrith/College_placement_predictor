Campus Placement Prediction System
📌 Overview

The Campus Placement Prediction System is a full-stack machine learning application designed to predict whether a student is likely to be placed during campus recruitment based on academic consistency, behavioral patterns, lifestyle habits, and skill readiness.

This project demonstrates the complete machine learning lifecycle—from dataset creation and preprocessing to model training, evaluation, retraining, and deployment—integrated with a modern MERN stack architecture.

The system follows a three-tier microservice architecture consisting of:

a Python-based ML prediction service,

a Node.js backend for data handling and storage,

a React frontend for user interaction.

🎯 Project Objectives

To predict campus placement outcomes using supervised machine learning

To analyze the impact of academic, behavioral, and lifestyle factors on placements

To deploy a trained ML model as a reusable web service

To integrate machine learning with a full-stack web application

To store user inputs and predictions for future analysis

🧠 Machine Learning Approach

Problem Type: Supervised Learning (Binary Classification)

Algorithm Used: Logistic Regression

Target Variable: Placed (Yes / No)

🔍 Feature Selection

To improve real-world applicability and avoid data leakage, internal and external exam marks were removed during retraining.

Final features used:

CGPA

Attendance

Study Hours

Sleep Hours

Social Time

Stress Score

Certifications

🏗️ System Architecture
React Frontend
     ↓
Node.js Backend (Express)
     ↓
Python ML Service (Flask)
     ↓
MongoDB (User Data & Predictions)


The frontend collects user inputs and displays predictions.

The backend handles API requests, database storage, and communication with the ML service.

The ML service loads a trained model and returns predictions.

MongoDB stores all user inputs and prediction results.

📁 Project Structure
placement-prediction-system/
│
├── ml-service/                 # Machine Learning Service
│   ├── app.py                  # Flask API for predictions
│   ├── placement_model_final.pkl
│   └── requirements.txt
│
├── backend/                    # Node.js Backend
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   │   └── predict.js
│   └── models/
│       └── Student.js
│
├── frontend/                   # React Frontend
│   ├── package.json
│   └── src/
│       ├── components/
│       │   └── PlacementForm.jsx
│       ├── App.jsx
│       └── index.css
│
└── README.md

⚙️ Tech Stack
Machine Learning

Python

Pandas, NumPy

scikit-learn

Flask

Backend

Node.js

Express.js

MongoDB (Mongoose)

Frontend

React.js

HTML, CSS

🚀 How to Run the Project (Local Setup)
1️⃣ Start the ML Service
cd ml-service
python app.py


Runs on: http://localhost:5000

2️⃣ Start the Backend Server
cd backend
npm install
node server.js


Runs on: http://localhost:3000

3️⃣ Start the Frontend
cd frontend
npm install
npm start


Opens in browser automatically.

📊 Data Handling

Training Data: Synthetic dataset created with realistic academic and lifestyle assumptions

User Input Data: Stored in MongoDB

Predictions: Stored along with confidence scores

Model Storage: Serialized using Pickle (.pkl file)

🧪 Model Evaluation

The model was evaluated using:

Accuracy

Confusion Matrix

Precision, Recall, F1-score

Retraining after feature removal resulted in a more generalizable and realistic model suitable for deployment.

🧠 Key Learnings

Importance of feature selection and avoiding data leakage

End-to-end ML pipeline implementation

Deploying ML models as microservices

Integrating ML with full-stack web applications

Real-world system design using REST APIs

🔮 Future Enhancements

Add probability-based recommendations

Admin dashboard for analytics

Automatic model retraining using stored data

Role-based access (student / admin)

Deployment on cloud platforms

📄 Conclusion

This project successfully demonstrates how machine learning models can be integrated into real-world applications using modern web technologies. By combining data analysis, supervised learning, and full-stack development, the system provides meaningful insights into campus placement readiness while maintaining scalability and modularity.

👤 Author

Konam Venkat Asrith
B.Tech CSE (2027)
