import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getMyProfile, updateProfile } from "../services/profileServices";

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
        setForm(data); // ✅ use fetched data
      } catch (err) {
        setError("Could not load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Profile Display */}
      <div>
        <h2>Your Profile</h2>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Height:</strong> {profile.height_cm} cm</p>
        <p><strong>Weight:</strong> {profile.weight_kg} kg</p>
        <p><strong>Sex:</strong> {profile.sex}</p>
        <p><strong>Goal:</strong> {profile.goal}</p>
        <p><strong>Activity Level:</strong> {profile.activity_level}</p>
      </div>

      {/* Edit Mode */}
      {editing && form ? (
        <div>
          <h2>Edit Profile</h2>

          <input
            type="number"
            value={form.weight_kg}
            onChange={(e) =>
              setForm({ ...form, weight_kg: e.target.value })
            }
          />

          <select
            value={form.goal}
            onChange={(e) =>
              setForm({ ...form, goal: e.target.value })
            }
          >
            <option value="BULKING">Bulking</option>
            <option value="CUTTING">Cutting</option>
            <option value="MAINTAINING">Maintaining</option>
          </select>

          <button
            onClick={async () => {
              try {
                const updated = await updateProfile({
                  weight_kg: Number(form.weight_kg),
                  goal: form.goal,
                });

                setProfile(updated); // ✅ sync UI with backend
                setForm(updated);
                setEditing(false);
              } catch (err) {
                alert("Update failed");
                console.log(err)
              }
            }}
          >
            Save
          </button>

          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      )}

      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
