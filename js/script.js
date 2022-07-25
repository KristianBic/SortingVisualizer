const container = document.querySelector(".center");
var delaySpeed = document.getElementById("sort_speed").value;
let allBars;
let numberOfComparisons = 0;

createBars();

/**
 * Creating bars for sorting
 * - size is based on the Array Size slider
 * - numerical values only appear in the bars if the font size is smaller than the width of the bar itself
 */
function createBars() {
    removeAllChildNodes(container);
    const arraySize = document.getElementById("array_size").value;
    const LABEL_FONTSIZE = 16;
    numberOfComparisons = 0;
    document.getElementById("range_ArraySize").innerHTML = arraySize;

    for (let i = 0; i < arraySize; i++) {
        //random value from 0 to 100
        const itemValue = Math.floor(Math.random() * 100)

        //creating individual bars into html
        const bar = document.createElement('div');
        bar.classList.add('bar');

        //styling bars
        bar.style.height = 5 * itemValue + 'px';

        //labeling value to individual bars
        const labelValue = document.createElement('label');
        labelValue.classList.add("bar_id");
        labelValue.innerHTML = itemValue;

        // Append "Label" to "div" and "div" to "container div"
        // Display "Label" only if it's smaller than single size of "bar"
        bar.appendChild(labelValue);
        if (getWidthOfBar() < LABEL_FONTSIZE) {
            labelValue.style.display = 'none';
        }
        container.appendChild(bar);
    }
}

/**
 * Setting current daley speed.
 * - delay is based on the Sort Speed slider
 */
function setDelay() {
    //setting delay speed
    const speed = document.getElementById("sort_speed").value;
    delaySpeed = speed;

    //displaying speed value under SortSpeed slider
    document.getElementById("range_SortSpeed").innerHTML = speed;
}

/**
 * Function uset to delete all bars. It is mainly used when we create new set of bars.
 * @param {*} parent node which will have all childNodes removed
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * Function used to determine a width of a single bar.
 * Method is used to check whether the label will fit inside the bar
 * @returns width of single bar
 */
function getWidthOfBar() {
    const containerWidth = container.offsetWidth;
    const arraySize = document.getElementById("array_size").value;
    const GAP_SIZE = 5;
    return (containerWidth - (arraySize * GAP_SIZE)) / arraySize;
}

/**
 * Delays code for period of time(according to value from variable 'delaySpeed')
 * Delay function is used to achieve better visualization.
 */
let delayCode = async (defaultDelay = delaySpeed) => {
    await new Promise((resolve) => setTimeout(() => {
        resolve();
    }, defaultDelay));
}

/**
 * Swap 2 different bars. Function swaps their width and label/value.
 * @param {*} i index of first bar to swap
 * @param {*} minIndex index of second bar to swap
 */
function swapBoth(i, minIndex) {
    let temp1 = allBars[minIndex].style.height;
    let temp2 = allBars[minIndex].childNodes[0].innerText;

    allBars[minIndex].style.height = allBars[i].style.height;
    allBars[minIndex].childNodes[0].innerText = allBars[i].childNodes[0].innerText;
    allBars[i].style.height = temp1;
    allBars[i].childNodes[0].innerText = temp2;
}

/**
 * Swap single bar. Function swaps it's width and label/value.
 * @param {*} first index of first bar to swap - this bar will have proberties of the 'second' bar
 * @param {*} second index of second bar to swap - this bar will be used as barameter for the first bar
 */
function swapSingle(first, second) {
    allBars[first].style.height = allBars[second].style.height;
    allBars[first].childNodes[0].innerText = allBars[second].childNodes[0].innerText;
}

/**
 * Method used for array - 'allBars'. Note that we cna only used this method if 'allBars' are inicialized
 * @param {*} index used on array 'allBars'
 * @param {*} color we can choose from: 'primaryMain', 'primaryVariant', 'white', 'green' or 'red'
 */
function changeBarColor(index, color) {
    getHexColor = () => {
        switch (color) {
            case "primaryMain":
                return "#e2b714";
            case "primaryVariant":
                return "#ffe68a";
            case "white":
                return '#d1d0c5';
            case "green":
                return '#3EC70B';
            case "red":
                return '#B74C4C';
        }
    }
    allBars[index].style.backgroundColor = getHexColor();
}

