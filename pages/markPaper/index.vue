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
					<span class="text statement">
						{{problemText}}
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
					<view class="icon-btn" @click="getQuestion">
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
				{{questionText}}
				<view class="change">
					<view class="icon-btn" @click="getSubQuestion">
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
				<!-- {{answerText}} -->
				<u-field v-model="answerText" placeholder="请输入文本" type="textarea" :clearable='false' label-width='0' maxlength='500'>
				</u-field>
				<!-- <voice-input ref='voiceInput' :inputContent='answerText'></voice-input> -->
				<view class="primary-btn" @click="getResult">
					一键解析
				</view>
			</view>
		</view>

		<view class="sub" v-if="result.length>0">
			<view class="sub-title">
				解析结果
			</view>
			<view class="result">
				<view class="row header">
					<span class="th">得分</span>
					<span class="th">得分点</span>
				</view>
				<view class="row tr" v-for="(item,index) in result" :key="index">
					<view class="tr-item">{{item.score}}分</view>
					<view class="tr-item">{{item.text}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import voiceInput from '../../components/voice-input/voice-input.vue';
	export default {
		components: {
			voiceInput
		},
		data() {
			return {
				isExpend: false,
				showExpand: false,
				problemId: '',
				questionId: '',
				problemText: '',
				questionText: '',
				answerText: '',
				answer: {
					answers: [],
					include_support: true,
					use_batch: false
				},
				result: []
			}
		},
		methods: {
			onLoad() {
				this.getQuestion();
			},
			toShowExpand() {
				uni.createSelectorQuery().select(".statement").boundingClientRect((res) => {
					this.showExpand = res.height > 320
				}).exec()
			},
			getQuestion() {
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam/subjective/problems",
					"method": "get",
					"params": {}
				}).then(res => {
					this.problemText = res.data.description.slice(4);
					this.problemId = res.data.problem_id;
					setTimeout(this.toShowExpand, 500);
					this.getSubQuestion();
				})
			},
			getSubQuestion() {
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam/subjective/questions",
					"method": "get",
					"params": {
						problem_id: this.problemId
					}
				}).then(res => {
					this.questionText = res.data.question_txt;
					this.questionId = res.data.question_id;
					this.getAnswer();
				})
			},
			getAnswer() {
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam/subjective/answers",
					"method": "get",
					"params": {
						problem_id: this.problemId,
						question_id: this.questionId
					}
				}).then(res => {
					this.answer.answers = [];
					this.answer.answers.push(res.data);
					this.answerText = res.data.answer;
					this.result = [];
				})
			},
			getResult() {
				// this.answer.answers[0].answer = this.$refs.voiceInput.content;
				this.answer.answers[0].answer = this.answerText
				this.$u.api.allInterface({
					"url": "http://ai-model.aegis-info.com/exam_score_test/rate",
					"method": "post",
					"params": this.answer
				}).then(res => {
					this.result = res.data[0].marks;
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
					display: flex;

					.tr-item:first-child {
						width: 133rpx;
					}

					.tr-item:not(:first-child) {
						flex: 1;
					}

					&:nth-child(2n-1) {
						background: rgba(246, 247, 250, 0.79);
					}
				}
			}
		}
	}
</style>
