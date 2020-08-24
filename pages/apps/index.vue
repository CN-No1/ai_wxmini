<template>
	<view class="index-page">
		<image src="../../static/banner/banner.png" class="banner"></image>
		<view class="apps-list">
			<view class="title">
				热门应用
			</view>
			<view class="apps-wrapper">
				<view class="app-item" v-for="(item, index) in appList" :key="index">
					<image :src="item.img" class="app-icon"></image>
					<view class="app-name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appList: [{
					img: '../../static/icon/交互式智能合同审查.png',
					name: '交互式智能合同审查'
				}, {
					img: '../../static/icon/司法摘要.png',
					name: '司法摘要'
				}, {
					img: '../../static/icon/智慧法考.png',
					name: '智慧法考'
				}, {
					img: '../../static/icon/法考阅卷.png',
					name: '法考阅卷'
				}, {
					img: '../../static/icon/智能规则引擎.png',
					name: '智能规则引擎'
				}, {
					img: '../../static/icon/刑事量刑智能预测.png',
					name: '刑事量刑智能预测'
				}, {
					img: '../../static/icon/法条检索.png',
					name: '法条检索'
				}, {
					img: '../../static/icon/案例检索.png',
					name: '案例检索'
				}]
			}
		},
		computed: {

		},
		methods: {

			onLoad() {

			}
		}
	}
</script>

<style lang="less">
	.index-page {
		.banner {
			width: 750upx;
			height: 300upx;
		}

		.apps-list {
			min-height: 982upx;
			height: 100%;
			padding-bottom: 10px;
			background: rgba(246, 247, 250, 1);

			.title {
				padding: 46upx 0 0 40upx;
				font-size: 36upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: rgba(26, 30, 48, 1);
				line-height: 50upx;
			}

			.apps-wrapper {
				display: flex;
				padding-top: 24upx;
				flex-wrap: wrap;
				padding-left: 30upx;

				.app-item {
					width: 330upx;
					height: 180upx;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
					border-radius: 8upx;
					padding: 45upx 52upx 50upx 24upx;
					display: flex;
					margin-bottom: 24upx;
					align-items: center;

					&:nth-child(2n-1) {
						margin-right: 30upx;
					}

					.app-icon {
						width: 90upx;
						height: 90upx;
						margin-right: 24upx;
					}

					.app-name {
						flex: 1;
						font-family: PingFangSC-Medium, PingFang SC;
						font-size: 28upx;
						font-weight: 700;
						color: rgba(26, 30, 48, 1);
						line-height: 40upx;
					}
				}
			}
		}

	}
</style>
