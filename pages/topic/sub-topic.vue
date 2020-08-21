<template>
	<view class="sub-topic-page">
		<view class="title">
			<image src="../../static/icon/xiaofa-tutou@2x.png" class="icon"></image>
			<text>{{topicInfo.robot.name}}</text>
			<view class="ask-box" @click="handleQuestion()">提问</view>
		</view>
		<view class="topic-box" v-if="titles.length > 0">
			<view v-for="(sub, _index) in titles" :key="_index" class="sub-topic-box u-border-bottom">
				<image v-if="sub.tag.indexOf('风险评估') > -1" class="icon" src="../../static/icon/qa-risk.png"></image>
				<image v-else-if="sub.tag.indexOf('文书模板') > -1" class="icon" src="../../static/icon/qa-doc.png"></image>
				<image v-else src="../../static/icon/qa-chat.png" class="icon"></image>
				<view class="text" @click="handleQuestion(sub.title)">
					<view>{{sub.title}}</view>
					<view class="tag-list">
						<view :class="sub.tag.indexOf('风险评估') > -1 ? 'tag-item risk' : sub.tag.indexOf('文书模板') > -1 ? 'tag-item book' : 'tag-item common'"
						 v-for="(tag,__index) in sub.tag" :key="__index">{{tag}}</view>
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
				userId: '',
				eventId: '',
				topic: '',
				topicId: '',
				subTopic: '',
				topicInfo: '',
				titles: []
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
					level1: this.topic,
					level2: this.subTopic
				});
				this.topicInfo = res.data[0];
				this.titles = this.topicInfo.sub_detail.titles;
			},
			/**
			 * 跳转到问答
			 * @param {Object} title 法律专题问题
			 */
			handleQuestion(title = '') {
				console.log('title:', title);
				this.$u.route({
					url: 'pages/qa-question/index',
					params: {
						topic: this.topic,
						topicId: this.topicId,
						subTopic: this.subTopic,
						content: this.$u.test.isEmpty(title) ? '' : decodeURIComponent(title)
					}
				})
			}
		},
		onLoad(opt) {
			// 获取参数
			const {
				topic,
				topicId,
				subTopic
			} = opt;
			this.subTopic = subTopic;
			this.topic = topic;
		}
	}
</script>

<style lang="scss" scoped>
	.sub-topic-page {
		padding: 50upx 0;
		box-sizing: border-box;

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
			margin: 0 auto;

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

		.topic-box {
			width: 702upx;
			box-shadow: 0px 0px 12px 0px rgba(201, 222, 247, 0.8);
			border-radius: 10px;
			padding: 25upx 24upx;
			box-sizing: border-box;
			margin: 48upx auto 48upx auto;

			&::after {
				border-radius: 10px;
			}

			.sub-topic-box {
				padding: 21upx 0 15upx 0;
				display: flex;
				align-items: flex-start;

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

					.tag-list {
						display: flex;
						margin-top: 15upx;

						.tag-item {
							padding: 6upx 16upx;
							box-sizing: border-box;
							border-radius: 24px;
							font-size: 26upx;
							font-weight: Regular;
							font-family: PingFangSC-Regular, PingFang SC;

							&.common {
								background: rgba(237, 241, 246, 1);
								color: #9FB0CD;
							}

							&.book {
								background: rgba(233, 249, 229, 1);
								color: #4FC371;
							}

							&.risk {
								background: rgba(43, 167, 244, 0.1);
								color: #2BA7F4;
							}
						}
					}
				}
			}
		}
	}
</style>
