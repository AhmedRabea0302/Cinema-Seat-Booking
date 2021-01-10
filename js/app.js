const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; // The plus to convert it to a number
populateUi();
// Get the data from local storage ans populate ui
function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('seats'));
    if(selectedSeats.length != 0 && selectedSeats != null) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieindex');
    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    
}

// Set Movie Data
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('movieindex', movieIndex);
    localStorage.setItem('movieprice', moviePrice);
}

// Update Total Count
function udateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const totalPrice = selectedSeats.length * ticketPrice;
    
    console.log(totalPrice);

    const seatIndexs = [...selectedSeats].map(seat => [...seats].indexOf(seat) );
    console.log(seatIndexs);
    
    localStorage.setItem('count', selectedSeats.length);
    localStorage.setItem('total', totalPrice);
    localStorage.setItem('seats', JSON.stringify(seatIndexs));

    count.innerText = localStorage.getItem('count');
    console.log(localStorage.getItem('count'));
    total.innerText = localStorage.getItem('total');
}

// Movie Select Event 
movieSelect.addEventListener('change', event => {
    ticketPrice = +event.target.value;
    setMovieData(event.target.selectedIndex, event.target.value)
    udateSelectedCount();
});

// Seat Click Event
container.addEventListener('click', event => {
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        udateSelectedCount();
    }
});

udateSelectedCount();
