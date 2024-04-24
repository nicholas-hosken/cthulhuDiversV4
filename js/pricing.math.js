const activity = document.querySelector('.hero h1').innerHTML;
const locations = document.getElementById('locations');
const exchangeRate = 16.81;

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

const scubaSpecifics = (site, arrivalD1, departureD1, arrivalD2, departureD2, minAge) => {
	const tourPickUp = document.querySelector(`#${site}PickUp`);
	const tourDropOff = document.querySelector(`#${site}DropOff`);
	const tourPickUpD2 = document.querySelector(`#${site}PickUpD2`);
	const tourDropOffD2 = document.querySelector(`#${site}DropOffD2`);
	const tourMinAge = document.querySelector(`#${site}MinAge`);

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

		if (site === 'bullShark') {
			let area = hotelList[selectedHotel].location;
			travelTime = area === 'cun' ? 90 : area === 'pm' ? 105 : 35;
		}

		if (tourPickUp) tourPickUp.textContent = revertTime(arr - travelTime);
		if (tourDropOff) tourDropOff.textContent = revertTime(dep + travelTime);
		if (tourPickUpD2) tourPickUpD2.textContent = revertTime(arrD2 - travelTime);
		if (tourDropOffD2) tourDropOffD2.textContent = revertTime(depD2 + travelTime);
	}
	if (tourMinAge) tourMinAge.textContent = minAge;
};

const roundUp = (x) => {
	return Math.ceil(x / 5) * 5;
};

const quotePrice = (pricelist, site, cost, profit) => {
	let tourCash = document.querySelector(`#${site}Cash`);
	let quoteCash = roundUp(cost * pricelist[site].profitPercent);

	tourCash.innerHTML = quoteCash;

	let tourCard = document.querySelector(`#${site}Card`);
	let quoteCard = roundUp(quoteCash * 1.16);
	tourCard.innerHTML = quoteCard;
	pricelist[site].cardPrice = quoteCard;

	let tourDeposit = document.querySelector(`#${site}Deposit`);
	if (tourDeposit !== null) {
		tourDeposit.innerHTML = roundUp(pricelist[site].deposit / exchangeRate);
	}

	let tourPhotos = document.querySelector(`#${site}Photos`);
	if (tourPhotos !== null) {
		tourPhotos.innerHTML = pricelist.extras.photos * pricelist[site].days;
	}

	let tourEanx32 = document.querySelector(`#${site}EANx32`);
	if (tourEanx32 != null && pricelist[site].eanx32tanks !== 0) {
		tourEanx32.innerHTML = `${roundUp((pricelist.extras.eanx32 / exchangeRate) * pricelist[site].days * (pricelist[site].tanks * 2))}`;
	}
};

