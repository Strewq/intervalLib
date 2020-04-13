export class Interval<T extends number | bigint> {
	static isEmpty<T extends number | bigint>(min: T, max: T, includeMin: boolean, includeMax: boolean) {
		if(min == max && (!includeMin || !includeMax)) {
			return true;
		}
		else {
			return false;
		}
	}

	static isReverseOrder<T extends number | bigint>(min: T, max: T) {
		if(min > max) {
			return true;
		}
		else {
			return false;
		}
	}

	private static _processEmpty() {
		throw new RangeError("Can't construct empty interval");
	}

	private _min: T;
	private _max: T;
	private _includeMin: boolean;
	private _includeMax: boolean;

	get min() {
		return this._min;
	}
	set min(newMin) {
		if(Interval.isEmpty(newMin, this._max, this._includeMin, this._includeMax)) {
			Interval._processEmpty();
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
			Interval._processEmpty();
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
			Interval._processEmpty();
		}

		this._includeMin = newIncludeMin;
	}

	get includeMax() {
		return this._includeMax;
	}
	set includeMax(newIncludeMax) {
		if(Interval.isEmpty(this._min, this._max, this._includeMin, newIncludeMax)) {
			Interval._processEmpty();
		}

		this._includeMax = newIncludeMax;
	}
	
	constructor(min: T, max: T, includeMin: boolean = true, includeMax: boolean = true) {
		if(Interval.isEmpty(min, max, includeMin, includeMax)) {
			Interval._processEmpty();
		}

		if(Interval.isReverseOrder(min, max)) {
			[min, max] = [max, min];
		}
		
		this._min = min;
		this._max = max;
		this._includeMin = includeMin;
		this._includeMax = includeMax;
	}
}

export function inInterval<T extends number | bigint>(num: T, interval: Interval<T>) {
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

export function limitNum<T extends number | bigint>(num: T, interval: Interval<T>) {
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

export function closeNum<T extends number | bigint>(num: T, interval: Interval<T>) {
	if(interval.min == interval.max) {
		if((!interval.includeMin && !interval.includeMax)) {
			return null;
		}
		
		return interval.min;
	}
	
	let length: T = interval.max - interval.min as T;
	let result: T;
	
	let temp: T;
	if(num < interval.min) {
		temp = (interval.min - num) % length as T;
		if(temp == 0) {
			result = interval.min;
		}
		else {
			result = interval.max - temp as T;
		}
	}
	else if(num > interval.max) {
		temp = (num - interval.max) % length as T;
		if(temp == 0) {
			result = interval.max;
		}
		else {
			result = interval.min + (temp as any);
		}
	}
	else {
		result = num;
	}
	
	if((result == interval.min || result == interval.max) && (!interval.includeMin && !interval.includeMax)) {
		return null;
	}
	else if(result == interval.min && !interval.includeMin) {
		result = interval.max;
	}
	else if(result == interval.max && !interval.includeMax) {
		result = interval.min;
	}
	
	return result;
}