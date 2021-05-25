
// ?公用类


const utils = {

	/* 
	TODO:  将毫秒设置为yy-dd-mm等格式。
	*/
	formatDate(date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
			}
		}
		return fmt;
	},

	padLeftZero(str) {
		return ('00' + str).substr(str.length);
	},


	// 将日期转换为年月日
	format(inputTime) {
		var date = new Date(inputTime)
		var y = date.getFullYear()
		var m = date.getMonth() + 1
		m = m < 10 ? ('0' + m) : m
		var d = date.getDate()
		d = d < 10 ? ('0' + d) : d
		var h = date.getHours()
		h = h < 10 ? ('0' + h) : h
		var minute = date.getMinutes()
		var second = date.getSeconds()
		minute = minute < 10 ? ('0' + minute) : minute
		second = second < 10 ? ('0' + second) : second
		return y + '-' + m + '-' + d + ' ' + ' '



	}

}

export default utils
