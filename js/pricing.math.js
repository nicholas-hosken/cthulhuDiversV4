const activity = document.querySelector('.hero h1').innerHTML;
const locations = document.getElementById('locations');
const exchangeRate = 17.9;

const populateLocations = (site) => {
	if (!site || typeof site !== 'string') {
		throw new Error('Invalid site');
	}

	if (!hotelList || typeof hotelList !== 'object') {
		throw new Error('Invalid hotel list');
	}

	for (const key in hotelList) {
		if (hotelList.hasOwnProperty(key) && hotelList[key][site] !== 999 && hotelList[key][site] != 'maya' && hotelList[key][site] != 'unknown' && hotelList[key][site] != mpnCol.pu) {
			const option = document.createElement('option');
			option.value = key;
			option.innerHTML = hotelList[key].name;
			locations.appendChild(option);
		}
	}
};

const convertToUSD = (value, fixed) => {
	return Number((value / exchangeRate).toFixed(fixed));
};

const scubaSpecifics = (site, arrivalD1, departureD1, arrivalD2, departureD2, minAge, maxDepth) => {
	const tourPickUp = document.querySelector(`#${site}PickUp`);
	const tourDropOff = document.querySelector(`#${site}DropOff`);
	const tourPickUpD2 = document.querySelector(`#${site}PickUpD2`);
	const tourDropOffD2 = document.querySelector(`#${site}DropOffD2`);
	const tourMinAge = document.querySelector(`#${site}MinAge`);
	const tourDepth = document.querySelector(`#${site}Depth`);

	if (locations != null) {
		let arr = convertTime(arrivalD1);
		let dep = convertTime(departureD1);
		let arrD2 = arrivalD2 !== undefined ? convertTime(arrivalD2) : null;
		let depD2 = departureD2 !== undefined ? convertTime(departureD2) : null;

		const travelTimes = {
			aow: 'sb805',
			certified: 'sb805',
			dsd: 'sb805',
			musaSnorkel: 'sb805',
			nightDiving: 'sb805',
			ow: 'sb805',
			referral: 'sb805',
			refresher: 'sb805',
			scubaDiver: 'sb805',
		};

		populateLocations(travelTimes[site] || 'location');
		const selectedHotel = locations.options[locations.selectedIndex].value;
		let travelTime = hotelList[selectedHotel][travelTimes[site] || 'location'];
		if (cenotePricing[site]?.shuttle) {
			if (travelTime === 'pdc') {
				travelTime = 30;
			} else {
				travelTime = 90;
			}
		}

		if (site === 'bullShark' || site === 'cozumel') {
			let area = hotelList[selectedHotel].location;
			if (area === 'cun') {
				travelTime = 90;
			} else if (area === 'pm' || area === 'cm') {
				travelTime = 105;
			} else {
				travelTime = 35;
			}
		}

		if (tourPickUp) tourPickUp.textContent = revertTime(arr - travelTime);
		if (tourDropOff) tourDropOff.textContent = revertTime(dep + travelTime);
		if (tourPickUpD2) tourPickUpD2.textContent = revertTime(arrD2 - travelTime);
		if (tourDropOffD2) tourDropOffD2.textContent = revertTime(depD2 + travelTime);
	}
	if (tourMinAge) tourMinAge.textContent = minAge;
	if (tourDepth) tourDepth.textContent = maxDepth;
};

const roundUp = (x) => {
	return Math.ceil(x / 5) * 5;
};

const round2Dec = (x) => {
	return Math.round(x * 100) / 100;
};

const quotePrice = (pricelist, site, cost) => {
	let tourCash = document.querySelector(`#${site}Cash`);
	let quoteCash = roundUp(cost * pricelist[site].profitPercent);

	tourCash.innerHTML = quoteCash;

	let tourCard = document.querySelector(`#${site}Card`);
	let quoteCard = roundUp(quoteCash * 1.16);
	tourCard.innerHTML = quoteCard;
	pricelist[site].cardPrice = quoteCard;

	let tourDeposit = document.querySelector(`#${site}Deposit`);
	if (tourDeposit !== null) {
		tourDeposit.innerHTML = roundUp(convertToUSD(pricelist[site].deposit, 2));
	}

	let tourPhotos = document.querySelector(`#${site}Photos`);
	if (tourPhotos !== null) {
		tourPhotos.innerHTML = pricelist.extras.photos * pricelist[site].days;
	}

	let tourEanx32 = document.querySelector(`#${site}EANx32`);
	if (tourEanx32 != null && pricelist[site].eanx32tanks !== 0) {
		tourEanx32.innerHTML = `${roundUp(convertToUSD(pricelist.extras.eanx32, 2) * pricelist[site].days * (pricelist[site].tanks * 2))}`;
	}
};

// Calculate PayPal fees for invoicing
const palPalFees = (amountUSD) => {
	// PayPal fees for invoicing
	let paypalInvoiceFeeRate = 0.05; // 5%
	let paypalFixedInvoiceFeeUSD = 0.49; // $0.49

	// Calculate PayPal fees for invoicing
	let paypalInvoiceFeeUSD = amountUSD * paypalInvoiceFeeRate + paypalFixedInvoiceFeeUSD;

	// Calculate total amount after PayPal fees in USD
	let amountAfterPayPalFeesUSD = amountUSD - paypalInvoiceFeeUSD;

	// Convert total amount after PayPal fees to MXN
	let amountAfterPayPalFeesMXN = amountAfterPayPalFeesUSD * exchangeRate;

	return {
		paypalInvoiceFeeUSD: paypalInvoiceFeeUSD,
		amountAfterPayPalFeesUSD: amountAfterPayPalFeesUSD,
		amountAfterPayPalFeesMXN: amountAfterPayPalFeesMXN,
	};
};

// Calculate cost of nitrox tanks
const getNitroxCost = (pricelist, activity) => {
	let nitroxMXN;
	if (activity === 'refresher' || activity === 'ppb') {
		nitroxMXN = (pricelist[activity].tanks - 1) * pricelist[activity].days * 2 * cthulhuTours.extras.eanx32;
	} else {
		nitroxMXN = pricelist[activity].tanks * pricelist[activity].days * 2 * cthulhuTours.extras.eanx32;
	}
	return { nitroxMXN: nitroxMXN, nitroxUSD: convertToUSD(nitroxMXN, 2) };
};

