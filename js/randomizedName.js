const wait = 100;
const nameLength = 13;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789€¤ß$ŁłĐđ#&@';

setInterval(() => {
    let result = '';
    for (let i = 0; i < nameLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    document.title = result;
}, wait);