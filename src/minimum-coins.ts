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
    // console.log({ expect })

    if (expect === 0) {
        return 0
    } 

    if (expect < 0) {
        return null
    }

    let count = null

    for (const coin of coins) {
        const outstanding = expect - coin

        let newCount = minCoins(outstanding, coins)
        if (newCount !== null) {
            newCount++
        }

        console.log({ coin, newCount })

        count = minIgnoreNull(count, newCount)
    }

    return count
}

// console.log('min coins', minCoins(6, [1, 4]))

const minCoins2 = (amount: number, coins: number[], memo: Map<number, number | null>): number | null => {
    if (memo.has(amount)) {
        return memo.get(amount)!
    }

    if (amount === 0) {
        return 0
    }

    if (amount < 0) {
        return null
    }

    let count = null 

    for (const coin of coins) {
        const nextAmount = amount - coin

        let newCount = minCoins2(nextAmount, coins, memo)

        // memo.set(nextAmount, newCount)

        if (newCount !== null) {
            newCount++

            count = count !== null
                ? Math.min(count, newCount)
                : newCount
        }
    }

    memo.set(amount, count)

    return count
}

// console.log('min coins 2', minCoins2(150, [1, 4, 5], new Map()))


// bottom up
//        1      4      5
// 0     12      9      8
// 1     11      
// 2 
//         

// https://www.youtube.com/watch?v=H9bfqozjoqs
const minCoins3 = (amount: number, coins: number[]) => {
    const dp: (number | null)[] = [0]

    for (let a = 0; a <= amount; a++) {
        for (const coin of coins) {
            const subproblem = a - coin
            if (subproblem < 0) {
                continue
            }

            const count = minIgnoreNull(dp[a] ?? null, dp[subproblem] !== null ? 1 + dp[subproblem]! : null)
            dp[a] = count
        }
    }

    console.log({ dp })

    return dp[amount] 
}

console.log('min coins 3', minCoins3(13, [1, 4, 5]))