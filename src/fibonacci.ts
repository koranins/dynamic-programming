// how to: https://youtu.be/Hdr64lKQ3e4?t=111
// Write a function that returns n-th Fibonacci number
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1
// F(4) = F(3) + F(2)

const neive = (n: number): number => {
    if (n < 2)  {
        return n
    }

    return neive(n - 1) + neive(n - 2)
}

console.log('naive', neive(8))


const topdownFib = (n: number, memo: Map<number, number>): number => {
    if (memo.has(n)) {
        return memo.get(n)!
    }

    if (n < 2) {
        memo.set(n, n)
        return memo.get(n)!
    }

    const value = topdownFib(n - 1, memo) + topdownFib(n - 2, memo) 
    memo.set(n, value)
    return memo.get(n)!
}

console.log('top-down fib', topdownFib(8, new Map()))

const bottomupFib = (n: number): number => {
    const values = [0, 1]

    for (let i = 2; i <= n; i++) {
        values.push(values[i - 1] + values[i - 2])
    }

    return values[n]
}

console.log('bottom-up fib', bottomupFib(8))

const bottomupOptimized = (n: number): number => {
    let a = 1, b = 0
    if (n < 2) {
        return n 
    }

    let value = -1
    for (let i = 2; i <= n; i++) {
       value = a + b 
       b = a
       a = value

       console.log({ value, a, b })
    }

    return value
}

console.log('fib optimized', bottomupOptimized(8))

const bottomupOptimizedShort = (n: number): number => {
    const values = [0, 1]

    if (n < 2) {
        return n
    }

    for (let i = 2; i <= n; i++) {
        const [a, b] = values
        values.push(a + b)
        values.shift()
    }

    return values[1]
}

console.log('bottom-up optimized short', bottomupOptimizedShort(8))

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

// console.log('fib2', fib2(8))

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

// console.log('fib4', fib4(8))