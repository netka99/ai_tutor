import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";

const model = new ChatGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY, // Set GOOGLE_API_KEY environment variable with your key
	model: "gemini-2.0-flash", // Or another free-tier eligible model
	temperature: 0.7,
});

const makeQuestion = async (
	subject: string,
	subjectDescription: string,
	langToLearn: string,
	level: string,
) => {
	const prompt = PromptTemplate.fromTemplate(
		`Given the subject "${subject}" with the detailed description: "${subjectDescription}", generate a brief description of realistic 
		dialog scenario (1-2 sentences) in the language "${langToLearn}".
		 Adjust the diffuculty of description to the "${level}" of studied language.
		 Do not include any explanations, labels, or formatting.`,
	);
	const chain = prompt.pipe(model).pipe(new StringOutputParser());
	console.log(subject);
	return await chain.invoke({ subject });
};

const makePossibileAnswers = async (description: string): Promise<string[]> => {
	const prompt = PromptTemplate.fromTemplate(
		`Given the dialog description "${description}", generate exactly two distinct roles for the dialog, one for each participant in the conversation. 
		Return only the role names, separated by a commas.`,
	);
	const chain = prompt.pipe(model).pipe(new CommaSeparatedListOutputParser());
	console.log(description);
	const roles: string[] = await chain.invoke({ description });
	return roles;
};

export async function POST(req: Request) {
	const { subject, langToLearn, level } = await req.json();
	if (!subject) {
		return new Response(JSON.stringify({ error: "Missing subject" }), {
			status: 400,
		});
	}
	const { subjects } = await import("@/lib/formOptions");
	const subjectObj = subjects.find((s) => s.value === subject);
	const subjectDescription = subjectObj?.description || "";

	const question = await makeQuestion(
		subject,
		subjectDescription,
		langToLearn,
		level,
	);
	const answers = await makePossibileAnswers(question);
	return Response.json({ description: question, roles: answers });
}
