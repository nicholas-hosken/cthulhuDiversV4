let q = 0;
let client;
let emailScripts = {};

const populateEmailScripts = () => {
	if (cenoteTable.rows[3] !== undefined) {
		emailScripts = {
			cenoteDiver: {
				cenote1: 'Cenotes',
				cenote2: '- 2 Tanks - Daily',
				cenote3: 'Pick up at',
				cenote4: '7:30',
				cenote5: '2 diver minimum',
				cenote6: `Deposit: $${cenotePricing.chacMool.deposit} - $${cenotePricing.dosOjos.deposit} pp (depending on the cenote)`,
				cenote7: `The Mexican state of Quintana Roo is home to the 5 largest underwater cave systems in the world and is somewhat of a mecca for cave and cavern diving. Each cenote 
					really does have its own little reason why it's magical but Chac Mool seems to be the one our clients really enjoy the most. I believe the reason behind this is that it 
					has a little bit of everything with the first dive being a combo of cavern and mangrove and the second being a full penetration with speleothems (stalagmites & 
					stalactites), fossils, beautiful beams of light, large rooms, tight rooms and even a room with an air pocket where you can surface whilst still underground. Please note 
					however that a limited number of guides are allowed to dive here so booking in advance is essential.`,
				cenote8: `This being said, if you have another cenote you would like to visit, you need only let me know and I will get back to you with the details. For instance, Dos Ojos is 
					another very popular site as it has been featured in pretty much all Hollywood and IMAX cave diving movies and is a really easy dive for those who struggle with 
					equalising. Both entrances at this cenote are also home to hundreds of little bats which swoop over your head as you begin your own Indiana Jones adventure into the 
					Mayan Underworld.`,
				cenote9: 'Below is a list of our most popular cenotes with their prices per diver:',
				cenote10: `Angelita: ${cenotePricing.angelita.depth} - (2 tanks) - U$${cenoteTable.rows[3].cells[7].textContent} (Cash: U$${cenoteTable.rows[3].cells[3].textContent})`,
				cenote11: `Actun Ha (aka: Carwash): ${cenotePricing.actunHa.depth} - (2 tanks) - U$${cenoteTable.rows[2].cells[7].textContent} (Cash: U$${cenoteTable.rows[2].cells[3].textContent})`,
				cenote12: `Chac Mool: ${cenotePricing.chacMool.depth} - (2 tanks) - U$${cenoteTable.rows[5].cells[7].textContent} (Cash: U$${cenoteTable.rows[5].cells[3].textContent})`,
				cenote13: `Dos Ojos: ${cenotePricing.dosOjos.depth} - (2 tanks) - U$${cenoteTable.rows[6].cells[7].textContent} (Cash: U$${cenoteTable.rows[6].cells[3].textContent})`,
				cenote14: `Tajma Ha: (aka: Taj Mahal) ${cenotePricing.tajmaHa.depth} - (2 tanks) - U$${cenoteTable.rows[12].cells[7].textContent} (Cash: U$${cenoteTable.rows[12].cells[3].textContent})`,
				cenote15: `Zapote: (Aka: Hell's Bells) ${cenotePricing.zapote.depth} - (2 tanks) - U$${cenoteTable.rows[13].cells[7].textContent} (Cash: U$${cenoteTable.rows[13].cells[3].textContent})`,
				cenote16: 'Again, if there is another cenote which catches your interest, please let me know and I will get back to you with the pricing and schedule.',
			},
			certifiedDiver: {
				cert1: 'Your dive options at this time of year are as follows:',
				cert2: 'Musa',
				cert3: '- 2 Tanks - Daily',
				cert4: '26ft / 8m - Afternoon dive, pick up at',
				cert5: '11:30ish (Exact time depends on where you are staying)',
				cert6: `Deposit: $${oceanTable.rows[3].cells[2].textContent} pp`,
				cert7: `Musa is hands down our most popular tour as it is both the world's largest underwater museum and is really close to Isla Mujeres which protects it from heavy currents 
					making it a relatively easy dive for clients who haven't been in the water for a while and would like to ease themselves back in. After the dive at Musa, you will also 
					have a second dive included at either Jardines Reef, Manchones Grande Reef or my own personal Cancún favourite, Manchones Chico Reef. All three sites are absolutely 
					teeming with life but the latter has a large number of French and Bluestriped Grunt who school together with Schoolmaster Snapper; this combination of yellow and white 
					fish against the deep turquoise makes for some stunning photos. It is also a great place to be on the lookout for the turtles which are released into the area by 
					Tortugranja, a turtle sanctuary on the island. Alternatively if you wish to skip the museum and dive two reefs instead, simply let me know and I will sort out the 
					logistics on my end. The price for this tour is U$${oceanTable.rows[3].cells[7].textContent} or, if paid in cash, U$${oceanTable.rows[3].cells[3].textContent} per diver.`,
				cert8: 'Musa is also a great option if you are travelling with any non-divers who would like to give the sport a try. We would need to pick them up at',
				cert9: '10',
				cert10: `ish, bring them to our swimming pool and throw them in the water to practise a few basic skills with a PADI instructor. Once they have shown the instructor that they can 
					complete these skills, they would be allowed to join you on the dive under the direct supervision of the said instructor. This pool lesson is an additional 
					U$${courseTable.rows[3].cells[3].textContent - oceanTable.rows[3].cells[3].textContent} per diver on top of the tour price.`,
				cert11: 'Arrecifes afuera (The Outside Reefs)',
				cert12: '- 2 Tanks - Monday, Wednesday, Friday and Sunday',
				cert13: '55ft / 17m - Morning dive, pick up at',
				cert14: '7:15',
				cert15: `Deposit: $${oceanTable.rows[3].cells[2].textContent} pp`,
				cert16: `Cancún is situated at the very northern tip of the Mesoamerican Reef, the world's third largest barrier reef system, so we have a few options for you to choose from 
					 outside the gulf area between Cancún and Isla Mujeres. Whilst this area isn't nearly as rich in green or hawksbill turtles, we do see the odd loggerhead turtle and 
					 divers are far, far more likely to come across nurse and black tip reef sharks. As there are a host of different sites to visit in this area, if you have dove in 
					 Cancun before and can supply us with the names of the locations you last visited, we should be able to work with you to ensure that you get to explore some new 
					 sites. The price for these dives on the Outside Reefs is U$${oceanTable.rows[3].cells[7].textContent} (cash: U$${oceanTable.rows[3].cells[3].textContent}) per person.`,
				cert17: 'Shipwreck & Reef',
				cert18: '- 2 Tanks - Tuesday, Thursday, Saturday',
				cert19: '80ft / 24m - Morning dive, pick up at',
				cert20: '7:15',
				cert21: `Deposit: $${oceanTable.rows[3].cells[2].textContent} pp`,
				cert22: `The AM-283 USS Ransom (AKA: The C55 Juan de la Barrera) is an old US WW2 minesweeping vessel which was sunk specifically for scuba diving. This means that all the 
					 wiring and guts have been completely removed from the inside allowing you to venture in and fully explore the vessel without any additional diving certification. We 
					 will then be doing a second dive at Grampin Reef which is rich in bright coral formations and even has a couple of swim-throughs. Please note that both of these dive 
					 sites often experience some heavy currents and so divers should be absolutely comfortable with their equalising skills in order to make a quick descent. The price for 
					 these two dives is also U$${oceanTable.rows[3].cells[7].textContent} (cash: U$${oceanTable.rows[3].cells[3].textContent}) per diver.`,
			},
			closing: {
				close1: 'Booking',
				close2: `Finally, to make a booking, simply drop us a line with the details of where and when you would like to do your dive along with the name under which you booked 
						  your hotel (we will need it to get through hotel security). In turn, we will get back to you with a confirmation of your schedule and a PayPal link by which to 
						  make the deposit. We would also ask if you would like to make any cancellations/amendments, that you please let us know 48hrs in advance as we will typically 
						  purchase your entrance to the national park (all our dives take place in a protected area) the day before.`,
				close3: `Hopefully the above covers everything you wished to know. If you do have any further questions though, please feel free to drop me another line or give me a shout on the 
						  mobile number below.`,
				close4: 'Regards,',
			},
			cozumel: {
				cozumel1: 'Cozumel',
				cozumel2: '- 2 Tanks - Daily',
				cozumel3: 'Morning dive, pick up at',
				cozumel4: '6:15',
				cozumel5: '2 diver minimum',
				cozumel6: `Deposit: $${oceanTable.rows[4].cells[2].textContent} pp`,
				cozumel7: `There is obviously a bit of travelling involved so we are recommending that we begin the tour with a pick up from your hotel at 6:30 so that we can get to the dive 
					boat by 8. In order to save time, it would also be ideal if we could get your fin (shoe) and wetsuit sizes beforehand so that your guide can pick up the gear on route 
					to your hotel. You can find our wetsuit size chart`,
				cozumel8: `here`,
				cozumel9: '.',
				cozumel10: `While diving in Cancún you will find things are very relaxed as your dive guide will set your gear up for you, help with donning your equipment and do pretty much 
					everything slowly so that everyone is relaxed when we hit the water. The Cozumel tour however is a little more structured as we have a very specific time slot, set by the 
					national park, which we need to adhere to. With this in mind, we ask that our divers who feel competent in setting up their own gear help us by doing so before the boat 
					launches. That being said, we will, of course, help you if you aren't yet comfortable putting their equipment together and do a quick double check on those who are.`,
				cozumel11: `As for the dives themselves, Cozumel has more than 30 so our captain will take into account the weather conditions and discuss the best options with your dive guide. If 
					you have a particular site you would like to visit, please let us know when we pick you up so that your guide can discuss the possibility of visiting the site with our 
					captain. Regardless of which sites you visit, we'll typically have more than 100ft / 30m of viz for each dive. Our first will be a deep dive of at least 78ft / 24m 
					(though we won't push you to reach that depth if you aren't comfortable as there is plenty to see at the 52ft / 16m mark). To keep with scuba diving standards and to 
					reduce surface interval times, our second dive will have a max depth of 40ft / 12m.`,
				cozumel12: `The list price for this tour is U$${oceanTable.rows[4].cells[7].textContent} per person but if you would like to take advantage of the Cthulhu Divers cash discount 
					the price comes down to U$${oceanTable.rows[4].cells[3].textContent} per person.`,
			},
			opening: {
				open1: 'Hi',
				open2: 'Thank you for getting in touch.',
				open3: `Yes, Cthulhu Divers can most definitely facilitate you with some diving during your stay. Furthermore, our operation works a little different to our competitors in that 
					<strong>our advertised prices include everything you might need to make your dives with no hidden costs. This includes all the necessary diving equipment, wetsuits, reef 
					preservation & national park fees and, most importantly, all transportation</strong>. In other words, with Cthulhu Divers, all you need to worry about is meeting us in 
					front of `,
				open4: 'your hotel',
				open5: 'lobby at the allotted time as we will take care of absolutely everything else.',
			},
			whaleShark: {
				whaleS1: 'Whale Shark Snorkelling',
				whaleS2: '- Daily',
				whaleS3: 'Pick up at',
				whaleS4: '7:15',
				whaleS5: `Deposit: $${snorkelTable.rows[4].cells[2].textContent} pp`,
				whaleS6: `While you didn't explicitly mention whales sharks in your message, you may also be interested to know that you are visiting Cancún bang in the middle of our whale shark 
					season. Cancún is actually home to the largest aggregation of these magnificent creatures in the world and similarly our parent company is the largest whale shark snorkel 
					tour operator in the world which means we often work with National Geographic in helping their staff tag these gentle giants. In return they give us the gizmos to track 
					and find them ourselves which gives us quite an edge over our competition in locating them.`,
				whaleS7: `The tour also includes a short visit to Playa Norte on the island of Isla Mujeres which is consistently voted as one of the top beaches in the world last year on TripAdvisor. Here 
					you will also be given the option to do a quick snorkel at Mia Reef or simply laze on the boat or the white sandy beach. The price of this tour is 
					U$${snorkelTable.rows[4].cells[7].textContent} (cash: U$${snorkelTable.rows[4].cells[3].textContent}) plus a further U$${snorkelPricing.whaleShark.dockFee} national park fee which needs to be paid in cash upon arrival at the dock to a park representative.`,
			},
		};
	}
};

