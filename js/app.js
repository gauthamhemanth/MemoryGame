const cards = ['cloud','cloud','traffic','traffic','favorite','favorite','computer','computer',
    'android','android','business','business','flag','flag','wallpaper','wallpaper'];

const Wrapper =document.querySelector('.wrapper');
const reset = document.getElementById('reset');

let arraylist = ['box','hide'];
let openCardList =[];
let c;
let lastPickedCard =null;
let moveCount =0;
let mc = document.getElementById('counter');
let parentElement = document.querySelector('ul');
let seconds =0;
let clock = document.getElementById('clock');

function shuffle(array) {

    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

function Createcards(array){
    console.log(Wrapper);
    for (let i=0; i< array.length; i++){
        const box = document.createElement('li');
        box.classList.add(...arraylist);
        box.innerHTML = `<p><i class="material-icons">${array[i]}</i></p>`;
        Wrapper.appendChild(box);
    }
}

function convertTimer(s){
    let min = Math.floor(s/60);
    let sec = s % 60;
    if (sec <= 9 && min <=9){
        return `0${min} : 0${sec}`;
    }else if(sec >9 && min <=9){
        return `0${min} : ${sec}`;
    } else if (sec >9 && min >9){
        return `${min} : ${sec}`;
    }else if (sec <=9 && min >9){
        return `${min} : 0${sec}`;
    }
}

function gameTimer(){
    seconds++;
    clock.innerHTML = convertTimer(seconds);
}

setInterval(gameTimer,1000);

function gameReset(){
    moveCount =0;
    mc.innerHTML = `0 Moves`;
    clock.innerHTML = `00:00`;
    seconds = 0;
    lastPickedCard =null;
    let temp = document.getElementsByTagName('li');
    for (let k of cards){
        Wrapper.removeChild(temp.item(k));
    }
    Createcards(shuffleCards);
}

let shuffleCards = shuffle(cards);
console.log(shuffleCards);
Createcards(shuffleCards);

function closeCard(){
    let cards = document.querySelectorAll('li');
}

reset.addEventListener('click', gameReset);
parentElement.addEventListener('click', function respondToClick(childElement){
    console.log('Item clicked'+ childElement.target.innerHTML);
    if (childElement.target.nodeName === 'LI' && lastPickedCard !== childElement.target){
        childElement.target.classList.toggle('hide');
            if(lastPickedCard == null){
                lastPickedCard = childElement.target;

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
                },1000);
            }
            c = Math.floor(moveCount++/2);
            mc.innerHTML = `${c} Moves`;

    }
    if(openCardList.length == 16){

        gameCompleted();
    }
});

function gameCompleted(){
    setTimeout(function (){alert(
        `            Hurray..!!!
         you won with the below performace stats
             Time taken:      ${clock.innerText} Seconds
             Number of Moves:  ${c} Moves`);
    gameReset();
    }, 1000);
}

function compareCards(cardA, cardB){
    if (cardA == cardB){
        return true;
    }
    else return false;
}



