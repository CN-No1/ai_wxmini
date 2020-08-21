

const install = (Vue, vm) => {
	const calculateTime = (val = '') => {
		let stime = val;
		let etime = new Date();
		// 两个时间戳相差的毫秒数
		let usedTime = etime - stime;
		// 计算相差的天数
		let days = Math.floor(usedTime / (24 * 3600 * 1000));
		// 计算天数后剩余的毫秒数
		let leave1 = usedTime % (24 * 3600 * 1000);
		// 计算出小时数
		let hours = Math.floor(leave1 / (3600 * 1000));
		// 计算小时数后剩余的毫秒数
		let leave2 = leave1 % (3600 * 1000);
		// 计算相差分钟数
		let minutes = Math.floor(leave2 / (60 * 1000));
		let time = '';
		if (days === 0) {
			if (hours === 0) {
				time = minutes + "分钟前";
			} else {
				time = hours + "小时前";
			}
		} else {
			time = days + "天前";
		}
		return time
	}
	vm.$u.utils = {
		calculateTime
	}
}

export default {
	install
}
