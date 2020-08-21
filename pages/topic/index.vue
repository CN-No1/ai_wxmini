<template>
	<view class="topic-page">
		<view class="top-header" v-if="topicInfo" :style="{ backgroundImage:  'url(' + topicInfo.bg_url +')'}">
			<view class="name">{{topicInfo.name}}</view>
			<view class="desc">{{topicInfo.desc}}</view>
			<view class="title">
				<image src="../../static/icon/xiaofa-tutou@2x.png" class="icon"></image>
				<text>{{topicInfo.robot.name}}</text>
				<view class="ask-box" @click="handleQuestion()">提问</view>
			</view>
		</view>
		<view class="risk-question" v-if="topicInfo.risk && topicInfo.risk.length > 0">
			<view class="title">常见法律问题</view>
			<view class="risk-list">
				<view class="risk-item" v-for="(item, index) in topicInfo.risk" :key="index" @click="handleQuestion('','', '', item.id)">
					<image :src="item.icon" class="icon"></image>
					<text class="label u-line-1">{{item.name}}</text>
				</view>
			</view>
			<view class="bottom-all-btn" v-if="topicInfo.risk.length > 6">
				<text class="text">全部问题</text>
				<u-icon name="arrow-down" size="24" color="#009AF0"></u-icon>
			</view>
		</view>
		<view class="law-title">法律专题</view>
		<view class="topic-box u-border" v-for="(topic, index) in topicInfo.sub_detail" :key="index">
			<view class="title u-border-bottom" @click="handleTopic(topic)">
				<text class="text">{{topic.name}}</text>
				<image src="../../static/icon/arrow-right@2x.png" class="arrow-right"></image>
			</view>
			<view v-for="(sub, _index) in topic.titles" :key="_index" class="sub-topic-box u-border-bottom">
				<image v-if="sub.tag.indexOf('风险评估') > -1" class="icon" src="../../static/icon/qa-risk.png"></image>
				<image v-else-if="sub.tag.indexOf('文书模板') > -1" class="icon" src="../../static/icon/qa-doc.png"></image>
				<image v-else src="../../static/icon/qa-chat.png" class="icon"></image>
				<view class="text u-line-1" @click="handleQuestion(topic.name, sub.title)">{{sub.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: '',
				eventId: '',
				topic: '',
				topicId: '',
				topicInfo: ''
			}
		},
		mounted() {
			this.getTopic();
		},
		methods: {
			/**
			 * 获取专题信息
			 */
			async getTopic() {
				const res = await this.$u.api.getSubTopic({
					user_id: getApp().globalData.userId,
					event_id: getApp().globalData.eventId,
					level1: this.topic
				});
				this.topicInfo = res.data[0];
				console.log(this.topicInfo)
			},
			/**
			 * 跳转到二级专题
			 * @param {Object} item
			 */
			handleTopic(item) {
				this.$u.route({
					url: 'pages/topic/sub-topic',
					params: {
						topic: this.topic,
						topicId: this.topicId,
						subTopic: item.name
					}
				})
			},
			/**
			 * 跳转到问答
			 * @param {Object} subTopic 二级专题
			 * @param {Object} title 法律专题问题
			 * @param {Object} riskId 风险评估的id
			 */
			handleQuestion(subTopic = '', title = '', riskId = '') {
				console.log('title:', title);
				this.$u.route({
					url: 'pages/qa-question/index',
					params: {
						topic: this.$u.test.isEmpty(this.topic) ? '' : decodeURIComponent(this.topic),
						topicId: this.topicId,
						subTopic: this.$u.test.isEmpty(subTopic) ? '' : subTopic,
						content: this.$u.test.isEmpty(title) ? '' : decodeURIComponent(title),
						riskId: this.$u.test.isEmpty(riskId) ? '' : riskId
					}
				})
			}
		},
		onLoad(opt) {
			// 获取参数
			const {
				topic,
				topicId
			} = opt;
			this.topicId = topicId;
			this.topic = topic;
		}
	}
</script>

