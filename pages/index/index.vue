<template>
	<view class="index-page">
		<!-- 顶部 -->
		<div class="header-wrap">
			<div class="location-box">{{cityName}}
				<image class="arrow-bottom" src="../../static/common/arrow-down-bold.png" alt=""></image>
			</div>
			<div class="input-box" @click="handleQuestion()">
				<image class="search-icon" src="../../static/common/search.png" alt=""></image>
				<div class="input-text">常见法律问题</div>
			</div>
			<div class="user-info-box">
				<text v-if="!userInfo || !userInfo.id" @click="handleLogin()">登录</text>
				<image v-else src="../../static/icon/messageIcon.png"></text>
			</div>
		</div>
		<div class="column-list" v-if="showColumn === 1">
			<div class="column-item" v-for="(item, index) in columnList" :key="index" @click="handleBannerClick(item)">
				<image :src="item.imgUrl" :alt="item.name" class="column-icon"></image>
				<div class="column-name">{{item.name}}</div>
			</div>
		</div>
		<div class="banner-box">
			<swiper class="swiper" duration="500">
				<swiper-item v-for="(item, index) in bannerList" :key="index">
					<image :src="item.url" :alt="item.name" @click="handleBannerClick(item)"></image>
				</swiper-item>
			</swiper>
		</div>
		<div class="tab-list u-border-bottom">
			<u-tabs ref="tabs" :current="tabCurrent" :list="tabList" height="100" gutter="36" fontSize="28" activeColor="#1677FF"
			 bold bar-width="100" :active-item-style="activeTabStyle" :bar-style="barStyle" @change="handleTabChange"></u-tabs>
		</div>
		<div class="tab-data-list">
			<div v-show="tabCurrent === 0">
				<div class="tab-item u-border-bottom" v-for="(item, index) in subjectList" :key="index" @click="handleTopicClick(item)">
					<div class="icon">
						<image :src="item.icon_url"></image>
					</div>
					<div class="text">
						<div class="subject-name"><text v-if="index === 0" class="hot">热门</text>{{item.subject_name}}</div>
						<div class="subject-desc u-line-1">{{item.subject_desc}}</div>
						<div class="count">{{item.count}}人咨询</div>
					</div>
				</div>
			</div>
			<div v-show="tabCurrent === 1">
				<div class="tab-item u-border-bottom" v-for="(item, index) in appList" :key="index">
					<div class="icon">
						<image :src="item.src"></image>
					</div>
					<div class="text">
						<text class="subject-name"><text></text>{{item.label}}</text>
						<div class="subject-desc u-line-2">{{item.desc}}</div>
					</div>
				</div>
			</div>
			<div v-show="tabCurrent === 2">
				<div class="tab-item u-border-bottom no-flex" v-for="(item, index) in newsList" :key="index">
					<div class="title u-line-2" @click="handleNewsDetail(item.id, index)"><text v-if="index === 0" class="hot">热门</text>{{item.title}}</div>
					<div class="desc">
						<div class="source">
							<view class="label">#{{item.label}}</view>
							<view class="source-text u-line-1">信息来源：{{item.webName || item.author}}</view>
						</div>
						<div class="time">
							{{item.postTime}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showColumn: 1, // 是否展示colume
				columnList: [],
				bannerList: [],
				tabList: [{
					name: '法律专题'
				}, {
					name: '法律应用'
				}, {
					name: '热点资讯'
				}],
				tabCurrent: 0,
				subjectList: [], // 法律专题
				appList: [], // 法律应用
				newsIdList: [], // 热点咨询id
				newPage: 1, // 热点咨询分页
				newsList: [], // 热点资讯
				cityName: '南京市' // 定位信息
			}
		},
		computed: {
			activeTabStyle() {
				return {
					'font-size': '30rpx'
				}
			},
			barStyle() {
				const left = this.tabCurrent === 0 ? '-18rpx' : '-6rpx';
				return {
					'background': 'linear-gradient(90deg,#0080ff 0,#0080ff 26%,#c9def7 0,#c9def7 71%,#c9def7)',
					'margin-top': '27rpx',
					'left': left
				}
			},
			userInfo() {
				const res = uni.getStorageSync('user-info') || null;
				return res;
			}
		},
		methods: {
			/**
			 * 获取首页配置信息
			 */
			async initSubjectInfo() {
				try {
					const res = await this.$u.api.getH5Setting({
						interfaceId: getApp().globalData.type,
						eventId: getApp().globalData.eventId
					});
					// 解析接口返回的数据
					if (res && res.data && res.data.content) {
						const {
							banner,
							coreFeatures,
							recommended
						} = JSON.parse(res.data.content[0].content);
						console.log(JSON.parse(res.data.content[0].content));
						this.bannerList = banner;
						this.showColumn = recommended.show;
						if (this.showColumn) {
							this.columnList = recommended.list;
						}
						// 抽取法律专题id
						const _ids = await coreFeatures.list[0].list.map(item => {
							return item.id;
						});
						this.appList = coreFeatures.list[1].list; // 法律应用
						// 热点资讯id集合
						this.newsIdList = [];
						coreFeatures.list[2].list.forEach(item => {
							if (item.industryId && item.industryId !== 0) {
								this.newsIdList.push(`${item.id}-${item.industryId}`)
							} else {
								this.newsIdList.push(item.id.toString());
							}
						})
						this.getCoreFeatures(_ids);
						this.getHotPoints();
					}
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: '系统问题，请稍后再试！',
						showCancel: false,
						confirmText: '知道了',
						confirmColor: '#007AFF'
					})
				}
			},
			/**
			 * 根据专题id法律专题信息
			 * @param {Object} ids
			 */
			async getCoreFeatures(ids) {
				const res = await this.$u.api.getCoreFeatures(ids);
				// 随机咨询人数
				res.data.forEach(item => {
					item.count = this.$u.random(200000, 400000)
				})
				this.subjectList = res.data;
			},
			/**
			 * 获取热点咨询
			 */
			async getHotPoints() {
				const res = await this.$u.api.getHotPoint({
					currentpage: this.newPage,
					eventId: getApp().globalData.eventId,
					idList: this.newsIdList,
					limit: 10,
					location: this.cityName
				})
				res.data.forEach(item => {
					item.postTime = this.$u.utils.calculateTime(item.postTime)
				})
				this.newsList = res.data;
			},
			/**
			 * @param {Object} index tab点击
			 */
			handleTabChange(index) {
				this.tabCurrent = index;
				if (this.tabCurrent === 2) {
					// this.getHotPoints();
				}
			},
			/**
			 * @param {Object} id 咨询id
			 */
			handleNewsDetail(id, index) {
				this.$u.route({
					url: 'pages/news/detail',
					params: {
						id: id,
						isHot: index
					}
				})
			},
			/**
			 * 跳转到问答环节
			 */
			handleQuestion() {
				this.$u.route({
					url: 'pages/qa-question/index'
				})
			},
			/**
			 * 跳转登录
			 */
			handleLogin() {
				const url = getCurrentPages()[0].route;
				console.log('url:', url)
				this.$u.route({
					url: 'pages/login/index'
				})
			},
			/**
			 * banner跳转
			 */
			handleBannerClick(banner) {
				const _path = banner.jumpUrl === '/qa-question' ? 'pages/qa-question/index' : banner.jumpUrl;
				if (banner.jump === 1 || banner.jump === 0) {
					this.$u.route({
						url: _path
					})
				}
			},
			/**
			 * 法律专题点击
			 * @param {Object} item
			 */
			handleTopicClick(item) {
				this.$u.route({
					url: 'pages/topic/index',
					params: {
						topicId: item._id,
						topic: decodeURIComponent(item.subject_name)
					}
				})
			}
		},
		onLoad() {
			this.initSubjectInfo();
		}
	}
</script>

<style lang="less">
	@import "./index";
</style>
