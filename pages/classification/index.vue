<template>
	<view class="classification">
		<view class="qiun-columns">
			<view class="sub">
				<view class="sub-title">
					在线体验
				</view>
				<view class="sub-content">
					<view class="title">
						【文本】
					</view>
					<view class="text">
						{{text}}
					</view>
					<view class="change" @click="getText">
						<view class="icon-btn">
							<image src="../../static/icon/huanyihuan.png"></image>换一换
						</view>
					</view>
					<view class="primary-btn" @click="getResult">
						一键解析
					</view>
				</view>
			</view>
			<view class="result" v-if="showResult">
				<image src="../../static/bg/res_bg.png" mode=""></image>
				<view class="result-text">
					{{ result }}
				</view>
			</view>
			<view class="qiun-charts" v-else>
				<canvas canvas-id="canvasWord" id="canvasWord" class="charts"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaWord = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				textList: [
					'受冠状病毒疫情影响劳动合同能否延期续签？', '怀孕期间，夫妻可以离婚吗?', '我已经在单位工作将近两个月了，单位还不和我签合同，该怎办？', '拖欠工资主要是指哪些情况？',
					'我去银行借钱，现在发生了争议，我准备去法院打官司，需要准备些什么材料？', '对方长期酗酒，酒后经常打骂孩子，我可以请求法院把孩子重新判给我吗？', '怎样撤销或变更遗嘱？',
					'不能独立生活的成年子女，能否诉请父母支付抚育费？', '我有三个不孝之子，不付我赡养费，他们都不住在一个城市，现在我要起诉他们的话，该去哪个法院起诉呢？'
				],
				index: 0,
				showResult: false,
				result: ''
			}
		},
		computed: {
			text() {
				return this.textList[this.index];
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(690);
			this.cHeight = uni.upx2px(430);
			this.init();
		},
		methods: {
			getText() {
				this.index = this.index > 7 ? 0 : this.index + 1;
				this.init()
			},
			getResult() {
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/qa-fxpg/predict",
					"method": "post",
					"params": {
						"question": this.text
					}
				}).then(res => {
					this.result = res.label;
					this.showResult = true;
				})
			},
			init() {
				this.showResult = false;
				let Word = {
					series: []
				};
				Word.series = [{
					name: "劳动合同签订纠纷",
					textSize: 25,
				}, {
					name: "诉讼离婚纠纷",
					textSize: 20,
				}, {
					name: "未签劳动合同赔偿纠纷",
					textSize: 20,
				}, {
					name: "追索劳动报酬纠纷",
					textSize: 20,
				}, {
					name: "金融借款合同纠纷",
					textSize: 20,
				}, {
					name: "变更抚养关系纠纷",
					textSize: 20,
				}, {
					name: "继承纠纷",
					textSize: 20,
				}, {
					name: "抚养费纠纷",
					textSize: 20,
				}, {
					name: "赡养费纠纷",
					textSize: 15,
				}];
				_self.textarea = JSON.stringify(Word);
				_self.showWord("canvasWord", Word);
			},
			showWord(canvasId, chartData) {
				canvaWord = new uCharts({
					$this: _self,
					canvasId: canvasId,
					colors: ['#073F5D', '#2578BE', '#A1D1FF', '#BABDA8', '#E6DFC2', '#80A39C'],
					type: 'word',
					background: '#FFFFFF',
					animation: true,
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						word: {
							type: 'normal'
						}
					}
				});
			},
		}
	}
</script>

<style lang="less">
	.classification {
		background-color: #F6F7FA;
		min-height: 1460upx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 690upx;
		height: 430upx;
		background-color: #FFFFFF;
		margin: auto;
	}

	.charts {
		width: 690upx;
		height: 430upx;
		background-color: #FFFFFF;
	}

	.sub {
		padding: 44upx 30upx;

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

			.title {
				color: #2F7EF9;
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
	}

	.result {
		text-align: center;

		image {
			width: 724upx;
			height: 466upx;
		}

		.result-text {
			font-size: 40upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 700;
			color: #FFFFFF;
			line-height: 56upx;
			position: relative;
			top: -270upx;
			z-index: 999;
		}
	}
</style>
