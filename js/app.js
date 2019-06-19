const cards = ['cloud','cloud','traffic','traffic','favorite','favorite','computer','computer',
    'android','android','business','business','flag','flag','wallpaper','wallpaper'];

let arraylist = ['box','hide'];
let openCardList =[];

function Createcards(array){

    const Wrapper = document.querySelector('.wrapper');
    console.log(Wrapper);
    for (let i=0; i< array.length; i++){
        const box = document.createElement('li');
        box.classList.add(...arraylist);
        box.innerHTML = `<p><i class="material-icons">${array[i]}</i></p>`;
        Wrapper.appendChild(box);
    }
}
 function shuffle(array) {

    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
return array;
}

let shuffleCards = shuffle(cards);
console.log(shuffleCards);
Createcards(shuffleCards);

function closeCard(){
    let cards = document.querySelectorAll('li');
}

let lastPickedCard =null;
let currentPickedCard;

let parentElement = document.querySelector('ul');
let openCounter =0;
parentElement.addEventListener('click', function respondToClick(childElement){
    console.log('Item clicked'+ childElement.target.innerHTML);
    if (childElement.target.nodeName === 'LI' && lastPickedCard !== childElement.target){
        childElement.target.classList.toggle('hide');
            if(lastPickedCard == null){
                lastPickedCard = childElement.target;
                console.log(lastPickedCard, childElement.target.textContent);

            } else if (compareCards(lastPickedCard.textContent, childElement.target.textContent)){
                console.log ('Match found');
                lastPickedCard.classList.add('match');
                childElement.target.classList.add('match');
                openCardList.push(lastPickedCard.textContent, childElement.target.textContent);
                lastPickedCard =null;
                }
                else if (!compareCards(lastPickedCard.textContent, childElement.target.textContent)){
                setTimeout(function toggleCards() {
                    lastPickedCard.classList.toggle('hide');
                    childElement.target.classList.toggle('hide');
                    lastPickedCard =null;
                },2000);
            }
    }
});

function compareCards(cardA, cardB){
    if (cardA == cardB){
        return true;
    }
    else return false;
}



