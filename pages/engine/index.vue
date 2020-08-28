<template>
	<view class="engine">
		<view class="intro">
			<view class="title">
				智能规则引擎应用简介
			</view>
			<view class="text">
				规则引擎是一种嵌入在应用程序中的组件，实现了将业务决策从应用程序代码中分离出来，并使用预定义的语义模块编写业务决策。 </view>
		</view>

		<view class="word">
			<view class="doc">
				<image src="../../static/icon/word.png"></image>
				<view class="doc-name">
					{{title}}
				</view>
			</view>
			<view class="btns">
				<view class="text">
					<!-- 在线浏览 -->
				</view>
				<view class="icon-btn" @click="getText">
					<image src="../../static/icon/huanyihuan.png"></image>换一篇
				</view>
			</view>
			<view class="primary-btn" @click="getResult">
				一键解析
			</view>
		</view>

		<view class="sub" v-if="showResult">
			<view class="sub-title">
				基础解析
			</view>
			<view class="sub-content">
				<view class="sub-item">
					<view><span>法院：</span><span>{{baseRes.court}}</span></view>
					<view><span>案号：</span><span>{{baseRes.case_number}}</span></view>
					<view><span>案由：</span><span>{{baseRes.cause.toString()}}</span></view>
					<view><span>文书类型：</span><span>{{baseRes.doc_type}}</span></view>
					<view><span>审理程序：</span><span>{{baseRes.trial_round}}</span></view>
					<view><span>判决日期：</span><span>{{baseRes.decide_time}}</span></view>
					<!-- <view><span>文书分段：</span><span></span></view> -->
				</view>
			</view>
		</view>

		<view class="sub" v-if="showResult&&ruleRes.length>0">
			<view class="sub-title">
				规则解析
			</view>
			<view class="sub-content">
				<view class="sub-item">
					<view v-for="(item,index) in ruleRes" :key='index'>
						<view class="parent">
							{{item.name}}
						</view>
						<view v-for="(i,index) in item.infoList" :key="index" class="child">
							{{i.key}}: {{i.value}}
						</view>
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
				showResult: false,
				textList: [{
						"caseNumber": "（2016）黑04刑初11号",
						"title": "王振奎、刘运梅等非法持有毒品罪一审刑事判决书"
					},
					{
						"caseNumber": "（2016）湘0722刑初233号",
						"title": "方彪走私、贩卖、运输、制造毒品罪一审刑事判决书"
					},
					{
						"caseNumber": "(2016)陕0424民初2078号",
						"title": "高某某与许某离婚纠纷一审民事判决书"
					},
					{
						"caseNumber": "(2016)苏0724民初4782号",
						"title": "高某与乔某1离婚纠纷一审民事判决书"
					},
					{
						"caseNumber": "（2016）豫0581民初3608号",
						"title": "郭某与李某甲离婚纠纷一审民事判决书"
					}
				],
				index: 0,
				baseRes: {},
				ruleRes: []
			}
		},
		computed: {
			title() {
				return this.textList[this.index].title;
			},
			caseNumber() {
				return this.textList[this.index].caseNumber;
			}
		},
		methods: {
			onLoad() {
				this.getText();
			},
			getText() {
				this.index = this.index > 4 ? 0 : this.index + 1
				this.showResult = false;
			},
			getResult() {
				this.$u.api.allInterface({
					"url": "http://tagresolve.aegis-info.com/api/v1/graph/parse/",
					"method": "post",
					"params": {
						is_form: true,
						graph_id: '5d9fdf26b6f586db6e347f5a',
						case_number: this.caseNumber
					}
				}).then(res => {
					const data = res.data[0];
					this.baseRes = data.document;
					Object.keys(data.fields).map(key => {
						data.fields[key].infoList = [];
						if (data.fields[key].value.length > 0) {
							data.fields[key].value.map(k => {
								let obj = {};
								obj.key = Object.keys(k)[0];
								obj.value = k[Object.keys(k)[0]].toString();
								data.fields[key].infoList.push(obj);
							})
						}
						this.ruleRes.push(data.fields[key]);
						console.log(this.ruleRes)
					})
					this.showResult = true;
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.engine {
		background: rgba(246, 247, 250, 1);
		padding-bottom: 66upx;
		min-height: 1460upx;

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
					flex: 1;
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

				.sub-item {
					font-size: 28upx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 600;
					color: rgba(26, 30, 48, 1);
					line-height: 56upx;

					.parent {
						font-size: 30upx;
					}

					.child {
						text-indent: 25upx;
					}
				}
			}
		}
	}
</style>
