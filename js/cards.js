const heroH1 = document.querySelector('.hero h1').textContent.split(' ')[0].toLowerCase();
const cenoteCards = document.querySelector('#cenoteCards');
const courseCards = document.querySelector('#courseCards');
const nonDivingCards = document.querySelector('#nonDivingCards');
const oceanCards = document.querySelector('#oceanCards');
const snorkelCards = document.querySelector('#snorkelCards');
const transportCards = document.querySelector('#transportCards');

function createElement(tag, classes = [], text = '') {
	const element = document.createElement(tag);
	element.classList.add(...classes);
	element.textContent = text;
	return element;
}

const populateTransportCards = (tour) => {
	const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
	const cardImg = createElement('img', ['card-img-top']);
	const cardBody = createElement('div', ['card-body']);
	const cardTitle = createElement('h3', ['card-title']);
	const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
	const cardLink = createElement('a');
	const cardBtn = createElement('button');

	cardImg.src = nonDivingPricing.cancunaMataTransfers.cardImg;
	cardImg.alt = nonDivingPricing.cancunaMataTransfers.name;

	cardTitle.textContent = tour;

	cardBtn.textContent = nonDivingPricing.cancunaMataTransfers.href ? 'More Info' : 'Page coming soon';
	cardLink.href = nonDivingPricing.cancunaMataTransfers.href || '#';

	const details = ['with', '<span>CANCUNA MATATA</span>', '<span>TRANSFERS</span>'];
	details.forEach((detail) => {
		const li = createElement('li');
		li.innerHTML = `${detail}`;
		cardText.appendChild(li);
	});

	card.appendChild(cardImg);
	cardBody.append(cardTitle, cardText);
	cardLink.appendChild(cardBtn);
	cardBody.appendChild(cardLink);
	card.appendChild(cardBody);
	transportCards.appendChild(card);
};

