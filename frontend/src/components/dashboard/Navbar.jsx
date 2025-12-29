function Navbar({ username, onLogout }) {
  return (
    <nav
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3>AI Fitness Coach</h3>
      <div>
        <span style={{ marginRight: "12px" }}>Hi, {username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
