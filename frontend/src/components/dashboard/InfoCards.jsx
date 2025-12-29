import WorkoutPlanCard from "./WorkoutPlanCard";
import MacrosCard from "./MacrosCard";

function InfoCards({ workoutPlan, macros }) {
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
      <WorkoutPlanCard workoutPlan={workoutPlan} />
      <MacrosCard macros={macros} />
    </div>
  );
}

export default InfoCards;
