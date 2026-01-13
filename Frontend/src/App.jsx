import React, { useState } from 'react';
import axios from 'axios';
import {
    BookOpen,
    Clock,
    Users,
    Zap,
    Award,
    Brain,
    Activity,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    TrendingUp,
    GraduationCap
} from 'lucide-react';

const InputField = ({ label, name, type = "number", value, onChange, icon: Icon, min, max, step }) => (
    <div className="input-group">
        <label>
            {Icon && <Icon size={16} strokeWidth={2.5} />}
            {label}
        </label>
        <div className="input-wrapper">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                placeholder=" "
                required
            />
        </div>
    </div>
);

const QUOTES = {
    high: [
        "Success is the sum of small efforts, repeated day in and day out.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Your hard work is paying off! Keep pushing boundaries."
    ],
    medium: [
        "Believe you can and you're halfway there.",
        "Every expert was once a beginner.",
        "Focus on your goals, and the rest will follow."
    ],
    low: [
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The secret of getting ahead is getting started."
    ]
};

function App() {
    const [formData, setFormData] = useState({
        cgpa: '',
        attendance: '',
        // Internal and External removed from user input, will be derived
        study: '',
        sleep: '',
        social: '',
        stress: '',
        certifications: ''
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [quote, setQuote] = useState("");
    const [placementChance, setPlacementChance] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convert inputs to numbers and derive missing fields
        const cgpaVal = parseFloat(formData.cgpa);

        // Heuristic: Infer internal/external marks roughly from CGPA (scale of 10 -> 100)
        // This allows the model to run without breaking, while simplifying the UI for the user.
        const derivedMarks = Math.min(Math.max(cgpaVal * 9.5, 40), 100);

        const payload = {
            cgpa: cgpaVal,
            attendance: parseFloat(formData.attendance),
            internal: derivedMarks,
            external: derivedMarks,
            study: parseFloat(formData.study),
            sleep: parseFloat(formData.sleep),
            social: parseFloat(formData.social),
            stress: parseFloat(formData.stress),
            certifications: parseFloat(formData.certifications)
        };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/predict';
            const response = await axios.post(apiUrl, payload);

            setTimeout(() => {
                const data = response.data;

                // Calculate Placement Probability
                // If likely placed, confidence is the probability.
                // If needs improvement, confidence is prob of NOT placing, so 100 - confidence is placement prob.
                let chance = data.confidence;
                if (data.prediction === "Needs Improvement") {
                    chance = Math.max(0, 100 - data.confidence);
                }

                // Improve UX: Round to 1 decimal
                chance = Math.round(chance * 10) / 10;
                setPlacementChance(chance);

                // Select Quote
                let quoteCategory = 'low';
                if (chance > 80) quoteCategory = 'high';
                else if (chance > 50) quoteCategory = 'medium';

                const randomQuote = QUOTES[quoteCategory][Math.floor(Math.random() * QUOTES[quoteCategory].length)];
                setQuote(randomQuote);

                setResult(data);
                setLoading(false);
            }, 800);

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Ensure backend is running.");
            setLoading(false);
        }
    };

    const resetForm = () => {
        setResult(null);
        setFormData({
            cgpa: '', attendance: '',
            study: '', sleep: '', social: '', stress: '', certifications: ''
        });
    };

    return (
        <div className="main-container">
            <header className="header">
                <h1>Placement Predictor</h1>
                <p>AI-Powered Career Trajectory Analysis</p>
            </header>

            <div className="glass-card">
                {result ? (
                    <div className="result-overlay">
                        <div className="result-content">
                            <div className={`result-icon ${placementChance > 50 ? 'status-placed' : 'status-improvement'}`}>
                                {placementChance > 50 ? <CheckCircle size={40} /> : <TrendingUp size={40} />}
                            </div>

                            <h2 className="result-title">Placement Probability</h2>

                            <div style={{ margin: '20px 0' }}>
                                <span style={{ fontSize: '4rem', fontWeight: '800', letterSpacing: '-2px' }}>
                                    {placementChance}%
                                </span>
                            </div>

                            <div style={{
                                margin: '0 auto 30px',
                                maxWidth: '80%',
                                fontStyle: 'italic',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.5'
                            }}>
                                "{quote}"
                            </div>

                            <button className="reset-btn" onClick={resetForm}>Analyze Another</button>
                        </div>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <InputField
                            label="CGPA (1-10)" name="cgpa"
                            value={formData.cgpa} onChange={handleChange}
                            icon={GraduationCap} min="0" max="10" step="0.1"
                        />
                        <InputField
                            label="Attendance (%)" name="attendance"
                            value={formData.attendance} onChange={handleChange}
                            icon={Users} min="0" max="100"
                        />
                        {/* Internal and External Marks removed as requested */}
                        <InputField
                            label="Study Hours/Day" name="study"
                            value={formData.study} onChange={handleChange}
                            icon={Clock}
                        />
                        <InputField
                            label="Sleep Hours/Day" name="sleep"
                            value={formData.sleep} onChange={handleChange}
                            icon={Activity}
                        />
                        <InputField
                            label="Socializing Hours/Day" name="social"
                            value={formData.social} onChange={handleChange}
                            icon={Users}
                        />
                        <InputField
                            label="Stress Level (1-10)" name="stress"
                            value={formData.stress} onChange={handleChange}
                            icon={Brain} min="1" max="10"
                        />
                        <InputField
                            label="Certifications (Count)" name="certifications"
                            value={formData.certifications} onChange={handleChange}
                            icon={Award} min="0"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Analyzing...' : (
                            <>
                                Predict Placement <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
