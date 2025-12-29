function WorkoutPlanCard({ workoutPlan }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <h3>Workout Plan</h3>

      <p>
        <strong>Split:</strong> {workoutPlan.split}
      </p>
      <p>
        <strong>Frequency:</strong> {workoutPlan.frequency}
      </p>
      <p>
        <strong>Focus:</strong> {workoutPlan.focus}
      </p>

      <p style={{ marginTop: "8px" }}>{workoutPlan.summary}</p>

      <button
        onClick={() => alert("Workout editing coming soon")}
        style={{ marginTop: "8px" }}
      >
        Edit Workout
      </button>
    </div>
  );
}

export default WorkoutPlanCard;
