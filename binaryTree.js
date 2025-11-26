class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    };
};

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    };

    add(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            this.size++;
            return;
        };

        let current = this.root;

        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                };

                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    break;
                };

                current = current.right;
            } else {
                return;
            };
        };
        this.size++;
    };

    contains(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        };

        return false;
    };

    remove(value) {
        const removeNode = (node, value) => {
            if (!node) return null;

            if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                if (!node.left && !node.right) {
                    this.size--;
                    return null;
                };

                if (!node.left) {
                    this.size--;
                    return node.right;
                };

                if (!node.right) {
                    this.size--;
                    return node.left;
                };

                let minRight = node.right;
                while (minRight.left) {
                    minRight = minRight.left;
                };

                node.value = minRight.value;
                node.right = removeNode(node.right, minRight.value);
                return node;
            };
        };

        this.root = removeNode(this.root, value);
    };

    outputElements() {
        const result = [];
        const inOrder = (node) => {
            if (!node) return;
            inOrder(node.left);
            result.push(node.value);
            inOrder(node.right);
        };

        inOrder(this.root);
        return result;
    }

    min() {
        if (!this.root) return null;
        let current = this.root;
        while (current.left) {
            current = current.left;
        };

        return current.value;
    };

    max() {
        if (!this.root) return null;
        let current = this.root;
        while (current.right) {
            current = current.right;
        };

        return current.value;
    };

    count() {
        return this.size;
    };
};

const bst = new BinarySearchTree();

bst.add(50);
bst.add(30);
bst.add(70);
bst.add(20);
bst.add(40);
bst.add(60);
bst.add(80);

console.log("All elements:", bst.outputElements());
console.log("Min:", bst.min());
console.log("Max:", bst.max());
console.log("Count:", bst.count());
console.log("Is there 40?", bst.contains(40));

bst.remove(50);
console.log("After removal:", bst.outputElements());
console.log("Count:", bst.count());
