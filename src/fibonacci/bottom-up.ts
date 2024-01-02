const results: number[] = []

const bu = (n: number) => {
    for (let i = 0; i <= n; i++) {
        if (i === 0) {
            results[i] = 0
            continue
        }  
        
        if (i === 1) {
            results[i] = 1
            continue
        }  

        results[i] = results[i - 1] + results[i - 2]
    }

    return results[n]
}

for (let i = 0; i <= 44; i ++) {
    console.log(`f(${i}) =`, bu(i))
}