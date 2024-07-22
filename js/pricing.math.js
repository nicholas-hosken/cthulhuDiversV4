const activity = document.querySelector('.hero h1').innerHTML;
const locations = document.getElementById('locations');
const exchangeRate = 17.2;
const pageName = document.querySelector('.hero h1').innerHTML;
const kidsCardPrice = document.getElementById('kidsCardPrice');

let tourData = {};

// List hotels
const populateLocations = () => {
	if (pageName === 'Turtle Snorkel Adventure' || pageName === 'Columbus Dinner Cruise') {
		for (const key in hotelList) {
			if (hotelList[key].mpnPickup[0] === 'Not Available') {
				continue;
			} else {
				const option = document.createElement('option');
				option.value = key;
				option.innerHTML = hotelList[key].name;
				locations.appendChild(option);
			}
		}
	} else {
		for (const key in hotelList) {
			const option = document.createElement('option');
			option.value = key;
			option.innerHTML = hotelList[key].name;
			locations.appendChild(option);
			locations.selectedIndex = 1;
		}
	}
};

// Round to 2nd decimal place
const roundTo2ndDecimal = (x) => {
	return Math.round(x * 100) / 100;
};

const roundUpToNextCent = (x) => {
	return Math.ceil(x * 100) / 100;
};

// Convert USD to MXN
const convertToMEX = (value) => {
	return roundTo2ndDecimal(value * exchangeRate);
};

// Convert MXN to USD
const convertToUSD = (value) => {
	return roundTo2ndDecimal(value / exchangeRate);
};

// Round up to nearest number divisible by 5
const roundUp = (x) => {
	return Math.ceil(x / 5) * 5;
};

// Calculate PayPal fees for invoicing
const palPalFees = (amountUSD) => {
	let paypalInvoiceFeeRate = 0.05; // 5%
	let paypalFixedInvoiceFeeUSD = 0.49; // $0.49

	return amountUSD * paypalInvoiceFeeRate + paypalFixedInvoiceFeeUSD;
};

// Calculate cost of nitrox tanks
const getNitroxCost = (pricelist, activity) => {
	let nitroxMXN;
	let nitroxCalc = cthulhuTours[pricelist][activity].bookingRequirements.days * 2 * cthulhuTours.common.eanx32;
	if (activity === 'refresher' || activity === 'ppb' || activity === 'aow') {
		nitroxMXN = nitroxCalc * (cthulhuTours[pricelist][activity].tanks - 1);
	} else {
		nitroxMXN = nitroxCalc * cthulhuTours[pricelist][activity].bookingRequirements.tanks;
	}
	return roundUp(nitroxMXN / exchangeRate);
};
// List out the Prep items for the tour
const getPrep = (pricelist, tour) => {
	const prepItems = pricelist[tour].prep;
	prepItems.forEach((item) => {
		const paragraph = document.createElement('p');
		paragraph.innerHTML = item;
		tourPrep.appendChild(paragraph);
	});
};

function getSubTotalUSD(pricelist, selectedTour, clientNo, run) {
	tourData.deposit = tourData.deposit * clientNo;
	tourData.boat = tourData.boat * clientNo;
	tourData.elearning = tourData.elearning * clientNo;
	tourData.entrance = tourData.entrance * clientNo;
	tourData.food = tourData.food * clientNo;
	tourData.guide = tourData.guide * clientNo;
	tourData.tanksDiverCost = tourData.tanksDiverCost * clientNo;
	tourData.tanksGuideCost = tourData.tanksGuideCost * Math.ceil(clientNo / 4);

	if (run === 2) {
		if (clientNo < 2) {
			tourData.shuttle = tourData.shuttle;
		} else if (pricelist === 'cenotes') {
			tourData.shuttle = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.shuttle / exchangeRate) * Math.ceil(clientNo / 8);
		} else {
			tourData.shuttle = (cthulhuTours[pricelist][selectedTour].costs.shuttle / exchangeRate) * clientNo;
		}
	}

	let boat = tourData.boat;
	let elearning = tourData.elearning;
	let entrance = tourData.entrance;
	let food = tourData.food;
	let guide = tourData.guide;
	let parking = tourData.parking;
	let shuttle = tourData.shuttle;
	let tanksDiverCost = tourData.tanksDiverCost;
	let tanksGuideCost = tourData.tanksGuideCost;

	const ensureNumber = (value) => (isNaN(value) ? 0 : value);

	boat = roundTo2ndDecimal(ensureNumber(boat));
	elearning = roundTo2ndDecimal(ensureNumber(elearning));
	entrance = roundTo2ndDecimal(ensureNumber(entrance));
	food = roundTo2ndDecimal(ensureNumber(food));
	guide = roundTo2ndDecimal(ensureNumber(guide));
	parking = roundTo2ndDecimal(ensureNumber(parking));
	shuttle = roundTo2ndDecimal(ensureNumber(shuttle));
	tanksDiverCost = roundTo2ndDecimal(ensureNumber(tanksDiverCost));
	tanksGuideCost = roundTo2ndDecimal(ensureNumber(tanksGuideCost));

	return roundTo2ndDecimal(boat + elearning + entrance + food + guide + parking + tanksDiverCost + shuttle + tanksGuideCost);
}

