<template>
	<div class="news-detail">
		<div class="header">
			<div class="title u-border-bottom"><text class="hot" v-show="newsInfo.isHot">热门</text>{{newsInfo.title}}</div>
			<div class="desc">
				<div class="source">信息来源：{{newsInfo.webName || newsInfo.author}}<text class="time">{{newsInfo.postTime}}</text></div>
			</div>
		</div>
		<div class="summary">
			<view v-for="(item, index) in newsInfo.summaryArr" :key="index" class="news-item">{{item}}</view>
		</div>
		<div class="note-info">
			本信息源于【{{newsInfo.webName || newsInfo.author}}】，如侵犯了原作者的版权，请及时联系告知，本站将立即删除。
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				newsInfo: null
			}
		},
		async onLoad(opt) {
			const res = await this.$u.api.getHotPointDetails({
				id: opt.id
			});
			const {summary, postTime} = res.data.info;
			this.newsInfo = { ...res.data.info,
				postTime: this.$u.utils.calculateTime(postTime),
				summaryArr: summary.split(/\n/g),
				isHot: opt.isHot === 0
			};
			console.log(this.newsInfo)
		},
		onShow(opt) {}
	}
</script>

<style lang="scss">
	.news-detail {
		.header {
			padding: 24upx 32upx;
			box-sizing: border-box;

			.title {
				font-size: 36upx;
				color: #113260;
				box-sizing: border-box;
				padding-bottom: 24upx;
				line-height: 60upx;
				box-sizing: border-box;
				.hot {
					font-size: 22upx;
					color: #FFFFFF;
					background-color: #FF4049;
					border-radius:4px;
					width:52upx;
					height:30upx;
					text-align: center;
					display: inline-block;
					line-height: 34upx;
					margin-right: 16upx;
				}
			}

			.desc {
				box-sizing: border-box;
				padding-top: 33upx;
				font-size: 28upx;
				color: #65799B;
				font-weight: Regular;

				.time {
					margin-left: 40upx;
				}
			}
		}

		.summary {
			padding: 4upx 48upx 35upx 48upx;
			box-sizing: border-box;
			font-size: 32upx;
			color: #162231;
			line-height: 56upx;
			text-align: justify;
			.news-item {
				margin-bottom: 24upx;
			}
		}

		.note-info {
			padding: 0 48upx 35upx 48upx;
			box-sizing: border-box;
			color: rgb(254, 113, 37);
			font-size: 24upx;
			text-align: justify;
			line-height: 38upx;
		}
	}
</style>