const amendScript = (producedScript) => {
	const knownCaution = document.querySelector('#known-caution');

	// Remove the client name if it is 'Unknown'
	if (client.name === 'Unknown') {
		const snippetClientName = producedScript.querySelector('#snippet-client-name');
		snippetClientName.textContent = '';
	}

	// If the hotel name does not equal 'Not Applicable', add the hotel name to the script
	if (client.hotel !== 'Not Applicable') {
		const snippetClientHotel = producedScript.querySelector('#snippet-client-hotel');
		snippetClientHotel.textContent = `the ${client.hotel}`;

		const travelTimeSB = hotelList[client.hotelKey].sb805;
		const travelTimePDC = '';
		const snippetClientHotelAfternoonTime = producedScript.querySelector('#snippet-client-hotel-afternoon-time');
		const snippetClientHotelAfternoonTime2 = producedScript.querySelector('#snippet-client-hotel-afternoon-time2');
		const snippetClientHotelMorningTime = producedScript.querySelector('#snippet-client-hotel-morning-time');
		const snippetClientHotelDSDTime = producedScript.querySelector('#snippet-client-hotel-dsd-time');
		const snippetClientCozumelTime = producedScript.querySelector('#snippet-client-cozumel-time');

		if (travelTimeSB === 999) {
			knownCaution.innerHTML =
				knownCaution.innerHTML +
				`Please note that we do not have a official pick up time for this tour from this hotel on our system. This very likely means that this client is staying too far away 
                for us to offer this service.<br /><br />
                <strong> Please check if their location is within our pick up range and adjust the pick up time accordingly or ask Nick H.</strong><br />`;
			knownCaution.style.display = 'block';
		} else {
			snippetClientHotelAfternoonTime.textContent = `${revertTime(convertTime(oceanPricing.certified.arrivalD1) - travelTimeSB)}`;
			snippetClientHotelAfternoonTime2.textContent = snippetClientHotelAfternoonTime.textContent;
			snippetClientHotelMorningTime.textContent = `${revertTime(convertTime(oceanPricing.certified.arrivalD2) - travelTimeSB)}`;
			snippetClientHotelDSDTime.textContent = `${revertTime(convertTime(coursePricing.dsd.arrivalD1) - travelTimeSB)}`;
			snippetClientCozumelTime.textContent = `${revertTime(convertTime(oceanPricing.cozumel.arrivalD1) - travelTimeSB)}`;
		}
	}

	// If the #known-client-message-type textContent is 'whatsapp', add the WhatsApp message to the script
	if (client.messageType === 'Whatsapp') {
		const snippetClientMessageType = producedScript.querySelector('#snippet-client-message-type');

		snippetClientMessageType.textContent = `Hopefully the above covers everything you wished to know. If you do have any further questions though, please feel free to write back 
												here on Whatsapp or give us a shout on this number and ask for Nick H.`;

		// Run through poducedScript and find all instances of <strong> and </strong> replace them with *
		producedScript.innerHTML = producedScript.innerHTML.replace(/<\/?strong>/g, '*');
		// Run through poducedScript and find all instances of <span class="whatsapp-underscore"></span> and replace with <span class="whatsapp-underscore">_</span>
		producedScript.innerHTML = producedScript.innerHTML.replace(/<span class="whatsapp-underscore"><\/span>/g, '<span class="whatsapp-underscore">_</span>');
	}
};

