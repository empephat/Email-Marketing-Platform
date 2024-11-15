import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react";
import envMode from "./helper/checkENVmode";
import { Campaign } from "@/types/campaignTypes";

export function CampaignListAndCreate() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    campaignName: "",
    companyName: "",
    companyDescription: "",
    productDescription: "",
    targetAudience: "",
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${envMode()}/api/campaigns/`, {
          credentials: "include",
          // The 'credentials: "include"' option in the fetch request allows the browser to send cookies and other credentials along with the request.
          // This is necessary for the server to recognize the user's session and authorize the request.
        });
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
      const response = await fetch(`${envMode()}/api/campaigns/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the UI after deletion
        setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
        console.log(id);
      } else {
        console.log(id);
        console.error("Failed to delete the campaign");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const handleClickOnCampaign = (id: string) => {
    navigate(`/campaign-detail/${id}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(newCampaign);
      const response = await fetch(
        `${envMode()}/api/campaigns/createcampaign`,
        {
          method: "POST",
          credentials: "include",
          // The 'credentials: "include"' option in the fetch request allows the browser to send cookies and other credentials along with the request.
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
                    htmlFor="companyName"
                    className="block text-sm font-medium text-green-700"
                  >
                    Company Name
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={newCampaign.companyName}
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
              onClick={() => handleClickOnCampaign(campaign.id)}
              className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-50 z-10 relative"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(campaign.id);
                  }}
                >
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
