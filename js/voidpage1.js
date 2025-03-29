let hasPlayed = false;

document.getElementById("background-audio").volume = 0.3;

function goToDoors(element) {
    if (!hasPlayed) {
        const audio = new Audio('sounds/closedoor.ogg');
        audio.play();
        hasPlayed = true;

        const fadeOverlay = document.getElementById('fade-inout');
        fadeOverlay.style.pointerEvents = 'auto';
        fadeOverlay.style.opacity = '1';

        audio.onended = function() {
            setTimeout(function() {
                window.location.href = 'doors-void.html';
            }, 1);
        };
    }

    const img = element.querySelector('img'); 

    img.src = 'img/closed-door-void.webp'; 
}
document.getElementById("doorsBack").addEventListener("click", ()=>{
    goToDoors(document.getElementById("doorsBack"));
})

let dialogy = [
    new Audio("sounds/voco1.ogg"),
    new Audio("sounds/voco2.ogg"),
    new Audio("sounds/voco3.ogg"),
    new Audio("sounds/voco4.ogg"),
    new Audio("sounds/voco5.ogg"),
    new Audio("sounds/voco6.ogg"),
    new Audio("sounds/vybuch.ogg"),
    new Audio("sounds/darkAmbient.ogg")
]

dialogy.forEach(e => {
    e.load();
    e.volume = 0.6;
    if (dialogy[6] == e) e.volume = 1; // vybuch
    if (dialogy[7] == e) e.volume = 0.3; // darkambient
});

let speechBubble = document.getElementById("speechBubble");
function say(text, time, dialog){
    const message = text.split('');
    const timePerCharacter = time / message.length;
    speechBubble.innerHTML = '';
    dialogy[dialog].play();
    let index = 0;
    const interval = setInterval(() => {
        if (index < message.length) {
            speechBubble.innerHTML += message[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, timePerCharacter * 1000);
}

let dialogPosition = 0;
let moznost1 = document.getElementById("moznost1");
let moznost2 = document.getElementById("moznost2");
moznost1.addEventListener("click", () =>{
    const nextDialog = moznost1.getAttribute("nextDialog");
    const nextDialogTime = moznost1.getAttribute("nextDialogTime");
    const nextDialogAudio = moznost1.getAttribute("nextDialogAudio");
    const nextDialogPosition = moznost1.getAttribute("nextDialogPosition");
    dialogPosition = nextDialogPosition;
    say(nextDialog, nextDialogTime, nextDialogAudio);
    moznost1.style.display = "none";
    moznost2.style.display = "none";
    setTimeout(() => {
        dialog();
    }, nextDialogTime*1000);
});
moznost2.addEventListener("click", () =>{
    const nextDialog = moznost2.getAttribute("nextDialog");
    const nextDialogTime = moznost2.getAttribute("nextDialogTime");
    const nextDialogAudio = moznost2.getAttribute("nextDialogAudio");
    const nextDialogPosition = moznost2.getAttribute("nextDialogPosition");
    dialogPosition = nextDialogPosition;
    say(nextDialog, nextDialogTime, nextDialogAudio);
    moznost1.style.display = "none";
    moznost2.style.display = "none";
    setTimeout(() => {
        dialog();
    }, nextDialogTime*1000);
});
moznost1.style.display = "none";
moznost2.style.display = "none";

const vybuch = document.getElementById('vybuch');

function dialog(){
    if (dialogPosition == 0){
        moznost1.setAttribute("nextDialog", "Ty si člověk? Jak ses sem dostal? Máš štěstí, nejspíš o tobě… no on ještě neví. Ale určitě po tobě půjde až se to dozví.");
        moznost1.setAttribute("nextDialogTime", 7.8);
        moznost1.setAttribute("nextDialogAudio", 1);
        moznost1.setAttribute("nextDialogPosition", 1);

        moznost1.innerHTML = "Jsem jen člověk, chci zjistit co se tu děje."
        moznost1.style.removeProperty("display");
    } else if (dialogPosition == 1){
        moznost1.setAttribute("nextDialog", "Ta věc na hrudi? To je sledovací zařízení. Pokud cokoliv řeknu špatně tak je se mnou konec! Jsem poslán abych šířil tu jeho sračku. Chce prostě vládnout všemu co tu existuje.");
        moznost1.setAttribute("nextDialogTime", 9.5);
        moznost1.setAttribute("nextDialogAudio", 2);
        moznost1.setAttribute("nextDialogPosition", 2);

        moznost1.innerHTML = "Co je ta věc na tvé hrudi?"
        moznost1.style.removeProperty("display");

        moznost2.setAttribute("nextDialog", "Nikdo nic nemůže, všechno je hlídaný. To se tu děje. Byl to původně experiment, ale vymkl se kontrole a teď se snaží ovládnout svět. Určitě víš o kom je řeč. Nemůžu o něm mluvit, jelikož ta věc co mám na hrudi je sledovací zařízení a pokud cokoliv řeknu špatně tak je se mnou konec!");
        moznost2.setAttribute("nextDialogTime", 15.1);
        moznost2.setAttribute("nextDialogAudio", 4);
        moznost2.setAttribute("nextDialogPosition", 4);

        moznost2.innerHTML = "Co se tady děje?"
        moznost2.style.removeProperty("display");
    } else if (dialogPosition == 2){
        moznost1.setAttribute("nextDialog", "Zastavit ho? To zní nemožně. Má kontrolu nad celým městem a ví o všem co se tu děje a o čem se mluví.");
        moznost1.setAttribute("nextDialogTime", 6);
        moznost1.setAttribute("nextDialogAudio", 3);
        moznost1.setAttribute("nextDialogPosition", 4);

        moznost1.innerHTML = "Myslíš že ho jde zastavit?"
        moznost1.style.removeProperty("display");
    } 
    // dialogPosition == 3 nemůže nastat
    else if (dialogPosition == 4){
        moznost1.setAttribute("nextDialog", "No.. Byl, spíš byla - Šimpanzí hlava. Už nějakou dobu se snaží prosazovat hudbu, kde jsou organické nástroje. On totiž nepovolí nic, kde se nepoužije minimálně syntetizér. Hlava dělala hudby hodně, ale to už bohužel bylo smazáno. Štvala ho, a tak to došlo až do toho, že ji někdo z nich... někdo ji zabil - a to hrozným způsobem. Umlčeli ji, aby nikdo da");
        moznost1.setAttribute("nextDialogTime", 19.1);
        moznost1.setAttribute("nextDialogAudio", 5);
        moznost1.setAttribute("nextDialogPosition", 6);

        moznost1.innerHTML = "Je tu někdo, kdo se snaží bojovat proti systému?";
        moznost1.style.removeProperty("display");
    } else if (dialogPosition == 6){
        dialogy[6].play();
        setTimeout(() => { dialogy[7].play(); }, 4000);
        setTimeout(() => { dialogy[5].pause(); }, 50);
        speechBubble.style.display = "none";
        vybuch.classList.add('animate');
        document.body.style.backgroundImage = 'url("img/vocodex2e.webp")';
        localStorage.setItem("vybouchl", "true");
    }
}

export function startEverything1(){
    document.body.style.backgroundImage = 'url("img/vocodex2e.webp")';
    speechBubble.style.display = "none";
}
export function startEverything2(){
    say("Stůj! Kdo seš? Drž se dál! Seš jeden z nich?", 2.8, 0);
    setTimeout(() => {
        dialog();
    }, 3000);
}
