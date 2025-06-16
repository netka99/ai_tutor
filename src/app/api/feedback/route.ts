import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { getFeedback } from "@/lib/feedback";

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
	model: "gemini-2.0-flash",
	temperature: 0.7,
});

export async function POST(req: NextRequest) {
	try {
		const { sessionId, langToLearn, level, nativeLang } = await req.json();

		if (!sessionId || !langToLearn || !level || !nativeLang) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 },
			);
		}

		const { lastSentences, totalCount } = await getFeedback({
			sessionId,
		});

		const prompt = PromptTemplate.fromTemplate(`
  You are a language teacher. The student is learning {langToLearn} at {level} level.

  Provide feedback in {nativeLang}.
  Check the grammar of the following sentences. 
  Only return those that are incorrect and for each, provide:
  - the original sentence,
  - the corrected sentence,
  - a short explanation of the mistake.

  At the end, give:
  - general feedback (overall impression),
  - suggested grammar topics to review.

  Respond strictly in the following JSON format:

  {{
    "mistakes": [
      {{
        "original": "...",
        "correction": "...",
        "explanation": "..."
      }}
    ],
    "overallFeedback": "...",
    "topicsToReview": ["...", "..."]
  }}

  Sentences:
  {sentences}
`);

		const parser = new JsonOutputParser();
		const chain = RunnableSequence.from([prompt, model, parser]);

		const result = await chain.invoke({
			sentences: lastSentences.join("\n"),
			langToLearn,
			level,
			nativeLang,
		});

		return NextResponse.json({
			feedback: result,
			sentenceCount: totalCount,
		});
	} catch (err) {
		console.error("Error in /api/feedback:", err);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 },
		);
	}
}
