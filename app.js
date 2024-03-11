let hoursPerClass = 2700; // 2700 hours per class
let classRoomQuantity = 1; // 1 classroom
let costPerTube = 7; // Cost per tube in USD
let tubesPerUnits = 4; // Number of units in the classroom
let unitsPerClassroom = 4; // Number of units in the classroom

const averageHoursPerTubePerYear = Math.round(
	hoursPerClass / (tubesPerUnits * unitsPerClassroom)
); // 2700 hours / 16 tubes = 169 hours per tube per year in average

// function to get a random number between 100 and 200
function rand() {
	return Math.floor(Math.random() * (200 - 100 + 1) + 100);
}

// function to calculate the number of broken tubes in a year
function calculateBrokenTubes() {
	let brokenTubes = 0;
	for (let i = 0; i < classRoomQuantity; i++) {
		// loop through the 4 units
		for (let j = 0; j < unitsPerClassroom; j++) {
			// get the number of hours for each tube
			let tubes = Array.from({ length: tubesPerUnits }, () => rand());
			// filter the tubes that are broken
			let broken = tubes.filter(
				(tube) => tube < averageHoursPerTubePerYear
			);

			if (broken.length >= 2) {
				brokenTubes += 4;
			} else {
				brokenTubes += 1;
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
