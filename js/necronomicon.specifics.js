let selectedTour;
let tourData = {};

const createParagraph = (text = '') => {
	const p = document.createElement('p');
	if (text) p.innerHTML = text;
	return p;
};

const displayTourDataNecro = (tourData) => {
	tourBreakdownName.textContent = tourData.name;

	// Transport - Day 1
	const day1 = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
	const pickUpD1P = createParagraph(`<span>Pick Up:</span> Not Available`);
	const arrivalD1P = createParagraph(`<span>Arrival:</span> ${tourData.arrivalD1}`);
	const departureD1P = createParagraph(`<span>Departure:</span> ${tourData.departureD1}`);
	const dropOffD1P = createParagraph(`<span>Pick Up:</span> Not Available`);

	if (hotelList[locations.value].sb805 !== 999) {
		pickUpD1P.innerHTML = `<span>Pick Up:</span> ${tourData.pickUpD1}`;
		dropOffD1P.innerHTML = `<span>Drop Off:</span> ${tourData.dropOffD1}`;
	}

	day1.appendChild(pickUpD1P);
	day1.appendChild(arrivalD1P);
	day1.appendChild(departureD1P);
	day1.appendChild(dropOffD1P);

	// Transport - Day 2
	const day2 = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[1];

	if (tourData.pickUpD2 !== undefined) {
		const pickUpD2P = createParagraph(`<span>Pick Up:</span> Not Available`);
		const arrivalD2P = createParagraph(`<span>Arrival:</span> ${tourData.arrivalD2}`);
		const departureD2P = createParagraph(`<span>Departure:</span> ${tourData.departureD2}`);
		const dropOffD2P = createParagraph(`<span>Pick Up:</span> Not Available`);

		if (hotelList[locations.value].sb805 !== 999) {
			pickUpD2P.innerHTML = `<span>Pick Up:</span> ${tourData.pickUpD2}`;
			dropOffD2P.innerHTML = `<span>Drop Off:</span> ${tourData.dropOffD2}`;
		}

		day2.appendChild(pickUpD2P);
		day2.appendChild(arrivalD2P);
		day2.appendChild(departureD2P);
		day2.appendChild(dropOffD2P);
	}

	// Client Requirements
	const daysP = createParagraph(`<span>Days:</span> ${tourData.days}`);
	const depositP = createParagraph(`<span>Deposit:</span> U$${tourData.deposit}`);
	const minAgeP = createParagraph(`<span>Min Age:</span> ${tourData.minAge}`);
	const minClientsP = createParagraph(`<span>Min # of Clients:</span> ${tourData.minClients}`);
	const minCertLvlP = createParagraph(`<span>Min Cert Lvl:</span> ${tourData.minCertLvl}`);

	tourRequirements.appendChild(daysP);
	tourRequirements.appendChild(depositP);
	tourRequirements.appendChild(minAgeP);
	tourRequirements.appendChild(minClientsP);
	tourRequirements.appendChild(minCertLvlP);

	// Cash Costs
	const boatCashP = createParagraph(`<span>Boat:</span> ${tourData.boat}mxn <em>(U$${tourData.boatUSD})</em>`);
	const shuttleCashP = createParagraph(`<span>Shuttle:</span> ${tourData.shuttle}mxn <em>(U$${convertToUSD(tourData.shuttle, 2)})</em>`);
	const guideCashP = createParagraph(`<span>Guide:</span> ${tourData.guide}mxn <em>(U$${tourData.guideUSD})</em>`);
	const eLearningCashP = createParagraph(`<span>eLearning:</span> U$${tourData.elearning}`);
	const entranceFeeCashP = createParagraph(`<span>Entrance Fee:</span> ${tourData.entranceFee}mxn <em>(U$${convertToUSD(tourData.entranceFee, 2)})</em>`);
	const foodCashP = createParagraph(`<span>Food:</span> ${tourData.food}mxn <em>(U$${tourData.foodUSD})</em>`);
	const tanksDiverCostCashP = createParagraph(`<span>Diver Tanks:</span> ${tourData.tanksDiverCost}mxn <em>(U$${tourData.tanksDiverCostUSD})</em>`);
	const tanksGuideCostCashP = createParagraph(`<span>Guide Tanks:</span> ${tourData.tanksGuideCost}mxn <em>(U$${tourData.tanksGuideCostUSD})</em>`);
	const parkingCashP = createParagraph(`<span>Parking:</span> ${tourData.parking}mxn (U$${convertToUSD(tourData.parking, 2)})`);
	const subTotalP = createParagraph(`<span style="color: #555">Sub-total: U$${tourData.subTotal.toFixed(2)}</span>`);
	const payPalFeeUSDCashP = createParagraph(`<span>PP Fees:</span> U$${tourData.cashPayPalFeeUSD}`);
	const taxCashP = createParagraph(`<span>Tax:</span> U$${tourData.cashTax.toFixed(2)}`);

	tourCashCosts.appendChild(boatCashP);
	tourCashCosts.appendChild(shuttleCashP);
	tourCashCosts.appendChild(guideCashP);
	tourCashCosts.appendChild(eLearningCashP);
	tourCashCosts.appendChild(entranceFeeCashP);
	tourCashCosts.appendChild(foodCashP);
	tourCashCosts.appendChild(tanksDiverCostCashP);
	tourCashCosts.appendChild(tanksGuideCostCashP);
	tourCashCosts.appendChild(parkingCashP);
	tourCashCosts.appendChild(subTotalP);
	tourCashCosts.appendChild(payPalFeeUSDCashP);
	tourCashCosts.appendChild(taxCashP);

	// Cash Profit
	const profitPercentP = createParagraph(`<span>Min profit on sub-total:</span> ${tourData.profitPercent}%`);
	const priceCashP = createParagraph(`<span>Cash Price:</span> U$${tourData.cashPrice}`);
	tourCashProfit.appendChild(profitPercentP);
	tourCashProfit.appendChild(priceCashP);

	// Card Costs
	const boatCardP = createParagraph(`${boatCashP.innerHTML}`);
	const shuttleCardP = createParagraph(`${shuttleCashP.innerHTML}`);
	const guideCardP = createParagraph(`${guideCashP.innerHTML}`);
	const eLearningCardP = createParagraph(`${eLearningCashP.innerHTML}`);
	const entranceFeeCardP = createParagraph(`${entranceFeeCashP.innerHTML}`);
	const foodCardP = createParagraph(`${foodCashP.innerHTML}`);
	const tanksDiverCostCardP = createParagraph(`${tanksDiverCostCashP.innerHTML}`);
	const tanksGuideCostCardP = createParagraph(`${tanksGuideCostCashP.innerHTML}`);
	const parkingCardP = createParagraph(`${parkingCashP.innerHTML}`);
	const payPalFeeUSDCardP = createParagraph(`<span>PP Fees:</span> U$${tourData.cardPayPalFeeUSD}`);
	const taxCardP = createParagraph(`<span>Tax:</span> U$${tourData.cardTax.toFixed(2)}`);

	tourCardCosts.appendChild(boatCardP);
	tourCardCosts.appendChild(shuttleCardP);
	tourCardCosts.appendChild(guideCardP);
	tourCardCosts.appendChild(eLearningCardP);
	tourCardCosts.appendChild(entranceFeeCardP);
	tourCardCosts.appendChild(foodCardP);
	tourCardCosts.appendChild(tanksDiverCostCardP);
	tourCardCosts.appendChild(tanksGuideCostCardP);
	tourCardCosts.appendChild(payPalFeeUSDCardP);
	tourCardCosts.appendChild(taxCardP);

	// Card Profit
	const priceCardP = createParagraph(`<span>Card Price:</span> U$${tourData.cardPrice}`);
	tourCardProfit.appendChild(priceCardP);

	// Extras
	const photosP = createParagraph(`<span>Photos:</span> U$${tourData.photos}`);
	tourExtras.appendChild(photosP);

	// Nitrox
	if (tourData.nitroxCostMXN !== 0) {
		if (tourData.name !== 'PADI Enriched Air Diver') {
			const nitroxCostP = createParagraph(`<span>Nitrox:</span> U$${roundUp(tourData.nitroxCostUSD)}`);
			tourExtras.appendChild(nitroxCostP);
		} else {
			const nitroxCardP = createParagraph(`<span>Nitrox:</span> ${tourData.nitroxCostMXN}mxn <em>(U$${tourData.nitroxCostUSD})</em>`);
			const nitroxCashP = createParagraph(`<span>Nitrox:</span> ${tourData.nitroxCostMXN}mxn <em>(U$${tourData.nitroxCostUSD})</em>`);
			tourCashCosts.insertBefore(nitroxCashP, tourCashCosts.children[4]);
			tourCardCosts.insertBefore(nitroxCardP, tourCardCosts.children[4]);
		}
	}

	// Hide items with a cost of 0
	const options = {
		boat: { card: boatCardP, cash: boatCashP },
		elearning: { card: eLearningCardP, cash: eLearningCashP },
		entranceFee: { card: entranceFeeCardP, cash: entranceFeeCashP },
		food: { card: foodCardP, cash: foodCashP },
		guide: { card: guideCardP, cash: guideCashP },
		parking: { card: parkingCardP, cash: parkingCashP },
		shuttle: { card: shuttleCardP, cash: shuttleCashP },
		tanksDiverCost: { card: tanksDiverCostCardP, cash: tanksDiverCostCashP },
		tanksGuideCost: { card: tanksGuideCostCardP, cash: tanksGuideCostCashP },
	};

	Object.entries(tourData).forEach(([key, value]) => {
		if (value === 0 && options[key]) {
			options[key].card.style.display = 'none';
			options[key].cash.style.display = 'none';
		}
	});

	// Total Costs and Profits
	function createAndAppendCostProfitInfo(parentElement, label, value) {
		const pElement = createParagraph();
		const spanElement = document.createElement('span');
		spanElement.textContent = label;
		pElement.appendChild(spanElement);
		pElement.appendChild(document.createTextNode(` U$${value}`));
		parentElement.appendChild(pElement);
	}

	createAndAppendCostProfitInfo(tourCashCostsTotal, 'Total Cash Cost:', tourData.cashCost);
	createAndAppendCostProfitInfo(tourCashProfitTotal, 'Total Cash Profit:', tourData.cashProfit);
	createAndAppendCostProfitInfo(tourCardCostsTotal, 'Total Card Cost:', tourData.cardCost);
	createAndAppendCostProfitInfo(tourCardProfitTotal, 'Total Card Profit:', tourData.cardProfit);

	// Prep
	for (let i = 0; i < tourData.prep.length; i++) {
		const pPrep = createParagraph();
		pPrep.innerHTML = tourData.prep[i];
		tourPrep.appendChild(pPrep);
	}
};

