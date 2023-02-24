
function offsetTop(elements) {
    var top = elements.offsetTop;
    var parent = elements.offsetParent;
    while (parent != null) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return top;
}

function offsetLeft(elements) {
    var left = elements.offsetLeft;
    var parent = elements.offsetParent;
    while (parent != null) {
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }

    return left;
}

export {
    offsetTop,
    offsetLeft
}