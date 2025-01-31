(function() {

	if (window.innerWidth <= 768) return;

	const containers = document.querySelectorAll('.gooey-container');
	const MARGIN = 50;
	const size = 100;

	document.body.insertAdjacentHTML(
		'beforeend',
		`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="position:absolute; height:0">
			<defs>
				<filter id="gooey">
					<fegaussianblur in="SourceGraphic" stddeviation="10" result="blur" />
					<fecolormatrix
						in="blur"
						mode="matrix"
						values="
							1 0 0 0 0
							0 1 0 0 0
							0 0 1 0 0
							0 0 0 20 -10
						"
						result="goo"
					/>
					<fecomposite in="SourceGraphic" in2="goo" operator="atop"/>
				</filter>
			</defs>
		</svg>`
	);

	function calcDistance(mouse, bounds) {
		const { clientX: mX, clientY: mY } = mouse;
		const distanceXLeft = Math.min(1, (mX - (bounds.x - MARGIN)) / (MARGIN + bounds.width / 2));
		const distanceXRight = Math.min(1, -(mX - (bounds.x + bounds.width + MARGIN)) / (MARGIN + bounds.width / 2));
		const distanceYTop = Math.min(1, (mY - (bounds.y - MARGIN)) / (MARGIN + bounds.height / 2));
		const distanceYBottom = Math.min(1, -(mY - (bounds.y + bounds.height + MARGIN)) / (MARGIN + bounds.height / 2));
		return Math.min(distanceXLeft, distanceXRight, distanceYTop, distanceYBottom);
	}

	containers.forEach(container => {

		const buttons = container.querySelectorAll('.gooey');
		const mouseDot = document.createElement('DIV');

		Object.assign(mouseDot.style, {
			position: 'absolute',
			zIndex: -1,
			width: '30px',
			height: '30px',
			borderRadius: '50%',
			background: 'palevioletred',
			opacity: '0.5',
			visibility: 'hidden',
		//	pointerEvents: 'none',
		//	transform: 'translate(-50%, -50%)',
		//	transition: 'all 0.3s ease-out'
	  });

		container.style.filter = "url('#gooey')";
		container.style.position = 'relative';
		container.appendChild(mouseDot);

		function gooey(e) {
			const containerBounds = container.getBoundingClientRect();
			const x = e.clientX;
			const y = e.clientY;
			let inside = buttons.length;

			buttons.forEach(button => {
				const bounds = button.getBoundingClientRect();

				if (
					x > bounds.x - MARGIN &&
					x < bounds.x + bounds.width + MARGIN &&
					y > bounds.y - MARGIN &&
					y < bounds.y + bounds.height + MARGIN
					) {
						inside++;
						const distance = calcDistance(e, bounds);
						mouseDot.size = size * distance;
						mouseDot.style.width = `${size * distance}px`;
						mouseDot.style.height = `${size * distance}px`;
						mouseDot.style.background = window.getComputedStyle(button).backgroundColor;
					} else {
						inside--;
					}
			});

			if (inside !== 0) {
				mouseDot.style.visibility = "visible";
				mouseDot.style.left = `${x - mouseDot.size / 2 - containerBounds.x}px`;
				mouseDot.style.top = `${y - mouseDot.size / 2 - containerBounds.y}px`;
			} else {
				mouseDot.style.visibility = "hidden";
			}
		}
		window.addEventListener('mousemove', gooey);
	});

})();


