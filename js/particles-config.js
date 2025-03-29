particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 40, // pocet castic
            "density": {
                "enable": true,
                "value_area": 400
            }
        },
        "shape": {
            "type": "image",
            "image": {
                "src": "img/voc.webp",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.8,
            "random": false
        },
        "size": {
            "value": 120,
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
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        },
        "modes": {
            "repulse": {
                "distance": 120, // vzdalenost odpuzovani
            },
        }
    },
    "retina_detect": true
});