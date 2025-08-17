interface SelectOption {
	value: string;
	labelKey: string;
	ttsCode?: string;
	description?: string;
	localeCode?: string;
}

export const nativeLanguages: SelectOption[] = [
	{
		value: "polish",
		labelKey: "form.language.polish",
		ttsCode: "pl-PL",
		localeCode: "pl",
	},
	{
		value: "english",
		labelKey: "form.language.english",
		ttsCode: "en-US",
		localeCode: "en",
	},
	{
		value: "italian",
		labelKey: "form.language.italian",
		ttsCode: "it-IT",
		localeCode: "it",
	},
	{
		value: "french",
		labelKey: "form.language.french",
		ttsCode: "fr-FR",
		localeCode: "fr",
	},
	{
		value: "german",
		labelKey: "form.language.german",
		ttsCode: "de-DE",
		localeCode: "de",
	},
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
	{ value: "orderMeal", labelKey: "form.subject.orderMeal" },
	{ value: "openBankAccount", labelKey: "form.subject.openBankAccount" },
	{
		value: "bookDoctorAppointment",
		labelKey: "form.subject.bookDoctorAppointment",
	},
];
