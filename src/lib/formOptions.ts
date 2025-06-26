interface SelectOption {
	value: string;
	labelKey: string;
	ttsCode?: string;
	description?: string;
}

export const nativeLanguages: SelectOption[] = [
	{ value: "polish", labelKey: "form.language.polish", ttsCode: "pl-PL" },
	{ value: "english", labelKey: "form.language.english", ttsCode: "en-US" },
	{ value: "italian", labelKey: "form.language.italian", ttsCode: "it-IT" },
	{ value: "french", labelKey: "form.language.french", ttsCode: "fr-FR" },
	{ value: "german", labelKey: "form.language.german", ttsCode: "de-DE" },
];

export const languagesToLearn: SelectOption[] = [
	{ value: "polish", labelKey: "form.language.polish", ttsCode: "pl-PL" },
	{ value: "english", labelKey: "form.language.english", ttsCode: "en-US" },
	{ value: "italian", labelKey: "form.language.italian", ttsCode: "it-IT" },
	{ value: "french", labelKey: "form.language.french", ttsCode: "fr-FR" },
	{ value: "german", labelKey: "form.language.german", ttsCode: "de-DE" },
];

export const levels: SelectOption[] = [
	{ value: "beginner", labelKey: "form.level.beginner" },
	{ value: "intermediate", labelKey: "form.level.intermediate" },
	{ value: "advanced", labelKey: "form.level.advanced" },
];

export const subjects: SelectOption[] = [
	{ value: "order_meal", labelKey: "form.subject.orderMeal" },
	{ value: "open_bank_account", labelKey: "form.subject.openBankAccount" },
	{
		value: "book_doctor_appointment",
		labelKey: "form.subject.bookDoctorAppointment",
	},
];
