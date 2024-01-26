let audio;
let timer;
let currentSound = 0;
let defaultCountdownDuration = 3;
let countdownDuration = defaultCountdownDuration;
let countdownInterval;
let artistTrue = false;
let songTrue = false;

document.addEventListener('DOMContentLoaded', () => {
    // Préparation au démarrage du son
    countdownInterval = setInterval(startBlindtest.bind(false), 1000);
    startBlindtest(false);
    // Reponse donné par l'utilisateur
    document.addEventListener('reponseBlindTest', controlResponse);
})

function controlResponse(e) {
    artistTrue = verifArtist(e.detail.transcript);
    songTrue = verifTitle(e.detail.transcript);
    if(artistTrue && songTrue) {
        document.getElementById('result').textContent = "bravo vous avez trouvé";
        printPrevSong(true);
        currentSound++;
        startBlindtest(true);
    }
    else if(artistTrue) {
        document.getElementById('result').textContent =  "Vous avez trouvé l'artiste, quel est la chanson maintenant ?";
    }
    else if(songTrue) {
        document.getElementById('result').textContent = "Vous avez trouvé la chanson, quel est l'artiste maintenant ?";
    }
}

function verifArtist(response) {
    if(artistTrue === true) return true;
    return response.toLowerCase().includes(document.getElementById('artist_song').value.toLowerCase()); 
}

function verifTitle(response) {
   if(songTrue === true) return true;
   return response.toLowerCase().includes(document.getElementById('title_song').value.toLowerCase()); 
}

function startBlindtest(next) {
    clearTimeout(timer); // On peut enlever le timer
    if(next) {
        document.getElementById("countdown").innerText = `La prochaine musique va démarrer dans ${countdownDuration} seconde(s)` ;
    } else {
        document.getElementById("countdown").innerText = `Le blindtest va démarrer dans ${countdownDuration} seconde(s)` ;
    }
    countdownDuration--;
    if (countdownDuration < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerText = "";
        startSound();
    }
}

function startSound() {
    document.getElementById('result').textContent = "";
    artistTrue = false;
    songTrue = false;
    // si il y a deja un son on le stop
    if(audio) {
        audio.pause();
        audio = null;
    }

    document.getElementById('result').value = "";
    if(songs.length > 0 && songs[currentSound] != undefined) {
        document.getElementById('artist_song').value = songs[currentSound].artist_name.toLowerCase();
        document.getElementById('title_song').value = songs[currentSound].title.toLowerCase();

        // On déclenche un timer au bout des 30 secondes on passe à la musique suivant
        timer = window.setTimeout(() => {
            document.getElementById('result').textContent = "Vous n'avez pas trouvé";
            printPrevSong(false);
            currentSound++;
            countdownDuration=defaultCountdownDuration;
            countdownInterval = setInterval(() => startBlindtest(true), 1000);
            startBlindtest(true);
        }, 30300);
        
        audio = new Audio(songs[currentSound].preview);
        audio.play();
    }
    else if(songs.length <= currentSound) {
        document.getElementById('result').textContent =  "Vous avez terminé le blindtest";
    }
}

function printPrevSong(valid) 
{
    let cards = document.querySelectorAll('#cardsBlindTest .card');
    cards[currentSound].classList.remove('hide')
    if(valid) {
        cards[currentSound].classList.add('text-bg-success')
    } else {
        cards[currentSound].classList.add('text-bg-danger')
    }
}