const getTourInfo = (list, tour) => {
	let tourData = {
		name: list[tour].name,
		aka: list[tour].aka,
		arrivalD1: list[tour].arrivalD1,
		departureD1: list[tour].departureD1,
		pickUpD1: getPickUp(list, tour, 1),
		days: list[tour].days,
		deposit: getDeposit(list, tour),
		dropOffD1: getDropOff(list, tour, 1),
		minCertLvl: list[tour].minCertLvl,
		elearning: list[tour].elearning,
		entranceFee: list[tour].entranceFee,
		food: list[tour].food,
		guide: list[tour].guide,
		minAge: list[tour].minAge,
		minClients: list[tour].minClients,
		nitroxAllowed: list[tour].nitroxAllowed,
		parking: list[tour].parking,
		photosAllowed: list[tour].photosAllowed,
		profitPercent: list[tour].profitPercent,
		prep: list[tour].prep,
		tanks: list[tour].tanks,
	};

	tourData.boat = list[tour].boat * tourData.days;
	tourData.boatUSD = convertToUSD(tourData.boat, 2);
	tourData.shuttle = list[tour].shuttle / tourData.minClients;
	tourData.guideUSD = convertToUSD(tourData.guide, 2);
	tourData.photos = cthulhuTours.extras.photos * tourData.days;
	tourData.foodUSD = convertToUSD(tourData.food, 2);
	tourData.tanksDiverCost = list[tour].tanksDiverCost * tourData.tanks;
	tourData.tanksDiverCostUSD = convertToUSD(tourData.tanksDiverCost, 2);
	tourData.tanksGuideCost = list[tour].tanksGuideCost / tourData.minClients;
	tourData.tanksGuideCostUSD = convertToUSD(tourData.tanksGuideCost, 2);

	if (tourData.nitroxAllowed === false) {
		tourData.nitroxCostMXN = 0;
		tourData.nitroxCostUSD = 0;
	} else {
		tourData.nitroxCostMXN = getNitroxCost(list, tour).nitroxMXN;
		tourData.nitroxCostUSD = getNitroxCost(list, tour).nitroxUSD;
	}

	// if (tourData.parking === undefined) {
	// 	tourData.parking = 0;
	// }

	tourData.subTotal = getCashSubTotal(list, tour);
	tourData.cashPrice = roundUp(tourData.subTotal * list[tour].profitPercent);

	let depositDetails = getPayPal(tourData.deposit);

	tourData.cashPayPalFeeUSD = depositDetails.invoiceFee;
	tourData.cashTax = depositDetails.taxes;
	tourData.cashCost = round2Dec(tourData.subTotal + tourData.cashPayPalFeeUSD + tourData.cashTax);
	tourData.cashProfit = round2Dec(tourData.cashPrice - tourData.cashCost);
	tourData.cardPrice = Number(roundUp(tourData.cashPrice * 1.16));
	let cardDetails = getPayPal(tourData.cardPrice);
	tourData.cardPayPalFeeUSD = cardDetails.invoiceFee;
	tourData.cardTax = cardDetails.taxes;
	tourData.cardCost = round2Dec(tourData.subTotal + tourData.cardPayPalFeeUSD + tourData.cardTax);
	tourData.cardProfit = round2Dec(tourData.cardPrice - tourData.cardCost);

	if (list[tour].arrivalD2 !== undefined) {
		tourData.arrivalD2 = list[tour].arrivalD2;
		tourData.departureD2 = list[tour].departureD2;
		tourData.pickUpD2 = getPickUp(list, tour, 2);
		tourData.dropOffD2 = getDropOff(list, tour, 2);
	}
	displayTourDataNecro(tourData);
};

