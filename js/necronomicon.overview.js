const rowHighlight = () => {
	const overviewTableBodyRows = document.querySelectorAll(`#overview tbody tr`);
	overviewTableBodyRows.forEach((row) => {
		row.addEventListener('click', (event) => {
			overviewTableBodyRows.forEach((row) => {
				row.classList.remove('highlighted-row');
			});
			row.classList.add('highlighted-row');
		});
	});
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
            <th>Cash Tax</th>
            <th>Cash Profit</th>
            <th>Card Price</th>
            <th>Card PP Fees</th>
            <th>Card Tax</th>
            <th>Card Profit</th>
        `;
	header.appendChild(row);
};

const createTableRow = (table, key) => {
	let row = document.createElement('tr');
	row.classList.add('table-column-names');
	row.style.textAlign = 'center';

	row.innerHTML = `
		<td id='${key}OverviewName'></td>
		<td id='${key}OverviewcashCostsTotal4One'></td>
		<td id='${key}OverviewDeposit'></td>
		<td id="${key}OverviewCashPrice4One"></td>
		<td id='${key}OverviewCashPayPalFeeUSD'></td>
		<td id='${key}OverviewCashTax'></td>
		<td id='${key}OverviewCashProfitTotal'></td>
		<td id="${key}OverviewCardPrice"></td>
		<td id='${key}OverviewCardPayPalFeeUSD'></td>
		<td id='${key}OverviewCardTax'></td>
		<td id='${key}OverviewCardProfitTotal'></td>
	`;

	table.appendChild(row);
};

// Clear the tables before populating it
const populateTables = () => {
	const certifiedHeader = document.querySelector('#certifiedTable thead');
	const courseHeader = document.querySelector('#courseTable thead');
	const cenoteHeader = document.querySelector('#cenoteTable thead');
	const snorkelHeader = document.querySelector('#snorkelTable thead');
	const nonDivingHeader = document.querySelector('#nonDivingTable thead');
	const certifiedTable = document.querySelector('#certifiedTable tbody');
	const courseTable = document.querySelector('#courseTable tbody');
	const cenoteTable = document.querySelector('#cenoteTable tbody');
	const snorkelTable = document.querySelector('#snorkelTable tbody');
	const nonDivingTable = document.querySelector('#nonDivingTable tbody');
	let rowCount = certifiedHeader.rows.length;

	// Show the header column names
	if (rowCount < 2) {
		createHeaderRow(certifiedHeader);
		createHeaderRow(courseHeader);
		createHeaderRow(cenoteHeader);
		createHeaderRow(snorkelHeader);
		createHeaderRow(nonDivingHeader);
	}

	certifiedTable.innerHTML = '';
	courseTable.innerHTML = '';
	cenoteTable.innerHTML = '';
	snorkelTable.innerHTML = '';
	nonDivingTable.innerHTML = '';

	// Show data on the tables

	const pricelists = Object.keys(cthulhuTours);
	pricelists.forEach((pricelist) => {
		if (locations.value === 'notApplicable') {
			return;
		}
		for (let key in cthulhuTours[pricelist]) {
			if (pricelist === 'common' || key == 'certified') {
				continue;
			}
			if (pricelist === 'certifiedTours') {
				createTableRow(certifiedTable, key);
			} else if (pricelist === 'courses') {
				createTableRow(courseTable, key);
			} else if (pricelist === 'cenotes') {
				createTableRow(cenoteTable, key);
			} else if (pricelist === 'snorkeling') {
				createTableRow(snorkelTable, key);
			} else if (pricelist === 'nonDiving') {
				createTableRow(nonDivingTable, key);
			}
			updateTourData(pricelist, key, 1);

			const tourOverviewName = document.querySelector(`#${key}OverviewName`);
			const tourOverviewcashCostsTotal4One = document.querySelector(`#${key}OverviewcashCostsTotal4One`);
			const tourOverviewDeposit = document.querySelector(`#${key}OverviewDeposit`);
			const tourOverviewCashPrice4One = document.querySelector(`#${key}OverviewCashPrice4One`);
			const tourOverviewCashPayPalFeeUSD = document.querySelector(`#${key}OverviewCashPayPalFeeUSD`);
			const tourOverviewCashTax = document.querySelector(`#${key}OverviewCashTax`);
			const tourOverviewCashProfitTotal = document.querySelector(`#${key}OverviewCashProfitTotal`);
			const tourOverviewCardPrice = document.querySelector(`#${key}OverviewCardPrice`);
			const tourOverviewCardPayPalFeeUSD = document.querySelector(`#${key}OverviewCardPayPalFeeUSD`);
			const tourOverviewCardTax = document.querySelector(`#${key}OverviewCardTax`);
			const tourOverviewCardProfitTotal = document.querySelector(`#${key}OverviewCardProfitTotal`);

			tourOverviewName.textContent = `${tourData.name}`;
			tourOverviewcashCostsTotal4One.textContent = `${tourData.cashCostsTotal4One.toFixed(2)}`;
			tourOverviewDeposit.textContent = `${tourData.deposit.toFixed(2)}`;
			tourOverviewCashPrice4One.textContent = `${tourData.cashPrice4One.toFixed(2)}`;
			tourOverviewCashPayPalFeeUSD.textContent = `${tourData.cashPayPalFeeUSD.toFixed(2)}`;
			tourOverviewCashTax.textContent = `${tourData.cashTax.toFixed(2)}`;
			tourOverviewCashProfitTotal.textContent = `${tourData.cashProfitTotal.toFixed(2)}`;
			tourOverviewCardPrice.textContent = `${tourData.cardPrice.toFixed(2)}`;
			tourOverviewCardPayPalFeeUSD.textContent = `${tourData.cardPayPalFeeUSD.toFixed(2)}`;
			tourOverviewCardTax.textContent = `${tourData.cardTax.toFixed(2)}`;
			tourOverviewCardProfitTotal.textContent = `${tourData.cardProfitTotal.toFixed(2)}`;
		}
	});
	rowHighlight();
	// certifiedTable.rows[0].cells[7].style.backgroundColor = 'red';
};
