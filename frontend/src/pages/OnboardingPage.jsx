import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../services/profileServices";

function OnboardingPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    height_cm: "",
    weight_kg: "",
    sex: "",
    goal: "",
    activity_level: "SEDENTARY",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createProfile({
        age: Number(form.age),
        height_cm: Number(form.height_cm),
        weight_kg: Number(form.weight_kg),
        sex: form.sex,
        goal: form.goal,
        activity_level: form.activity_level,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Profile creation error:", err);
      alert("Profile creation failed");
    }
  };

  return (
    <div>
      <h2>Create Your Profile</h2>

      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="height_cm" placeholder="Height (cm)" onChange={handleChange} />
      <input name="weight_kg" placeholder="Weight (kg)" onChange={handleChange} />

      <select name="sex" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <select name="goal" onChange={handleChange}>
        <option value="">Select Goal</option>
        <option value="BULKING">Bulking</option>
        <option value="CUTTING">Cutting</option>
        <option value="MAINTAINING">Maintaining</option>
      </select>

      <select name="activity_level" onChange={handleChange}>
        <option value="SEDENTARY">Sedentary</option>
        <option value="MODERATE">Moderate</option>
        <option value="ACTIVE">Active</option>
      </select>

      <button onClick={handleSubmit}>Create Profile</button>
    </div>
  );
}

export default OnboardingPage;