const populateCards = () => {
	// const cardsMenu = document.querySelector('#cardsMenu').querySelectorAll('.d-flex');

	const cardsMenu = document.querySelector('.cardsMenu').querySelectorAll('.d-flex');
	cardsMenu[0].innerHTML = '';

	if (transportCards !== null) {
		populateTransportCards('Round Trip Shuttle Service');
		populateTransportCards('One Way Shuttle Service');
	}

	if (courseCards !== null) {
		for (const key in coursePricing) {
			if (coursePricing[key].cardImg !== undefined) {
				const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
				const cardImg = createElement('img', ['card-img-top']);
				const cardBody = createElement('div', ['card-body']);
				const cardTitle = createElement('h3', ['card-title'], coursePricing[key].name);
				const cardDeco = createElement('div', ['navScore']);
				const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
				const cardLink = createElement('a');
				const cardBtn = createElement('button');
				const cost = coursePricing[key].cost;
				const cashPrice = roundUp(cost * coursePricing[key].profitPercent);

				cardImg.src = coursePricing[key].cardImg;
				cardImg.alt = coursePricing[key].name;

				cardBtn.textContent = coursePricing[key].href ? 'More Info' : 'Page coming soon';
				cardLink.href = coursePricing[key].href || '#';

				const details = [
					`${coursePricing[key].available}<br /><br />`,
					`<span>Transport:</span> Included`,
					`<span>Duration:</span> ${coursePricing[key].days} day`,
					`<span>Min Age:</span> ${coursePricing[key].minAge} yrs`,
					`<span>Max Depth:</span> ${coursePricing[key].maxDepth}`,
					`<span>Card Price:</span> U$${roundUp(cashPrice * 1.16)}`,
					`<span>Cash Price:</span> U$${cashPrice}`,
				];
				details.forEach((detail) => {
					const li = createElement('li');
					li.innerHTML = `${detail}`;
					cardText.appendChild(li);
				});

				card.appendChild(cardImg);
				cardBody.append(cardTitle, cardDeco, cardText);
				cardLink.appendChild(cardBtn);
				cardBody.appendChild(cardLink);
				card.appendChild(cardBody);
				courseCards.appendChild(card);
			}
		}
	}

	if (oceanCards !== null) {
		const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
		const cardImg = createElement('img', ['card-img-top']);
		const cardBody = createElement('div', ['card-body']);
		const cardTitle = createElement('h3', ['card-title'], coursePricing.refresher.name);
		const cardDeco = createElement('div', ['navScore']);
		const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
		const cardLink = createElement('a');
		const cardBtn = createElement('button');
		const cost = coursePricing.refresher.cost;
		const cashPrice = roundUp(cost * coursePricing.refresher.profitPercent);

		cardImg.src = coursePricing.refresher.cardImg;
		cardImg.alt = coursePricing.refresher.name;

		cardBtn.textContent = coursePricing.refresher.href ? 'More Info' : 'Page coming soon';
		cardLink.href = coursePricing.refresher.href || '#';

		const details = [
			`${coursePricing.refresher.available}<br /><br />`,
			'<span>Transport:</span> Included',
			`<span>Pick Up:</span> ${revertTime(convertTime(coursePricing.refresher.arrivalD1) - hotelList[heroH1].sb805)}`,
			`<span>Min Age:</span> ${coursePricing.refresher.minAge} yrs`,
			`<span>Max Depth:</span> ${coursePricing.refresher.maxDepth}`,
			`<span>Card Price:</span> U$${roundUp(cashPrice * 1.16)}`,
			`<span>Cash Price:</span> U$${cashPrice}`,
		];
		details.forEach((detail) => {
			const li = createElement('li');
			li.innerHTML = `${detail}`;
			cardText.appendChild(li);
		});

		card.appendChild(cardImg);
		cardBody.append(cardTitle, cardDeco, cardText);
		cardLink.appendChild(cardBtn);
		cardBody.appendChild(cardLink);
		card.appendChild(cardBody);
		oceanCards.appendChild(card);

		for (const key in oceanPricing) {
			if (oceanPricing[key].cardImg !== undefined) {
				const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
				const cardImg = createElement('img', ['card-img-top']);
				const cardBody = createElement('div', ['card-body']);
				const cardTitle = createElement('h3', ['card-title'], oceanPricing[key].name);
				const cardDeco = createElement('div', ['navScore']);
				const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
				const cardLink = createElement('a');
				const cardBtn = createElement('button');
				const cost = oceanPricing[key].cost;
				const cashPrice = roundUp(cost * oceanPricing[key].profitPercent);

				cardImg.src = oceanPricing[key].cardImg;
				cardImg.alt = oceanPricing[key].name;

				cardBtn.textContent = oceanPricing[key].href ? 'More Info' : 'Page coming soon';
				cardLink.href = oceanPricing[key].href || '#';

				const details = [
					`${oceanPricing[key].available}<br /><br />`,
					'<span>Transport:</span> Included',
					`<span>Pick Up:</span> ${revertTime(convertTime(oceanPricing[key].arrivalD1) - hotelList[heroH1].sb805)}`,
					`<span>Min Age:</span> ${oceanPricing[key].minAge} yrs`,
					`<span>Max Depth:</span> ${oceanPricing[key].maxDepth}`,
					`<span>Card Price:</span> U$${roundUp(cashPrice * 1.16)}`,
					`<span>Cash Price:</span> U$${cashPrice}`,
				];
				details.forEach((detail) => {
					const li = createElement('li');
					li.innerHTML = `${detail}`;
					cardText.appendChild(li);
				});

				card.appendChild(cardImg);
				cardBody.append(cardTitle, cardDeco, cardText);
				cardLink.appendChild(cardBtn);
				cardBody.appendChild(cardLink);
				card.appendChild(cardBody);
				oceanCards.appendChild(card);
			}
		}
	}

	if (cenoteCards !== null) {
		const cenotes = cthulhuTours.cenotes;
		// populateLocations();

		for (const key in cenotes) {
			updateTourData('cenotes', `${key}`);
			const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
			const cardImg = createElement('img', ['card-img-top']);
			const cardBody = createElement('div', ['card-body']);
			const cardTitle = createElement('h3', ['card-title'], tourData.name);
			const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
			const cardLink = createElement('a');
			const cardBtn = createElement('button');

			cardImg.src = cenotes[key].cardImg;
			cardImg.alt = tourData.aka;

			cardBtn.textContent = cenotes[key].href ? 'More Info' : 'Page coming soon';
			cardLink.href = cenotes[key].href || '#';

			const details = [
				`${tourData.available}<br /><br />`,
				`<span>Aka:</span> ${tourData.aka}`,
				`<span>Max depth:</span> ${tourData.maxDepth}`,
				`<span>Transport:</span> ${tourData.transport}`,
				`<span>Card Price:</span> U$${tourData.cardPrice}`,
				`<span>Cash Price:</span> U$${tourData.cashPrice4One}`,
			];
			details.forEach((detail) => {
				const li = createElement('li');
				li.innerHTML = `${detail}`;
				cardText.appendChild(li);
			});

			card.appendChild(cardImg);
			cardBody.append(cardTitle, cardText);
			cardLink.appendChild(cardBtn);
			cardBody.appendChild(cardLink);
			card.appendChild(cardBody);
			cenoteCards.appendChild(card);
		}
	}

	if (snorkelCards !== null) {
		const snorkeling = cthulhuTours.snorkeling;
		// populateLocations();

		for (const key in snorkeling) {
			updateTourData('snorkeling', `${key}`);
			const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
			const cardImg = createElement('img', ['card-img-top']);
			const cardBody = createElement('div', ['card-body']);
			const cardTitle = createElement('h3', ['card-title'], tourData.name);
			const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
			const cardLink = createElement('a');
			const cardBtn = createElement('button');

			cardImg.src = snorkeling[key].cardImg;
			cardImg.alt = tourData.name;

			cardBtn.textContent = snorkeling[key].href ? 'More Info' : 'Page coming soon';
			cardLink.href = snorkeling[key].href || '#';

			let details = [];
			if (key === 'turtleSnorkel') {
				details = [
					`${tourData.available}<br /><br />`,
					`<span>Transport:</span> ${tourData.transport}`,
					`<span>Pick Up:</span> 5 Options`,
					`<span>Approx. Return:</span>  5 Options`,
					`<span>Min Age:</span> ${tourData.minAge} yrs`,
					`<span>Card Price:</span> U$${tourData.cardPrice}`,
					`<span>Cash Price:</span> U$${tourData.cashPrice4One}`,
				];
			} else {
				details = [
					`${tourData.available}<br /><br />`,
					`<span>Transport:</span> ${tourData.transport}`,
					`<span>Pick Up:</span> ${tourData.pickUp1}`,
					`<span>Approx. Return:</span> ${tourData.dropOff1}`,
					`<span>Min Age:</span> ${tourData.minAge} yrs`,
					`<span>Card Price:</span> U$${tourData.cardPrice}`,
					`<span>Cash Price:</span> U$${tourData.cashPrice4One}`,
				];
			}
			details.forEach((detail) => {
				const li = createElement('li');
				li.innerHTML = `${detail}`;
				cardText.appendChild(li);
			});

			card.appendChild(cardImg);
			cardBody.append(cardTitle, cardText);
			cardLink.appendChild(cardBtn);
			cardBody.appendChild(cardLink);
			card.appendChild(cardBody);
			snorkelCards.appendChild(card);
		}
	}

	if (nonDivingCards !== null) {
		for (const key in nonDivingPricing) {
			if (nonDivingPricing[key].cardImg !== undefined && nonDivingPricing[key].name !== 'Cancuna Matata Transfers') {
				const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
				const cardImg = createElement('img', ['card-img-top']);
				const cardBody = createElement('div', ['card-body']);
				const cardTitle = createElement('h3', ['card-title'], nonDivingPricing[key].name);
				const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
				const cardLink = createElement('a');
				const cardBtn = createElement('button');

				cardImg.src = nonDivingPricing[key].cardImg;
				cardImg.alt = nonDivingPricing[key].name;

				cardBtn.textContent = nonDivingPricing[key].href ? 'More Info' : 'Page coming soon';
				cardLink.href = nonDivingPricing[key].href || '#';

				if (!isNaN(nonDivingPricing[key].transport)) {
					nonDivingPricing[key].transport = `U$${nonDivingPricing[key].transport}`;
				}

				const details = [
					`<span>Available:</span>`,
					`${nonDivingPricing[key].available}<br /><br />`,
					`<span>Transport:</span> ${nonDivingPricing[key].transport}`,
					`<span>Adults:</span> U$${roundUp(nonDivingPricing[key].ticketAdult)}`,
					`<span>Kids U12:</span> U$${roundUp(nonDivingPricing[key].ticketKids)}`,
				];
				if (key === 'columbus') {
					details[2] = `<span>Lobster:</span> U$${roundUp(nonDivingPricing[key].lobster)}`;
					details[3] = `<span>Ribeye:</span> U$${roundUp(nonDivingPricing[key].ribeye)}`;
				} else if (key === 'wake') {
					details[2] = `<span>4hrs:</span> U$${roundUp(nonDivingPricing[key].halfDay)}`;
					details[3] = `<span>7hrs:</span> U$${roundUp(nonDivingPricing[key].fullDay)}`;
				}
				details.forEach((detail) => {
					const li = createElement('li');
					li.innerHTML = `${detail}`;
					cardText.appendChild(li);
				});

				card.appendChild(cardImg);
				cardBody.append(cardTitle, cardText);
				cardLink.appendChild(cardBtn);
				cardBody.appendChild(cardLink);
				card.appendChild(cardBody);
				nonDivingCards.appendChild(card);
			}
		}
	}
};
populateLocations();
populateCards();

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#locations').addEventListener('change', populateCards);
});
