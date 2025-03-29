document.addEventListener("DOMContentLoaded", () => {
    let key = document.getElementById("key");
    if (localStorage.getItem("skladUnlocked") == "true") key.remove();
    else {
        let keyAudio = new Audio("./sounds/key-grab.ogg");
        key.addEventListener("click", ()=>{
            localStorage.setItem("skladUnlocked", "true");
            keyAudio.play();
            key.remove();
        });
    }
});