const giveScript = () => {
	let arrDep = seasonalToursCheck();

	producedScript.id = 'produced-script';

	producedScript.innerHTML = `
        <p>${emailScripts.opening.open1}<span id="snippet-client-name"> ${client.nameShort}</span>,</p>
        <p>${emailScripts.opening.open2}</p>
		<p>${emailScripts.opening.open3} <span id="snippet-client-hotel">${emailScripts.opening.open4}</span> ${emailScripts.opening.open5}</p>
        <p>${emailScripts.certifiedDiver.cert1}</p>
        <p>
            <strong><a href="https://cthulhudivers.com/dive-sites/musa-cancuns-underwater-museum" target="_blank">${emailScripts.certifiedDiver.cert2}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert3}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert4} <span id="snippet-client-hotel-morning-time">${emailScripts.certifiedDiver.cert5}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert6}<span class="whatsapp-underscore"></span></em>
        </p>
		<p>${emailScripts.certifiedDiver.cert7}</p>
        <p>${emailScripts.certifiedDiver.cert8} <span id="snippet-client-hotel-dsd-time">${emailScripts.certifiedDiver.cert9}</span>${emailScripts.certifiedDiver.cert10}</p>
        <p>
            <strong>${emailScripts.certifiedDiver.cert11}</strong> <em><span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert12}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert13} <span id="snippet-client-hotel-afternoon-time">${emailScripts.certifiedDiver.cert14}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert15}<span class="whatsapp-underscore"></span></em>
        </p>
        <p>${emailScripts.certifiedDiver.cert16}</p>
        <p>
            <strong><a href="https://cthulhudivers.com/dive-sites/c55-juan-de-la-barrera-wreck-cancun" target="_blank">${emailScripts.certifiedDiver.cert17}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert18}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert19} <span id="snippet-client-hotel-afternoon-time2">${emailScripts.certifiedDiver.cert20}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${emailScripts.certifiedDiver.cert21}<span class="whatsapp-underscore"></span></em>
        </p>
        <p>${emailScripts.certifiedDiver.cert22}</p>
        `;

	// If the number of pax is greater than 1, add cenote info to the script
	if (client.pax > 1) {
		producedScript.innerHTML =
			producedScript.innerHTML +
			`
            <p><strong><a href="https://cthulhudivers.com/cancun-cozumel" target="_blank">${emailScripts.cozumel.cozumel1}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.cozumel.cozumel2}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cozumel.cozumel3} <span id="snippet-client-cenote-time">${emailScripts.cozumel.cozumel4}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cozumel.cozumel5}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cozumel.cozumel6}<span class="whatsapp-underscore"></span>
			</em></p>
            <p>${emailScripts.cozumel.cozumel7} <a href="https://cthulhudivers.com/cancun-cozumel#wetsuitSelection" target="_blank">${emailScripts.cozumel.cozumel8}</a>${emailScripts.cozumel.cozumel9}</p>
            <p>${emailScripts.cozumel.cozumel10}</p>
            <p>${emailScripts.cozumel.cozumel11}</p>
            <p>${emailScripts.cozumel.cozumel12}</p>

            <p><strong><a href="https://cthulhudivers.com/cancun-cenote-cavern-diving" target="_blank">${emailScripts.cenoteDiver.cenote1}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.cenoteDiver.cenote2}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cenoteDiver.cenote3} <span id="snippet-client-cozumel-time">${emailScripts.cenoteDiver.cenote4}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cenoteDiver.cenote5}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${emailScripts.cenoteDiver.cenote6}<span class="whatsapp-underscore"></span>
			</em></p>
            <p>${emailScripts.cenoteDiver.cenote7}</p>
            <p>${emailScripts.cenoteDiver.cenote8}</p>
            <p>${emailScripts.cenoteDiver.cenote9}</p>
            <p>${emailScripts.cenoteDiver.cenote10}<br />
            ${emailScripts.cenoteDiver.cenote11}<br />
            ${emailScripts.cenoteDiver.cenote12}<br />
            ${emailScripts.cenoteDiver.cenote13}<br />
            ${emailScripts.cenoteDiver.cenote14}<br />
            ${emailScripts.cenoteDiver.cenote15}<br />            
            </p>
            <p>${emailScripts.cenoteDiver.cenote16}</p>
            `;
	}

	// If the client is arriving during whale shark season, add whale shark info to the script
	if (arrDep === 'whaleShark') {
		producedScript.innerHTML =
			producedScript.innerHTML +
			`
					<p><strong><a href="https://cthulhudivers.com/cancun-whale-shark-snorkeling" target="_blank">${emailScripts.whaleShark.whaleS1}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.whaleShark.whaleS2}<span class="whatsapp-underscore"></span><br />
					<span class="whatsapp-underscore"></span>${emailScripts.whaleShark.whaleS3} ${emailScripts.whaleShark.whaleS4}<span class="whatsapp-underscore"></span><br />
					<span class="whatsapp-underscore"></span>${emailScripts.whaleShark.whaleS5}<span class="whatsapp-underscore"></span>
					</em></p>
					<p>${emailScripts.whaleShark.whaleS6}</p>
					<p>${emailScripts.whaleShark.whaleS7}</p>
					`;
	}

	producedScript.innerHTML =
		producedScript.innerHTML +
		`
		<p><strong>${emailScripts.closing.close1}</strong></p>
		<p>${emailScripts.closing.close2}</p>
		<p> <span id="snippet-client-message-type">${emailScripts.closing.close3}</span> </p>
		<p>${emailScripts.closing.close4}</p>
		`;

	outputScriptBtns.forEach((btn) => {
		btn.style.display = 'block';
	});

	amendScript(producedScript);
	outputScript.style.display = 'block';

	outputScript.appendChild(producedScript);
	newClientBtn.addEventListener('click', function () {
		locations.value = '0';
		necroMenuBtns.forEach((btn) => {
			btn.classList.remove('active');
		});
		hideInfo();
		resetValues();
		necroMenu.style.display = 'none';
	});
	clipboardBtn.addEventListener('click', copyToClipboard);
};

