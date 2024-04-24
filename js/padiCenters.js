const centers = document.getElementById('centers');
if (!centers) throw new Error('Centers element not found');
let selectedCenter;

const centerNames = document.querySelectorAll('.centerInfo li:first-child');
centerNames.forEach((center) => {
	// convert the center name to uppercase
	center.textContent = center.textContent.toUpperCase();
});

const displayCenterInfo = () => {
	if (selectedCenter) {
		const previousCenter = document.getElementById(selectedCenter);
		if (previousCenter) previousCenter.classList.remove('d-flex');
	}

	selectedCenter = centers.options[centers.selectedIndex].value;

	const clientCenter = document.getElementById(selectedCenter);
	if (!clientCenter) throw new Error(`Center element not found: ${selectedCenter}`);

	clientCenter.classList.add('d-flex');
};

displayCenterInfo();

if (centers != null) {
	centers.addEventListener('change', function () {
		displayCenterInfo();
	});
}
