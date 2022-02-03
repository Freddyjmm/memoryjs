document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        {
            name:'bulbasaur',
            img:'images/001.png'
        },
        {
            name:'ivysaur',
            img:'images/002.png'
        },
        {
            name:'venusaur',
            img:'images/003.png'
        },
        {
            name:'charmander',
            img:'images/004.png'
        },
        {
            name:'charmaleon',
            img:'images/005.png'
        },
        {
            name:'charizard',
            img:'images/006.png'
        },
        {
            name:'squirtle',
            img:'images/007.png'
        },
        {
            name:'wartortle',
            img:'images/008.png'
        },
        {
            name:'blastois',
            img:'images/009.png'
        },
        {
            name:'bulbasaur',
            img:'images/001.png'
        },
        {
            name:'ivysaur',
            img:'images/002.png'
        },
        {
            name:'venusaur',
            img:'images/003.png'
        },
        {
            name:'charmander',
            img:'images/004.png'
        },
        {
            name:'charmaleon',
            img:'images/005.png'
        },
        {
            name:'charizard',
            img:'images/006.png'
        },
        {
            name:'squirtle',
            img:'images/007.png'
        },
        {
            name:'wartortle',
            img:'images/008.png'
        },
        {
            name:'blastois',
            img:'images/009.png'
        },
        {
            name:'pikachu',
            img:'images/025.png'
        },
        {
            name:'pikachu',
            img:'images/025.png'
        }
    ];

    cardArray.sort(() => 0.5 - Math.random())

    var cardsChoosen = [];
    var cardsChoosenId = [];
    var cardsWon = [];
    var wronsScore = 0;

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const message = document.getElementById('message');
    const wrons = document.getElementById('wrons');

    //create the board
    function createBoard() {

        for(let i = 0; i < cardArray.length; i++){
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id',i);
            card.setAttribute('style', 'margin:6px');
            card.onclick = flipCard;
            grid.appendChild(card);
        }
    }

    //check for Match
    function checkForMatch(){
        /*
        at the begining we select an htmlcollection of all div for card and optain
        the first and second card selection is stored in values to compare their names and if they are not the same div
        to avoid bugs if they do are we change the image show by the div to simulate a white space and set thier event to null
        in the case their names are diferent the bad score is adding by one and the image show for they are restored to blank
        avoiding the div already found out finnaly the variables are reseted and we check if we has find out all cardss
        */
        var cards = document.querySelectorAll('img[data-id]');
        const optionOneId = cardsChoosenId[0];
        const optionTwoId = cardsChoosenId[1];
        if(cardsChoosen[0] === cardsChoosen[1] && optionOneId != optionTwoId){
            message.innerText = 'You Have Found One Match';
            cards[optionOneId].setAttribute('src', 'images/white.jpg');
            cards[optionOneId].onclick = null;
            cards[optionTwoId].setAttribute('src', 'images/white.jpg');
            cards[optionTwoId].onclick = null;
            cardsWon.push(cardsChoosen);
        } else {
            wronsScore++;
            for(let card of cards){
                if(card.getAttribute('src') === 'images/white.jpg' || card.getAttribute('src') === 'images/blank.png'){
                    continue;
                } else {
                    card.setAttribute('src', 'images/blank.png');
                };
            };
            message.innerText = 'Sorry Try Again';
        }

        cardsChoosen = [];
        cardsChoosenId = [];
        resultDisplay.textContent = cardsWon.length;
        wrons.textContent = wronsScore;
        if(cardsWon.length === cardArray.length/2){
            message.innerHTML = 'Congratulations! You Found Them all!' + ' <a href="http://localhost:3000/">Reset</a>';
        }
    }

    //flip your card
    function flipCard(){
        //each divs has an event and each events pass an object to its callback
        //that object contain information of the event, so that is the reason for what
        //we can optain the id of the div selected, this function track the name and the
        //id of each selected div in 2 arrais, so when we clik on a div to simulate the fliping
        //we change to image show by the div for its correponding img stored in the variable cardArray
        //remenbering that cardArray is reorganised with the function sort()
        //finally when the array cardChoosen is bigger or equal than  2 the chechForMatch is called fater
        //aproximadly 1/2 seconds after
        var cardId = this.getAttribute('data-id');
        cardsChoosen.push(cardArray[cardId].name);
        cardsChoosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if(cardsChoosen.length >= 2){
            setTimeout(checkForMatch,500);
        }

    }

    createBoard()
})