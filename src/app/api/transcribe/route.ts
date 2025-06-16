// File: /src/app/api/transcribe/route.ts

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

export async function POST() {
	const webmPath = path.join(process.cwd(), "tmp", "audio.webm");
	const wavPath = path.join(process.cwd(), "tmp", "audio.wav");
	const jsonPath = path.join(process.cwd(), "tmp", "output.json");

	try {
		// Convert WebM to WAV using ffmpeg
		await new Promise<void>((resolve, reject) => {
			const ffmpeg = spawn("ffmpeg", [
				"-y", // <- Overwrite if exists
				"-i",
				webmPath,
				"-ar",
				"16000", // Sample rate
				"-ac",
				"1", // Mono
				"-f",
				"wav", // Format
				wavPath,
			]);

			ffmpeg.stderr.on("data", (data) => {
				console.log("FFmpeg stderr:", data.toString());
			});

			ffmpeg.on("error", (err) => {
				console.error("FFmpeg spawn error:", err);
				reject(err);
			});

			ffmpeg.on("close", (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject(new Error(`FFmpeg exited with code ${code}`));
				}
			});
		});

		// At this point, WAV should exist — now transcribe it
		// You must ensure that this function writes output.json
		await transcribeAudio(wavPath, jsonPath);

		// Read transcription result
		if (!fs.existsSync(jsonPath)) {
			throw new Error("output.json not found");
		}

		const result = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
		const text = result.text || "No transcription";
		return NextResponse.json({ text });
	} catch (err: any) {
		console.error("Error:", err);
		return NextResponse.json(
			{ error: err.message || "Something went wrong" },
			{ status: 500 },
		);
	}
}

// Mock function for transcription - replace with real logic
async function transcribeAudio(wavPath: string, jsonPath: string) {
	// Simulate async transcription and write dummy result
	const fakeTranscription = {
		text: "This is a fake transcription for testing.",
	};

	// Simulate delay
	await new Promise((res) => setTimeout(res, 1000));

	fs.writeFileSync(jsonPath, JSON.stringify(fakeTranscription, null, 2));
}