// Calculate sub-total of the cash costs before PayPal fees and taxes
const getCashSubTotal = (pricelist, activity) => {
	let i = convertToUSD(pricelist[activity].boat * pricelist[activity].days, 2) + convertToUSD(pricelist[activity].guide, 2) + pricelist[activity].elearning;
	if (activity === 'nitrox') {
		i += Number(getNitroxCost(pricelist, activity).nitroxUSD);
		i = Number(i.toFixed(2));
	} else if (activity === 'cozumel' || activity === 'bullShark') {
		i += convertToUSD(pricelist[activity].parking, 2);
	} else if (
		activity === 'actunHa' ||
		activity === 'angelita' ||
		activity === 'calavera' ||
		activity === 'chacMool' ||
		activity === 'dosOjos' ||
		activity === 'dreamgate' ||
		activity === 'elPit' ||
		activity === 'maravilla' ||
		activity === 'ponderosa' ||
		activity === 'sucActun' ||
		activity === 'tajmaHa' ||
		activity === 'zapote'
	) {
		i +=
			convertToUSD(pricelist[activity].shuttle / 2, 2) +
			convertToUSD(pricelist[activity].entranceFee, 2) +
			convertToUSD(pricelist[activity].food, 2) +
			convertToUSD(pricelist[activity].tanks * pricelist[activity].tanksDiverCost, 2) +
			convertToUSD(pricelist[activity].tanksGuideCost / pricelist[activity].minClients, 2) +
			pricelist[activity].elearning;
	}
	return i;
};

// Calculate the deposit amount
const activityGroups = {
	boatActivities: ['dsd', 'refresher', 'referral', 'musa', 'manchones', 'mesoamerican', 'wreck', 'bullShark', 'cozumel', 'nightDiving', 'musaSnorkel'],
	eLearningActivities: ['scubaDiver', 'ow', 'aow', 'ppb', 'nitrox'],
	shuttleActivities: ['actunHa', 'angelita', 'calavera', 'chacMool', 'dosOjos', 'dreamgate', 'elPit', 'maravilla', 'ponderosa', 'sucActun', 'tajmaHa', 'zapote'],
};

const getDeposit = (pricelist, activity) => {
	if (activityGroups.boatActivities.includes(activity)) {
		return roundUp(convertToUSD(pricelist[activity].boat, 2));
	} else if (activityGroups.eLearningActivities.includes(activity)) {
		return roundUp(pricelist[activity].elearning);
	} else if (activityGroups.shuttleActivities.includes(activity)) {
		return roundUp(convertToUSD(pricelist[activity].shuttle / pricelist[activity].minClients, 2));
	}
};

// Calculate the PayPal fees and taxes for given dollar amount
const getPayPal = (amountUSD) => {
	return {
		invoiceFee: palPalFees(amountUSD).paypalInvoiceFeeUSD,
		taxes: Number((amountUSD * 0.16).toFixed(2)),
	};
};

const getPickUp = (pricelist, activity, day) => {
	const arrivalTimeKey = `arrivalD${day}`;
	return revertTime(convertTime(pricelist[activity][arrivalTimeKey]) - hotelList[locations.value].sb805);
};

const getDropOff = (pricelist, activity, day) => {
	const departureTimeKey = `departureD${day}`;
	return revertTime(convertTime(pricelist[activity][departureTimeKey]) + hotelList[locations.value].sb805);
};

const getPrep = (pricelist, activity) => {
	const prepItems = pricelist[activity].prep;
	prepItems.forEach((item) => {
		const paragraph = document.createElement('p');
		paragraph.innerHTML = item;
		tourPrep.appendChild(paragraph);
	});
};

