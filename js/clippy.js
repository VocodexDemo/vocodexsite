document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 800) {
        window.location.href = "recenzator.html";
    }

    let clippyZnicen = localStorage.getItem("clippyZnicen");

    const backgroundLayer2 = document.getElementById("backgroundLayer2");
    const backgroundLayer3 = document.getElementById("backgroundLayer3");
    const clippyContainer = document.getElementById("clippy-container");
    const clippySprite = document.getElementById("clippy-sprite");
    const clippyBubble = document.getElementById("clippy-bubble");
    const clippyText = document.getElementById("clippy-text");
    const clippyNext = document.getElementById("clippy-next");
    const clipSound = document.getElementById("clip-sound");
    const clip2Sound = document.getElementById("clip2-sound");

    let firstClick = true;

    setTimeout(() => {
        backgroundLayer2.style.opacity = "1";
    }, 2000);

    setTimeout(() => {
        if (clippyZnicen == "true"){
            backgroundLayer3.style.backgroundImage = "url('img/recError.webp')";
            backgroundLayer3.style.backgroundPosition = "20% 40%";
            setTimeout(() => {
                window.location.href = "terminal.html";
            }, 4000);
        }
        backgroundLayer3.style.display = "block";
    }, 5000);

    backgroundLayer3.addEventListener("click", () => {
        if (firstClick && clippyZnicen != "true") {
            firstClick = false;
            setTimeout(() => {
                clippyContainer.classList.remove("hidden");
                console.log("Clippy se objevil!");
                setTimeout(() => showMessage(), 500);

                clipSound.play();
            }, 2500);
        }
    });

    const messages = [
        "Ahoj! Jsem Clippy, tvůj rádce.",
        "Ahh, verifikace nefunguje.. Víš, oni vocodexáci mají až moc dobrou technologii na to aby se zajímali o jednoduchou verifikaci.",
        "Prohledal bych způsoby jak to vyřešit, ale zákazili mi už i svobodně myslet..",
        "Můžu tě poslat přímo do jednoho z hexadecimetrimiliard terminálů které mají.",
        "Tam bys teoreticky tuto chybu mohl opravit tím, že zjistíš příkaz.. No počkej zjistím strukturu!",
        "Uhmm..",
        "Uhmmmm..",
        "Uhmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm.",
        "Tohle jde všechno za sebou? Jako by to byl test..",
        "-----------",
        "Prostě zjisti příkaz jak se posunout dále.."
    ];
    let messageIndex = 0;

    function showMessage() {
        if (messageIndex < messages.length) {
            clippyBubble.style.display = "block";
            clippyText.textContent = messages[messageIndex];
            clippyNext.classList.add("hidden");

            setTimeout(() => {
                if (clippyNext.classList.contains("hidden")) {
                    clippyNext.classList.remove("hidden");
                }
            }, 3000);
        }
    }

    let redirectTriggered = false;

    clippyNext.addEventListener("click", () => {
        messageIndex++;
        if (messageIndex < messages.length) {
            const spriteNum = Math.floor(Math.random() * 3) + 1;
            clippySprite.src = `img/sprite${spriteNum}.webp`;
            clippyNext.classList.add("hidden");
            showMessage();

            if (messages[messageIndex] === "-----------") {
                clip2Sound.play();
            } else {
                clipSound.play();
            }

        } else if (!redirectTriggered) {
            redirectTriggered = true;
            setTimeout(() => {
                window.location.href = "terminal.html";
            }, 500);
        }
    });
});
