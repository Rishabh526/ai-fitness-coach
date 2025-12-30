import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getMyProfile, updateProfile } from "../services/profileServices";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";
import EditProfilePanel from "../components/dashboard/EditProfilePanel";
import ChatSection from "../components/dashboard/ChatSection";
import WorkoutPlanCard from "../components/dashboard/WorkoutPlanCard";
import MacrosCard from "../components/dashboard/MacrosCard";

function DashboardPage() {
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function calculateMacros(profile) {
    // very basic BMR + TDEE mock logic (intentionally simple)
    const bmr =
      profile.sex === "MALE"
        ? 10 * profile.weight_kg +
          6.25 * profile.height_cm -
          5 * profile.age +
          5
        : 10 * profile.weight_kg +
          6.25 * profile.height_cm -
          5 * profile.age -
          161;

    const activityMultiplier = {
      SEDENTARY: 1.2,
      MODERATE: 1.55,
      ACTIVE: 1.75,
    }[profile.activity_level];

    let calories = Math.round(bmr * activityMultiplier);

    if (profile.goal === "CUTTING") calories -= 400;
    if (profile.goal === "BULKING") calories += 300;

    const protein = Math.round(profile.weight_kg * 2);
    const fats = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

    return { calories, protein, carbs, fats };
  }

  function generateWorkoutPlan(profile) {
    if (profile.goal === "CUTTING") {
      return {
        split: "Upper / Lower",
        frequency: "4–5 days per week",
        focus: "Fat loss + muscle retention",
        summary:
          "Upper: compound lifts with moderate volume. Lower: strength-focused legs. Includes cardio.",
      };
    }

    if (profile.goal === "BULKING") {
      return {
        split: "Push / Pull / Legs",
        frequency: "6 days per week",
        focus: "Hypertrophy",
        summary:
          "High-volume hypertrophy training with emphasis on progressive overload.",
      };
    }

    return {
      split: "Full Body",
      frequency: "3–4 days per week",
      focus: "Maintenance",
      summary: "Balanced full-body training to maintain muscle and strength.",
    };
  }

  const workoutPlan = profile ? generateWorkoutPlan(profile) : null;

  const macros = profile
    ? {
        ...calculateMacros(profile),
        goal: profile.goal,
      }
    : null;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar username="User" onLogout={logout} />

      <DashboardLayout
        sidebar={
          <Sidebar
            onEditProfile={() => setEditing(true)}
            onEditWorkout={() => console.log("Edit workout (later)")}
            onEditMacros={() => console.log("Edit macros (later)")}
            onRegeneratePlan={() => console.log("Regenerate AI plan (later)")}
          />
        }
      >
        <ProfileCard profile={profile} />

        {/* Workout + Macros Cards */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          {workoutPlan && macros && (
            <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
              <WorkoutPlanCard workoutPlan={workoutPlan} />
              <MacrosCard macros={macros} />
            </div>
          )}
        </div>

        {editing && form && (
          <EditProfilePanel
            form={form}
            setForm={setForm}
            onSave={handleSaveProfile}
            onCancel={() => setEditing(false)}
          />
        )}

        <ChatSection />
      </DashboardLayout>
    </>
  );
}

export default DashboardPage;
