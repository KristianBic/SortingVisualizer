const container = document.querySelector(".center");
var delaySpeed = document.getElementById("sort_speed").value;

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
 * Function for sorting with method 'Select sort'
 * If we want to make it faster, then we can comment one of the 'delayCode' functions
 */
async function selectSort() {
    let allBars = document.querySelectorAll(".bar");
    let numberOfComparisons = 0;
    for (let i = 0; i < allBars.length; i++) {
        allBars[i].style.backgroundColor = '#3EC70B'; // current compared bar(value)
        let minIndex = i;
        for (let j = i + 1; j < allBars.length; j++) {
            //record number of comparision
            document.getElementById('number_of_comparison').innerHTML = `Comparisons: ${numberOfComparisons}`;
            numberOfComparisons++;

            allBars[j].style.backgroundColor = "#ffe68a"; //comapring this bar with allBars[i]
            await delayCode();
            let currentValue = parseInt(allBars[j].childNodes[0].innerHTML);
            let minValue = parseInt(allBars[minIndex].childNodes[0].innerHTML);
            if (minValue > currentValue) {
                if (minIndex !== i) {
                    allBars[minIndex].style.backgroundColor = "#d1d0c5";
                }
                minIndex = j;
            } else {
                allBars[j].style.backgroundColor = "#d1d0c5";
            }
        }
        //swap
        // height and value of minValue
        let temp1 = allBars[minIndex].style.height;
        let temp2 = allBars[minIndex].childNodes[0].innerText;

        allBars[minIndex].style.height = allBars[i].style.height;
        allBars[minIndex].childNodes[0].innerText = allBars[i].childNodes[0].innerText;
        allBars[i].style.height = temp1;
        allBars[i].childNodes[0].innerText = temp2;

        await delayCode();

        allBars[minIndex].style.backgroundColor = "#B74C4C"; //smallest number from last cycle
        allBars[i].style.backgroundColor = "#e2b714"; //already sorted bars
    }
}