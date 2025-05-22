import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY,
	model: "gemini-2.0-flash",
	temperature: 0.6,
});

const createPhrases = async (
	role: string,
	level: string,
	langToLearn: string,
	description: string,
): Promise<string[]> => {
	const prompt = PromptTemplate.fromTemplate(
		`You are helping a student learn a new language through a roleplay dialog.
		 The student is **only playing the role of: "${role}"**.

			Based on the following:
			- Student's role: "${role}"
			- Target language: "${langToLearn}"
			- Student level: "${level}"
			- Dialog description: "${description}"

		Generate 5 short and useful phrases that **a person in the "${role}" role** would naturally say **during such a dialog**. 
			❗ Do not generate phrases for any other role.  
			❗ All phrases must reflect the behavior, knowledge, and responsibilities of the "${role}" role only.  
			❗ Ignore any actions or intentions of other characters.
            Make sure the phrases are appropriate for a ${level} level student.

            Return only the 5 phrases, without additional explanations, with each full phrase separated by the delimiter '|||'.`,
	);

	const chain = prompt.pipe(model);
	const result = (await chain.invoke({
		role,
		description,
		langToLearn,
		level,
	})) as AIMessage;

	let contentString: string = "";
	if (typeof result.content === "string") {
		contentString = result.content;
	} else if (Array.isArray(result.content)) {
		contentString = result.content
			.filter(
				(part): part is { text: string } =>
					typeof part === "object" &&
					part !== null &&
					"text" in part &&
					typeof part.text === "string",
			)
			.map((part) => part.text)
			.join("");
	}

	return contentString.split("|||").map((phrase) => phrase.trim());
};

export async function POST(req: Request) {
	const { role, description, langToLearn, level } = await req.json();
	if (!role || !description || !langToLearn || !level) {
		return new Response(JSON.stringify({ error: "Missing data" }), {
			status: 400,
		});
	}
	const phrases = await createPhrases(role, description, langToLearn, level);
	return Response.json({ phrases });
}
