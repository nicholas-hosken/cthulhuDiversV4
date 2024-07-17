// Main
const necroMenu = document.querySelector('#necro-menu');
const necroMenuBtns = document.querySelectorAll('#necro-menu button');
const necroRefreshBtn = document.querySelector('#necro-refresh-btn');

let necroMenuActiveBtn = [undefined];

// Scripts
const clipboardBtn = document.querySelector('#clipboard-btn');
const clientArrivalDate = document.querySelector('#client-arrival-date');
const clientDepartureDate = document.querySelector('#client-departure-date');
const clientMessageType = document.querySelector('#client-message-type');
let clientName = document.querySelector('#client-name');
let clientPax = document.querySelector('#client-pax');
const producedScript = document.createElement('div');
const outputScript = document.querySelector('#ouput-script div');

// Price
const tourPrice = document.querySelector('#tour-price');
const tourPriceSelect = document.querySelector('#tour-price-select');
const tourPricePax = document.querySelector('#tour-price-pax');
const tourPriceName = document.querySelector('#tour-price h3');
const tourPriceSheet = document.querySelector('#tour-price-sheet');
let pax = 1;

const knownCaution = document.querySelector('#known-caution');
const knownClientArrivalDate = document.querySelector('#known-client-arrival-date');
const knownClientDepartureDate = document.querySelector('#known-client-departure-date');
const knownClientHotel = document.querySelector('#known-client-hotel');
const knownClientMessageType = document.querySelector('#known-client-message-type');
const knownClientName = document.querySelector('#known-client-name');
const knownClientPax = document.querySelector('#known-client-pax');
const knownInfoData = document.querySelectorAll('#known-info span');
const newClientBtn = document.querySelector('#new-client-btn');
const outputScriptBtns = document.querySelectorAll('#ouput-script button');
const overview = document.querySelector('#overview');
const overviewTables = document.querySelectorAll('#overview table');
const prep = document.querySelector('#prep');
const scripts = document.querySelector('#scripts');
const specifics = document.querySelector('#specifics');
const submitClientName = document.querySelector('#submit-client-name');
const tourCardCosts = document.querySelector('#tour-card-costs');
const tourCardCostsTotal = document.querySelector('#tour-card-costs-total');
const tourCardProfit = document.querySelector('#tour-card-profit');
const tourCardProfitTotal = document.querySelector('#tour-card-profit-total');
const tourCashCosts = document.querySelector('#tour-cash-costs');
const tourCashCostsTotal = document.querySelector('#tour-cash-costs-total');
const tourCashProfit = document.querySelector('#tour-cash-profit');
const tourCashProfitTotal = document.querySelector('#tour-cash-profit-total');
const tourExtras = document.querySelector('#tour-extras');
const tourPrep = document.querySelector('#tour-prep');
const tourRequirements = document.querySelector('#tour-requirements');
const tourTransport = document.querySelector('#tour-transport');

const populateHotelOptions = () => {
	for (const key in hotelList) {
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = hotelList[key].name;
		locations.appendChild(option);
	}
};
populateHotelOptions();

const populateTours = (selectionBox) => {
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
	const nonDiving = createOptionElement('Non-Diving Tours');

	const cenoteOptions = [];

	selectionBox.appendChild(oceanDives);
	for (const key in cthulhuTours.certifiedTours) {
		if (key === 'certified') {
			continue;
		}
		const option = document.createElement('option');
		option.value = `certifiedTours ${key}`;
		option.innerHTML = cthulhuTours.certifiedTours[key].name;
		selectionBox.appendChild(option);
	}
	selectionBox.appendChild(padiCourses);
	for (const key in cthulhuTours.courses) {
		const option = document.createElement('option');
		option.value = `courses ${key}`;
		option.innerHTML = cthulhuTours.courses[key].name;
		selectionBox.appendChild(option);
	}
	selectionBox.appendChild(cenoteDives);
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
	cenoteOptions.forEach((option) => selectionBox.appendChild(option));
	selectionBox.appendChild(snorkeling);
	for (const key in cthulhuTours.snorkeling) {
		const option = document.createElement('option');
		option.value = `snorkeling ${key}`;
		option.innerHTML = cthulhuTours.snorkeling[key].name;
		selectionBox.appendChild(option);
	}
	selectionBox.appendChild(nonDiving);
	for (const key in cthulhuTours.nonDiving) {
		if (key === 'cancunaMataTransfers') {
			continue;
		}
		const option = document.createElement('option');
		option.value = `nonDiving ${key}`;
		option.innerHTML = cthulhuTours.nonDiving[key].name;
		selectionBox.appendChild(option);
	}
};
populateTours(tourPriceSelect);

const reloadPage = () => {
	location.reload();
};
necroRefreshBtn.addEventListener('click', reloadPage);

const hideInfo = () => {
	scripts.style.display = 'none';
	tourPrice.style.display = 'none';
	overview.style.display = 'none';
	prep.style.display = 'none';
};

// Show #necro-menu and active menu item
const showNecroMenu = () => {
	if (locations.value === 'NA') {
		necroMenu.style.display = 'none';
		necroMenuBtns.forEach((btn) => {
			// btn.classList.remove('active');
		});
		hideInfo();
	} else {
		necroMenu.style.display = 'flex';
		if (necroMenuActiveBtn[0] !== undefined) {
			// necroMenuActiveBtn[0].classList.remove('active');
		}
	}
};

// Show relevant information based on the active button
const showRelevantInfo = () => {
	necroMenuActiveBtn = necroMenu.querySelectorAll('#necro-menu .active');

	hideInfo();

	// Show the relevant section based on the active button
	if (necroMenuActiveBtn[0] !== undefined) {
		switch (necroMenuActiveBtn[0].textContent) {
			case 'Email Scripts':
				scripts.style.display = 'block';
				break;
			case 'Tour Price':
				tourPrice.style.display = 'block';
				break;
			case 'Pricing Overview':
				overview.style.display = 'block';
				break;
			case 'Day Prep':
				prep.style.display = 'block';
				break;
			default:
				break;
		}
	}
};

// Display .info on #locations change
const formChanges = () => {
	locations.addEventListener('change', (event) => {
		showNecroMenu();
		showRelevantInfo();
		populateTables();
	});
};
formChanges();

// Add functionality to the menu buttons
const nercoMenuFunctionality = () => {
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
