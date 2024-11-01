import request from "supertest";
import express from "express";
import generateTextRouter from "../routes/generateText"; // Adjust import path as needed
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";

// Mock the external dependencies
jest.mock("@ai-sdk/openai");
jest.mock("ai");

describe("Generate Text Route", () => {
  let app: express.Application;

  // Setup: Create an express app and use the router before each test
  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/generate-text", generateTextRouter);
  });

  // Test successful email generation
  it("should generate a marketing email successfully", async () => {
    // Arrange: Mock the streamObject to return a predictable stream
    const mockPartialObjectStream = [
      { subject: "Special Offer" },
      { content: "Exciting opportunity awaits!" },
    ];

    (streamObject as jest.Mock).mockResolvedValue({
      partialObjectStream: mockPartialObjectStream,
    });

    // Act: Send a request to the route
    const response = await request(app)
      .post("/generate-text")
      .send({ prompt: "Sell our new product" })
      .expect(200);

    // Assert: Verify the response matches expected structure
    expect(response.body).toEqual({
      subject: "Special Offer",
      content: "Exciting opportunity awaits!",
    });
  });

  // Test error handling
  it("should handle generation errors gracefully", async () => {
    // Arrange: Mock streamObject to throw an error
    (streamObject as jest.Mock).mockRejectedValue(
      new Error("Generation failed"),
    );

    // Act & Assert: Verify error response
    const response = await request(app)
      .post("/generate-text")
      .send({ prompt: "Sell our new product" })
      .expect(500);

    // Check error response structure
    expect(response.body).toEqual({
      error: "Failed to generate email content",
    });
  });

  // Test input validation (optional)
  it("should handle missing prompt", async () => {
    // Act & Assert: Verify response for empty prompt
    const response = await request(app)
      .post("/generate-text")
      .send({}) // No prompt
      .expect(500);

    expect(response.body).toEqual({
      error: "Failed to generate email content",
    });
  });
});
