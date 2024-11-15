export interface Campaign {
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
