function MacrosCard({ macros }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <h3>Macros Distribution</h3>

      <p>
        <strong>Goal:</strong> {macros.goal}
      </p>
      <p>
        <strong>Calories:</strong> {macros.calories} kcal
      </p>
      <p>
        <strong>Protein:</strong> {macros.protein} g
      </p>
      <p>
        <strong>Carbs:</strong> {macros.carbs} g
      </p>
      <p>
        <strong>Fats:</strong> {macros.fats} g
      </p>

      <button
        onClick={() => alert("Macro editing coming soon")}
        style={{ marginTop: "8px" }}
      >
        Edit Macros
      </button>
    </div>
  );
}

export default MacrosCard;
