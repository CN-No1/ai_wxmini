<template>
	<view class="judicial-summary">
		<view class="intro">
			<view class="title">
				司法摘要应用简介
			</view>
			<view class="text">
				裁判文书是人民法院公开审判活动、裁判理由、裁判依据和裁判结果的重要载体。司法摘要则是对裁判文书的内容进行压缩、归纳和总结，反映案件审理过程中的裁判过程、事实、理由和判决依据等。裁判文书司法摘要对我国法治建设具有现实意义与必要性。
			</view>
		</view>

		<view class="word">
			<view class="doc">
				<image src="../../static/icon/word.png"></image>
				<view class="doc-name">
					某某与李某甲、李某乙等继承纠纷审民事判决书
				</view>
			</view>
			<view class="btns">
				<view class="text">
					在线浏览
				</view>
				<view class="icon-btn">
					<image src="../../static/icon/huanyihuan.png"></image>换一篇
				</view>
			</view>
			<view class="primary-btn">
				一键解析
			</view>
		</view>

		<view class="sub">
			<view class="sub-title">
				解析结果
			</view>
			<view class="sub-content">
				原被告系继承纠纷。原告诉请：扣除原告支付办理丧事费用后继承工资及丧葬费。经查明，原被告系被继承人子女，被继承人去世前留有遗嘱，载明房屋由李某乙继承。依照《中华人民共和国继承法》第十条、第十一条、第十三条，《中华人民共和国民事诉讼法》第一百四十四条之规定，判决如下：一、被告李某乙于本判决发生法律效力之日起三十日内给付李某某、李某甲、李某丙、李某每人现金6599.2元；二、驳回原告其他诉讼请求。
			</view>
		</view>

		<view class="sub">
			<view class="sub-title">
				应用场景
			</view>
			<view class="sub-content">
				<view class="scene">
					<view class="text">
						解聘机器人
					</view>
					<image src="../../static/icon/jiantou.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.judicial-summary {
		background: rgba(246, 247, 250, 1);
		padding-bottom: 66upx;

		.intro {
			padding: 40upx 48upx 85upx 55upx;
			margin-bottom: 40upx;
			background-image: url(../../static/bg/bg2.png);

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

		.word {
			width: 690upx;
			height: 385upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
			border-radius: 8upx;
			padding: 40upx 53upx 52upx 56upx;
			position: relative;
			left: 30upx;
			top: -69upx;

			.doc {
				display: flex;
				justify-content: space-between;

				image {
					width: 75upx;
					height: 80upx;
					margin: 0 26upx 80upx 0;
				}

				.doc-name {
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					color: rgba(26, 30, 48, 1);
					line-height: 42upx;
				}
			}

			.btns {
				margin-bottom: 40upx;
				font-size: 24upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 600;
				line-height: 33upx;
				display: flex;
				justify-content: space-between;

				.text {
					color: rgba(47, 126, 249, 1);
				}

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

				.scene {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.text {
						font-size: 32upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 600;
						color: rgba(47, 126, 249, 1);
						line-height: 45upx;
					}

					image {
						width: 48upx;
						height: 10upx;
					}

				}
			}
		}
	}
</style>
