// RangeIterator.js
class RangeIterator {
	constructor(start, stop) {
		this.val = start;
		this.stop = stop;
	}

	[Symbol.iterator]() { return this; }

	next() {
		if(this.val++ < this.stop)
			return {value: this.val, done: false};
		else
			return {value: undefined, done: true};
	}
}

function range(start, stop) {
	return new RangeIterator(start, stop);
}

for(var val of range(0, 3)) 
	alert(val);