export default class Websocket {
	constructor({
		heartCheck,
		isReconnection,
		uId,
		eventId,
		source
	}) {
		// 是否连接
		this._isLogin = false;
		// 当前网络状态
		this._netWork = true;
		// 是否人为退出
		this._isClosed = false;
		// 心跳检测频率
		this._timeout = 3000;
		this._timeoutObj = null;
		// 当前重连次数
		this._connectNum = 0;
		// 心跳检测和断线重连开关，true为启用，false为关闭
		this._heartCheck = heartCheck;
		this._isReconnection = isReconnection;
		this._uId = uId;
		this._eventId = eventId;
		this._source = source;
		this._onSocketOpened();
		this.wsUrl = 'wss://t-xiaofa-lawyer.aegis-info.com/mall-websockets/ws'
	};
	// 心跳重置
	_reset() {
		clearTimeout(this._timeoutObj);
		return this;
	}
	// 心跳开始
	_start() {
		let _this = this;

		this._timeoutObj = setInterval(() => {
			// 心跳发送的监测消息
			uni.sendSocketMessage({
				data: JSON.stringify({
					'sendId': this._uId,
					'code': 0,
					'role': 'xiaofa_user'
				}),
				success(res) {
					console.log('发送心跳成功：', res);
				},
				fail(err) {
					console.log('发送心跳失败：', err);
					this._reset();
				}
			});
		}, this._timeout);
	}
	// 监听websocket 连接关闭
	onSocketClosed(options) {
		uni.onSocketClose((err) => {
			console.log('当前websocket连接已关闭,错误信息为:' + JSON.stringify(err));
			// 停止心跳连接
			if (this._heartCheck) {
				this._reset();
			}
			// 关闭已登录开关
			this._isLogin = false;
			// 检测是否是用户自己退出小程序
			if (!this._isClosed) {
				// 进行重连
				if (this._isReconnection) {
					this._reConnect(options)
				}
			}
		})
	}
	// 检测网络变化
	onNetworkChange(options) {
		uni.onNetworkStatusChange(res => {
			console.log('当前网络状态:' + res.isConnected);
			if (!this._netWork) {
				this._isLogin = false;
				// 进行重连
				if (this._isReconnection) {
					this._reConnect(options)
				}
			}
		})
	}
	// 打开websocket连接
	_onSocketOpened(callBack) {
		wx.onSocketOpen(res => {
			console.log('websocket已打开');
			// 打开已登录开关
			this._isLogin = true;
			// 发送心跳
			if (this._heartCheck) {
				this._reset()._start();
			}
			// 发送登录信息
			wx.sendSocketMessage({
				// 这里是第一次建立连接所发送的信息，应由前后端商量后决定
				data: JSON.stringify({
					'code': 1,
					'role': 'xiaofa_user',
					'sendId': this._uId,
					'unitId': this._eventId,
					'source': this._source
				})
			})
			// 打开网络开关
			this._netWork = true;
			if (typeof callBack == "function") {
				callBack(res)
			}
		})
	}
	// 接收服务器返回的消息
	onReceivedMsg(callBack) {
		wx.onSocketMessage(msg => {
			if (typeof callBack == "function") {
				callBack(msg)
			} else {
				console.log('参数的类型必须为函数')
			}
		})
	}
	// 建立websocket连接
	initWebSocket(options) {
		let _this = this;
		this.wsUrl = options.url ? options.url : this.wsUrl
		if (this._isLogin) {
			console.log("您已经登录了");
		} else {
			// 检查网络
			wx.getNetworkType({
				success(result) {
					if (result.networkType !== 'none') {
						console.log(typeof options.success)
						// 开始建立连接
						wx.connectSocket({
							url: _this.wsUrl,
							success(res) {
								if (typeof options.success == 'function') {
									options.success(res)
								} else {
									console.log('参数的类型必须为函数1')
								}
							},
							fail(err) {
								if (typeof options.fail == 'function') {
									options.fail(err)
								} else {
									console.log('参数的类型必须为函数2')
								}
							}
						})
					} else {
						console.log('网络已断开');
						_this._netWork = false;
					}
				}
			})
		}
	}
	// 发送websocket消息
	sendWebSocketMsg(options) {
		// console.log("send参数：", options)
		wx.sendSocketMessage({
			data: options.data,
			success(res) {
				if (options.success && typeof options.success == "function") {
					options.success(res)
				}
			},
			fail(err) {
				if (options.fail && typeof options.fail == "function") {
					options.fail(err)
				}
			}
		})
	}
	// 重连方法，会根据时间频率越来越慢
	_reConnect(options) {
		let timer, _this = this;
		if (this._connectNum < 3) {
			timer = setTimeout(() => {
				this.initWebSocket(options)
			}, 3000)
			this._connectNum += 1;
		} else if (this._connectNum < 10) {
			timer = setTimeout(() => {
				this.initWebSocket(options)
			}, 10000)
			this._connectNum += 1;
		} else {
			timer = setTimeout(() => {
				this.initWebSocket(options)
			}, 450000)
			this._connectNum += 1;
		}
	}
	// 关闭websocket连接
	closeWebSocket() {
		wx.closeSocket();
		this._isClosed = true;
	}
}