/**
 * Change all bars to color 'primaryMain'
 */
async function changeColorOfEveryBar() {
    for (let i = 0; i < allBars.length; i++) {
        await delayCode(20);
        changeBarColor(i, "primaryMain")
    }
}

/**
 * Function used to change/count number of compared values of the bars.
 */
function changeNumberOfComparisons() {
    document.getElementById('number_of_comparison').innerHTML = `Comparisons: ${numberOfComparisons}`;
    numberOfComparisons++;
}

/**
 * Function for sorting with method 'Select sort'
 * If we want to make it faster, then we can comment one of the 'delayCode' functions
 */
async function selectSort() {
    allBars = document.querySelectorAll(".bar");

    for (let i = 0; i < allBars.length; i++) {
        changeBarColor(i, "green"); // current compared bar(value)
        let minIndex = i;
        for (let j = i + 1; j < allBars.length; j++) {
            changeNumberOfComparisons();
            changeBarColor(j, "primaryVariant") //comapring this bar with allBars[i]
            await delayCode();

            let currentValue = parseInt(allBars[j].childNodes[0].innerHTML);
            let minValue = parseInt(allBars[minIndex].childNodes[0].innerHTML);
            if (minValue > currentValue) {
                if (minIndex !== i) changeBarColor(minIndex, "white");
                minIndex = j;
            } else changeBarColor(j, "white");
        }
        swapBoth(i, minIndex);
        await delayCode();

        changeBarColor(minIndex, "red") //smallest number from last cycle
        changeBarColor(i, "primaryMain") //already sorted bars
    }
}


async function insertSort() {
    allBars = document.querySelectorAll(".bar");

    for (let i = 1; i < allBars.length; i++) {
        changeBarColor(i, "green");
        let j = i - 1;

        const key = parseInt(allBars[i].style.height);
        const keyLabelValue = allBars[i].childNodes[0].innerText;

        await delayCode();
        while (j >= 0 && (parseInt(allBars[j].style.height) > key)) {
            changeNumberOfComparisons();

            changeBarColor(j, "primaryVariant"); //running color
            swapSingle(j + 1, j);

            j--;
            await delayCode();
            for (let k = i; k >= 0; k--) {
                allBars[k].style.background = 'white';
            }
        }
        allBars[j + 1].style.height = key; //we can't put here 'parseInt(allBars[i].style.height);' because that would put there different 'key' cuz we are switching bars inside while
        allBars[j + 1].childNodes[0].innerText = keyLabelValue;
    }
    changeColorOfEveryBar();
}

async function bubbleSort() {
    allBars = document.querySelectorAll(".bar");

    for (let i = 0; i < allBars.length - 1; i++) {
        await delayCode();
        for (let j = 0; j < allBars.length - i - 1; j++) {
            changeNumberOfComparisons();

            changeBarColor(j, "primaryVariant");
            changeBarColor(j + 1, "primaryVariant");

            let key = parseInt(allBars[j].childNodes[0].innerHTML);
            let keyPlusOne = parseInt(allBars[j + 1].childNodes[0].innerHTML);
            if (key > keyPlusOne) swapBoth(j, j + 1);
            await delayCode();

            changeBarColor(j, "white");
            changeBarColor(j + 1, "white");
        }
        changeBarColor(allBars.length - i - 1, "primaryMain");
    }
    changeBarColor(0, "primaryMain");
}


/**
 * Bad functionality - doesnt work
 */
async function quickSort() {
    allBars = document.querySelectorAll(".bar");
    await delayCode();
    await quick(0, allBars.length - 1); // 0 = min ; 'allbars.length' = max
    await delayCode();
}

async function quick(min, max) {
    let pivot = Math.round(allBars[(min + max) / 2]);
    let left = min;
    let right = max;

    changeBarColor(Math.round((min + max) / 2), "primaryMain");

    while (left < right) {
        await delayCode();
        while (allBars[left].childNodes[0].innerHTML < pivot) {
            left++;
            await delayCode();
        }
        while (allBars[right].childNodes[0].innerHTML > pivot) {
            right--;
            await delayCode();
        }
        if (left <= right) {
            swapBoth(left, right);
            left++;
            right--;
            await delayCode();
        }
    }
    await delayCode();
    if (min < right) quick(min, right);
    if (left < max) quick(left, max);
}