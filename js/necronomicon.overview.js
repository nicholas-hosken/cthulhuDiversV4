const createHeaderRow = (header) => {
	rowCount = header.rows.length;
	if (rowCount < 5) {
		let row = document.createElement('tr');
		row.style.textAlign = 'center';

		row.innerHTML = `
            <th>Tour</th>
            <th>Cost</th>
            <th>Deposit</th>
            <th>Cash Price</th>
            <th>Cash PP Fees</th>
            <th>Cash VAT</th>
            <th>Cash Profit</th>
            <th>Card Price</th>
            <th>Card PP Fees</th>
            <th>Card VAT</th>
            <th>Card Profit</th>
        `;
		header.appendChild(row);
	}
};

const populateCoursesTable = () => {
	const courseHeader = document.querySelector('#courseTable thead');
	const courseTable = document.querySelector('#courseTable tbody');

	// Clear the table before populating it
	courseTable.innerHTML = '';

	createHeaderRow(courseHeader);

	// showTourinfo('dsd');

	// for (let key in coursePricing) {
	// 	if (key == 'extras' || key == 'calcCost') {
	// 		continue;
	// 	} else {
	// 		createTableRow(courseTable, key);
	// 		tourName = document.querySelector(`#${key}Name`);
	// 		tourCost = document.querySelector(`#${key}Cost`);
	// 		tourDeposit = document.querySelector(`#${key}Deposit`);
	// 		tourCash = document.querySelector(`#${key}Cash`);
	// 		tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
	// 		tourCashVat = document.querySelector(`#${key}CashVat`);
	// 		tourCashProfit = document.querySelector(`#${key}CashProfit`);
	// 		tourCard = document.querySelector(`#${key}Card`);
	// 		tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
	// 		tourCardVat = document.querySelector(`#${key}CardVat`);
	// 		tourCardProfit = document.querySelector(`#${key}CardProfit`);

	// 		cost = coursePricing[key].cost.toFixed(2);
	// 		deposit = coursePricing[key].deposit;
	// 		cash = roundUp(cost * coursePricing[key].profitPercent);
	// 		cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
	// 		cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
	// 		card = roundUp(cash * 1.16);
	// 		cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
	// 		cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
	// 		cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

	// 		tourName.innerHTML = `${coursePricing[key].name}`;
	// 		tourCost.innerHTML = cost;
	// 		tourDeposit.innerHTML = deposit;
	// 		tourCash.innerHTML = cash;
	// 		tourCashPPFees.innerHTML = cashPPFees;
	// 		tourCashVat.innerHTML = cashVat;
	// 		tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
	// 		tourCard.innerHTML = card;
	// 		tourCardPPFees.innerHTML = cardPPFees;
	// 		tourCardVat.innerHTML = cardVat;
	// 		tourCardProfit.innerHTML = cardProfit;
	// 	}
	// }
};

// let tourName;
// let tourCost;
// let tourDeposit;
// let tourCash;
// let tourCashPPFees;
// let tourCashVat;
// let tourCashProfit;
// let tourCard;
// let tourCardPPFees;
// let tourCardVat;
// let tourCardProfit;
// let cost;
// let deposit;
// let cash;
// let cashPPFees;
// let cashVat;
// let card;
// let cardPPFees;
// let cardVat;
// let cardProfit;

// const createHeaderRow = (header) => {
// 	rowCount = header.rows.length;
// 	if (rowCount < 2) {
// 		let row = document.createElement('tr');
// 		row.style.textAlign = 'center';

// 		row.innerHTML = `
//             <th>Tour</th>
//             <th>Cost</th>
//             <th>Deposit</th>
//             <th>Cash Price</th>
//             <th>Cash PP Fees</th>
//             <th>Cash VAT</th>
//             <th>Cash Profit</th>
//             <th>Card Price</th>
//             <th>Card PP Fees</th>
//             <th>Card VAT</th>
//             <th>Card Profit</th>
//         `;
// 		header.appendChild(row);
// 	}
// };

