let hoursPerClass = 2700; // 2700 hours per class
let classRoomQuantity = 1; // 1 classroom
let costPerTube = 7; // Cost per tube in USD
let tubesPerUnits = 4; // Number of units in the classroom
let unitsPerClassroom = 4; // Number of units in the classroom

// function to get a random number between 100 and 200
function rand() {
	return Math.floor(Math.random() * (200 - 100 + 1) + 100);
}

// function to generate tubes for the units in the classroom
function generateTubes(quantity, isNew, oldTubes = [], tubesBroken = []) {
	let tubesNew = [];

	if (isNew) {
		tubesNew = Array.from({ length: quantity }, () => rand());
	} else {
		tubesNew = oldTubes.map((tube) => {
			if (tubesBroken.includes(tube)) {
				return rand();
			}
			return tube;
		});
	}

	return tubesNew;
}

// function to calculate the number of broken tubes in a year
function calculateBrokenTubes() {
	let brokenTubes = 0;
	let tubes;
	let tubesCopy;

	function copyTubes(tubes) {
		tubesCopy = tubes.slice();
	}

	// loop through the units in the classroom
	for (let unit = 1; unit <= unitsPerClassroom; unit++) {
		tubes = generateTubes(tubesPerUnits, true); // Generate tubes for the unit
		let tubesBroken = []; // Array to store the tubes that are broken
		copyTubes(tubes); // Copy the tubes array to keep track of the tubes that are broken

		// Loop through the hours of the class
		for (let hour = 0; hour < hoursPerClass; hour++) {
			let brokenFlag = 0;

			// Reduce the life of each tube
			for (let i = 0; i < tubesPerUnits; i++) {
				tubes[i]--;
				if (tubes[i] <= 0) {
					brokenFlag++;
					tubesBroken.push(tubesCopy[i]); // Add the broken tube to the array of broken tubes to replace them later
				}
			}

			// Check if the unit has 2 or more broken tubes
			if (brokenFlag >= 2) {
				brokenTubes += 2;
				tubes = generateTubes(tubesPerUnits, true); // Generate new tubes for the unit
				copyTubes(tubes); // Copy the tubes array to keep track of the tubes that are broken
			} else if (brokenFlag == 1) {
				brokenTubes += 1;
				tubes = generateTubes(1, false, tubesCopy, tubesBroken); // Generate new tubes for the unit
				copyTubes(tubes); // Copy the tubes array to keep track of the tubes that are broken
			}
		}
	}

	return brokenTubes;
}

// calculate the number of broken tubes
let countBrokenTubes = calculateBrokenTubes();

// function to calculate the cost of the tubes in a year
function tubesCost() {
	return countBrokenTubes * costPerTube;
}

// calculate the cost of the tubes per year
let costPerYear = tubesCost();

// print the results
console.log(
	`1. How many fluorescent tubes were broken in 1 year in that classroom? ${countBrokenTubes}`
);
console.log(
	`2. How much money do fluorescent tubes cost the University per year per classroom? ${costPerYear}.00 $`
);
