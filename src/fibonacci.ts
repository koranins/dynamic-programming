// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1
// F(4) = F(3) + F(2)

// Recursion

// console.log('hello')

const fib = (n: number, memo: Map<number, number>): number  => {
    if (n < 2) {
        return n
    }

    if (!memo.has(n)) {
      memo.set(n, fib(n - 1, memo) + fib(n - 2, memo))
    }
    
    return memo.get(n)!
}

console.log('fib', fib(8, new Map()))

const fib2 = (n: number): number => {
    const vals = [0, 1]

    for (let i = 0; i <= n; i++) {
        if (i < 2) {
            return vals[i]
        }

        vals[i] = vals[i - 2] + vals[i - 2]
    }

    return vals[n]
}

console.log('fib2', fib(8, new Map()))