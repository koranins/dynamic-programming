// Give a set of coin values coins={c1, c2, ..., ck} and a target sum of money m,
// what's the minimum number of coins that from the sum m?
// coins: 1 4 5
// target amount: 13
// output: 13
// target amount: 150
// output: 30

const minIgnoreNull = (currentCount: number | null, nextCount: number): number | null => {
    if (currentCount === null) {
        return nextCount
    }

    return Math.min(currentCount, nextCount)
}

const naive = (amount: number, coins: number[]): number | null => {
    if (amount === 0) {
        return 0 
    }

    let minCount = null

    for (const coin of coins) {
        const nextAmount = amount - coin

        if (nextAmount < 0) {
            continue
        }

        let nextCount = naive(nextAmount, coins)

        if (nextCount === null) {
            continue
        }
        
        nextCount++

        minCount = minCount === null
            ? nextCount
            : Math.min(minCount, nextCount)
    }

    return minCount
}

console.log('naive 13', naive(13, [1, 4, 5]))

const topdown = (amount: number, coins: number[], memo: Map<number, number | null>): number | null => {
    if (memo.has(amount)) {
        return memo.get(amount)!
    }

    if (amount === 0) {
        return 0
    }

    let minCount = null

    for (const coin of coins) {
        const nextAmount = amount - coin

        if (nextAmount < 0) {
            continue
        }

        let nextCount = topdown(nextAmount, coins, memo)

        memo.set(nextAmount, nextCount)

        if (nextCount === null) {
            continue
        }

        nextCount++

        minCount = minCount === null
            ? nextCount
            : Math.min(minCount, nextCount)
    }

    return minCount
}

console.log('top-down 13', topdown(13, [1, 4, 5], new Map()))
console.log('top-down 150', topdown(150, [1, 4, 5], new Map()))

const bottomup = (targetAmount: number, coins: number[]) => {
    const amounts = [0, ...Array(targetAmount).fill(null)]
   
    for (let amount = 1; amount <= targetAmount; amount++) {
        for (const coin of coins) {
            const nextAmount = amount - coin
            if (nextAmount < 0) {
                continue
            }

            let nextCount = amounts[nextAmount]

            if (nextCount === null) {
                continue
            }

            nextCount++

            amounts[amount] = amounts[amount] === null
                ? nextCount
                : Math.min(amounts[amount], nextCount)
        }
    }
    
    return amounts[targetAmount]
}

console.log('bottom-up 13', bottomup(13, [1, 4, 5]))
console.log('bottom-up 150', bottomup(150, [1, 4, 5]))

// const minCoins = (expect: number, coins: number[]): number | null => {
//     // console.log({ expect })

//     if (expect === 0) {
//         return 0
//     } 

//     if (expect < 0) {
//         return null
//     }

//     let count = null

//     for (const coin of coins) {
//         const outstanding = expect - coin

//         let newCount = minCoins(outstanding, coins)
//         if (newCount !== null) {
//             newCount++
//         }

//         console.log({ coin, newCount })

//         count = minIgnoreNull(count, newCount)
//     }

//     return count
// }

// console.log('min coins', minCoins(6, [1, 4]))

// const minCoins2 = (amount: number, coins: number[], memo: Map<number, number | null>): number | null => {
//     if (memo.has(amount)) {
//         return memo.get(amount)!
//     }

//     if (amount === 0) {
//         return 0
//     }

//     if (amount < 0) {
//         return null
//     }

//     let count = null 

//     for (const coin of coins) {
//         const nextAmount = amount - coin

//         let newCount = minCoins2(nextAmount, coins, memo)

//         // memo.set(nextAmount, newCount)

//         if (newCount !== null) {
//             newCount++

//             count = count !== null
//                 ? Math.min(count, newCount)
//                 : newCount
//         }
//     }

//     memo.set(amount, count)

//     return count
// }

// console.log('min coins 2', minCoins2(150, [1, 4, 5], new Map()))


// bottom up
//        1      4      5
// 0     12      9      8
// 1     11      
// 2 
//         

// https://www.youtube.com/watch?v=H9bfqozjoqs
// const minCoins3 = (amount: number, coins: number[]) => {
//     const dp: (number | null)[] = [0]

//     for (let a = 0; a <= amount; a++) {
//         for (const coin of coins) {
//             const subproblem = a - coin
//             if (subproblem < 0) {
//                 continue
//             }

//             const count = minIgnoreNull(dp[a] ?? null, dp[subproblem] !== null ? 1 + dp[subproblem]! : null)
//             dp[a] = count
//         }
//     }

//     console.log({ dp })

//     return dp[amount] 
// }

// console.log('min coins 3', minCoins3(13, [1, 4, 5]))