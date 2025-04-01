const activeItems = [
    { id: 'item1', a: true}, // uvod
    { id: 'item2', a: true}, // about
    { id: 'item3', a: false}, // warning
    { id: 'item4', a: false}, // dvere
    { id: 'item5', a: false}, // ableton
    { id: 'item6', a: false}, // puzzle
    { id: 'item7', a: false}, // kino
    { id: 'item8', a: false}, // rec error
    { id: 'item9', a: false}, // terminal
    { id: 'item10', a: false}, // recenzator
    { id: 'item11', a: false}, // download
    { id: 'item12', a: false}, // kviz
    { id: 'item13', a: false}, // void
    { id: 'item14', a: false}, // vocodex
    { id: 'item15', a: false}, // kino
    { id: 'item16', a: false}, // byt
    { id: 'item17', a: false}, // simpanz
    { id: 'item18', a: false} // nohavica
];

const mapItems = [
    { id: 'item1', x: 0, y: 500, src: '/hub/1.webp', link: '/index.html', caption: 'Úvodní stránka' },
    { id: 'item2', x: 0, y: 900, src: '/hub/2.webp', link: '/about.html', caption: 'O albu' },
    { id: 'item3', x: 600, y: 500, src: '/hub/3.webp', link: '/warning.html', caption: 'Varování' },
    { id: 'item4', x: 1400, y: 500, src: '/hub/4.webp', link: '/doors.html', caption: 'Dveře' },
    { id: 'item5', x: 900, y: 0, src: '/hub/5.webp', link: '/code1.html', caption: 'Ableton Vocoder' },
    { id: 'item6', x: 1400, y: 0, src: '/hub/6.webp', link: '/code2.html', caption: 'Puzzle' },
    { id: 'item7', x: 1900, y: 0, src: '/hub/7.webp', link: '/code3.html', caption: 'Kino' },
    { id: 'item8', x: 2000, y: 700, src: '/hub/8.webp', link: '/rrecenzator.html', caption: 'Chyba recenzátoru' },
    { id: 'item9', x: 2500, y: 700, src: '/hub/9.webp', link: '/terminal.html', caption: 'Terminál' },
    { id: 'item10', x: 3100, y: 500, src: '/hub/10.webp', link: '/recenzator.html', caption: 'Recenzátor' },
    { id: 'item11', x: 3700, y: 500, src: '/hub/11.webp', link: '/download.html', caption: 'Stáhnout sample pack' },
    { id: 'item12', x: 3700, y: 900, src: '/hub/12.webp', link: '/quiz.html', caption: 'Kvíz' },

    { id: 'item13', x: 1400, y: 1200, src: '/hub/13.webp', link: '/doors-void.html', caption: 'Void' },
    { id: 'item14', x: 600, y: 1600, src: '/hub/14.webp', link: '/void1.html', caption: 'Vocodex' },
    { id: 'item15', x: 1133, y: 1600, src: '/hub/15.webp', link: '/void2.html', caption: 'Kino' },
    { id: 'item16', x: 1666, y: 1600, src: '/hub/16.webp', link: '/void3.html', caption: 'Byt' },
    { id: 'item17', x: 2200, y: 1600, src: '/hub/17.webp', link: '/void4.html', caption: 'Šimpanzí Hlava' },

    { id: 'item18', x: 3700, y: 1600, src: '/hub/18.webp', link: '/ainohavica.html', caption: 'AI Nohavica' }
];

// s && e: 1 - top, 2 - right, 3 - bottom, 4 - left
const connections = [
    { from: 'item1', to: 'item3', start: 2, end: 4 },
    { from: 'item1', to: 'item2', start: 3, end: 1 },
    { from: 'item3', to: 'item4', start: 2, end: 4 },
    { from: 'item4', to: 'item5', start: 1, end: 3 }, // doors
    { from: 'item4', to: 'item6', start: 1, end: 3 }, // doors
    { from: 'item4', to: 'item7', start: 1, end: 3 }, // doors
    { from: 'item4', to: 'item8', start: 2, end: 4 },
    { from: 'item8', to: 'item9', start: 2, end: 4 }, // recenzator
    { from: 'item9', to: 'item10', start: 2, end: 4 }, // recenzator
    { from: 'item4', to: 'item10', start: 2, end: 4 }, // recenzator
    { from: 'item10', to: 'item11', start: 2, end: 4 },
    { from: 'item11', to: 'item12', start: 3, end: 1 },

    { from: 'item4', to: 'item13', start: 3, end: 1 }, // void
    { from: 'item13', to: 'item14', start: 3, end: 1 }, // void doors
    { from: 'item13', to: 'item15', start: 3, end: 1 }, // void doors
    { from: 'item13', to: 'item16', start: 3, end: 1 }, // void doors
    { from: 'item13', to: 'item17', start: 3, end: 1 } // void doors
];

