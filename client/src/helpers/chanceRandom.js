export const chanceRandom = (arr) => {
    const maxRandom = arr.reduce((acc, curVal) => acc + curVal.chance, 0);

    const random = Math.floor(Math.random() * (maxRandom - 0) + 0);

    let maxChance = -1;
    let minChance;

    console.log(maxRandom, random);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].chance > 0) {
            minChance = maxChance + 1;
            maxChance = maxChance + arr[i].chance;

            if (minChance <= random && random <= maxChance) {
                return arr[i];
            }
        }
    }
};
