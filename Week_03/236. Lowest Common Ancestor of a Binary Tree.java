/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 * 问题分析：
 * 1当 left 和 right 同时为空 ：说明 root 的左 / 右子树中都不包含 p,q ，返回 null ；
 * 2当 left 和 right 同时不为空 ：说明 p,q 分列在 root 的 异侧 （分别在 左 / 右子树），因此 root 为最近公共祖先，返回 root；
 * 3当 left为空 ，right不为空 ：p,q 都不在 root 的左子树中，直接返回 right 。具体可分为两种情况：
 *   1 p,q 其中一个在 root 的 右子树 中，此时 right指向 p（假设为 p）；
 *   2 p,q 两节点都在 root的 右子树 中，此时的 right 指向 最近公共祖先节点 ；
 * 4当 left 不为空 ， right为空 ：与情况 3. 同理；
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if(left == null) 
            return right;
        if(right == null) 
            return left;
        return root;
    }
}