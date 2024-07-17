let q = 0;
let clientInfo = {};
let emailScripts = {};
let emailInfo = {};

function processTableRows(table, category) {
	for (let i = 1; i < table.rows.length; i++) {
		const row = table.rows[i];
		const [name, cost, deposit, cashPrice, , , , cardPrice] = Array.from(row.cells, (cell) => cell.textContent);

		let nameKey = name.split(' ')[0].toLowerCase();
		if (nameKey === 'padi') {
			nameKey = name.split(' ')[1].toLowerCase();
		} else if (nameKey === 'chichen') {
			nameKey += name.split(' ')[3] + name.split(' ')[5];
		} else if (nameKey === 'tour') {
			continue;
		} else if (nameKey === 's&t') {
			nameKey = 'surfTurf';
		} else if (nameKey === 'xcaret' || nameKey === 'xoximilco') {
			nameKey += name.split(' ')[2];
		} else if (nameKey === 'xplor') {
			nameKey += name.split(' ')[1] + name.split(' ')[2] + name.split(' ')[3];
		} else if (nameKey === 'musa') {
			if (category === 'certified') {
				nameKey = 'musaDive';
			} else {
				nameKey = 'musaSnorkel';
			}
		}

		if (nameKey === 'xplor-Adultsundefined') {
			nameKey = 'xplorAdults';
		} else if (nameKey === 'xplor-Kidsundefined') {
			nameKey = 'xplorKids';
		} else if (nameKey === 'xplorFuego-Adults') {
			nameKey = 'xplorFuegoAdults';
		} else if (nameKey === 'xplorFuego-Kids') {
			nameKey = 'xplorFuegoKids';
		}

		const nameTransformations = {
			actun: 'actunHa',
			chac: 'chacMool',
			dos: 'dosOjos',
			el: 'elPit',
			puerta: 'dreamgate',
			suc: 'sucActun',
			tajma: 'tajmaHa',
			bull: 'bullShark',
			advanced: 'aow',
			discover: 'dsd',
			enriched: 'nitrox',
			open: 'ow',
			peak: 'ppb',
			scuba: 'scubaDiver',
			chichenAdultsundefined: 'chichenAdults',
			chichenKidsundefined: 'chichenKids',
			chichenBirdAdults: 'chichenEarlyAdults',
			chichenBirdKids: 'chichenEarlyKids',
			turtle: 'turtleSnorkel',
			whale: 'whaleShark',
			night: 'nightDiving',
		};

		nameKey = nameTransformations[nameKey] || nameKey;
		emailInfo[category][nameKey] = { name: name, cost: cost, deposit: deposit, cashPrice: cashPrice, cardPrice: cardPrice };
		if (category === 'cenotes') {
			emailInfo[category][nameKey].depth = cthulhuTours.cenotes[nameKey].bookingRequirements.maxDepth;
		} else if (category === 'certified') {
			if (nameKey === 'musaDive') {
				emailInfo[category][nameKey].depth = cthulhuTours.certifiedTours.musa.bookingRequirements.maxDepth;
			} else {
				emailInfo[category][nameKey].depth = cthulhuTours.certifiedTours[nameKey].bookingRequirements.maxDepth;
			}
		} else if (nameKey === 'whaleShark' || nameKey === 'turtleSnorkel') {
			emailInfo[category][nameKey].dockFee = cthulhuTours.snorkeling[nameKey].bookingRequirements.dockFee;
		}
	}
}

const populateEmailInfo = () => {
	emailInfo.certified = {};
	emailInfo.courses = {};
	emailInfo.cenotes = {};
	emailInfo.snorkeling = {};
	emailInfo.nonDiving = {};

	if (locations.value === 'notApplicable') {
		locations.value = 'adhara';
		populateTables();

		processTableRows(certifiedTable, 'certified');
		processTableRows(courseTable, 'courses');
		processTableRows(cenoteTable, 'cenotes');
		processTableRows(snorkelTable, 'snorkeling');
		processTableRows(nonDivingTable, 'nonDiving');
		locations.value = 'notApplicable';
	} else {
		processTableRows(certifiedTable, 'certified');
		processTableRows(courseTable, 'courses');
		processTableRows(cenoteTable, 'cenotes');
		processTableRows(snorkelTable, 'snorkeling');
		processTableRows(nonDivingTable, 'nonDiving');
	}
};

