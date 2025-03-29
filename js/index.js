let audio;
let audioError;
let errorTimeout;
let messageInterval;
let errorCount = 0;

const errorText = document.getElementById('errorText');

// Proměnné pro nastavení trvání erroru a času do erroru
let timeUntilError1 = 34000; // sekund před první chybou
let errorDuration1 = 1000; // sekund trvání chyby


const messages = [
    { text: "Ještě je čas si to rozmyslet...", color: "#fff" },
    { text: "Víš vůbec kolik je hodin?", color: "#fff" },
    { text: "Zatím si vyčisti větráky od počítače..", color: "#fff" },
    { text: "Doopravdy chceš tenhle sample pack?", color: "#fff" },
    { text: "Už se to dokončuje (nedokončuje).", color: "#fff" },
    { text: "Peseris nedal rap battle, tak zdržuje loading!", color: "#fff" },
    { text: "Skibidi pravda!", color: "#fff" },
    { text: "Právník Jaromíra Nohavici si na tomhle albu pošmákne!", color: "#fff" },
    { text: "Jediná logická úvaha je tuhle stránku vypnout.", color: "#fff" },
    { text: "Jako lidstvo jsme dospěli k tomu, že samplujeme důchodce.", color: "#fff" },
    { text: "Kořeny vocodex dema sahají až do roku 2023!", color: "#fff" },
    { text: "Do tohohle alba šlo víc práce než do školství.", color: "#fff" },
    { text: "Ten loading má určitě nějaké využití, musíš si ho jen domyslet!", color: "#fff" },
    { text: "Tenhle loading (ne)neskončí.", color: "#fff" },
    { text: "Vypilovat nějakou činnost trvá dlouho, právě to tenhle loading ukazuje.", color: "#fff" },
    { text: "Tomu buttonu nevěř...", color: "#fff" },
    { text: "Přerov all the way!", color: "#fff" },
    { text: "Made by Playarus & Zolty (ten loading jsme my (ne)dělali)", color: "#fff" },
    { text: "Jaký je pocit na tomhle vytrácet elektrický proud?", color: "#fff" },
    { text: "Název sample packu, posledního songu v albu a alba samotného jsme si spletli přesně 315x", color: "#fff" },
    { text: "Shout out N3O (jentak)", color: "#fff" },
    { text: "Dnešním sponzorem je Vocodex!", color: "#fff" },
    { text: "U toho alba se nejlépe palí mozkové buňky!", color: "#fff" },
    { text: "Suki moda!", color: "#fff" },
    { text: "Dnes je krásné počasí. Co třeba jít ven?", color: "#fff" }
];
const creepyMessages = [
    { text: "Uteč, jestli se chceš zachránit.", color: "#f55" },
    { text: "Oči tě viděly.", color: "#f55" },
    { text: "Věci jsou nevyhnutelné.", color: "#f55" },
    { text: "Cítíš se dobře po všem co jsi udělal?", color: "#f55" },
    { text: "Chci vědět, jak dlouho ještě vydržíš.", color: "#f55" },
    { text: "Krev, chaos, řev, panika.", color: "#f55" },
    { text: "Dítě, co zabilo své rodiče.", color: "#f55" },
    { text: "Jsi definice apokalypsy.", color: "#f55" },
    { text: "Ty jsi důvod zániku hudby.", color: "#f55" },
    { text: "Zklamání.", color: "#f55" }
]

function startFakeLoading() {
    document.getElementById("bmc-wbtn").remove();

    document.getElementById("loadingScreen").style.display = "flex";
    document.body.classList.add("no-scroll");

    audio = new Audio('sounds/music2.ogg');
    audio.loop = true; 
    audio.play();

    audioError = new Audio('sounds/musicerror.ogg');
    audioError.loop = true;

    messageInterval = setInterval(function() {
        const messageText = document.getElementById("randomMessage");
        const randomIndex = Math.floor(Math.random() * messages.length); 
        messageText.innerText = messages[randomIndex].text; 
        messageText.style.color = messages[randomIndex].color;
    }, 5000);

    setTimeout(function() {
        const skipButton = document.getElementById("skipButton");
        skipButton.style.display = "block";
        setTimeout(function() {
            skipButton.style.opacity = 1; 
        }, 6000);
    }, 20000); 

    scheduleError(timeUntilError1);
}

function scheduleError(delay) {
    errorTimeout = setTimeout(function() {
        audioError.play();
        setTimeout(showErrorScreen(errorDuration1), 2000);
    }, delay - 2000);
}

