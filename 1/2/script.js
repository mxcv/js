let score1 = [], score2 = [];
document.getElementById('play').addEventListener('click', e => {
    let result = dice(9);
    if (score1.length > score2.length) {
        document.getElementById('player2').children[score2.length].innerHTML = result;
        score2.push(result);

        if (score2.length == 3) {
            result = score1.reduce((a, b) => a + b, 0) - score2.reduce((a, b) => a + b, 0);
            setTimeout(() => {
                alert(result ? `Player${result > 0 ? '1' : '2'} won!` : 'Draw!');
                restart();
            }, 200);
        }
    }
    else {
        document.getElementById('player1').children[score1.length].innerHTML = result;
        score1.push(result);
    }
});

function dice(diceCount) {
    let result = [];
    for (let i = 0; i < diceCount; ++i)
        result.push(Math.floor(Math.random() * 6) + 1);
    fillTable(result);
    return result.reduce((sum, a) => sum + a, 0);
}
function fillTable(values) {
    let table = document.getElementsByClassName('dice');
    for (let i = 0; i < values.length; ++i)
        table[i].firstChild.innerHTML = values[i];
}
function restart() {
    fillTable(new Array(9).fill(''));
    for (let i of document.getElementById('player1').children)
        i.innerHTML = '';
    for (let i of document.getElementById('player2').children)
        i.innerHTML = '';
    score1 = [];
    score2 = [];
}
