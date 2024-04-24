const snorkelCards = document.querySelector('#snorkelCards');
const cenoteCards = document.querySelector('#cenoteCards');

function createElement(tag, classes = [], text = '') {
	const element = document.createElement(tag);
	element.classList.add(...classes);
	element.textContent = text;
	return element;
}

if (snorkelCards !== null) {
	for (const key in snorkelPricing) {
		const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
		const cardImg = createElement('img', ['card-img-top']);
		const cardBody = createElement('div', ['card-body']);
		const cardTitle = createElement('h3', ['card-title'], snorkelPricing[key].name);
		const cardDeco = createElement('div', ['navScore']);
		const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
		const cardLink = createElement('a');
		const cardBtn = createElement('button');

		cardImg.src = snorkelPricing[key].cardImg;
		cardImg.alt = snorkelPricing[key].name;

		cardBtn.textContent = snorkelPricing[key].href ? 'More Info' : 'Page coming soon';
		cardLink.href = snorkelPricing[key].href || '#';

		const details = [
			'<span>Transport:</span> Included',
			`<span>Boat Dpt:</span> ${snorkelPricing[key].boatDpt}`,
			`<span>Duration:</span> ${revertTime(convertTime(snorkelPricing[key].departureD1) - convertTime(snorkelPricing[key].boatDpt))} hrs`,
			`<span>Min Age:</span> ${snorkelPricing[key].minAge} yrs`,
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
		snorkelCards.appendChild(card);
	}
}

if (cenoteCards !== null) {
	for (const key in cenotePricing) {
		if (key != 'extras' && key != 'cenoteBasics' && key != 'calcCost') {
			const card = createElement('div', ['card', 'flex-fill', 'm-auto']);
			const cardImg = createElement('img', ['card-img-top']);
			const cardBody = createElement('div', ['card-body']);
			const cardTitle = createElement('h3', ['card-title'], cenotePricing[key].name);
			const cardText = createElement('ul', ['card-text', 'list-group', 'list-group-flush']);
			const cardLink = createElement('a');
			const cardBtn = createElement('button');
			const cost = cenotePricing[key].cost;
			const cashPrice = roundUp(cost * cenotePricing[key].profitPercent);

			cardImg.src = cenotePricing[key].cardImg;
			cardImg.alt = cenotePricing[key].name;

			cardBtn.textContent = cenotePricing[key].href ? 'More Info' : 'Page coming soon';
			cardLink.href = cenotePricing[key].href || '#';

			const details = [`<span>Aka:</span> ${cenotePricing[key].aka}`, `<span>Transport:</span> ${cenotePricing[key].transport}`, `<span>Max depth:</span> ${cenotePricing[key].depth}`, `<span>Card Price:</span> U$${roundUp(cashPrice * 1.16)}`, `<span>Cash Price:</span> U$${roundUp(cashPrice)}`];
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
}
