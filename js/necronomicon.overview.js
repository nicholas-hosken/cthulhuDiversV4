let tourName;
let tourCost;
let tourDeposit;
let tourCash;
let tourCashPPFees;
let tourCashVat;
let tourCashProfit;
let tourCard;
let tourCardPPFees;
let tourCardVat;
let tourCardProfit;
let cost;
let deposit;
let cash;
let cashPPFees;
let cashVat;
let card;
let cardPPFees;
let cardVat;
let cardProfit;

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

const createHeaderRow = (header) => {
	rowCount = header.rows.length;
	if (rowCount < 2) {
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

const createTableRow = (table, key) => {
	let row = document.createElement('tr');
	row.classList.add('table-column-names');
	row.style.textAlign = 'center';

	row.innerHTML = `
		<td id='${key}Name'></td>
		<td id='${key}Cost'></td>
		<td id='${key}Deposit'></td>
		<td id="${key}Cash"></td>
		<td id='${key}CashPPFees'></td>
		<td id='${key}CashVat'></td>
		<td id='${key}CashProfit'></td>
		<td id="${key}Card"></td>
		<td id='${key}CardPPFees'></td>
		<td id='${key}CardVat'></td>
		<td id='${key}CardProfit'></td>
	`;
	table.appendChild(row);
};

const populateOceanTable = () => {
	const oceanHeader = document.querySelector('#oceanTable thead');
	const oceanTable = document.querySelector('#oceanTable tbody');

	// Clear the table before populating it
	oceanTable.innerHTML = '';

	createHeaderRow(oceanHeader);

	for (let key in oceanPricing) {
		if (key == 'extras' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(oceanTable, key);

			tourName = document.querySelector(`#${key}Name`);
			tourCost = document.querySelector(`#${key}Cost`);
			tourDeposit = document.querySelector(`#${key}Deposit`);
			tourCash = document.querySelector(`#${key}Cash`);
			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			tourCashVat = document.querySelector(`#${key}CashVat`);
			tourCashProfit = document.querySelector(`#${key}CashProfit`);
			tourCard = document.querySelector(`#${key}Card`);
			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			tourCardVat = document.querySelector(`#${key}CardVat`);
			tourCardProfit = document.querySelector(`#${key}CardProfit`);
			tourPickUp = document.querySelector(`#${key}PickUp`);
			tourDropOff = document.querySelector(`#${key}DropOff`);

			// console.log(necroHotel.value);
			// console.log(oceanPricing[key].arrivalD1);

			// if (key === 'bullShark' || key === 'cozumel') {
			// 	let area = hotelList[necroHotel.value].location;
			// 	if (area === 'cun') {
			// 		travelTime = revertTime(convertTime(oceanPricing[key].arrivalD1) - 90);
			// 	} else if (area === 'pm' || area === 'cm') {
			// 		travelTime = revertTime(convertTime(oceanPricing[key].arrivalD1) - 105);
			// 	} else {
			// 		travelTime = revertTime(convertTime(oceanPricing[key].arrivalD1) - 35);
			// 	}
			// }

			cost = (oceanPricing[key].boat / exchangeRate + oceanPricing[key].guide).toFixed(2);
			deposit = roundUp(oceanPricing[key].deposit / exchangeRate);
			cash = roundUp(cost * oceanPricing[key].profitPercent);
			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			card = roundUp(cash * 1.16);
			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);
			tourName.innerHTML = `${oceanPricing[key].name}`;
			tourCost.innerHTML = cost;
			tourDeposit.innerHTML = deposit;
			tourCash.innerHTML = cash;
			tourCashPPFees.innerHTML = cashPPFees;
			tourCashVat.innerHTML = cashVat;
			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
			tourCard.innerHTML = card;
			tourCardPPFees.innerHTML = cardPPFees;
			tourCardVat.innerHTML = cardVat;
			tourCardProfit.innerHTML = cardProfit;
		}
	}
};

const populateCoursesTable = () => {
	const courseHeader = document.querySelector('#courseTable thead');
	const courseTable = document.querySelector('#courseTable tbody');

	// Clear the table before populating it
	courseTable.innerHTML = '';

	createHeaderRow(courseHeader);

	for (let key in coursePricing) {
		if (key == 'extras' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(courseTable, key);
			tourName = document.querySelector(`#${key}Name`);
			tourCost = document.querySelector(`#${key}Cost`);
			tourDeposit = document.querySelector(`#${key}Deposit`);
			tourCash = document.querySelector(`#${key}Cash`);
			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			tourCashVat = document.querySelector(`#${key}CashVat`);
			tourCashProfit = document.querySelector(`#${key}CashProfit`);
			tourCard = document.querySelector(`#${key}Card`);
			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			tourCardVat = document.querySelector(`#${key}CardVat`);
			tourCardProfit = document.querySelector(`#${key}CardProfit`);

			cost = (coursePricing[key].boat / exchangeRate + coursePricing[key].guide).toFixed(2);
			deposit = roundUp(coursePricing[key].deposit / exchangeRate);
			cash = roundUp(cost * coursePricing[key].profitPercent);
			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			card = roundUp(cash * 1.16);
			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

			tourName.innerHTML = `${coursePricing[key].name}`;
			tourCost.innerHTML = cost;
			tourDeposit.innerHTML = deposit;
			tourCash.innerHTML = cash;
			tourCashPPFees.innerHTML = cashPPFees;
			tourCashVat.innerHTML = cashVat;
			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
			tourCard.innerHTML = card;
			tourCardPPFees.innerHTML = cardPPFees;
			tourCardVat.innerHTML = cardVat;
			tourCardProfit.innerHTML = cardProfit;
		}
	}
};

const populateCenoteTable = () => {
	const cenoteHeader = document.querySelector('#cenoteTable thead');
	const cenoteTable = document.querySelector('#cenoteTable tbody');

	// Clear the table before populating it
	cenoteTable.innerHTML = '';

	createHeaderRow(cenoteHeader);

	for (let key in cenotePricing) {
		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(cenoteTable, key);
			tourName = document.querySelector(`#${key}Name`);
			tourCost = document.querySelector(`#${key}Cost`);
			tourDeposit = document.querySelector(`#${key}Deposit`);
			tourCash = document.querySelector(`#${key}Cash`);
			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			tourCashVat = document.querySelector(`#${key}CashVat`);
			tourCashProfit = document.querySelector(`#${key}CashProfit`);
			tourCard = document.querySelector(`#${key}Card`);
			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			tourCardVat = document.querySelector(`#${key}CardVat`);
			tourCardProfit = document.querySelector(`#${key}CardProfit`);

			cost = (((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + cenotePricing[key].ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + cenotePricing[key].shuttle) / 2 / exchangeRate).toFixed(2);
			deposit = cenotePricing[key].deposit;
			cash = roundUp(cost * cenotePricing[key].profitPercent);
			cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			card = roundUp(cash * 1.16);
			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

			tourName.innerHTML = `${cenotePricing[key].name} - ${cenotePricing[key].aka}`;
			tourCost.innerHTML = cost;
			tourDeposit.innerHTML = deposit;
			tourCash.innerHTML = cash;
			tourCashPPFees.innerHTML = cashPPFees;
			tourCashVat.innerHTML = cashVat;
			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
			tourCard.innerHTML = card;
			tourCardPPFees.innerHTML = cardPPFees;
			tourCardVat.innerHTML = cardVat;
			tourCardProfit.innerHTML = cardProfit;
		}
	}
};

const populateSnorkelTable = () => {
	const snorkelHeader = document.querySelector('#snorkelTable thead');
	const snorkelTable = document.querySelector('#snorkelTable tbody');
	let necroHotelValue = necroHotel.value;

	// Clear the table before populating it
	snorkelTable.innerHTML = '';

	createHeaderRow(snorkelHeader);

	if (necroHotelValue === 'notApplicable') {
		necroHotelValue = 'leblanc';
	}

	for (let key in snorkelPricing) {
		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(snorkelTable, key);
			tourName = document.querySelector(`#${key}Name`);
			tourCost = document.querySelector(`#${key}Cost`);
			tourDeposit = document.querySelector(`#${key}Deposit`);
			tourCash = document.querySelector(`#${key}Cash`);
			tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			tourCashVat = document.querySelector(`#${key}CashVat`);
			tourCashProfit = document.querySelector(`#${key}CashProfit`);
			tourCard = document.querySelector(`#${key}Card`);
			tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			tourCardVat = document.querySelector(`#${key}CardVat`);
			tourCardProfit = document.querySelector(`#${key}CardProfit`);

			cost = (snorkelPricing[key].boat + snorkelPricing[key].shuttle(necroHotelValue)).toFixed(2);
			deposit = cost;
			cash = roundUp(cost * snorkelPricing[key].profitPercent);
			cashPPFees = palPalFees(cash).paypalInvoiceFeeUSD.toFixed(2);
			cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			card = roundUp(cash * 1.16);
			cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

			tourName.innerHTML = `${snorkelPricing[key].name}`;
			tourCost.innerHTML = cost;
			tourDeposit.innerHTML = deposit;
			tourCash.innerHTML = cash;
			tourCashPPFees.innerHTML = cashPPFees;
			tourCashVat.innerHTML = cashVat;
			tourCashProfit.innerHTML = `${(cash - cost - cashPPFees - cashVat).toFixed(2)}`;
			tourCard.innerHTML = card;
			tourCardPPFees.innerHTML = cardPPFees;
			tourCardVat.innerHTML = cardVat;
			tourCardProfit.innerHTML = cardProfit;
		}
	}
};
