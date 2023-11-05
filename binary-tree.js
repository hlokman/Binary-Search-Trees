class Node {
  constructor(value, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array) {
    this.sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(this.sortedArray); //that's why you don't write this.sortedArray *
  }

  buildTree(sortedArray) {
    //* HERE
    if (sortedArray.length === 0) return null;
    let middle = Math.floor((sortedArray.length - 1) / 2);
    const newNode = new Node(
      sortedArray[middle],
      this.buildTree(sortedArray.slice(0, middle)),
      this.buildTree(sortedArray.slice(middle + 1))
    );

    return newNode;
  }

  insertNode(value, node = this.root) {
    if (node.value === value) {
      return;
    } //if value < node.value
    else if (node.value > value) {
      if (node.leftChild) {
        //call the function recursively until the node is "alone": if you add a Node, the node supposed to be above is necessarily "alone" so doesn't have a left or right child yet
        this.insertNode(value, node.leftChild);
      } else {
        node.leftChild = new Node(value);
      }
    } //if value > node.value
    else {
      if (node.rightChild) {
        this.insertNode(value, node.rightChild);
      } else {
        node.rightChild = new Node(value);
      }
    }
  }

  find(value, node = this.root) {
    //base case: if the value is find (node.value === value) return node (which shows value, left and right child)
    // or if the value doesn't exist return node (since in that case node === null)
    if (node === null || node.value === value) {
      return node;
    }

    //call the function recursively
    if (value > node.value) {
      return this.find(value, node.rightChild);
    } else if (value < node.value) {
      return this.find(value, node.leftChild);
    }
  }

  findMinValue(node = this) {
    if (node === null) {
      return null;
    }
    let min = node.value;
    while (node.leftChild !== null) {
      min = node.leftChild.value;
      node = node.leftChild;
    }
    return min;
  }

  deleteNode(value, node = this.root) {
    if (node === null || this.find(value) === null) {
      return null;
    }

    //in order to go through the nodes
    if (value > node.value) {
      node.rightChild = this.deleteNode(value, node.rightChild);
    } else if (value < node.value) {
      node.leftChild = this.deleteNode(value, node.leftChild);
    } else {
      //until value = node.value
      //Then there are 2 cases: 1st = when one or no child
      if (node.leftChild === null) {
        return node.rightChild;
      } else if (node.rightChild === null) {
        return node.leftChild;
      }
      //2nd = when two children
      node.value = this.findMinValue(node.rightChild);
      node.rightChild = this.deleteNode(
        this.findMinValue(node.rightChild),
        node.rightChild
      );
    }

    return node;
  }

  levelOrder(callback) {
    const queue = [this.root];
    const result = [];
    //define default callback if no callback entered
    if (typeof callback === "undefined") {
      callback = (node = this.root) => {
        result.push(node.value);
      };
    }

    while (queue.length !== 0) {
      const node = queue.shift();
      callback(node); //callback (might be default one) used
      if (node.leftChild !== null) {
        queue.push(node.leftChild);
      }
      if (node.rightChild !== null) {
        queue.push(node.rightChild);
      }
    }

    return result;
  }

  preorder(callback, node = this.root) {
    const result = [];
    //define default callback if no callback entered
    if (typeof callback === "undefined") {
      callback = (node = this.root) => {
        result.push(node.value);
      };
    }
    //base case (?)
    if (node === null) {
      return result;
    }
    callback(node); //callback (might be default one) used
    this.preorder(callback, node.leftChild);
    this.preorder(callback, node.rightChild);
    return result;
  }

  inorder(callback, node = this.root) {
    const result = [];
    //define default callback if no callback entered
    if (typeof callback === "undefined") {
      callback = (node = this.root) => {
        result.push(node.value);
      };
    }
    //base case (?)
    if (node === null) {
      return result;
    }
    this.inorder(callback, node.leftChild);
    callback(node); //callback (might be default one) used
    this.inorder(callback, node.rightChild);
    return result;
  }

  postorder(callback, node = this.root) {
    const result = [];
    //define default callback if no callback entered
    if (typeof callback === "undefined") {
      callback = (node = this.root) => {
        result.push(node.value);
      };
    }
    //base case (?)
    if (node === null) {
      return result;
    }
    this.postorder(callback, node.leftChild);

    this.postorder(callback, node.rightChild);
    callback(node); //callback (might be default one) used
    return result;
  }

  height(node = this.root) {
    if (node === null) {
      return 0; //base case
    } else {
      return Math.max(
        this.height(node.leftChild) + 1,
        this.height(node.rightChild) + 1
      );
    }
  }

  depth(value, rootNode = this.root) {
    if (this.find(value, rootNode) === null) {
      return -1;
    }

    if (rootNode === null) {
      return 0; //
    }
    return Math.max(
      this.depth(value, rootNode.leftChild) + 1,
      this.depth(value, rootNode.rightChild) + 1
    );
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }
    return (
      //below: return boolean
      Math.abs(this.height(node.leftChild) - this.height(node.rightChild)) <=
        1 &&
      this.isBalanced(node.leftChild) &&
      this.isBalanced(node.rightChild)
    );
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}

//----------Script
function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100)); //will call Math.floor for each element (*100 to get random numbers < 100)
}

const newTree = new Tree(randomArray(18));
newTree.prettyPrint();
console.log("Balanced:", newTree.isBalanced());
console.log("Level-order traversal:", newTree.levelOrder());
console.log("Preorder traversal:", newTree.preorder());
console.log("Inorder traversal:", newTree.inorder());
console.log("Postorder traversal:", newTree.postorder());

newTree.insertNode(333);
newTree.insertNode(364);
newTree.insertNode(874);
newTree.insertNode(659);
newTree.insertNode(2111);
newTree.prettyPrint();
console.log("Balanced:", newTree.isBalanced());
newTree.rebalance();
newTree.prettyPrint();
console.log("Balanced:", newTree.isBalanced());
console.log("Level-order traversal:", newTree.levelOrder());
console.log("Preorder traversal:", newTree.preorder());
console.log("Inorder traversal:", newTree.inorder());
console.log("Postorder traversal:", newTree.postorder());
