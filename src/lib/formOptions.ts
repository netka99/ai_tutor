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
	// DINING & FOOD
	{
		value: "orderMeal",
		labelKey: "form.subject.orderMeal",
		description:
			"A conversation between a customer and a waiter/waitress in a restaurant. The customer wants to order food and drinks, possibly ask about menu items, dietary restrictions, and pay the bill.",
	},
	{
		value: "reserveTable",
		labelKey: "form.subject.reserveTable",
		description:
			"A conversation between a customer and a restaurant host/hostess. The customer wants to make a reservation for a specific date and time, possibly for a special occasion or for a large group.",
	},
	{
		value: "askFoodRecommendation",
		labelKey: "form.subject.askFoodRecommendation",
		description:
			"A conversation between a tourist and a local resident. The tourist is asking for recommendations about local cuisine, popular dishes, and good restaurants in the area.",
	},
	{
		value: "orderTakeout",
		labelKey: "form.subject.orderTakeout",
		description:
			"A conversation between a customer and a restaurant employee over the phone. The customer wants to place a takeout order, ask about the menu, and arrange pickup details.",
	},
	{
		value: "complainAboutFood",
		labelKey: "form.subject.complainAboutFood",
		description:
			"A conversation between a customer and a restaurant manager. The customer has an issue with their meal (it's undercooked, not as described, etc.) and wants it resolved.",
	},

	// ACCOMMODATION
	{
		value: "bookHotelRoom",
		labelKey: "form.subject.bookHotelRoom",
		description:
			"A conversation between a traveler and a hotel receptionist. The traveler wants to book a room, inquiring about availability, rates, amenities, and payment options.",
	},
	{
		value: "checkIntoHotel",
		labelKey: "form.subject.checkIntoHotel",
		description:
			"A conversation between a guest and a hotel receptionist. The guest is checking into the hotel, providing reservation details, and asking about hotel services and facilities.",
	},
	{
		value: "requestRoomService",
		labelKey: "form.subject.requestRoomService",
		description:
			"A conversation between a hotel guest and room service staff. The guest wants to order food, drinks, or request additional items for their room.",
	},
	{
		value: "reportHotelIssue",
		labelKey: "form.subject.reportHotelIssue",
		description:
			"A conversation between a hotel guest and the hotel staff. The guest is reporting an issue with their room (broken AC, noisy neighbors, etc.) and requesting a solution.",
	},
	{
		value: "extendHotelStay",
		labelKey: "form.subject.extendHotelStay",
		description:
			"A conversation between a hotel guest and the front desk. The guest wants to extend their stay for additional nights and needs to confirm availability and rates.",
	},

	// TRANSPORTATION
	{
		value: "buyTrainTicket",
		labelKey: "form.subject.buyTrainTicket",
		description:
			"A conversation between a traveler and a ticket agent at a train station. The traveler wants to purchase a train ticket, asking about schedules, prices, and seating options.",
	},
	{
		value: "takeTaxi",
		labelKey: "form.subject.takeTaxi",
		description:
			"A conversation between a passenger and a taxi driver. The passenger is giving directions to a destination, possibly negotiating the fare, and asking about the estimated arrival time.",
	},
	{
		value: "rentCar",
		labelKey: "form.subject.rentCar",
		description:
			"A conversation between a customer and a car rental agent. The customer wants to rent a car, discussing vehicle options, insurance, rental period, and payment terms.",
	},
	{
		value: "askForDirections",
		labelKey: "form.subject.askForDirections",
		description:
			"A conversation between a lost traveler and a local person. The traveler needs directions to a specific location and is asking for the best route to take.",
	},
	{
		value: "usePublicTransport",
		labelKey: "form.subject.usePublicTransport",
		description:
			"A conversation between a tourist and a public transportation employee. The tourist is asking about routes, fares, and how to use the local public transportation system.",
	},

	// SHOPPING
	{
		value: "buyClothes",
		labelKey: "form.subject.buyClothes",
		description:
			"A conversation between a customer and a clothing store assistant. The customer is looking for specific clothing items, asking about sizes, colors, and trying items on.",
	},
	{
		value: "negotiatePrice",
		labelKey: "form.subject.negotiatePrice",
		description:
			"A conversation between a shopper and a market vendor. The shopper is interested in an item but wants to negotiate the price before making a purchase.",
	},
	{
		value: "returnDefectiveItem",
		labelKey: "form.subject.returnDefectiveItem",
		description:
			"A conversation between a customer and a store clerk. The customer wants to return or exchange a defective or unsuitable item they purchased recently.",
	},
	{
		value: "askProductInfo",
		labelKey: "form.subject.askProductInfo",
		description:
			"A conversation between a customer and a sales associate. The customer is requesting detailed information about a product's features, specifications, and warranty.",
	},
	{
		value: "buySouvenirs",
		labelKey: "form.subject.buySouvenirs",
		description:
			"A conversation between a tourist and a souvenir shop owner. The tourist is looking for authentic local souvenirs and gifts to take back home.",
	},

	// HEALTHCARE
	{
		value: "bookDoctorAppointment",
		labelKey: "form.subject.bookDoctorAppointment",
		description:
			"A conversation between a patient and a receptionist at a medical clinic. The patient wants to schedule a doctor's appointment, possibly explaining symptoms, asking about available time slots, and providing personal information.",
	},
	{
		value: "visitPharmacy",
		labelKey: "form.subject.visitPharmacy",
		description:
			"A conversation between a customer and a pharmacist. The customer needs medication or health products and is asking for advice or a specific prescription.",
	},
	{
		value: "explainSymptoms",
		labelKey: "form.subject.explainSymptoms",
		description:
			"A conversation between a patient and a doctor. The patient is describing their symptoms and medical history, while the doctor asks questions to make a diagnosis.",
	},
	{
		value: "dentistEmergency",
		labelKey: "form.subject.dentistEmergency",
		description:
			"A conversation between a person with a dental emergency and a dental clinic receptionist. The person needs urgent dental care and is trying to get an immediate appointment.",
	},
	{
		value: "buyHealthInsurance",
		labelKey: "form.subject.buyHealthInsurance",
		description:
			"A conversation between a customer and an insurance agent. The customer wants to purchase health insurance for their stay in the country and is asking about coverage options and costs.",
	},

	// BANKING & FINANCE
	{
		value: "openBankAccount",
		labelKey: "form.subject.openBankAccount",
		description:
			"A conversation between a client and a bank employee. The client wants to open a new bank account and needs information about account types, required documents, fees, and banking services.",
	},
	{
		value: "exchangeCurrency",
		labelKey: "form.subject.exchangeCurrency",
		description:
			"A conversation between a customer and a currency exchange clerk. The customer wants to exchange their money for the local currency, asking about exchange rates and fees.",
	},
	{
		value: "reportLostCard",
		labelKey: "form.subject.reportLostCard",
		description:
			"A conversation between a bank customer and a bank representative. The customer needs to report a lost or stolen credit/debit card and arrange for a replacement.",
	},
	{
		value: "withdrawMoney",
		labelKey: "form.subject.withdrawMoney",
		description:
			"A conversation between a bank customer and a teller. The customer wants to withdraw cash from their account, possibly dealing with identification verification and withdrawal limits.",
	},
	{
		value: "wireMoneyAbroad",
		labelKey: "form.subject.wireMoneyAbroad",
		description:
			"A conversation between a customer and a bank employee. The customer needs to send money to someone in another country and is asking about the process, fees, and timing.",
	},

	// EDUCATION & LANGUAGE
	{
		value: "enrollLanguageCourse",
		labelKey: "form.subject.enrollLanguageCourse",
		description:
			"A conversation between a prospective student and a language school administrator. The student wants to enroll in a language course, asking about class schedules, levels, teaching methods, and fees.",
	},
	{
		value: "askForTranslation",
		labelKey: "form.subject.askForTranslation",
		description:
			"A conversation between a foreigner and a local person. The foreigner needs help understanding or translating something (a sign, document, announcement, etc.) in the local language.",
	},
	{
		value: "attendLibrary",
		labelKey: "form.subject.attendLibrary",
		description:
			"A conversation between a visitor and a librarian. The visitor wants to use the library services, get a library card, or find specific resources in another language.",
	},
	{
		value: "joinCulturalWorkshop",
		labelKey: "form.subject.joinCulturalWorkshop",
		description:
			"A conversation between an interested participant and a workshop organizer. The person wants to join a cultural workshop (cooking, dancing, crafts, etc.) to learn more about local traditions.",
	},
	{
		value: "visitMuseum",
		labelKey: "form.subject.visitMuseum",
		description:
			"A conversation between a visitor and a museum staff member. The visitor is asking about exhibitions, guided tours, opening hours, and admission fees.",
	},

	// WORK & BUSINESS
	{
		value: "jobInterview",
		labelKey: "form.subject.jobInterview",
		description:
			"A conversation between a job applicant and an interviewer. The applicant is interviewing for a position, discussing their qualifications, experience, and answering questions about their skills.",
	},
	{
		value: "requestTimeOff",
		labelKey: "form.subject.requestTimeOff",
		description:
			"A conversation between an employee and their manager. The employee is requesting time off for vacation, personal reasons, or a medical appointment.",
	},
	{
		value: "negotiateBusiness",
		labelKey: "form.subject.negotiateBusiness",
		description:
			"A conversation between two business professionals. They are negotiating terms for a potential partnership, contract, or business deal.",
	},
	{
		value: "makeBusinessPresentation",
		labelKey: "form.subject.makeBusinessPresentation",
		description:
			"A conversation between a presenter and audience members. The presenter is delivering a business presentation and answering questions from the audience.",
	},
	{
		value: "networkingEvent",
		labelKey: "form.subject.networkingEvent",
		description:
			"A conversation between two professionals at a networking event. They are introducing themselves, discussing their work, and exploring potential professional connections.",
	},

	// DAILY LIFE & SOCIAL
	{
		value: "meetNewNeighbor",
		labelKey: "form.subject.meetNewNeighbor",
		description:
			"A conversation between new neighbors meeting for the first time. They are introducing themselves, making small talk, and possibly exchanging contact information.",
	},
	{
		value: "callPlumber",
		labelKey: "form.subject.callPlumber",
		description:
			"A conversation between a tenant and a plumber. The tenant has a plumbing issue (leaky faucet, clogged drain, etc.) and is explaining the problem and arranging a repair visit.",
	},
	{
		value: "inviteToDinner",
		labelKey: "form.subject.inviteToDinner",
		description:
			"A conversation between friends or acquaintances. One person is inviting the other to dinner, discussing details like time, place, and possibly dietary preferences.",
	},
	{
		value: "planWeekendActivity",
		labelKey: "form.subject.planWeekendActivity",
		description:
			"A conversation between friends planning a weekend activity. They are discussing options, preferences, logistics, and making arrangements for their plans.",
	},
	{
		value: "reportLostItem",
		labelKey: "form.subject.reportLostItem",
		description:
			"A conversation between a person who lost something and a lost-and-found service representative. The person is describing the lost item, where it might have been lost, and providing contact information.",
	},

	// EMERGENCY & ASSISTANCE
	{
		value: "callEmergencyServices",
		labelKey: "form.subject.callEmergencyServices",
		description:
			"A conversation between a person in an emergency situation and an emergency dispatcher. The person is reporting an emergency (accident, fire, medical emergency, etc.) and providing necessary details.",
	},
	{
		value: "reportTheft",
		labelKey: "form.subject.reportTheft",
		description:
			"A conversation between a victim of theft and a police officer. The victim is reporting stolen items, describing the circumstances, and providing details for a police report.",
	},
	{
		value: "seekConsularHelp",
		labelKey: "form.subject.seekConsularHelp",
		description:
			"A conversation between a foreign visitor and a consular officer. The visitor needs assistance with a lost passport, legal issues, or other consular services while abroad.",
	},
	{
		value: "askForHelp",
		labelKey: "form.subject.askForHelp",
		description:
			"A conversation between a person who is lost or confused and a helpful stranger. The person needs assistance finding their way, understanding something, or solving a problem in an unfamiliar environment.",
	},
	{
		value: "reportCarBreakdown",
		labelKey: "form.subject.reportCarBreakdown",
		description:
			"A conversation between a driver with a broken-down vehicle and a roadside assistance operator. The driver is explaining the issue, providing their location, and requesting help.",
	},
];
