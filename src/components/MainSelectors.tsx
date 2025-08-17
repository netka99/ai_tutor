"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import {
	languagesToLearn,
	nativeLanguages,
	levels,
	subjects,
} from "../lib/formOptions";
import { useTranslations } from "next-intl";

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
		// ttsLangCode,
		setTtsLangCode,
	} = useAppStore();

	const t = useTranslations("form");

	useEffect(() => {
		setAiRole(roles.find((role) => role !== userRole) || "Tutor");
	}, [roles, userRole, setAiRole]);

	const handleLangtoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setLangToLearn(selectedValue);

		const selectedLangOption = languagesToLearn.find(
			(lang) => lang.value === selectedValue,
		);

		if (selectedLangOption?.ttsCode) {
			setTtsLangCode(selectedLangOption.ttsCode);
		} else {
			setTtsLangCode("en-US");
		}
	};

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
					<label htmlFor="nativeLang" className="mb-2 block">
						{t("labels.nativeLanguage")}
					</label>
					<select
						id="nativeLang"
						name="nativeLang"
						value={nativeLang}
						onChange={(e) => setNativeLang(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						{nativeLanguages.map((option) => (
							<option key={option.value} value={option.value}>
								{t(`language.${option.value}`)}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="langToLearn" className="mb-2 block">
						{t("labels.languageToLearn")}
					</label>
					<select
						id="langToLearn"
						name="langToLearn"
						value={langToLearn}
						onChange={handleLangtoChange}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						{languagesToLearn.map((option) => {
							return (
								<option key={option.value} value={option.value}>
									{t(`language.${option.value}`)}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<label htmlFor="level" className="mb-2 block">
						{t("labels.chooseLevel")}
					</label>
					<select
						id="level"
						name="level"
						value={level}
						onChange={(e) => setLevel(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						{levels.map((option) => (
							<option key={option.value} value={option.value}>
								{t(`level.${option.value}`)}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex justify-between">
				<div>
					<label htmlFor="subject" className="mb-2 block">
						{t("labels.chooseSubject")}
					</label>
					<select
						id="subject"
						name="subject"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="mb-6 rounded-lg bg-white p-6 shadow-lg"
					>
						{subjects.map((option) => (
							<option key={option.value} value={option.value}>
								{t(`subject.${option.value}`)}
							</option>
						))}
					</select>
				</div>
				<div className="flex w-96 items-center">
					<input
						type="text"
						value={customerSubject}
						onChange={(e) => setCustomSubject(e.target.value)}
						placeholder={t("subject.customTopic")}
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
				{isLoading ? t("buttons.generating") : t("buttons.askAiTutor")}
			</button>
		</form>
	);
}
