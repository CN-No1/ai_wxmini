<template>
	<view class="code-page">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 +{{hidePhone}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			<view class="captcha">
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxlength: 6,
				value: '',
				second: 60,
				show: false,
				error: false,
				phone: '',
				redirctUrl: ''
			};
		},
		computed: {
			hidePhone() {
				return this.phone.substring(0, 3) + ' **** ' + this.phone.substring(7, 11)
			}
		},
		onLoad(opt) {
			this.phone = opt.phone;
			this.redirctUrl = opt.redirct;
			let interval = setInterval(() => {
				this.second--;
				if (this.second <= 0) {
					this.show = true;
					if (this.value.lenth != 4) {
						this.error = true;
					}
					clearInterval(interval);
				}
			}, 1000);
		},
		methods: {
			/**
			 * change事件侦听
			 * @param {Object} value
			 */
			change(value) {
				console.log('change', value);
			},
			/**
			 * 输入完验证码最后一位执行
			 * @param {Object} value
			 */
			finish(value) {
				this.$u.api.login({
					telephone: parseInt(this.phone),
					authCode: value
				}).then((res) => {
					const {
						data
					} = res;
					getApp().globalData.userId = this.phone;
					uni.setStorageSync('user-info', {
						token: `${data.tokenHead} ${data.token.token}`,
						phone: data.name,
						id: data.id
					});
					const __url = this.$u.test.isEmpty(this.redirctUrl) ? 'pages/index/index' : this.redirctUrl;
					this.$u.route({
						type: 'redirectTo',
						url: __url,
						params: {
							phone: this.phoneVal
						}
					})
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.code-page {
		padding: 80rpx 40upx;
	}

	.box {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: 555;
	}

	.key-input {
		padding: 30rpx 0;

		text {
			display: none;
		}

		.error {
			display: block;
			color: red;
			font-size: 30rpx;
			margin: 20rpx 0;
			padding: 0 40upx;
		}
	}

	.title {
		font-size: 50rpx;
		color: #333;
		padding: 0 40upx;
	}

	.tips {
		padding: 0 40upx;
	}

	.key-input .tips {
		font-size: 30rpx;
		color: #333;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}

	.captcha {
		color: $u-type-warning;
		padding: 0 40upx;
		font-size: 30rpx;
		margin-top: 40rpx;

		.regain {
			display: block;
		}
	}
</style>