<style lang="scss">
	.topic-page {
		.top-header {
			width: 100%;
			background-size: cover;
			background-repeat: no-repeat;
			padding: 32upx 50upx;

			.name {
				font-size: 36upx;
				color: #3C3F50;
				font-weight: Medium;
				font-family: PingFangSC-Medium, PingFang SC;
				margin-bottom: 22upx;
			}

			.desc {
				color: #113260;
				font-size: 30upx;
				line-height: 42upx;
				font-family: PingFang-SC-Regular, PingFang-SC;
				margin-bottom: 51upx;
			}

			.title {
				width: 650upx;
				background: linear-gradient(270deg, rgba(0, 168, 240, 1) 0%, rgba(0, 120, 240, 1) 100%);
				border-radius: 0px 36px 36px 36px;
				padding: 12upx 14upx;
				box-sizing: border-box;
				font-size: 32upx;
				font-family: PingFang-SC-Regular, PingFang-SC;
				;
				font-weight: Regular;
				color: #FFFFFF;
				line-height: 45upx;
				position: relative;
				padding-left: 108upx;

				.icon {
					width: 72upx;
					height: 66.95upx;
					position: absolute;
					left: 16upx;
					top: -20upx;
				}

				.ask-box {
					padding: 2upx 18upx;
					display: inline-block;
					font-size: 26upx;
					float: right;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 37upx;
					background: rgba(255, 255, 255, .3);
					border-radius: 20px;
				}
			}
		}

		.risk-question {
			padding: 0 40upx;
			margin-top: 10upx;

			.title {
				color: #3C3F50;
				font-size: 36upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: Medium;
				padding-left: 10upx;
				box-sizing: border-box;
				margin-bottom: 14upx;
			}

			.risk-list {
				display: flex;
				flex-wrap: wrap;

				.risk-item {
					flex: 0 0 220upx;
					display: flex;
					align-items: center;
					align-content: center;
					margin-bottom: 14upx;

					.icon {
						width: 75upx;
						height: 75upx;
					}

					.label {
						font-size: 28upx;
						color: #65799B;
						margin-left: 8upx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: Regular;
					}
				}
			}

			.bottom-all-btn {
				padding: 8upx 29upx 7upx 29upx;
				background: rgba(0, 158, 240, 0.15);
				box-sizing: border-box;
				border-radius: 24px;
				color: #009AF0;
				font-size: 24upx;
				display: block;
				width: 184upx;
				margin: 0 auto;

				.text {
					margin-right: 8upx;
				}
			}
		}

		.law-title {
			padding: 0 50upx;
			box-sizing: border-box;
			margin-top: 16upx;
			margin-bottom: 16upx;
			font-size: 36upx;
			color: #3C3F50;
			font-weight: Medium;
		}

		.topic-box {
			width: 702upx;
			box-shadow: 0px 0px 12px 0px rgba(201, 222, 247, 0.8);
			border-radius: 10px;
			padding: 25upx 24upx;
			box-sizing: border-box;
			margin: 0 auto 48upx auto;

			&::after {
				border-radius: 10px;
			}

			.title {
				padding-bottom: 25upx;
				font-size: 30upx;
				font-weight: Medium;
				color: #113260;
				font-family: PingFangSC-Medium, PingFang SC;
				display: flex;

				.text {
					flex: 1;
				}

				.arrow-right {
					width: 44upx;
					height: 44upx;
				}
			}

			.sub-topic-box {
				padding: 21upx 0 15upx 0;
				display: flex;
				align-items: center;

				&:last-child {
					padding-bottom: 0;

					&::after {
						border-width: 0;
					}
				}

				.icon {
					width: 56upx;
					height: 56upx;
					flex: 0 0 56upx;
					vertical-align: text-top;
				}

				.text {
					color: #65799B;
					font-size: 32upx;
					font-weight: Regular;
					margin-left: 32upx;
					text-align: justify;
					box-sizing: border-box;
					padding-right: 8upx;
				}
			}
		}
	}
</style>
