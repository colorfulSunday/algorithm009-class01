/**
 * @param {character[][]} grid
 * @return {number}
 */
//思路：双层循环遍历为'1'的点，找到计数+1，
//并且把它周围的为'1'的点（上下左右，不包括自身）
//（递归遍历）变为'0'
var numIslands = function(grid) {
    var m=grid.length
    if(m==0){
        return 0;
    }
    var n=grid[0].length;
    var count=0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if(grid[i][j]=='1'){
                dfsMark(grid,i,j);
                count++;
            }
        }
    }
    function dfsMark(grid,i,j){
        if(i<0 || j<0 || i>=m || j>=n || grid[i][j]=='0' ){//注意：grid[i][j]=='0' 要放最后判断，不然可能索引越界
            return;
        }
        grid[i][j]='0';
        dfsMark(grid,i-1,j);
        dfsMark(grid,i,j-1);
        dfsMark(grid,i+1,j);
        dfsMark(grid,i,j+1);
    }
    return count;
};