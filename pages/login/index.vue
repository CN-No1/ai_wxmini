<template>
	<view class="login-page">
		<view class="content">
			<view class="title">小法管家</view>
			<input class="u-border-bottom phone-input" type="number" v-model="phone" placeholder="请输入手机号" />
			<view class="tips">若你是第一次登录，我们会帮你生成一个新账户</view>

			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
				<view class="QQ item" @click="handleQQLogin()">
					<view class="icon">
						<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录即表示你同意
				<text class="link">《隐私协议》</text>
				<text class="link">《免责声明》</text>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				redirctUrl: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.phone && this.$u.test.mobile(this.phoneVal)) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color.primary;
				}
				return style;
			},
			/**
			 * 去掉手机号中的空格
			 */
			phoneVal () {
				return this.phone.replace(/\s/g, '')
			}
		},
		watch: {
			// 手机号格式化为344格式
			phone(newValue, oldValue) {
				this.phone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/,
					'$1 $2 $3') : this.phone.trim();
			}
		},
		methods: {
			/**
			 * 获取验证码
			 */
			submit() {
				if (this.$u.test.mobile(this.phoneVal)) {
					// 调用接口发送短信验证码
					this.$u.api.getCode({telephone: this.phoneVal}).then((res)=>{
						this.$u.route({
							url: 'pages/login/code',
							params: {
								phone: this.phoneVal,
								redirct: this.redirctUrl
							}
						})
					})
				}
			},
			/**
			 * QQ登录
			 */
			handleQQLogin() {
				this.$refs.uTips.show({
					title: '开发中，敬请期待...',
					type: 'info',
					duration: '2300'
				})
			}
		},
		onLoad(opt) {
			console.log('opt:', opt);
			this.redirctUrl = opt.redirct;
		}
	};
</script>

<style lang="scss" scoped>
	.login-page {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
				font-size: 28upx;
			}

			.tips {
				color: #9fb0cd;
				font-size: 24upx;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgba(0, 155, 255, .5);
				color: rgba(255, 255, 255, .5);
				;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 24rpx;
				color: $u-tips-color;

				.link {
					color: $uni-color-primary;
				}
			}
		}
	}
</style>