// copy text the user has inputed into #client-name and display it in #known-client-name
const copyClientName = () => {
	console.log(clientName.value);
	let name = clientName.value.toLowerCase();
	name = name.split(' ');

	if (name[0] != '') {
		for (let i = 0; i < name.length; i++) {
			name[i] = name[i][0].toUpperCase() + name[i].substr(1);
		}
	} else {
		name = ['Unknown'];
	}
	client.nameShort = name[0];

	client.name = name.join(' ');
	knownClientName.textContent = client.name;
	q++;
	showQuestion(q);
};

// Get the value of the selected hotel and display it in #known-client-hotel
const copyClientHotel = () => {
	resetValues();

	if (locations.value == 'notApplicable') {
		client.hotel = 'Not Applicable';
	} else {
		client.hotel = hotelList[locations.value].name;
		client.hotelKey = locations.value;
	}
	knownClientHotel.textContent = client.hotel;
};

// Get the number of pax and display it in #known-client-pax
const copyClientPax = () => {
	client.pax = Number(clientPax.value);
	knownClientPax.textContent = client.pax;

	q++;
	showQuestion(q);
};

// Prevent the user from selecting an arrival date before today on #known-client-arrival-date
const preventPastArrivalDateSelection = () => {
	// Get today's date
	const today = new Date();
	// Format today's date as YYYY-MM-DD
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0');
	const yyyy = today.getFullYear();
	const minDate = `${yyyy}-${mm}-${dd}`;
	// Set the minimum selectable arrival date to today
	clientArrivalDate.min = minDate;
};
preventPastArrivalDateSelection();