const cenotePricing = {
	extras: {
		eanx32: 150,
	},
	cenoteBasics: {
		food: 200,
		tanksGuide: 250,
		tanksDiver: 80,
		guide: 40,
	},
	actunHa: {
		name: 'Actun Ha',
		aka: 'Carwash',
		arrivalD1: '9:00',
		departureD1: '14:30',
		cardImg: '../img/cards/cenote-car-wash.webp',
		days: 1,
		depth: '60ft / 18m',
		href: 'https://cthulhudivers.com/dive-sites/cenote-car-wash',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 3200,
		tanks: 2,
		ticket: 250,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	angelita: {
		name: 'Angelita',
		aka: 'Little Angel',
		arrivalD1: '9:00',
		departureD1: '14:30',
		cardImg: '../img/cards/cenote-angelita.webp',
		days: 1,
		depth: '130ft / 40m',
		href: 'https://cthulhudivers.com/dive-sites/cenote-angelita',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 3200,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	calavera: {
		name: 'Calavera',
		aka: 'Temple of Doom',
		arrivalD1: '9:00',
		departureD1: '14:30',
		cardImg: '../img/cards/cenote-calavera.webp',
		days: 1,
		depth: '50ft / 15m',
		href: 'https://cthulhudivers.com/dive-sites/cenote-calavera-temple-of-doom',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2900,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	chacMool: {
		name: 'Chac Mool',
		aka: 'Jaguar',
		arrivalD1: '9:00',
		departureD1: '12:30',
		cardImg: '../img/cards/cenote-chac-mool.webp',
		days: 1,
		depth: '40ft / 12m',
		href: 'https://cthulhudivers.com/dive-sites/cenote-chac-mool',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2500,
		tanks: 2,
		ticket: 250,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	dosOjos: {
		name: 'Dos Ojos',
		aka: 'Two Eyes',
		cardImg: '../img/cards/cenote-dos-ojos.webp',
		days: 1,
		depth: '23ft / 7m',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 3200,
		tanks: 2,
		ticket: 600,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	dreamgate: {
		name: 'Puerta de los sueños',
		aka: 'Dreamgate',
		cardImg: '../img/cards/cenote-dreamgate.webp',
		days: 1,
		depth: '30ft / 9m',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2900,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	elPit: {
		name: 'El Pit',
		aka: 'The Pit',
		cardImg: '../img/cards/cenote-el-pit.webp',
		days: 1,
		depth: '130ft / 40m',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 3200,
		tanks: 2,
		ticket: 600,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	maravilla: {
		name: 'Maravilla',
		aka: 'The Blue Abyss',
		cardImg: '../img/cards/cenote-maravilla.webp',
		days: 1,
		depth: '130ft / 40ft',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2500,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	ponderosa: {
		name: 'Ponderosa',
		aka: 'Garden of Eden',
		cardImg: '../img/cards/cenote-ponderosa.webp',
		days: 1,
		depth: '60ft / 18m',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2500,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	sucActun: {
		name: 'Suc Actun',
		aka: 'Pet Cemetery',
		cardImg: '../img/cards/cenote-pet-cemetery.webp',
		days: 1,
		depth: '23ft / 7m',
		href: '',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 3200,
		tanks: 2,
		ticket: 400,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	tajmaHa: {
		name: 'Tajma Ha',
		aka: 'Taj Mahal',
		arrivalD1: '9:00',
		departureD1: '13:30',
		cardImg: '../img/cards/cenote-tajma-ha.webp',
		days: 1,
		depth: '50ft / 15m',
		href: 'https://cthulhudivers.com/dive-sites/cenote-tajma-ha',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2500,
		tanks: 2,
		ticket: 300,
		transport: 'Included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	zapote: {
		name: 'Zapote',
		aka: 'Hells Bells',
		cardImg: '../img/cards/cenote-zapote.webp',
		days: 1,
		depth: '130ft / 40m',
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.3,
		shuttle: 2500,
		tanks: 2,
		ticket: 400,
		transport: 'included',
		get cost() {
			let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + this.ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + this.shuttle) / 2 / exchangeRate;
			return cost;
		},
		get deposit() {
			return roundUp(this.shuttle / 2);
		},
	},
	calcCost: function (site) {
		let cost = ((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + cenotePricing[site].ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + cenotePricing[site].shuttle) / 2 / exchangeRate;
		quotePrice(cenotePricing, site, cost, cenotePricing[site].profitPercent);
		if (location != null) {
			scubaSpecifics(site, cenotePricing[site].arrivalD1, cenotePricing[site].departureD1, cenotePricing[site].arrivalD2, cenotePricing[site].departureD2);
		}
	},
};

const coursePricing = {
	extras: {
		eanx32: 150,
		photos: 25,
	},
	aow: {
		name: 'PADI Advanced Open Water',
		arrivalD1: '12:20',
		departureD1: '16:45',
		arrivalD2: '8:15',
		departureD2: '12:30',
		boat: 1350,
		days: 2,
		deposit: 175 * exchangeRate,
		elearning: 173.1,
		guide: 80,
		photosAllowed: true,
		profitPercent: 1.3,
		tanks: 4,
	},
	dsd: {
		name: 'PADI Discover Scuba Diving',
		arrivalD1: '10:00',
		departureD1: '16:45',
		boat: 1350,
		days: 1,
		deposit: 1350,
		elearning: 0,
		guide: 25,
		photosAllowed: true,
		profitPercent: 1.62,
		tanks: 3,
	},
	ow: {
		name: 'PADI Open Water',
		arrivalD1: '8:15',
		departureD1: '16:45',
		arrivalD2: '8:15',
		departureD2: '12:30',
		boat: 1350,
		days: 2,
		deposit: 175 * exchangeRate,
		elearning: 173.1,
		guide: 100,
		photosAllowed: true,
		profitPercent: 1.3,
		tanks: 5,
	},
	referral: {
		name: 'PADI Referral Program',
		arrivalD1: '12:20',
		departureD1: '16:45',
		arrivalD2: '8:15',
		departureD2: '12:30',
		boat: 1350,
		days: 2,
		deposit: 1350,
		elearning: 0,
		guide: 100,
		photosAllowed: true,
		profitPercent: 1.3,
		tanks: 5,
	},
	refresher: {
		name: 'PADI Scuba Refresher',
		arrivalD1: '12:20',
		departureD1: '16:45',
		arrivalD2: '7:00',
		departureD2: '12:30',
		boat: 1350,
		days: 1,
		deposit: 1350,
		elearning: 0,
		guide: 25,
		photosAllowed: true,
		profitPercent: 1.62,
		tanks: 3,
	},
	scubaDiver: {
		name: 'PADI Scuba Diver',
		arrivalD1: '8:15',
		departureD1: '16:45',
		boat: 1350,
		days: 1,
		deposit: 175 * exchangeRate,
		elearning: 173.1,
		guide: 60,
		photosAllowed: true,
		profitPercent: 1.44,
		tanks: 2,
	},
	calcCost: function (site) {
		let cost = coursePricing[site].guide + coursePricing[site].elearning + (coursePricing[site].boat * coursePricing[site].days) / exchangeRate;
		quotePrice(coursePricing, site, cost, coursePricing[site].profitPercent);
		scubaSpecifics(site, coursePricing[site].arrivalD1, coursePricing[site].departureD1, coursePricing[site].arrivalD2, coursePricing[site].departureD2);
	},
};

const nonDiving = {
	chichenItza: {
		ticket: 73,
		profitPercent: 1.2,
		get info() {
			populateLocations('chichenItza');
			const tourAdultCard = document.querySelector('#chichenItzaAdultCard');
			const tourKidsCard = document.querySelector('#chichenItzaKidsCard');
			tourAdultCard.textContent = roundUp(this.ticket * this.profitPercent * 1.16);
			tourKidsCard.textContent = roundUp(this.ticket * this.profitPercent * 1.16 * 0.9);
		},
	},
	chichenItzaEarly: {
		ticket: 83,
		profitPercent: 1.2,
		get info() {
			populateLocations('chichenItzaEarly');
			const tourEarlyAdultCard = document.querySelector('#chichenItzaEarlyAdultCard');
			const tourEarlyKidsCard = document.querySelector('#chichenItzaEarlyKidsCard');
			tourEarlyAdultCard.textContent = roundUp(this.ticket * this.profitPercent * 1.16);
			tourEarlyKidsCard.textContent = roundUp(this.ticket * this.profitPercent * 1.16 * 0.9);
		},
	},
	columbus: {
		dockFee: 15,
		lobster: 119,
		ribeye: 99,
		surfTurf: 119,
		veg: 99,
		transport: 30,
		sunsetArrival: '17:00',
		sunsetDeparture: '20:15',
		moonlightArrival: '20:00',
		moonlightDeparture: '23:15',
		get info() {
			populateLocations('sb805');
			const tourPickUp = document.querySelector('#columbusPickUp');
			const tourDropOff = document.querySelector('#columbusDropOff');
			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
			const tourLobsterCard = document.querySelector('#columbusLobsterCard');
			const tourRibeyeCard = document.querySelector('#columbusRibeyeCard');
			const tourSurfTurfCard = document.querySelector('#columbusSurfTurfCard');
			const tourVegCard = document.querySelector('#columbusVegCard');
			const tourDockFee = document.querySelector('#columbusDockFee');
			const selectedHotel = locations.options[locations.selectedIndex].value;
			const travelTime = hotelList[selectedHotel].sb805;

			let arr = convertTime(this.sunsetArrival);
			let dep = convertTime(this.sunsetDeparture);
			tourPickUp.textContent = revertTime(arr - travelTime);
			tourDropOff.textContent = revertTime(dep + travelTime);

			arr = convertTime(this.moonlightArrival);
			dep = convertTime(this.moonlightDeparture);
			tourPickUpD2.textContent = revertTime(arr - travelTime);
			tourDropOffD2.textContent = revertTime(dep + travelTime);

			tourDockFee.textContent = this.dockFee;
			tourLobsterCard.textContent = roundUp(this.lobster + this.transport);
			tourRibeyeCard.textContent = roundUp(this.ribeye + this.transport);
			tourSurfTurfCard.textContent = roundUp(this.surfTurf + this.transport);
			tourVegCard.textContent = roundUp(this.veg + this.transport);
		},
	},
	xcaret: {
		ticketAdult: 120.99,
		ticketKids: 90.74,
		transport: 33,
	},
	xoximilco: {
		ticketAdult: 109.99,
		ticketKids: 82.49,
		transport: 33,
	},
	xplorFuego: {
		ticketAdult: 120.99,
		ticketKids: 90.74,
		transport: 33,
	},
	xplor: {
		ticketAdult: 142.99,
		ticketKids: 107.24,
		transport: 33,
	},
	xParks: function (site) {
		populateLocations(site);
		const tourPickUp = document.querySelector(`#${site}PickUp`);
		const tourAdultCard = document.querySelector(`#${site}AdultCard`);
		const tourKidsCard = document.querySelector(`#${site}KidsCard`);

		tourPickUp.textContent = hotelList[locations.options[locations.selectedIndex].value][site];
		tourAdultCard.textContent = roundUp(nonDiving[site].ticketAdult + nonDiving[site].transport);
		tourKidsCard.textContent = roundUp(nonDiving[site].ticketKids + nonDiving[site].transport);
	},
};

const oceanPricing = {
	extras: {
		eanx32: 150,
		photos: 25,
	},
	bullShark: {
		name: 'Bull Shark',
		arrivalD1: '13:00',
		departureD1: '17:00',
		boat: 1540,
		days: 1,
		deposit: 1540,
		guide: 20,
		minAge: 15,
		photosAllowed: false,
		profitPercent: 1.96,
		tanks: 2,
		type: 'ocean',
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
		guide: 15,
		minAge: 10,
		photosAllowed: true,
		profitPercent: 1.55,
		tanks: 2,
		type: 'ocean',
	},
	nightDiving: {
		name: 'Night Diving',
		arrivalD1: '18:30',
		departureD1: '21:30',
		boat: 1350,
		days: 1,
		deposit: 1350,
		guide: 20,
		minAge: 12,
		photosAllowed: false,
		profitPercent: 1.45,
		tanks: 1,
		type: 'ocean',
	},
	calcCost: function (site, list) {
		let cost = list[site].guide + list[site].boat / exchangeRate;
		quotePrice(list, site, cost, list[site].profitPercent);
		scubaSpecifics(site, list[site].arrivalD1, list[site].departureD1, list[site].arrivalD2, list[site].departureD2, list[site].minAge);
	},
};

const snorkelPricing = {
	musaSnorkel: {
		name: 'Musa & Reef Snorkeling',
		arrivalD1: '12:20',
		departureD1: '16:45',
		boat: 1350,
		boatDpt: '13:00',
		cardImg: '../img/cards/musa-snorkeling.webp',
		days: 1,
		deposit: 1350,
		guide: 5,
		href: 'https://cthulhudivers.com/non-diving/cancuns-best-snorkeling-tour',
		minAge: 6,
		photosAllowed: false,
		profitPercent: 1.2,
		get info() {
			let cost = this.guide + this.boat / exchangeRate;
			quotePrice(snorkelPricing, 'musaSnorkel', cost, snorkelPricing.musaSnorkel.profitPercent);
			scubaSpecifics('musaSnorkel', snorkelPricing.musaSnorkel.arrivalD1, snorkelPricing.musaSnorkel.departureD1, snorkelPricing.musaSnorkel.arrivalD2, snorkelPricing.musaSnorkel.departureD2);
		},
	},
	turtleSnorkel: {
		name: 'Turtle 5-in-1 Snorkel',
		departureD1: '10:00',
		boatDpt: '7:30',
		cardImg: '../img/cards/turtle-snorkeling.webp',
		days: 1,
		groupSize: 10,
		href: 'https://cthulhudivers.com/non-diving/turtle-snorkel-tour-5-in-1',
		minAge: 6,
		photosAllowed: false,
		profitPercent: 1.3,
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

			tourPickUpD1.textContent = mpnPickup[0];
			tourPickUpD2.textContent = mpnPickup[1];
			tourPickUpD3.textContent = mpnPickup[2];
			tourPickUpD4.textContent = mpnPickup[3];
			tourPickUpD5.textContent = mpnPickup[4];
			tourGroupSize.textContent = snorkelPricing.turtleSnorkel.groupSize;
			tourMinAge.textContent = snorkelPricing.turtleSnorkel.minAge;
		},
	},
	whaleShark: {
		name: 'Whale Shark Snorkeling',
		boatDpt: '7:45',
		departureD1: '13:15',
		boat: 110 * exchangeRate,
		cardAlt: 'Musa & Turtle snorkeling',
		cardImg: '../img/cards/whale-shark-snorkeling.webp',
		days: 1,
		deposit: 110,
		dockFee: 20,
		guide: 0,
		href: 'https://cthulhudivers.com/cancun-whale-shark-snorkeling',
		listPrice: 170,
		minAge: 5,
		photosAllowed: false,
		profitPercent: 1.3,
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
		case 'Cenote Tajma Ha':
			cenotePricing.calcCost('tajmaHa');
			break;
		case 'Certified Divers':
			oceanPricing.calcCost('certified', oceanPricing);
			break;
		case 'Chichén Itzá,':
			nonDiving.chichenItza.info;
			break;
		case 'Chichén Itzá':
			nonDiving.chichenItzaEarly.info;
			break;
		case 'Columbus Dinner Cruise':
			nonDiving.columbus.info;
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
		case 'Turtle Snorkel Adventure':
			snorkelPricing.turtleSnorkel.info;
			break;
		case 'Whale Shark':
			snorkelPricing.whaleShark.info;
			break;
		case 'Xcaret':
			nonDiving.xParks('xcaret');
			break;
		case 'Xoximilco':
			nonDiving.xParks('xoximilco');
			break;
		case 'Xplor Fuego':
			nonDiving.xParks('xplorFuego');
			break;
		case 'Xplor':
			nonDiving.xParks('xplor');
			break;
	}
};

tourPricing(activity);

if (locations != null) {
	locations.addEventListener('change', function () {
		tourPricing(activity);
	});
}
