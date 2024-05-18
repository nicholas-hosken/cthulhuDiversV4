const wetsuit = {
	ladies: {
		metric: {
			xs: ['XS', '150-160', '75-85', '60-70', '75-85', '45-50'],
			s: ['S', '155-165', '80-90', '65-75', '85-95', '50-55'],
			m: ['M', '160-170', '85-95', '70-80', '95-105', '55-60'],
			ml: ['ML', '165-175', '90-100', '75-85', '105-115', '60-65'],
			l: ['L', '170-180', '90-100', '75-85', '105-115', '65-70'],
			xl: ['XL', '175-185', '95-105', '80-90', '115-125', '72-77'],
			xxl: ['XXL', '180-190', '100-110', '85-95', '125-135', '75-80'],
		},
		imperial: {
			xs: ['XS', `4'11"-5'3"`, `29"-33"`, `24"-28"`, `29"-33"`, `100-110`],
			s: ['S', `5'1"-5'5"`, `31"-35"`, `26"-30"`, `33"-37"`, `110-120`],
			m: ['M', `5'3"-5'7"`, `33"-37"`, `28"-32"`, `37"-41"`, `120-130`],
			ml: ['ML', `5'5"-5'9"`, `35"-39"`, `30"-34"`, `41"-45"`, `130-145`],
			l: ['L', `5'7"-5'11"`, `35"-39"`, `30"-34"`, `41"-45"`, `145-160`],
			xl: ['XL', `5'9"-6'1"`, `37"-41"`, `32"-36"`, `45"-49"`, `160-175`],
			xxl: ['XXL', `5'11"-6'3"`, `39"-43"`, `34"-38"`, `49"-53"`, `175-190`],
		},
	},
	mens: {
		metric: {
			xs: ['XS', '155-165', '80-90', '71-78', '80-90', '50-60'],
			s: ['S', '160-170', '85-95', '76-86', '87-97', '55-70'],
			m: ['M', '165-175', '90-100', '81-91', '91-101', '60-80'],
			ml: ['ML', '170-180', '95-105', '86-96', '96-106', '70-90'],
			l: ['L', '175-185', '95-105', '91-101', '102-112', '80-100'],
			xl: ['XL', '180-190', '105-115', '96-106', '115-125', '90-105'],
			xxl: ['XXL', '110-120', '101-111', '120-130', '95-110', '95-110'],
		},
		imperial: {
			xs: ['XS', `5'1"-5'5"`, `32"-35"`, `28"-31"`, `32"-35"`, `110-130`],
			s: ['S', `5'3"-5'7"`, `33"-37"`, `30"-34"`, `34"-38"`, `120-155`],
			m: ['M', `5'5"-5'9"`, `35"-39"`, `32"-36"`, `36"-40"`, `130-175`],
			ml: ['ML', `5'7"-5'11"`, `37"-41"`, `34"-38"`, `38"-42"`, `155-195`],
			l: ['L', `5'9"-6'1"`, `37"-41"`, `36"-40"`, `40"-44"`, `175-220`],
			xl: ['XL', `5'11"-6'3"`, `41"-45"`, `38"-42"`, `45"-49"`, `195-230`],
			xxl: ['XXL', `6'1"-6'5"`, `43"-47"`, `40"-44"`, `47"-51"`, `210-245`],
		},
	},
};

const fins = {
	xss: {
		size: 'XS/S',
		usWomens: '4-6.5',
		usMens: '3-5.5',
		ukWomens: '1.5-4',
		ukMens: '2-4.5',
		eu: '35-37',
	},
	sm: {
		size: 'S/M',
		usWomens: '7.5-9',
		usMens: '6-7.5',
		ukWomens: '5-6.5',
		ukMens: '5-6.5',
		eu: '38-40',
	},
	ml: {
		size: 'M/L',
		usWomens: '9.5-11',
		usMens: '8-9.5',
		ukWomens: '7-8.5',
		ukMens: '7-9',
		eu: '41-43',
	},
	lxl: {
		size: 'L/XL',
		usWomens: '11.5-14.5',
		usMens: '10-13',
		ukWomens: '9-12',
		ukMens: '9.5-12',
		eu: '44-47',
	},
};

// Define the elements to be used
const ELEMENTS = ['ladies', 'mens'];
const METRIC = 'metric';
const IMPERIAL = 'imperial';

// Create a configuration object for each sex
const config = ELEMENTS.reduce((acc, sex) => {
	const label = document.querySelector(`#${sex}Wetsuit .form-check-label`);
	const checkbox = document.querySelector(`#${sex}Wetsuit .form-check-input`);
	const table = document.querySelector(`#${sex}Wetsuit tbody`);

	if (!label || !checkbox || !table) {
		console.error(`Missing DOM elements for ${sex}`);
		return acc;
	}

	acc[sex] = { label, checkbox, table };
	return acc;
}, {});

// Function to create a table cell
const createCell = (detail) => {
	const cell = document.createElement('td');
	cell.textContent = detail;
	return cell;
};

// Function to create a table row
const createRow = (size) => {
	const row = document.createElement('tr');
	size.map(createCell).forEach((cell) => row.appendChild(cell));
	return row;
};

// Function to populate the table with data
const populateTable = (sex, units) => {
	if (!wetsuit || !wetsuit[sex] || !wetsuit[sex][units]) {
		console.error(`Invalid sex or units: ${sex}, ${units}`);
		return;
	}
	const rows = Object.values(wetsuit[sex][units]).map(createRow);
	rows.forEach((row) => config[sex].table.appendChild(row));
};

// Function to update the table based on the selected sex and units
const updateTable = (sex, units) => {
	if (!config[sex]) {
		console.error(`Invalid sex: ${sex}`);
		return;
	}
	config[sex].table.innerHTML = '';
	config[sex].label.innerHTML = `${units} &nbsp;`;
	populateTable(sex, units);
};

// Function to check the checkbox and update the table accordingly
const checkboxCheck = (sex) => {
	if (!config[sex]) {
		console.error(`Invalid sex: ${sex}`);
		return;
	}
	const units = config[sex].checkbox.checked ? METRIC : IMPERIAL;
	updateTable(sex, units);
};

// Add event listeners for each sex
ELEMENTS.forEach((sex) => {
	if (!config[sex]) return;
	checkboxCheck(sex);
	config[sex].checkbox.addEventListener('change', () => checkboxCheck(sex));
	config[sex].label.addEventListener('click', (event) => {
		event.preventDefault();
		config[sex].checkbox.checked = !config[sex].checkbox.checked;
		checkboxCheck(sex);
	});
});

// Populate #fins table with data
const finsTable = document.querySelector('#fins tbody');
const finsRows = Object.values(fins).map((fin) => {
	const row = document.createElement('tr');
	['size', 'usWomens', 'usMens', 'ukWomens', 'ukMens', 'eu'].map((key) => {
		const cell = document.createElement('td');
		cell.textContent = fin[key];
		row.appendChild(cell);
	});
	finsTable.appendChild(row);
});
