"use strict";
exports.__esModule = true;
exports.AVLTree = void 0;
var helpers_1 = require("./helpers");
var Node = /** @class */ (function () {
    function Node(data, left, right) {
        if (data === void 0) { data = null; }
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    Node.prototype.push = function (data) {
        if (this.pushNodeLeft(data)) {
            if (this.left !== null) {
                this.left.push(data);
            }
            else {
                this.left = new Node(data);
            }
            this.doINeedToIncrementHeightLeft();
        }
        else {
            if (this.right !== null) {
                this.right.push(data);
            }
            else {
                this.right = new Node(data);
            }
            this.doINeedToIncrementHeightRight();
        }
        this.balanceTreeIfNeeded();
    };
    Node.prototype.pushNodeLeft = function (data) {
        return data < this.data;
    };
    Node.prototype.balanceTreeIfNeeded = function () {
        var rightHeight = this.ifNotNullReturnHeight(this.right);
        var leftHeight = this.ifNotNullReturnHeight(this.left);
        if (leftHeight > rightHeight + 1 || leftHeight + 1 < rightHeight) {
            var leftRightHeight = 0;
            var leftLeftHeight = 0;
            var rightRightHeight = 0;
            var rightLeftHeight = 0;
            if (this.left) {
                leftRightHeight = this.ifNotNullReturnHeight(this.left.right);
                leftLeftHeight = this.ifNotNullReturnHeight(this.left.left);
            }
            if (this.right) {
                rightRightHeight = this.ifNotNullReturnHeight(this.right.right);
                rightLeftHeight = this.ifNotNullReturnHeight(this.right.left);
            }
            if (leftHeight > rightHeight + 1) {
                //do I need to double rotate?
                if (leftRightHeight > leftLeftHeight) {
                    this.left.rotateRight();
                }
                this.rotateLeft();
            }
            else if (rightHeight > leftHeight + 1) {
                //do I need to double rotate?
                if (rightLeftHeight > rightRightHeight) {
                    this.right.rotateLeft();
                }
                this.rotateRight();
            }
        }
    };
    Node.prototype.ifNotNullReturnHeight = function (node) {
        if (node) {
            return node.height;
        }
        return 0;
    };
    Node.prototype.rotateLeft = function () {
        //solution from teacher
        var dataBefore = this.data;
        var rightBefore = this.right;
        this.data = this.left.data;
        this.right = this.left;
        this.left = this.left.left;
        this.right.left = this.right.right;
        this.right.right = rightBefore;
        this.right.data = dataBefore;
        this.right.updateHeights();
        this.updateHeights();
    };
    Node.prototype.rotateRight = function () {
        // store temp vars - for setting to left after initial swaps are done
        var rootData = this.data;
        var leftNode = this.left;
        // swap data
        this.data = this.right.data; // move data to root data
        this.left = this.right; // rotate right into left (balance)
        this.right = this.right.right; // pull right 'up' the tree (if needed)
        this.left.right = this.left.left; //
        // reassign left node after swap
        this.left.left = leftNode;
        this.left.data = rootData;
        //update heights as needed
        this.left.updateHeights();
        this.updateHeights();
    };
    Node.prototype.updateHeights = function () {
        if (!this.right && !this.left) {
            this.height = 1;
        }
        else if (!this.right ||
            (this.left && this.right.height < this.left.height)) {
            this.height = this.left.height + 1;
        }
        else {
            this.height = this.right.height + 1;
        }
    };
    Node.prototype.doINeedToIncrementHeightLeft = function () {
        if (!this.right || this.right.height < this.left.height) {
            this.height = this.left.height + 1;
        }
    };
    Node.prototype.doINeedToIncrementHeightRight = function () {
        if (!this.left || this.right.height > this.left.height) {
            this.height = this.right.height + 1;
        }
    };
    Node.prototype.serialize = function () {
        // @ts-ignore
        var ans = { data: this.data };
        ans.left = this.left === null ? null : this.left.serialize();
        ans.right = this.right === null ? null : this.right.serialize();
        return ans;
    };
    return Node;
}());
var AVLTree = /** @class */ (function () {
    function AVLTree() {
        this.root = null;
    }
    AVLTree.prototype.push = function (data) {
        if (!this.root) {
            this.root = new Node(data);
        }
        else {
            this.root.push(data);
        }
    };
    AVLTree.prototype.toObject = function () {
        return this.root.serialize();
    };
    return AVLTree;
}());
exports.AVLTree = AVLTree;
var preorderTraverse = function (node, array) {
    if (!node) {
        return array;
    }
    else {
        array.push(node.data);
        array = preorderTraverse(node.left, array);
        array = preorderTraverse(node.right, array);
        return array;
    }
};
var inorderTraverse = function (node, array) {
    if (!node) {
        return array;
    }
    else {
        array = inorderTraverse(node.left, array);
        array.push(node.data);
        array = inorderTraverse(node.right, array);
        return array;
    }
};
var postorderTraverse = function (node, array) {
    if (!node) {
        return array;
    }
    else {
        array = postorderTraverse(node.left, array);
        array = postorderTraverse(node.right, array);
        array.push(node.data);
        return array;
    }
};
(0, helpers_1.consoleStart)();
var nums = [8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11];
var tree = new AVLTree();
nums.map(function (num) { return tree.push(num); });
var tree2 = tree;
var objs = tree.toObject();
(0, helpers_1.validateFxn)(preorderTraverse(tree.root, []), []);
(0, helpers_1.validateFxn)(inorderTraverse(tree.root, []), []);
(0, helpers_1.validateFxn)(postorderTraverse(tree.root, []), []);
(0, helpers_1.consoleEnd)();
(0, helpers_1.consoleBuffer)();
