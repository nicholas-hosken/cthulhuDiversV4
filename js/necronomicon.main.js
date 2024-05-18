const clipboardBtn = document.querySelector('#clipboard-btn');
const clientArrivalDate = document.querySelector('#client-arrival-date');
const clientDepartureDate = document.querySelector('#client-departure-date');
const clientMessageType = document.querySelector('#client-message-type');
const knownCaution = document.querySelector('#known-caution');
const knownClientArrivalDate = document.querySelector('#known-client-arrival-date');
const knownClientDepartureDate = document.querySelector('#known-client-departure-date');
const knownClientHotel = document.querySelector('#known-client-hotel');
const knownClientMessageType = document.querySelector('#known-client-message-type');
const knownClientName = document.querySelector('#known-client-name');
const knownClientPax = document.querySelector('#known-client-pax');
const knownInfoData = document.querySelectorAll('#known-info span');
const necroHotel = document.querySelector('#necro-hotel');
const necroMenu = document.querySelector('#necro-menu');
const necroMenuBtns = document.querySelectorAll('#necro-menu button');
const newClientBtn = document.querySelector('#new-client-btn');
const outputScript = document.querySelector('#ouput-script div');
const outputScriptBtns = document.querySelectorAll('#ouput-script button');
const overview = document.querySelector('#overview');
const overviewTables = document.querySelectorAll('#overview table');
const overviewTableBodyRows = document.querySelectorAll(`#overview tbody tr`);
const prep = document.querySelector('#prep');
const questions = document.querySelectorAll(`.questions`);
const scripts = document.querySelector('#scripts');
const submitClientName = document.querySelector('#submit-client-name');

let clientName = document.querySelector('#client-name');
let clientPax = document.querySelector('#client-pax');

const producedScript = document.createElement('div');

const hideInfo = () => {
	scripts.style.display = 'none';
	overview.style.display = 'none';
	prep.style.display = 'none';
};

// Function to show relevant information based on the active button
const showRelevantInfo = () => {
	const necroMenuActiveBtn = necroMenu.querySelectorAll('#necro-menu .active');

	hideInfo();

	// Show the relevant section based on the active button
	if (necroMenuActiveBtn[0] !== undefined) {
		switch (necroMenuActiveBtn[0].textContent) {
			case 'Email Scripts':
				scripts.style.display = 'block';
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
showRelevantInfo();

const populateHotelOptions = () => {
	for (const key in hotelList) {
		const option = document.createElement('option');
		option.value = key;
		option.innerHTML = hotelList[key].name;
		necroHotel.appendChild(option);
	}
};
populateHotelOptions();

const rowHighlight = () => {
	overviewTableBodyRows.forEach((row) => {
		row.addEventListener('click', (event) => {
			overviewTableBodyRows.forEach((row) => {
				row.classList.remove('highlighted-row');
			});
			row.classList.add('highlighted-row');
		});
	});
};

// Display .info on #necro-hotel change
const overviewHotelChange = () => {
	necroHotel.addEventListener('change', (event) => {
		if (necroHotel.value !== '0') {
			overviewTables.forEach((div) => {
				div.style.visibility = 'visible';
			});
			populateOceanTable();
			populateCoursesTable();
			populateCenoteTable();
			populateSnorkelTable();
			populateEmailScripts();
			rowHighlight();

			necroMenu.style.display = 'flex';
		}
	});
};
overviewHotelChange();

// Function to add functionality to the menu buttons
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
