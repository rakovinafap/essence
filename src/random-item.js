const dropTable = [
    { item: 'Очень редкий предмет', chance: 0.01 },      // Очень редкий предмет - 1% вероятности (0.01)
    { item: 'Редкий предмет', chance: 0.05 },            // Редкий предмет - 5% вероятности (0.05)
    { item: 'Необычный предмет', chance: 0.15 },         // Необычный предмет - 15% вероятности (0.15)
    { item: 'Обычный предмет', chance: 0.4 },            // Обычный предмет - 40% вероятности (0.4)
    { item: 'Распространенный предмет', chance: 0.39 },  // Распространенный предмет - 39% вероятности (0.39)
];

function calculateDrop() {
    const randomValue = Math.random(); // Генерация случайного числа от 0 до 1

    let cumulativeChance = 0; // Инициализируем переменную, которая будет накапливать вероятность

    /*
    В этой части кода переменная cumulativeChance используется для накопления вероятности каждого предмета по мере прохождения цикла.
    Значение cumulativeChance увеличивается на вероятность текущего предмета (drop.chance), что позволяет сравнить сгенерированное
    случайное число randomValue с накопленной вероятностью.

    Когда случайное число становится меньше или равным накопленной вероятности (randomValue <= cumulativeChance), это означает, что предмет выпал.
    Затем функция возвращает выпавший предмет (drop.item).
    Этот процесс повторяется для каждого предмета в таблице dropTable, пока не будет найден выпавший предмет или пока не будут пройдены все предметы в таблице.
    */

    for (const drop of dropTable) {
        cumulativeChance += drop.chance; // Добавляем текущую вероятность предмета к накопленной вероятности

        if (randomValue <= cumulativeChance) { // Проверяем, выпал ли предмет на основе сгенерированного случайного значения и накопленной вероятности
            return drop.item; // Возвращаем предмет, если случайное число меньше или равно накопленной вероятности
        }
    }

}

const drop = calculateDrop();
console.log(drop); // Выводит случайный выпавший предмет в консоль
