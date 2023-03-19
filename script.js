const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


    //MUDANÇA DE COR CASO TEMA ESTEJA ESCURO E CASO ESTEJA CLARO (DEIXAREI DESATIVADO POR ENQUANTO)
    //SE PRECISAR EU ATIVO DEPOIS.

    // if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //     // Aplicar configurações de cor escura
    //     let images = document.querySelectorAll(".icon");
    //     images.forEach(function(img) {
    //       img.setAttribute("style", "background-color: #000000;");
    //     });
    //   } else {
    //     // Aplicar configurações de cor clara
    //     let images = document.querySelectorAll(".icon");
    //     images.forEach(function(img) {
    //       img.setAttribute("style", "background-color: #FFFFFF;");
    //     });
    //   }

    startGame();

    function startGame() {
        initializeCards(game.createCardsFromTechs());

        let images = document.querySelectorAll(".icon");

    images.forEach(function(img) {
    img.setAttribute("width", "125");
    img.setAttribute("height", "125");
    img.setAttribute("style", "background-color: #000000;");
    });
    }

    //UTILIZEI O CHAT GPT NESSE TRECHO, SERVE PARA CONSERTAR O TAMANHO DAS CARTAS
    //APÓS SEREM VIRADAS, COM O COMANDO FLIP

    function initializeCards(cards) {
        let gameBoard = document.getElementById("gameBoard");
        gameBoard.innerHTML = '';

        game.cards.forEach(card => {

            let cardElement = document.createElement('div');
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.icon = card.icon;
            
            createCardContent(card, cardElement);

            cardElement.addEventListener('click', flipCard)
            gameBoard.appendChild(cardElement);

        })
        
    }

    function createCardContent(card, cardElement) {
        
        createCardFace(FRONT, card, cardElement);
        createCardFace(BACK, card, cardElement);

    }

    function createCardFace(face, card, element) {
        
        let cardElementFace = document.createElement('div');
        cardElementFace.classList.add(face);
        if (face === FRONT){
            let iconElement = document.createElement('img');
            iconElement.classList.add(ICON);
            iconElement.src = "./image/" + card.icon + ".png";
            cardElementFace.appendChild(iconElement);
        } else{
            cardElementFace.innerHTML = "&lt/&gt";
        }
        element.appendChild(cardElementFace)
    }

   

function flipCard() {

    if (game.setCard(this.id)) {

        this.classList.add('flip');
        if(game.secondCard) {
            if(game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }else{
                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                }, 1000);
            };
        }
    }

}

function restart() {
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';

}