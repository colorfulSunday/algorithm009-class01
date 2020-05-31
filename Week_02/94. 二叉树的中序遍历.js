/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    let res=[];

    helper(root,res);
    
    return res;
};
var helper = function(node,res) {
    if(node){
        helper(node.left,res);
        res.push(node.val);
        helper(node.right,res);
    }
}