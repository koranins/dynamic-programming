// Write a function that returns n-th Fibonacci number
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1
// F(4) = F(3) + F(2)

const naiveFib = (n: number): number => {
    if (n < 2) {
        return n
    }

    return naiveFib(n - 1) + naiveFib(n - 2)
}

console.log('naiveFib', naiveFib(8))

// Recursion

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

// Readable
const fib2 = (n: number): number => {
    const vals = [0, 1]

    for (let i = 2; i <= n; i++) {
        vals[i] = vals[i - 2] + vals[i - 1]
    }

    return vals[n]
}

console.log('fib2', fib2(8))

// Improve memory
// F  |          a       | b      | c
// F0 |          0       |        |
// F1 |          0       | 1      | 1
// F2 | F1 + F0  b       | a      | 
// F3 | F2 + F1          |

const fib3 = (n: number): number => {
    let a = 0
    let b = 1

    if (n === 0) {
        return a
    }

    if (n === 1) {
        return b
    }

    let c = 0
    
    for (let i = 2; i <= n; i++) {
        c = b + a
        a = b
        b = c 
    }

    return c
}

console.log('fib3', fib3(8))

// saving memory with 

const fib4 = (n: number): number => {
    const values = [0, 1]

    if (n < 1) {
        return 0
    }

    for (let i = 2; i <= n; i++) {
        values.push(values[1] + values[0])
        values.shift()
    }

    return values.pop()!
}

console.log('fib4', fib4(8))