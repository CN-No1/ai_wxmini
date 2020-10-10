<template>
	<view class="mark-paper">
		<view class="sub">
			<view class="sub-title">
				在线体验
			</view>
			<view class="sub-content">
				<view class="exp" :class="isExpend ? 'expendClass' : 'commonClass'">
					<span class="text statement">
						{{ text }}
					</span>
				</view>
				<view v-if="showExpand" :key='showExpand'>
					<view class="expand" @click="isExpend = true" v-if="!isExpend">
						展开全文
					</view>
					<view class="expand" @click="isExpend = false" v-else>
						收起全文
					</view>
				</view>
				<view class="change">
					<view class="icon-btn" @click="getQuestion">
						<image src="../../static/icon/huanyihuan.png"></image>换一题
					</view>
				</view>
				<view class="primary-btn" @click="getResult">
					一键解析
				</view>
			</view>
		</view>

		<view class="sub">
			<view class="sub-title">
				解析结果
			</view>
			<view class="result">
				<view class="row header">
					法律法条占比
				</view>
				<view class="row tr">
					<view class="tr-item">
						50%
					</view>
					<u-line-progress active-color="#31BD99" :percent="70" style="width:100%"></u-line-progress>
				</view>
			</view>
			<view class="result">
				<view class="row header">
					法条依据
				</view>
<!-- 				<view class="row tr" v-for="(item,index) in result" :key="index">
					<view class="tr-item">{{item.score}}分</view>
					<view class="tr-item">{{item.text}}</view>
				</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isExpend: false,
				showExpand: false,
				text: ''
			}
		},
		methods: {
			onLoad() {},
			toShowExpand() {
				uni.createSelectorQuery().select(".statement").boundingClientRect((res) => {
					this.showExpand = res.height > 320
				}).exec()
			},
		}
	}
</script>

<style lang='less' scoped>
	.mark-paper {
		min-height: 1460upx;
		background: rgba(246, 247, 250, 1);
		padding-bottom: 66upx;
		padding-top: 44upx;

		.intro {
			padding: 40upx 48upx 85upx 55upx;
			margin-bottom: 40upx;
			background-image: url(../../static/bg/bg.png);

			.title {
				font-size: 42upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				color: rgba(26, 30, 48, 1);
				line-height: 59upx;
				margin-bottom: 32upx;
			}

			.text {
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				color: rgba(136, 145, 185, 1);
				line-height: 48upx;
			}
		}

		.sub {
			padding: 0 30upx;
			margin-bottom: 64upx;

			.sub-title {
				font-size: 32upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				color: rgba(26, 30, 48, 1);
				line-height: 45upx;
				margin: 0 0 16upx 16upx;
			}

			.sub-content {
				padding: 32upx 35upx 48upx 35upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
				border-radius: 8upx;
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				line-height: 56upx;

				.exp {
					overflow: hidden;
					margin-bottom: 40upx;

					.tag {
						color: #2F7EF9;
					}
				}

				.expendClass {
					height: 100%;
				}

				.commonClass {
					height: 640upx;
				}

				.expand {
					text-align: center;
					font-size: 24upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					color: rgba(47, 126, 249, 1);
					line-height: 33upx;
					margin-bottom: 40upx;
				}

				.change {
					display: flex;
					justify-content: flex-end;

					.icon-btn {
						display: flex;
						justify-content: flex-end;
						align-items: center;
						width: 128upx;

						image {
							height: 24upx;
							width: 24upx;
							margin-right: 16upx;
						}
					}
				}

				.primary-btn {
					width: 280upx;
					height: 72upx;
					background: rgba(47, 126, 249, 1);
					border-radius: 8upx;
					font-size: 32upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 45upx;
					padding: 14upx 73upx;
					margin: 40upx 0 0 170upx;
				}

			}

			.result {
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
				border-radius: 8upx;
				margin-bottom: 40upx;

				.row {
					width: 690upx;
					padding: 20upx 48upx;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					line-height: 40upx;

					span:first-child {
						margin-right: 80upx;
					}
				}

				.header {
					background: rgba(47, 126, 249, 0.15);
					border-radius: 8upx 8upx 0upx 0upx;
					color: #2F7EF9;
				}

				.tr {
					display: flex;
					color: #31BD99;
					padding: 32upx 35upx;

					.tr-item:first-child {
						width: 133rpx;
					}

					.tr-item:not(:first-child) {
						flex: 1;
					}

					&:nth-child(2n-1) {
						background: rgba(246, 247, 250, 0.79);
					}
				}
			}
		}
	}
</style>
