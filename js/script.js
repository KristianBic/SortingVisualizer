const container = document.querySelector(".center");
var delaySpeed = document.getElementById("sort_speed").value;
let allBars;

createBars();

function createBars() {
    removeAllChildNodes(container);
    const arraySize = document.getElementById("array_size").value;
    const LABEL_FONTSIZE = 16;
    document.getElementById("range_ArraySize").innerHTML = arraySize;

    for (let i = 0; i < arraySize; i++) {
        //random value from 0 to 1000
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

function setDelay() {
    const speed = document.getElementById("sort_speed").value;
    delaySpeed = speed;
    document.getElementById("range_SortSpeed").innerHTML = speed;
}

/**
 * Function uset to delete all bars, when we create new ones
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
 */
let delayCode = async () => {
    await new Promise((resolve) => setTimeout(() => {
        resolve();
    }, delaySpeed));
}

/**
 * swap 2 values
 * @param {*} allBars 
 * @param {*} i 
 * @param {*} minIndex 
 */
function swap(i, minIndex) {
    let temp1 = allBars[minIndex].style.height;
    let temp2 = allBars[minIndex].childNodes[0].innerText;

    allBars[minIndex].style.height = allBars[i].style.height;
    allBars[minIndex].childNodes[0].innerText = allBars[i].childNodes[0].innerText;
    allBars[i].style.height = temp1;
    allBars[i].childNodes[0].innerText = temp2;
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
 * Function for sorting with method 'Select sort'
 * If we want to make it faster, then we can comment one of the 'delayCode' functions
 */
async function selectSort() {
    allBars = document.querySelectorAll(".bar");
    let numberOfComparisons = 0;

    for (let i = 0; i < allBars.length; i++) {
        changeBarColor(i, "green"); // current compared bar(value)
        let minIndex = i;
        for (let j = i + 1; j < allBars.length; j++) {
            document.getElementById('number_of_comparison').innerHTML = `Comparisons: ${numberOfComparisons}`; //record number of comparision
            numberOfComparisons++;
            changeBarColor(j, "primaryVariant") //comapring this bar with allBars[i]
            await delayCode();

            let currentValue = parseInt(allBars[j].childNodes[0].innerHTML);
            let minValue = parseInt(allBars[minIndex].childNodes[0].innerHTML);
            if (minValue > currentValue) {
                if (minIndex !== i) changeBarColor(minIndex, "white");
                minIndex = j;
            } else changeBarColor(j, "white");
        }

        swap(i, minIndex);
        await delayCode();

        changeBarColor(minIndex, "red") //smallest number from last cycle
        changeBarColor(i, "primaryMain") //already sorted bars
    }
}


/TODO: pri prehladavani sa swapuje kadzden jeden comparovany bar ... swapovat sa ma iba ten jeden vybraty
async function insertSort() {
    allBars = document.querySelectorAll(".bar");
    let numberOfComparisons = 0;

    for (let i = 1; i < allBars.length; i++) {
        changeBarColor(i, "green"); // current compared bar(value)
        let j = 0;
        while (j < i) {
            document.getElementById('number_of_comparison').innerHTML = `Comparisons: ${numberOfComparisons}`; //record number of comparision
            numberOfComparisons++;
            changeBarColor(j, "primaryVariant") //comapring this bar with allBars[i]
            await delayCode();

            let currentValue = parseInt(allBars[j].childNodes[0].innerHTML);
            let minValue = parseInt(allBars[i].childNodes[0].innerHTML);
            if (minValue >= currentValue) {
                if (j !== i) changeBarColor(j, "primaryMain"); //already sorted bars
                j++;
            } else changeBarColor(j, "primaryMain"); //already sorted bars

            swap(i, j);
            await delayCode();
            changeBarColor(i, "green") //compared
        }
    }
    changeBarColor(allBars.length - 1, "primaryMain")
}