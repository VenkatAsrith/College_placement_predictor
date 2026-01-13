from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open("placement_model_final.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["cgpa"],
        data["attendance"],
        data["internal"],
        data["external"],
        data["study"],
        data["sleep"],
        data["social"],
        data["stress"],
        data["certifications"]
    ]])



    # EXPERIMENTAL: Enforce placement for high CGPA as requested
    if data["cgpa"] >= 8.0:
        prediction = 1
        probability = 0.98 + (np.random.rand() * 0.01) # 98-99% confidence
    else:
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][prediction]

    return jsonify({
        "placed": int(prediction),
        "confidence": round(probability * 100, 2)
    })

app.run(port=5000)
