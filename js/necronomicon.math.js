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
};

const createTableRow = (table, key) => {
	let row = document.createElement('tr');
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

const oceanTablePopulate = () => {
	const oceanHeader = document.querySelector('#oceanTable thead');
	const oceanHeaderRow2 = document.querySelector('#oceanTable thead tr:nth-child(2)');
	const oceanTable = document.querySelector('#oceanTable tbody');

	// Clear the table before populating it
	oceanHeaderRow2.innerHTML = '';
	oceanTable.innerHTML = '';

	createHeaderRow(oceanHeader);

	for (let key in oceanPricing) {
		if (key == 'extras' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(oceanTable, key);

			const tourName = document.querySelector(`#${key}Name`);
			const tourCost = document.querySelector(`#${key}Cost`);
			const tourDeposit = document.querySelector(`#${key}Deposit`);
			const tourCash = document.querySelector(`#${key}Cash`);
			const tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			const tourCashVat = document.querySelector(`#${key}CashVat`);
			const tourCashProfit = document.querySelector(`#${key}CashProfit`);
			const tourCard = document.querySelector(`#${key}Card`);
			const tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			const tourCardVat = document.querySelector(`#${key}CardVat`);
			const tourCardProfit = document.querySelector(`#${key}CardProfit`);

			let cost = (oceanPricing[key].boat / exchangeRate + oceanPricing[key].guide).toFixed(2);
			let deposit = roundUp(oceanPricing[key].deposit / exchangeRate);
			let cash = roundUp(cost * oceanPricing[key].profitPercent);
			let cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			let cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

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

const coursesTablePopulate = () => {
	const courseHeader = document.querySelector('#courseTable thead');
	const courseTable = document.querySelector('#courseTable tbody');

	// Clear the table before populating it
	courseHeader.innerHTML = '';
	courseTable.innerHTML = '';

	createHeaderRow(courseHeader);

	for (let key in coursePricing) {
		if (key == 'extras' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(courseTable, key);
			const tourName = document.querySelector(`#${key}Name`);
			const tourCost = document.querySelector(`#${key}Cost`);
			const tourDeposit = document.querySelector(`#${key}Deposit`);
			const tourCash = document.querySelector(`#${key}Cash`);
			const tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			const tourCashVat = document.querySelector(`#${key}CashVat`);
			const tourCashProfit = document.querySelector(`#${key}CashProfit`);
			const tourCard = document.querySelector(`#${key}Card`);
			const tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			const tourCardVat = document.querySelector(`#${key}CardVat`);
			const tourCardProfit = document.querySelector(`#${key}CardProfit`);

			let cost = (coursePricing[key].boat / exchangeRate + coursePricing[key].guide).toFixed(2);
			let deposit = roundUp(coursePricing[key].deposit / exchangeRate);
			let cash = roundUp(cost * coursePricing[key].profitPercent);
			let cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			let cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

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

const cenoteTablePopulate = () => {
	const cenoteHeader = document.querySelector('#cenoteTable thead');
	const cenoteTable = document.querySelector('#cenoteTable tbody');

	// Clear the table before populating it
	cenoteHeader.innerHTML = '';
	cenoteTable.innerHTML = '';

	createHeaderRow(courseHeader);

	for (let key in cenotePricing) {
		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(cenoteTable, key);
			const tourName = document.querySelector(`#${key}Name`);
			const tourCost = document.querySelector(`#${key}Cost`);
			const tourDeposit = document.querySelector(`#${key}Deposit`);
			const tourCash = document.querySelector(`#${key}Cash`);
			const tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			const tourCashVat = document.querySelector(`#${key}CashVat`);
			const tourCashProfit = document.querySelector(`#${key}CashProfit`);
			const tourCard = document.querySelector(`#${key}Card`);
			const tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			const tourCardVat = document.querySelector(`#${key}CardVat`);
			const tourCardProfit = document.querySelector(`#${key}CardProfit`);

			let cost = (((cenotePricing.cenoteBasics.food + cenotePricing.cenoteBasics.guide * exchangeRate + cenotePricing.cenoteBasics.tanksDiver * 2 + cenotePricing[key].ticket) * 2 + cenotePricing.cenoteBasics.tanksGuide + cenotePricing[key].shuttle) / 2 / exchangeRate).toFixed(2);
			let deposit = cenotePricing[key].deposit;
			let cash = roundUp(cost * cenotePricing[key].profitPercent);
			let cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			let cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

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

const snorkelTablePopulate = () => {
	const snorkelHeader = document.querySelector('#snorkelTable thead');
	const snorkelTable = document.querySelector('#snorkelTable tbody');

	// Clear the table before populating it
	snorkelHeader.innerHTML = '';
	snorkelTable.innerHTML = '';

	createHeaderRow(courseHeader);

	for (let key in snorkelPricing) {
		if (key == 'extras' || key == 'cenoteBasics' || key == 'calcCost') {
			continue;
		} else {
			createTableRow(snorkelTable, key);
			const tourName = document.querySelector(`#${key}Name`);
			const tourCost = document.querySelector(`#${key}Cost`);
			const tourDeposit = document.querySelector(`#${key}Deposit`);
			const tourCash = document.querySelector(`#${key}Cash`);
			const tourCashPPFees = document.querySelector(`#${key}CashPPFees`);
			const tourCashVat = document.querySelector(`#${key}CashVat`);
			const tourCashProfit = document.querySelector(`#${key}CashProfit`);
			const tourCard = document.querySelector(`#${key}Card`);
			const tourCardPPFees = document.querySelector(`#${key}CardPPFees`);
			const tourCardVat = document.querySelector(`#${key}CardVat`);
			const tourCardProfit = document.querySelector(`#${key}CardProfit`);
			const overviewHotel = document.querySelector('#overview-hotel');

			let cost = (snorkelPricing[key].boat / 2 / exchangeRate).toFixed(2);
			let deposit = snorkelPricing[key].deposit;
			let cash = roundUp(cost * snorkelPricing[key].profitPercent);
			let cashPPFees = palPalFees(deposit).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = ((deposit - cashPPFees) * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = ((card - cardPPFees) * 0.16).toFixed(2);
			let cardProfit = (card - cost - cardPPFees - cardVat).toFixed(2);

			tourName.innerHTML = `${snorkelPricing[key].name} - ${snorkelPricing[key].aka}`;
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

const rowHighlight = (table) => {
	const tableBody = document.querySelector(`#${table} tbody`);

	// Check if the required DOM element exists
	if (!tableBody) {
		console.error('Missing DOM elements');
		return;
	}

	// Use event delegation to handle click events on the rows
	tableBody.addEventListener('click', (event) => {
		const row = event.target.closest('tr');
		if (!row) return;

		// Remove the highlighted class from all rows
		const rows = tableBody.querySelectorAll('tr');
		rows.forEach((row) => {
			row.classList.remove('highlighted-row');
		});

		// Add the highlighted class to the clicked row
		row.classList.add('highlighted-row');
	});
};
rowHighlight('oceanTable');
rowHighlight('courseTable');
rowHighlight('cenoteTable');
rowHighlight('snorkelTable');

// Function to show relevant information based on the active button
const showRelevantInfo = () => {
	const necroMenuActiveBtn = document.querySelectorAll('#necro-menu .active');
	const scripts = document.querySelector('#scripts');
	const overview = document.querySelector('#overview');

	// Hide the overview by default
	scripts.classList.remove('display');
	overview.classList.remove('display');

	// Show the relevant section based on the active button
	switch (necroMenuActiveBtn[0].textContent) {
		case 'Email Scripts':
			scripts.classList.add('display');
			break;
		case 'Pricing Overview':
			overview.classList.add('display');
			break;
		default:
			break;
	}
};
showRelevantInfo();

// Display .info dives on #necro-hotel change
const overviewHotelChange = () => {
	const necroHotel = document.querySelector('#necro-hotel');
	const overviewTables = document.querySelectorAll('#overview table');

	necroHotel.addEventListener('change', (event) => {
		overviewTables.forEach((div) => {
			div.style.visibility = 'visible';
		});
		oceanTablePopulate();
		coursesTablePopulate();
		cenoteTablePopulate();
		snorkelTablePopulate();
	});
};
overviewHotelChange();

// Function to add functionality to the menu buttons
const nercoMenuFunctionality = () => {
	const necroMenuBtns = document.querySelectorAll('#necro-menu button');

	necroMenuBtns.forEach((btn) => {
		btn.addEventListener('click', (event) => {
			const button = event.target;

			// Remove the active class from all buttons
			necroMenuBtns.forEach((btn) => {
				btn.classList.remove('active');
			});

			// Add the active class to the clicked button
			button.classList.add('active');

			// Show the relevant information
			showRelevantInfo();
		});
	});
};
nercoMenuFunctionality();
