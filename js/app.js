const cards = ['cloud','cloud','traffic','traffic','favorite','favorite','computer','computer',
    'android','android','business','business','flag','flag','wallpaper','wallpaper'];

const wrapper =document.querySelector('.wrapper');
const reset = document.getElementById('reset');

let arraylist = ['box','hide'];
let openCardList =[];
let visibleCount =0;
let lastPickedCard =null;
let moveCount =0;
let mc = document.getElementById('counter');
let parentElement = document.getElementById('parent');
let seconds =0;
let clock = document.getElementById('clock');
let rating = document.getElementById('rating');
let star = document.getElementsByClassName('ratingstars');


function shuffle(array) {

    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        let temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

function starRating(){

    if (moveCount === 20 && star.length === 5){
        rating.removeChild(star.item(4));
    }else if (moveCount === 30 && star.length === 4){
        rating.removeChild(star.item(3));
    }
    else if(moveCount === 40 && star.length === 3){
        rating.removeChild(star.item(2));
    }
    else if(moveCount === 50 && star.length === 2){
        rating.removeChild(star.item(1));
    }else {
        console.log('do nothing with the stars '+ star.length);
        console.log('number of actual moves '+ moveCount);
    }
}

setInterval(starRating, 1000);

function createCards(array){
    console.log(wrapper);
    for (let i=0; i< array.length; i++){
        const box = document.createElement('li');
        box.classList.add(...arraylist);
        box.innerHTML = `<p><i class="material-icons">${array[i]}</i></p>`;
        wrapper.appendChild(box);
    }
}
function createStars(){
    for (let i=0; i<5;i++){
        let s = document.createElement('li');
        s.classList.add('ratingstars');
        s.innerHTML = `<i class="material-icons stars">star</i>`;
        rating.appendChild(s);
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
    //reset all counters and destroy current state
    moveCount =0;
    mc.innerHTML = `0 Moves`;
    clock.innerHTML = `00:00`;
    seconds = 0;
    lastPickedCard =null;
    openCardList=[];
    let temp = wrapper.getElementsByTagName('li');
    for (let k of cards){
        wrapper.removeChild(temp.item(k));
    }
    for(let j=star.length; j>0 ; j--){
        rating.removeChild(star.item(star.length-1));
    }
    //rebuild
    init();
}

function init(){

    let shuffleCards = shuffle(cards);
    createCards(shuffleCards);
    createStars();
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
            },500);
        }
        visibleCount = Math.floor(moveCount++/2);
        mc.innerHTML = `${visibleCount} Moves`;
    }
    if(openCardList.length == 16){

        gameCompleted();
    }
});

function gameCompleted(){
    setTimeout(function (){alert(
        `                      Hurray.....!!!
         you have successfully completed the challenge 
                   below are the performance stats
             Time taken:            ${clock.innerText} Seconds
             Number of Moves:  ${visibleCount} Moves
             Memory Level:        ${star.length} Star `);
        gameReset();
    }, 800);
}

function compareCards(cardA, cardB){
    if (cardA == cardB){
        return true;
    }
    else return false;
}

//initate sequence
init();



