window.onload = function () {

    var seconds = 00;
    var tens = 00;
    var appendSeconds = document.getElementById("seconds");
    var appendTens = document.getElementById("tens");
    const buttonStart = document.getElementById("btn-start")
    var buttonPause = document.getElementById('btn-pause')
    var buttonReset = document.getElementById("btn-reset")
    var interval;
    const cards = document.querySelectorAll('.card');
    var hasFlippedCard = false;
    var firstCard, secondCard;
    var lockBoard = true;
    var totalMatches = 0;
    var fimDeJogo = false;


    //onClick do Botão Start
    buttonStart.onclick = function () {
        lockBoard = false;
        clearInterval(interval);
        interval = setInterval(startTime, 10);
        document.getElementById('btn-reset').disabled = true;
        document.getElementById('btn-pause').disabled = false;

        // buttonPause.innerHTML = 'Pausar'
        mecanicalShuffle();
        console.log('O Jogo Startou');
    }
    //onClick do Botão Reiniciar
    buttonReset.onclick = function () {
        console.log('O Jogo Reinicou');
        clearInterval(interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        lockBoard = true;
        // buttonPause.innerHTML = 'Pausar';
        buttonStart.innerHTML = 'Start';
        mecanicalShuffle();
    }
    //onClick do Botão Pause
    buttonPause.onclick = function () {
        clearInterval(interval);
        lockBoard = true;
        buttonStart.innerHTML = 'Continuar';
        document.getElementById('btn-reset').disabled = false;

    }

    //função do temporizador
    function startTime() {
        tens++;

        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;
        }
        if (tens > 99) {
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }
    }

    // O JOGO



    //função para virar carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.toggle('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            console.log('virou a carta');
            return;
        }

        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();
    }

    //função que checa se as cartas são iguais
    function checkForMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            disableCards();
            console.log('Checou se as cartas são iguais');
            totalMatches = totalMatches + 1;
            console.log('Total de Matches' + totalMatches);
            if (totalMatches == 6) {
                clearInterval(interval);
                document.getElementById('btn-reset').disabled = false;
                fimDeJogo = true;
                if (fimDeJogo == true) {
                    lockBoard = true;
                    hasFlippedCard = false;
                    totalMatches = 0;
                    enableCards()
                }
                return;
            }

            return;
        }

        unflipCards();
    }

    function enableCards() {
        firstCard.addEventListener('click', flipCard);
        secondCard.addEventListener('click', flipCard);
        console.log('Habilitou a carta');
    }

    //função que desabilita as cartas
    function disableCards() {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        console.log('Desabilitou a carta');

        resetBoard();
    }

    //funcão que desvira as cartas
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 500);
        console.log('Desvirou a carta');
    }

    //função que reseta o tabuleiro
    function resetBoard() {
        console.log('Resetou o tabuleiro');
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function mecanicalShuffle() {
        console.log('Embaralhou');
        cards.forEach((card) => {
            var ramdomPosition = Math.floor(Math.random() * 12);
            card.style.order = ramdomPosition;
            resetBoard();
            flipCard();
        })
    }

    //função que embaralha automaticamente as cartas
    (function shuffle() {
        console.log('Embaralhou');
        cards.forEach((card) => {
            var ramdomPosition = Math.floor(Math.random() * 12);
            card.style.order = ramdomPosition;
        })
    })();

    //adiciona evento de clique na carta
    cards.forEach((card) => {
        card.addEventListener('click', flipCard);
        console.log('Cliquei na carta');
    });
}


