<template>
	<view class="news">
		<image src="../../static/banner/banner3.png" class="banner"></image>
		<view class="news-list">
			<view class="news-item" v-for="i in 10">
				<view class="img">

				</view>
				<view class="title u-line-3">
					【喜报】擎盾数据机器人荣膺2020年最受用户喜爱的“抗疫机器人”TOP10！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less">
	.news {
		.banner {
			width: 750upx;
			height: 300upx;
		}

		.news-list {
			min-height: 1460upx;
			background: rgba(246, 247, 250, 1);
			height: 100%;
			padding-left: 30upx;
			padding-top: 28upx;

			.news-item {
				width: 690upx;
				height: 244upx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
				border-radius: 8upx;
				padding: 32upx 38upx 32upx 24upx;
				margin-bottom: 24upx;
				display: flex;

				.img {
					width: 240upx;
					height: 180upx;
					background: rgba(224, 224, 224, 1);
					margin-right: 24upx;
				}

				.title {
					flex: 1;
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 700;
					color: rgba(26, 30, 48, 1);
					line-height: 42upx;
					padding-top: 15upx;
				}
			}
		}

	}
</style>
