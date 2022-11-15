const fieldWidth = 6;
const fieldHeight = 6;
let cursor = {x: 0, y: 0}

fillField()
document.onkeydown = onKeyDown

function fillField() {
    let field = document.getElementById('field')
    for (let i = 0; i < fieldHeight; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let j = 0; j < fieldWidth; j++) {
            let point = document.createElement('div')
            point.className = cursor.x == i && cursor.y == j ? 'point cursor' : 'point hidden'
            row.appendChild(point)
            if (j < fieldWidth - 1) {
                let hLine = document.createElement('div')
                hLine.className = 'line horizontal hidden'
                row.appendChild(hLine);
            }
        }
        field.appendChild(row)
        if (i < fieldHeight - 1) {
            row = document.createElement('div')
            row.className = 'row'
            for (let j = 0; j < fieldWidth; j++) {
                let vLine = document.createElement('div')
                vLine.className = 'line vertical hidden'
                row.appendChild(vLine);
            }
            field.appendChild(row)
        }
    }
}

function onKeyDown(e) {
    let newPoint = {x: cursor.x, y: cursor.y};
    switch (e.key) {
        case 'ArrowLeft':   newPoint.x--; break;
        case 'ArrowRight':  newPoint.x++; break;
        case 'ArrowUp':     newPoint.y--; break;
        case 'ArrowDown':   newPoint.y++; break;
    }

    if (newPoint.x >= 0 && newPoint.x < fieldWidth &&
        newPoint.y >= 0 && newPoint.y < fieldHeight) {

        setPointStatus(newPoint, true)
        setLineStatus(cursor, newPoint, true)
        setPointSelected(cursor, false)
        setPointSelected(newPoint, true)
        cursor = newPoint
    }
}

function setPointSelected(point, isSelected) {
    document.getElementsByClassName('row')[point.y * 2]
        .children[point.x * 2]
        .classList[isSelected ? 'add' : 'remove']('cursor')
}

function setPointStatus(point, isEnabled) {
    document.getElementsByClassName('row')[point.y * 2]
        .children[point.x * 2]
        .classList[isEnabled ? 'remove' : 'add']('hidden')
}

function setLineStatus(p1, p2, isEnabled) {
    (p1.y == p2.y
        ? document.getElementsByClassName('row')[p1.y * 2].children[p1.x * 2 + (p2.x - p1.x)]
        : document.getElementsByClassName('row')[p1.y * 2 + (p2.y - p1.y)].children[p1.x])
        .classList[isEnabled ? 'remove' : 'add']('hidden')
}
