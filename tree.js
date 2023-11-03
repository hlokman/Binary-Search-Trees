const Node = (value, leftChild = null, rightChild = null) => {
  return { value, leftChild, rightChild };
};

const Tree = (array = []) => {
  function buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    //sort the array
    const sort = array.sort((a, b) => a - b);
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
    const sortedArray = removeDuplicates(sort);

    const middle = Math.floor((sortedArray.length - 1) / 2);
    let root = Node(
      sortedArray[middle],
      buildTree(sortedArray.slice(0, middle)),
      buildTree(sortedArray.slice(middle + 1))
    );

    return root;
  }

  let root = buildTree(array); //! to put root in the return statement and make the (arranged) tree available when Tree(array) is called (with an array within)

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

  return { buildTree, prettyPrint, root };
};
