class Tree {
    constructor(treeGraph) {
        this.root = null;
        this.graph = treeGraph;
    }
    async insert(node) {
        if(!this.root){
            this.root = node;
            this.fixNode(node);
            this.graph.appendChild(node.element);
            return;
        }
        let insertNode = node;
        let currNode = this.root;
        this.graph.appendChild(node.element);
        const rootElement = this.root.element;
        const rootRect = rootElement.getBoundingClientRect();
        const containerRect = this.graph.getBoundingClientRect();
        const startX = rootRect.left - containerRect.left;
        const startY = rootRect.top - containerRect.top;
        insertNode.element.style.position = "absolute";
        insertNode.element.style.left = `${startX}px`;
        insertNode.element.style.top = `${startY}px`;
        insertNode.element.style.transform = "translate(0, 0)";
        insertNode.element.style.transition = "transform 2s ease";
        insertNode.element.style.zIndex = "999";
        this.graph.appendChild(insertNode.element);
        let coordinates = [0, 0];
        
        while(true){
            if(node.val >= currNode.val) {
                coordinates = await this.moveRight(node, coordinates);
                if(!currNode.rightChild) {
                    currNode.rightChild = insertNode;
                    currNode.element.rightChildDiv.style.display = "block";
                    this.fixNode(currNode);
                    break;
                }
                currNode = currNode.rightChild;

            }
            else {
                coordinates = await this.moveLeft(node, coordinates);
                if(!currNode.leftChild) {
                    currNode.leftChild = insertNode;
                    currNode.element.leftChildDiv.style.display = "block";
                    this.fixNode(currNode);
                    break;
                }
                currNode = currNode.leftChild;
            }


        }
    }

    fixNode(insertNode) {
        insertNode.element.style.zIndex = "0";
    }
    moveRight(insertNode, coordinates) {
        coordinates[0] += 75;
        coordinates[1] += 75;
        return this.animate(insertNode, coordinates);
    }
    moveLeft(insertNode, coordinates) {
        coordinates[0] -= 75;
        coordinates[1] += 75;
        return this.animate(insertNode, coordinates);
    }

    animate(node, [x, y]) {
        return new Promise(resolve => {
            const onEnd = e => {
                if(e.propertyName === "transform"){
                    node.element.removeEventListener("transitionend", onEnd);
                    resolve([x, y]);
                }
            };
            node.element.addEventListener("transitionend", onEnd);
            requestAnimationFrame(() => {
                node.element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}


class Node {
    constructor(value = null, root = false) {
        this.val = value;
        this.element = this.createNode(root);
        this.leftChild = null;
        this.rightChild = null;
        
    }
    createNode(root) {
            let node = document.createElement("div");
            node.classList.add("node");
            node.style.transition = "top 0.5 ease, transform 0.5s ease";
        
            this.circle = document.createElement("div");
            this.circle.textContent = this.val;
            this.circle.classList.add("circle");
            node.appendChild(this.circle);
        
            this.leftChildDiv = document.createElement("div");
            this.leftChildDiv.classList.add("leftChild");
            node.appendChild(this.leftChildDiv);
        
            this.rightChildDiv = document.createElement("div");
            this.rightChildDiv.classList.add("rightChild");
            node.appendChild(this.rightChildDiv);

            this.leftChildDiv.style.display = "none";
            this.rightChildDiv.style.display = "none";
            node.style.zIndex = "999";
            if(root){
                node.style.position = "absolute";
                node.style.left = "50%";
                node.style.top = "100px";
                node.style.transform = "translateX(-50%)";
            }
        
            return node;
    }
    showLeftChild() {
        this.leftChildDiv.style.display = "block";
    }
    showRightChild() {
        this.rightChildDiv.style.display = "block";
    }
    hideLeftChild() {
        this.leftChildDiv.style.display = "none";
    }
    hideRightChild() {
        this.rightChildDiv.style.display = "none";
    }
}

function addToTree(node, treeGraph, ) {

}

document.addEventListener("DOMContentLoaded", () => {
    const treeGraph = document.getElementById("tree-graph");
    const nodeInput = document.getElementById("insert");
    const generateTree = document.getElementById("generateTree");
    let tree = new Tree(treeGraph);
    
    generateTree.addEventListener("click", async () => {
        const inpt = nodeInput.value.trim();
        if(!inpt) return;
        nodeInput.value = "";
        nodeInput.focus();
        const val = Number(inpt);
        if(Number.isNaN(val)){
            alert("Enter a valid number");
            return;
        }
        const isRoot = tree.root === null;
        const node = new Node(val, isRoot);
        await tree.insert(node);
    });

    document.getElementById("delete-tree").addEventListener("click", () => {
        treeGraph.innerHTML = "";
        tree = new Tree(treeGraph);
    });

});