const cards = ['cloud','cloud','traffic','traffic','favorite','favorite','computer','computer',
    'android','android','business','business','flag','flag','wallpaper','wallpaper'];
console.log(cards);

function Createcards(array){

    const Wrapper = document.querySelector('.wrapper');
    console.log(Wrapper);
    for (let i=0; i< array.length; i++){
        const box = document.createElement('li');
        box.classList.add('box');
        box.classList.add('hide');
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
Createcards(shuffleCards);

