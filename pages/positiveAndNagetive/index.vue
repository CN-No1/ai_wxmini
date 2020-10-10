<template>
	<view class="publicSentiment">
		<view class="sub">
			<view class="sub-title">
				在线体验
			</view>
			<view class="sub-content">
				<view class="title">
					【文本】
				</view>
				<view class="text">
					<!-- <u-field v-model="text" placeholder="请输入文本" type="textarea" :clearable='false' label-width='0' maxlength='500'>
					</u-field> -->
					{{text}}
				</view>
				<view class="change" @click="getText">
					<view class="icon-btn">
						<image src="../../static/icon/huanyihuan.png"></image>换一换
					</view>
				</view>
				<!-- 				<view class="primary-btn" @click="getResult">
					一键解析
				</view> -->
			</view>
		</view>
		<view class="sub" v-if="rate>0">
			<view class="sub-title">
				解析结果
			</view>
			<view class="sub-content result">
				<view class="text" :style="{color:isRubbish?'#ff007f;':'#000;'}">
					垃圾文本
				</view>
				<view class="process">
					<u-line-progress :percent="rate" :show-percent="false" height='8' active-color="#ff007f" inactive-color="#2F7EF9"></u-line-progress>
				</view>
				<view class="tag" :class="isRubbish?'left':'right'">
					<image src="../../static/icon/process.png"></image>
				</view>
				<view class="text" :style="{color:!isRubbish?'#2F7EF9;':'#000;'}">
					完全正确
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textList: [
					'5月26日，乐清市检察院、乐清市工商联联合举行了“乐清市检察院驻市工商联检察服务站(下检察称服务站)”揭牌仪式，拉开了检会双方为非公经济企业保驾护航的序幕。仪式上，双方还签订了《关于在服务非公有制经济健康发展发加强合作的协议》。',
					'我的书被盗版了。',
					'#南通身边事#【南通开发区房屋征收中心副主任杨欣华被决定逮捕】近日，南通市人民检察院依法对开发区房产交易中心副主任杨欣华以涉嫌滥用职权罪、受贿罪决定逮捕。据了解，其滥用职权，为他人弄虚作假骗取国家巨额拆迁补偿款，并从中收受贿赂，数额巨大，涉嫌犯罪。目前，案件侦查工作正在进行中。',
					'酒后驾驶的究竟含量如何影响量刑？',
					'为深入贯彻市检察院和区委“两学一做”精神，5月5日，安徽省六安市金安区检察院召开“两学一做”动员大会。大会由该院政治处主任刘援中主持，检察长杨敬勋做动员讲话，全体干警参加了大会。​',
					'今天天气不错',
					':#无锡新闻#【宜兴去年审理醉驾案近6成是醉驾摩托车】近期，宜兴法院召开危险驾驶罪案件审理情况新闻发布会。宜兴法院副院长郑东披露，2011年5月1日至2016年4月30日，宜兴法院共审结危险驾驶案件2134件，均为醉酒驾驶类型，占审结刑事案件总数的28.9%，涉案人员达到2134人。',
					'这个新闻不真实',
					'5月1日大约9时15分,在S38常合高速常州段由常熟往合肥方向115K离氵鬲湖服务区1公里附近发生1起事故,占用一、二车道,现场暂不影响通行,事故正在处理中。',
					'我喜欢。',
				],
				rate: 0,
				isRubbish: true,
				index: 0
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
				this.index = this.index > 8 ? 0 : this.index + 1;
				this.getResult();
			},
			getResult() {
				this.$u.api.allInterface({
					"url": "http://domainc.aegis-info.com/domain_predict",
					"method": "get",
					"params": {
						condition: '垃圾文本',
						content: this.text
					}
				}).then(res => {
					this.isRubbish = res.domain === '垃圾文本';
					this.rate = this.isRubbish ? 70 : 30;
				})
			}
		}
	}
</script>

<style lang="less">
	.publicSentiment {
		background: rgba(246, 247, 250, 1);
		padding: 66upx 0;
		min-height: 1460upx;

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

			.result {
				display: flex;
				padding: 47upx 43upx 43upx 35upx;
				align-items: center;
				font-size: 36upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: rgba(47, 126, 249, 1);
				line-height: 50upx;

				.process {
					width: 256upx;
					margin-left: 34upx;
					padding-bottom: 12upx;
				}

				.tag {
					position: relative;
					top: -15upx;
					transition: all 0.3s;

					image {
						width: 35upx;
						height: 29upx;
					}
				}

				.left {
					left: calc(-256upx * (1 - 0.7) - 35upx / 2);
				}

				.right {
					left: calc(-256upx * (1 - 0.3) - 35upx / 2);
				}
			}

		}
	}
</style>
