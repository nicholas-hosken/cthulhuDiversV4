const palPalFees = (amountUSD) => {
	// PayPal fees for invoicing
	let paypalInvoiceFeeRate = 0.029; // 2.9%
	let paypalFixedInvoiceFeeUSD = 0.3; // $0.30

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
	const oceanTable = document.querySelector('#oceanTable tbody');
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
			let cashPPFees = palPalFees(cost).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = (deposit * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = (card * 0.16).toFixed(2);
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
oceanTablePopulate();

const cenoteTablePopulate = () => {
	const cenoteHeader = document.querySelector('#cenoteTable thead');
	const cenoteTable = document.querySelector('#cenoteTable tbody');
	createHeaderRow(cenoteHeader);

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
			let cashPPFees = palPalFees(cost).paypalInvoiceFeeUSD.toFixed(2);
			let cashVat = (deposit * 0.16).toFixed(2);
			let card = roundUp(cash * 1.16);
			let cardPPFees = palPalFees(card).paypalInvoiceFeeUSD.toFixed(2);
			let cardVat = (card * 0.16).toFixed(2);
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
cenoteTablePopulate();