// const createTableRow = (table, key) => {
// 	let row = document.createElement('tr');
// 	row.classList.add('table-column-names');
// 	row.style.textAlign = 'center';

// 	row.innerHTML = `
// 		<td id='${key}Name'></td>
// 		<td id='${key}Cost'></td>
// 		<td id='${key}Deposit'></td>
// 		<td id="${key}Cash"></td>
// 		<td id='${key}CashPPFees'></td>
// 		<td id='${key}CashVat'></td>
// 		<td id='${key}CashProfit'></td>
// 		<td id="${key}Card"></td>
// 		<td id='${key}CardPPFees'></td>
// 		<td id='${key}CardVat'></td>
// 		<td id='${key}CardProfit'></td>
// 	`;
// 	table.appendChild(row);
// };

// const populateOceanTable = () => {
// 	const oceanHeader = document.querySelector('#oceanTable thead');
// 	const oceanTable = document.querySelector('#oceanTable tbody');

// 	// Clear the table before populating it
// 	oceanTable.innerHTML = '';

// 	createHeaderRow(oceanHeader);

// 	for (let key in oceanPricing) {
// 		if (key == 'extras' || key == 'calcCost') {
// 			continue;
// 		} else {
// 			createTableRow(oceanTable, key);

// 			tourName = document.querySelector(`#${key}Name`);
// 			tourCost = document.querySelector(`#${key}Cost`);
// 			tourDeposit = document.querySelector(`#${key}Deposit`);
// 			tourCash = document.querySelector(`#${key}Cash`);
// 			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
// 			tourCashVat = document.querySelector(`#${key}CashVat`);
// 			tourCashProfit = document.querySelector(`#${key}CashProfit`);
// 			tourCard = document.querySelector(`#${key}Card`);
// 			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${key}CardVat`);
// 			tourCardProfit = document.querySelector(`#${key}CardProfit`);
// 			tourPickUp = document.querySelector(`#${key}PickUp`);
// 			tourDropOff = document.querySelector(`#${key}DropOff`);

// 			cost = oceanPricing[key].cost.toFixed(2);
// 			deposit = roundUp(oceanPricing[key].deposit);
// 			cash = roundUp(cost * oceanPricing[key].profitPercent);
// 			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
// 			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
// 			card = roundUp(cash * 1.16);
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);
// 			tourName.innerHTML = `${oceanPricing[key].name}`;
// 			tourCost.innerHTML = cost;
// 			tourDeposit.innerHTML = deposit;
// 			tourCash.innerHTML = cash;
// 			tourCashPPFees.innerHTML = cashPPFees;
// 			tourCashVat.innerHTML = cashVat;
// 			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
// 			tourCard.innerHTML = card;
// 			tourCardPPFees.innerHTML = cardPPFees;
// 			tourCardVat.innerHTML = cardVat;
// 			tourCardProfit.innerHTML = cardProfit;
// 		}
// 	}
// };

// const populateCoursesTable = () => {
// 	const courseHeader = document.querySelector('#courseTable thead');
// 	const courseTable = document.querySelector('#courseTable tbody');

// 	// Clear the table before populating it
// 	courseTable.innerHTML = '';

// 	createHeaderRow(courseHeader);

// 	for (let key in coursePricing) {
// 		if (key == 'extras' || key == 'calcCost') {
// 			continue;
// 		} else {
// 			createTableRow(courseTable, key);
// 			tourName = document.querySelector(`#${key}Name`);
// 			tourCost = document.querySelector(`#${key}Cost`);
// 			tourDeposit = document.querySelector(`#${key}Deposit`);
// 			tourCash = document.querySelector(`#${key}Cash`);
// 			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
// 			tourCashVat = document.querySelector(`#${key}CashVat`);
// 			tourCashProfit = document.querySelector(`#${key}CashProfit`);
// 			tourCard = document.querySelector(`#${key}Card`);
// 			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${key}CardVat`);
// 			tourCardProfit = document.querySelector(`#${key}CardProfit`);

