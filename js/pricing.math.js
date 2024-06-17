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

const convertToMEX = (value, fixed) => {
	return Number((value * exchangeRate).toFixed(fixed));
};

const convertToUSD = (value, fixed) => {
	return Number((value / exchangeRate).toFixed(fixed));
};

const roundUp = (x) => {
	return Math.ceil(x / 5) * 5;
};

const roundTo2ndDecimal = (x) => {
	return Number(x.toFixed(2));
};

// Calculate PayPal fees for invoicing
const palPalFees = (amountUSD) => {
	// PayPal fees for invoicing
	let paypalInvoiceFeeRate = 0.05; // 5%
	let paypalFixedInvoiceFeeUSD = 0.49; // $0.49

	return amountUSD * paypalInvoiceFeeRate + paypalFixedInvoiceFeeUSD;

	// // Calculate PayPal fees for invoicing
	// let paypalInvoiceFeeUSD = amountUSD * paypalInvoiceFeeRate + paypalFixedInvoiceFeeUSD;

	// // Calculate total amount after PayPal fees in USD
	// let amountAfterPayPalFeesUSD = amountUSD - paypalInvoiceFeeUSD;

	// // Convert total amount after PayPal fees to MXN
	// let amountAfterPayPalFeesMXN = amountAfterPayPalFeesUSD * exchangeRate;

	// return {
	// 	paypalInvoiceFeeUSD: paypalInvoiceFeeUSD,
	// 	amountAfterPayPalFeesUSD: amountAfterPayPalFeesUSD,
	// 	amountAfterPayPalFeesMXN: amountAfterPayPalFeesMXN,
	// };
};

// Calculate cost of nitrox tanks
const getNitroxCost = (pricelist, activity) => {
	let nitroxMXN;
	let nitroxCalc = cthulhuTours[pricelist][activity].bookingRequirements.days * 2 * cthulhuTours.common.eanx32;
	if (activity === 'refresher' || activity === 'ppb') {
		nitroxMXN = nitroxCalc * (cthulhuTours[pricelist][activity].tanks - 1);
	} else {
		nitroxMXN = nitroxCalc * cthulhuTours[pricelist][activity].tanks;
	}
	return roundUp(nitroxMXN / exchangeRate);
};

const getPrep = (pricelist, tour) => {
	const prepItems = pricelist[tour].prep;
	prepItems.forEach((item) => {
		const paragraph = document.createElement('p');
		paragraph.innerHTML = item;
		tourPrep.appendChild(paragraph);
	});
};

const getCosts = (pricelist, tour) => {
	const costs = cthulhuTours[pricelist][tour].costs;

	Object.entries(costs).forEach(([key, value]) => {
		const capatilizeFirstLetter = key.charAt(0).toUpperCase() + key.slice(1);
		let valueUSD = convertToUSD(value, 2).toFixed(2);
		let paragraph = createParagraph(`<span>${capatilizeFirstLetter}:</span> U$${valueUSD} <em>(${value}mxn)</em>`);
		if (key === 'elearning') {
			paragraph = createParagraph(`<span>${capatilizeFirstLetter}:</span> U$${valueUSD}`);
		}
		tourCashCosts.appendChild(paragraph);
		tourCardCosts.appendChild(paragraph.cloneNode(true));
	});
};

