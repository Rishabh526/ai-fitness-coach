import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import { getMyProfile } from "../services/profileServices"

function DashboardPage() {
    const {logout} = useAuth()
    
   const [profile, setProfile] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
    async function fetchProfile() {
        try{
            const data = await getMyProfile()
            setProfile(data)

        }catch(err){
            setError("Could not load Profile")
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    fetchProfile()
   }, [])

   if (loading) {
    return <p>Loading...</p>
   }

   if(error) {
    return <p>{error}</p>
   }

    return(
        <div>
            <h1>Dashboard</h1>
            
            <div>
                <h2>Your Profile</h2>
                <p><strong>Age:</strong>{profile.age}</p>
                <p><strong>Height:</strong>{profile.height_cm}</p>
                <p><strong>Weight:</strong>{profile.weight_kg}</p>
                <p><strong>Sex:</strong>{profile.sex}</p>
                <p><strong>Goal:</strong>{profile.goal}</p>
                <p><strong>Activity Level:</strong>{profile.activity_level}</p>
            </div>
            
                <button onClick={logout}>Logout</button>
        </div>
    )
}

export default DashboardPage