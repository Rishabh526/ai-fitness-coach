import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getMyProfile, updateProfile } from "../services/profileServices";
import { getAIPlan, regenerateAIPlan } from "../services/aiPlanServices";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";
import EditProfilePanel from "../components/dashboard/EditProfilePanel";
import ChatSection from "../components/dashboard/ChatSection";
import WorkoutPlanCard from "../components/dashboard/WorkoutPlanCard";
import MacrosCard from "../components/dashboard/MacrosCard";
import { getMe } from "../services/userService";

function DashboardPage() {
  const { logout, accessToken } = useAuth();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiPlan, setAiPlan] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  // ---------------- User GetMe ----------------

  useEffect(()=> {
    async function fetchUser() {
      try{
        const data = await getMe();
        setUser(data)

      }catch(err){
        console.log("Failed to load user", err)
      }
    }
    fetchUser()
  },[])
  // ---------------- PROFILE ----------------

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMyProfile();
        setProfile(data);
        setForm(data);
      } catch (err) {
        setError("Could not load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const updated = await updateProfile({
        weight_kg: Number(form.weight_kg),
        goal: form.goal,
      });

      setProfile(updated);
      setForm(updated);
      setEditing(false);
    } catch (err) {
      alert("Update failed");
      console.error(err);
    }
  };

  // ---------------- AI PLAN ----------------
//  console.log("ACCESS TOKEN IN DASHBOARD:", accessToken);

  useEffect(() => {
    if (!accessToken) return; // 🔑 CRITICAL FIX

    async function fetchAIPlan() {
      setAiLoading(true);
      setAiError(null);

      try {
        const data = await getAIPlan();
        setAiPlan(data);
      } catch (err) {
        console.error(err);
        setAiError("Could not load AI plan");
      } finally {
        setAiLoading(false);
      }
    }

    fetchAIPlan();
  }, [accessToken]);

  const handleRegenerate = async () => {
    if (!accessToken) return;

    setAiLoading(true);
    setAiError(null);

    try {
      const data = await regenerateAIPlan();
      setAiPlan(data);
    } catch (err) {
      console.error(err);
      setAiError("Failed to regenerate plan");
    } finally {
      setAiLoading(false);
    }
  };

  // ---------------- DERIVED DATA ----------------

  function calculateMacros(profile) {
    const bmr =
      profile.sex === "MALE"
        ? 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age + 5
        : 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age - 161;

    const activityMultiplier = {
      SEDENTARY: 1.2,
      MODERATE: 1.55,
      ACTIVE: 1.75,
    }[profile.activity_level];

    let calories = Math.round(bmr * activityMultiplier);
    if (profile.goal === "CUTTING") calories -= 400;
    if (profile.goal === "BULKING") calories += 300;

    return {
      calories,
      protein: Math.round(profile.weight_kg * 2),
      fats: Math.round((calories * 0.25) / 9),
      carbs: Math.round(
        (calories - profile.weight_kg * 2 * 4 - (calories * 0.25)) / 4
      ),
      goal: profile.goal,
    };
  }

  const macros = profile ? calculateMacros(profile) : null;

  // ---------------- RENDER ----------------

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar username={user?.username} onLogout={logout} />

      <DashboardLayout
        sidebar={
          <Sidebar
            onEditProfile={() => setEditing(true)}
            onEditWorkout={() => {}}
            onEditMacros={() => {}}
            onRegeneratePlan={handleRegenerate}
          />
        }
      >
        <ProfileCard profile={profile} />

        {macros && (
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <WorkoutPlanCard workoutPlan={{ focus: profile.goal }} />
            <MacrosCard macros={macros} />
          </div>
        )}

        {editing && form && (
          <EditProfilePanel
            form={form}
            setForm={setForm}
            onSave={handleSaveProfile}
            onCancel={() => setEditing(false)}
          />
        )}

        {/* AI PLAN CARD */}
        <div className="card">
  <h2>Your AI Fitness Plan</h2>

  {aiLoading && <p>Generating plan...</p>}
  {aiError && <p>{aiError}</p>}

  {aiPlan && (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px",
        maxHeight: "300px",
        overflowY: "auto",
        background: "#fafafa",
      }}
    >
      <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
        {aiPlan.plan_text}
      </pre>
    </div>
  )}

  <button onClick={handleRegenerate}>
    Regenerate Plan
  </button>
  <p style={{ color: "red" }}>
  {/* DEBUG aiPlan: {JSON.stringify(aiPlan)} */}
</p>

</div>


        {/* <ChatSection /> */}
      </DashboardLayout>
    </>
  );
}

export default DashboardPage;
