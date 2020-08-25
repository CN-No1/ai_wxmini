<template>
	<view class="exam">
		<view class="intro">
			<view class="title">
				智慧法考应用简介
			</view>
			<view class="text">
				智能法考是针对司法考试客观题的自动答题机器人，基于司法考试教材、试题等材料训练产生智能答题模型，可以理解试题从多个选项中的选出正确答案。 </view>
		</view>
		<view class="sub">
			<view class="sub-title">
				在线体验
			</view>
			<view class="sub-content">
				<span class="tag">
					【单选题】
				</span>
				<span class="text">
					某镇政府未经通知薛某，强行将薛某的果园铲平。薛某向法院提起行政赔偿诉讼。在法院主持调解时，镇政府为达成调解协议，承认其铲平薛某的果园是不合法的。薛某遂要求镇政府给予加倍赔偿，镇政府不同意。薛某在其后的诉讼中，向法院提供了镇政府在调解过程中承认其行为违法的证据。
					对该证据，法院应当如何处理？
				</span>
				<view class="options">
					<view class="option-item">
						A. 法院可以根据镇政府的承认径行宣告镇政府的行为违法
					</view>
					<view class="option-item">
						B. 法院不得采纳该证据
					</view>
					<view class="option-item">
						C. 法院可以采纳该证据，但应当同时参照其他证据进行综合认定
					</view>
					<view class="option-item">
						D. 法院可以要求当事人对该证据进行质证，并根据质证结果决定是否采纳
					</view>
				</view>
				<view class="change">
					<view class="icon-btn">
						<image src="../../static/icon/huanyihuan.png"></image>换一题
					</view>
				</view>
				<view class="primary-btn">
					一键解析
				</view>
			</view>
		</view>
		<view class="sub">
			<view class="sub-title">
				解析结果
			</view>

			<view class="result-wrapper">
				<view class="result-item" v-for="(item,index) in result" :key='index' :class="item.isCorrect?'isCorrect':''">
					<view class="text">
						{{item.text}}
					</view>
					<view class="rate">
						置信度：{{item.rate}}
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
				result: [{
					text: 'A. 法院可以根据镇政府的承认径行宣告镇政府的行为违法',
					rate: '41.27%',
					isCorrect: true
				}, {
					text: 'B. 法院不得采纳该证据',
					rate: '41.27%',
					isCorrect: false
				}, {
					text: 'C. 法院可以采纳该证据，但应当同时参照其他证据进行综合认定',
					rate: '41.27%',
					isCorrect: true
				}, {
					text: 'D. 法院可以要求当事人对该证据进行质证，并根据质证结果决定是否采纳',
					rate: '41.27%',
					isCorrect: false
				}]
			}
		}
	}
</script>

<style lang="less" scoped>
	.exam {
		background: rgba(246, 247, 250, 1);
		padding-bottom: 66upx;

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


				.tag {
					color: #2F7EF9;
				}

				.options {
					margin-top: 40upx;

					.option-item {
						padding: 16upx 0;

						&:not(:last-child) {
							border-bottom: 1upx solid rgba(231, 231, 231, 1);
						}
					}
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

			.result-wrapper {
				padding: 32upx 0 48upx 0;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
				border-radius: 8upx;
				font-size: 28upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				line-height: 56upx;

				.result-item {
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					line-height: 56upx;
					padding: 16upx 35upx;

					&:not(:last-child) {
						border-bottom: 1upx solid rgba(231, 231, 231, 1);
					}

					&:first-child {
						padding-top: 0;
					}

					.text {
						color: rgba(26, 30, 48, 1);
					}

					.rate {
						color: rgba(254, 98, 95, 1);
					}
				}

				.isCorrect {

					.text,
					.rate {
						color: #FFFFFF !important;
					}

					background: linear-gradient(90deg, rgba(66, 210, 173, 1) 0%, rgba(48, 188, 152, 1) 100%);

					&::after {
						content: '';
						position: relative;
						float: right;
						top: -116upx;
						display: block;
						height: 133upx;
						width: 145upx;
						background-image: url(../../static/icon/correct.png);
						background-size: 145upx 133upx;
					}
				}
			}
		}
	}
</style>
