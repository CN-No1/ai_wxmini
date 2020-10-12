<template>
	<view class="publicSentiment">
		<view class="sub">
			<view class="sub-title">
				在线体验
			</view>
			<view class="sub-content">
				<view class="exp" :class="isExpend ? 'expendClass' : 'commonClass'">
					<span class="text statement">
						{{ text }}
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
					<view class="icon-btn" @click="getText">
						<image src="../../static/icon/huanyihuan.png"></image>换一题
					</view>
				</view>
				<view class="primary-btn" @click="getResult">
					一键解析
				</view>
			</view>
		</view>
		<view class="sub" v-if="rate>0">
			<view class="sub-title">
				解析结果
			</view>
			<view class="sub-content result">
				<view class="text" :style="{color:!isRubbish?'#2F7EF9;':'#B8B8B8;'}">
					<image src="../../static/icon/positive_n.png" v-if="!isRubbish"></image>
					<image src="../../static/icon/positive.png" v-else></image>
					<view class="">
						正面
					</view>
				</view>
				<view class="process">
					<u-line-progress :percent="rate" :show-percent="false" height='8' inactive-color="#ff007f" active-color="#2F7EF9"></u-line-progress>
				</view>
				<view class="tag" :class="!isRubbish?'left':'right'">
					<image src="../../static/icon/process.png"></image>
				</view>
				<view class="text" :style="{color:isRubbish?'#FE625F;':'#B8B8B8;'}">
					<image src="../../static/icon/nagetive_n.png" v-if="isRubbish"></image>
					<image src="../../static/icon/nagetive.png" v-else></image>
					<view class="">
						负面
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
				textList: [{
						"originalData": {
							"title": "沈阳女子玩网游时与男子网恋，诈骗106万还说都怪网贷",
							"summary": `他们在虚拟世界相识，男子想把感情从虚拟变为现实，却落入女子设计好的陷阱。\n,
								2020年9月10日，法院公布了这起诈骗案件的审判结果，法院认为女子李某的行为已构成诈骗罪。\n
								经审理查明，女子李某大学本科学历，在沈阳市皇姑区某公司做职员。自2014年开始，女子李某与被害人金某通过玩网络游戏结识后，李某自称“白某”并虚构年龄、学历、住址和外貌照片等身份信息经常与金某用QQ、微信等软件聊天，进而与金某确定了男女朋友关系。\n2018年11月25日开始，李某编造其母亲心脏病需做手术、舅舅得癌症急需用钱等理由多次向被害人金某借款，被害人金某通过支付宝、微信向洪丽娜多次转账合计人民币1,061,225.19元。\n
								女子李某从刚接触金某开始，就在编造谎言，可见她从最开始就没安好心。\n
								可是男子金某家庭条件优越，又愿意为李某付出，为何李某却偏要欺骗人家呢？\n
								在法院审理过程中，李某称，她因自控能力较差，深陷网络贷款无法自拔，她也是网络高息贷款的受害者，是迫不得已才欺骗金某。所以，请求法庭对其从轻处罚。\n
								李某是网络贷款的受害者，虽然她本身也有值得同情之处，但这并不能成为她欺骗别人的理由。\n
								法院认为，李某以非法占有为目的，以虚构事实、隐瞒真相的方法，骗取他人财物，数额特别巨大，核其行为已构成诈骗罪。最终判处李某有期徒刑十一年六个月，并处罚金人民币10万元，并向被害人金某退赔损失人民币1,061,225.19元。​​​`
						},
					},
					{
						"originalData": {
							"title": "关于李洪元：谁能看懂衢州中院这个裁定？",
							"summary": `李洪元起诉我的节目《小人李洪元》侵犯名誉权，我没有太在意。起诉是李洪元的合法权利，只要依法裁决我尊重司法结果。我委托了律师，全权处理这一诉讼，
							律师依法提出了管辖权异议，这本来是再正常不过的司法程序。\n自诉讼起，李洪元一直在网上以各种告知的方式滋扰我，起诉我第一时间也不是从衢州市柯城区法院得知，
							而是从李洪元在网上的公示知晓。之后柯城区人民法院办案法官联系我，我说交给律师依法处理。媒体采访我，我也表达了同样的观点。\n对于李洪元的个人观感，
							我在节目和文章里表达的很清楚，无论这一诉讼结果如何，不会有任何改变。今天给大家发布的，是两份截然不同的裁决书，就这样一个简单不过的民事诉讼案，我
							的专业能力不足以搞明白为什么会有这样的裁定。\n诉讼最终结果再说，就看看围绕“管辖权异议”的两份裁定，看一下浙江省衢州市柯城区人民法院和浙江省衢州市
							中级人民法院的裁决依据和结果。\n一：浙江省衢州市柯城区人民法院裁定书\n二：浙江省衢州市中级人民法院裁定书\n​\n衢州市中院撤销了柯城区法院的裁定，裁定
							理由是“从民法意义上”。我咨询了多名律师和法官，大家觉得这个依据有一个问题：有法律规则的前提下，使用法律原则，和民事诉讼法不符。简单讲，就是在有明确
							的法律条款可以作为依据的前提下，衢州市中院没有按照程序法进行裁定。当然，这个我不懂，大家看看民事诉讼法中的条款：\n李洪元诉我名誉侵权的案件，管辖权异
							议应该按照法律规则（法律条款）来裁定，衢州中院撤销了柯城区法院的裁定，这是它的法定权力，但司法权力应该依法履行。从裁定书上看，我都可以怀疑衢州中院枉
							法裁定。\n因为对衢州中院的裁定不服，我委托律师到浙江省高院申诉，窗口答复不能接收材料，衢州中院的裁定为终审裁定，如果有问题等柯城区法院判决后再申诉程
							序问题。拒收申诉材料，等于掐断了我作为当事人的司法救济通道！虽然是个管辖权异议的小事情，但衢州中院的裁定会直接侵犯侵害我的合法权益。\n鉴于没有办法通
							过司法救济完成申诉，我委托律师向衢州市纪委、衢州市中院信访部门、衢州市政法委、浙江省高院、浙江省政法委等部门进行实名投诉和举报。同时向全社会公开李洪
							元起诉我名誉侵权后管辖权异议的全过程，接受全社会监督的同时也向专业法律人士征询建议和指导。\n希望衢州中院能够依法办案，不要拿出这种内行外行都能看出
							问题的裁定书。之后所有的进展，我随时依法公布出来，免得李洪元这样的英雄人物不能够再为浙江省衢州市增光添彩。​​​`
						},
					},
					{
						"originalData": {
							"title": "如何看待大连 13 岁男孩杀害 10 岁女孩案，相关赔偿和道歉均未执行，女孩母亲向法院申请强执？",
							"summary": `我想问未成年人保护法到底在保护谁，像这样的恶性事件，先奸后杀，都不用承担责任，关3年就行了，那个被杀的小女孩呢，招谁惹谁了，怎样保护被伤害的人，法律到底在保护怎样的人，我家里也有小孩，真不敢想自己辛苦带大的孩子如果发生什么事情，我得疯了，极度同情女孩家人，像这样穷凶极恶的罪犯不需要再给机会了吧，赶快改改相关条款吧，给普通人点安全感吧`
						},
					},
					{
						"originalData": {
							"title": "廊坊都市报:#都市报律师团# 【以遗嘱形式处分抚恤金是否可行？】原告薛某",
							"summary": `#都市报律师团# 【以遗嘱形式处分抚恤金是否可行？】原告薛某与被告王甲、王乙的父亲王某于2007年再婚。
							2019年，王某因病去世。王某生前系离休干部，在其死亡后，单位发放一次性抚恤金173742元，被王甲一次性领取。原告薛某诉至法院要求二位被告返还全部抚恤金。原告主张抚恤金是死者所在单位给予死者近亲属和被抚养人的生活补助费，并含有一定的精神抚慰性质，原告与王某系合法夫妻，有权取得抚恤金的所有权。\n\n二位被告辩称，抚恤金是其父亲的个人财产，不同意分割，要求按照王某遗嘱处理。其中，遗嘱中称：“我与薛某一起安度晚年，为以后大家和睦相处，特制定以下几点嘱托：一、我去世以后，我的房子和一切财产归儿女所有；二、我去世后，关于薛某的一切生活与我的儿女无关。”\n\n原告称，对被告提交的遗嘱无异议，但原告并没有要求分配遗嘱中阐述的房产和财产，而是要求分割政府发放的抚恤金。社会保险事业处发放的相关费用不属于遗产，而是给予一起生活的近亲属的生活补助，不能按遗产继承分配，请求法院判决抚恤金172742元全部归原告所有。被告主张，老人去世后留下的财产都叫做遗产，抚恤金也是遗产范围内，应按照遗嘱继承。且原告每月均能获得遗属补助，有足够的生活、医疗保障，不同意分配抚恤金。\n\n最终，法院判决，王某去世后，单位发放的一次性抚恤金173742元，由原告薛某按照百分之六十比例分得104245元，由被告王甲、王乙按百分之四十比例共同分得69497元。\n\n律师说法\n\n本案争议的焦点在于抚恤金是否属于死者个人遗产。河北张克锋律师事务所律师张克锋分析，抚恤金是死者所在单位给予死者近亲属和被抚养人的生活补助费，并含有一定的精神抚慰性质；遗产是公民死亡时遗留的个人合法财产，而抚恤金产生于死者死亡之后，不是死者生前的财产，故抚恤金不属于遗产。抚恤金的分配，应当考虑依靠死者生活的未成年人和失去劳动能力的亲属与死者关系密切程度、共同生活时间长短等因素进行分割。王某生前虽立有遗嘱，去世后房子和财产归儿女所有，但立遗嘱人只能处分其生前个人财产，无权处分其死亡后应得到的财产，遗嘱内容不得损害其他人应得到的合法财产权。因抚恤金是基于王某死亡后，单位发给亲属的生活补助，故不能以遗嘱形式处分。\n\n对死亡抚恤金的分配，我国尚无专门的法律规定。实践中，人民法院多数根据案件具体情况，酌情进行分配，力争实现既维护近亲属之间的亲情，实现社会和谐稳定，又保护弱者的权益，
							最大限度地维护社会公平正义的裁判效果。\n\n（本文仅代表律师个人观点，仅供读者参考。个案有特性，勿直接套用。）​​​`
						},
					},
				],
				rate: 0,
				isRubbish: true,
				index: -1,
				isExpend: false,
				showExpand: false,
			}
		},
		computed: {
			text() {
				return this.textList[this.index] ? this.textList[this.index].originalData.summary : '';
			}
		},
		methods: {
			onLoad() {
				this.getText();
			},
			toShowExpand() {
				uni.createSelectorQuery().select(".statement").boundingClientRect((res) => {
					this.showExpand = res.height > 320
				}).exec()
			},
			getText() {
				this.index = this.index > 2 ? 0 : this.index + 1;
				// this.rate = 0;
				setTimeout(this.toShowExpand, 100);
			},
			getResult() {
				this.$u.api.allInterface({
					"url": "http://gpu2-ai.aegis-info.com:7785/np",
					"method": "post",
					"params": {
						samples: [this.textList[this.index]]
					}
				}).then(res => {
					this.isRubbish = res.data[0].label === '负面';
					this.rate = !this.isRubbish ? 70 : 30;
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
				display: flex;
				padding: 47upx 43upx 43upx 35upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 700;
				color: rgba(47, 126, 249, 1);
				line-height: 50upx;


				.text {
					text-align: center;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.process {
					width: 356upx;
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
					left: calc(-356upx * (1 - 0.7) - 35upx / 2);
				}

				.right {
					left: calc(-356upx * (1 - 0.3) - 35upx / 2);
				}
			}

		}
	}
</style>
