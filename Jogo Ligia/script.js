const grid = document.querySelector('.containers');

const pics = [
    'anjo-antiga.jpg',
    'azul-expre.jpg',
    'vazo-dadaismo.jpg',
    'Caras-realismo.jpeg',
    'roda-dadaismo.webp',
    'grito-expre.webp',
];

const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;

    return element;

};

let firstCard = '';
let secondCard ='';
let flipCount = 0;

const end = () => {
    const correct_card = document.querySelectorAll('.correct_card');

    if (correct_card.length === 12) {
        alert('Parabéns você completou o jogo!!');
        location.reload();
    }
}

const check_card = () => {

    const firstCaracter = firstCard.getAttribute('data-caracter');
    const secondCaracter = secondCard.getAttribute('data-caracter');

    if (firstCaracter === secondCaracter) {

        firstCard.firstChild.classList.add('correct_card');
        secondCard.firstChild.classList.add('correct_card');

        firstCard = '';
        secondCard = ''; 

        end();

    }else {

        setTimeout(() => {

        firstCard.classList.remove('card_back_click');
        secondCard.classList.remove('card_back_click');

        firstCard = '';
        secondCard = '';

    }, 900)
        
    }
}

const card_back_click = ({target}) => {

    if (target.parentNode.className.includes('card_back_click')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('card_back_click');
        firstCard = target.parentNode;

    }else if (secondCard === '') {

        target.parentNode.classList.add('card_back_click');
        secondCard = target.parentNode;

        // Contador de Flips:

        flipCount++;
        document.querySelector('#flips').innerHTML = `${flipCount}`;

        // fim

        check_card();

    }
    
}

const CreateCard = (pic) => {
    const Card = createElement('div', 'card');
    const front = createElement('div', 'conf front');
    const back = createElement('div', 'conf back');

    front.style.backgroundImage = `url('img/${pic}')`

    Card.appendChild(front);
    Card.appendChild(back);

    Card.addEventListener('click', card_back_click);
    Card.setAttribute('data-caracter', pic);

    return Card;
};

const load = () => {

    const duplicate_pics = [ ...pics, ...pics];

    const embaralhar = duplicate_pics.sort(() => Math.random() - 0.5);

    duplicate_pics.forEach((pic) => {
        
        const card = CreateCard(pic);
        grid.appendChild(card);

    });
}

document.querySelector('.btn').addEventListener('click', function() {
    location.reload();
});

// Cronometro:

const timer = document.querySelector('#timer');

const hora = Date.now();

const contador = () => {
    const tempAtual = Date.now();
    let cont = tempAtual-hora
    let seg=Math.floor((tempAtual-hora)/1000);
    timer.innerHTML=seg
};

setInterval(contador,1000)
 
load();