const populateNecroTours = () => {
	function createOptionElement(text) {
		const option = document.createElement('option');
		option.value = 'NA';
		option.innerHTML = `--- ${text} ---`;
		option.style.fontWeight = 'bold';
		option.style.backgroundColor = '#ddd';
		return option;
	}

	const oceanDives = createOptionElement('Ocean Dives');
	const padiCourses = createOptionElement('Courses');
	const cenoteDives = createOptionElement('Cenote Dives');
	const snorkeling = createOptionElement('Snorkeling');

	const cenoteOptions = [];

	necroTour.appendChild(oceanDives);
	for (const key in cthulhuTours.certifiedTours) {
		if (key === 'certified') {
			continue;
		}
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = cthulhuTours.certifiedTours[key].name;
		necroTour.appendChild(option);
	}
	necroTour.appendChild(padiCourses);
	for (const key in cthulhuTours.courses) {
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = cthulhuTours.courses[key].name;
		necroTour.appendChild(option);
	}
	necroTour.appendChild(cenoteDives);
	for (const key in cthulhuTours.cenotes) {
		const option = document.createElement('option');
		option.value = key;
		if (cthulhuTours.cenotes[key].aka === 'Little Angel' || cthulhuTours.cenotes[key].aka === 'Two Eyes' || cthulhuTours.cenotes[key].aka === 'Jaguar' || cthulhuTours.cenotes[key].aka === 'The Blue Abyss' || cthulhuTours.cenotes[key].aka === 'Taj Mahal') {
			option.innerHTML = `${cthulhuTours.cenotes[key].name} (${cthulhuTours.cenotes[key].aka})`;
		} else {
			option.innerHTML = `${cthulhuTours.cenotes[key].aka} (${cthulhuTours.cenotes[key].name})`;
		}
		cenoteOptions.push(option);
	}
	cenoteOptions.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
	cenoteOptions.forEach((option) => necroTour.appendChild(option));
	necroTour.appendChild(snorkeling);
	for (const key in cthulhuTours.snorkeling) {
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = cthulhuTours.snorkeling[key].name;
		necroTour.appendChild(option);
	}
};
populateNecroTours();

