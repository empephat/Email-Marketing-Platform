import Router from "express";
import prisma from "../db/prisma";

const router = Router();

//* Get emails based on campaign id
router.get("/:campaignId/generated-emails", async (req, res) => {
  const campaignId = req.params.campaignId;

  try {
    const emails = await prisma.email.findMany({
      where: {
        campaignId: campaignId,
      },
    });
    res.status(200).json(emails);
  } catch (err) {
    console.error("Error fetching emails:", err);
    res.status(500).json({ error: "Unable to get emails" });
  }
});

//* Get email based on the campaign id and the emailId :)📧
//campaignId = the id that the campaign is carrying and GeneratedEmailId = the id that the email is carrying.
router.get("/:campaignId/emails/:generatedEmailId", async (req, res) => {
  const { campaignId, generatedEmailId } = req.params;
  try {
    const email = await prisma.email.findUnique({
      where: {
        id: generatedEmailId,
        campaign: {
          id: campaignId,
        },
      },
    });
    res.status(200).json(email);
  } catch (err) {
    console.error("Error fetching email:", err);
    res.status(500).json({ error: "Unable to get email" });
  }
});

//* Create email
router.post("/:campaignId/generate-email", async (req, res) => {
  const { campaignId } = req.params;
  const { subject, content, campaign, recipients } = req.body;
  try {
    const email = await prisma.email.create({
      data: {
        subject,
        content,
        campaign,
        campaignId: campaignId,
        recipients,
      },
    });
    res.json(email);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to create email" });
  }
});

export default router;
