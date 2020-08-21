<script>
	export default {
		globalData: {
			userId: '', // 用户ID
			phone: '', // 手机号（问答流程的id）
			eventId: '', // 机构ID
			source: '', // 机构标识
			type: 'h5' // mp
		},
		onLaunch: function(opt) {
			console.log('App Launch:', opt);
			// 判断当前用户是否登录
			const userInfo = uni.getStorageSync('user-info');
			if (userInfo && userInfo.name) {
				this.$scope.globalData.userId = userInfo.id;
				this.$scope.globalData.phone = userInfo.name;
			} else {
				// 首次进入生成用户id
				this.$scope.globalData.userId = this.$u.guid(16);
			}
			// 缓存机构信息
			const {
				eventId,
				source,
				type
			} = opt.query;
			uni.setStorageSync('event-info', {
				id: eventId,
				source,
				type
			});
			// 将机构信息存入
			if (!this.$u.test.isEmpty(eventId)) {
				this.$scope.globalData.eventId = eventId;
			}
			if (!this.$u.test.isEmpty(source)) {
				this.$scope.globalData.source = source;
			}
			if (!this.$u.test.isEmpty(type)) {
				this.$scope.globalData.type = type;
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	@import "./uview-ui/index.scss";
</style>
