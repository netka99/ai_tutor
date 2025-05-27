"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export default function MainSelectors() {
	const [isLoading, setIsLoading] = useState(false);
	// const [roles, setRoles] = useState<string[]>([]);
	const [customerSubject, setCustomSubject] = useState<string>("");

	const {
		setDescription,
		nativeLang,
		setNativeLang,
		level,
		setLevel,
		langToLearn,
		setLangToLearn,
		subject,
		setSubject,
		userRole,
		setAiRole,
		roles,
		setRoles,
	} = useAppStore();

	useEffect(() => {
		setAiRole(roles.find((role) => role !== userRole) || "Tutor");
	}, [roles, userRole, setAiRole]);

	const getDescriptionRole = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.target as HTMLFormElement);
		const subject = formData.get("subject")?.toString();
		const langToLearn = formData.get("langToLearn")?.toString();
		const level = formData.get("level")?.toString();

		const response = await fetch("/api/subject", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ subject, langToLearn, level }),
		});

		const data = await response.json();

		console.log(data);
		setDescription(data.description);
		setRoles(data.roles);
		setIsLoading(false);
	};
	return (
		<form onSubmit={getDescriptionRole} className="mb-4">
			<div className="flex justify-between">
				<div>
					<label className="mb-2 block">Your Native Language:</label>
					<select
						name="nativeLang"
						value={nativeLang}
						onChange={(e) => setNativeLang(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						<option value="polish">Polish</option>
						<option value="english">English</option>
						<option value="italian">Italian</option>
					</select>
				</div>
				<div>
					<label className="mb-2 block">Language to learn:</label>
					<select
						name="langToLearn"
						value={langToLearn}
						onChange={(e) => setLangToLearn(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						<option value="polish">Polish</option>
						<option value="english">English</option>
						<option value="italian">Italian</option>
					</select>
				</div>
				<div>
					<label className="mb-2 block">Choose your level:</label>
					<select
						name="level"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advanced">Advanced</option>
					</select>
				</div>
			</div>
			<div className="flex justify-between">
				<div>
					<label className="mb-2 block">Choose subject:</label>
					<select
						name="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						<option value="order a meal in the restaurant">
							Order a meal in the resturant
						</option>
						<option value="open a bank account in the bank">
							Open an account in a bank
						</option>
						<option value="book an appoinment to the doctor">
							Book an appointment to the doctor
						</option>
					</select>
				</div>
				<div className="flex w-96 items-center">
					<input
						type="text"
						value={customerSubject}
						onChange={(e) => setCustomSubject(e.target.value)}
						placeholder="Add custom topic..."
						className="w-96 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
						// onKeyPress={(e) =>
						// 	e.key === "Enter" && handleCustomSubjectAdd()
						// }
					/>
				</div>
			</div>
			<button
				type="submit"
				className="rounded bg-blue-500 px-4 py-2 text-white"
				disabled={isLoading}
			>
				{isLoading ? "Generating..." : "Ask AI Tutor"}
			</button>
		</form>
	);
}