const cthulhuTours = {
	certifiedTours: {
		musa: {
			name: 'Musa & Reef',
			arrivalD1: '12:20',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/scuba-musa.webp',
			days: 1,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			maxDepth: '27ft / 9m',
			minAge: 10,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		manchones: {
			name: 'Manchones Reefs',
			arrivalD1: '12:20',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/scuba-manchones.webp',
			days: 1,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			maxDepth: '27ft / 9m',
			minAge: 10,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		mesoamerican: {
			name: 'Mesoamerican Reefs',
			arrivalD1: '12:20',
			departureD1: '16:45',
			available: 'Mon, Wed, Fri, Sun',
			boat: 1350,
			cardImg: '../img/cards/scuba-mesoamerican.webp',
			days: 1,
			deposit: 1350,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			maxDepth: '55ft / 17m',
			minAge: 12,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		wreck: {
			name: 'Wreck & Reef',
			arrivalD1: '8:05',
			departureD1: '12:30',
			available: 'Tue, Thu, Sat',
			boat: 1350,
			cardImg: '../img/cards/scuba-wreck.webp',
			days: 1,
			deposit: 1350,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			maxDepth: '84ft / 26m',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		bullShark: {
			name: 'Bull Shark',
			arrivalD1: '13:00',
			departureD1: '17:00',
			available: 'Daily (Nov - Feb)',
			boat: 1540,
			cardImg: '../img/cards/scuba-bull-shark.webp',
			days: 1,
			deposit: 1540,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 400,
			href: 'https://cthulhudivers.com/cancun-bull-shark-diving',
			maxDepth: '80ft / 24m',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			nitroxAllowed: true,
			parking: 50,
			photosAllowed: false,
			profitPercent: 1.96,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat + this.parking}mxn`, `<span>Doc:</span> 10651`, `<span>Equipment:</span> Mask, BCD, Regulator, Full Wetsuit, Fins`, `<div class="prep-notes"><h5>Notes:</h5> 50mxn needs to be in change for parking meter.</div>`];
			},
		},
		certified: {
			name: 'Certified Divers',
			arrivalD1: '8:05',
			departureD1: '12:30',
			arrivalD2: '12:20',
			departureD2: '16:45',
			boat: 1350,
			days: 1,
			deposit: 1350,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			minAge: 10,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		cozumel: {
			name: 'Cozumel',
			arrivalD1: '8:00',
			departureD1: '13:00',
			available: 'Upon Request',
			boat: 2000,
			cardImg: '../img/cards/scuba-cozumel.webp',
			days: 1,
			deposit: 2000,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 400,
			href: 'https://cthulhudivers.com/cancun-cozumel',
			maxDepth: '130ft / 40m',
			minAge: 10,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			nitroxAllowed: true,
			parking: 50,
			photosAllowed: true,
			profitPercent: 1.5,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat + this.parking}mxn`, `<span>Doc:</span> 10651`, `<span>Equipment:</span> Mask, BCD, Regulator, Wetsuit, Fins`, `<div class="prep-notes"><h5>Notes:</h5> 50mxn needs to be in change for parking meter.</div>`];
			},
		},
		nightDiving: {
			name: 'Night Diving',
			arrivalD1: '17:30',
			departureD1: '21:30',
			available: 'Upon Request',
			boat: 1350,
			cardImg: '../img/cards/scuba-night-dive.webp',
			days: 1,
			deposit: 1350,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 300,
			href: 'https://cthulhudivers.com/cancun-night-diving',
			maxDepth: '84ft / 26m',
			minAge: 12,
			minCertLvl: 'Scuba Diver',
			minClients: 3,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.55,
			shuttle: 0,
			tanks: 1,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10651`, `<span>Equipment:</span> Torch`];
			},
		},
	},
	courses: {
		dsd: {
			name: 'Discover Scuba Diving',
			arrivalD1: '10:00',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-dsd.webp',
			days: 1,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 500,
			href: 'https://cthulhudivers.com/cancun-padi-discover-scuba-diving-dsd',
			maxDepth: '27ft / 9m',
			minAge: 10,
			minCertLvl: 'None',
			minClients: 1,
			nitroxAllowed: false,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.62,
			shuttle: 0,
			tanks: 3,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		refresher: {
			name: 'PADI Scuba Refresher',
			arrivalD1: '10:00',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-refresher.webp',
			days: 1,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 500,
			href: 'https://cthulhudivers.com/cancun-padi-refresher',
			maxDepth: '27ft / 9m',
			minAge: 10,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.62,
			shuttle: 0,
			tanks: 3,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		scubaDiver: {
			name: 'PADI Scuba Diver',
			arrivalD1: '8:15',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-scuba-diver.webp',
			days: 1,
			elearning: 183.55,
			entranceFee: 0,
			food: 0,
			guide: 1000,
			href: 'https://cthulhudivers.com/cancun-padi-scuba-diver',
			maxDepth: '40ft / 12m',
			minAge: 10,
			minCertLvl: 'None',
			minClients: 1,
			nitroxAllowed: false,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.44,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		ow: {
			name: 'PADI Open Water',
			arrivalD1: '8:15',
			departureD1: '16:45',
			arrivalD2: '8:15',
			departureD2: '12:30',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-ow.webp',
			days: 2,
			elearning: 183.55,
			entranceFee: 0,
			food: 0,
			guide: 2000,
			href: 'https://cthulhudivers.com/cancun-padi-open-water-scuba-diver',
			maxDepth: '60ft / 18m',
			minAge: 10,
			minCertLvl: 'None',
			minClients: 1,
			nitroxAllowed: false,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 5,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat * 2}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		referral: {
			name: 'PADI Referral Program',
			arrivalD1: '12:20',
			departureD1: '16:45',
			arrivalD2: '8:15',
			departureD2: '12:30',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-referral.webp',
			days: 2,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 2000,
			href: 'https://cthulhudivers.com/cancun-padi-referral',
			maxDepth: '60ft / 18m',
			minAge: 10,
			minCertLvl: 'None',
			minClients: 1,
			nitroxAllowed: false,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 4,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat * 2}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		aow: {
			name: 'PADI Advanced OW',
			arrivalD1: '12:20',
			departureD1: '16:45',
			arrivalD2: '8:15',
			departureD2: '12:30',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-aow.webp',
			days: 2,
			elearning: 173.1,
			entranceFee: 0,
			food: 0,
			guide: 1600,
			href: 'https://cthulhudivers.com/cancun-padi-advanced-open-water',
			maxDepth: '130ft / 40m',
			minAge: 12,
			minCertLvl: 'Open Water Diver',
			minClients: 1,
			nitroxAllowed: false,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 4,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat * 2}mxn`, `<span>Doc:</span> 10038, 10346`, `<span>Equipment:</span> Compass`];
			},
		},
		ppb: {
			name: 'PADI Peak Performance',
			arrivalD1: '10:15',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-buoyancy.webp',
			days: 1,
			elearning: 122.65,
			entranceFee: 0,
			food: 0,
			guide: 1000,
			maxDepth: '40ft / 12m',
			minAge: 10,
			minCertLvl: 'Scuba Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 3,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2)} & ${this.boat}mxn`, `<span>Doc:</span> 10038`];
			},
		},
		nitrox: {
			name: 'PADI Enriched Air Diver',
			arrivalD1: '10:15',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			cardImg: '../img/cards/course-nitrox.webp',
			days: 1,
			elearning: 152.8,
			entranceFee: 0,
			food: 0,
			guide: 660,
			maxDepth: '84ft / 26m',
			minAge: 10,
			minCertLvl: 'Open Water Diver',
			minClients: 1,
			nitroxAllowed: true,
			parking: 0,
			photosAllowed: true,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 2,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash::</span> U$${convertToUSD(this.guide, 2)} & ${this.boat + getNitroxCost(cthulhuTours.courses, 'nitrox').nitroxMXN}mxn`, `<span>Doc:</span> 10346, 10038`, `<span>Equipment:</span> Nitrox analyzer, Nitrox Tables`];
			},
		},
	},
	extras: {
		cenoteDiverTanks: 80,
		cenoteFood: 200,
		cenoteGuideTanks: 250,
		eanx32: 150,
		photos: 25,
	},
	cenotes: {
		actunHa: {
			name: 'Actun Ha',
			aka: 'Carwash',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-car-wash.webp',
			days: 1,
			depth: '60ft / 18m',
			elearning: 0,
			entranceFee: 250,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-car-wash',
			minAge: 15,
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		angelita: {
			name: 'Angelita',
			aka: 'Little Angel',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-angelita.webp',
			days: 1,
			depth: '130ft / 40m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-angelita',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		calavera: {
			name: 'Calavera',
			aka: 'Temple of Doom',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-calavera.webp',
			days: 1,
			depth: '50ft / 15m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-calavera-temple-of-doom',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2900,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		chacMool: {
			name: 'Chac Mool',
			aka: 'Jaguar',
			arrivalD1: '9:00',
			departureD1: '12:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-chac-mool.webp',
			days: 1,
			depth: '40ft / 12m',
			elearning: 0,
			entranceFee: 250,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-chac-mool',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2500,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="prep-notes"><h5>Notes:</h5> Vicente is the only cenote guide we have who can guide this cenote. Please check his availability before booking clients.</div>`,
				];
			},
		},
		dosOjos: {
			name: 'Dos Ojos',
			aka: 'Two Eyes',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-dos-ojos.webp',
			days: 1,
			depth: '45ft / 14m',
			elearning: 0,
			entranceFee: 600,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-dos-ojos',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		dreamgate: {
			name: 'Puerta de los sueños',
			aka: 'Dreamgate',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-dreamgate.webp',
			days: 1,
			depth: '30ft / 9m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2900,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		elPit: {
			name: 'El Pit',
			aka: 'The Pit',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-el-pit.webp',
			days: 1,
			depth: '130ft / 40m',
			elearning: 0,
			entranceFee: 600,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		maravilla: {
			name: 'Maravilla',
			aka: 'The Blue Abyss',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-maravilla.webp',
			days: 1,
			depth: '130ft / 40ft',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2500,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		ponderosa: {
			name: 'Ponderosa',
			aka: 'Garden of Eden',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-ponderosa.webp',
			days: 1,
			depth: '60ft / 18m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2500,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		sucActun: {
			name: 'Suc Actun',
			aka: 'Pet Cemetery',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-pet-cemetery.webp',
			days: 1,
			depth: '23ft / 7m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		tajmaHa: {
			name: 'Tajma Ha',
			aka: 'Taj Mahal',
			arrivalD1: '9:00',
			departureD1: '13:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-tajma-ha.webp',
			days: 1,
			depth: '50ft / 15m',
			elearning: 0,
			entranceFee: 300,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-tajma-ha',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2500,
			tanks: 2,
			transport: 'Included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="prep-notes"><h5>Notes:</h5> Due to construction at this site, visibility has been reduced significantly. Until further notice, please try to sell an alternative.</div>`,
				];
			},
		},
		zapote: {
			name: 'Zapote',
			aka: 'Hells Bells',
			arrivalD1: '9:00',
			departureD1: '14:30',
			available: 'Upon Request',
			boat: 0,
			cardImg: '../img/cards/cenote-zapote.webp',
			days: 1,
			depth: '130ft / 40m',
			elearning: 0,
			entranceFee: 400,
			guide: 750,
			href: '',
			minAge: 15,
			minCertLvl: 'Open Water Diver',
			minClients: 2,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 2500,
			tanks: 2,
			transport: 'included',
			get food() {
				return cthulhuTours.extras.cenoteFood;
			},
			get tanksDiverCost() {
				return cthulhuTours.extras.cenoteDiverTanks * this.tanks;
			},
			get tanksGuideCost() {
				return cthulhuTours.extras.cenoteGuideTanks;
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
	},
	snorkeling: {
		musaSnorkel: {
			name: 'Musa & Reef',
			arrivalD1: '12:20',
			departureD1: '16:45',
			available: 'Daily',
			boat: 1350,
			boatDpt: '13:00',
			cardAlt: 'musa snorkeling tour',
			cardImg: '../img/cards/snorkel-musa.webp',
			days: 1,
			food: 0,
			guide: 0,
			elearning: 0,
			entranceFee: 0,
			href: 'https://cthulhudivers.com/non-diving/cancuns-best-snorkeling-tour',
			minAge: 6,
			minCertLvl: 'None',
			minClients: 1,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.3,
			shuttle: 0,
			tanks: 0,
			tanks: 0,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(this.guide, 2).toFixed(0)} & ${this.entranceFee + this.food + this.tanksDiverCost * this.tanks + (this.tanksGuideCost + this.shuttle) / this.minClients}mxn`];
			},
		},
		turtleSnorkel: {
			name: 'Turtle 5-in-1',
			departureD1: '10:00',
			available: 'Daily',
			boat: 45,
			boatDpt: '7:30',
			cardAlt: '5-1 snorkeling tour',
			cardImg: '../img/cards/snorkel-turtle.webp',
			days: 1,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			groupSize: 10,
			guide: 0,
			href: 'https://cthulhudivers.com/non-diving/turtle-snorkel-tour-5-in-1',
			minAge: 6,
			minCertLvl: 'None',
			minClients: 1,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.6,
			shuttle: 0,
			tanks: 0,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get info() {
				populateLocations('mpnPickup');
				const tourPickUpD1 = document.querySelector('#turtleSnorkelPickUpD1');
				const tourPickUpD2 = document.querySelector('#turtleSnorkelPickUpD2');
				const tourPickUpD3 = document.querySelector('#turtleSnorkelPickUpD3');
				const tourPickUpD4 = document.querySelector('#turtleSnorkelPickUpD4');
				const tourPickUpD5 = document.querySelector('#turtleSnorkelPickUpD5');
				const tourGroupSize = document.querySelector('#turtleSnorkelGroupSize');
				const tourMinAge = document.querySelector('#turtleSnorkelMinAge');
				const mpnPickup = hotelList[locations.options[locations.selectedIndex].value].mpnPickup;
				const tourCard = document.querySelector('#turtleSnorkelCard');
				const tourDeposit = document.querySelector('#turtleSnorkelDeposit');

				tourPickUpD1.textContent = mpnPickup[0];
				tourPickUpD2.textContent = mpnPickup[1];
				tourPickUpD3.textContent = mpnPickup[2];
				tourPickUpD4.textContent = mpnPickup[3];
				tourPickUpD5.textContent = mpnPickup[4];
				tourGroupSize.textContent = this.groupSize;
				tourMinAge.textContent = this.minAge;
				tourCard.textContent = roundUp(this.boat * this.profitPercent);
				tourDeposit.textContent = this.boat;
			},
			get cost() {
				return this.boat;
			},
			get deposit() {
				return roundUp(this.boat);
			},
			shuttle: (hotel) => {
				return 0;
			},
		},
		whaleShark: {
			name: 'Whale Sharks',
			boatDpt: '7:45',
			departureD1: '13:15',
			available: 'Daily (May - Sept)',
			boat: 120,
			cardAlt: 'Whale shark snorkeling',
			cardImg: '../img/cards/snorkel-whale-shark.webp',
			days: 1,
			deposit: 110,
			dockFee: 20,
			elearning: 0,
			entranceFee: 0,
			food: 0,
			guide: 0,
			href: 'https://cthulhudivers.com/cancun-whale-shark-snorkeling',
			listPrice: 170,
			minAge: 5,
			minCertLvl: 'None',
			minClients: 1,
			parking: 0,
			photosAllowed: false,
			profitPercent: 1.45,
			tanks: 0,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get info() {
				populateLocations('whaleShark');
				const tourPickUp = document.querySelector('#whaleSharkPickUp');
				const tourDropOff = document.querySelector('#whaleSharkDropOff');
				const tourCash = document.querySelector('#whaleSharkCash');
				const tourCard = document.querySelector('#whaleSharkCard');
				const tourDeposit = document.querySelector('#whaleSharkDeposit');
				const tourDockFee = document.querySelector('#whaleSharkDockFee');
				const selectedHotel = locations.options[locations.selectedIndex].value;

				let pickUp = hotelList[selectedHotel].whaleShark;
				let boatDep = convertTime(snorkelPricing.whaleShark.boatDpt);
				let boatRet = convertTime(snorkelPricing.whaleShark.departureD1);
				let dropOff;

				tourPickUp.textContent = pickUp;
				pickUp = convertTime(pickUp);
				dropOff = revertTime(boatRet + boatDep - pickUp);
				tourDropOff.textContent = dropOff;

				let cash = snorkelPricing.whaleShark.listPrice + hotelList[selectedHotel].whaleSharkTransportFee;
				tourCash.textContent = cash;
				tourCard.textContent = roundUp(cash * 1.16);
				tourDeposit.textContent = snorkelPricing.whaleShark.deposit;
				tourDockFee.textContent = snorkelPricing.whaleShark.dockFee;
			},
			shuttle: (hotel) => {
				return hotelList[hotel].whaleSharkTransportFee;
			},
		},
	},
};

// const snorkelPricing = {
// 	musaSnorkel: {
// 		name: 'Musa & Reef',
// 		arrivalD1: '12:20',
// 		departureD1: '16:45',
// 		available: 'Daily',
// 		boat: 1350,
// 		boatDpt: '13:00',
// 		cardAlt: 'musa snorkeling tour',
// 		cardImg: '../img/cards/snorkel-musa.webp',
// 		days: 1,
// 		guide: 0,
// 		href: 'https://cthulhudivers.com/non-diving/cancuns-best-snorkeling-tour',
// 		minAge: 6,
// 		photosAllowed: false,
// 		profitPercent: 1.3,
// 		get cost() {
// 			return convertToUSD(this.guide + this.boat, 2);
// 		},
// 		get info() {
// 			quotePrice(snorkelPricing, 'musaSnorkel', this.cost, this.profitPercent);
// 			scubaSpecifics('musaSnorkel', this.arrivalD1, this.departureD1, this.arrivalD2, this.departureD2);
// 		},
// 		get deposit() {
// 			return roundUp(convertToUSD(this.boat, 2));
// 		},
// 		shuttle: (hotel) => {
// 			return 0;
// 		},
// 	},
// 	turtleSnorkel: {
// 		name: 'Turtle 5-in-1',
// 		departureD1: '10:00',
// 		available: 'Daily',
// 		boat: 45,
// 		boatDpt: '7:30',
// 		cardAlt: '5-1 snorkeling tour',
// 		cardImg: '../img/cards/snorkel-turtle.webp',
// 		days: 1,
// 		groupSize: 10,
// 		href: 'https://cthulhudivers.com/non-diving/turtle-snorkel-tour-5-in-1',
// 		minAge: 6,
// 		photosAllowed: false,
// 		profitPercent: 1.6,
// 		get info() {
// 			populateLocations('mpnPickup');
// 			const tourPickUpD1 = document.querySelector('#turtleSnorkelPickUpD1');
// 			const tourPickUpD2 = document.querySelector('#turtleSnorkelPickUpD2');
// 			const tourPickUpD3 = document.querySelector('#turtleSnorkelPickUpD3');
// 			const tourPickUpD4 = document.querySelector('#turtleSnorkelPickUpD4');
// 			const tourPickUpD5 = document.querySelector('#turtleSnorkelPickUpD5');
// 			const tourGroupSize = document.querySelector('#turtleSnorkelGroupSize');
// 			const tourMinAge = document.querySelector('#turtleSnorkelMinAge');
// 			const mpnPickup = hotelList[locations.options[locations.selectedIndex].value].mpnPickup;
// 			const tourCard = document.querySelector('#turtleSnorkelCard');
// 			const tourDeposit = document.querySelector('#turtleSnorkelDeposit');

// 			tourPickUpD1.textContent = mpnPickup[0];
// 			tourPickUpD2.textContent = mpnPickup[1];
// 			tourPickUpD3.textContent = mpnPickup[2];
// 			tourPickUpD4.textContent = mpnPickup[3];
// 			tourPickUpD5.textContent = mpnPickup[4];
// 			tourGroupSize.textContent = this.groupSize;
// 			tourMinAge.textContent = this.minAge;
// 			tourCard.textContent = roundUp(this.boat * this.profitPercent);
// 			tourDeposit.textContent = this.boat;
// 		},
// 		get cost() {
// 			return this.boat;
// 		},
// 		get deposit() {
// 			return roundUp(this.boat);
// 		},
// 		shuttle: (hotel) => {
// 			return 0;
// 		},
// 	},
// 	whaleShark: {
// 		name: 'Whale Sharks',
// 		boatDpt: '7:45',
// 		departureD1: '13:15',
// 		available: 'Daily (May - Sept)',
// 		boat: 120,
// 		cardAlt: 'Whale shark snorkeling',
// 		cardImg: '../img/cards/snorkel-whale-shark.webp',
// 		days: 1,
// 		deposit: 110,
// 		dockFee: 20,
// 		guide: 0,
// 		href: 'https://cthulhudivers.com/cancun-whale-shark-snorkeling',
// 		listPrice: 170,
// 		minAge: 5,
// 		photosAllowed: false,
// 		profitPercent: 1.45,
// 		get info() {
// 			populateLocations('whaleShark');
// 			const tourPickUp = document.querySelector('#whaleSharkPickUp');
// 			const tourDropOff = document.querySelector('#whaleSharkDropOff');
// 			const tourCash = document.querySelector('#whaleSharkCash');
// 			const tourCard = document.querySelector('#whaleSharkCard');
// 			const tourDeposit = document.querySelector('#whaleSharkDeposit');
// 			const tourDockFee = document.querySelector('#whaleSharkDockFee');
// 			const selectedHotel = locations.options[locations.selectedIndex].value;

// 			let pickUp = hotelList[selectedHotel].whaleShark;
// 			let boatDep = convertTime(snorkelPricing.whaleShark.boatDpt);
// 			let boatRet = convertTime(snorkelPricing.whaleShark.departureD1);
// 			let dropOff;

// 			tourPickUp.textContent = pickUp;
// 			pickUp = convertTime(pickUp);
// 			dropOff = revertTime(boatRet + boatDep - pickUp);
// 			tourDropOff.textContent = dropOff;

// 			let cash = snorkelPricing.whaleShark.listPrice + hotelList[selectedHotel].whaleSharkTransportFee;
// 			tourCash.textContent = cash;
// 			tourCard.textContent = roundUp(cash * 1.16);
// 			tourDeposit.textContent = snorkelPricing.whaleShark.deposit;
// 			tourDockFee.textContent = snorkelPricing.whaleShark.dockFee;
// 		},
// 		shuttle: (hotel) => {
// 			return hotelList[hotel].whaleSharkTransportFee;
// 		},
// 	},
// };

const nonDivingPricing = {
	chichenItzaAdults: {
		name: 'Chichen Itza - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-chichen-itza.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
		ticketCost: 0,
		entranceFee: 125,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('chichenItza');
			const tourAdultCard = document.querySelector('#chichenItzaAdultCard');
			tourAdultCard.textContent = roundUp(this.entranceFee);
		},
	},
	chichenItzaKids: {
		name: 'Chichen Itza - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-chichen-itza.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
		ticketCost: 0,
		entranceFee: 105,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('chichenItza');
			const tourKidsCard = document.querySelector('#chichenItzaKidsCard');
			tourKidsCard.textContent = roundUp(this.entranceFee);
		},
	},
	chichenItzaEarlyAdults: {
		name: 'Chichen Itza Early Bird - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
		ticketCost: 0,
		entranceFee: 155,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('chichenItzaEarly');
			const tourEarlyAdultCard = document.querySelector('#chichenItzaEarlyAdultCard');
			const tourEarlyKidsCard = document.querySelector('#chichenItzaEarlyKidsCard');
			tourEarlyAdultCard.textContent = roundUp(this.ticketAdult);
			tourEarlyKidsCard.textContent = roundUp(this.ticketKids);
		},
	},
	chichenItzaEarlyKids: {
		name: 'Chichen Itza Early Bird - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
		ticketCost: 0,
		entranceFee: 135,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('chichenItzaEarly');
			const tourEarlyAdultCard = document.querySelector('#chichenItzaEarlyAdultCard');
			const tourEarlyKidsCard = document.querySelector('#chichenItzaEarlyKidsCard');
			tourEarlyAdultCard.textContent = roundUp(this.ticketAdult);
			tourEarlyKidsCard.textContent = roundUp(this.ticketKids);
		},
	},
	cancunaMataTransfers: {
		name: 'Cancuna Matata Transfers',
		cardImg: '../img/cards/non-diving-cancuna-mata-transfers.webp',
		pricing: {
			cun: {
				cash3pax: 35,
				cashReturn3pax: 65,
				cash8pax: 55,
				cashReturn8pax: 85,
			},
			cm: {
				cash3pax: 75,
				cashReturn3pax: 145,
				cash8pax: 95,
				cashReturn8pax: 165,
			},
			pm: {
				cash3pax: 60,
				cashReturn3pax: 115,
				cash8pax: 80,
				cashReturn8pax: 135,
			},
			puertoMorelos: {
				cash3pax: 55,
				cashReturn3pax: 105,
				cash8pax: 75,
				cashReturn8pax: 125,
			},
			pdc: {
				cash3pax: 85,
				cashReturn3pax: 155,
				cash8pax: 105,
				cashReturn8pax: 175,
			},
			maya: {
				cash3pax: 100,
				cashReturn3pax: 180,
				cash8pax: 130,
				cashReturn8pax: 200,
			},
			unknown: {
				cash3pax: 0,
				cashReturn3pax: 0,
				cash8pax: 0,
				cashReturn8pax: 0,
			},
		},
		get info() {
			populateLocations('cmt');
			const location = hotelList[locations.options[locations.selectedIndex].value].location;
			const tourCard3 = document.querySelector('#cmtCard3');
			const tourcash3pax = document.querySelector('#cmtcash3pax');
			const tourCardReturn3 = document.querySelector('#cmtCardReturn3');
			const tourcashReturn3pax = document.querySelector('#cmtcashReturn3pax');
			const tourCard8 = document.querySelector('#cmtCard8');
			const tourcash8pax = document.querySelector('#cmtcash8pax');
			const tourCardReturn8 = document.querySelector('#cmtCardReturn8');
			const tourcashReturn8pax = document.querySelector('#cmtcashReturn8pax');

			tourcash3pax.textContent = cmtPricing[location].cash3pax;
			tourcashReturn3pax.textContent = cmtPricing[location].cashReturn3pax;
			tourCard3.textContent = roundUp(tourcash3pax.innerHTML * 1.16);
			tourCardReturn3.textContent = roundUp(tourcashReturn3pax.innerHTML * 1.16);
			tourcash8pax.textContent = cmtPricing[location].cash8pax;
			tourcashReturn8pax.textContent = cmtPricing[location].cashReturn8pax;
			tourCard8.textContent = roundUp(tourcash8pax.innerHTML * 1.16);
			tourCardReturn8.textContent = roundUp(tourcashReturn8pax.innerHTML * 1.16);
		},
	},
	columbusLobster: {
		name: 'Lobster Dinner Cruise',
		cardImg: '../img/cards/non-diving-columbus.webp',
		available: 'Daily',
		dockFee: 15,
		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
		ticketCost: 0,
		entranceFee: 119,
		transportCost: 35,
		transport: 'Included',
		sunsetArrival: '17:00',
		sunsetDeparture: '20:15',
		moonlightArrival: '20:00',
		moonlightDeparture: '23:15',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('sb805');
			const tourTransport = document.querySelector('#columbusSunsetTransport');
			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
			const tourPickUp = document.querySelector('#columbusPickUp');
			const tourDropOff = document.querySelector('#columbusDropOff');
			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
			const tourLobsterCard = document.querySelector('#columbusLobsterCard');
			const tourDockFee = document.querySelector('#columbusDockFee');
			const selectedHotel = locations.options[locations.selectedIndex].value;
			const travelTime = hotelList[selectedHotel].sb805;

			tourTransport.textContent = this.transport;
			tourTransport2.textContent = this.transport;

			let arr = convertTime(this.sunsetArrival);
			let dep = convertTime(this.sunsetDeparture);
			tourPickUp.textContent = revertTime(arr - travelTime);
			tourDropOff.textContent = revertTime(dep + travelTime);

			arr = convertTime(this.moonlightArrival);
			dep = convertTime(this.moonlightDeparture);
			tourPickUpD2.textContent = revertTime(arr - travelTime);
			tourDropOffD2.textContent = revertTime(dep + travelTime);

			tourDockFee.textContent = this.dockFee;
			tourLobsterCard.textContent = roundUp(this.lobster);
		},
	},
	columbusSteak: {
		name: 'Steak Dinner Cruise',
		cardImg: '../img/cards/non-diving-columbus.webp',
		available: 'Daily',
		dockFee: 15,
		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
		ticketCost: 0,
		entranceFee: 99,
		transportCost: 35,
		transport: 'Included',
		sunsetArrival: '17:00',
		sunsetDeparture: '20:15',
		moonlightArrival: '20:00',
		moonlightDeparture: '23:15',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('sb805');
			const tourTransport = document.querySelector('#columbusSunsetTransport');
			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
			const tourPickUp = document.querySelector('#columbusPickUp');
			const tourDropOff = document.querySelector('#columbusDropOff');
			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
			const tourRibeyeCard = document.querySelector('#columbusRibeyeCard');
			const tourDockFee = document.querySelector('#columbusDockFee');
			const selectedHotel = locations.options[locations.selectedIndex].value;
			const travelTime = hotelList[selectedHotel].sb805;

			tourTransport.textContent = this.transport;
			tourTransport2.textContent = this.transport;

			let arr = convertTime(this.sunsetArrival);
			let dep = convertTime(this.sunsetDeparture);
			tourPickUp.textContent = revertTime(arr - travelTime);
			tourDropOff.textContent = revertTime(dep + travelTime);

			arr = convertTime(this.moonlightArrival);
			dep = convertTime(this.moonlightDeparture);
			tourPickUpD2.textContent = revertTime(arr - travelTime);
			tourDropOffD2.textContent = revertTime(dep + travelTime);

			tourDockFee.textContent = this.dockFee;
			tourRibeyeCard.textContent = roundUp(this.ribeye);
		},
	},
	columbusSurfTurf: {
		name: 'S&T Dinner Cruise',
		cardImg: '../img/cards/non-diving-columbus.webp',
		available: 'Daily',
		dockFee: 15,
		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
		ticketCost: 0,
		entranceFee: 119,
		transportCost: 0,
		transport: 35,
		sunsetArrival: '17:00',
		sunsetDeparture: '20:15',
		moonlightArrival: '20:00',
		moonlightDeparture: '23:15',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('sb805');
			const tourTransport = document.querySelector('#columbusSunsetTransport');
			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
			const tourPickUp = document.querySelector('#columbusPickUp');
			const tourDropOff = document.querySelector('#columbusDropOff');
			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
			const tourSurfTurfCard = document.querySelector('#columbusSurfTurfCard');
			const tourDockFee = document.querySelector('#columbusDockFee');
			const selectedHotel = locations.options[locations.selectedIndex].value;
			const travelTime = hotelList[selectedHotel].sb805;

			tourTransport.textContent = this.transport;
			tourTransport2.textContent = this.transport;

			let arr = convertTime(this.sunsetArrival);
			let dep = convertTime(this.sunsetDeparture);
			tourPickUp.textContent = revertTime(arr - travelTime);
			tourDropOff.textContent = revertTime(dep + travelTime);

			arr = convertTime(this.moonlightArrival);
			dep = convertTime(this.moonlightDeparture);
			tourPickUpD2.textContent = revertTime(arr - travelTime);
			tourDropOffD2.textContent = revertTime(dep + travelTime);

			tourDockFee.textContent = this.dockFee;
			tourSurfTurfCard.textContent = roundUp(this.surfTurf);
		},
	},
	columbusVeg: {
		name: 'Veg Dinner Cruise',
		cardImg: '../img/cards/non-diving-columbus.webp',
		available: 'Daily',
		dockFee: 15,
		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
		ticketCost: 0,
		entranceFee: 99,
		transportCost: 0,
		transport: 35,
		sunsetArrival: '17:00',
		sunsetDeparture: '20:15',
		moonlightArrival: '20:00',
		moonlightDeparture: '23:15',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('sb805');
			const tourTransport = document.querySelector('#columbusSunsetTransport');
			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
			const tourPickUp = document.querySelector('#columbusPickUp');
			const tourDropOff = document.querySelector('#columbusDropOff');
			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
			const tourVegCard = document.querySelector('#columbusVegCard');
			const tourDockFee = document.querySelector('#columbusDockFee');
			const selectedHotel = locations.options[locations.selectedIndex].value;
			const travelTime = hotelList[selectedHotel].sb805;

			tourTransport.textContent = this.transport;
			tourTransport2.textContent = this.transport;

			let arr = convertTime(this.sunsetArrival);
			let dep = convertTime(this.sunsetDeparture);
			tourPickUp.textContent = revertTime(arr - travelTime);
			tourDropOff.textContent = revertTime(dep + travelTime);

			arr = convertTime(this.moonlightArrival);
			dep = convertTime(this.moonlightDeparture);
			tourPickUpD2.textContent = revertTime(arr - travelTime);
			tourDropOffD2.textContent = revertTime(dep + travelTime);

			tourDockFee.textContent = this.dockFee;
			tourVegCard.textContent = roundUp(this.veg);
		},
	},
	wakeHalf: {
		name: 'Wakeboarding Half Day',
		available: 'Daily except Tuesdays',
		cardImg: '../img/cards/non-diving-wake.webp',
		boat: 150,
		ticketCost: 0,
		entranceFee: 1500,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('wake');
			const tourCard = document.querySelector('#wakeCard');
			tourCard.textContent = roundUp(this.boat * this.profitPercent * 1.16);
		},
	},
	wakeFull: {
		name: 'Wakeboarding Full Day',
		available: 'Daily except Tuesdays',
		cardImg: '../img/cards/non-diving-wake.webp',
		boat: 150,
		ticketCost: 0,
		entranceFee: 2000,
		transportCost: 0,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
		get info() {
			populateLocations('wake');
			const tourCard = document.querySelector('#wakeCard');
			tourCard.textContent = roundUp(this.boat * this.profitPercent * 1.16);
		},
	},
	xcaretAdults: {
		name: 'Xcaret - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xcaret.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
		ticketCost: 0,
		entranceFee: 120.99,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xcaretKids: {
		name: 'Xcaret - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xcaret.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
		ticketCost: 0,
		entranceFee: 90.74,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xoximilcoAdults: {
		name: 'Xoximilco - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xoximilco.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
		ticketCost: 0,
		entranceFee: 109.99,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xoximilcoKids: {
		name: 'Xoximilco - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xoximilco.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
		ticketCost: 0,
		entranceFee: 82.49,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xplorAdults: {
		name: 'Xplor - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xplor.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
		ticketCost: 0,
		entranceFee: 142.99,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xplorKids: {
		name: 'Xplor - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xplor.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
		ticketCost: 0,
		entranceFee: 107.24,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xplorFuegoAdults: {
		name: 'Xplor Fuego - Adults',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xplor-fuego.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
		ticketCost: 0,
		entranceFee: 120.99,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xplorFuegoKids: {
		name: 'Xplor Fuego - Kids',
		available: 'Daily',
		cardImg: '../img/cards/non-diving-xplor-fuego.webp',
		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
		ticketCost: 0,
		entranceFee: 90.74,
		transportCost: 33,
		transport: 'Included',
		get cost() {
			return this.ticketCost + this.transportCost;
		},
		get deposit() {
			return this.ticketCost + this.transportCost;
		},
	},
	xParks: function (site) {
		populateLocations(site);
		const tourPickUp = document.querySelector(`#${site}PickUp`);
		const tourAdultCard = document.querySelector(`#${site}AdultCard`);
		const tourKidsCard = document.querySelector(`#${site}KidsCard`);

		tourPickUp.textContent = hotelList[locations.options[locations.selectedIndex].value][site];
		tourAdultCard.textContent = roundUp(nonDivingPricing[site].ticketAdult + nonDivingPricing[site].transport);
		tourKidsCard.textContent = roundUp(nonDivingPricing[site].ticketKids + nonDivingPricing[site].transport);
	},
};

