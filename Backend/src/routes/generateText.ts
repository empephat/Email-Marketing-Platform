import { Router, Request, Response } from 'express';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const router = Router();
//exempel på body
// { "prompt": "Vad är meningen med livet ur en katts perspektiv?}
router.post('/', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
        });

        // console.log(response)

        res.json({ message: response.choices[0]?.message?.content });

        console.log(response.choices[0]?.message?.content)
    } catch (error) {
        console.error("Error generating text:", error);
        res.status(500).json({ error: "Failed to generate email content" });
    }
});

// router.post('/', async (req: Request, res: Response) => {
//     const { prompt } = req.body;

//     if (!prompt) {
//         return res.status(400).json({ error: "Prompt is required" });
//     }

//     try {
//         const stream = await openai.chat.completions.create({
//             model: "gpt-4",
//             messages: [{ role: "user", content: prompt }],
//             stream: true,
//         });

//         res.writeHead(200, {
//             'Content-Type': 'text/event-stream',
//             'Cache-Control': 'no-cache',
//             'Connection': 'keep-alive',
//         });


//         for await (const chunk of stream) {
//             // process.stdout.write(chunk.choices[0]?.delta?.content || "");
//             const content = chunk.choices[0]?.delta?.content || '';
//             res.write(`data: ${JSON.stringify({ content })}`);
//             console.log(content);
//         }

//         // for await (const partialObject of partialObjectStream) {
//         //     res.write(`data: ${JSON.stringify(partialObject)}\n\n`);
//         //     generatedContent = { ...generatedContent, ...partialObject };
//         //   }

//         //   app.post("/generate-content", async (req, res) => {
//         //     try {
//         //       const requestData = RequestSchema.parse(req.body);
//         //       await generateContent(requestData, res);
//         //     } catch (error) {
//         //       console.error("Ett fel har inträffat:", error);
//         //       res.status(500).json({ error: "Ett internt serverfel inträffade" });
//         //     }
//         //   });

//         res.write('data: [DONE]\n\n');
//         res.end();
//     } catch (error) {
//         console.error("Error generating text:", error);
//         res.status(500).json({ error: "Failed to generate content" });
//     }
// });

export default router;
