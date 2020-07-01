import React, {Fragment} from 'react';

export function pad(str, size) {
    var digit = String(str);
    while (digit.length < (size || 2)) { digit = "0" + digit; }
    return digit;
}

export function msToString(ms) {
    var time = ms;
    var seconds = Math.floor((time / 1000) % 60);
    var min = Math.floor((time / (1000 * 60)) % 60);
    var h = Math.floor((time / (1000 * 60 * 60)) % 99);
    var mseconds = Math.floor((time) % 99);

    return (
        <Fragment>
        {pad(h, 2)}:
        {pad(min, 2)}:
        {pad(seconds, 2)}:
        {pad(mseconds, 3)}
        </Fragment>
    );
}