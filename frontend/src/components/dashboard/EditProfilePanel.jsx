function EditProfilePanel({ form, setForm, onSave, onCancel }) {
  return (
    <div style={{ border: "1px solid #aaa", padding: "16px", marginBottom: "16px" }}>
      <h3>Edit Profile</h3>

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

      <br />

      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditProfilePanel;
