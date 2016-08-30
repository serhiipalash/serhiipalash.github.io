var squares = document.querySelectorAll('.square'),
	infoBlocks = document.querySelectorAll('.info-block');

if (squares !== null && infoBlocks !== null) {
	for (var i = 0, l = squares.length; i < l; i++) {
		squares[i].onclick = function () {
			Array.prototype.forEach.call(squares, function (s) {
				s.classList.remove('active');
			});
			this.classList.add('active');
			setInfo(this.dataset);
		}
	}
}

window.onload = function () {
	var activeSquaer = document.querySelector('.square.active');
	if (activeSquaer !== null) {
		setInfo(activeSquaer.dataset);
	} else {
		squares[0].classList.add('active');
		setInfo(squares[0].dataset);
	}
}

function navArrowOnClickHandler(step) {
	var s = step || 1,
		activeSquaer = document.querySelector('.square.active');

	if (activeSquaer !== null && parseInt(activeSquaer.dataset.index) + s > -1
		&& parseInt(activeSquaer.dataset.index) + s < squares.length) {
		activeSquaer.classList.remove('active');
		squares[parseInt(activeSquaer.dataset.index) + s].classList.add('active');
		setInfo(squares[parseInt(activeSquaer.dataset.index) + s].dataset);
	}
}

function setInfo(data) {
	for (var i = 0, l = infoBlocks.length; i < l; i++) {
		infoBlocks[i].querySelector('.block-title').textContent = data.title;
		infoBlocks[i].querySelector('.date').textContent = data.date;
		infoBlocks[i].querySelector('.square-info').textContent = data.info;
	}
}