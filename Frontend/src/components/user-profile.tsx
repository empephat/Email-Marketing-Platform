import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth";

export function UserProfile() {
  const { state } = useAuth()
  const userProf = state.user;
  const [user, setUser] = useState({userProfile: userProf
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">Profile</h1>
            
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">Name</label>
              { userProf &&
              <Input
                id="name"
                name="name"
                value={userProf.name}
                onChange={handleChange}
                className="w-full"
              />
              }
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email</label>
              { userProf && 
              <Input
                id="email"
                name="email"
                value={userProf.email}
                onChange={handleChange}
                className="w-full"
              />
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}