const populateEmailScripts = () => {
	populateEmailInfo();
	let actunHa = emailInfo.cenotes.actunHa;
	let angelita = emailInfo.cenotes.angelita;
	let chacMool = emailInfo.cenotes.chacMool;
	let dosOjos = emailInfo.cenotes.dosOjos;
	let tajmaHa = emailInfo.cenotes.tajmaHa;
	let zapote = emailInfo.cenotes.zapote;
	let mesoamerican = emailInfo.certified.mesoamerican;
	let bullShark = emailInfo.certified.bullShark;
	let cozumel = emailInfo.certified.cozumel;
	let musaDive = emailInfo.certified.musaDive;
	let nightDiving = emailInfo.certified.nightDiving;
	let wreck = emailInfo.certified.wreck;
	let dsd = emailInfo.courses.dsd;
	let whaleShark = emailInfo.snorkeling.whaleShark;

	if (cenoteTable.rows[3] !== undefined) {
		emailScripts = {
			bullShark: {
				bull1: 'Bull Sharks',
				bull2: '- 2 Tanks - Daily',
				bull3: `${bullShark.depth} - Pick up at`,
				bull4: '7:15',
				bull5: '2 diver minimum',
				bull6: `Deposit: $${bullShark.deposit} pp`,
				bull7: `From mid November to early Feb, the waters around Playa del Carmen become home to heavily pregnant Bull Sharks who take sanctuary here from the strong currents found in the 
					western Atlantic at this time of year. We offer you a once in a lifetime face-2-face encounter with these amazingly beautiful and yet painfully misunderstood creatures. This 
					tour also includes a second dive on a nearby shallow reef, rich in grunt and soldierfish, in Playa del Carmen.`,
			},
			cenoteDiver: {
				cenote1: 'Cenotes',
				cenote2: '- 2 Tanks - Daily',
				cenote3: 'Pick up at',
				cenote4: '7:30ish',
				cenote5: '2 diver minimum',
				cenote6: `Deposit: $${chacMool.deposit} - $${dosOjos.deposit} pp (depending on the cenote)`,
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
				cenote10: `Angelita: ${angelita.depth} - (2 tanks) - U$${angelita.cardPrice} (Cash: U$${angelita.cashPrice})`,
				cenote11: `Actun Ha (aka: Carwash): ${actunHa.depth} - (2 tanks) - U$${actunHa.cardPrice} (Cash: U$${actunHa.cashPrice})`,
				cenote12: `Chac Mool: ${chacMool.depth} - (2 tanks) - U$${chacMool.cardPrice} (Cash: U$${chacMool.cashPrice})`,
				cenote13: `Dos Ojos: ${dosOjos.depth} - (2 tanks) - U$${dosOjos.cardPrice} (Cash: U$${dosOjos.cashPrice})`,
				cenote14: `Tajma Ha: (aka: Taj Mahal) ${tajmaHa.depth} - (2 tanks) - U$${tajmaHa.cardPrice} (Cash: U$${tajmaHa.cashPrice})`,
				cenote15: `Zapote: (Aka: Hell's Bells) ${zapote.depth} - (2 tanks) - U$${zapote.cardPrice} (Cash: U$${zapote.cashPrice})`,
				cenote16: 'Again, if there is another cenote which catches your interest, please let me know and I will get back to you with the pricing and schedule.',
			},
			certifiedDiver: {
				cert1: 'Your dive options at this time of year are as follows:',
				cert2: 'Musa & Reef',
				cert3: '- 2 Tanks - Daily',
				cert4: `${musaDive.depth} - Afternoon dive, pick up at`,
				cert5: '11:30ish (Exact time depends on where you are staying)',
				cert6: `Deposit: $${musaDive.deposit} pp`,
				cert7: `Musa is hands down our most popular tour as it is both the world's largest underwater museum and is really close to Isla Mujeres which protects it from heavy currents
					making it a relatively easy dive for clients who haven't been in the water for a while and would like to ease themselves back in. After the dive at Musa, you will also
					have a second dive included at either Jardines Reef, Manchones Grande Reef or my own personal Cancún favourite, Manchones Chico Reef. All three sites are absolutely
					teeming with life but the latter has a large number of French and Bluestriped Grunt who school together with Schoolmaster Snapper; this combination of yellow and white
					fish against the deep turquoise makes for some stunning photos. It is also a great place to be on the lookout for the turtles which are released into the area by
					Tortugranja, a turtle sanctuary on the island. Alternatively if you wish to skip the museum and dive two reefs instead, simply let me know and I will sort out the
					logistics on my end. The price for this tour is U$${musaDive.cardPrice} or, if paid in cash, U$${musaDive.cashPrice} per diver.`,
				cert8: 'Musa is also a great option if you are travelling with any non-divers who would like to give the sport a try. We would need to pick them up at',
				cert9: '10',
				cert10: `ish, bring them to our swimming pool and throw them in the water to practise a few basic skills with a PADI instructor. Once they have shown the instructor that they can
					complete these skills, they would then be allowed to join you on the dive under the direct supervision of the said instructor. This pool lesson is an additional
					U$${dsd.cardPrice - musaDive.cardPrice} per diver on top of the tour price.`,
				cert11: 'Arrecifes afuera (The Outside Reefs)',
				cert12: '- 2 Tanks - Monday, Wednesday, Friday and Sunday',
				cert13: `${mesoamerican.depth} - Morning dive, pick up at`,
				cert14: '7:15ish',
				cert15: `Deposit: $${mesoamerican.deposit} pp`,
				cert16: `Cancún is situated at the very northern tip of the Mesoamerican Reef, the world's third largest barrier reef system, so we have a few options for you to choose from
					 outside the gulf area between Cancún and Isla Mujeres. Whilst this area isn't nearly as rich in green or hawksbill turtles, we do see the odd loggerhead turtle and
					 divers are far, far more likely to come across nurse and black tip reef sharks. As there are a host of different sites to visit in this area, if you have dove in
					 Cancun before and can supply us with the names of the locations you last visited, we should be able to work with you to ensure that you get to explore some new
					 sites. The price for these dives on the Outside Reefs is U$${mesoamerican.cardPrice} (cash: U$${mesoamerican.cashPrice}) per person.`,
				cert17: 'Shipwreck & Reef',
				cert18: '- 2 Tanks - Tuesday, Thursday, Saturday',
				cert19: `${wreck.depth} - Morning dive, pick up at`,
				cert20: '7:15ish',
				cert21: `Deposit: $${wreck.deposit} pp`,
				cert22: `The AM-283 USS Ransom (AKA: The C55 Juan de la Barrera) is an old US WW2 minesweeping vessel which was sunk specifically for scuba diving. This means that all the
					 wiring and guts have been completely removed from the inside allowing you to venture in and fully explore the vessel without any additional diving certification. We
					 will then be doing a second dive at Grampin Reef which is rich in bright coral formations and even has a couple of swim-throughs. Please note that both of these dive
					 sites often experience some heavy currents and so divers should be absolutely comfortable with their equalising skills in order to make a quick descent. The price for
					 these two dives is also U$${wreck.cardPrice} (cash: U$${wreck.cashPrice}) per diver.`,
			},
			closing: {
				close1: 'Booking',
				close2: `Finally, to make a booking, simply drop us a line with the details of where and when you would like to do your dive along with the name under which you booked
						  your hotel (we will need it to get through hotel security). In turn, we will get back to you with a confirmation of your schedule and a PayPal link by which to
						  make the deposit. We would also ask if you would like to make any cancellations/amendments, that you please let us know 48hrs in advance as we will typically
						  purchase your entrance to the national park (all our dives take place in a protected area) the day before.`,
				close3: `Hopefully the above covers everything you wished to know. If you do have any further questions though, please feel free to drop me another line or give us a shout on the
						  mobile number below.`,
				close4: 'Regards,',
			},
			cozumel: {
				coz1: 'Cozumel',
				coz2: '- 2 Tanks - Daily',
				coz3: 'Morning dive, pick up at',
				coz4: '6:15ish',
				coz5: '2 diver minimum',
				coz6: `Deposit: $${cozumel.deposit} pp`,
				coz7: `There is obviously a bit of travelling involved so we are recommending that we begin the tour with a pick up from your hotel at 6:30 so that we can get to the dive
					boat by 8. In order to save time, it would also be ideal if we could get your fin (shoe) and wetsuit sizes beforehand so that your guide can pick up the gear on route
					to your hotel. You can find our wetsuit size chart`,
				coz8: `here`,
				coz9: '.',
				coz10: `While diving in Cancún you will find things are very relaxed as your dive guide will set your gear up for you, help with donning your equipment and do pretty much
					everything slowly so that everyone is relaxed when we hit the water. The Cozumel tour however is a little more structured as we have a very specific time slot, set by the
					national park, which we need to adhere to. With this in mind, we ask that our divers who feel competent in setting up their own gear help us by doing so before the boat
					launches. That being said, we will, of course, help you if you aren't yet comfortable putting their equipment together and do a quick double check on those who are.`,
				coz11: `As for the dives themselves, Cozumel has more than 30 so our captain will take into account the weather conditions and discuss the best options with your dive guide. If
					you have a particular site you would like to visit, please let us know when we pick you up so that your guide can discuss the possibility of visiting the site with our
					captain. Regardless of which sites you visit, we'll typically have more than 100ft / 30m of viz for each dive. Our first will be a deep dive of at least 78ft / 24m
					(though we won't push you to reach that depth if you aren't comfortable as there is plenty to see at the 52ft / 16m mark). To keep with scuba diving standards and to
					reduce surface interval times, our second dive will have a max depth of 40ft / 12m.`,
				coz12: `The list price for this tour is U$${cozumel.cashPrice} per person but if you would like to take advantage of the Cthulhu Divers cash discount
					the price comes down to U$${cozumel.cardPrice} per person.`,
			},
			nightDiving: {
				night1: 'Night Diving',
				night2: '- 1 Tank - Daily',
				night3: 'Pick up at',
				night4: '5:30ish',
				night5: '3 diver minimum',
				night6: `Deposit: $${nightDiving.deposit} pp`,
				night7: `Our night diving is a completely different experience to our daylight activities. We typically begin by aiming to enter the water at sunset when the reef is most active. 
						Much of the animal life you have come accustomed to seeing more or less stationary during the day will dance passed us as they begin to mate and hunt.`,
				night8: `As dusk settles into night, we turn our torches on to search for some of the Caribbean’s shyer animals such as horseshoe crab, squid and octopus. Of course, we can't make 
						any promises but this is also a great time of day to come across turtles who all come the the reef to rest for the night – your dive guide will know exactly where to look 
						for them. Once you feel comfortable with this new experience, you will also be given the option to turn your torch back off to experience the biolumencent brittle star, 
						shrimp and plankton which inhabbit our reefs. The price for this tour is U$${nightDiving.cardPrice} (cash: U$${nightDiving.cashPrice}) per diver.`,
			},
			opening: {
				open1: 'Hi',
				open2: 'Thank you for getting in touch.',
				open3: `Yes, Cthulhu Divers can absolutley facilitate you with some diving during your stay. Our operation works a little different to our competitors in that
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
				whaleS4: '7:15ish',
				whaleS5: `Deposit: $${whaleShark.deposit} pp`,
				whaleS6: `While you didn't explicitly mention whales sharks in your message, you may also be interested to know that you are visiting Cancún bang in the middle of our whale shark
					season. Cancún is actually home to the largest aggregation of these magnificent creatures in the world and similarly our parent company is the largest whale shark snorkel
					tour operator in the world which means we often work with National Geographic in helping their staff tag these gentle giants. In return they give us the gizmos to track
					and find them ourselves which gives us quite an edge over our competition in locating them.`,
				whaleS7: `The tour also includes a short visit to Playa Norte on the island of Isla Mujeres which is consistently voted as one of the top beaches in the world last year on TripAdvisor. Here
					you will also be given the option to do a quick snorkel at Mia Reef or simply laze on the boat or the white sandy beach. The price of this tour is
					U$${whaleShark.cardPrice} (cash: U$${whaleShark.cashPrice}) plus a further U$${whaleShark.dockFee} national park fee which needs to be paid in cash upon arrival at the dock to a park representative.`,
			},
		};
	}
};

const giveScript = () => {
	const knownCaution = document.querySelector('#known-caution');
	const opening = emailScripts.opening;
	const certifiedDiver = emailScripts.certifiedDiver;
	const nightDiving = emailScripts.nightDiving;
	const cozumel = emailScripts.cozumel;
	const cenoteDiver = emailScripts.cenoteDiver;
	const whaleShark = emailScripts.whaleShark;

	producedScript.id = 'produced-script';

	producedScript.innerHTML = `
        <p>${opening.open1}<span id="snippet-client-name"> ${clientInfo.nameShort}</span>,</p>
        <p>${opening.open2}</p>
		<p>${opening.open3} <span id="snippet-client-hotel">${opening.open4}</span> ${opening.open5}</p>
        <p>${certifiedDiver.cert1}</p>
        <p>
            <strong><a href="https://cthulhudivers.com/dive-sites/musa-cancuns-underwater-museum" target="_blank">${certifiedDiver.cert2}</a></strong> <em><span class="whatsapp-underscore"></span>${certifiedDiver.cert3}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${certifiedDiver.cert4} <span id="musa-time">${certifiedDiver.cert5}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${certifiedDiver.cert6}<span class="whatsapp-underscore"></span></em>
        </p>
		<p>${certifiedDiver.cert7}</p>
        <p>${certifiedDiver.cert8} <span id="dsd-time">${certifiedDiver.cert9}</span>${certifiedDiver.cert10}</p>
        <p>
            <strong>${certifiedDiver.cert11}</strong> <em><span class="whatsapp-underscore"></span>${certifiedDiver.cert12}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${certifiedDiver.cert13} <span id="afuera-time">${certifiedDiver.cert14}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${certifiedDiver.cert15}<span class="whatsapp-underscore"></span></em>
        </p>
        <p>${certifiedDiver.cert16}</p>
        <p>
            <strong><a href="https://cthulhudivers.com/dive-sites/c55-juan-de-la-barrera-wreck-cancun" target="_blank">${certifiedDiver.cert17}</a></strong> <em><span class="whatsapp-underscore"></span>${certifiedDiver.cert18}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${certifiedDiver.cert19} <span id="wreck-time">${certifiedDiver.cert20}</span><span class="whatsapp-underscore"></span><br />
			<span class="whatsapp-underscore"></span>${certifiedDiver.cert21}<span class="whatsapp-underscore"></span></em>
        </p>
        <p>${certifiedDiver.cert22}</p>
        `;

	// If the number of pax is greater than 2, add night diving info to the script
	if (clientInfo.pax > 2) {
		producedScript.innerHTML += `
			<p><strong><a href="https://cthulhudivers.com/cancun-night-diving" target="_blank">${nightDiving.night1}</a></strong> <em><span class="whatsapp-underscore"></span>${nightDiving.night2}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${nightDiving.night3} <span id="whale-shark-time">${nightDiving.night4}</span><span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${nightDiving.night5}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${nightDiving.night6}<span class="whatsapp-underscore"></span></em>
			</p>
			<p>${nightDiving.night7}</p>
			<p>${nightDiving.night8}</p>
			`;
	}

	// If the number of pax is greater than 1, add cenote info to the script
	if (clientInfo.pax > 1) {
		producedScript.innerHTML =
			producedScript.innerHTML +
			`
            <p><strong><a href="https://cthulhudivers.com/cancun-cozumel" target="_blank">${cozumel.coz1}</a></strong> <em><span class="whatsapp-underscore"></span>${cozumel.coz2}<span class="whatsapp-underscore"></span><br />
            	<span class="whatsapp-underscore"></span>${cozumel.coz3} <span id="cozumel-time">${cozumel.coz4}</span><span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${cozumel.coz5}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${cozumel.coz6}<span class="whatsapp-underscore"></span></em>
			</p>
            <p>${cozumel.coz7} <a href="https://cthulhudivers.com/cancun-cozumel#wetsuitSelection" target="_blank">${cozumel.coz8}</a>${cozumel.coz9}</p>
            <p>${cozumel.coz10}</p>
            <p>${cozumel.coz11}</p>
            <p>${cozumel.coz12}</p>

            <p><strong><a href="https://cthulhudivers.com/cancun-cenote-cavern-diving" target="_blank">${cenoteDiver.cenote1}</a></strong> <em><span class="whatsapp-underscore"></span>${cenoteDiver.cenote2}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${cenoteDiver.cenote3} <span id="cenote-time">${cenoteDiver.cenote4}</span><span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${cenoteDiver.cenote5}<span class="whatsapp-underscore"></span><br />
            <span class="whatsapp-underscore"></span>${cenoteDiver.cenote6}<span class="whatsapp-underscore"></span>
			</em></p>
            <p>${cenoteDiver.cenote7}</p>
            <p>${cenoteDiver.cenote8}</p>
            <p>${cenoteDiver.cenote9}</p>
            <p>${cenoteDiver.cenote10}<br />
            ${cenoteDiver.cenote11}<br />
            ${cenoteDiver.cenote12}<br />
            ${cenoteDiver.cenote13}<br />
            ${cenoteDiver.cenote14}<br />
            ${cenoteDiver.cenote15}<br />
            </p>
            <p>${cenoteDiver.cenote16}</p>
            `;
	}
	outputScript.appendChild(producedScript);

	// Remove the client name if it is 'Unknown'
	if (clientInfo.name === 'Unknown') {
		const snippetClientName = document.querySelector('#snippet-client-name');
		snippetClientName.textContent = '';
	}

	seasonalToursCheck();

	// If the client is arriving during one of the seaonsonal tours and add the relevant info to the script
	for (var i = 0; i < seasonalToursAvailable.length; i++) {
		if (seasonalToursAvailable[i] === 'whaleShark') {
			producedScript.innerHTML += `
				<p><strong><a href="https://cthulhudivers.com/cancun-whale-shark-snorkeling" target="_blank">${whaleShark.whaleS1}</a></strong> <em><span class="whatsapp-underscore"></span>${whaleShark.whaleS2}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${whaleShark.whaleS3} <span id="whale-shark-time">${whaleShark.whaleS4}</span><span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${whaleShark.whaleS5}<span class="whatsapp-underscore"></span>
				</em></p>
				<p>${whaleShark.whaleS6}</p>
				<p>${whaleShark.whaleS7}</p>
			`;
		}
		if (seasonalToursAvailable[i] === 'bullShark' && clientInfo.pax > 1) {
			producedScript.innerHTML += `<p><strong><a href="https://cthulhudivers.com/cancun-bull-shark-diving" target="_blank">${emailScripts.bullShark.bull1}</a></strong> <em><span class="whatsapp-underscore"></span>${emailScripts.bullShark.bull2}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${emailScripts.bullShark.bull3} <span id="bull-shark-time">${emailScripts.bullShark.bull4}</span><span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${emailScripts.bullShark.bull5}<span class="whatsapp-underscore"></span><br />
				<span class="whatsapp-underscore"></span>${emailScripts.bullShark.bull6}<span class="whatsapp-underscore"></span></em></p>
				<p>${emailScripts.bullShark.bull7}</p>
			`;
		}
	}

	// If the hotel name does not equal 'Not Applicable', add the hotel name to the script and adjust the pick up times accordingly
	if (clientInfo.hotel !== 'Not Applicable') {
		const snippetClientHotel = document.querySelector('#snippet-client-hotel');
		snippetClientHotel.textContent = `the ${clientInfo.hotel}`;

		const travelTimeSB = hotelList[clientInfo.hotelKey].sb805;
		const musaTime = document.querySelector('#musa-time');
		const afueraTime = document.querySelector('#afuera-time');
		const wreckTime = document.querySelector('#wreck-time');
		const dsdTime = document.querySelector('#dsd-time');
		const cozumelTime = document.querySelector('#cozumel-time');
		const whaleSharkTime = document.querySelector('#whale-shark-time');
		const bullSharkTime = document.querySelector('#bull-shark-time');
		const nightTime = document.querySelector('#night-time');

		if (travelTimeSB === 999) {
			knownCaution.innerHTML =
				knownCaution.innerHTML +
				`Please note that we do not have a official pick up time for this tour from this hotel on our system. This very likely means that this client is staying too far away
	                for us to offer this service.<br /><br />
	                <strong> This may not be the case so please check if their location is within our pick up range and adjust the pick up time accordingly or ask Nick H.</strong><br />`;
			knownCaution.style.display = 'block';
		} else {
			musaTime.textContent = `${revertTime(convertTime(cthulhuTours.certifiedTours.certified.transport.arrival2) - travelTimeSB)}`;
			afueraTime.textContent = `${revertTime(convertTime(cthulhuTours.certifiedTours.certified.transport.arrival1) - travelTimeSB)}`;
			wreckTime.textContent = afueraTime.textContent;
			dsdTime.textContent = `${revertTime(convertTime(cthulhuTours.courses.dsd.transport.arrival1) - travelTimeSB)}`;
			if (cozumelTime !== null) {
				cozumelTime.textContent = `${revertTime(convertTime(cthulhuTours.certifiedTours.cozumel.transport.arrival1) - hotelList[locations.value].pelicanosTime)}`;
			}
			if (whaleSharkTime !== null) {
				whaleSharkTime.textContent = `${hotelList[locations.value].whaleShark}`;
			}
			if (bullSharkTime !== null) {
				bullSharkTime.textContent = `${revertTime(convertTime(cthulhuTours.certifiedTours.bullShark.transport.arrival1) - hotelList[locations.value].pelicanosTime)}`;
			}
			if (nightTime !== null) {
				nightTime.textContent = `${revertTime(convertTime(cthulhuTours.nightDiving.transport.arrival1) - hotelList[locations.value].travelTimeSB)}`;
			}
		}
	}

	producedScript.innerHTML += `
		<p><strong>${emailScripts.closing.close1}</strong></p>
		<p>${emailScripts.closing.close2}</p>
		<p> <span id="snippet-client-message-type">${emailScripts.closing.close3}</span> </p>
		<p>${emailScripts.closing.close4}</p>
	`;

	// If the #known-client-message-type textContent is 'whatsapp', add the WhatsApp message to the script
	if (clientInfo.messageType === 'Whatsapp') {
		const snippetClientMessageType = document.querySelector('#snippet-client-message-type');

		snippetClientMessageType.textContent = `Hopefully the above covers everything you wished to know. If you do have any further questions though, please feel free to write back
												here on Whatsapp or give us a shout on this number and ask for Nick H or Maria.`;

		// Run through poducedScript and find all instances of <strong> and </strong> replace them with *
		producedScript.innerHTML = producedScript.innerHTML.replace(/<\/?strong>/g, '*');
		// Run through poducedScript and find all instances of <span class="whatsapp-underscore"></span> and replace with <span class="whatsapp-underscore">_</span>
		producedScript.innerHTML = producedScript.innerHTML.replace(/<span class="whatsapp-underscore"><\/span>/g, '<span class="whatsapp-underscore">_</span>');
	}

	outputScriptBtns.forEach((btn) => {
		btn.style.display = 'block';
	});
	if (locations.value === 'notApplicable') {
		certifiedTable.innerHTML = '';
		courseTable.innerHTML = '';
		cenoteTable.innerHTML = '';
		snorkelTable.innerHTML = '';
		nonDivingTable.innerHTML = '';
	}
	newClientBtn.addEventListener('click', reloadPage);
	clipboardBtn.addEventListener('click', copyToClipboard);
};

const amendScript = (producedScript) => {};

// Get the value of the selected hotel and display it in #known-client-hotel
const copyClientHotel = () => {
	if (locations.value == 'notApplicable') {
		clientInfo.hotel = 'Not Applicable';
	} else {
		clientInfo.hotel = hotelList[locations.value].name;
		clientInfo.hotelKey = locations.value;
	}
	knownClientHotel.textContent = clientInfo.hotel;
};

// copy text the user has inputed into #client-name and display it in #known-client-name
const copyClientName = () => {
	let name = clientName.value.toLowerCase();
	name = name.split(' ');

	if (name[0] != '') {
		for (let i = 0; i < name.length; i++) {
			name[i] = name[i][0].toUpperCase() + name[i].substr(1);
		}
	} else {
		name = ['Unknown'];
	}
	clientInfo.nameShort = name[0];

	clientInfo.name = name.join(' ');
	knownClientName.textContent = clientInfo.name;
	q++;
	showQuestion(q);
};

// Get the number of pax and display it in #known-client-pax
const copyClientPax = () => {
	clientInfo.pax = Number(clientPax.value);
	knownClientPax.textContent = clientInfo.pax;

	q++;
	showQuestion(q);
};

// Get the client arrival date and display it in #known-client-arrival-date
const copyClientArrivalDate = () => {
	clientInfo.arrivalDate = clientArrivalDate.value;
	knownClientArrivalDate.textContent = clientInfo.arrivalDate;

	setMinDepartureDate();
	q++;
	showQuestion(q);
};

// Get the client departure date and display it in #known-client-departure-date
const copyClientDepartureDate = () => {
	clientInfo.departureDate = clientDepartureDate.value;
	knownClientDepartureDate.textContent = clientInfo.departureDate;

	q++;
	showQuestion(q);
};

// Get the message type and display it in #known-client-message-type
const copyMessageType = () => {
	clientInfo.messageType = clientMessageType.value;
	knownClientMessageType.textContent = clientInfo.messageType;

	q++;
	showQuestion(q);
};

// Question event listeners
const questionListeners = () => {
	locations.addEventListener('change', copyClientHotel);
	submitClientName.addEventListener('click', copyClientName);
	clientPax.addEventListener('change', copyClientPax);
	clientArrivalDate.addEventListener('change', copyClientArrivalDate);
	clientDepartureDate.addEventListener('change', copyClientDepartureDate);
	clientMessageType.addEventListener('change', copyMessageType);
};
questionListeners();

// Show questions based on the value of q
const showQuestion = (q) => {
	const questions = document.querySelectorAll('.question');

	questions.forEach((question) => {
		question.style.display = 'none';
	});

	if (q >= questions.length) {
		populateEmailScripts();
		return giveScript();
	}

	questions[q].style.display = 'block';
};
showQuestion(q);

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
	clientDepartureDate.min = clientArrivalDate.value;
};

// Check to see if either #known-client-arrival-dates or #known-client-departure-dates fall on an available seaonsal tour
const seasonalToursAvailable = [];
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
		seasonalToursAvailable.push('whaleShark');
	}
	// Bull shark season - November 15th and February 15th
	if (
		(knownClientDepartureDateArray[1] == 11 && knownClientDepartureDateArray[2] >= 15) ||
		knownClientArrivalDateArray[1] == 12 ||
		knownClientDepartureDateArray[1] == 12 ||
		knownClientArrivalDateArray[1] == 1 ||
		knownClientDepartureDateArray[1] == 1 ||
		(knownClientArrivalDateArray[1] == 2 && knownClientArrivalDateArray[2] <= 15) ||
		(knownClientDepartureDateArray[1] == 2 && knownClientDepartureDateArray[2] <= 15)
	) {
		seasonalToursAvailable.push('bullShark');
		seasonalToursAvailable.push('eagleRay');
	}
};

// Copy the text from #produced-script to the clipboard
const copyToClipboard = () => {
	const range = document.createRange();
	range.selectNode(producedScript);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
	clipboardBtn.textContent = 'Copied!';
	clipboardBtn.style.backgroundColor = 'green';
};
