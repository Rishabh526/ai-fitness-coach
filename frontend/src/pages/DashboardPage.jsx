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

  const workoutPlan = {
    split: "Push / Pull / Legs",
    frequency: "6 days a week",
    focus: "Hypertrophy",
    summary:
      "Push: Chest, shoulders, triceps. Pull: Back, biceps. Legs: Quads, hamstrings, glutes",
  };

  const macros = {
    calories: 2000,
    protein: 150,
    carbs: 220,
    fats: 55,
    goal: profile?.goal,
  };

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
          <WorkoutPlanCard workoutPlan={workoutPlan} />
          <MacrosCard macros={macros} />
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
