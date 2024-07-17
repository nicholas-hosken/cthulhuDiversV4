const cthulhuTours = {
	common: {
		cenote: {
			food: 200,
			tanksClient: 80,
			tanksGuide: 250,
		},
		eanx32: 150,
		photos: 25,
		soloBuceo: {
			costBoatMXN: 1350,
			get costBoatUSD() {
				return convertToUSD(this.costBoatMXN, 2);
			},
		},
	},
	certifiedTours: {
		musa: {
			name: 'Musa & Reef',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-musa.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '12:20',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		manchones: {
			name: 'Manchones Reefs',
			available: 'Daily',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-manchones.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '12:20',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		mesoamerican: {
			name: 'Mesoamerican Reefs',
			bookingRequirements: {
				available: 'Mon, Wed, Fri, Sun',
				days: 1,
				maxDepth: '55ft / 17m',
				minAge: 12,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-mesoamerican.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '8:05',
				departure1: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		wreck: {
			name: 'Wreck & Reef',
			bookingRequirements: {
				available: 'Tue, Thu, Sat',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-wreck.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '8:05',
				departure1: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		bullShark: {
			name: 'Bull Shark',
			bookingRequirements: {
				available: 'Daily (Nov - Feb)',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.certifiedTours.bullShark.costs.boat, 2));
				},
			},
			cardImg: '../img/cards/scuba-bull-shark.webp',
			costs: {
				boat: 1800,
				guide: 500,
				parking: 50,
			},
			href: 'https://cthulhudivers.com/cancun-bull-shark-diving',
			nitroxAllowed: true,
			profitPercent: 1.45,
			transport: {
				arrival1: '13:00',
				departure1: '17:00',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 25,
				kantenahTulum: 50,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Playa Pelicanos');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Playa Pelicanos');
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + tourData.parking}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> Mask, BCD, Regulator, Full Wetsuit, Fins`,
					`<div class="note"><h5>Notes:</h5><ul><li>50mxn needs to be in change for parking meter.</li><li>Dive equipment may not contain any bright colours.</li></ul></div>`,
				];
			},
		},
		certified: {
			name: 'Certified Divers',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '8:05',
				departure1: '12:30',
				arrival2: '12:20',
				departure2: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
		cozumel: {
			name: 'Cozumel',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.certifiedTours.cozumel.costs.boat / pax, 2));
				},
			},
			cardImg: '../img/cards/scuba-cozumel.webp',
			costs: {
				boat: 2000,
				guide: 500,
				parking: 50,
			},
			href: 'https://cthulhudivers.com/cancun-cozumel',
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.35,
			transport: {
				arrival1: '8:00',
				departure1: '13:00',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 25,
				kantenahTulum: 50,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Playa Pelicanos');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Playa Pelicanos');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + tourData.parking}mxn`, `<span>Doc:</span> 10651`, `<span>Equipment:</span> Mask, BCD, Regulator, Wetsuit, Fins`, `<div class="note"><h5>Notes:</h5> 50mxn needs to be in change for parking meter.</div>`];
			},
		},
		nightDiving: {
			name: 'Night Diving',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 12,
				minCertLvl: 'Scuba Diver',
				minClients: 3,
				tanks: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/scuba-night-dive.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				guide: 300,
			},
			href: 'https://cthulhudivers.com/cancun-night-diving',
			nitroxAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '18:00',
				departure1: '21:00',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10651`];
			},
		},
	},
	courses: {
		dsd: {
			name: 'Discover Scuba Diving',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				tanks: 3,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-dsd.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				get guide() {
					return 500;
				},
			},
			days: 1,
			href: 'https://cthulhudivers.com/cancun-padi-discover-scuba-diving-dsd',
			photosAllowed: true,
			profitPercent: 1.3,
			transport: {
				arrival1: '10:00',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		refresher: {
			name: 'PADI Scuba Refresher',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-refresher.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				get guide() {
					return 500;
				},
			},
			href: 'https://cthulhudivers.com/cancun-padi-refresher',
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 3,
			transport: {
				arrival1: '10:00',
				departure1: '16:45',
				arrival2: '6:30',
				departure2: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10648`];
			},
		},
		scubaDiver: {
			name: 'PADI Scuba Diver',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.courses.scubaDiver.costs.elearning);
				},
			},
			cardImg: '../img/cards/course-scuba-diver.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: 183.55,
				get guide() {
					return 500;
				},
			},
			days: 1,
			href: 'https://cthulhudivers.com/cancun-padi-scuba-diver',
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrival1: '8:05',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		ow: {
			name: 'PADI Open Water',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '60ft / 18m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.courses.scubaDiver.costs.elearning);
				},
			},
			cardImg: '../img/cards/course-ow.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN * 2;
				},
				elearning: 183.55,
				guide: 2000,
			},
			href: 'https://cthulhudivers.com/cancun-padi-open-water-scuba-diver',
			photosAllowed: true,
			profitPercent: 1.2,
			tanks: 5,
			transport: {
				arrival1: '8:05',
				departure1: '16:45',
				arrival2: '8:05',
				departure2: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 40,
				morelosPdc: 100,
				pdc: 200,
				pdcKantenah: 250,
				kantenahTulum: 300,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat * 2}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		referral: {
			name: 'PADI Referral Program',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '60ft / 18m',
				minAge: 10,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.common.soloBuceo.costBoatUSD);
				},
			},
			cardImg: '../img/cards/course-referral.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN * 2;
				},
				guide: 2000,
			},
			days: 2,
			href: 'https://cthulhudivers.com/cancun-padi-referral',
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 4,
			transport: {
				arrival1: '12:20',
				departure1: '16:45',
				arrival2: '8:05',
				departure2: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 40,
				morelosPdc: 100,
				pdc: 200,
				pdcKantenah: 250,
				kantenahTulum: 300,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Docs:</span> 10056, 10060, 10072, 10346`, `<span>Equipment:</span> Compass, SMB`];
			},
		},
		aow: {
			name: 'PADI Advanced OW',
			bookingRequirements: {
				available: 'Daily',
				days: 2,
				maxDepth: '130ft / 40m',
				minAge: 12,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				tanks: 5,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.courses.scubaDiver.costs.elearning);
				},
			},
			cardImg: '../img/cards/course-aow.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: 173.1,
				guide: 1600,
			},
			days: 2,
			href: 'https://cthulhudivers.com/cancun-padi-advanced-open-water',
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 4,
			transport: {
				arrival1: '12:20',
				departure1: '16:45',
				arrival2: '8:15',
				departure2: '12:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 40,
				morelosPdc: 100,
				pdc: 200,
				pdcKantenah: 250,
				kantenahTulum: 300,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat * 2}mxn`, `<span>Doc:</span> 10038, 10346`, `<span>Equipment:</span> Compass`];
			},
		},
		ppb: {
			name: 'PADI Peak Performance',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 10,
				minCertLvl: 'Scuba Diver',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.courses.scubaDiver.costs.elearning);
				},
			},
			cardImg: '../img/cards/course-buoyancy.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: 122.65,
				guide: 1000,
			},
			nitroxAllowed: true,
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 3,
			transport: {
				arrival1: '10:00',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat}mxn`, `<span>Doc:</span> 10038`];
			},
		},
		nitrox: {
			name: 'PADI Enriched Air Diver',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '84ft / 26m',
				minAge: 10,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(cthulhuTours.courses.scubaDiver.costs.elearning);
				},
			},
			cardImg: '../img/cards/course-nitrox.webp',
			costs: {
				get boat() {
					return cthulhuTours.common.soloBuceo.costBoatMXN;
				},
				elearning: 152.8,
				guide: 660,
				get nitrox() {
					return cthulhuTours.common.eanx32 * 4;
				},
			},
			photosAllowed: true,
			profitPercent: 1.3,
			tanks: 2,
			transport: {
				arrival1: '10:00',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2)} & ${tourData.boat + cthulhuTours.common.eanx32 * 4}mxn`, `<span>Doc:</span> 10346, 10038`, `<span>Equipment:</span> Nitrox analyzer, Nitrox Tables`];
			},
		},
	},
	cenotes: {
		actunHa: {
			name: 'Actun Ha',
			aka: 'Carwash',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '60ft / 18m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.actunHa.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-car-wash.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				get shuttle() {
					let shuttleCost = 3200;
					// if ((pax = 1)) {
					// 	return shuttleCost / 2;
					// } else {
					// 	return shuttleCost;
					// }
					return shuttleCost;
				},
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-car-wash',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		angelita: {
			name: 'Angelita',
			aka: 'Little Angel',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.angelita.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-angelita.webp',
			costs: {
				entrance: 350,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			days: 1,
			href: 'https://cthulhudivers.com/dive-sites/cenote-angelita',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		calavera: {
			name: 'Calavera',
			aka: 'Temple of Doom',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '50ft / 15m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.calavera.costs.shuttle) / 2);
				},
			},
			cardImg: '../img/cards/cenote-calavera.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2900,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-calavera-temple-of-doom',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		chacMool: {
			name: 'Chac Mool',
			aka: 'Jaguar',
			bookingRequirements: {
				available: 'Daily',
				cameraDSLR: 'Not Allowed',
				cameraGoPro: 'Not Allowed',
				days: 1,
				maxDepth: '40ft / 12m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.chacMool.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-chac-mool.webp',
			costs: {
				entrance: 250,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-chac-mool',
			nitroxAllowed: true,
			profitPercent: 1.3,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 50,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="note"><h5>Notes:</h5> Vicente is the only cenote guide we have who can guide this cenote. Please check his availability before booking clients.</div>`,
				];
			},
		},
		dosOjos: {
			name: 'Dos Ojos',
			aka: 'Two Eyes',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '45ft / 14m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.dosOjos.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-dos-ojos.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-dos-ojos',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		dreamgate: {
			name: 'Puerta de los Sueños',
			aka: 'Dream Gate',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '30ft / 9m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.dreamgate.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-dreamgate.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2900,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '17:50';
					} else if (location === 'pm') {
						return '17:35';
					} else if (location === 'cun') {
						return '17:20';
					} else if (location === 'pdc') {
						return '13:10';
					} else if (location === 'maya') {
						return '15:00';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		elPit: {
			name: 'El Pit',
			aka: 'The Pit',
			bookingRequirements: {
				available: 'Daily',
				cameraDSLR: '300mxn',
				cameraGoPro: 'Free',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.elPit.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-el-pit.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '17:50';
					} else if (location === 'pm') {
						return '17:35';
					} else if (location === 'cun') {
						return '17:20';
					} else if (location === 'pdc') {
						return '13:10';
					} else if (location === 'maya') {
						return '15:00';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		maravilla: {
			name: 'Maravilla',
			aka: 'The Blue Abyss',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40ft',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.maravilla.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-maravilla.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 30,
				pdc: 50,
				pdcKantenah: 75,
				kantenahTulum: 100,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '15:00';
					} else if (location === 'pm') {
						return '14:45';
					} else if (location === 'cun') {
						return '14:30';
					} else if (location === 'pdc') {
						return '14:20';
					} else if (location === 'maya') {
						return '15:20';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		ponderosa: {
			name: 'Ponderosa',
			aka: 'Garden of Eden',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '60ft / 18m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.ponderosa.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-ponderosa.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 50,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '17:30';
					} else if (location === 'pm') {
						return '17:15';
					} else if (location === 'cun') {
						return '17:00';
					} else if (location === 'pdc') {
						return '14:50';
					} else if (location === 'maya') {
						return '15:20';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		sucActun: {
			name: 'Suc Actun',
			aka: 'Pet Cemetery',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '23ft / 7m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.sucActun.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-pet-cemetery.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 3200,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 25,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '17:50';
					} else if (location === 'pm') {
						return '17:35';
					} else if (location === 'cun') {
						return '17:20';
					} else if (location === 'pdc') {
						return '13:10';
					} else if (location === 'maya') {
						return '15:00';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
		tajmaHa: {
			name: 'Tajma Ha',
			aka: 'Taj Mahal',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '50ft / 15m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.tajmaHa.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-tajma-ha.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: 'https://cthulhudivers.com/dive-sites/cenote-tajma-ha',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 50,
				get pickUp1() {
					return cenotePickUp(hotelList[locations.value].location);
				},
				get dropOff1() {
					return cenoteDropOff(hotelList[locations.value].location);
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
					`<div class="note"><h5>Notes:</h5> Due to construction at this site, visibility has been reduced significantly. Until further notice, please try to sell an alternative.</div>`,
				];
			},
		},
		zapote: {
			name: 'Zapote',
			aka: 'Hells Bells',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				tanks: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.cenotes.zapote.costs.shuttle)) / 2;
				},
			},
			cardImg: '../img/cards/cenote-zapote.webp',
			costs: {
				entrance: 400,
				get food() {
					return cthulhuTours.common.cenote.food;
				},
				guide: 750,
				shuttle: 2500,
				get tanksDiverCost() {
					return cthulhuTours.common.cenote.tanksClient * 2;
				},
				get tanksGuideCost() {
					return cthulhuTours.common.cenote.tanksGuide;
				},
			},
			href: '',
			nitroxAllowed: true,
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 30,
				pdc: 50,
				pdcKantenah: 75,
				kantenahTulum: 100,
				get pickUp1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '6:30';
					} else if (location === 'pm') {
						return '6:45';
					} else if (location === 'cun') {
						return '7:00';
					} else if (location === 'pdc') {
						return '9:00';
					} else if (location === 'maya') {
						return '9:30';
					}
				},
				get dropOff1() {
					let location = hotelList[locations.value].location;
					if (location === 'cm') {
						return '17:30';
					} else if (location === 'pm') {
						return '17:15';
					} else if (location === 'cun') {
						return '17:00';
					} else if (location === 'pdc') {
						return '14:50';
					} else if (location === 'maya') {
						return '15:20';
					}
				},
			},
			get prep() {
				return [
					`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
					`<span>Doc:</span> 10651`,
					`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
				];
			},
		},
	},
	snorkeling: {
		musaSnorkel: {
			name: 'Musa & Reef',
			arrival1: '12:20',
			departure1: '16:45',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '27ft / 9m',
				minAge: 6,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.snorkeling.musaSnorkel.costs.boat, 2));
				},
			},
			cardAlt: 'musa snorkeling tour',
			cardImg: '../img/cards/snorkel-musa.webp',
			costs: {
				boat: 1350,
			},
			href: 'https://cthulhudivers.com/non-diving/cancuns-best-snorkeling-tour',
			profitPercent: 1.1,
			transport: {
				arrival1: '12:20',
				departure1: '16:45',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>Cash:</span> ${tourData.boat}mxn`];
			},
		},
		turtleSnorkel: {
			name: 'Turtle 5-in-1',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				dockFee: 20,
				maxDepth: '9ft / 3m',
				minAge: 6,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.snorkeling.turtleSnorkel.costs.boat, 2));
				},
			},
			cardAlt: '5-1 snorkeling tour',
			cardImg: '../img/cards/snorkel-turtle.webp',
			costs: {
				get boat() {
					return convertToMEX(49) - 0.01;
				},
			},
			href: 'https://cthulhudivers.com/non-diving/turtle-snorkel-tour-5-in-1',
			profitPercent: 1.3,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 20,
				morelosPdc: 50,
				pdc: 100,
				pdcKantenah: 125,
				kantenahTulum: 150,
				get pickUpOptions() {
					const summary = document.querySelector('#summary');
					if (summary !== null) {
						// console.log(summary, locations.value, hotelList[locations.value].mpnPickup[0]);
						if (hotelList[locations.value].mpnPickup[0] !== 'Not Available') {
							return hotelList[locations.value].mpnPickup;
						}
					} else if (typeof tourTransport !== 'undefined' && tourTransport.children.length < 0) {
						const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
						let mpnPickUps = hotelList[locations.value].mpnPickup;

						for (let i = 0; i < mpnPickUps.length - 1; i++) {
							const p = document.createElement('p');
							p.innerHTML = `<span>Pickup Time Option ${i + 1}:</span> ${mpnPickUps[i]}`;
							pickUp1Container.appendChild(p);
						}
					}

					// const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
					// let mpnPickUps = hotelList[locations.value].mpnPickup;

					// for (let i = 0; i < mpnPickUps.length - 1; i++) {
					// 	const p = document.createElement('p');
					// 	p.innerHTML = `<span>Pickup Time Option ${i + 1}:</span> ${mpnPickUps[i]}`;
					// 	pickUp1Container.appendChild(p);
					// }
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.boat, 2)}`, `<span>To do:</span> Confirm pick up time`];
			},
		},
		whaleShark: {
			name: 'Whale Sharks',
			boatDpt: '7:45',
			boatReturn: '13:15',
			bookingRequirements: {
				available: 'Daily (May - Sept)',
				days: 1,
				dockFee: 20,
				maxDepth: 'At surface',
				minAge: 5,
				minCertLvl: 'None',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.snorkeling.whaleShark.costs.boat + cthulhuTours.snorkeling.whaleShark.costs.shuttle));
				},
			},
			cardAlt: 'Whale shark snorkeling',
			cardImg: '../img/cards/snorkel-whale-shark.webp',
			costs: {
				boat: convertToMEX(105) - 0.01,
				get shuttle() {
					return convertToMEX(hotelList[locations.value].whaleSharkTransportFee);
				},
			},
			href: 'https://cthulhudivers.com/cancun-whale-shark-snorkeling',
			profitPercent: 1.25,
			transport: {
				arrival1: '7:45',
				departure1: '13:15',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return hotelList[locations.value].whaleShark;
				},
				get dropOff1() {
					let travelTime = convertTime(this.arrival1) - convertTime(this.pickUp1);
					return revertTime(convertTime(this.departure1) + travelTime);
				},
			},
			get prep() {
				return [`<span>Cash:</span> U$${convertToUSD(tourData.boat, 2).toFixed(0)}`, `<span>To do:</span> Confirm pick up time`];
			},
		},
	},
	nonDiving: {
		// cancunaMataTransfers: {
		// 	name: 'Cancuna Matata Transfers',
		// 	cardImg: '../img/cards/non-diving-cancuna-mata-transfers.webp',
		// 	pricing: {
		// 		cun: {
		// 			cash3pax: 35,
		// 			cashReturn3pax: 65,
		// 			cash8pax: 55,
		// 			cashReturn8pax: 85,
		// 		},
		// 		cm: {
		// 			cash3pax: 75,
		// 			cashReturn3pax: 145,
		// 			cash8pax: 95,
		// 			cashReturn8pax: 165,
		// 		},
		// 		pm: {
		// 			cash3pax: 60,
		// 			cashReturn3pax: 115,
		// 			cash8pax: 80,
		// 			cashReturn8pax: 135,
		// 		},
		// 		puertoMorelos: {
		// 			cash3pax: 55,
		// 			cashReturn3pax: 105,
		// 			cash8pax: 75,
		// 			cashReturn8pax: 125,
		// 		},
		// 		pdc: {
		// 			cash3pax: 85,
		// 			cashReturn3pax: 155,
		// 			cash8pax: 105,
		// 			cashReturn8pax: 175,
		// 		},
		// 		maya: {
		// 			cash3pax: 100,
		// 			cashReturn3pax: 180,
		// 			cash8pax: 130,
		// 			cashReturn8pax: 200,
		// 		},
		// 		unknown: {
		// 			cash3pax: 0,
		// 			cashReturn3pax: 0,
		// 			cash8pax: 0,
		// 			cashReturn8pax: 0,
		// 		},
		// 	},
		// 	get info() {
		// 		populateLocations('cmt');
		// 		const location = hotelList[locations.options[locations.selectedIndex].value].location;
		// 		const tourCard3 = document.querySelector('#cmtCard3');
		// 		const tourcash3pax = document.querySelector('#cmtcash3pax');
		// 		const tourCardReturn3 = document.querySelector('#cmtCardReturn3');
		// 		const tourcashReturn3pax = document.querySelector('#cmtcashReturn3pax');
		// 		const tourCard8 = document.querySelector('#cmtCard8');
		// 		const tourcash8pax = document.querySelector('#cmtcash8pax');
		// 		const tourCardReturn8 = document.querySelector('#cmtCardReturn8');
		// 		const tourcashReturn8pax = document.querySelector('#cmtcashReturn8pax');

		// 		tourcash3pax.textContent = cmtPricing[location].cash3pax;
		// 		tourcashReturn3pax.textContent = cmtPricing[location].cashReturn3pax;
		// 		tourCard3.textContent = roundUp(tourcash3pax.innerHTML * 1.16);
		// 		tourCardReturn3.textContent = roundUp(tourcashReturn3pax.innerHTML * 1.16);
		// 		tourcash8pax.textContent = cmtPricing[location].cash8pax;
		// 		tourcashReturn8pax.textContent = cmtPricing[location].cashReturn8pax;
		// 		tourCard8.textContent = roundUp(tourcash8pax.innerHTML * 1.16);
		// 		tourCardReturn8.textContent = roundUp(tourcashReturn8pax.innerHTML * 1.16);
		// 	},
		// },
		chichenItzaAdults: {
			name: 'Chichen Itza - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 6,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.chichenItzaAdults.costs.entrance) * cthulhuTours.nonDiving.chichenItzaAdults.profitPercent) * 1.16);
				},
			},
			cardImg: '../img/cards/non-diving-chichen-itza.webp',
			costs: {
				entrance: 1088,
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
			profitPercent: 1.3,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUpOptions() {
					if (typeof tourTransport !== 'undefined') {
						if (tourTransport.children.length > 0) {
							const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
							const p = document.createElement('p');
							p.innerHTML = `<span>Pickup Time:</span> TBA`;
							pickUp1Container.appendChild(p);
						}
					}
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm pick up time`];
			},
		},
		chichenItzaKids: {
			name: 'Chichen Itza - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 6,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.chichenItzaKids.costs.entrance) * cthulhuTours.nonDiving.chichenItzaKids.profitPercent) * 1.16);
				},
			},
			cardImg: '../img/cards/non-diving-chichen-itza.webp',
			costs: {
				entrance: 1012,
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-cenote',
			profitPercent: 1.2,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUpOptions() {
					if (typeof tourTransport !== 'undefined') {
						if (tourTransport.children.length > 0) {
							const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
							const p = document.createElement('p');
							p.innerHTML = `<span>Pickup Time:</span> TBA`;
							pickUp1Container.appendChild(p);
						}
					}
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm pick up time`];
			},
		},
		chichenItzaEarlyAdults: {
			name: 'Chichen Itza Early Bird - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 6,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.chichenItzaEarlyAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
			costs: {
				entrance: 1258,
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
			profitPercent: 1.3,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUpOptions() {
					if (typeof tourTransport !== 'undefined') {
						if (tourTransport.children.length > 0) {
							const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
							const p = document.createElement('p');
							p.innerHTML = `<span>Pickup Time:</span> TBA`;
							pickUp1Container.appendChild(p);
						}
					}
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm pick up time`];
			},
		},
		chichenItzaEarlyKids: {
			name: 'Chichen Itza Early Bird - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 6,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.chichenItzaEarlyAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-chichen-itza-early.webp',
			costs: {
				entrance: 1158,
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-chichen-itza-early-bird',
			profitPercent: 1.3,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUpOptions() {
					if (typeof tourTransport !== 'undefined') {
						if (tourTransport.children.length > 0) {
							const pickUp1Container = tourTransport.querySelectorAll('.d-flex')[0].querySelectorAll('div')[0];
							const p = document.createElement('p');
							p.innerHTML = `<span>Pickup Time:</span> TBA`;
							pickUp1Container.appendChild(p);
						}
					}
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm pick up time`];
			},
		},
		columbusLobster: {
			name: 'Lobster Dinner Cruise',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				dockFee: 20,
				minAge: 15,
				minClients: 1,
				transport: 'Not included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.columbusLobster.costs.entrance) * cthulhuTours.nonDiving.columbusLobster.profitPercent) * 1.16);
				},
			},
			cardImg: '../img/cards/non-diving-columbus.webp',
			costs: {
				entrance: convertToMEX(81.75, 2),
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
			profitPercent: 1.12,
			transport: {
				arrival1: '17:00',
				departure1: '20:15',
				arrival2: '20:00',
				departure2: '23:15',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm client has transportation`];
			},
		},
		columbusSteak: {
			name: 'Steak Dinner Cruise',
			cardImg: '../img/cards/non-diving-columbus.webp',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				dockFee: 20,
				minAge: 15,
				minClients: 1,
				transport: 'Not included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.columbusSteak.costs.entrance) * cthulhuTours.nonDiving.columbusSteak.profitPercent) * 1.16);
				},
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
			costs: {
				entrance: convertToMEX(68, 2),
			},
			profitPercent: 1.12,
			transport: {
				arrival1: '17:00',
				departure1: '20:15',
				arrival2: '20:00',
				departure2: '23:15',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm client has a transportation`];
			},
		},
		columbusSurfTurf: {
			name: 'S&T Dinner Cruise',
			cardImg: '../img/cards/non-diving-columbus.webp',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				dockFee: 20,
				minAge: 15,
				minClients: 1,
				transport: 'Not included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.columbusSurfTurf.costs.entrance) * cthulhuTours.nonDiving.columbusSurfTurf.profitPercent) * 1.16);
				},
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
			costs: {
				entrance: convertToMEX(81.75, 2),
			},
			profitPercent: 1.12,
			transport: {
				arrival1: '17:00',
				departure1: '20:15',
				arrival2: '20:00',
				departure2: '23:15',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm client has a transportation`];
			},
		},
		columbusVeg: {
			name: 'Veg Dinner Cruise',
			cardImg: '../img/cards/non-diving-columbus.webp',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				dockFee: 20,
				minAge: 15,
				minClients: 1,
				transport: 'Not included',
				get deposit() {
					return roundUp(roundUp(convertToUSD(cthulhuTours.nonDiving.columbusVeg.costs.entrance) * cthulhuTours.nonDiving.columbusVeg.profitPercent) * 1.16);
				},
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-columbus-lobster-dinner-cruise',
			costs: {
				entrance: convertToMEX(68, 2),
			},
			profitPercent: 1.12,
			transport: {
				arrival1: '17:00',
				departure1: '20:15',
				arrival2: '20:00',
				departure2: '23:15',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff1() {
					return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Real Inn');
				},
				get pickUp2() {
					return calculateTransportTime(this.arrival2, locations.value, 'pickup', 'Real Inn');
				},
				get dropOff2() {
					return calculateTransportTime(this.departure2, locations.value, 'dropoff', 'Real Inn');
				},
			},
			get prep() {
				return [`<span>To do:</span> Confirm client has a transportation`];
			},
		},
		// wakeHalf: {
		// 	name: 'Wakeboarding Half Day',
		// 	bookingRequirements: {
		// 		available: 'Wednesday thru Monday',
		// 		days: 1,
		// 		dockFee: 20,
		// 		minAge: 15,
		// 		minClients: 1,
		// 		get deposit() {
		// 			return;
		// 		},
		// 	},
		// 	cardImg: '../img/cards/non-diving-wake.webp',
		// 	costs: {
		// 		entranceFee: 1500,
		// 	},
		// 	profitPercent: 1.2,
		// 	transport: {
		// 		arrival1: '0:00', //8:30
		// 		departure1: '14:30',
		// 		get pickUp1() {
		// 			return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Cenote');
		// 		},
		// 		get dropOff1() {
		// 			return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Cenote');
		// 		},
		// 	},
		// 	get prep() {
		// 		return [
		// 			`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
		// 			`<span>Doc:</span> 10651`,
		// 			`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
		// 		];
		// 	},
		// },
		// wakeFull: {
		// 	name: 'Wakeboarding Full Day',
		// 	bookingRequirements: {
		// 		available: 'Wednesday thru Monday',
		// 		days: 1,
		// 		dockFee: 20,
		// 		minAge: 15,
		// 		minClients: 1,
		// 		get deposit() {
		// 			return;
		// 		},
		// 	},
		// 	cardImg: '../img/cards/non-diving-wake.webp',
		// 	costs: {
		// 		entranceFee: 2000,
		// 	},
		// 	profitPercent: 1.2,
		// 	transport: {
		// 		arrival1: '8:30',
		// 		departure1: '14:30',
		// 		get pickUp1() {
		// 			return calculateTransportTime(this.arrival1, locations.value, 'pickup', 'Cenote');
		// 		},
		// 		get dropOff1() {
		// 			return calculateTransportTime(this.departure1, locations.value, 'dropoff', 'Cenote');
		// 		},
		// 	},
		// 	get prep() {
		// 		return [
		// 			`<span>Cash:</span> U$${convertToUSD(tourData.guide, 2).toFixed(0)} & ${tourData.entrance + tourData.food + tourData.shuttle + tourData.tanksDiverCost + tourData.tanksGuideCost}mxn`,
		// 			`<span>Doc:</span> 10651`,
		// 			`<span>Equipment:</span> BCD, Fins, Full Wetsuit, Mask,  Regulator, Torch, Weights`,
		// 		];
		// 	},
		// },
		xcaretAdults: {
			name: 'Xcaret - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 12,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xcaretAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xcaret.webp',
			costs: {
				entrance: convertToMEX(160, 2),
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
			profitPercent: 1.06,
			transport: {
				arrival1: '0:00',
				departure1: '14:30',
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xcaret = hotelList[locations.value].xcaret;
					if (xcaret === 999) {
						return 'TBA';
					} else {
						return xcaret;
					}
				},
				get dropOff1() {
					let xcaret = hotelList[locations.value].xcaret;
					if (xcaret === 999) {
						return 'TBA';
					} else {
						xcaret = convertTime(xcaret);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xcaret - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xcaretKids: {
			name: 'Xcaret - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 5,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xcaretKids.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xcaret.webp',
			costs: {
				entrance: convertToMEX(121, 2),
			},
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xcaret',
			profitPercent: 1.06,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xcaret = hotelList[locations.value].xcaret;
					if (xcaret === 999) {
						return 'TBA';
					} else {
						return xcaret;
					}
				},
				get dropOff1() {
					let xcaret = hotelList[locations.value].xcaret;
					if (xcaret === 999) {
						return 'TBA';
					} else {
						xcaret = convertTime(xcaret);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xcaret - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xoximilcoAdults: {
			name: 'Xoximilco - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 12,
				minCertLvl: 'Open Water Diver',
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xoximilcoAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xoximilco.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
			costs: {
				entrance: convertToMEX(95, 2),
			},
			profitPercent: 1.13,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xoximilco = hotelList[locations.value].xoximilco;
					if (xoximilco === 999) {
						return 'TBA';
					} else {
						return xoximilco;
					}
				},
				get dropOff1() {
					let xoximilco = hotelList[locations.value].xoximilco;
					if (xoximilco === 999) {
						return 'TBA';
					} else {
						xoximilco = convertTime(xoximilco);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xoximilco - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xoximilcoKids: {
			name: 'Xoximilco - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 5,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xoximilcoKids.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xoximilco.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xoximilco',
			costs: {
				entrance: convertToMEX(74, 2),
			},
			profitPercent: 1.13,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xoximilco = hotelList[locations.value].xoximilco;
					if (xoximilco === 999) {
						return 'TBA';
					} else {
						return xoximilco;
					}
				},
				get dropOff1() {
					let xoximilco = hotelList[locations.value].xoximilco;
					if (xoximilco === 999) {
						return 'TBA';
					} else {
						xoximilco = convertTime(xoximilco);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xoximilco - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
		},
		xplorAdults: {
			name: 'Xplor - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 12,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xplorAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xplor.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
			costs: {
				entrance: convertToMEX(127, 2),
			},
			profitPercent: 1.18,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xplor = hotelList[locations.value].xplor;
					if (xplor === 999) {
						return 'TBA';
					} else {
						return xplor;
					}
				},
				get dropOff1() {
					let xplor = hotelList[locations.value].xplor;
					if (xplor === 999) {
						return 'TBA';
					} else {
						xplor = convertTime(xplor);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xplor - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xplorKids: {
			name: 'Xplor - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 5,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xplorKids.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xplor.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor',
			costs: {
				entrance: convertToMEX(96, 2),
			},
			profitPercent: 1.18,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xplor = hotelList[locations.value].xplor;
					if (xplor === 999) {
						return 'TBA';
					} else {
						return xplor;
					}
				},
				get dropOff1() {
					let xplor = hotelList[locations.value].xplor;
					if (xplor === 999) {
						return 'TBA';
					} else {
						xplor = convertTime(xplor);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xplor - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xplorFuegoAdults: {
			name: 'Xplor Fuego - Adults',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				minAge: 12,
				minClients: 1,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xplorFuegoAdults.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xplor-fuego.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
			costs: {
				entrance: convertToMEX(112, 2),
			},
			profitPercent: 1.14,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xplorFuego = hotelList[locations.value].xplorFuego;
					if (xplorFuego === 999) {
						return 'TBA';
					} else {
						return xplorFuego;
					}
				},
				get dropOff1() {
					let xplorFuego = hotelList[locations.value].xplorFuego;
					if (xplorFuego === 999) {
						return 'TBA';
					} else {
						xplorFuego = convertTime(xplorFuego);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xplorFuego - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
		xplorFuegoKids: {
			name: 'Xplor Fuego - Kids',
			bookingRequirements: {
				available: 'Daily',
				days: 1,
				maxDepth: '130ft / 40m',
				minAge: 15,
				minCertLvl: 'Open Water Diver',
				minClients: 2,
				transport: 'Included',
				get deposit() {
					return roundUp(convertToUSD(cthulhuTours.nonDiving.xplorFuegoKids.costs.entrance, 2));
				},
			},
			cardImg: '../img/cards/non-diving-xplor-fuego.webp',
			href: 'https://cthulhudivers.com/non-diving/cancun-playa-mujeres-xplor-fuego',
			costs: {
				entrance: convertToMEX(85, 2),
			},
			profitPercent: 1.14,
			transport: {
				costaMujeres: 0,
				playaMujeres: 0,
				cancun: 0,
				cancunMorelos: 0,
				morelosPdc: 0,
				pdc: 0,
				pdcKantenah: 0,
				kantenahTulum: 0,
				get pickUp1() {
					let xplorFuego = hotelList[locations.value].xplorFuego;
					if (xplorFuego === 999) {
						return 'TBA';
					} else {
						return xplorFuego;
					}
				},
				get dropOff1() {
					let xplorFuego = hotelList[locations.value].xplorFuego;
					if (xplorFuego === 999) {
						return 'TBA';
					} else {
						xplorFuego = convertTime(xplorFuego);
						let estimatedArrival = convertTime('10:00');
						let estimatedDeparture = convertTime('20:30');
						let travelTime = estimatedArrival - xplorFuego - 120;
						let estimatedDropOff = estimatedDeparture + travelTime;
						return revertTime(estimatedDropOff);
					}
				},
			},
			get prep() {
				return [`<span>To Do:</span> Confirm pick up time with the park and the client`];
			},
		},
	},
};
