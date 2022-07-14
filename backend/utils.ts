export function getRandomOrder(numberOfDrivers: number): number[] {
    const arr = new Array<number>();
    while (arr.length < numberOfDrivers) {
        let candidateInt = Math.floor(Math.random() * numberOfDrivers) + 1
        if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
    return arr;
}

export function associateImageWithDriver(drivers): void{
    for (let i = 0; i < drivers.length; i++){
        //TODO: when fe app is ready, specify the route
        drivers[i]["url"] = `${drivers[i]["code"].toLowerCase()}.png`;
    }
}

export function sortDrivers(drivers){
    return drivers.sort((a, b) => a.place - b.place);
}