const visibleItems = JSON.parse(localStorage.getItem('visibleItems')) || mapItems.map(item => item.id);
const container = document.getElementById('map-container');

function createLine(x1, y1, x2, y2) {
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const line = document.createElement('div');
    line.className = 'map-line';
    line.style.width = `${length}px`;
    line.style.height = '4px';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    return line;
}

// only items that are NOT active
for (let i = activeItems.length - 2; i >= 0; i--) {
    if (localStorage.getItem(activeItems[i].id) == "true") activeItems[i].a = true;
    if (activeItems[i].a === true) {
        activeItems.splice(i, 1);
    }
}
// ai nohavica is visible when completed
let completed = true;
for (let i = 3; i <= 17; i++){
    if (i != 8 || i != 9 || localStorage.getItem(`item${i}`) != "true") completed = false;
}
if (localStorage.getItem("skladUnlocked") != "true") completed = false;
if (completed) activeItems.pop();
console.log(completed);

// Add items to the map
mapItems.forEach(item => {
    // skip iteration if NOT active
    skipThisIteration = false;
    activeItems.forEach(it => {
        if (item.id == it.id) {
            skipThisIteration = true;
            return;
        }
    });
    if (skipThisIteration) return;
    
    if (visibleItems.includes(item.id)) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'map-item';
        itemContainer.style.left = `${item.x + 100}px`;
        itemContainer.style.top = `${item.y + 100}px`;

        const img = document.createElement('img');
        img.src = item.src;
        img.className = 'map-image';
        img.addEventListener('mousedown', () => {
            setTimeout(() => {
                if (!isDragging) window.location.href = item.link;
            }, 150);
        });

        const caption = document.createElement('div');
        caption.className = 'map-caption';
        caption.textContent = item.caption;

        itemContainer.appendChild(img);
        itemContainer.appendChild(caption);
        container.appendChild(itemContainer);
        itemContainer.id = item.id;
    }
    console.log("Items loaded!");
});

// Add connections between items
connections.forEach(conn => {
    const from = document.getElementById(conn.from);
    const to = document.getElementById(conn.to);

    let xOffS = 0;
    let yOffS = 0;
    let xOffE = 0;
    let yOffE = 0;

    switch (conn.start){
        case 1: xOffS = 0.5; yOffS = 0.04; break;
        case 2: xOffS = 0.97; yOffS = 0.5; break;
        case 3: xOffS = 0.5; yOffS = 0.95; break;
        case 4: xOffS = 0.02; yOffS = 0.5; break;
    }
    switch (conn.end){
        case 1: xOffE = 0.5; yOffE = 0.04; break;
        case 2: xOffE = 0.97; yOffE = 0.5; break;
        case 3: xOffE = 0.5; yOffE = 0.95; break;
        case 4: xOffE = 0.02; yOffE = 0.5; break;
    }
    yOffS *= 0.91; yOffE *= 0.91;

    if (from && to) {
        const x1 = from.offsetLeft + from.offsetWidth * xOffS;
        const y1 = from.offsetTop + from.offsetHeight * yOffS;
        const x2 = to.offsetLeft + from.offsetWidth * xOffE;
        const y2 = to.offsetTop + to.offsetHeight * yOffE;
        const line = createLine(x1, y1, x2, y2);
        container.appendChild(line);
    }
    console.log("Lines created!");
});

// custom scroll
const cont = document.documentElement;
let isDragging = false;
let startX, startY;
let scrollStartLeft, scrollStartTop;
cont.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;

    startX = e.clientX;
    startY = e.clientY;
    scrollStartLeft = cont.scrollLeft;
    scrollStartTop = cont.scrollTop;

    cont.style.cursor = 'grabbing';
});
cont.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    cont.scrollLeft = scrollStartLeft - dx;
    cont.scrollTop = scrollStartTop - dy;
});
cont.addEventListener('mouseup', () => {
    isDragging = false;
    cont.style.cursor = 'default';
});
