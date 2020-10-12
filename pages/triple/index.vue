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
					<view class="icon-btn" @click="getText">
						<image src="../../static/icon/huanyihuan.png"></image>换一篇
					</view>
				</view>
				<view class="primary-btn" @click="getResult">
					一键解析
				</view>
			</view>
		</view>

		<view class="sub" v-if="relationships.length > 0">
			<view class="sub-title">
				解析结果
			</view>
			<view class="result">
				<view class="title">
					<view class="tag subject">
					</view>
					<view class="text">
						常识主体
					</view>
					<view class="tag object">
					</view>
					<view class="text">
						常识客体
					</view>
					<view class="tag relation">
					</view>
					<view class="text">
						关联
					</view>
				</view>
				<view class="relationship" v-for="(item,index) in relationships" :key='index'>
					<view class="sub-node node">
						{{item.subject}}
					</view>
					<view class="line">
					</view>
					<view class="rel-node node">
						{{item.predicate}}
					</view>
					<view class="line">
					</view>
					<view class="obj-node node">
						{{item.object}}
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
				isExpend: false,
				showExpand: false,
				relationships: [],
				textList: [
					'史蒂夫·乔布斯，1955年2月24日，史蒂夫·乔布斯出生在美国旧金山，1976年乔布斯和朋友斯蒂夫·盖瑞·沃兹尼亚克成立苹果电脑公司，1985年在苹果高层权力斗争中离开苹果并成立了NeXT公司，1997年回到苹果接任行政总裁，2011年8月24日辞去苹果公司行政总裁职位',
					'爱德华·尼科·埃尔南迪斯（1986-），是一位身高只有70公分哥伦比亚男子，体重10公斤，只比随身行李高一些，2010年获吉尼斯世界纪录正式认证，成为全球当今最矮的成年男人',
					'《逐风行》是百度文学旗下纵横中文网签约作家清水秋风创作的一部东方玄幻小说，小说已于2014-04-28正式发布',
					'身为戏中的大boss张丰毅的生活备受关注，1991年，在儿子张博宇两岁时，张丰毅结束了与前妻吕丽萍维持了3年的婚姻生活'
				],
				index: -1
			}
		},
		computed: {
			text() {
				return this.textList[this.index];
			}
		},
		methods: {
			onLoad() {
				this.getText();
			},
			getText() {
				this.index = this.index > 2 ? 0 : this.index + 1;
				setTimeout(this.toShowExpand, 100);
				this.relationships = [];
			},
			toShowExpand() {
				uni.createSelectorQuery().select(".statement").boundingClientRect((res) => {
					this.showExpand = res.height > 170
				}).exec()
			},
			getResult() {
				this.$u.api.allInterface({
					"url": "http://t-kg-api.aegis-info.com/v1/api/kg/text",
					"method": "post",
					"params": {
						text: this.text
					}
				}).then(res => {
					this.relationships = res.data.spo_list;
				})
			}
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
					height: 340upx;
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

				.title {
					display: flex;
					padding: 32upx 35upx;

					.tag {
						width: 32upx;
						height: 24upx;
						border-radius: 4upx;
						margin-right: 8upx;
					}

					.subject {
						background: #2F7EF9;
					}

					.object {
						background: #F9A62F;
					}

					.relation {
						background: #2F45F9;
					}

					.text {
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #1A1E30;
						line-height: 33upx;
						margin-right: 48upx;
					}
				}

				.relationship {
					display: flex;
					align-items: center;
					padding: 32upx 71upx;

					.node {
						font-size: 24upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 33upx;
						display: flex;
						justify-content: center;
						text-align: center;
						align-items: center;
						flex-wrap: wrap;
						padding: 0 8upx;
						word-break: break-all;
					}

					.sub-node {
						width: 140upx;
						height: 140upx;
						background: #2F7EF9;
						border-radius: 50%;
					}

					.line {
						height: 0;
						width: 80upx;
						border-top: 2upx dotted #C2DAFF;
					}

					.rel-node {
						width: 80upx;
						height: 80upx;
						background: #2F45F9;
						border-radius: 50%;
					}

					.obj-node {
						width: 140upx;
						height: 140upx;
						background: #F9A62F;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
