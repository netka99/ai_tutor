"use client";
import React from "react";
// import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export default function DescriptionPhrases() {
	const {
		level,
		langToLearn,
		roles,
		description,
		phrases,
		setUserRole,
		setPhrases,
	} = useAppStore();

	const generatePhrases = async (
		role: string,
		description: string,
		langToLearn: string,
		level: string,
	) => {
		setUserRole(role);
		console.log(role);
		const response = await fetch("/api/phrases", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ role, description, langToLearn, level }),
		});
		if (!response.ok) {
			console.error("Failed to send role to backend");
			return;
		}

		const data = await response.json();
		setPhrases(data.phrases);
		console.log(data.phrases);
	};

	return (
		<div>
			<div className="mb-6 rounded-lg bg-blue-100 px-6 py-4 text-gray-800 shadow-md">
				{description}
			</div>
			<div className="flex justify-center">
				{roles.map((role, i) => (
					<button
						key={i}
						className="mx-7 rounded-lg border border-stone-100 bg-white px-4 py-2 font-medium text-blue-700 shadow-lg hover:bg-blue-50"
						onClick={() =>
							generatePhrases(role, description, langToLearn, level)
						}
					>
						{role}
					</button>
				))}
			</div>
			<div className="m-4 mx-auto flex w-[80vh] flex-col justify-center">
				{phrases.map((phrase, i) => (
					<div
						key={i}
						className="m-2 rounded-lg border border-stone-100 bg-blue-100/50 px-4 py-2 shadow-lg hover:bg-blue-50"
					>
						{phrase}
					</div>
				))}
			</div>
		</div>
	);
}
