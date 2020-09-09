<template>
	<view class="news">
		<image src="../../static/banner/banner3.png" class="banner"></image>
		<view class="news-list">
			<!-- 			<view class="news-item" v-for="(item, index) in newsList" :key="index" @click="goDetail(item.url)">
				<view class="img">

				</view>
				<view class="title u-line-3">
					{{item.title}}
				</view>
			</view> -->
		</view>
		<view class="none">
			<image class="none-img" src="../../static/bg/planning.png"></image>
			<view class="none-text">
				即将上线
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [{
					title: '【擎盾AI】律师福利来啦！律师行业将开启智慧化升级！',
					img: '',
					url: 'https://mp.weixin.qq.com/s?__biz=MzU0MDU3NzIzNQ==&mid=2247484413&idx=1&sn=4ae875205e89418173fc27b0d1bea69b&chksm=fb365f41cc41d65713d80282fd790d948970180445bb6ac3155b4139ea5fa44ab25f7682308f&xtrack=1&scene=90&subscene=93&sessionid=1598496022&clicktime=1598496025&enterid=1598496025&ascene=56&devicetype=android-28&version=3.0.27.2701&nettype=WIFI&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&exportkey=AZBFBAZ6JIgo9KToT2rNwgk%3D&pass_ticket=vK6BiASHb%2FvLnuMCcA0JeleSDkibhjhpEN66GquW0xlYHIhCygaOjU%2BeAZwemp%2Bg&wx_header=1&st=81C4DEF1191558FE2A9ED7E8C9B9F7925E76C10DFF49570DA94384C5EC6BD632BD4515823A3B613CD6ED2FC03E161D10E9627C98473350BD06DE3627806FDAA6D6CA1524DEBB4E5627E68577FDF0ED2F374ED944FE8E7A5563467580332662CE555D39B8510DD0E032F7812D046BA5EB62D5C40B81B37B426342A77AFBF9B00CDA601B8969DD75D176C0D6642F4055CC&vid=1688852492617132&cst=7901B56E8EBCC8681F6535A920C7DFFABBC2965CFD3647C9E8B49C184C65AF6D8F6CDF2191A952935F91C66081269176&deviceid=5d48998d-5606-47cf-b384-e17d92530ad2&platform=win'
				}]
			};
		},
		methods: {
			goDetail(urls) {
				this.$u.route({
					url: 'pages/newurl/index',
					params: {
						url: urls
					}
				});
			}
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
			// min-height: 1460upx;
			background: rgba(246, 247, 250, 1);
			height: 100%;
			// padding-left: 30upx;
			// padding-top: 28upx;

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

		.none {
			text-align: center;

			.none-img {
				width: 480upx;
				height: 360upx;
			}

			.none-text {
				font-size: 34upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 700;
				color: #9AB0D0;
				line-height: 48upx;
			}
		}

	}
</style>
