# The library for work with intervals

## Install
```
npm install -S github:strewq/intervals
```

## Usage
```
import * as intervalLib from "intervalLib";
```

```
let num = 3;

let interval = new intervalLib.Interval(2, 5, true, true);

let isNumInInterval = intervalLib.inInterval(num, interval);

let limitedNum = intervalLib.limitNum(num, interval);

let closedNum = intervalLib.closeNum(num, interval);
```