const getInvoicing = (pricelist, selectedTour, costs, profitPercent, tourData) => {
	// Get sub-total costs
	let subTotalUSD = 0;
	const tourCosts = Object.values(costs);
	tourCosts.forEach((cost) => {
		cost = convertToUSD(cost, 2);
		subTotalUSD += cost;
	});

	// Names
	tourData.name = cthulhuTours[pricelist][selectedTour].name;
	tourData.aka = cthulhuTours[pricelist][selectedTour].aka;
	// Transport
	tourData.arrivalDay1 = cthulhuTours[pricelist][selectedTour].transport.arrivalDay1;
	tourData.departureDay1 = cthulhuTours[pricelist][selectedTour].transport.departureDay1;
	tourData.pickUpDay1 = cthulhuTours[pricelist][selectedTour].transport.pickUpDay1;
	tourData.dropOffDay1 = cthulhuTours[pricelist][selectedTour].transport.dropOffDay1;
	tourData.arrivalDay2 = cthulhuTours[pricelist][selectedTour].transport.arrivalDay2;
	tourData.departureDay2 = cthulhuTours[pricelist][selectedTour].transport.departureDay2;
	tourData.pickUpDay2 = cthulhuTours[pricelist][selectedTour].transport.pickUpDay2;
	tourData.dropOffDay2 = cthulhuTours[pricelist][selectedTour].transport.dropOffDay2;
	// Booking Info
	tourData.available = cthulhuTours[pricelist][selectedTour].bookingRequirements.available;
	tourData.days = cthulhuTours[pricelist][selectedTour].bookingRequirements.days;
	tourData.deposit = cthulhuTours[pricelist][selectedTour].bookingRequirements.deposit;
	tourData.maxDepth = cthulhuTours[pricelist][selectedTour].bookingRequirements.maxDepth;
	tourData.minAge = cthulhuTours[pricelist][selectedTour].bookingRequirements.minAge;
	tourData.minCertLvl = cthulhuTours[pricelist][selectedTour].bookingRequirements.minCertLvl;
	tourData.minClients = cthulhuTours[pricelist][selectedTour].bookingRequirements.minClients;
	// Costs
	tourData.boat = cthulhuTours[pricelist][selectedTour].costs.boat;
	tourData.elearning = cthulhuTours[pricelist][selectedTour].costs.elearning;
	tourData.entranceFee = cthulhuTours[pricelist][selectedTour].costs.entranceFee;
	tourData.food = cthulhuTours[pricelist][selectedTour].costs.food;
	tourData.guide = cthulhuTours[pricelist][selectedTour].costs.guide;
	tourData.parking = cthulhuTours[pricelist][selectedTour].costs.parking;
	tourData.shuttle = cthulhuTours[pricelist][selectedTour].costs.shuttle;
	tourData.tanksDiverCost = cthulhuTours[pricelist][selectedTour].costs.tanksDiverCost;
	tourData.tanksGuideCost = cthulhuTours[pricelist][selectedTour].costs.tanksGuideCost;
	// Cash Sub-total, Profit, PayPal Fees & Taxes
	tourData.subTotalUSD = roundTo2ndDecimal(subTotalUSD);
	tourData.profitPercent = profitPercent;
	tourData.cashPrice = roundUp(subTotalUSD * tourData.profitPercent);
	tourData.cashPayPalFeeUSD = palPalFees(tourData.deposit);
	tourData.cashTax = tourData.deposit * 0.16;
	tourData.cashCostsTotal = roundTo2ndDecimal(tourData.subTotalUSD + tourData.cashPayPalFeeUSD + tourData.cashTax);
	tourData.cashProfitTotal = roundTo2ndDecimal(tourData.cashPrice - tourData.cashCostsTotal);
	// Card Sub-total, Profit, PayPal Fees & Taxes
	tourData.cardPrice = roundUp(tourData.cashPrice * 1.16);
	tourData.cardPayPalFeeUSD = palPalFees(tourData.cardPrice);
	tourData.cardTax = roundTo2ndDecimal(tourData.cashPrice * 0.16);
	tourData.cardCostsTotal = roundTo2ndDecimal(tourData.subTotalUSD + tourData.cardPayPalFeeUSD + tourData.cardTax);
	tourData.cardProfitTotal = roundTo2ndDecimal(tourData.cardPrice - tourData.cardCostsTotal);
	// Extras
	tourData.nitroxUSD = getNitroxCost(pricelist, selectedTour);
	tourData.photos = cthulhuTours.common.photos;
	// Prep
	tourData.prep = cthulhuTours[pricelist][selectedTour].prep;
};