function showErrorScreen(duration) {
    let message = '';
    if (errorCount == 0) message = 'Myslíš si, že je na tebe Image Line pyšný?'
    else if (errorCount == 1) message = 'Netíží tě při usínání ty věci, co jsi napáchal?'
    else if (errorCount == 2) message = 'Vím, že si pamatuješ jejich křik - jejich volání o pomoc.'
    else if (errorCount == 3) message = 'Tobě to je všechno úplně jedno, že?'
    else message = 'VÍM VŠECHNO.'
    errorText.innerHTML = message;

    const errorScreen = document.getElementById("errorScreen");
    const loadingScreen = document.getElementById("loadingScreen");

    errorScreen.style.display = "flex";

    if (audio) {
        audio.pause();
    }

    loadingScreen.style.filter = "blur(6px)";
    document.getElementById("randomMessage").style.opacity = 1;
    document.getElementById("skipButton").style.opacity = 0.2;

    setTimeout(hideErrorScreen, duration);
}

function hideErrorScreen() {
    const errorScreen = document.getElementById("errorScreen");
    const loadingScreen = document.getElementById("loadingScreen");
 
    errorScreen.style.display = "none";

    loadingScreen.style.filter = "none";
    document.getElementById("randomMessage").style.opacity = 1;
    document.getElementById("skipButton").style.opacity = 1;
    
    if (errorCount > 3) { 
        darkness();
        return;
    }
    if (audio) {
        audio.play();
    }
    audioError.pause();

    errorCount++;
    timeUntilError1 *= 0.7;
    errorDuration1 *= 1.07;
    scheduleError(timeUntilError1);
}

const darknessDiv = document.getElementById('darkness');
const darkAudio = new Audio('sounds/darkness.ogg');
function darkness(){
    darkAudio.play();
    darknessDiv.style.display = 'flex';
    darknessDiv.style.zIndex = 9999;
    audio.pause();
    audioError.pause();
    setTimeout(afterDarkness, 5000);
}
function afterDarkness(){
    darkAudio.pause();
    darknessDiv.style.display = 'none';
    creepyMessages.forEach(element => {
        messages.push(element);
    });
    audio.play();
}

function skipLoading() {
    if (audio) {
        audio.pause(); 
        audio.currentTime = 0; 
    }

    if (audioError) {
        audioError.pause();
        audioError.currentTime = 0;
    }

    clearTimeout(errorTimeout); // Zastav error timeout
    clearInterval(messageInterval); // Zastav změny zpráv

    // ⬇️ oddelal jsem tyto zidi protoze to ukazovalo index.html a to bylo fujfuj
    // document.getElementById("loadingScreen").style.display = "none";
    // document.getElementById("skipButton").style.display = "none";
    // document.body.classList.remove("no-scroll");
    window.location.href = 'warning.html';
}

// credits
document.querySelectorAll('.name').forEach(function (element) {
    element.addEventListener('click', function () {
        const image = element.getAttribute('data-image');
        const title = element.textContent.trim();
        const description = element.getAttribute('data-description');

        const link = element.getAttribute('data-link');
        const linkName = element.getAttribute('data-link-name');
    
        document.getElementById('card-image').src = image;
        document.getElementById('card-title').textContent = title;
        document.getElementById('card-description').textContent = description;

        const cardLink = document.getElementById('card-link');
        if (linkName != ""){
            cardLink.href = link;
            cardLink.innerHTML = linkName;
            cardLink.style.display = 'block';
        }
        else{
            cardLink.style.display = 'none';
        }
        
        const card = document.getElementById('card');
        const overlay = document.getElementById('overlay');
        overlay.style.display = 'block';
        card.style.display = 'flex';

        setTimeout(() => {
            overlay.classList.add('show');
            card.classList.add('show');
        }, 10);
    });
});
document.addEventListener('click', function (event) {
    const card = document.getElementById('card');
    const overlay = document.getElementById('overlay');
    if (event.target.closest('.card') === null && event.target.closest('.name') === null) {
        card.classList.remove('show');
        overlay.classList.remove('show');

        setTimeout(() => {
            card.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    }
});

// Cookies popup
const popup = document.getElementById("cookiesPopup");
const button = document.getElementById("cookiesClick");

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("cookies") != "true") {
        popup.style.display = "flex";
        popup.classList.add("active");
    }
});
button.addEventListener("click", () => {
    popup.style.animation = "slideOut 2s ease forwards";
    localStorage.setItem("cookies", "true");
    setTimeout(() => {
        popup.classList.remove("active");
        popup.style.display = "none";
    }, 2000);
});
