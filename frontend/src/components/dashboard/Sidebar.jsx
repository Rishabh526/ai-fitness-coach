function Sidebar({
  onEditProfile,
  onEditWorkout,
  onEditMacros,
  onRegeneratePlan,
}) {
  return (
    <aside
      style={{
        width: "220px",
        borderRight: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><button onClick={onEditProfile}>Edit Profile</button></li>
        <li><button onClick={onEditWorkout}>Edit Workout Plan</button></li>
        <li><button onClick={onEditMacros}>Edit Macros</button></li>
        <li><button onClick={onRegeneratePlan}>Regenerate AI Plan</button></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
