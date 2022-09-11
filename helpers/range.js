module.exports = {
    range (start, stop, step = 1) {
        const a = [];
        for (let i = start; i < stop; i += step) {
            a.push(i);
        }
        return a;
    },
    letterRange (start, stop){
        const a = [];
        for (let i = start.charCodeAt(0); i < stop.charCodeAt(0); i++){
            a.push(String.fromCharCode(i));
        }
        return a;
    }
}