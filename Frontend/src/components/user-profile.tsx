import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save } from 'lucide-react'

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Marketing specialist with a passion for data-driven campaigns.",
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically send the updated user data to your backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">Profile</h1>
            {!isEditing ? (
              <Button onClick={handleEdit} className="bg-green-600 hover:bg-green-700 text-white">
                <Edit2 className="mr-2 h-4 w-4" /> Edit
              </Button>
            ) : (
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">Name</label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-green-700 mb-1">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full h-24"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}