// Send tour data to the tourData object
const updateTourData = (pricelist, selectedTour, paxNo) => {
	var paxNo = typeof paxNo !== 'undefined' ? paxNo : 1;
	let transportCost = cthulhuTours[pricelist][selectedTour].transport[hotelList[locations.value].location];
	pax = paxNo;
	if (!pax) pax = 1;

	// Names
	tourData.name = cthulhuTours[pricelist][selectedTour].name;
	tourData.aka = cthulhuTours[pricelist][selectedTour].aka;
	// Transport
	tourData.arrival1 = cthulhuTours[pricelist][selectedTour].transport.arrival1;
	tourData.departure1 = cthulhuTours[pricelist][selectedTour].transport.departure1;
	tourData.pickUp1 = cthulhuTours[pricelist][selectedTour].transport.pickUp1;
	tourData.dropOff1 = cthulhuTours[pricelist][selectedTour].transport.dropOff1;
	tourData.arrival2 = cthulhuTours[pricelist][selectedTour].transport.arrival2;
	tourData.departure2 = cthulhuTours[pricelist][selectedTour].transport.departure2;
	tourData.pickUp2 = cthulhuTours[pricelist][selectedTour].transport.pickUp2;
	tourData.dropOff2 = cthulhuTours[pricelist][selectedTour].transport.dropOff2;
	tourData.pickUpOptions = cthulhuTours[pricelist][selectedTour].transport.pickUpOptions;
	// Booking Info
	tourData.available = cthulhuTours[pricelist][selectedTour].bookingRequirements.available;
	tourData.cameraDSLR = cthulhuTours[pricelist][selectedTour].bookingRequirements.cameraDSLR;
	tourData.cameraGoPro = cthulhuTours[pricelist][selectedTour].bookingRequirements.cameraGoPro;
	tourData.days = cthulhuTours[pricelist][selectedTour].bookingRequirements.days;
	tourData.deposit = cthulhuTours[pricelist][selectedTour].bookingRequirements.deposit;
	tourData.dockFee = cthulhuTours[pricelist][selectedTour].bookingRequirements.dockFee * pax;
	tourData.maxDepth = cthulhuTours[pricelist][selectedTour].bookingRequirements.maxDepth;
	tourData.minAge = cthulhuTours[pricelist][selectedTour].bookingRequirements.minAge;
	tourData.minCertLvl = cthulhuTours[pricelist][selectedTour].bookingRequirements.minCertLvl;
	tourData.minClients = cthulhuTours[pricelist][selectedTour].bookingRequirements.minClients;
	tourData.tanks = cthulhuTours[pricelist][selectedTour].bookingRequirements.tanks;
	tourData.transport = cthulhuTours[pricelist][selectedTour].bookingRequirements.transport;
	// Costs
	tourData.boat = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.boat / exchangeRate);
	tourData.elearning = cthulhuTours[pricelist][selectedTour].costs.elearning;
	tourData.entrance = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.entrance / exchangeRate);
	tourData.food = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.food / exchangeRate);
	tourData.guide = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.guide / exchangeRate);
	tourData.parking = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.parking / exchangeRate);
	if (pricelist === 'cenotes') {
		tourData.shuttle = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.shuttle / exchangeRate) / 2;
	} else {
		tourData.shuttle = cthulhuTours[pricelist][selectedTour].costs.shuttle / exchangeRate;
	}
	tourData.tanksDiverCost = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.tanksDiverCost / exchangeRate);
	tourData.tanksGuideCost = roundUpToNextCent(cthulhuTours[pricelist][selectedTour].costs.tanksGuideCost / exchangeRate);
	// Cash Sub-total, Profit, PayPal Fees & Taxes
	tourData.subTotalUSD4One = getSubTotalUSD(pricelist, selectedTour, 1, 1);
	tourData.cashPayPalFeeUSD4One = palPalFees(tourData.deposit);
	tourData.cashTax4One = tourData.deposit * 0.16;
	tourData.cashCostsTotal4One = roundTo2ndDecimal(tourData.subTotalUSD4One + tourData.cashPayPalFeeUSD4One + tourData.cashTax4One);

	tourData.subTotalUSD = getSubTotalUSD(pricelist, selectedTour, pax, 2);
	tourData.cashPayPalFeeUSD = palPalFees(tourData.deposit);
	tourData.cashTax = tourData.deposit * 0.16;
	tourData.cashCostsTotal = roundTo2ndDecimal(tourData.subTotalUSD + tourData.cashPayPalFeeUSD + tourData.cashTax);

	tourData.profitPercent = cthulhuTours[pricelist][selectedTour].profitPercent;
	tourData.cashPrice4One = roundUp(tourData.cashCostsTotal4One * tourData.profitPercent) + transportCost;
	tourData.cashProfitTotal = roundTo2ndDecimal(tourData.cashPrice4One * pax - tourData.cashCostsTotal);

	//	Card Sub-total, Profit, PayPal Fees & Taxes
	tourData.cardPrice = roundUp(tourData.cashPrice4One * 1.16) * pax;
	tourData.cardPayPalFeeUSD = palPalFees(tourData.cardPrice);
	tourData.cardTax = roundTo2ndDecimal(tourData.cardPrice * 0.16);
	tourData.cardCostsTotal = roundTo2ndDecimal(tourData.subTotalUSD + tourData.cardPayPalFeeUSD + tourData.cardTax);
	tourData.cardProfitTotal = roundTo2ndDecimal(tourData.cardPrice - tourData.cardCostsTotal);
	// Extras
	tourData.nitroxUSD = getNitroxCost(pricelist, selectedTour);
	tourData.photos = cthulhuTours.common.photos;
	// Prep
	tourData.prep = cthulhuTours[pricelist][selectedTour].prep;
};

