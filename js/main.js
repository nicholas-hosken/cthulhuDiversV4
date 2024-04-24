//* 0.0 Contents
//======================================================*/
//  1.0 navbar dropdown behaviour
//  3.0 article vs sidebar
//  9.0 window resize

//  1.0 navbar dropdown behaviour
//======================================================*/
const burger = document.querySelector('#burger');
const waterNavBtn = document.querySelector('#waterNavBtn');
const landNavBtn = document.querySelector('#landNavBtn');
const waterMenu = document.querySelector('#waterMenu');
const landMenu = document.querySelector('#landMenu');
const navItem = document.querySelectorAll('.nav-item');
const navbarNav = document.querySelector('#navbarNav');
const backBtn = document.querySelectorAll('.backBtn');

const showWaterMenu = () => {
	waterMenu.style.display = 'block';
	if (window.innerWidth <= 1199) {
		navbarNav.classList.toggle('show');
	}
};

const showLandMenu = () => {
	landMenu.style.display = 'block';
	if (window.innerWidth <= 1199) {
		navbarNav.classList.toggle('show');
	}
};

const hideNavMenus = () => {
	waterMenu.style.display = 'none';
	landMenu.style.display = 'none';
};

const burgerListeners = () => {
	burger.addEventListener('click', () => {
		if (burger.classList.contains('cross')) {
			burger.classList.remove('cross');
			hideNavMenus();
			navbarNav.classList.remove('show');
		} else {
			burger.classList.add('cross');
			navbarNav.classList.add('show');
		}
	});
};
burgerListeners();

const btnLeave = (btn, menu) => {
	hideNavMenus();
	btn.addEventListener('mouseleave', (e) => {
		setTimeout(() => {
			if (e.relatedTarget && (e.relatedTarget.matches('#banner') || e.relatedTarget.matches('#waterMenu'))) {
				menu();
			}
		}, 500);
	});
};

navItem.forEach((e) => {
	e.addEventListener('mouseenter', () => {
		hideNavMenus();
	});
});

const navListeners = () => {
	waterNavBtn.addEventListener('mouseenter', showWaterMenu, hideNavMenus);
	landNavBtn.addEventListener('mouseenter', showLandMenu, hideNavMenus);

	btnLeave(waterNavBtn, showWaterMenu());
	btnLeave(landNavBtn, showLandMenu());

	waterMenu.addEventListener('mouseleave', hideNavMenus);
	landMenu.addEventListener('mouseleave', hideNavMenus);
};

const navListenersRemove = () => {
	waterNavBtn.removeEventListener('mouseenter', showWaterMenu);
	landNavBtn.removeEventListener('mouseenter', showLandMenu);

	waterMenu.removeEventListener('mouseleave', hideNavMenus);
	landMenu.removeEventListener('mouseleave', hideNavMenus);
};

const mobileNavListeners = () => {
	waterNavBtn.addEventListener('click', showWaterMenu);
	landNavBtn.addEventListener('click', showLandMenu);
};

const mobileNavListenersRemove = () => {
	waterNavBtn.removeEventListener('click', showWaterMenu);
	landNavBtn.removeEventListener('click', showLandMenu);
};

const backBtnListeners = () => {
	backBtn.forEach((e) => {
		e.addEventListener('click', () => {
			hideNavMenus();
			navbarNav.classList.toggle('show');
		});
	});
};
backBtnListeners();

//  3.0 Article vs sidebar
//======================================================*/
const content = document.querySelector('#content');
const sidebar = document.querySelector('#sidebar');

//  3.1 Article position according to viewport width
function articleSidebar(vw) {
	if (vw > 1199) {
		content.classList.add('col-sm-6', 'offset-2');
		content.classList.remove('col-sm-10', 'offset-1');
	} else {
		// content.style.backgroundColor = 'red';
		content.classList.add('col-sm-10', 'offset-1');
		content.classList.remove('col-sm-6', 'offset-2');
		if (vw <= 575) {
			content.classList.remove('offset-1');
		}
	}
}

//  3.2 Sidebar image display
const sbMenu = document.querySelector('#sbMenu');
const sidebarImg = document.querySelectorAll('.sidebarImg');

function sidebarImgDisplay(vw) {
	let contentHeight = content.offsetHeight;
	let sbMenuHeight = sbMenu.offsetHeight;
	let remaining = contentHeight - sbMenuHeight;

	if (vw > 1199) {
		if (contentHeight > sbMenuHeight) {
			let imgCalc = Math.ceil(remaining / 1203);
			for (var i = 0; i < imgCalc; i++) {
				sidebarImg[i].style.height = `${remaining / imgCalc - 5}px`;
			}
			sidebar.style.height = `${contentHeight}px`;
			sidebar.style.overflow = 'hidden';
			for (let i = 0; i < sidebarImg.length; i++) {
				sidebarImg[i].style.display = 'block';
			}
		} else {
			for (let i = 0; i < sidebarImg.length; i++) {
				sidebarImg[i].style.display = 'none';
			}
		}
	}
}

// 3.3 Content Image height
const contentImg = document.querySelectorAll('.contentImg');

function setContentImgHeight() {
	contentImg.forEach((e) => {
		e.style.objectFit = 'cover';
		e.style.height = `${contentImg[0].width / 2}px`;
	});
}
//  9.0 window resize
//======================================================*/
window.addEventListener('resize', function () {
	let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

	for (let i = 0; i < sidebarImg.length; i++) {
		sidebarImg[i].style.display = 'none';
	}
	sidebar.style.height = 'auto';

	if (vw > 1199) {
		navListeners();
		mobileNavListenersRemove();
		navbarNav.classList.remove('show');
	} else {
		setContentImgHeight();
		navListenersRemove();
		mobileNavListeners();
	}

	burger.classList.remove('cross');
	navbarNav.classList.remove('show');
	hideNavMenus();
	articleSidebar(vw);
	sidebarImgDisplay(vw);
});
