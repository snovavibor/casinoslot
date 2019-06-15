function rnd() {
    document.getElementById('informer').innerHTML = '';
    if (parseInt(localStorage.getItem('bet')) > 0) {
        dialog.innerHTML = 'GO-Go-Go!!!!';
        let i = 0;
        let f = rndIndex(600, 50);

        while (i <= f) {
            setTimeout(function() {
                visiblePicter(one, a = rndIndex(8, 0));
                visiblePicter(two, b = rndIndex(8, 0));
                visiblePicter(three, c = rndIndex(8, 0));
            }, 100);
            i++;
        };
        setTimeout(result, 102);
    } else { alert('сделайте ставку') };
};


/*возвращает рандомные значения
 *@param max, min == number
 */
function rndIndex(max, min) {
    let index = parseInt(Math.random() * (max - min) + min);
    return index;
};

/*записывает в хранилище индексы выпавших картинок для каждого слота,
 * и устанавливает атрибут src на странице для показа картинки
 *@param elem=string, index=number
 */
function visiblePicter(elem, index) {
    localStorage.setItem('a', a);
    localStorage.setItem('b', b);
    localStorage.setItem('c', c);
    elem.setAttribute('src', picters[index]);

};

/*
 * индифицирует выпавшие картинки для определения комбинации.
 * каждой картинке соответсвует буква, последним трем одна буква f
 *  и по длине массива вычисляется варианты комбинаций этих трех последних элементов
 */
function result() {
    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'f', 'f'];
    let regExp = /f/g;
    let slot1 = arr[parseInt(localStorage.getItem('a'))];
    let slot2 = arr[parseInt(localStorage.getItem('b'))];
    let slot3 = arr[parseInt(localStorage.getItem('c'))];
    let str = slot1 + slot2 + slot3;

    // проверка на наличие массива с элементами f													
    if (regExp.test(str)) {
        let s = str.match(regExp);
        if (s.length == 3) { str = 'f3' };
        if (s.length == 2) { str = 'f2' };
        if (s.length == 1) { str = 'f1' };
    }; //if test

    switch (str) {
        case 'aaa':
            message(800);
            break;
        case 'bbb':
            message(200);
            break;
        case 'ccc':
            message(80);
            break;
        case 'ddd':
            message(40);
            break;
        case 'eee':
            message(20);
            break;
        case 'f3':
            message(10);
            break;
        case 'f2':
            message(5);
            break;
        case 'f1':
            message(2);
            break;
        default:
            message(0);
            break;
    };
};

/* показывает инфо о выигрыше или проигрыше и
 * изменяет переменные в хранилище  kassa, bet - удаляет. и изменяет текст на странице в Касса и ставка.
 *@param  num = number
 */
function message(num) {
    if (num > 0) {
        dialog.innerHTML = num + ' к 1 !!!! Ставка сыграла! Поздравляем!';
        let sum = (num * parseInt(localStorage.getItem('bet')));
        let profit = sum - parseInt(localStorage.getItem('bet'));
        document.getElementById('informer').innerHTML = ` Вы выиграли:<br> ${profit} грн.`;
        sum = parseInt(localStorage.getItem('kassa')) + sum;
        localStorage.setItem('kassa', sum);
        document.getElementById('mainBalance').innerHTML = ` Касса : ${sum} грн.`;
        localStorage.removeItem('bet');
        document.getElementById('betText').innerHTML = ` Ваша ставка : 0.00 грн.`;
    } else {
        dialog.innerHTML = 'Ooops!!! казино в плюсе!!!';
        document.getElementById('informer').innerHTML = `Мы выиграли у Вас <br> ${localStorage.getItem('bet')} грн.`;
        localStorage.removeItem('bet');
        document.getElementById('betText').innerHTML = ` Ваша ставка : 0.00 грн.`;
    };

};



let el = document.getElementById('wrapDisplay').children;
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let a = b = c = 0;
let dialog = document.getElementById('result');

let picters = [
    'images/dragon.png',
    'images/star.png',
    'images/ace.jpg',
    'images/girl.jpg',
    'images/js.jpg',
    'images/dollar.png',
    'images/euro.png',
    'images/grivna.jpg'
];

