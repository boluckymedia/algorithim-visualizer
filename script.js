


function generateBars(graph, barCount) {
    graph.innerHTML = "";
    const graphWidth = graph.clientWidth;
    const maxHeight = graph.clientHeight;
    const barWidth = graphWidth / barCount;

    let heightInc = maxHeight / barCount;
    let height = heightInc;

    const BarObjects = [];
    
    for(let i = 0; i < barCount; i++){
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${height}px`;
        bar.style.width = `${barWidth}px`;
        graph.appendChild(bar);
        BarObjects.push({value: i, element: bar, sorted: true});
        height += heightInc;
    }

    return BarObjects;

}

function randomize(barArray, graph) {

    for(let i = 0; i < barArray.length; i++) {
        let idx = Math.floor(Math.random() * barArray.length);
        if(idx < i) {
            idx = Math.floor(Math.random() * (barArray.length - i)) + i;
        }
        let tempVal = barArray[idx].value;
        let tempBar = barArray[idx].element;
        barArray[idx].value = barArray[i].value;
        barArray[idx].element = barArray[i].element;
        barArray[i].value = tempVal;
        barArray[i].element = tempBar;
        barArray[i].sorted = false;
    }

    barArray.forEach(obj => graph.appendChild(obj.element));
    
}

async function bubbleSort(barArray, graph, delay) {
    let swapped = false;
    
    for(let j = 0; j < barArray.length-1; j++){
        swapped = false;
        for(let i = 0; i < barArray.length - j - 1; i++){
                barArray[i].element.style.backgroundColor = "red";
                barArray[i + 1].element.style.backgroundColor = "red";
                await sleep(delay);
                if(barArray[i].value > barArray[i + 1].value) {
                    let tempVal = barArray[i + 1].value;
                    let tempBar = barArray[i + 1].element;
                    barArray[i + 1].value = barArray[i].value;
                    barArray[i + 1].element = barArray[i].element;
                    barArray[i].value = tempVal;
                    barArray[i].element = tempBar;
                    swapped = true;
                    graph.innerHTML = "";
                }
                barArray[i].element.style.backgroundColor = "royalblue";
                barArray[i + 1].element.style.backgroundColor = "royalblue";
                barArray.forEach(obj => graph.appendChild(obj.element));
        }
        if(swapped == false){
            break;
        }
    }
}

async function selectionSort(barArray, graph, delay) {
    let sorted = true;

    for(let i = 0; i < barArray.length; i++){
        let min = barArray[i].value;
        let minIdx = i;
        sorted = true;
        barArray[i].element.style.backgroundColor = "red";
        for(let j = i + 1; j < barArray.length; j++) {
            barArray[j].element.style.backgroundColor = "red";
            await sleep(delay);
            if(barArray[j].value < min ) {
                min = barArray[j].value;
                minIdx = j;
                barArray[j].element.style.backgroundColor = "green";
                sorted = false;
            }
            else {
                barArray[j].element.style.backgroundColor = "royalblue";
            }
            graph.innerHTML = "";
            barArray.forEach(obj => graph.appendChild(obj.element));
        }

        let tempVal = barArray[i].value;
        let tempBar = barArray[i].element;
        barArray[i].value = barArray[minIdx].value;
        barArray[i].element = barArray[minIdx].element;
        barArray[minIdx].value = tempVal;
        barArray[minIdx].element = tempBar;
        barArray[minIdx].element.style.backgroundColor = "royalblue";
        barArray[i].element.style.backgroundColor = "green";
        graph.innerHTML = "";
        barArray.forEach(obj => graph.appendChild(obj.element));

    }
}

async function mergeSort(barArray, graph, delay, left, right) {
    if(left >= right){
        return;
    }
    let mid = left + Math.floor((right - left) / 2);
    await mergeSort(barArray, graph, delay, left, mid);
    await mergeSort(barArray, graph, delay, mid + 1, right);
    await merge(barArray, graph, delay, left, mid, right);
}

async function merge(barArray, graph, delay, left, mid, right) {
    let leftSize = mid - left + 1;
    let rightSize = right - mid;

    let arrLeft = [];
    for(let i = 0; i < leftSize; i++){
        arrLeft.push(barArray[left + i]);
    }
    let arrRight = [];
    for(let i = 0; i < rightSize; i++){
        arrRight.push(barArray[mid + 1 + i]);
    }
    const baseHue = 0;
    const baseSaturation = 0;
    arrLeft.forEach((bar, i) => {
        const lightness = 40 + (i / arrLeft.length) * 40;
        bar.element.style.backgroundColor = `hsl(${baseHue}, ${baseSaturation}%, ${lightness}%)`;
    });
    arrRight.forEach((bar, i) => {
        const lightness = 40 + (i / arrRight.length) * 40;
        bar.element.style.backgroundColor = `hsl(${baseHue}, ${baseSaturation}%, ${lightness}%)`;
    });
    let i = 0; 
    let j = 0;
    let k = left;
    while(i < leftSize && j < rightSize){
        if(arrLeft[i].value <= arrRight[j].value){
            barArray[k] = arrLeft[i];
            i++; 
        }
        else {
            barArray[k] = arrRight[j];
            j++; 
        }
        k++;
    }
    while(i < leftSize){
        barArray[k] = arrLeft[i];
        i++;
        k++;
    }
    while(j < rightSize) {
        barArray[k] = arrRight[j];
        j++;
        k++;
    }
    await sleep(delay);
    graph.innerHTML = "";
    barArray.forEach(bar => graph.appendChild(bar.element));
    for (let i = left; i <= right; i++) {
        barArray[i].element.style.backgroundColor = "green";
    }
}

async function insertionSort(barArray, graph, delay){

    for(let i = 1; i < barArray.length; i++){
        let curr = barArray[i];
        barArray[i].element.style.backgroundColor = "red";
        let j = i - 1;
        while(j >= 0 && barArray[j].value > curr.value) {
            barArray[j].element.style.backgroundColor = "orange"; 
            await sleep(delay);
            barArray[j + 1] = barArray[j]; 
            barArray[j + 1].element.style.backgroundColor = "royalblue";

            j--;

        }
        barArray[j+1] = curr;
        barArray[j + 1].element.style.backgroundColor = "green";
        await sleep(delay);
        graph.innerHTML = "";
        barArray.forEach(bar => graph.appendChild(bar.element));
        for (let k = 0; k <= i; k++) {
            barArray[k].element.style.backgroundColor = "green";
        }
    }
}

async function quickSort(barArray, graph, delay, start, end) {
    if(start < end) {
        let pivot = await partition(barArray, graph, delay, start, end);
        await quickSort(barArray, graph, delay, start, pivot - 1);
        await quickSort(barArray, graph, delay, pivot + 1, end);
    }
}

async function partition(barArray, graph, delay, start, end) {
    let pivotIdx = Math.floor(Math.random() * (end - start + 1)) + start;
    [barArray[pivotIdx], barArray[end]] = [barArray[end], barArray[pivotIdx]];
    let pivotVal = barArray[end].value;
    let i = start - 1;
    for(let j = start; j <= end - 1; j++){
        if(barArray[j].value < pivotVal) {
            i++;
            let temp = barArray[i];
            barArray[i] = barArray[j];
            barArray[j] = temp;
            barArray[j].element.style.backgroundColor = "red";
            await sleep(delay);
            graph.innerHTML = "";
            barArray.forEach(bar => graph.appendChild(bar.element));
        }
        barArray[j].element.style.backgroundColor = "green";
    }
    let temp = barArray[i + 1];
    barArray[i + 1] = barArray[end];
    barArray[end] = temp;
    return i + 1;
}
/*
function createNode(val) {
    const node = document.createElement("div");
    node.classList.add("node");

    const value = document.createElement("h3");
    value.textContent = val;
    node.appendChild(value);

    const 

}
*/

document.addEventListener("DOMContentLoaded", () => {

    const barCountInput = document.getElementById("barCount");
    const graph = document.getElementById("graph");

    const generateBtn = document.getElementById("generateBtn");
    const startBtn = document.getElementById("startSort");


    let barArray = generateBars(graph, 15);
    
    generateBtn.addEventListener("click", () => {
        const count = parseInt(barCountInput.value);
        barArray = generateBars(graph, count);
        randomize(barArray, graph);

    }); 
    
    startBtn.addEventListener("click", async () => {
        const sortType = document.getElementById("sortSelect").value;
        const delay = document.getElementById("speed").value;
        switch(sortType) {
            case "bubble":
                await bubbleSort(barArray, graph, delay);
                break;
            case "insertion":
                await insertionSort(barArray, graph, delay);
                break;
            case "merge":
                await mergeSort(barArray, graph, delay, 0, barArray.length - 1);
                break;
            case "quick":
                await quickSort(barArray, graph, delay, 0, barArray.length - 1);
                break;
            case "selection":
                await selectionSort(barArray, graph, delay);
                break;
        }
    });

/*
    const treeGraph = document.getElementById("tree");
    const nodeInput = document.getElementById("insert");
    const generateTree = document.getElementById("generateTree");
    let treeArr = [];
    let nodeIdx = 0;

    generateTree.addEventListener("click", async () => {
        const input = nodeInput.value;
        treeArr.push(...(input.split(',').map(item => item.trim()).filter(item => item !== "")));
        for(; nodeIdx < treeArr.length; nodeIdx++) {
            let currNode = createNode(treeArr[nodeIdx]);
            treeArr[nodeIdx] = {val: treeArr[nodeIdx], leftChild: -1, rightChild: -1, node: currNode};
        }
    });

*/
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}