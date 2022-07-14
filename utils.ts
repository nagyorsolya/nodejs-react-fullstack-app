export function getRandomOrder(numberOfDrivers: number): number[] {
    const arr = new Array<number>();
    while (arr.length < numberOfDrivers) {
        let candidateInt = Math.floor(Math.random() * numberOfDrivers) + 1
        if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
    return arr;
}