
export class Helper {

	static isNumber (data : any, def : number, min ?: number, max ?: number) {
		let val : number = Number.isFinite(+data) ? +data : def;
		if (min) {
			val = val >= min ? val : def;
		}
		if (max) {
			val = val <= max ? val : def;
		}
		return val;
	}
}
