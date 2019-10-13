export class Interval {
	constructor(min, max, includeMin=true, includeMax=true) {
		if(Interval.isEmpty(min, max, includeMin, includeMax)) {
			processEmpty();
		}

		if(Interval.isReverseOrder(min, max)) {
			[min, max] = [max, min];
		}
		
		this._min = min;
		this._max = max;
		this._includeMin = includeMin;
		this._includeMax = includeMax;
	}

	static isEmpty(min, max, includeMin, includeMax) {
		if(min == max && (!includeMin || !includeMax)) {
			return true;
		}
		else {
			return false;
		}
	}

	static processEmpty() {
		throw new RangeError("Can't construct empty interval");
	}

	static isReverseOrder(min, max) {
		if(min > max) {
			return true;
		}
		else {
			return false;
		}
	}

	get min() {
		return this._min;
	}
	set min(newMin) {
		if(Interval.isEmpty(newMin, this._max, this._includeMin, this._includeMax)) {
			processEmpty();
		}

		if(Interval.isReverseOrder(newMin, this._max)) {
			this._max = newMin;
		}
		else {
			this._min = newMin;
		}
	}

	get max() {
		return this._max;
	}
	set max(newMax) {
		if(Interval.isEmpty(this._min, newMax, this._includeMin, this._includeMax)) {
			processEmpty();
		}

		if(Interval.isReverseOrder(this._min, newMax)) {
			this._min = newMax;
		}
		else {
			this._max = newMax;
		}
	}

	get includeMin() {
		return this._includeMin;
	}
	set includeMin(newIncludeMin) {
		if(Interval.isEmpty(this._min, this._max, newIncludeMin, this._includeMax)) {
			processEmpty();
		}

		this._includeMin = newIncludeMin;
	}

	get includeMax() {
		return this._includeMax;
	}
	set includeMax(newIncludeMax) {
		if(Interval.isEmpty(this._min, this._max, this._includeMin, newIncludeMax)) {
			processEmpty();
		}

		this._includeMax = newIncludeMax;
	}
}

export function inInterval(num, interval) {
	if(interval.min < num && num < interval.max) {
		return true;
	}
	else if(num == interval.min && interval.includeMin) {
		return true;
	}
	else if(num == interval.max && interval.includeMax) {
		return true;
	}
	else {
		return false;
	}
}

export function limitNum(num, interval) {
	if(num < interval.min) {
		return interval.min;
	}
	else if(num > interval.max) {
		return interval.max;
	}
	else {
		return num;
	}
}

export function closeNum(num, interval) {
	if(!interval.includeMin && !interval.includeMax) {
		return null;
	}
	if(interval.min == interval.max) {
		return interval.min;
	}
	
	var length = interval.max - interval.min;
	var result;
	
	var temp;
	if(num < interval.min) {
		temp = (interval.min - num) % length;
		if(temp == 0) {
			result = interval.min;
		}
		else {
			result = interval.max - temp;
		}
	}
	else if(num > interval.max) {
		temp = (num - interval.max) % length;
		if(temp == 0) {
			result = interval.max;
		}
		else {
			result = interval.min + temp;
		}
	}
	else {
		result = num;
	}
	
	if(result == interval.min && !interval.includeMin) {
		result = interval.max;
	}
	else if(result == interval.max && !interval.includeMax) {
		result = interval.min;
	}
	
	return result;
}