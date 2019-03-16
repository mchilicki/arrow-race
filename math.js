function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function arctan(vertical, horizontal){
    var tanOfAngle = vertical / horizontal;
    return toDegrees(Math.atan(tanOfAngle));
}