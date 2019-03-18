function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function arctan(vertical, horizontal) {
    var tanOfAngle = vertical / horizontal;
    return toDegrees(Math.atan(tanOfAngle));
}

function isBetweenLeftClosed(number, leftRange, rightRange) {
    return number >= leftRange && number < rightRange;
}

function isBetweenBothClosed(number, leftRange, rightRange) {
    return number >= leftRange && number <= rightRange;
}