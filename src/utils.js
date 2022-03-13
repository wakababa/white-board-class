export function createUUID() {
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
}

export function getMousePosition(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        clientX: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        clientY: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};
const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const positionWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element;
    if (type === "rectangle") {
        const topLeft = nearPoint(x, y, x1, y1, "tl");
        const topRight = nearPoint(x, y, x2, y1, "tr");
        const bottomLeft = nearPoint(x, y, x1, y2, "bl");
        const bottomRight = nearPoint(x, y, x2, y2, "br");
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        return topLeft || inside || topRight || bottomLeft || bottomRight;
    } else {
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        const start = nearPoint(x, y, x1, y1, "start");
        const end = nearPoint(x, y, x2, y2, "end");
        const inside = Math.abs(offset) < 1 ? "inside" : null;
        return start || end || inside;
    }
};
export function getElementAtPosition(x, y, elements){
    return elements
        .map((ele) => ({
            ...ele,
            position: positionWithinElement(x, y, ele),
        }))
        .find((ele) => ele.position !== null);
};