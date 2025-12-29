function WorkoutPlanCard({ workoutPlan }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", width: "50%" }}>
      <h4>Workout Plan</h4>
      <p><strong>Split:</strong> {workoutPlan.split}</p>
      <p><strong>Frequency:</strong> {workoutPlan.frequency}</p>
      <p><strong>Focus:</strong> {workoutPlan.focus}</p>
      <p>{workoutPlan.details}</p>
    </div>
  );
}

export default WorkoutPlanCard;