// Populate tour summary
const populateTourSummary = () => {
	const musaDepth = document.getElementById('musa-depth');
	const musaAvailability = document.getElementById('musa-availability');
	const manchonesDepth = document.getElementById('manchones-depth');
	const manchonesAvailability = document.getElementById('manchones-availability');
	const mesoamericanDepth = document.getElementById('mesoamerican-depth');
	const mesoamericanAvailability = document.getElementById('mesoamerican-availability');
	const wreckDepth = document.getElementById('wreck-depth');
	const wreckAvailability = document.getElementById('wreck-availability');
	// console.log(tourData);

	function applyData() {
		const elementsToUpdate = {
			available: 'available',
			amPickUp: 'pickUp1',
			amDropOff: 'dropOff1',
			cardPrice: 'cardPrice',
			cashPrice4One: 'cashPrice4One',
			deposit: 'deposit',
			dockFee: 'dockFee',
			dropOff1: 'dropOff1',
			dropOff2: 'dropOff2',
			minAge: 'minAge',
			maxDepth: 'maxDepth',
			nitroxUSD: 'nitroxUSD',
			photos: 'photos',
			pickUp1: 'pickUp1',
			pickUp2: 'pickUp2',
			pmPickUp: 'pickUp2',
			pmDropOff: 'dropOff2',
			tanks: 'tanks',
			transport: 'transport',
		};

		Object.entries(elementsToUpdate).forEach(([elementKey, tourDataKey]) => {
			const element = window[elementKey];
			if (element !== undefined) {
				const value = tourData[tourDataKey];
				element.textContent = elementKey === 'cardPrice' || elementKey === 'cashPrice4One' || elementKey === 'deposit' || elementKey === 'dockFee' || elementKey === 'nitroxUSD' || elementKey === 'photos' ? `U$${value}` : value;
			}
		});
	}

	switch (pageName) {
		case 'Bull Shark Diving':
			updateTourData('certifiedTours', 'bullShark');
			applyData();
			break;
		case 'Cozumel':
			updateTourData('certifiedTours', 'cozumel');
			applyData();
			break;
		case 'Night Diving':
			updateTourData('certifiedTours', 'nightDiving');
			applyData();
			musaDepth.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			manchonesDepth.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.maxDepth;
			mesoamericanDepth.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.maxDepth;
			wreckDepth.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.maxDepth;
			break;
		case 'Certified Divers':
			updateTourData('certifiedTours', 'certified');
			applyData();
			musaDepth.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			musaAvailability.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.available;
			manchonesDepth.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.maxDepth;
			manchonesAvailability.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.available;
			mesoamericanDepth.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.maxDepth;
			mesoamericanAvailability.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.available;
			wreckDepth.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.maxDepth;
			wreckAvailability.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.available;
			break;
		case 'Discover Scuba Diving':
			updateTourData('courses', 'dsd');
			applyData();
			break;
		case 'PADI Scuba Refresher':
			updateTourData('courses', 'refresher');
			applyData();
			musaDepth.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			musaAvailability.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.available;
			manchonesDepth.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.maxDepth;
			manchonesAvailability.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.available;
			mesoamericanDepth.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.maxDepth;
			mesoamericanAvailability.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.available;
			wreckDepth.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.maxDepth;
			wreckAvailability.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.available;
			break;
		case 'PADI Scuba Diver':
			updateTourData('courses', 'scubaDiver');
			applyData();
			musaDepth.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			manchonesDepth.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.maxDepth;
			break;
		case 'PADI Open Water Diver':
			updateTourData('courses', 'ow');
			applyData();
			break;
		case 'PADI Referral Program':
			updateTourData('courses', 'referral');
			applyData();
			break;
		case 'PADI Advanced Open Water':
			updateTourData('courses', 'aow');
			applyData();
			musaDepth.textContent = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			manchonesDepth.textContent = cthulhuTours.certifiedTours.manchones.bookingRequirements.maxDepth;
			mesoamericanDepth.textContent = cthulhuTours.certifiedTours.mesoamerican.bookingRequirements.maxDepth;
			wreckDepth.textContent = cthulhuTours.certifiedTours.wreck.bookingRequirements.maxDepth;
			break;
		case 'Cenote Angelita':
			updateTourData('cenotes', 'angelita');
			applyData();
			break;
		case 'Cenote Calavera':
			updateTourData('cenotes', 'calavera');
			applyData();
			break;
		case 'Cenote Carwash':
			updateTourData('cenotes', 'actunHa');
			applyData();
			break;
		case 'Cenote Chac Mool':
			updateTourData('cenotes', 'chacMool');
			applyData();
			break;
		case 'Cenote Dos Ojos':
			updateTourData('cenotes', 'dosOjos');
			applyData();
			break;
		case 'Cenote Tajma Ha':
			updateTourData('cenotes', 'tajmaHa');
			applyData();
			break;
		case 'Chichén Itzá':
			updateTourData('nonDiving', 'chichenItzaEarlyAdults');
			applyData();
			updateTourData('nonDiving', 'chichenItzaEarlyKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Chichén Itzá,':
			updateTourData('nonDiving', 'chichenItzaAdults');
			applyData();
			updateTourData('nonDiving', 'chichenItzaKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Columbus Dinner Cruise':
			const lobsterCardPrice = document.getElementById('lobsterCardPrice');
			const ribeyeCardPrice = document.getElementById('ribeyeCardPrice');
			const surfTurfCardPrice = document.getElementById('surfTurfCardPrice');
			const vegCardPrice = document.getElementById('vegCardPrice');
			updateTourData('nonDiving', 'columbusLobster');
			lobsterCardPrice.textContent = `U$${tourData.cardPrice}`;
			updateTourData('nonDiving', 'columbusSteak');
			ribeyeCardPrice.textContent = `U$${tourData.cardPrice}`;
			updateTourData('nonDiving', 'columbusSurfTurf');
			surfTurfCardPrice.textContent = `U$${tourData.cardPrice}`;
			updateTourData('nonDiving', 'columbusVeg');
			applyData();
			vegCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Musa &amp; Reef Snorkeling':
			updateTourData('snorkeling', 'musaSnorkel');
			applyData();
			break;
		case 'Turtle Snorkel Adventure':
			updateTourData('snorkeling', 'turtleSnorkel');
			applyData();
			let pickUpOptions = cthulhuTours.snorkeling.turtleSnorkel.transport.pickUpOptions;
			const pickUp1 = document.getElementById('pickUp1');
			const pickUp2 = document.getElementById('pickUp2');
			const pickUp3 = document.getElementById('pickUp3');
			const pickUp4 = document.getElementById('pickUp4');
			const pickUp5 = document.getElementById('pickUp5');
			pickUp1.textContent = pickUpOptions[0];
			pickUp2.textContent = pickUpOptions[1];
			pickUp3.textContent = pickUpOptions[2];
			pickUp4.textContent = pickUpOptions[3];
			pickUp5.textContent = pickUpOptions[4];
			break;
		case 'Whale Shark':
			updateTourData('snorkeling', 'whaleShark');
			applyData();
			break;
		case 'Xcaret':
			updateTourData('nonDiving', 'xcaretAdults');
			applyData();
			updateTourData('nonDiving', 'xcaretKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Xoximilco':
			updateTourData('nonDiving', 'xoximilcoAdults');
			applyData();
			updateTourData('nonDiving', 'xoximilcoKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Xplor':
			updateTourData('nonDiving', 'xplorAdults');
			applyData();
			updateTourData('nonDiving', 'xplorKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		case 'Xplor Fuego':
			updateTourData('nonDiving', 'xplorFuegoAdults');
			applyData();
			updateTourData('nonDiving', 'xplorFuegoKids');
			kidsCardPrice.textContent = `U$${tourData.cardPrice}`;
			break;
		default:
			console.log('Switch case not defined - no tour data found');
			break;
	}
};

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('#summary')) {
		populateLocations();
		populateTourSummary();
		document.querySelector('#locations').addEventListener('change', populateTourSummary);
	}
});
