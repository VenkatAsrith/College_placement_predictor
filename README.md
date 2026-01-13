# Placement Predictor Pro

## Overview
This is a full-stack Machine Learning application that predicts student placement probabilities based on academic and lifestyle metrics.

### Components
1. **Frontend**: React + Vite (Futuristic Glassmorphism UI)
2. **Backend**: Node.js + Express (API Gateway & Database Logger)
3. **ML Service**: Python + Flask (Inference Engine)

## Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- MongoDB (Running locally on default port 27017)

## Setup & Run Instructions

### 1. ML Service (Python)
This service runs the machine learning model.
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```
*Runs on http://127.0.0.1:5000*

### 2. Backend (Node.js)
This service handles API requests and logs data to MongoDB.
```bash
cd Backend
npm install
npm run dev
```
*Runs on http://localhost:3000*

### 3. Frontend (React)
The user interface.
```bash
cd Frontend
npm install
npm run dev
```
*Accessible via browser (usually http://localhost:5173)*

## Missing Dependencies Fixed
The following dependencies were identified as missing and have been added:

- **Frontend**: 
  - `react`, `react-dom` (Core framework)
  - `vite`, `@vitejs/plugin-react` (Build tool)
  - `framer-motion` (Animations)
  - `lucide-react` (Icons)
  - `axios` (API Client)
  
- **Backend**:
  - `express` (Web server)
  - `mongoose` (MongoDB interaction)
  - `cors` (Cross-Origin Resource Sharing)
  - `axios` (To communicate with ML Service)

- **ML Service**:
  - `flask` (Web framework)
  - `scikit-learn`, `numpy` (ML libraries)
