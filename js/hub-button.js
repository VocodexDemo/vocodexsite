document.addEventListener("DOMContentLoaded", function () {
    const lsData = localStorage.getItem("hubButtonVisible");
    if (lsData == "true"){
        const button = document.createElement('div');
        button.className = 'overlay-button';

        const img = document.createElement('img');
        img.src = '/icons/hub.png';
        img.alt = '';
        button.appendChild(img);

        button.addEventListener('click', () => {
            window.location.href = '/hub.html';
        });
        document.body.appendChild(button);
    }
});
