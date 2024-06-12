let selectedTour;
let tourData = {};

const displayTourDataNecro = (tourData) => {
	tourBreakdownName.textContent = tourData.name;

	// Transport - Day 1
	const day1 = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
	const pPickUpD1 = document.createElement('p');
	const pArrivalD1 = document.createElement('p');
	const pDepartureD1 = document.createElement('p');
	const pDropOffD1 = document.createElement('p');

	if (hotelList[locations.value].sb805 !== 999) {
		pPickUpD1.innerHTML = `<span>Pick Up:</span> ${tourData.pickUpD1}`;
		pDropOffD1.innerHTML = `<span>Drop Off:</span> ${tourData.dropOffD1}`;
	} else {
		pPickUpD1.innerHTML = `<span>Pick Up:</span> Not Available`;
		pDropOffD1.innerHTML = `<span>Pick Up:</span> Not Available`;
	}
	pArrivalD1.innerHTML = `<span>Arrival:</span> ${tourData.arrivalD1}`;
	pDepartureD1.innerHTML = `<span>Departure:</span> ${tourData.departureD1}`;

	day1.appendChild(pPickUpD1);
	day1.appendChild(pArrivalD1);
	day1.appendChild(pDepartureD1);
	day1.appendChild(pDropOffD1);

	// Transport - Day 2
	const day2 = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[1];

	if (tourData.pickUpD2 != undefined) {
		const pPickUpD2 = document.createElement('p');
		const pArrivalD2 = document.createElement('p');
		const pDepartureD2 = document.createElement('p');
		const pDropOffD2 = document.createElement('p');

		if (hotelList[locations.value].sb805 !== 999) {
			pPickUpD2.innerHTML = `<span>Pick Up:</span> ${tourData.pickUpD2}`;
			pDropOffD2.innerHTML = `<span>Drop Off:</span> ${tourData.dropOffD2}`;
		} else {
			pPickUpD2.innerHTML = `<span>Pick Up:</span> Not Available`;
			pDropOffD2.innerHTML = `<span>Pick Up:</span> Not Available`;
		}

		pArrivalD2.innerHTML = `<span>Arrival:</span> ${tourData.arrivalD2}`;
		pDepartureD2.innerHTML = `<span>Departure:</span> ${tourData.departureD2}`;

		day2.appendChild(pPickUpD2);
		day2.appendChild(pArrivalD2);
		day2.appendChild(pDepartureD2);
		day2.appendChild(pDropOffD2);
	}

	// Client Requirements
	const pDays = document.createElement('p');
	const pDeposit = document.createElement('p');
	const pMinAge = document.createElement('p');
	const pMinClients = document.createElement('p');
	const pCertLvl = document.createElement('p');

	pDays.innerHTML = `<span>Days:</span> ${tourData.days}`;
	pDeposit.innerHTML = `<span>Deposit:</span> U$${tourData.deposit}`;
	pMinAge.innerHTML = `<span>Min Age:</span> ${tourData.minAge}`;
	pMinClients.innerHTML = `<span>Min # of Clients:</span> ${tourData.minClients}`;
	pCertLvl.innerHTML = `<span>Min Cert Lvl:</span> ${tourData.certLvl}`;

	tourRequirements.appendChild(pDays);
	tourRequirements.appendChild(pDeposit);
	tourRequirements.appendChild(pMinAge);
	tourRequirements.appendChild(pMinClients);
	tourRequirements.appendChild(pCertLvl);

	// Cash Costs
	const pBoatCash = document.createElement('p');
	const pShuttleCash = document.createElement('p');
	const pGuideCash = document.createElement('p');
	const pELearningCash = document.createElement('p');
	const pEntranceFeeCash = document.createElement('p');
	const pFoodCash = document.createElement('p');
	const pTanksDiverCostCash = document.createElement('p');
	const pTanksGuideCostCash = document.createElement('p');
	const pSubTotal = document.createElement('p');
	const pPayPalFeeUSDCash = document.createElement('p');
	const pTaxCash = document.createElement('p');

	pBoatCash.innerHTML = `<span>Boat:</span> ${tourData.boat}mxn <em>(U$${tourData.boatUSD})</em>`;
	pShuttleCash.innerHTML = `<span>Shuttle:</span> ${tourData.shuttle}mxn <em>(U$${convertToUSD(tourData.shuttle, 2)})</em>`;
	pGuideCash.innerHTML = `<span>Guide:</span> ${tourData.guide}mxn <em>(U$${tourData.guideUSD})</em>`;
	pELearningCash.innerHTML = `<span>eLearning:</span> U$${tourData.elearning}`;
	pEntranceFeeCash.innerHTML = `<span>Entrance Fee:</span> ${tourData.entranceFee}mxn <em>(U$${convertToUSD(tourData.entranceFee, 2)})</em>`;
	pFoodCash.innerHTML = `<span>Food:</span> ${tourData.food}mxn <em>(U$${tourData.foodUSD})</em>`;
	pTanksDiverCostCash.innerHTML = `<span>Diver Tanks:</span> ${tourData.tanksDiverCost}mxn <em>(U$${tourData.tanksDiverCostUSD})</em>`;
	pTanksGuideCostCash.innerHTML = `<span>Guide Tanks:</span> ${tourData.tanksGuideCost}mxn <em>(U$${tourData.tanksGuideCostUSD})</em>`;
	pSubTotal.innerHTML = `<span style="color: #555">Sub-total: U$${tourData.subTotal.toFixed(2)}</span>`;
	pPayPalFeeUSDCash.innerHTML = `<span>PP Fees:</span> U$${tourData.cashPayPalFeeUSD}`;
	pTaxCash.innerHTML = `<span>Tax:</span> U$${tourData.cashTax.toFixed(2)}`;

	tourCashCosts.appendChild(pBoatCash);
	tourCashCosts.appendChild(pShuttleCash);
	tourCashCosts.appendChild(pGuideCash);
	tourCashCosts.appendChild(pELearningCash);
	tourCashCosts.appendChild(pEntranceFeeCash);
	tourCashCosts.appendChild(pFoodCash);
	tourCashCosts.appendChild(pTanksDiverCostCash);
	tourCashCosts.appendChild(pTanksGuideCostCash);
	tourCashCosts.appendChild(pSubTotal);
	tourCashCosts.appendChild(pPayPalFeeUSDCash);
	tourCashCosts.appendChild(pTaxCash);

	if (tourData.parking !== undefined) {
		const insertParkingCost = (parentElement, position) => {
			const pParking = document.createElement('p');
			const parkingCostMXN = `${tourData.parking}mxn`;
			const parkingCostUSD = `U$${convertToUSD(tourData.parking, 2)}`;
			pParking.innerHTML = `<span>Parking:</span> ${parkingCostMXN} (${parkingCostUSD})`;
			parentElement.insertBefore(pParking, parentElement.children[position]);
		};

		insertParkingCost(tourCashCosts, 4);
		insertParkingCost(tourCardCosts, 4);
	}

	// Cash Profit
	const pProfitPercent = document.createElement('p');
	const pPriceCash = document.createElement('p');

	pProfitPercent.innerHTML = `<span>Min profit on sub-total:</span> ${tourData.profitPercent}%`;
	pPriceCash.innerHTML = `<span>Cash Price:</span> U$${tourData.cashPrice}`;

	tourCashProfit.appendChild(pProfitPercent);
	tourCashProfit.appendChild(pPriceCash);

	// Card Costs
	const pBoatCard = document.createElement('p');
	const pShuttleCard = document.createElement('p');
	const pGuideCard = document.createElement('p');
	const pELearningCard = document.createElement('p');
	const pEntranceFeeCard = document.createElement('p');
	const pFoodCard = document.createElement('p');
	const pTanksDiverCostCard = document.createElement('p');
	const pTanksGuideCostCard = document.createElement('p');
	const pPayPalFeeUSDCard = document.createElement('p');
	const pTaxCard = document.createElement('p');

	pBoatCard.innerHTML = pBoatCash.innerHTML;
	pShuttleCard.innerHTML = pShuttleCash.innerHTML;
	pGuideCard.innerHTML = pGuideCash.innerHTML;
	pELearningCard.innerHTML = pELearningCash.innerHTML;
	pEntranceFeeCard.innerHTML = pEntranceFeeCash.innerHTML;
	pFoodCard.innerHTML = pFoodCash.innerHTML;
	pTanksDiverCostCard.innerHTML = pTanksDiverCostCash.innerHTML;
	pTanksGuideCostCard.innerHTML = pTanksGuideCostCash.innerHTML;
	pPayPalFeeUSDCard.innerHTML = `<span>PP Fees:</span> U$${tourData.cardPayPalFeeUSD}`;
	pTaxCard.innerHTML = `<span>Tax:</span> U$${tourData.cardTax.toFixed(2)}`;

	tourCardCosts.appendChild(pBoatCard);
	tourCardCosts.appendChild(pShuttleCard);
	tourCardCosts.appendChild(pGuideCard);
	tourCardCosts.appendChild(pELearningCard);
	tourCardCosts.appendChild(pEntranceFeeCard);
	tourCardCosts.appendChild(pFoodCard);
	tourCardCosts.appendChild(pTanksDiverCostCard);
	tourCardCosts.appendChild(pTanksGuideCostCard);
	tourCardCosts.appendChild(pPayPalFeeUSDCard);
	tourCardCosts.appendChild(pTaxCard);

	// Card Profit
	const pCardPrice = document.createElement('p');
	pCardPrice.innerHTML = `<span>Card Price:</span> U$${tourData.cardPrice}`;
	tourCardProfit.appendChild(pCardPrice);

	// Extras
	const pPhotos = document.createElement('p');
	pPhotos.innerHTML = `<span>Photos:</span> U$${tourData.photos}`;
	tourExtras.appendChild(pPhotos);

	// Nitrox
	if (tourData.nitroxCostMXN !== 0) {
		if (tourData.name !== 'PADI Enriched Air Diver') {
			const pNitroxCost = document.createElement('p');
			pNitroxCost.innerHTML = `<span>Nitrox:</span> U$${roundUp(tourData.nitroxCostUSD)}`;
			tourExtras.appendChild(pNitroxCost);
		} else {
			const pNitroxCard = document.createElement('p');
			const pNitroxCash = document.createElement('p');

			pNitroxCash.innerHTML = `<span>Nitrox:</span> ${tourData.nitroxCostMXN}mxn <em>(U$${tourData.nitroxCostUSD})</em>`;
			pNitroxCard.innerHTML = pNitroxCash.innerHTML;

			tourCashCosts.insertBefore(pNitroxCash, tourCashCosts.children[4]);
			tourCardCosts.insertBefore(pNitroxCard, tourCardCosts.children[4]);
		}
	}

	// Hide items with a cost of 0
	const options = {
		boat: { card: pBoatCard, cash: pBoatCash },
		elearning: { card: pELearningCard, cash: pELearningCash },
		entranceFee: { card: pEntranceFeeCard, cash: pEntranceFeeCash },
		food: { card: pFoodCard, cash: pFoodCash },
		shuttle: { card: pShuttleCard, cash: pShuttleCash },
		tanksDiverCost: { card: pTanksDiverCostCard, cash: pTanksDiverCostCash },
		tanksGuideCost: { card: pTanksGuideCostCard, cash: pTanksGuideCostCash },
	};

	Object.entries(tourData).forEach(([key, value]) => {
		if (value === 0 && options[key]) {
			options[key].card.style.display = 'none';
			options[key].cash.style.display = 'none';
		}
	});

	// Total Costs and Profits
	function createAndAppendCostProfitInfo(parentElement, label, value) {
		const pElement = document.createElement('p');
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
		const pPrep = document.createElement('p');
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
		certLvl: list[tour].certLvl,
		elearning: list[tour].elearning,
		entranceFee: list[tour].entranceFee,
		food: list[tour].food,
		guide: list[tour].guide,
		minAge: list[tour].minAge,
		minClients: list[tour].minClients,
		nitroxAllowed: list[tour].nitroxAllowed,
		nitroxCostMXN: getNitroxCost(list, tour).nitroxMXN,
		nitroxCostUSD: getNitroxCost(list, tour).nitroxUSD,
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
	}

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
	for (const key in cthulhuTours.certifiedTours) {
		if (key === 'certified') {
			continue;
		}
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = cthulhuTours.certifiedTours[key].name;
		necroTour.appendChild(option);
	}
	for (const key in cthulhuTours.courses) {
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = cthulhuTours.courses[key].name;
		necroTour.appendChild(option);
	}
	for (const key in cthulhuTours.cenotes) {
		const option = document.createElement('option');
		option.value = key;
		if (cthulhuTours.cenotes[key].aka === 'Little Angel' || cthulhuTours.cenotes[key].aka === 'Two Eyes' || cthulhuTours.cenotes[key].aka === 'Jaguar' || cthulhuTours.cenotes[key].aka === 'The Blue Abyss' || cthulhuTours.cenotes[key].aka === 'Taj Mahal') {
			option.innerHTML = cthulhuTours.cenotes[key].name;
		} else {
			option.innerHTML = cthulhuTours.cenotes[key].aka;
		}
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
		let tourType = [cthulhuTours.courses, cthulhuTours.certifiedTours, cthulhuTours.cenotes];
		tourType.forEach((type) => {
			if (type[selectedTour] !== undefined) {
				getTourInfo(type, selectedTour);
			}
		});
	}
});
