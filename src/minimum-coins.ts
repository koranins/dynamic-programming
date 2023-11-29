// Give a set of coin values coins={c1, c2, ..., ck} and a target sum of money m,
// what's the minimum number of coins that from the sum m?
// coins: 1 4 5
// target sum: 13

//           13
//    

// console.log('hello coin')

const minIgnoreNull = (a: number | null, b: number | null) => {
    if (a === null) {
        return b
    }

    if (b === null) {
        return a
    }

    return Math.min(a, b)
}

const minCoins = (expect: number, coins: number[]): number | null => {
    console.log({ expect })

    if (expect === 0) {
        return 0
    } 

    if (expect < 0) {
        return null
    }

    let count = null

    for (const coin of coins) {
        const outstanding = expect - coin
        const newCount = minCoins(outstanding, coins)
        count = minIgnoreNull(count, newCount === null ? null : newCount + 1)
        console.log({ count, coin, newCount, outstanding })
    }

    return count
}

console.log('min coins', minCoins(6, [1]))

