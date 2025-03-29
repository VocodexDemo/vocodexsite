let doorSoundPlayed = false;

function openDoor(element, page) {
    if (!doorSoundPlayed) {
        let doorSound = new Audio('sounds/vdoor.ogg');
        doorSound.play();
        doorSoundPlayed = true;
    }

    let img = element.children[0];
    img.src = 'img/open-door-void.webp'; 

    const fadeOverlay = document.getElementById('fade-inout');
    fadeOverlay.style.pointerEvents = 'auto';
    fadeOverlay.style.opacity = '1';

    setTimeout(function() {
        window.location.href = page;
    }, 2300);
}


particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 20, // počet částic
            "density": {
                "enable": true,
                "value_area": 2000
            }
        },
        "shape": {
            "type": "image",
            "image": {
                "src": "img/particles.webp",
                "width": 300,
                "height": 300
            }
        },
        "opacity": {
            "value": 0.2,
            "random": false
        },
        "size": {
            "value": 512,
            "random": true
        },
        "rotation": {
            "random": true
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});
