import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Email {
  subject: string
  content: string
}

export function CampaignDetailsAndEmails() {
  const [emails, setEmails] = useState<Email[]>([
    { subject: "Exclusive Offer Inside!", content: "Don't miss out on our latest deals..." },
    { subject: "New Product Launch", content: "Introducing our revolutionary new product..." },
  ])
  const [newSubject, setNewSubject] = useState('')
  const [newContent, setNewContent] = useState('')
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSubject && newContent) {
      setEmails([...emails, { subject: newSubject, content: newContent }])
      setNewSubject('')
      setNewContent('')
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto p-4 space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-green-800 py-6">
          Email Marketing Campaign Manager
        </h1>

        {/* Header Section */}
        <section className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Summer Sale Campaign</h2>
          <p className="text-lg mb-2"><strong>Company:</strong> TechGadgets Inc.</p>
          <p className="text-lg mb-4"><strong>Company Description:</strong> TechGadgets Inc. is a leading innovator in smart home technology, dedicated to making everyday life more convenient and efficient through cutting-edge devices.</p>
          <p className="text-lg mb-2"><strong>Product:</strong> Smart Home Devices</p>
          <p className="text-lg"><strong>Target Audience:</strong> Tech-savvy homeowners, age 25-45</p>
        </section>

        {/* Generated Emails List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Generated Emails</h2>
          <div className="space-y-4">
            {emails.map((email, index) => (
              <Card key={index} className="border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-green-100 border-b border-purple-200">
                  <CardTitle className="text-green-800">{email.subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700">{email.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* New Email Form */}
        <section className="bg-green-100 p-6 rounded-lg shadow">

          <Badge variant="outline" className="bg-green-400 mb-2 me-2 inline-block text-green-100">Ai ✨</Badge>

          <label htmlFor="prompt" className=" text-sm font-medium text-green-700 mb-1">
            What do you want the email to say? Please be detailed.
          </label>
          <Input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt till AI"
            required
            className="border-green-300 focus:border-black-400 focus:bg-white mb-2"
          />
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 focus:ring-2 focus:ring-black-400 focus:ring-offset-2"
          >
            Generate AI Description
          </Button>
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-green-800">Create New Email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-green-700 mb-1">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Email subject..."
                required
                className="border-green-300 focus:border-black-400 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-green-700 mb-1">
                Content
              </label>
              <Textarea
                id="content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Email content..."
                required
                className="min-h-[100px] border-green-300 focus:border-black-400 focus:bg-white"
              />
            </div>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 focus:ring-2 focus:ring-black-400 focus:ring-offset-2"
            >
              Add New Email
            </Button>

          </form>
        </section>
      </div>
    </div >
  )
}