// 			cost = coursePricing[key].cost.toFixed(2);
// 			deposit = coursePricing[key].deposit;
// 			cash = roundUp(cost * coursePricing[key].profitPercent);
// 			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
// 			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
// 			card = roundUp(cash * 1.16);
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourName.innerHTML = `${coursePricing[key].name}`;
// 			tourCost.innerHTML = cost;
// 			tourDeposit.innerHTML = deposit;
// 			tourCash.innerHTML = cash;
// 			tourCashPPFees.innerHTML = cashPPFees;
// 			tourCashVat.innerHTML = cashVat;
// 			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
// 			tourCard.innerHTML = card;
// 			tourCardPPFees.innerHTML = cardPPFees;
// 			tourCardVat.innerHTML = cardVat;
// 			tourCardProfit.innerHTML = cardProfit;
// 		}
// 	}
// };

// const populateCenoteTable = () => {
// 	const cenoteHeader = document.querySelector('#cenoteTable thead');
// 	const cenoteTable = document.querySelector('#cenoteTable tbody');

// 	// Clear the table before populating it
// 	cenoteTable.innerHTML = '';

// 	createHeaderRow(cenoteHeader);

// 	for (let key in cenotePricing) {
// 		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
// 			continue;
// 		} else {
// 			createTableRow(cenoteTable, key);
// 			tourName = document.querySelector(`#${key}Name`);
// 			tourCost = document.querySelector(`#${key}Cost`);
// 			tourDeposit = document.querySelector(`#${key}Deposit`);
// 			tourCash = document.querySelector(`#${key}Cash`);
// 			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
// 			tourCashVat = document.querySelector(`#${key}CashVat`);
// 			tourCashProfit = document.querySelector(`#${key}CashProfit`);
// 			tourCard = document.querySelector(`#${key}Card`);
// 			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${key}CardVat`);
// 			tourCardProfit = document.querySelector(`#${key}CardProfit`);

// 			cost = (((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + cenotePricing[key].ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + cenotePricing[key].shuttle) / 2 / exchangeRate).toFixed(2);
// 			deposit = cenotePricing[key].deposit;
// 			cash = roundUp(cost * cenotePricing[key].profitPercent);
// 			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
// 			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
// 			card = roundUp(cash * 1.16);
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourName.innerHTML = `${cenotePricing[key].name} - ${cenotePricing[key].aka}`;
// 			tourCost.innerHTML = cost;
// 			tourDeposit.innerHTML = deposit;
// 			tourCash.innerHTML = cash;
// 			tourCashPPFees.innerHTML = cashPPFees;
// 			tourCashVat.innerHTML = cashVat;
// 			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
// 			tourCard.innerHTML = card;
// 			tourCardPPFees.innerHTML = cardPPFees;
// 			tourCardVat.innerHTML = cardVat;
// 			tourCardProfit.innerHTML = cardProfit;
// 		}
// 	}
// };

// const populateSnorkelTable = () => {
// 	const snorkelHeader = document.querySelector('#snorkelTable thead');
// 	const snorkelTable = document.querySelector('#snorkelTable tbody');
// 	let necroHotelValue = necroHotel.value;

// 	// Clear the table before populating it
// 	snorkelTable.innerHTML = '';

// 	createHeaderRow(snorkelHeader);

// 	if (necroHotelValue === 'notApplicable') {
// 		necroHotelValue = 'leblanc';
// 	}

// 	for (let key in snorkelPricing) {
// 		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
// 			continue;
// 		} else {
// 			createTableRow(snorkelTable, key);
// 			tourName = document.querySelector(`#${key}Name`);
// 			tourCost = document.querySelector(`#${key}Cost`);
// 			tourDeposit = document.querySelector(`#${key}Deposit`);
// 			tourCash = document.querySelector(`#${key}Cash`);
// 			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
// 			tourCashVat = document.querySelector(`#${key}CashVat`);
// 			tourCashProfit = document.querySelector(`#${key}CashProfit`);
// 			tourCard = document.querySelector(`#${key}Card`);
// 			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${key}CardVat`);
// 			tourCardProfit = document.querySelector(`#${key}CardProfit`);