necroTour.addEventListener('change', function () {
	selectedTour = necroTour.value;
	const sections = [
		{ element: tourTransport, title: 'TRANSPORT' },
		{ element: tourRequirements, title: 'CLIENT REQUIREMENTS' },
		{ element: tourCardCosts, title: 'CARD COSTS' },
		{ element: tourCardProfit, title: 'CARD PROFIT' },
		{ element: tourCashCosts, title: 'CASH COSTS' },
		{ element: tourCashProfit, title: 'CASH PROFIT' },
		{ element: tourExtras, title: 'EXTRAS' },
		{ element: tourPrep, title: 'PREP' },
	];

	sections.forEach(({ element, title }) => {
		element.innerHTML = `<h4>${title}</h4>`;
		if (title === 'TRANSPORT') {
			element.innerHTML = `<h4>${title}</h4><div class="d-flex justify-content-between"><div></div><div></div></div>`;
		}
	});

	// Reset totals
	tourCardCostsTotal.innerHTML = '';
	tourCardProfitTotal.innerHTML = '';
	tourCashCostsTotal.innerHTML = '';
	tourCashProfitTotal.innerHTML = '';

	tourBreakdown.style.display = selectedTour !== 'NA' ? 'block' : 'none';
	if (selectedTour !== 'NA') {
		let tourType = [cthulhuTours.courses, cthulhuTours.certifiedTours, cthulhuTours.cenotes, cthulhuTours.snorkeling];
		tourType.forEach((type) => {
			if (type[selectedTour] !== undefined) {
				getTourInfo(type, selectedTour);
			}
		});
	}
});
