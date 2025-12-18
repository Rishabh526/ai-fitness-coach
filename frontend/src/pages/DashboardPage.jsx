import { useAuth } from "../context/useAuth"

function DashboardPage() {
    const {logout} = useAuth()

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default DashboardPage