<template>
	<view class="abilities">
		<image src="../../static/banner/banner2.png" class="banner"></image>
		<view class="abilities-list">
			<u-sticky>
				<!-- 只能有一个根元素 -->
				<view class="sticky">
					<xfl-select :list="list" :clearable="false" :showItemNum="5" :listShow="false" :isCanInput="false"
					 :style_Container="'height: 50px; font-size: 16px;'" :placeholder="'能力分类'" :selectHideType="'hideAll'" @change='check'>
					</xfl-select>
				</view>
			</u-sticky>
			<view class="abilities-wrapper" v-for="(item, index) in abilitiesList" :key="index" :ref='item.name'>
				<view class="title">
					{{item.name}}
				</view>
				<view class="abilities-wrapper-inner">
					<view class="abilities-item" v-for="(i, subindex) in item.abs" :key="subindex" @click="nav(i.url)">
						<image :src="i.img" class="abilities-icon"></image>
						<view class="abilities-name">
							{{i.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	export default {
		components: {
			xflSelect
		},
		data() {
			return {
				list: [ //要展示的数据
					'舆情分析类',
					'语义计算类',
					'信息识别类',
					'文本生成类',
				],
				abilitiesList: [{
					name: '舆情分析类',
					abs: [{
						name: '舆情垃圾文本识别',
						img: '../../static/icon/rubbish.png',
						url: 'pages/publicSentiment/index'
					}, {
						name: '舆情正负面分类',
						img: '../../static/icon/PosOrNeg.png',
						url: 'pages/positiveAndNagetive/index'
					}, {
						name: '舆情法规文本密度计算',
						img: '../../static/icon/lawRule.png',
						url: 'pages/density/index'
					}]
				}, {
					name: '语义计算类',
					abs: [{
						name: '句子语义抽象化',
						img: '../../static/icon/semanteme.png',
						url: ''
					}, {
						name: '事件角色标注',
						img: '../../static/icon/role.png',
						url: ''
					}, {
						name: '相关问题推荐',
						img: '../../static/icon/relative.png',
						url: ''
					}, {
						name: '风险类别评估专题分类',
						img: '../../static/icon/risk.png',
						url: 'pages/classification/index'
					}]
				}, {
					name: '信息识别类',
					abs: [{
						name: '三元组抽取',
						img: '../../static/icon/Triplet.png',
						url: 'pages/triple/index'
					}, {
						name: '实体识别',
						img: '../../static/icon/recognition.png',
						url: ''
					}, {
						name: '事件抽取',
						img: '../../static/icon/extraction.png',
						url: ''
					}, {
						name: '要素抽取',
						img: '../../static/icon/element.png',
						url: ''
					}, {
						name: '角色识别',
						img: '../../static/icon/RoleRecognition.png',
						url: ''
					}]
				}, {
					name: '文本生成类',
					abs: [{
						name: '法律问题改写',
						img: '../../static/icon/law.png',
						url: ''
					}, {
						name: '摘要生成',
						img: '../../static/icon/abstract.png',
						url: ''
					}, {
						name: '相似问题改写',
						img: '../../static/icon/q1.png',
						url: 'pages/similarity/index'
					}, {
						name: '问答答案生产',
						img: '../../static/icon/q2.png',
						url: ''
					}]
				}]
			}
		},

		methods: {
			check(item) {
				const str = item.newVal;
				this.position(str)
			},

			position(str) {
				uni.createSelectorQuery().selectAll('.abilities-wrapper').boundingClientRect(data => {
					const top = data.filter(res => {
						return res.dataset.ref === str
					})[0].top;
					uni.createSelectorQuery().select(".abilities-list").boundingClientRect((res) => {
						uni.pageScrollTo({
							duration: 0,
							scrollTop: top - res.top,
						})
					}).exec()
				}).exec()
			},

			nav(urls) {
				if (urls.indexOf('http') > 0) {
					this.$u.route({
						url: 'pages/newurl/index',
						params: {
							url: urls
						}
					});
				} else {
					if (urls === '') {
						uni.showToast({
							title: '更多能力，即将上线！',
							icon: 'none',
							duration: 1000
						})
					}
					this.$u.route({
						url: urls,
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.abilities {
		.banner {
			width: 750upx;
			height: 300upx;
		}

		.abilities-list {
			min-height: 1460upx;
			background: rgba(246, 247, 250, 1);
			height: 100%;
			padding-bottom: 10upx;

			.abilities-wrapper {
				.title {
					padding: 46upx 0 0 40upx;
					font-size: 36upx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 700;
					color: rgba(26, 30, 48, 1);
					line-height: 50upx;
				}

				.abilities-wrapper-inner {
					display: flex;
					padding-top: 24upx;
					padding-left: 30upx;
					flex-wrap: wrap;

					.abilities-item {
						width: 205upx;
						height: 240upx;
						background: rgba(255, 255, 255, 1);
						box-shadow: 0upx 6upx 11upx 0upx rgba(231, 238, 255, 1);
						border-radius: 8upx;
						padding: 48upx 32upx 32upx 32upx;
						margin-bottom: 24upx;
						text-align: center;

						&:not(:nth-child(3n)) {
							margin-right: 38upx;
						}

						.abilities-icon {
							width: 56upx;
							height: 56upx;
							margin-bottom: 24upx;
						}

						.abilities-name {
							font-family: PingFangSC-Medium, PingFang SC;
							font-size: 28upx;
							font-weight: 700;
							color: rgba(26, 30, 48, 1);
							line-height: 40upx;
						}
					}
				}
			}

		}
	}

	input::-webkit-input-placeholder {
		color: #2F7EF9;
		font-size: 16px;
	}
</style>