// Set the minimum selectable departure date to the selected arrival date on #known-client-departure-date
const setMinDepartureDate = () => {
	// Set the minimum selectable departure date to the selected arrival date
	clientDepartureDate.min = clientArrivalDate.value;
};

// Get the client arrival date and display it in #known-client-arrival-date
const copyClientArrivalDate = () => {
	client.arrivalDate = clientArrivalDate.value;
	knownClientArrivalDate.textContent = client.arrivalDate;

	setMinDepartureDate();
	q++;
	showQuestion(q);
};

// Get the client departure date and display it in #known-client-departure-date
const copyClientDepartureDate = () => {
	client.departureDate = clientDepartureDate.value;
	knownClientDepartureDate.textContent = client.departureDate;

	q++;
	showQuestion(q);
};

// Get the message type and display it in #known-client-message-type
const copyMessageType = () => {
	client.messageType = clientMessageType.value;
	knownClientMessageType.textContent = client.messageType;

	q++;
	showQuestion(q);
};

// Check to see if either #known-client-arrival-dates or #known-client-departure-dates fall on an available seaonsal tour
const seasonalToursCheck = () => {
	const knownClientArrivalDateArray = knownClientArrivalDate.textContent.split('-');
	const knownClientDepartureDateArray = knownClientDepartureDate.textContent.split('-');
	// Whale shark season - June 1st and September 16th
	if (
		(knownClientArrivalDateArray[1] >= 6 && knownClientArrivalDateArray[1] <= 8) ||
		(knownClientDepartureDateArray[1] >= 6 && knownClientDepartureDateArray[1] <= 8) ||
		(knownClientArrivalDateArray[1] == 9 && knownClientArrivalDateArray[2] <= 16) ||
		(knownClientArrivalDateArray[1] == 9 && knownClientArrivalDateArray[2] <= 16) ||
		(knownClientDepartureDateArray[1] == 9 && knownClientDepartureDateArray[2] <= 16)
	) {
		return 'whaleShark';
	}
};