document.getElementById('name').addEventListener('input', function() {
    let str = document.getElementById('name');
    str.value = str.value.replace(/\d/g, '');
})

document.getElementById('enter').addEventListener('click', function() {
    let inp = document.getElementById('name');
    if (inp.value) {
        localStorage.setItem('name', inp.value);
        localStorage.setItem('flag', true);
        document.getElementById('userName').innerHTML = localStorage.getItem('name');
        document.getElementById('first').style.display = 'none';
    } else { alert('Укажите свое имя') };
})

if (localStorage.getItem('flag')) { document.getElementById('first').style.display = 'none'; }

document.getElementById('userName').innerHTML = localStorage.getItem('name');

let temp = localStorage.getItem('kassa');
if (temp) {
    document.getElementById('mainBalance').innerHTML = ` Касса : ${temp} грн.`;
} else {
    document.getElementById('mainBalance').innerHTML = ` Касса : 0.00 грн.`;
    localStorage.setItem('kassa', 0);
};
let temp2 = localStorage.getItem('bet');
if (temp2) {
    document.getElementById('betText').innerHTML = ` Ваша ставка : ${temp2} грн.`;
};



// событие проявляет input для пополнения счета
document.getElementById('money').addEventListener('click', function() {
    if (parseInt(localStorage.getItem('kassa')) <= 0 && !localStorage.getItem('bet')) {
        let balance = document.getElementById('kassa');
        balance.style.display = 'flex';
        balance.style.marginTop = '50%';
    } else { alert('У Вас достаточно денег для ставки') };
});

// событие enter после ввода суммы пополнения кассы
document.getElementById('butKassa').addEventListener('click', function() {
    let res = document.getElementById('balance').value;
    if (!res || res < 0) { res = 0 };
    localStorage.setItem('kassa', res);
    temp = parseInt(localStorage.getItem('kassa'));
    document.getElementById('mainBalance').innerHTML = ` Касса : ${temp} грн.`;
    document.getElementById('kassa').style.display = 'none';
});

// событие проявляет input для ввода ставки 
document.getElementById('bets').addEventListener('click', function() {
    document.getElementById('informer').innerHTML = '';
    if (localStorage.getItem('bet')) {
        let y = parseInt(localStorage.getItem('bet')) + parseInt(localStorage.getItem('kassa'));
        localStorage.setItem('kassa', y);
        document.getElementById('mainBalance').innerHTML = ` Касса : ${y} грн.`;
        document.getElementById('betText').innerHTML = ` Ваша ставка : 0.00 грн.`;
        localStorage.setItem('bet', 0);
    };

    if (localStorage.getItem('kassa') && localStorage.getItem('kassa') != 0) {
        document.getElementById('betDiv').style.display = 'flex';
        document.getElementById('betDiv').style.marginTop = '50%';
    } else { alert('пополните счет') };
});

// событие enter после ввода суммы ставки
document.getElementById('butBet').addEventListener('click', function() {
    let valueBet = document.getElementById('bet').value;
    if (!valueBet || valueBet < 0) {
        valueBet = 0;
        document.getElementById('informer').innerHTML = 'Выключи комп и иди погуляй. Ставка не может быть меньше 0 и ОБЯЗАТЕЛЬНО должна быть больше 0!';
        document.getElementById('betDiv').style.display = 'none';
    } else {
        if (parseInt(valueBet) > parseInt(localStorage.getItem('kassa'))) { valueBet = parseInt(localStorage.getItem('kassa')) };
        document.getElementById('betText').innerHTML = ` Ваша ставка : ${valueBet} грн.`;
        document.getElementById('betDiv').style.display = 'none';
        document.getElementById('informer').innerHTML = 'Жми на START';
        localStorage.setItem('bet', valueBet);
        let mainKassa = parseInt(localStorage.getItem('kassa') - parseInt(localStorage.getItem('bet')));
        document.getElementById('mainBalance').innerHTML = ` Касса : ${mainKassa} грн.`;
        localStorage.setItem('kassa', mainKassa);
    };
});


// событие на нажатие запуска слота
document.getElementById('start').addEventListener('click', rnd);