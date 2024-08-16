class Node {
    constructor(parent = null,x=0,y=0) {
        //Later to be assigned: x, y, xindex, yindex
        this.parent = parent;
        this.x = x
        this.y = y
        this.children = [];
        this.edgeLengths = [];
    }
    addChild(childNode, edgeLength) {
        childNode.parent = this;
        this.children.push(childNode);
        this.edgeLengths.push(edgeLength);
        return childNode
    }
}

class Tree{
    constructor() {
        this.root = new Node(null,0.5, 0.5);
        this.scale = 0.1 //flap's cp length = scale*flap length
    
    }
    getNodes() {
        console.log(this)
        let nodes = [];
        function traverse(node) {
            nodes.push(node);
            if(node.children.length == 0){
                return
            }
            for (let child of node.children) {
                traverse(child);
            }
        }
        traverse(this.root);
        this.nodes = nodes;
        return nodes;
    }
    // Helper method to find the path from root to a given node
    findPath(root, targetNode, path = []) {
        if (root === null) return false;
        path.push(root);
        if (root === targetNode) return true;
        for (let child of root.children) {
            if (this.findPath(child, targetNode, path)) return true;
        }
        path.pop();
        return false;
    }
    // Helper method to find the Lowest Common Ancestor (LCA) of two nodes
    findLCA(root, node1, node2) {
        let path1 = [];
        let path2 = [];
        if (!this.findPath(root, node1, path1) || !this.findPath(root, node2, path2)) {
            return null;
        }
        let i;
        for (i = 0; i < path1.length && i < path2.length; i++) {
            if (path1[i] !== path2[i]) break;
        }
        return path1[i - 1];
    }
    // Method to calculate the distance between two nodes
    findDistance(node1, node2) {
        let lca = this.findLCA(this.root, node1, node2);
        if (!lca) return -1;
        const distanceToLCA = (node, lca) => {
            let distance = 0;
            while (node !== lca) {
                if (node.parent === null) break
                let parentIndex = node.parent.children.indexOf(node);
                distance += node.parent.edgeLengths[parentIndex];
                node = node.parent;
            }
            return distance;
        };
        return distanceToLCA(node1, lca) + distanceToLCA(node2, lca);
    }
}

function treeDistance(node1, node2){
    let distance = 0;
    let currentNode = node1;
    while (currentNode != node2){
        let minDistance = Infinity;
        let minIndex = -1;
        for (let i = 0; i < currentNode.children.length; i++){
            let child = currentNode.children[i];
            let childDistance = treeDistance(child, node2);
            if (childDistance < minDistance){
                minDistance = childDistance;
                minIndex = i;
            }
        }
        distance += currentNode.edgeLengths[minIndex];
        currentNode = currentNode.children[minIndex];
    }
    return distance;
}

// let tree = new Tree();
// for(i=1; i<10; i++){
//     tree.root.addChild(new Node(), i);
// }