// Reset all select and input values
const resetValues = () => {
	clientName.value = '';
	clientPax.value = '0';
	clientArrivalDate.value = '';
	clientDepartureDate.value = '';
	clientMessageType.value = '0';

	if (q != 0) {
		q = 0;
		knownCaution.innerHTML = '';
		knownCaution.style.display = 'none';
		outputScript.style.display = 'none';
		outputScriptBtns.forEach((btn) => {
			btn.style.display = 'none';
		});
	}

	//reset all known info data
	client = {};
	knownInfoData.forEach((data) => {
		data.textContent = '';
	});
	showQuestion(q);
};

// Copy the text from #produced-script to the clipboard
const copyToClipboard = () => {
	const range = document.createRange();
	range.selectNode(producedScript);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
};

// Question event listeners
const questionListeners = () => {
	submitClientName.addEventListener('click', copyClientName);
	locations.addEventListener('change', copyClientHotel);
	clientPax.addEventListener('change', copyClientPax);
	clientArrivalDate.addEventListener('change', copyClientArrivalDate);
	clientDepartureDate.addEventListener('change', copyClientDepartureDate);
	clientMessageType.addEventListener('change', copyMessageType);
};
questionListeners();

// Show questions based on the value of q
const showQuestion = (q) => {
	questions.forEach((question) => {
		question.style.display = 'none';
	});

	if (q >= questions.length) {
		return giveScript();
	}

	questions[q].style.display = 'block';
};
showQuestion(q);