// 			if (key === 'whaleShark') {
// 				cost = snorkelPricing.whaleShark.boat + hotelList[necroHotelValue].whaleSharkTransportFee;
// 			} else {
// 				cost = snorkelPricing[key].cost;
// 			}

// 			deposit = snorkelPricing[key].deposit;
// 			cash = roundUp(cost * snorkelPricing[key].profitPercent);
// 			cashPPFees = palPalFees(cash).paypalInvoiceFeeUSD.toFixed(2);
// 			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
// 			card = roundUp(cash * 1.16);
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourName.innerHTML = `${snorkelPricing[key].name}`;
// 			tourCost.innerHTML = cost;
// 			tourDeposit.innerHTML = deposit;
// 			tourCash.innerHTML = cash;
// 			tourCashPPFees.innerHTML = cashPPFees;
// 			tourCashVat.innerHTML = cashVat;
// 			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
// 			tourCard.innerHTML = card;
// 			tourCardPPFees.innerHTML = cardPPFees;
// 			tourCardVat.innerHTML = cardVat;
// 			tourCardProfit.innerHTML = cardProfit;
// 		}
// 	}
// };

// const populateNonDivingTable = () => {
// 	const nonDivingHeader = document.querySelector('#nonDivingTable thead');
// 	const nonDivingTable = document.querySelector('#nonDivingTable tbody');

// 	// Clear the table before populating it
// 	nonDivingTable.innerHTML = '';

// 	createHeaderRow(nonDivingHeader);

// 	for (let key in nonDivingPricing) {
// 		if (key === 'extras' || key === 'calcCost' || key === 'cancunaMataTransfers' || key === 'xParks') {
// 			continue;
// 		} else if (key == 'chichenItza') {
// 			const keyAdult = 'chichenItzaAdult';

// 			createTableRow(nonDivingTable, keyAdult);
// 			tourNameAdult = document.querySelector(`#${keyAdult}Name`);
// 			tourCostAdult = document.querySelector(`#${keyAdult}Cost`);
// 			tourDepositAdult = document.querySelector(`#${keyAdult}Deposit`);
// 			tourCardAdult = document.querySelector(`#${keyAdult}Card`);
// 			tourCardPPFeesAdult = document.querySelector(`#${keyAdult}CardPPFees`);
// 			tourCardVatAdult = document.querySelector(`#${keyAdult}CardVat`);
// 			tourCardProfitAdult = document.querySelector(`#${keyAdult}CardProfit`);

// 			cost = nonDivingPricing[key].costAdult.toFixed(2);
// 			card = nonDivingPricing[key].ticketAdult;
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourNameAdult.innerHTML = `${nonDivingPricing[key].name} - Adult`;
// 			tourCostAdult.innerHTML = cost;
// 			tourDepositAdult.innerHTML = nonDivingPricing[key].depositAdult;
// 			tourCardAdult.innerHTML = card;
// 			tourCardPPFeesAdult.innerHTML = cardPPFees;
// 			tourCardVatAdult.innerHTML = cardVat;
// 			tourCardProfitAdult.innerHTML = cardProfit;

// 			const keyKids = 'chichenItzaKids';

// 			createTableRow(nonDivingTable, keyKids);
// 			tourNameKids = document.querySelector(`#${keyKids}Name`);
// 			tourCostKids = document.querySelector(`#${keyKids}Cost`);
// 			tourDepositKids = document.querySelector(`#${keyKids}Deposit`);
// 			tourCardKids = document.querySelector(`#${keyKids}Card`);
// 			tourCardPPFeesKids = document.querySelector(`#${keyKids}CardPPFees`);
// 			tourCardVatKids = document.querySelector(`#${keyKids}CardVat`);
// 			tourCardProfitKids = document.querySelector(`#${keyKids}CardProfit`);

