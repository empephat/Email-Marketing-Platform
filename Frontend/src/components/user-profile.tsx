import { useAuth } from "@/hooks/useAuth";
import { User } from 'lucide-react';

export function UserProfile() {
  const { state } = useAuth()
  const userProf = state.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">Profile</h1>
            
          </div>
          <div className="space-y-4 flex flex-col">
          <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center hover:bg-green-300 transition-colors self-center">
          <User className="text-green-800" size={48} />
          </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">Name</label>
              { userProf &&
              <p>{userProf.name}</p>
              }
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email</label>
              { userProf && 
               <p>{userProf.email}</p>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}