//class to represent a tube
class Tube {
	constructor() {
		this.usedHours = rand();
	}

	isBroken() {
		return this.usedHours < 0;
	}
}

// class to represent a tube unit
class TubeUnit {
	constructor() {
		this.brokenTubesCount = 0;
		this.replacedTubesCount = 0;
		this.tubes = [new Tube(), new Tube(), new Tube(), new Tube()];
	}

	initTubes() {
		this.tubes = [new Tube(), new Tube(), new Tube(), new Tube()];
		this.replacedTubesCount++;
	}

	needsMaintenance() {
		return this.tubes.filter((tube) => tube.isBroken()).length >= 2;
	}
}

// function to get a random number between 100 and 200
function rand() {
	return Math.floor(Math.random() * (200 - 100 + 1) + 100);
}

// create 4 tube units
let tubeUnits = [
	new TubeUnit(),
	new TubeUnit(),
	new TubeUnit(),
	new TubeUnit(),
];

// loop through 2700 hours
for (let hour = 1; hour <= 2700; hour++) {
	for (let tubeUnit of tubeUnits) {
		for (let tube of tubeUnit.tubes) {
			tube.usedHours--;
			if (tube.usedHours === 0) {
				tubeUnit.brokenTubesCount++;
				if (tubeUnit.needsMaintenance()) {
					tubeUnit.initTubes();
				}
			}
		}
	}
}

// count the total broken tubes
let totalBrokenTubesCount = tubeUnits.reduce(
	(total, tubeUnit) => total + tubeUnit.brokenTubesCount,
	0
);

// calculate the total cost
let totalCost = totalBrokenTubesCount * 7;

//print the results
console.log(`Total broken tubes: ${totalBrokenTubesCount}`);
console.log(`Total cost: ${totalCost} $`);
