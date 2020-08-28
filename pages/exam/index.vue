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
					【{{type}}】
				</span>
				<span class="text">
					{{statement}}
				</span>
				<view class="options">
					<view class="option-item" v-for="(item,index) in optionList" :key='index'>
						{{item.option}}. {{item.text}}
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
		<view class="sub" v-if="result.length>0">
			<view class="sub-title">
				解析结果
			</view>

			<view class="result-wrapper">
				<view class="result-item" v-for="(item,index) in result" :key='index' :class="item.isCorrect?'isCorrect':''">
					<view class="text">
						{{item.option}}. {{item.text}}
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
				reqObj: {},
				statement: '',
				type: '',
				optionList: [],
				result: []
			}
		},

		computed: {

		},

		methods: {
			onLoad() {
				this.getQuestion()
			},
			getQuestion() {
				this.result = [];
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam/objective/questions",
					"method": "get",
					"params": {}
				}).then(res => {
					const resObj = Object.assign({}, res.data);
					const option = resObj.option_list;
					this.reqObj = {
						id: resObj.id,
						option_list: resObj.option_list,
						statement: resObj.statement
					}
					this.statement = resObj.statement;
					this.type = resObj.type;
					this.optionList = []
					Object.keys(option).map(key => {
						let obj = {
							option: key,
							text: option[key]
						}
						this.optionList.push(obj)
					})
				})
			},
			getResult() {
				uni.showLoading({
					title: "解析中..."
				})
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam_answer/predict",
					"method": "post",
					"params": this.reqObj
				}).then(res => {
					const answer = res.data.answer;
					const rates = res.data.prob;
					this.result = [].concat(this.optionList);
					this.result.map(item => {
						item.isCorrect = answer.includes(item.option);
					})
					rates.map(rate => {
						setTimeout(() => {
							uni.hideLoading()
						}, 2000)
						let opt = Object.keys(rate)[0];
						this.result.map(res => {
							if (res.option === opt) {
								res.rate = (rate[opt] * 100).toFixed(2) + '%';
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.exam {
		min-height: 1460upx;
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

					.text {
						color: rgba(26, 30, 48, 1);
					}

					.rate {
						color: rgba(254, 98, 95, 1);
					}
				}

				.isCorrect {
					border-bottom: none;

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