const tourPricing = (activity) => {
	const cenoteSites = ['actunHa', 'angelita', 'calavera', 'chacMool', 'dosOjos', 'dreamgate', 'elPit', 'maravilla', 'ponderosa', 'sucActun', 'tajmaHa', 'zapote'];

	switch (activity) {
		case 'Bull Shark Diving':
			oceanPricing.calcCost('bullShark', oceanPricing);
			break;
		case 'Cenote Angelita':
			cenotePricing.calcCost('angelita');
			break;
		case 'Cenote Calavera':
			cenotePricing.calcCost('calavera');
			break;
		case 'Cenote Carwash':
			cenotePricing.calcCost('actunHa');
			break;
		case 'Cenote Chac Mool':
			cenotePricing.calcCost('chacMool');
			break;
		case 'Cenote Dos Ojos':
			cenotePricing.calcCost('dosOjos');
			break;
		case 'Cenote Tajma Ha':
			cenotePricing.calcCost('tajmaHa');
			break;
		case 'Certified Divers':
			oceanPricing.calcCost('certified', oceanPricing);
			break;
		case 'Chichén Itzá,':
			nonDivingPricing.chichenItza.info;
			break;
		case 'Chichén Itzá':
			nonDivingPricing.chichenItzaEarly.info;
			break;
		case 'Columbus Dinner Cruise':
			nonDivingPricing.columbus.info;
			break;
		case 'Cozumel':
			oceanPricing.calcCost('cozumel', oceanPricing);
			break;
		case 'Discover Scuba Diving':
			coursePricing.calcCost('dsd');
			break;
		case 'Musa &amp; Reef Snorkeling':
			snorkelPricing.musaSnorkel.info;
			break;
		case 'Necronomicon':
			break;
		case 'Night Diving':
			oceanPricing.calcCost('nightDiving', oceanPricing);
			break;
		case 'PADI Advanced Open Water':
			coursePricing.calcCost('aow');
			break;
		case 'PADI Open Water Diver':
			coursePricing.calcCost('ow');
			break;
		case 'PADI Referral Program':
			coursePricing.calcCost('referral');
			break;
		case 'PADI Scuba Diver':
			coursePricing.calcCost('scubaDiver');
			break;
		case 'PADI Scuba Refresher':
			coursePricing.calcCost('refresher');
			break;
		case 'Shuttle Service':
			nonDivingPricing.cancunaMataTransfers.info;
			break;
		case 'Turtle Snorkel Adventure':
			snorkelPricing.turtleSnorkel.info;
			break;
		case 'Whale Shark':
			snorkelPricing.whaleShark.info;
			break;
		case 'Xcaret':
			nonDivingPricing.xParks('xcaret');
			break;
		case 'Xoximilco':
			nonDivingPricing.xParks('xoximilco');
			break;
		case 'Xplor Fuego':
			nonDivingPricing.xParks('xplorFuego');
			break;
		case 'Xplor':
			nonDivingPricing.xParks('xplor');
			break;
	}
};
tourPricing(activity);

if (locations != null) {
	locations.addEventListener('change', function () {
		tourPricing(activity);
	});
}
