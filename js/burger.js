let burgerButton = document.getElementById("burgerBtn");
let burgerMenu = document.getElementById("header1");

if (burgerButton.style.display == "none"){
    burgerMenu.style.display = "none";
}

function bugerBtnClick(){
    if (burgerMenu.style.display == "none"){
        burgerMenu.style.display = "flex";
    } else {
        burgerMenu.style.display = "none";
    }
}
