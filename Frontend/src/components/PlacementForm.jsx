import { useState } from "react";

export default function PlacementForm() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const submit = async () => {
    const res = await fetch("http://localhost:3000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="card">
      <h2>Placement Prediction</h2>

      {["cgpa","attendance","internal","external","study","sleep","social","stress","certifications"]
        .map(f => (
          <input
            key={f}
            placeholder={f}
            onChange={e => setForm({...form, [f]: e.target.value})}
          />
      ))}

      <button onClick={submit}>Predict</button>

      {result && (
        <div className="result">
          <h3>{result.prediction}</h3>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}
