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
					<view class="abilities-item" v-for="(i, index) in item.abs" :key="index">
						<image :src="i.img" class="abilities-icon"></image>
						<view class="abilities-name">
							{{i.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
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
						img: '../../static/icon/舆情垃圾.png',
					}, {
						name: '舆情正负面分类',
						img: '../../static/icon/舆情正负面.png',
					}, {
						name: '舆情法规文本密度计算',
						img: '../../static/icon/舆情法规.png',
					}]
				}, {
					name: '语义计算类',
					abs: [{
						name: '句子语义抽象化',
						img: '../../static/icon/句子语义.png',
					}, {
						name: '事件角色标注',
						img: '../../static/icon/事件角色.png',
					}, {
						name: '相关问题推荐',
						img: '../../static/icon/相关问题.png',
					}, {
						name: '风险类别评估专题分类',
						img: '../../static/icon/风险类.png',
					}]
				}, {
					name: '信息识别类',
					abs: [{
						name: '三元组抽取',
						img: '../../static/icon/三元组.png',
					}, {
						name: '实体识别',
						img: '../../static/icon/实体识别.png',
					}, {
						name: '事件抽取',
						img: '../../static/icon/事件抽取.png',
					}, {
						name: '要素抽取',
						img: '../../static/icon/要素抽取.png',
					}, {
						name: '角色识别',
						img: '../../static/icon/角色识别.png',
					}]
				}, {
					name: '文本生成类',
					abs: [{
						name: '法律问题改写',
						img: '../../static/icon/编组 13.png',
					}, {
						name: '摘要生成',
						img: '../../static/icon/编组.png',
					}, {
						name: '相似问题改写',
						img: '../../static/icon/形似问题改写.png',
					}, {
						name: '问答答案生产',
						img: '../../static/icon/问答答案生产.png',
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
