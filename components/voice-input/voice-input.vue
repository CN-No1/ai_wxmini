<template>
	<view>
		<view class="voice-content">
			<u-field v-model="content" placeholder="请输入文本" type="textarea" :clearable='false' label-width='0' maxlength='500'>
			</u-field>
		</view>
		<view class="echo-btn" :class="recordState?'orange':'green'" @touchstart="touchStart" @touchcancel='touchEnd'
		 @touchend="touchEnd">按住语音输入
		</view>
	</view>
</template>

<script>
	const app = getApp();
	//引入插件：微信同声传译
	const plugin = requirePlugin('WechatSI');
	//获取全局唯一的语音识别管理器recordRecoManager
	const manager = plugin.getRecordRecognitionManager();
	export default {
		props: {
			inputContent: { // 选择框的placeholder
				type: String,
				default: '请输入文本',
			},
		},
		data() {
			return {
				recordState: false, //录音状态
				content: '', //内容
			}
		},
		watch: {
			inputContent(newVal, oldVal) {
				this.content = newVal;
			},
		},
		mounted() {
			this.initRecord()
		},
		methods: {
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {
				//识别语音
				this.initRecord();
			},
			// 手动输入内容
			conInput: function(e) {
				this.content = e.detail.value;
			},
			//识别语音 -- 初始化
			initRecord: function() {
				const that = this;
				// 有新的识别内容返回，则会调用此事件
				manager.onRecognize = function(res) {
					console.log(res)
				}
				// 正常开始录音识别时会调用此事件
				manager.onStart = function(res) {
					console.log("成功开始录音识别", res)
				}
				// 识别错误事件
				manager.onError = function(res) {
					console.error("error msg", res)
				}
				//识别结束事件
				manager.onStop = function(res) {
					console.log('..............结束录音')
					console.log('录音临时文件地址 -->' + res.tempFilePath);
					console.log('录音总时长 -->' + res.duration + 'ms');
					console.log('文件大小 --> ' + res.fileSize + 'B');
					console.log('语音内容 --> ' + res.result);
					if (res.result == '') {
						wx.showModal({
							title: '提示',
							content: '听不清楚，请重新说一遍！',
							showCancel: false,
							success: function(res) {}
						})
						return;
					}
					var text = that.content + res.result;
					that.content = text;
				}
			},
			//语音  --按住说话
			touchStart: function(e) {
				this.recordState = true
				// 语音开始识别
				manager.start({
					lang: 'zh_CN', // 识别的语言，目前支持zh_CN en_US zh_HK sichuanhua
				})
			},
			//语音  --松开结束
			touchEnd: function(e) {
				this.recordState = false
				// 语音结束识别
				manager.stop();
			},
		}
	}
</script>

<style lang="less">
	.echo-btn {
		text-align: center;
		width: 380upx;
		height: 72upx;
		background: rgba(47, 126, 249, 1);
		border-radius: 8upx;
		font-size: 32upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 45upx;
		padding: 14upx 73upx;
		margin: auto;
		margin-top: 24upx;
	}

	.green {
		background: rgba(47, 126, 249, 1);
	}

	.orange {
		background-color: rgba(44, 70, 241, 1);
	}
</style>
