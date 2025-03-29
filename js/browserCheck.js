function isChromiumBased() {
    const userAgent = navigator.userAgent;
    console.log("User agent: " + userAgent);
    return (
        userAgent.includes("Chrome") || 
        userAgent.includes("Chromium") || 
        userAgent.includes("Edg") || 
        userAgent.includes("OPR")
    );
}

function showNotification(message, duration) {
    const popup = document.getElementById("notificationPopup");
    popup.textContent = message;

    popup.classList.add("active");

    setTimeout(() => {
        popup.classList.add("hide");

        popup.addEventListener(
            "transitionend",
            () => {
                popup.classList.remove("active", "hide");
            },
            { once: true }
        );
    }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (isChromiumBased()) return;
        showNotification("Tento web je optimalizovaný pro prohlížeče založené na Chromium (Chrome, Edge, Opera). Na jiných prohlížečích (Firefox, Safari) může docházet k problémům.", 5000);
    }, 100);
});
