function MacrosCard({ macros }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", width: "50%" }}>
      <h4>Macros Distribution</h4>
      <p><strong>Goal:</strong> {macros.goal}</p>
      <p><strong>Calories:</strong> {macros.calories} kcal</p>
      <p><strong>Protein:</strong> {macros.protein} g</p>
      <p><strong>Carbs:</strong> {macros.carbs} g</p>
      <p><strong>Fats:</strong> {macros.fats} g</p>
    </div>
  );
}

export default MacrosCard;
