const memo = new Map<number, number>()

const td = (n: number): number => {
    if (memo.has(n)) {
        return memo.get(n)! 
    }

    if (n === 0) {
        memo.set(n, 0)
        return memo.get(n)!
    }

    if (n === 1) {
        memo.set(n, 1)
        return memo.get(n)!
    }
    
    const value = td(n - 1) + td(n - 2)
    memo.set(n, value)
    return memo.get(n)!
}

for (let i = 0; i <= 44; i ++) {
    console.log(`f(${i}) =`, td(i))
}