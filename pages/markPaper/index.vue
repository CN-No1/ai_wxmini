<template>
	<view class="mark-paper">
		<view class="intro">
			<view class="title">
				法考阅卷应用简介
			</view>
			<view class="text">
				针对司法考试主观题的智能阅卷，根据学员的回答给出相应的评分，评判答案是否正确以及并根据得分点进行过程分析。
			</view>
		</view>
		<view class="sub">
			<view class="sub-title">
				在线体验
			</view>
			<view class="sub-content">
				<view class="exp" :class="isExpend ? 'expendClass' : 'commonClass'">
					<span class="tag">
						【案情】
					</span>
					<span class="text">
						为了美化市容市貌，加快推进生态文明城市建设，扩大绿地面积，舒缓交通拥堵，燕京市政府决定对该市城市建筑进行有计划有步骤的重新改造。2015年9月3日，燕京市联康区人民政府发布国有土地上的征收决定公告，决定对该区范围内120亩地进行征收。范某的房屋刚好位于该片土地的征收范围之内。在征收补偿方案所确定的补偿期限内，房屋征收部门与范某反复协商未果，双方未能达成拆迁安置补偿协议。
						2016年1月2日，区房屋征收部门委托康泰评估公司对被征收人范某的房屋进行评估。康泰公司组织评估小组对范某的房屋进行了评估，并形成了评估报告。但房屋征收部门未将该评估报告送达给被征收人范某。2016年3月2日，区政府对被征收人范某作出了房屋征收补偿决定。被征收人范某对该征收补偿决定不服，向位于文宁区的市政府申请行政复议，市政府经审理，以范某的复议请求不能成立为由，作出了驳回范某复议请求的决定。范某不服该行政复议决定，向人民法院提起行政诉讼。一审法院经审理，认为原机关与复议机关的行政决定并无不当，判决驳回了范某的诉讼请求。范某不服，提起上诉。二审法院经审理认为，区政府作出的房屋征收补偿决定事实不清，行政程序违法，判决撤销了一审判决，撤销了区政府作出的房屋补偿决定。
					</span>
				</view>
				<view class="expand" @click="isExpend = true" v-if="!isExpend">
					展开全文
				</view>
				<view class="expand" @click="isExpend = false" v-else>
					收起全文
				</view>
				<view class="change">
					<view class="icon-btn">
						<image src="../../static/icon/huanyihuan.png"></image>换一题
					</view>
				</view>
			</view>
		</view>
		<view class="sub">
			<view class="sub-title">
				问题
			</view>
			<view class="sub-content">
				若原告请求撤销该行政征收行为，但人民法院经审理，认为该行政征收行为应为无效行为，则应如何判决？为什么？<view class="change">
					<view class="icon-btn">
						<image src="../../static/icon/huanyihuan.png"></image>换一题
					</view>
				</view>
			</view>
		</view>
		<view class="sub">
			<view class="sub-title">
				学生解答
			</view>
			<view class="sub-content">
				根据《行诉诉讼法》第75条的规定，若原告请求确认原行政征收决定无效，但人民法院审查认为行政行为不属于无效情形，经释明，原告请求撤销行政行为的。
				<view class="primary-btn">
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
					<span class="th">得分</span>
					<span class="th">得分解析</span>
				</view>
				<view class="row tr">
					<span>1分</span>
					<span>原告请求撤销行政行为，继续审理。</span>
				</view>
				<view class="row tr">
					<span>1分</span>
					<span>原告请求撤销行政行为，继续审理。</span>
				</view>
				<view class="row tr">
					<span>1分</span>
					<span>原告请求撤销行政行为，继续审理。</span>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isExpend: false
			}
		},
		methods: {
			expend() {
				uni.createSelectorQuery().select(".exp").boundingClientRect((res) => {
					debugger
					res.height = '100 %'
				}).exec()
			}
		}
	}
</script>

<style lang='less' scoped>
	.mark-paper {
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

				.row {
					width: 690upx;
					height: 80upx;
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

					.th {
						color: #2F7EF9;
					}
				}

				.tr {
					&:nth-child(2n-1) {
						background: rgba(246, 247, 250, 0.79);
					}
				}
			}
		}
	}
</style>
