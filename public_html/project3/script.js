function calcMean(array) {
	return (Number(calcSum(array)) / array.length).toFixed(2);
}

function calcMedian(array) {
	array.sort(function(a, b){return a-b});
	if (array.length % 2 == 1) {
		return array[((array.length + 1) / 2 - 1)].toFixed(2);
	} else {
		var a = array.length / 2;
		return ((array[a-1] + array[a]) / 2).toFixed(2);
	}
}

function calcMode(array) {
	var mode;
	var curMode = 0;
	var streak = 1;
	var i;
	array.sort(function(a, b){return a-b});
	for (i = 0; i < array.length; i++) {
		if (array[i] == array[i+1] && streak == curMode) {
			mode += " " + array[i].toString();
		} else if (array[i] == array[i+1] && streak > curMode) {
			mode = array[i].toString();
			curMode = streak;
		} else if (array[i] != array[i+1]) {
			streak = 0;
		}
		streak++;
	}
	return mode;
}

function calcStdDev(array) {
	return (Math.sqrt(calcVariance(array))).toFixed(2);
}

function calcSum(array) {
	var x;
	var sum = 0;
	for (x of array) { sum += x; }
	return sum.toFixed(2);
}

function calcVariance(array) {
	var x;
	var mean = Number(calcMean(array));
	var sum = 0;
	for (x of array) {
		sum += Math.pow(x - mean, 2);
	}
	return (sum / array.length).toFixed(2);
}

function findMax(array) {
	array.sort(function(a, b){return b-a});
	return array[0].toFixed(2);
}

function findMin(array) {
	array.sort(function(a, b){return a-b});
	return array[0].toFixed(2);
}

function performStatistics() {
	event.preventDefault();
	var userIn = document.getElementById("userIn").value;
	var array = userIn.split(" ");
	var i;
	//convert array to numbers 
	for (i = 0; i < array.length; i++) { array[i] = parseFloat(array[i]); }
	//test that all values entered are numbers
	if (array.filter(isNaN).length != 0) {
		alert("You entered a value that is not a number.\nPlease enter 5 to 20 numbers.");
	} 
	//test that 5 to 20 numbers have been entered
	else if (array.length < 5 || array.length > 20) {
		alert("You entered " + array.length + " numbers.\nPlease enter 5 to 20 numbers.");
	}
	//test that all numbers are between 0 and 100
	else if (findMin(array) < 0 || findMax(array) > 100) {
		alert("You entered a number below 0 or above 100.\n");
	}
	//if all tests pass, calculate statistics
	else {
		document.getElementById("max").value = findMax(array);
		document.getElementById("mean").value = calcMean(array);
		document.getElementById("med").value = calcMedian(array);
		document.getElementById("min").value = findMin(array);
		document.getElementById("mode").value = calcMode(array);
		document.getElementById("stdDev").value = calcStdDev(array);
		document.getElementById("sum").value = calcSum(array);
		document.getElementById("vary").value = calcVariance(array);
	}
}
