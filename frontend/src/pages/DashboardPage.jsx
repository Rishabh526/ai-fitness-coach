import { useAuth } from "../context/useAuth"
import { apiFetch } from "../services/api"

function DashboardPage() {
    const {logout} = useAuth()
    
    async function testApi(){
        const res = await apiFetch("/api/accounts/me/")
        const data = await res.json()
        console.log(data)
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <p>You are logged in</p>
            <button onClick={logout}>Logout</button>
            <button onClick={testApi}>Test API</button>
        </div>
    )
}

export default DashboardPage