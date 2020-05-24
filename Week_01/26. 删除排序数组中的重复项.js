/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if(nums == null || nums.length == 0) return 0;
    let p = 0;//记录新数组下一个要放入元素的位置
    let q = 1;
    while(q < nums.length){
        if(nums[p] != nums[q]){
            nums[++p] = nums[q];
        }
        q++;
    }
    return p+1;
};