// 			cost = nonDivingPricing[key].costKids.toFixed(2);
// 			card = nonDivingPricing[key].ticketKids;
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourNameKids.innerHTML = `${nonDivingPricing[key].name} - Kids`;
// 			tourCostKids.innerHTML = cost;
// 			tourDepositKids.innerHTML = nonDivingPricing[key].depositKids;
// 			tourCardKids.innerHTML = card;
// 			tourCardPPFeesKids.innerHTML = cardPPFees;
// 			tourCardVatKids.innerHTML = cardVat;
// 			tourCardProfitKids.innerHTML = cardProfit;
// 		} else if (key == 'columbus') {
// 			const keyLobster = 'columbusLobster';
// 			createTableRow(nonDivingTable, key);
// 			tourName = document.querySelector(`#${keyLobster}Name`);
// 			tourCost = document.querySelector(`#${keyLobster}Cost`);
// 			tourDeposit = document.querySelector(`#${keyLobster}Deposit`);
// 			tourCard = document.querySelector(`#${keyLobster}Card`);
// 			tourCardPPFees = document.querySelector(`#${keyLobster}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${keyLobster}CardVat`);
// 			tourCardProfit = document.querySelector(`#${keyLobster}CardProfit`);

// 			// deposit = snorkelPricing[key].deposit;
// 			// cash = roundUp(cost * snorkelPricing[key].profitPercent);
// 			// cashPPFees = palPalFees(cash).paypalInvoiceFeeUSD.toFixed(2);
// 			// cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
// 			// card = roundUp(cash * 1.16);
// 			// cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			// cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			// cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			// tourName.innerHTML = `${snorkelPricing[key].name} - Lobster`;
// 			// tourCost.innerHTML = cost;
// 			// tourDeposit.innerHTML = deposit;
// 			// tourCash.innerHTML = cash;
// 			// tourCashPPFees.innerHTML = cashPPFees;
// 			// tourCashVat.innerHTML = cashVat;
// 			// tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
// 			// tourCard.innerHTML = card;
// 			// tourCardPPFees.innerHTML = cardPPFees;
// 			// tourCardVat.innerHTML = cardVat;
// 			// tourCardProfit.innerHTML = cardProfit;

// 			// createTableRow(nonDivingTable, key);
// 			// tourName = document.querySelector(`#${key}Name`);
// 			// tourCost = document.querySelector(`#${key}Cost`);
// 			// tourDeposit = document.querySelector(`#${key}Deposit`);
// 			// tourCard = document.querySelector(`#${key}Card`);
// 			// tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			// tourCardVat = document.querySelector(`#${key}CardVat`);
// 			// tourCardProfit = document.querySelector(`#${key}CardProfit`);

// 			// cost = nonDivingPricing[key].cost.toFixed(2);
// 			// card = nonDivingPricing[key].ticket;
// 			// cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			// cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			// cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			// tourName.innerHTML = `${nonDivingPricing[key].name}`;
// 			// tourCost.innerHTML = cost;
// 			// tourDeposit.innerHTML = nonDivingPricing[key].deposit;
// 			// tourCard.innerHTML = card;
// 			// tourCardPPFees.innerHTML = cardPPFees;
// 			// tourCardVat.innerHTML = cardVat;
// 			// tourCardProfit.innerHTML = cardProfit;
// 		} else {
// 			createTableRow(nonDivingTable, key);
// 			tourName = document.querySelector(`#${key}Name`);
// 			tourCost = document.querySelector(`#${key}Cost`);
// 			tourDeposit = document.querySelector(`#${key}Deposit`);
// 			tourCard = document.querySelector(`#${key}Card`);
// 			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
// 			tourCardVat = document.querySelector(`#${key}CardVat`);
// 			tourCardProfit = document.querySelector(`#${key}CardProfit`);

// 			cost = nonDivingPricing[key].cost;
// 			card = nonDivingPricing[key].ticket;
// 			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
// 			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
// 			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

// 			tourName.innerHTML = `${nonDivingPricing[key].name}`;
// 			tourCost.innerHTML = cost;
// 			tourDeposit.innerHTML = nonDivingPricing[key].deposit;
// 			tourCard.innerHTML = card;
// 			tourCardPPFees.innerHTML = cardPPFees;
// 			tourCardVat.innerHTML = cardVat;
// 			tourCardProfit.innerHTML = cardProfit;
// 		}
// 	}
// };
