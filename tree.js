const Node = (value, leftChild = null, rightChild = null) => {
  return { value, leftChild, rightChild };
};

const Tree = (array = []) => {
  //BUILD TREE
  function buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    //sort the array
    array.sort((a, b) => a - b);
    //remove the replicate (function)
    const removeDuplicates = (array) => {
      let unique = [];
      array.forEach((item) => {
        if (!unique.includes(item)) {
          unique.push(item);
        }
      });
      return unique;
    };
    const sortedArray = removeDuplicates(array);

    const middle = Math.floor((sortedArray.length - 1) / 2);
    let root = Node(
      sortedArray[middle],
      buildTree(sortedArray.slice(0, middle)),
      buildTree(sortedArray.slice(middle + 1))
    );

    return root;
  }
  let root = buildTree(array); //! to put root in the return statement and make the (arranged) tree available when Tree(array) is called (with an array within)

  //INSERT
  function insertNode(value, node = root) {
    if (node.value === value) {
      return;
    }

    //the base case (if you add a Node, the node supposed to be above is necessarily "alone" so doesn't have a left or right child yet)
    if (node.leftChild === null && node.rightChild === null) {
      if (value > node.value) {
        node.rightChild = Node(value);
      } else if (value < node.value) {
        node.leftChild = Node(value);
      }
      //call the function recursively (until it "hits" the base case)
    } else if (value < node.value) {
      insertNode(value, node.leftChild);
    } else if (value > node.value) {
      insertNode(value, node.rightChild);
    }
  }

  //FIND
  function find(value, node = root) {
    //base case: if the value is find (node.value === value) return node (which shows value, left and right child)
    // or if the value doesn't exist return node (since in that case node === null)
    if (node === null || node.value === value) {
      return node;
    }

    //call the function recursively
    if (value > node.value) {
      return find(value, node.rightChild);
    } else if (value < node.value) {
      return find(value, node.leftChild);
    }
  }

  function findMinValue(node) {
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

  //DELETE
  function deleteNode(value, node = root) {
    if (node === null || find(value) === null) {
      return null;
    }

    //in order to go through the nodes
    if (value > node.value) {
      node.rightChild = deleteNode(value, node.rightChild);
    } else if (value < node.value) {
      node.leftChild = deleteNode(value, node.leftChild);
    } else {
      //until value = node.value
      //Then there are 2 cases: 1st = when one or no child
      if (node.leftChild === null) {
        return node.rightChild;
      } else if (node.rightChild === null) {
        return node.leftChild;
      }
      //2nd = when two children
      node.value = findMinValue(node.rightChild);
      node.rightChild = deleteNode(
        findMinValue(node.rightChild),
        node.rightChild
      );
    }

    return node;
  }

  //PRINT THE TREE
  //console.log the tree in a structured format
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return { buildTree, prettyPrint, insertNode, find, deleteNode, root };
};
