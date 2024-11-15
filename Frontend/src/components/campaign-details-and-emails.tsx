import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import envMode from "./helper/checkENVmode";
import { Campaign } from "@/types/campaignTypes";

interface Email {
  subject: string;
  content: string;
}

export function CampaignDetailsAndEmails() {
  const { id } = useParams();

  const [newSubject, setNewSubject] = useState("");
  const [newContent, setNewContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [emails, setEmails] = useState<Email[]>([
    {
      subject: "Exclusive Offer Inside!",
      content: "Don't miss out on our latest deals...",
    },
    {
      subject: "New Product Lrtretaunch",
      content: "Introducing our revolutionary new product...",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubject && newContent) {
      setEmails([...emails, { subject: newSubject, content: newContent }]);
      setNewSubject("");
      setNewContent("");
    }
  };

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`${envMode()}/api/campaigns/${id}`, {
          credentials: "include",
          // The 'credentials: "include"' option in the fetch request allows the browser to send cookies and other credentials along with the request.
          // This is necessary for the server to recognize the user's session and authorize the request.
        });
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaign(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaign();
  }, []);

  const handleGenerateAiEmail = () => {
    console.log("ni klack du på knappen för att generera ai innehåll");
    setNewContent("Loading....");

    fetchAiEmail(prompt);
  };

  //// HÄR SKA DET FETCHAS 🤠🤠🤠🤠🤠🤠
  const fetchAiEmail = async (prompt: any) => {
    try {
      const response = await fetch(`${envMode()}/api/generateText/`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      console.log(data);
      setNewContent(data.content);
      setNewSubject(data.subject);

      // Unexpected non-whitespace character after JSON at position 256 (line 1 column 257)

      // return data.response;
    } catch (err: any) {
      console.error("Fel vid generering av text", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Campaign Manager
        </h1>

        {/* Header Section */}
        <section className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{campaign?.campaignName}</h2>
          <p className="text-lg mb-2">
            <strong>Company:</strong> {campaign?.companyName}
          </p>
          <p className="text-lg mb-4">
            <strong>Company Description:</strong> {campaign?.companyDescription}
          </p>
          <p className="text-lg mb-2">
            <strong>Product:</strong> {campaign?.productDescription}
          </p>
          <p className="text-lg">
            <strong>Target Audience:</strong> {campaign?.targetAudience}
          </p>
        </section>

        {/* Generated Emails List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Generated Emails
          </h2>
          <div className="space-y-4">
            {emails.map((email, index) => (
              <Card
                key={index}
                className="border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="bg-green-100 border-b border-purple-200">
                  <CardTitle className="text-green-800">
                    {email.subject}
                  </CardTitle>
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
          <Badge
            variant="outline"
            className="bg-green-400 mb-2 me-2 inline-block text-green-100"
          >
            Ai ✨
          </Badge>

          <label
            htmlFor="prompt"
            className=" text-sm font-medium text-green-700 mb-1"
          >
            What do you want the email to say? Please be detailed.
          </label>
          <Input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt till AI"
            required
            className="border-2 border-green-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-300 ease-in-out shadow-sm rounded-lg mb-2 hover:bg-white"
          />

          <Button
            onClick={handleGenerateAiEmail}
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 focus:ring-2 focus:ring-black-400 focus:ring-offset-2"
          >
            Generate AI Description
          </Button>
          <h2 className="text-2xl font-semibold mb-4 mt-8 text-green-800">
            Create New Email
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Email subject..."
                required
                className="border-2 border-green-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-300 ease-in-out shadow-sm rounded-lg mb-2 hover:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Content
              </label>
              <Textarea
                id="content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Email content..."
                required
                className="min-h-[100px] border-2 border-green-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500 hover:border-green-400 transition-all duration-300 ease-in-out shadow-sm rounded-lg mb-2 hover:bg-white"
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
    </div>
  );
}
