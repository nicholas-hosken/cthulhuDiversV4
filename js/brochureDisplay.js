let sr = 'safari';
let srInfo = document.getElementById('srInfo');
let brochure = document.getElementById('brochure');
let brochureSwap = document.getElementById('brochureSwap');

function run(sr, pgs) {
	srInfo.innerHTML = '';
	for (let pg = 1; pg < pgs; pg++) {
		let page = document.createElement('img');
		page.src = `../img/sardineRun/${sr}-${pg}.webp`;
		page.setAttribute('width', '100%');
		page.setAttribute('alt', `Sardine Run South Africa ${sr} brochure page${pg}`);
		page.style.marginBottom = '15px';
		page.style.border = '7px solid #fff';
		srInfo.appendChild(page);
	}
}

function brochureSwitch() {
	if (sr == 'oceans') {
		brochure.innerHTML = `Sardine Run Oceans`;
		run(sr, 15);
		brochureSwap.innerHTML = `View the<br>Sardine Run Safari`;
		sr = 'safari';
		sidebar.style.height = '28546px';
		sidebarImg[22].style.height = '518px';
		display(sidebarImg[23], 'none');
		display(sidebarImg[24], 'none');
	} else if (sr == 'safari') {
		brochure.innerHTML = `Sardine Run Safari`;
		run(sr, 16);
		brochureSwap.innerHTML = `View the<br> Sardine Run Oceans`;
		sr = 'oceans';
		sidebarImg.forEach((i) => {
			display(i, 'block');
			i.style.height = '1156px';
		});
	}
	sidebarHeightCalc();
}

brochureSwitch();
