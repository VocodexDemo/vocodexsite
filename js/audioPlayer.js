// AUDIO PLAYER
function togglePlay(button) {
    const audio = button.parentElement.querySelector('audio');
    if (audio.paused) {
        audio.play();
        button.classList.add('paused');
        updateProgress(button, audio);
    } else {
        audio.pause();
        button.classList.remove('paused');
        cancelAnimationFrame(audio._rafId);
    }
}

function updateProgress(button, audio) {
    const progress = button.nextElementSibling.querySelector('.progress');
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percentage}%`;

    if (!audio.paused) {
        audio._rafId = requestAnimationFrame(() => updateProgress(button, audio));
    }
}

function resetPlayer(audio) {
    const button = audio.parentElement.querySelector('.play-pause');
    const progress = audio.parentElement.querySelector('.progress');
    audio.currentTime = 0;
    button.classList.remove('paused');
    progress.style.width = '0%';
}

document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.addEventListener('click', function (e) {
        const audio = this.parentElement.querySelector('audio');
        const progress = this.querySelector('.progress');
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;

        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percentage}%`;

        if (!audio.paused) {
            audio._rafId = requestAnimationFrame(() => updateProgress(this.previousElementSibling, audio));
        }
    });
});
