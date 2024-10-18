import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react";

interface Campaign {
  id: string;
  campaignName: string;
  companyName: string;
  companyDescription: string;
  productDescription: string;
  targetAudience: string;
  emails: {
    id: string;
    subject: string;
    content: string;
    recipients: string[];
  }[];
}
export function CampaignListAndCreate() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/campaigns/allcampaigns"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`http://localhost:3000/api/campaigns/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the UI after deletion
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        console.log(id)
      } else {
        console.log(id)
        console.error('Failed to delete the campaign');
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const [newCampaign, setNewCampaign] = useState({
    campaignName: "",
    companyName: "komåpaninamnet",
    companyDescription: "",
    productDescription: "",
    targetAudience: "",
    userId: "fbdaca97-182a-46e8-97d0-c93592b07705",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //hårdkodat userId
    // const companyName = "ett namn";
    try {
      console.log(newCampaign);
      const response = await fetch(
        "http://localhost:3000/api/campaigns/createcampaign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newCampaign,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns :)))");
      }
      const data = await response.json();
      console.log("Detta är datan", data);
      setCampaigns([...campaigns, data]);

      //döljer formuläret när allt ä färdigt
      setIsFormVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Current Campaigns
        </h1>

        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsFormVisible(true)}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center"
          >
            <PlusCircle className="mr-2" />
            Add New Campaign
          </Button>
        </div>



        {isFormVisible && (
          <Card className="bg-white shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-700">
                  New Campaign Details
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFormVisible(false)}
                  aria-label="Close form"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="campaignName"
                    className="block text-sm font-medium text-green-700"
                  >
                    Campaign Name
                  </label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    value={newCampaign.campaignName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="companyDescription"
                    className="block text-sm font-medium text-green-700"
                  >
                    Company Description
                  </label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={newCampaign.companyDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-green-700"
                  >
                    Product Description
                  </label>
                  <Textarea
                    id="productDescription"
                    name="productDescription"
                    value={newCampaign.productDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="targetAudience"
                    className="block text-sm font-medium text-green-700"
                  >
                    Target Audience
                  </label>
                  <Input
                    id="targetAudience"
                    name="targetAudience"
                    value={newCampaign.targetAudience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create Campaign
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-green-600">
                  {campaign.campaignName}
                </h3>
                <p className="text-green-600 mt-2">{campaign.companyName}</p>
                <p className="text-green-700 mt-2">
                  {campaign.companyDescription}
                </p>
                <button
                  className="mt-4 bg-red-400 hover:bg-red-700 text-white py-2 px-3 rounded transition duration-200"
                  onClick={() => handleDelete(campaign.id)}>
                  Delete
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
