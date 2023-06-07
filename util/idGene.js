function generateUniqueID() {
    const characters = '0123456789@$ABCDEFGH!-abcdefghijklmnopqrstuvwxyz';
    const length = 8;
    let id = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }

    return `${id}`;
}
module.exports = generateUniqueID;