function ProfileCard({ profile }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", marginBottom: "16px" }}>
      <h2>Your Profile</h2>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Height:</strong> {profile.height_cm} cm</p>
      <p><strong>Weight:</strong> {profile.weight_kg} kg</p>
      <p><strong>Sex:</strong> {profile.sex}</p>
      <p><strong>Goal:</strong> {profile.goal}</p>
      <p><strong>Activity Level:</strong> {profile.activity_level}</p>
    </div>
  );
}

export default ProfileCard;
