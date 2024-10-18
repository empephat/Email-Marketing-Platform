import { Router, Request, Response } from 'express';
import { openai } from '@ai-sdk/openai'
import { streamObject } from "ai";
import { z } from "zod";

const router = Router();

// Definiera en POST-metod för routningen
router.post('/', async (req: Request, res: Response) => {
    try {
        // Extrahera prompten från request-body
        const { prompt } = req.body

        // Anropa OpenAI GPT-4 för att generera delvis objekt
        const { partialObjectStream } = await streamObject({
            model: openai("gpt-4o"),
            prompt: `skriv ett jättekort säljande email med följande budskap: ${prompt}`,
            system: 'Generate a very short and concise marketing email in a professional and selling tone',
            schema: z.object({
                subject: z.string(),
                content: z.string()
            })
        });

        // Initiera ett tomt objekt för att lagra genererade innehåll
        let generatedContent = { subject: "", content: "" };

        // Streama de delvis genererade objekten
        for await (const partialObject of partialObjectStream) {
            //-
            // Uppdatera genererat innehåll med de delvis genererade objekten
            generatedContent = { ...generatedContent, ...partialObject };
        }

        // Skicka tillbaka det genererade innehållet som JSON
        res.status(200).json(generatedContent);
        console.log(generatedContent)

    } catch (error) {
        // Logga felmeddelande och skicka ett felmeddelande tillbaka till klienten
        console.error("Error generating text:", error);
        res.status(500).json({ error: "Failed to generate email content" });
    }
});


export default router;