// let selectedTour;
let tourData = {};

const createParagraph = (text = '') => {
	const p = document.createElement('p');
	if (text) p.innerHTML = text;
	return p;
};

const displayTourDataNecro = (tourData, pricelist, tour) => {
	const tourCashCostsTotal = document.getElementById('tour-cash-costs-total');
	const tourCashProfitTotal = document.getElementById('tour-cash-profit-total');
	const tourCardCostsTotal = document.getElementById('tour-card-costs-total');
	const tourCardProfitTotal = document.getElementById('tour-card-profit-total');

	tourBreakdownName.textContent = tourData.name;

	function appendTransportDetails(dayContainer, dayData, isAvailable) {
		const transportPhases = ['Pick Up', 'Arrival', 'Departure', 'Drop Off'];
		transportPhases.forEach((phase) => {
			const value = phase === 'Pick Up' || phase === 'Drop Off' ? (isAvailable ? dayData[`${phase.toLowerCase().replace(' ', '')}`] : 'Not Available') : dayData[`${phase.toLowerCase().replace(' ', '')}`];
			dayContainer.appendChild(createParagraph(`<span>${phase}:</span> ${value}`));
		});
	}

	// Transport - Day 1
	const day1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
	const isAvailableDay1 = hotelList[locations.value].sb805 !== 999;
	const day1Data = {
		pickup: tourData.pickUpDay1,
		arrival: tourData.arrivalDay1,
		departure: tourData.departureDay1,
		dropoff: tourData.dropOffDay1,
	};
	appendTransportDetails(day1Container, day1Data, isAvailableDay1);

	// Transport - Day 2
	if (tourData.pickUpDay2 !== undefined) {
		const day2Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[1];
		const isAvailableDay2 = hotelList[locations.value].sb805 !== 999;
		const day2Data = {
			pickup: tourData.pickUpDay2,
			arrival: tourData.arrivalDay2,
			departure: tourData.departureDay2,
			dropoff: tourData.dropOffDay2,
		};
		appendTransportDetails(day2Container, day2Data, isAvailableDay2);
	}

	// Cost per expense
	getCosts(pricelist, tour);

	// Booking Info
	tourRequirements.appendChild(createParagraph(`<span>Available:</span> ${tourData.available}`));
	tourRequirements.appendChild(createParagraph(`<span>Days:</span> ${tourData.days}`));
	tourRequirements.appendChild(createParagraph(`<span>Deposit:</span> U$${tourData.deposit}`));
	tourRequirements.appendChild(createParagraph(`<span>Max Depth:</span> ${tourData.maxDepth}`));
	tourRequirements.appendChild(createParagraph(`<span>Min Age:</span> ${tourData.minAge}`));
	tourRequirements.appendChild(createParagraph(`<span>Min No. of Clients:</span> ${tourData.minClients}`));
	tourRequirements.appendChild(createParagraph(`<span>Min Cert Lvl:</span> ${tourData.minCertLvl}`));

	// Cash Costs
	tourCashCosts.appendChild(createParagraph(`<span style="color: #aaa">Sub-Total: U$${tourData.subTotalUSD.toFixed(2)}</span>`));
	tourCashCosts.appendChild(createParagraph(`<span>PP Fees:</span> U$${tourData.cashPayPalFeeUSD.toFixed(2)}`));
	tourCashCosts.appendChild(createParagraph(`<span>Tax:</span> U$${tourData.cashTax.toFixed(2)}`));
	tourCashCostsTotal.appendChild(createParagraph(`<span>Total Cash Cost:</span> U$${tourData.cashCostsTotal.toFixed(2)}`));

	// Cash Profit
	tourCashProfit.appendChild(createParagraph(`<span>Min profit on sub-total:</span> ${tourData.profitPercent}%`));
	tourCashProfit.appendChild(createParagraph(`<span>Cash Price:</span> U$${tourData.cashPrice}`));
	tourCashProfitTotal.appendChild(createParagraph(`<span>Total Cash Profit:</span> U$${tourData.cashProfitTotal.toFixed(2)}`));

	// Card Costs
	tourCardCosts.appendChild(createParagraph(`<span>PP Fees:</span> U$${tourData.cardPayPalFeeUSD.toFixed(2)}`));
	tourCardCosts.appendChild(createParagraph(`<span>Tax:</span> U$${tourData.cardTax.toFixed(2)}`));
	tourCardCostsTotal.appendChild(createParagraph(`<span>Total Card Cost:</span> U$${tourData.cardCostsTotal.toFixed(2)}`));

	// Card Profit
	tourCardProfit.appendChild(createParagraph(`<span>Card Price:</span> U$${tourData.cardPrice}`));
	tourCardProfitTotal.appendChild(createParagraph(`<span>Total Card Profit:</span> U$${tourData.cardProfitTotal}`));

	// Extras
	if (cthulhuTours[pricelist][selectedTour].nitroxAllowed) {
		tourExtras.appendChild(createParagraph(`<span>Nitrox:</span> U$${tourData.nitroxUSD.toFixed(2)}`));
	}
	if (cthulhuTours[pricelist][selectedTour].photosAllowed) {
		tourExtras.appendChild(createParagraph(`<span>Photos:</span> U$${tourData.photos.toFixed(2)}`));
	}

	// Prep
	for (let i = 0; i < tourData.prep.length; i++) {
		const pPrep = createParagraph();
		pPrep.innerHTML = tourData.prep[i];
		tourPrep.appendChild(pPrep);
	}
};

const getTourInfo = (pricelist, selectedTour) => {
	getInvoicing(pricelist, selectedTour, cthulhuTours[pricelist][selectedTour].costs, cthulhuTours[pricelist][selectedTour].profitPercent, tourData);
	displayTourDataNecro(tourData, pricelist, selectedTour);
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
		option.value = `certifiedTours ${key}`;
		option.innerHTML = cthulhuTours.certifiedTours[key].name;
		necroTour.appendChild(option);
	}
	necroTour.appendChild(padiCourses);
	for (const key in cthulhuTours.courses) {
		const option = document.createElement('option');
		option.value = `courses ${key}`;
		option.innerHTML = cthulhuTours.courses[key].name;
		necroTour.appendChild(option);
	}
	necroTour.appendChild(cenoteDives);
	for (const key in cthulhuTours.cenotes) {
		const option = document.createElement('option');
		option.value = `cenotes ${key}`;
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
		option.value = `snorkeling ${key}`;
		option.innerHTML = cthulhuTours.snorkeling[key].name;
		necroTour.appendChild(option);
	}
};
populateNecroTours();

necroTour.addEventListener('change', function () {
	let necroTourValue = necroTour.value;
	let pricelist = necroTourValue.split(' ')[0];
	selectedTour = necroTourValue.split(' ')[1];
	const sections = [
		{ element: tourTransport, title: 'TRANSPORT' },
		{ element: tourRequirements, title: 'BOOKING INFO & REQ' },
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

	if (pricelist !== 'NA') {
		getTourInfo(pricelist, selectedTour);
		tourBreakdown.style.display = 'block';
	} else {
		tourBreakdown.style.display = 'none';
	}
});