const cthulhuTours = {
	common: {
		cenote: {
			food: 200,
			tanksClient: 80,
			tanksGuide: 250,
		},
		eanx32: 150,
		photos: 25,
		soloBuceo: {
			costBoatMXN: 1350,
			get costBoatUSD() {
				return convertToUSD(this.costBoatMXN, 2);
			},
		},
	},
	certifiedTours: {
		musa: {
			name: 'Musa & Reef',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-musa.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.55,
			tanks: 2,
			transport: {
				arrivalDay1: '12:20',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		manchones: {
			name: 'Manchones Reefs',
			available: 'Daily',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-manchones.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.55,
			tanks: 2,
			transport: {
				arrivalDay1: '12:20',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		mesoamerican: {
			name: 'Mesoamerican Reefs',
			bookingRequirements: {
				available: 'Mon, Wed, Fri, Sun',
				days: 1,
				maxDepth: '55ft / 17m',
				minAge: 12,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-mesoamerican.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.55,
			tanks: 2,
			transport: {
				arrivalDay1: '8:05',
				departureDay1: '12:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		wreck: {
			name: 'Wreck & Reef',
			bookingRequirements: {
				available: 'Tue, Thu, Sat',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-wreck.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.55,
			tanks: 2,
			transport: {
				arrivalDay1: '8:05',
				departureDay1: '12:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		bullShark: {
			name: 'Bull Shark',
			bookingRequirements: {
				available: 'Daily (Nov - Feb)',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-bull-shark.webp',
			costs: {
				boat: 1800,
				guide: 500,
				parking: 50,
			},
			href: 'https://cthulhudivers.com/cancun-bull-shark-diving',
			nitroxAllowed: true,
			profitPercent: 1.96,
			tanks: 2,
			transport: {
				arrivalDay1: '13:00',
				departureDay1: '17:00',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Playa Pelicanos');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Playa Pelicanos');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + tourData.parking}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> Mask, BCD, Regulator, Full Wetsuit, Fins`,
					`<div class="prep-notes"><h5>Notes:</h5> 50mxn needs to be in change for parking meter.</div>`,
				];
			},
		},
		certified: {
			name: 'Certified Divers',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.55,
			tanks: 2,
			transport: {
				arrivalDay1: '8:05',
				departureDay1: '12:30',
				arrivalDay2: '12:20',
				departureDay2: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		cozumel: {
			name: 'Cozumel',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-cozumel.webp',
			costs: {
				boat: 2000,
				guide: 500,
				parking: 50,
			},
			href: 'https://cthulhudivers.com/cancun-cozumel',
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.5,
			tanks: 2,
			transport: {
				arrivalDay1: '8:00',
				departureDay1: '13:00',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Playa Pelicanos');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Playa Pelicanos');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + tourData.parking}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> Mask, BCD, Regulator, Wetsuit, Fins`,
					`<div class="prep-notes"><h5>Notes:</h5> 50mxn needs to be in change for parking meter.</div>`,
				];
			},
		},
		nightDiving: {
			name: 'Night Diving',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 12,
				minCertLvl: 'Scuba Diver',
				minClients: 3,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-night-dive.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			href: 'https://cthulhudivers.com/cancun-night-diving',
			nitroxAllowed: true,
			profitPercent: 1.55,
			tanks: 1,
			transport: {
				arrivalDay1: '17:30',
				departureDay1: '21:00',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
	},
	courses: {
		dsd: {
			name: 'Discover Scuba Diving',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-dsd.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 500,
			},
			days: 1,
			href: 'https://cthulhudivers.com/cancun-padi-discover-scuba-diving-dsd',
			photosAllowed: true,
			profitPercent: 1.62,
			tanks: 3,
			transport: {
				arrivalDay1: '10:00',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		refresher: {
			name: 'PADI Scuba Refresher',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-refresher.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 500,
			},
			href: 'https://cthulhudivers.com/cancun-padi-refresher',
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.62,
			tanks: 3,
			transport: {
				arrivalDay1: '10:00',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		scubaDiver: {
			name: 'PADI Scuba Diver',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.courses.scubaDiver.costs.elearning, 2));
				},
			},
			cardImg: '../img/cards/course-scuba-diver.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: convertToMEX(183.55, 2),
				guide: 1000,
			},
			days: 1,
			href: 'https://cthulhudivers.com/cancun-padi-scuba-diver',
			photosAllowed: true,
			profitPercent: 1.44,
			tanks: 2,
			transport: {
				arrivalDay1: '8:15',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		ow: {
			name: 'PADI Open Water',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '60ft / 18m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.courses.ow.costs.elearning, 2));
				},
			},
			cardImg: '../img/cards/course-ow.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN * 2;
				},
				elearning: convertToMEX(183.55, 2),
				guide: 2000,
			},
			href: 'https://cthulhudivers.com/cancun-padi-open-water-scuba-diver',
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 5,
			transport: {
				arrivalDay1: '8:15',
				departureDay1: '16:45',
				arrivalDay2: '8:15',
				departureDay2: '12:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUpDay2() {
					return calculateTransportTime(this.arrivalDay2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay2() {
					return calculateTransportTime(this.departureDay2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat * 2}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		referral: {
			name: 'PADI Referral Program',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '60ft / 18m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-referral.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: convertToMEX(183.55),
				guide: 2000,
			},
			days: 2,
			href: 'https://cthulhudivers.com/cancun-padi-referral',
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 4,
			transport: {
				arrivalDay1: '12:20',
				departureDay1: '16:45',
				arrivalDay2: '8:15',
				departureDay2: '12:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUpDay2() {
					return calculateTransportTime(this.arrivalDay2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay2() {
					return calculateTransportTime(this.departureDay2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat * 2}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		aow: {
			name: 'PADI Advanced OW',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '130ft / 40m',
				minAge: 12,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.courses.aow.costs.elearning));
				},
			},
			cardImg: '../img/cards/course-aow.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: convertToMEX(173.1, 2),
				guide: 1600,
			},
			days: 2,
			href: 'https://cthulhudivers.com/cancun-padi-advanced-open-water',
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 4,
			transport: {
				arrivalDay1: '12:20',
				departureDay1: '16:45',
				arrivalDay2: '8:15',
				departureDay2: '12:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUpDay2() {
					return calculateTransportTime(this.arrivalDay2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay2() {
					return calculateTransportTime(this.departureDay2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat * 2}mxn`, `<span>Doc:</span> 10038, 10346`, `<span>Equipment:</span> Compass`];
			},
		},
		ppb: {
			name: 'PADI Peak Performance',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.courses.ppb.costs.elearning));
				},
			},
			cardImg: '../img/cards/course-buoyancy.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: convertToMEX(122.65, 2),
				guide: 1000,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 3,
			transport: {
				arrivalDay1: '10:15',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10038`];
			},
		},
		nitrox: {
			name: 'PADI Enriched Air Diver',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 10,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.courses.nitrox.costs.elearning));
				},
			},
			cardImg: '../img/cards/course-nitrox.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: convertToMEX(152.8, 2),
				guide: 660,
				get nitrox() {
					return cthulhuTours.common.eanx32 * 4;
				},
			},
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '10:15',
				departureDay1: '16:45',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + cthulhuTours.common.eanx32 * 4}mxn`, `<span>Doc:</span> 10346, 10038`, `<span>Equipment:</span> Nitrox analyzer, Nitrox Tables`];
			},
		},
	},
	cenotes: {
		actunHa: {
			name: 'Actun Ha',
			aka: 'Carwash',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '60ft / 18m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.actunHa.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-car-wash.webp',
			costs: {
				entranceFee: 250,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-car-wash',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		angelita: {
			name: 'Angelita',
			aka: 'Little Angel',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.angelita.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-angelita.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			days: 1,
			guide: 750,
			href: 'https://cthulhudivers.com/dive-sites/cenote-angelita',
			nitroxAllowed: true,

			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		calavera: {
			name: 'Calavera',
			aka: 'Temple of Doom',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '50ft / 15m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.calavera.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-calavera.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2900 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-calavera-temple-of-doom',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		chacMool: {
			name: 'Chac Mool',
			aka: 'Jaguar',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.chacMool.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-chac-mool.webp',
			costs: {
				entranceFee: 250,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-chac-mool',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="prep-notes"><h5>Notes:</h5> Vicente is the only cenote guide we have who can guide this cenote. Please check his availability before booking clients.</div>`,
				];
			},
		},
		dosOjos: {
			name: 'Dos Ojos',
			aka: 'Two Eyes',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '45ft / 14m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.dosOjos.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-dos-ojos.webp',
			costs: {
				entranceFee: 600,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-dos-ojos',
			nitroxAllowed: true,
			profitPercent: 1.3,
			shuttle: 3200,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		dreamgate: {
			name: 'Puerta de los Sueños',
			aka: 'Dreamgate',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '30ft / 9m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.dreamgate.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-dreamgate.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2900 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		elPit: {
			name: 'El Pit',
			aka: 'The Pit',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.elPit.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-el-pit.webp',
			costs: {
				entranceFee: 600,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		maravilla: {
			name: 'Maravilla',
			aka: 'The Blue Abyss',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40ft',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.maravilla.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-maravilla.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		ponderosa: {
			name: 'Ponderosa',
			aka: 'Garden of Eden',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '60ft / 18m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.ponderosa.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-ponderosa.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		sucActun: {
			name: 'Suc Actun',
			aka: 'Pet Cemetery',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '23ft / 7m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.sucActun.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-pet-cemetery.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		tajmaHa: {
			name: 'Tajma Ha',
			aka: 'Taj Mahal',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '50ft / 15m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.tajmaHa.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-tajma-ha.webp',
			costs: {
				entranceFee: 300,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-tajma-ha',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="prep-notes"><h5>Notes:</h5> Due to construction at this site, visibility has been reduced significantly. Until further notice, please try to sell an alternative.</div>`,
				];
			},
		},
		zapote: {
			name: 'Zapote',
			aka: 'Hells Bells',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.zapote.costs.shuttle));
				},
			},
			cardImg: '../img/cards/cenote-zapote.webp',
			costs: {
				entranceFee: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500 / 2,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrivalDay1: '8:30',
				departureDay1: '14:30',
				get pickUpDay1() {
					return calculateTransportTime(this.arrivalDay1, locations.value, 'pickup', 'Cenote');
				},
				get dropOffDay1() {
					return calculateTransportTime(this.departureDay1, locations.value, 'dropoff', 'Cenote');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entranceFee + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
	},
	snorkeling: {
		musaSnorkel: {
			name: 'Musa & Reef',
			arrivalDay1: '12:20',
			departureDay1: '16:45',
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
			departureDay1: '10:00',
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
			profitPercent: 1.6,
			shuttle: 0,
			tanks: 0,
			tanksDiverCost: 0,
			tanksGuideCost: 0,
			get info() {
				populateLocations('mpnPickup');
				const tourpickUpDay1 = document.querySelector('#turtleSnorkelpickUpDay1');
				const tourPickUpD2 = document.querySelector('#turtleSnorkelPickUpD2');
				const tourPickUpD3 = document.querySelector('#turtleSnorkelPickUpD3');
				const tourPickUpD4 = document.querySelector('#turtleSnorkelPickUpD4');
				const tourPickUpD5 = document.querySelector('#turtleSnorkelPickUpD5');
				const tourGroupSize = document.querySelector('#turtleSnorkelGroupSize');
				const tourMinAge = document.querySelector('#turtleSnorkelMinAge');
				const mpnPickup = hotelList[locations.options[locations.selectedIndex].value].mpnPickup;
				const tourCard = document.querySelector('#turtleSnorkelCard');
				const tourDeposit = document.querySelector('#turtleSnorkelDeposit');

				tourpickUpDay1.textContent = mpnPickup[0];
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
			departureDay1: '13:15',
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
				let boatRet = convertTime(snorkelPricing.whaleShark.departureDay1);
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
// 		arrivalDay1: '12:20',
// 		departureDay1: '16:45',
// 		available: 'Daily',
// 		boat: 1350,
// 		boatDpt: '13:00',
// 		cardAlt: 'musa snorkeling tour',
// 		cardImg: '../img/cards/snorkel-musa.webp',
// 		days: 1,
// 		guide: 0,
// 		href: 'https://cthulhudivers.com/non-diving/cancuns-best-snorkeling-tour',
// 		minAge: 6,
// 		profitPercent: 1.3,
// 		get cost() {
// 			return convertToUSD(this.guide + this.boat, 2);
// 		},
// 		get info() {
// 			quotePrice(snorkelPricing, 'musaSnorkel', this.cost, this.profitPercent);
// 			scubaSpecifics('musaSnorkel', this.arrivalDay1, this.departureDay1, this.arrivalDay2, this.departureDay2);
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
// 		departureDay1: '10:00',
// 		available: 'Daily',
// 		boat: 45,
// 		boatDpt: '7:30',
// 		cardAlt: '5-1 snorkeling tour',
// 		cardImg: '../img/cards/snorkel-turtle.webp',
// 		days: 1,
// 		groupSize: 10,
// 		href: 'https://cthulhudivers.com/non-diving/turtle-snorkel-tour-5-in-1',
// 		minAge: 6,
//
// 		profitPercent: 1.6,
// 		get info() {
// 			populateLocations('mpnPickup');
// 			const tourpickUpDay1 = document.querySelector('#turtleSnorkelpickUpDay1');
// 			const tourPickUpD2 = document.querySelector('#turtleSnorkelPickUpD2');
// 			const tourPickUpD3 = document.querySelector('#turtleSnorkelPickUpD3');
// 			const tourPickUpD4 = document.querySelector('#turtleSnorkelPickUpD4');
// 			const tourPickUpD5 = document.querySelector('#turtleSnorkelPickUpD5');
// 			const tourGroupSize = document.querySelector('#turtleSnorkelGroupSize');
// 			const tourMinAge = document.querySelector('#turtleSnorkelMinAge');
// 			const mpnPickup = hotelList[locations.options[locations.selectedIndex].value].mpnPickup;
// 			const tourCard = document.querySelector('#turtleSnorkelCard');
// 			const tourDeposit = document.querySelector('#turtleSnorkelDeposit');

// 			tourpickUpDay1.textContent = mpnPickup[0];
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
// 		departureDay1: '13:15',
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
//
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
// 			let boatRet = convertTime(snorkelPricing.whaleShark.departureDay1);
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

// const nonDivingPricing = {
// 	chichenItzaAdults: {
// 		name: 'Chichen Itza - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-chichen-itza.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
// 		ticketCost: 0,
// 		entranceFee: 125,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('chichenItza');
// 			const tourAdultCard = document.querySelector('#chichenItzaAdultCard');
// 			tourAdultCard.textContent = roundUp(this.entranceFee);
// 		},
// 	},
// 	chichenItzaKids: {
// 		name: 'Chichen Itza - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-chichen-itza.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
// 		ticketCost: 0,
// 		entranceFee: 105,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('chichenItza');
// 			const tourKidsCard = document.querySelector('#chichenItzaKidsCard');
// 			tourKidsCard.textContent = roundUp(this.entranceFee);
// 		},
// 	},
// 	chichenItzaEarlyAdults: {
// 		name: 'Chichen Itza Early Bird - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
// 		ticketCost: 0,
// 		entranceFee: 155,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('chichenItzaEarly');
// 			const tourEarlyAdultCard = document.querySelector('#chichenItzaEarlyAdultCard');
// 			const tourEarlyKidsCard = document.querySelector('#chichenItzaEarlyKidsCard');
// 			tourEarlyAdultCard.textContent = roundUp(this.ticketAdult);
// 			tourEarlyKidsCard.textContent = roundUp(this.ticketKids);
// 		},
// 	},
// 	chichenItzaEarlyKids: {
// 		name: 'Chichen Itza Early Bird - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
// 		ticketCost: 0,
// 		entranceFee: 135,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('chichenItzaEarly');
// 			const tourEarlyAdultCard = document.querySelector('#chichenItzaEarlyAdultCard');
// 			const tourEarlyKidsCard = document.querySelector('#chichenItzaEarlyKidsCard');
// 			tourEarlyAdultCard.textContent = roundUp(this.ticketAdult);
// 			tourEarlyKidsCard.textContent = roundUp(this.ticketKids);
// 		},
// 	},
// 	cancunaMataTransfers: {
// 		name: 'Cancuna Matata Transfers',
// 		cardImg: '../img/cards/non-diving-cancuna-mata-transfers.webp',
// 		pricing: {
// 			cun: {
// 				cash3pax: 35,
// 				cashReturn3pax: 65,
// 				cash8pax: 55,
// 				cashReturn8pax: 85,
// 			},
// 			cm: {
// 				cash3pax: 75,
// 				cashReturn3pax: 145,
// 				cash8pax: 95,
// 				cashReturn8pax: 165,
// 			},
// 			pm: {
// 				cash3pax: 60,
// 				cashReturn3pax: 115,
// 				cash8pax: 80,
// 				cashReturn8pax: 135,
// 			},
// 			puertoMorelos: {
// 				cash3pax: 55,
// 				cashReturn3pax: 105,
// 				cash8pax: 75,
// 				cashReturn8pax: 125,
// 			},
// 			pdc: {
// 				cash3pax: 85,
// 				cashReturn3pax: 155,
// 				cash8pax: 105,
// 				cashReturn8pax: 175,
// 			},
// 			maya: {
// 				cash3pax: 100,
// 				cashReturn3pax: 180,
// 				cash8pax: 130,
// 				cashReturn8pax: 200,
// 			},
// 			unknown: {
// 				cash3pax: 0,
// 				cashReturn3pax: 0,
// 				cash8pax: 0,
// 				cashReturn8pax: 0,
// 			},
// 		},
// 		get info() {
// 			populateLocations('cmt');
// 			const location = hotelList[locations.options[locations.selectedIndex].value].location;
// 			const tourCard3 = document.querySelector('#cmtCard3');
// 			const tourcash3pax = document.querySelector('#cmtcash3pax');
// 			const tourCardReturn3 = document.querySelector('#cmtCardReturn3');
// 			const tourcashReturn3pax = document.querySelector('#cmtcashReturn3pax');
// 			const tourCard8 = document.querySelector('#cmtCard8');
// 			const tourcash8pax = document.querySelector('#cmtcash8pax');
// 			const tourCardReturn8 = document.querySelector('#cmtCardReturn8');
// 			const tourcashReturn8pax = document.querySelector('#cmtcashReturn8pax');

// 			tourcash3pax.textContent = cmtPricing[location].cash3pax;
// 			tourcashReturn3pax.textContent = cmtPricing[location].cashReturn3pax;
// 			tourCard3.textContent = roundUp(tourcash3pax.innerHTML * 1.16);
// 			tourCardReturn3.textContent = roundUp(tourcashReturn3pax.innerHTML * 1.16);
// 			tourcash8pax.textContent = cmtPricing[location].cash8pax;
// 			tourcashReturn8pax.textContent = cmtPricing[location].cashReturn8pax;
// 			tourCard8.textContent = roundUp(tourcash8pax.innerHTML * 1.16);
// 			tourCardReturn8.textContent = roundUp(tourcashReturn8pax.innerHTML * 1.16);
// 		},
// 	},
// 	columbusLobster: {
// 		name: 'Lobster Dinner Cruise',
// 		cardImg: '../img/cards/non-diving-columbus.webp',
// 		available: 'Daily',
// 		dockFee: 15,
// 		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
// 		ticketCost: 0,
// 		entranceFee: 119,
// 		transportCost: 35,
// 		transport: 'Included',
// 		sunsetArrival: '17:00',
// 		sunsetDeparture: '20:15',
// 		moonlightArrival: '20:00',
// 		moonlightDeparture: '23:15',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('sb805');
// 			const tourTransport = document.querySelector('#columbusSunsetTransport');
// 			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
// 			const tourPickUp = document.querySelector('#columbusPickUp');
// 			const tourDropOff = document.querySelector('#columbusDropOff');
// 			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
// 			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
// 			const tourLobsterCard = document.querySelector('#columbusLobsterCard');
// 			const tourDockFee = document.querySelector('#columbusDockFee');
// 			const selectedHotel = locations.options[locations.selectedIndex].value;
// 			const travelTime = hotelList[selectedHotel].sb805;

// 			tourTransport.textContent = this.transport;
// 			tourTransport2.textContent = this.transport;

// 			let arr = convertTime(this.sunsetArrival);
// 			let dep = convertTime(this.sunsetDeparture);
// 			tourPickUp.textContent = revertTime(arr - travelTime);
// 			tourDropOff.textContent = revertTime(dep + travelTime);

// 			arr = convertTime(this.moonlightArrival);
// 			dep = convertTime(this.moonlightDeparture);
// 			tourPickUpD2.textContent = revertTime(arr - travelTime);
// 			tourDropOffD2.textContent = revertTime(dep + travelTime);

// 			tourDockFee.textContent = this.dockFee;
// 			tourLobsterCard.textContent = roundUp(this.lobster);
// 		},
// 	},
// 	columbusSteak: {
// 		name: 'Steak Dinner Cruise',
// 		cardImg: '../img/cards/non-diving-columbus.webp',
// 		available: 'Daily',
// 		dockFee: 15,
// 		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
// 		ticketCost: 0,
// 		entranceFee: 99,
// 		transportCost: 35,
// 		transport: 'Included',
// 		sunsetArrival: '17:00',
// 		sunsetDeparture: '20:15',
// 		moonlightArrival: '20:00',
// 		moonlightDeparture: '23:15',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('sb805');
// 			const tourTransport = document.querySelector('#columbusSunsetTransport');
// 			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
// 			const tourPickUp = document.querySelector('#columbusPickUp');
// 			const tourDropOff = document.querySelector('#columbusDropOff');
// 			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
// 			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
// 			const tourRibeyeCard = document.querySelector('#columbusRibeyeCard');
// 			const tourDockFee = document.querySelector('#columbusDockFee');
// 			const selectedHotel = locations.options[locations.selectedIndex].value;
// 			const travelTime = hotelList[selectedHotel].sb805;

// 			tourTransport.textContent = this.transport;
// 			tourTransport2.textContent = this.transport;

// 			let arr = convertTime(this.sunsetArrival);
// 			let dep = convertTime(this.sunsetDeparture);
// 			tourPickUp.textContent = revertTime(arr - travelTime);
// 			tourDropOff.textContent = revertTime(dep + travelTime);

// 			arr = convertTime(this.moonlightArrival);
// 			dep = convertTime(this.moonlightDeparture);
// 			tourPickUpD2.textContent = revertTime(arr - travelTime);
// 			tourDropOffD2.textContent = revertTime(dep + travelTime);

// 			tourDockFee.textContent = this.dockFee;
// 			tourRibeyeCard.textContent = roundUp(this.ribeye);
// 		},
// 	},
// 	columbusSurfTurf: {
// 		name: 'S&T Dinner Cruise',
// 		cardImg: '../img/cards/non-diving-columbus.webp',
// 		available: 'Daily',
// 		dockFee: 15,
// 		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
// 		ticketCost: 0,
// 		entranceFee: 119,
// 		transportCost: 0,
// 		transport: 35,
// 		sunsetArrival: '17:00',
// 		sunsetDeparture: '20:15',
// 		moonlightArrival: '20:00',
// 		moonlightDeparture: '23:15',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('sb805');
// 			const tourTransport = document.querySelector('#columbusSunsetTransport');
// 			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
// 			const tourPickUp = document.querySelector('#columbusPickUp');
// 			const tourDropOff = document.querySelector('#columbusDropOff');
// 			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
// 			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
// 			const tourSurfTurfCard = document.querySelector('#columbusSurfTurfCard');
// 			const tourDockFee = document.querySelector('#columbusDockFee');
// 			const selectedHotel = locations.options[locations.selectedIndex].value;
// 			const travelTime = hotelList[selectedHotel].sb805;

// 			tourTransport.textContent = this.transport;
// 			tourTransport2.textContent = this.transport;

// 			let arr = convertTime(this.sunsetArrival);
// 			let dep = convertTime(this.sunsetDeparture);
// 			tourPickUp.textContent = revertTime(arr - travelTime);
// 			tourDropOff.textContent = revertTime(dep + travelTime);

// 			arr = convertTime(this.moonlightArrival);
// 			dep = convertTime(this.moonlightDeparture);
// 			tourPickUpD2.textContent = revertTime(arr - travelTime);
// 			tourDropOffD2.textContent = revertTime(dep + travelTime);

// 			tourDockFee.textContent = this.dockFee;
// 			tourSurfTurfCard.textContent = roundUp(this.surfTurf);
// 		},
// 	},
// 	columbusVeg: {
// 		name: 'Veg Dinner Cruise',
// 		cardImg: '../img/cards/non-diving-columbus.webp',
// 		available: 'Daily',
// 		dockFee: 15,
// 		href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
// 		ticketCost: 0,
// 		entranceFee: 99,
// 		transportCost: 0,
// 		transport: 35,
// 		sunsetArrival: '17:00',
// 		sunsetDeparture: '20:15',
// 		moonlightArrival: '20:00',
// 		moonlightDeparture: '23:15',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('sb805');
// 			const tourTransport = document.querySelector('#columbusSunsetTransport');
// 			const tourTransport2 = document.querySelector('#columbusMoonlightTransport');
// 			const tourPickUp = document.querySelector('#columbusPickUp');
// 			const tourDropOff = document.querySelector('#columbusDropOff');
// 			const tourPickUpD2 = document.querySelector('#columbusPickUpD2');
// 			const tourDropOffD2 = document.querySelector('#columbusDropOffD2');
// 			const tourVegCard = document.querySelector('#columbusVegCard');
// 			const tourDockFee = document.querySelector('#columbusDockFee');
// 			const selectedHotel = locations.options[locations.selectedIndex].value;
// 			const travelTime = hotelList[selectedHotel].sb805;

// 			tourTransport.textContent = this.transport;
// 			tourTransport2.textContent = this.transport;

// 			let arr = convertTime(this.sunsetArrival);
// 			let dep = convertTime(this.sunsetDeparture);
// 			tourPickUp.textContent = revertTime(arr - travelTime);
// 			tourDropOff.textContent = revertTime(dep + travelTime);

// 			arr = convertTime(this.moonlightArrival);
// 			dep = convertTime(this.moonlightDeparture);
// 			tourPickUpD2.textContent = revertTime(arr - travelTime);
// 			tourDropOffD2.textContent = revertTime(dep + travelTime);

// 			tourDockFee.textContent = this.dockFee;
// 			tourVegCard.textContent = roundUp(this.veg);
// 		},
// 	},
// 	wakeHalf: {
// 		name: 'Wakeboarding Half Day',
// 		available: 'Daily except Tuesdays',
// 		cardImg: '../img/cards/non-diving-wake.webp',
// 		boat: 150,
// 		ticketCost: 0,
// 		entranceFee: 1500,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('wake');
// 			const tourCard = document.querySelector('#wakeCard');
// 			tourCard.textContent = roundUp(this.boat * this.profitPercent * 1.16);
// 		},
// 	},
// 	wakeFull: {
// 		name: 'Wakeboarding Full Day',
// 		available: 'Daily except Tuesdays',
// 		cardImg: '../img/cards/non-diving-wake.webp',
// 		boat: 150,
// 		ticketCost: 0,
// 		entranceFee: 2000,
// 		transportCost: 0,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get info() {
// 			populateLocations('wake');
// 			const tourCard = document.querySelector('#wakeCard');
// 			tourCard.textContent = roundUp(this.boat * this.profitPercent * 1.16);
// 		},
// 	},
// 	xcaretAdults: {
// 		name: 'Xcaret - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xcaret.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
// 		ticketCost: 0,
// 		entranceFee: 120.99,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xcaretKids: {
// 		name: 'Xcaret - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xcaret.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
// 		ticketCost: 0,
// 		entranceFee: 90.74,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xoximilcoAdults: {
// 		name: 'Xoximilco - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xoximilco.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
// 		ticketCost: 0,
// 		entranceFee: 109.99,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xoximilcoKids: {
// 		name: 'Xoximilco - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xoximilco.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
// 		ticketCost: 0,
// 		entranceFee: 82.49,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xplorAdults: {
// 		name: 'Xplor - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xplor.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
// 		ticketCost: 0,
// 		entranceFee: 142.99,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xplorKids: {
// 		name: 'Xplor - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xplor.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
// 		ticketCost: 0,
// 		entranceFee: 107.24,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xplorFuegoAdults: {
// 		name: 'Xplor Fuego - Adults',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xplor-fuego.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
// 		ticketCost: 0,
// 		entranceFee: 120.99,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xplorFuegoKids: {
// 		name: 'Xplor Fuego - Kids',
// 		available: 'Daily',
// 		cardImg: '../img/cards/non-diving-xplor-fuego.webp',
// 		href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
// 		ticketCost: 0,
// 		entranceFee: 90.74,
// 		transportCost: 33,
// 		transport: 'Included',
// 		get cost() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 		get deposit() {
// 			return this.ticketCost + this.transportCost;
// 		},
// 	},
// 	xParks: function (site) {
// 		populateLocations(site);
// 		const tourPickUp = document.querySelector(`#${site}PickUp`);
// 		const tourAdultCard = document.querySelector(`#${site}AdultCard`);
// 		const tourKidsCard = document.querySelector(`#${site}KidsCard`);

// 		tourPickUp.textContent = hotelList[locations.options[locations.selectedIndex].value][site];
// 		tourAdultCard.textContent = roundUp(nonDivingPricing[site].ticketAdult + nonDivingPricing[site].transport);
// 		tourKidsCard.textContent = roundUp(nonDivingPricing[site].ticketKids + nonDivingPricing[site].transport);
// 	},
// };

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
