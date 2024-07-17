const createParagraph = (text = '', paste) => {
	const p = document.createElement('p');
	if (text) p.innerHTML = text;
	paste.appendChild(p);
};

const displayTourData = (pricelist, tour) => {
	const tourCashCostsTotal = document.getElementById('tour-cash-costs-total');
	const tourCashProfitTotal = document.getElementById('tour-cash-profit-total');
	const tourCardCostsTotal = document.getElementById('tour-card-costs-total');
	const tourCardProfitTotal = document.getElementById('tour-card-profit-total');

	tourPriceName.textContent = tourData.name;

	if (tour === 'columbusLobster' || tour === 'columbusSteak' || tour === 'columbusSurfTurf' || tour === 'columbusVeg') {
		let transportMsg = document.createElement('div');
		transportMsg.classList.add('note');
		createParagraph(
			`<h5>Note:</h5> Cthulhu Divers no longer includes transport for this tour. Offer to either contact <strong>Cancuna Matata Transfers</strong> on their behalf <strong> or </strong> give them the Cancuna Mata Transfers phone number. This means that the <strong>pick up</strong> and <strong>departure</strong> times are our suggestion for the times they should arrange for transport with their chosen taxi service.`,
			transportMsg
		);
		tourTransport.appendChild(transportMsg);
	}

	// Transport
	const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];

	// Day 1
	if (locations.value === 'notApplicable') {
		alert('Please select a hotel');
	} else {
		if (tourData.pickUp1 !== undefined) {
			if (pricelist !== 'cenotes' && tour !== 'xcaretAdults' && tour !== 'xcaretKids' && tour !== 'xoximilcoAdults' && tour !== 'xoximilcoKids' && tour !== 'xplorAdults' && tour !== 'xplorKids' && tour !== 'xplorFuegoAdults' && tour !== 'xplorFuegoKids') {
				if (hotelList[locations.value].sb805 !== 999) {
					createParagraph(`<span>Pick Up:</span> ${tourData.pickUp1}`, pickUp1Container);
					createParagraph(`<span>Arrival:</span> ${tourData.arrival1}`, pickUp1Container);
					createParagraph(`<span>Departure:</span> ${tourData.departure1}`, pickUp1Container);
					createParagraph(`<span>Drop off:</span> ${tourData.dropOff1}`, pickUp1Container);
				} else {
					createParagraph(`<span>Pick Up:</span> NA`, pickUp1Container);
					createParagraph(`<span>Arrival:</span> ${tourData.arrival1}`, pickUp1Container);
					createParagraph(`<span>Departure:</span> ${tourData.departure1}`, pickUp1Container);
					createParagraph(`<span>Drop off:</span> NA`, pickUp1Container);
				}
			} else {
				createParagraph(`<span>Pick Up:</span> ${tourData.pickUp1}`, pickUp1Container);
				createParagraph(`<span>Drop off:</span> ${tourData.dropOff1}`, pickUp1Container);
			}
		}

		if (tourData.pickUp2 !== undefined) {
			const pickUp2Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[1];
			if (pricelist !== 'cenotes') {
				if (hotelList[locations.value].sb805 !== 999) {
					createParagraph(`<span>Pick Up:</span> ${tourData.pickUp2}`, pickUp2Container);
					createParagraph(`<span>Arrival:</span> ${tourData.arrival2}`, pickUp2Container);
					createParagraph(`<span>Departure:</span> ${tourData.departure2}`, pickUp2Container);
					createParagraph(`<span>Drop off:</span> ${tourData.dropOff2}`, pickUp2Container);
				} else {
					createParagraph(`<span>Pick Up:</span> NA`, pickUp2Container);
					createParagraph(`<span>Arrival:</span> ${tourData.arrival2}`, pickUp2Container);
					createParagraph(`<span>Departure:</span> ${tourData.departure2}`, pickUp2Container);
					createParagraph(`<span>Drop off:</span> NA`, pickUp2Container);
				}
			}
		}

		// Booking Info
		const tourDataProperties = [
			{ key: 'available', label: 'Available' },
			{ key: 'cameraDSLR', label: 'Client DSLR' },
			{ key: 'cameraGoPro', label: 'Client GoPro' },
			{ key: 'days', label: 'Days' },
			{ key: 'deposit', label: 'Deposit', format: (value) => `U$${tourData.deposit} <em>U$${tourData.deposit / pax}pp</em>` },
			{ key: 'dockFee', label: 'Dock Fee', format: (value) => `U$${value} <em>U$${value / pax}pp - Cash</em>` },
			{ key: 'maxDepth', label: 'Max Depth' },
			{ key: 'minAge', label: 'Min Age' },
			{ key: 'minClients', label: 'Min No. of Clients' },
			{ key: 'minCertLvl', label: 'Min Cert Lvl' },
			{ key: 'tanks', label: 'Tanks' },
		];

		tourDataProperties.forEach(({ key, label, format }) => {
			if (tourData[key]) {
				const value = format ? format(tourData[key]) : tourData[key];

				if (key === 'minClients' && tourData[key] > pax) {
					createParagraph(`<span style="background-color: red; color: #fff;"><span>${label}:</span> ${value}</span>`, tourRequirements);
				} else {
					createParagraph(`<span>${label}:</span> ${value}`, tourRequirements);
				}
			}
		});

		// Cost per expense
		if (!isNaN(tourData.boat)) {
			createParagraph(`<span>Boat:</span> U$${tourData.boat.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.boat.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Boat:</span> U$${tourData.boat.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.boat.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.elearning)) {
			createParagraph(`<span>Elearning:</span> U$${tourData.elearning.toFixed(2)}`, tourCashCosts);
			createParagraph(`<span>Elearning:</span> U$${tourData.elearning.toFixed(2)}`, tourCardCosts);
		}
		if (!isNaN(tourData.entrance)) {
			createParagraph(`<span>Entrance:</span> U$${tourData.entrance.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.entrance.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Entrance:</span> U$${tourData.entrance.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.entrance.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.food)) {
			createParagraph(`<span>Food:</span> U$${tourData.food.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.food.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Food:</span> U$${tourData.food.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.food.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.guide)) {
			createParagraph(`<span>Guide:</span> U$${tourData.guide.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.guide.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Guide:</span> U$${tourData.guide.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.guide.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.parking)) {
			createParagraph(`<span>Parking:</span> U$${tourData.parking.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.parking.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Parking:</span> U$${tourData.parking.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.parking.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.shuttle)) {
			createParagraph(`<span>Shuttle:</span> U$${tourData.shuttle.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.shuttle.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Shuttle:</span> U$${tourData.shuttle.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.shuttle.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.tanksDiverCost)) {
			createParagraph(`<span>Tanks Diver Cost:</span> U$${tourData.tanksDiverCost.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.tanksDiverCost.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Tanks Diver Cost:</span> U$${tourData.tanksDiverCost.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.tanksDiverCost.toFixed()}mxn)</em>`, tourCardCosts);
		}
		if (!isNaN(tourData.tanksGuideCost)) {
			createParagraph(`<span>Tanks Guide Cost:</span> U$${tourData.tanksGuideCost.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.tanksGuideCost.toFixed()}mxn)</em>`, tourCashCosts);
			createParagraph(`<span>Tanks Guide Cost:</span> U$${tourData.tanksGuideCost.toFixed(2)} <em>(${cthulhuTours[pricelist][selectedTour].costs.tanksGuideCost.toFixed()}mxn)</em>`, tourCardCosts);
		}

		// Cash Costs
		createParagraph(`<span style="color: #aaa">Sub-Total: U$${tourData.subTotalUSD.toFixed(2)}</span>`, tourCashCosts);
		createParagraph(`<span>PP Fees:</span> U$${tourData.cashPayPalFeeUSD.toFixed(2)} <em>on deposit<em>`, tourCashCosts);
		createParagraph(`<span>Tax:</span> U$${tourData.cashTax.toFixed(2)} <em>on deposit<em>`, tourCashCosts);
		createParagraph(`<span>Total Cash Cost:</span> U$${tourData.cashCostsTotal.toFixed(2)} <em>U$${(tourData.cashCostsTotal / pax).toFixed(2)}pp`, tourCashCostsTotal);

		// // Cash Profit
		createParagraph(`<span>Min profit on sub-total:</span> ${tourData.profitPercent}%`, tourCashProfit);
		createParagraph(`<span>Cash Price:</span> U$${tourData.cashPrice4One * pax} <em>U$${tourData.cashPrice4One}pp</em>`, tourCashProfit);

		// if (tourData.cashProfitTotal < 0) {
		// 	tourCashCosts.innerHTML = `<h4>CASH COST:</h4> <p>No cash discount</p>`;
		// 	tourCashCostsTotal.innerHTML = '';
		// 	tourCashProfit.innerHTML = `<h4>CASH PROFIT:</h4> <p>No cash discount</p>`;
		// 	tourCashProfitTotal.innerHTML = '';
		// }

		createParagraph(`<span>Total Cash Profit:</span> U$${tourData.cashProfitTotal.toFixed(2)} <em>U$${(tourData.cashProfitTotal / pax).toFixed(2)}pp</em>`, tourCashProfitTotal);

		if (tour === 'xcaretAdults' || tour === 'xcaretKids' || tour === 'xoximilcoAdults' || tour === 'xoximilcoKids' || tour === 'xplorAdults' || tour === 'xplorKids' || tour === 'xplorFuegoAdults' || tour === 'xplorFuegoKids') {
			let parkMsg = document.createElement('div');
			parkMsg.classList.add('note');
			createParagraph(`<h5>Note:</h5> Kids from 0 - 4 go free. 5 - 11 get kids rates.`, parkMsg);
			tourRequirements.appendChild(parkMsg);
		}

		// // Card Costs
		createParagraph(`<span style="color: #aaa">Sub-Total: U$${tourData.subTotalUSD.toFixed(2)}</span>`, tourCardCosts);
		createParagraph(`<span>PP Fees:</span> U$${tourData.cardPayPalFeeUSD.toFixed(2)} <em>on card price</em>`, tourCardCosts);
		createParagraph(`<span>Tax:</span> U$${tourData.cardTax.toFixed(2)} <em>on card price</em>`, tourCardCosts);
		createParagraph(`<span>Total Card Cost:</span> U$${tourData.cardCostsTotal.toFixed(2)} <em>U$${(tourData.cardCostsTotal / pax).toFixed(2)}pp</em>`, tourCardCostsTotal);

		// // Card Profit
		createParagraph(`<span>Card Price:</span> U$${tourData.cardPrice} <em>U$${tourData.cardPrice / pax}pp`, tourCardProfit);
		createParagraph(`<span>Total Card Profit:</span> U$${tourData.cardProfitTotal.toFixed(2)} <em>U$${(tourData.cardProfitTotal / pax).toFixed(2)}pp</em>`, tourCardProfitTotal);

		// Extras
		if (cthulhuTours[pricelist][selectedTour].nitroxAllowed) {
			createParagraph(`<span>Nitrox:</span> U$${tourData.nitroxUSD * pax} <em>U$${tourData.nitroxUSD}pp</em>`, tourExtras);
		}
		if (cthulhuTours[pricelist][selectedTour].photosAllowed) {
			createParagraph(`<span>Photos:</span> U$${tourData.photos * pax} <em>U$${tourData.photos}pp</em>`, tourExtras);
		}

		// Prep
		for (let i = 0; i < tourData.prep.length; i++) {
			const pPrep = createParagraph(tourData.prep[i], tourPrep);
		}
	}
};

const displayTourSheet = (paxNo) => {
	let tourPriceSelectValue = tourPriceSelect.value;
	let pricelist = tourPriceSelectValue.split(' ')[0];
	selectedTour = tourPriceSelectValue.split(' ')[1];
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
		updateTourData(pricelist, selectedTour, paxNo);
		displayTourData(pricelist, selectedTour);
		tourPriceSheet.style.display = 'block';
	} else {
		tourPriceSheet.style.display = 'none';
		tourPriceName.innerHTML = '<h3> </h3>';
	}
};

locations.addEventListener('change', function () {
	displayTourSheet(tourPricePax.value);
});
tourPriceSelect.addEventListener('change', function () {
	displayTourSheet(tourPricePax.value);
});
tourPricePax.addEventListener('change', function () {
	displayTourSheet(tourPricePax.value);
});
