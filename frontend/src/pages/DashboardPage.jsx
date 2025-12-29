import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getMyProfile, updateProfile } from "../services/profileServices";

import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ProfileCard from "../components/dashboard/ProfileCard";
import EditProfilePanel from "../components/dashboard/EditProfilePanel";
import ChatSection from "../components/dashboard/ChatSection";

function DashboardPage() {
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
