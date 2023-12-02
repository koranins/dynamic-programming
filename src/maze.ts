// Given an NxM grid, in how many ways can a rabbit get from the top-left to the bottom-right corner
// if it can only move down or right?

// const memo: Array<Array<number>> = [[]] 

// const gridPath = (n: number, m: number) => {
//     for (let i = 0; i <= n; i++) {
//         memo[i][1] = 1
//     }

//     for (let j = 0; j <= m; j++) {
//         memo[j][1] = 1
//     }

//     for (let i; i < )
// }


const uniquePathsRecursive = (m: number, n: number) => {
    //Initialize and empty grid with 1 as default value
    let dp = new Array(m+1).fill(1).map(x => new Array(n+1).fill(0));

    const recur = (r: number, c: number) => {
        //If we have reached to the exit then return 1 as unique path
        if (r == m && c == n) return 1;
        
        //If we are exceeding the grid walls then return 0
        if (r > m || c > n) return 0;
    
        //If value is already present then return it.
        if (dp[r][c]) return dp[r][c];
    
        //Else get all the unique paths by calling itself in down and right direction
        dp[r][c] = recur(r+1, c) + recur(r, c+1);
    
        //Return the result
        return dp[r][c];
    }

    //start from the beginning 
    return recur(1,1);
}

console.log('unique path 18x6', uniquePathsRecursive(18, 6))
console.log('unique path 75x19', uniquePathsRecursive(75, 19))

const uniquePathsIterative = (m: number, n: number) => {
    //Initialize and empty grid with 1 as default value
    let dp = new Array(m+1).fill(1).map(x => new Array(n+1).fill(0));
    
    //Itearte the grid
    for (let i=1;i<=m;i++) {
        for (let j=1;j<=n;j++) {
            //If unique path then update the data in dp cache
            if (i==1 && j==1) dp[i][j] = 1;
            
            //Else return the result of down and right unique paths
            else dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
  
    //Return the result from end
    return dp[m][n];
}

console.log('unique iterative 18x6', uniquePathsIterative(18, 6))
console.log('unique iterative 75x19', uniquePathsIterative(75, 19))