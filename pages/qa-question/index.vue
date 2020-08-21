<template>
	<view class="qa-question-page">
		<!-- 问答区域 -->
		<scroll-view id="ScrollWrap" :scroll-y="true" :scroll-top="scrollTop" scroll-with-animation="true" class="scroll-wrap">
			<view style="padding-bottom: 228upx;">
				<view class="history-text">查看更多历史消息</view>
				<view class="date-time-text">
					<u-divider color="#A0ACBF" half-width="136" border-color="#A0ACBF" fontSize="22">{{dateVal}}</u-divider>
				</view>
				<view class="default-greeting">
					<image src="../../static/icon/xiaofa-logo@2x.png" class="header-icon"></image>
					<text class="text">法律智能管家小法，竭诚为您服务！</text>
				</view>
				<!-- 推荐问题 -->
				<view class="answer-box box u-border recommend">
					<view class="label">都在问</view>
					<view class="option-wrap">
						<view :class="item.active ? 'option-item u-border-bottom active' : 'option-item u-border-bottom u-line-2'" v-for="(item, index) in recommendData"
						 :key="index" @click="handleOptionClick(item)">
							<text class="u-line-2">{{item.text}}</text>
						</view>
					</view>
					<view class="change-pager" @click="handleChangeRecommend($event)">
						<image src="../../static/common/refush.png" /> 换一批</view>
				</view>
				<view v-for="(item, index) in askList" :key="index" :class="item.type === 1 ? 'question-box box' : 'answer-box box'">
					<view class="box-content" v-if="item.type === 1">
						<text class="read-text">{{item.isRead ? '已读' : '未读'}}</text><text class="text">{{item.text}}</text>
					</view>
					<view v-if="item.type === 3" class="tip-content">
						<view class="tip-text">{{item.text}}</view>
						<view v-if="item.isQueue" class="quit-queue" @click="handleLinSocket()">取消排队</view>
					</view>
					<view v-if="item.type === 2 && item.isChat" class="box-content answer-content chat-content">
						<image v-if="item.header" class="seat-icon" :src="item.header"></image>
						<view :class="item.isImg || item.isFile ? 'chat-message-box' : 'chat-message-box u-border'">
							<view v-if="item.isImg">
								<image class="img-label" :src="item.text"></image>
							</view>
							<view v-else-if="item.isFile">
								<image class="img-label file-label" src="../../static/common/file.png" @click="handleDownloadFile(item.text)"></image>
							</view>
							<view v-else>{{item.text}}</view>
							<view class="button-wrap" v-if="item.showLeaveMessageOpt">
								<image src="../../static/icon/xiaofa_write@2x.png"></image>
								<text>开始留言</text>
							</view>
						</view>
					</view>
					<view v-if="item.type === 2 && item.isOrder" class="box-content answer-content order-content">
						<view class="file-wrap" v-if="item.file && item.isOrder">
							<image v-if="item.isOrder" class="order-image" :src="item.file.img"></image>
						</view>
					</view>
					<view v-if="item.type === 2 && item.isCard" class="box-content answer-content card-content u-border">
						<view class="card-header">
							<view class="card-info">
								<image src="../../static/icon/xiaofa-header-icon@2x.png"></image>
								<text>{{item.title}}</text>
							</view>
							<view class="bottom-border"></view>
						</view>
						<view class="card-text u-line-3">
							<text>{{item.text}}</text>
						</view>
						<view class="card-btn-all">
							<text>全部知识</text>
						</view>
					</view>
					<view v-if="item.type === 2 && item.options && item.options.length > 0" class="box-content answer-content options-content u-border">
						<view class="title">{{item.title}}</view>
						<view v-if="item.option_desc" class="option-desc u-border-bottom">
							<image src="../../static/icon/icon_text.png" />{{item.option_desc}}</view>
						<view v-for="(opt, _index) in item.options" :key="_index" :class="opt.active ? _index === 0 ? 'option-item active' :  'option-item u-border-top active' :  _index === 0 ? 'option-item' : 'option-item u-border-top'"
						 @click="handleOptionClick(opt, item.qId)">
							<text class="u-line-2 option-text">{{opt.text}}</text>
						</view>
					</view>
					<view v-if="item.type=== 2 && item.similar && item.similar.length > 0" class="box-content answer-content options-content u-border">
						<view class="title">{{item.title}}</view>
						<view v-for="(simi, _index) in item.similar" :key="_index" :class="simi.active ? _index === 0 ? 'option-item active' :  'option-item u-border-top active' :  _index === 0 ? 'option-item' : 'option-item u-border-top'"
						 @click="handleOptionClick(simi, item.qId)">
							<text class="u-line-2 option-text">{{simi.text}}</text>
						</view>
					</view>
					<view class="header-image user-header" v-if="item.type === 1">
						<image src="../../static/common/user-header@2x.png"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-wrap">
			<view class="relate-question">
				<view class="label">你可能想</view>
				<view class="relate-list">
					<view class="relate-item u-border" @click="handleCaseDetail()">{{isHuman ? '退出人工咨询' : '人工咨询'}}</view>
					<view v-for="(item, index) in relateData" :key="index" class="relate-item u-border">{{item.name}}</view>
				</view>
			</view>
			<view class="input-wrap">
				<view class="input-box">
					<view class="left-icon">
						<image src="../../static/icon/voice@2x.png"></image>
					</view>
					<view class="input">
						<u-input v-model="inputText" input-align="left" :clearable="false" placeholder="请输入您要咨询的问题" maxlength="120"
						 placeholder-style="color: #65799B;font-size:26rpx;" cursor-spacing="80"></u-input>
					</view>
					<view class="right-icon">
						<image :src="inputText ? '../../static/icon/send-en@2x.png' : '../../static/icon/send@2x.png'" class="send-icon"
						 @click="handleInput()"></image>
						<image src="../../static/icon/more@2x.png" class="plus-icon"></image>
					</view>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
	import WebSocket from '../../common/socket.js';
	const RegImg = /\.(png|jpe?g|gif|svg)(\?.*)?$/; // 校验是否为图片类型
	const QUESTION_TYPE = {
		question: 1, // 问题
		answer: 2, // 答案
		tip: 3, // 提示
		tip_with_cancel: 4 // 提示
	}; // 问答类型
	const ANSWER_OPTION_FLAG = {
		option: 1, // 普通选项
		similar: 2, // 相似问题
		laws: 3, // 相关法条
		cases: 4, // 相关案例
		relate: 5, // 相关问题,
		lawyer: 6 // 律师
	}; // 答案选项的分类
	const IMTextType = {
		text: 1, // 文字
		img: 2, // 图片
		file: 3, // 文件
		order: 4, // 订单
		discount_code: 5, // 优惠券
		product: 6 // 产品
	}; // 小法IM消息类型
	export default {
		data() {
			return {
				eventId: '', // 机构id
				source: '', // source 渠道
				type: '', // 类型
				userId: '', // 用户
				recommendData: [], // 推荐问题
				dateVal: '', // 时间分割线
				askList: [], // 问答数据
				content: '', // 调用小法问答接口
				qId: '', // 当前的qId
				scrollTop: 0, // 滚动高度
				relateData: [], // 你可能想
				isHuman: false, // 是否为IM
				inputText: '', // 输入文本
				socket: null, // websocket对象
				socketConfig: {
					url: 'wss://t-xiaofa-lawyer.aegis-info.com/mall-websockets/ws', // 服务器地址
					limit: 5, // 心跳最大连接数
				},
				lawyerId: 0, // 律师id
				receiveRole: '', // 接收消息的用户角色
				lockReconnect: false, // 是否进行断线重连
				timer: null, // setTimeout 对象
				level1: '', // 法律专题
				level2: '', // 二级法律专题
				riskId: '', // 诉讼风险评估id
				topicId: '' // 法律专题id
			}
		},
		methods: {
			/**
			 *  @param {Object} params: {type:类型,title:标题, text: 内容, options:选项 , option_desc: 选项文案， similar:相似问题, header:头像 ,isHistory:是否是历史消息,qId: 问题ID, isRead: 是否已读,isCard: 是否为知识卡片,isChat: 是否普通话术,showLeaveMessageOpt: 留言,isQueue: 排队, isImg: 是否为图片, isFile: 是否为文件,isOrder: 是否为订单, file: 文件  }
			 */
			pushAskList(params = {
				type: QUESTION_TYPE.question,
				title: '',
				text: '',
				options: [],
				similar: [],
				header: '',
				isHistory: false,
				qId: '',
				isRead: false,
				isCard: false,
				isChat: false,
				showLeaveMessageOpt: false,
				isQueue: false,
				isImg: false,
				isFile: false,
				isOrder: false,
				file: null
			}) {
				this.askList.push({
					...params
				})
				this.$nextTick(() => {
					this.scrollBottom();
				})
			},
			/**
			 * 判断是否登录
			 */
			async isLogin() {
				// 从缓存获取用户登录信息
				const _userInfo = await uni.getStorageSync('user-info');
				if (_userInfo && _userInfo.id && _userInfo.token && _userInfo.phone) {
					return true;
				};
				return false;
			},
			/**
			 * 对接郑总 --- 小法问答接口
			 */
			async lawApi() {
				const qId = this.qId || this.$u.guid(20, false, 8);
				if (!this.$u.test.isEmpty(this.content)) {
					this.pushAskList({
						type: QUESTION_TYPE.question,
						text: this.content,
						isHistory: false,
						isRead: false,
						qId: qId
					});
				}
				const params = {
					content: this.content,
					qid: qId,
					event_ids: getApp().globalData.eventId,
					industry_ids: 1,
					user_id: `${ this.source }_${ this.userId }`,
					category: '',
					topic_id: this.riskId || ''
				};
				const res = await this.$u.api.lawApi(params);
				// 讲当前语料的状态置为：已读
				this.changeMessageStatus();
				this.formatQaAnswer(res.data, false);
			},
			/**
			 * 封装小法问答接口出参
			 */
			formatQaAnswer(data, isHistory = false) {
				const {
					qid,
					card,
					answer,
					similar_question,
					related_questions,
					choices,
					paperwork,
					relate,
					case_registration,
					is_chat
				} = data;
				// 你可能想
				this.relateData = relate;
				// qid
				this.qId = qid;
				// 小法话术
				const _answer = answer ? answer.replace(/\n/g, '') : '';
				// 是否显示【知识卡片】
				const _showCard = (card && card.length > 0) || false;
				// 知识卡片
				if (_showCard) {
					this.pushAskList({
						qId: this.qId,
						type: QUESTION_TYPE.answer,
						title: '知识卡片',
						text: _answer,
						isHistory,
						isCard: true
					})
				}
				// 普通话术
				if (is_chat) {
					this.pushAskList({
						qId: this.qId,
						type: QUESTION_TYPE.answer,
						header: require('../../static/icon/seat_icon.png'),
						text: _answer,
						isHistory,
						isChat: true
					})
				}
				// 选项
				if (choices && choices.length > 0) {
					const _choices = [];
					choices.forEach(item => {
						_choices.push({
							active: false,
							text: item
						})
					})
					this.pushAskList({
						type: QUESTION_TYPE.answer,
						title: '为了提供更精准的解答，请告诉我：',
						isHistory,
						options: _choices,
						option_desc: paperwork ? paperwork : ''
					})
				}
				// 相似问题：有选项则不推荐相似问题
				if (!choices && similar_question && similar_question.length > 0) {
					const _similar = [];
					similar_question.forEach(item => {
						_similar.push({
							active: false,
							text: item
						})
					})
					this.pushAskList({
						type: QUESTION_TYPE.answer,
						title: '你想要咨询的问题可能是：',
						isHistory,
						similar: _similar
					})
				}
				// 相关问题：如果有相似问题，则不推相关问题
				if (!similar_question && related_questions && related_questions.length > 0) {
					const _related = [];
					// 标题
					const _title = case_registration && case_registration.cause ? `为你推荐协议${ case_registration.cause }的相关问题，可查看：` :
						'你可能还想问：';
					related_questions.forEach(item => {
						_related.push({
							active: false,
							text: item
						})
					})
					this.pushAskList({
						type: QUESTION_TYPE.answer,
						title: _title,
						isHistory,
						similar: _related
					})
				}
			},
			/**
			 * 推荐问题
			 */
			async getRecommendData() {
				this.recommendData = [];
				const res = await this.$u.api.getRecommend({
					count: 3,
					event_id: getApp().globalData.eventId,
					user_id: getApp().globalData.userId,
					type: getApp().globalData.type,
					level1: this.level1,
					level2: this.level2,
					topic_id: this.topicId
				});
				res.data.forEach((item, index) => {
					this.recommendData.push({
						text: item,
						index,
						active: false
					})
				})
			},
			/**
			 * 换一批推荐问题
			 */
			handleChangeRecommend(e) {
				this.getRecommendData();
			},
			/**
			 * 修改未读状态为已读
			 */
			changeMessageStatus() {
				for (let i in this.askList) {
					const _i = parseInt(i);
					if (_i === this.askList.length - 1 && this.askList[_i].type === QUESTION_TYPE.question) {
						this.askList[_i].isRead = true;
					}
				}
			},
			/**
			 * 选项选择
			 * @param {Object} opt 选项文本
			 * @param {Object} qId 
			 */
			handleOptionClick(opt, qId) {
				opt.active = true;
				this.qId = qId;
				this.content = opt.text;
				// 调用问题接口
				this.lawApi();
			},
			/**
			 * 输入框文本提交
			 */
			handleInput() {
				this.content = this.inputText;
				if (this.isHuman) {
					this.pushAskList({
						type: QUESTION_TYPE.question,
						text: this.content,
						isHistory: false,
						isRead: false,
						qId: this.$u.guid(10, false, 10)
					});
					this.handleSendSocketMessage(this.content, IMTextType.text)
				} else {
					this.lawApi();
				}
				this.inputText = '';
			},
			/**
			 * 滚动到底部
			 */
			scrollBottom() {
				this.scrollTop = 500 * this.askList.length;
			},
			/**
			 * 文件下载
			 * @param {Object} path 文件地址
			 */
			handleDownloadFile(path) {
				const _this = this;
				uni.downloadFile({
					url: path,
					success(res) {
						_this.$refs.uTips.show({
							title: '文件已经下载',
							type: 'success',
							duration: '2000'
						})
					}
				})
			},
			/**
			 * 补充案情登记表
			 */
			async handleCaseDetail() {
				// 跳转到登录, 携带当前连接，跳转回登录
				const _temp = await this.isLogin();
				if (!_temp) {
					this.$u.route({
						url: 'pages/login/index',
						params: {
							redirct: 'pages/case-detail/index'
						}
					});
				} else {
					this.$u.route({
						url: 'pages/case-detail/index'
					});
				}
			},
			// ===================== websocket ===================
			/**
			 * 创建websocket 对象
			 */
			socketInit() {
				// 创建socket对象
				this.socket = new WebSocket({
					heartCheck: true,
					isReconnection: true,
					uId: this.userId
				});
				// 建立连接
				// 监听websocket状态
				this.socket.onSocketClosed({
					url: this.socketConfig.url,
					success(res) {
						console.log('res:', res)
					},
					fail(err) {
						console.log("onSocketClosed err", err)
					}
				});
				// 监听网络变化
				this.socket.onNetworkChange({
					url: this.socketConfig.url,
					success(res) {
						console.log(res)
					},
					fail(err) {
						console.log("onNetworkChange err", err)
					}
				})
				// 监听服务器返回
				this.socket.onReceivedMsg(res => {
					// 修改语料为：已读
					this.changeMessageStatus();
					const {
						code,
						data,
						msg
					} = JSON.parse(res.data);
					console.log('socket message data', JSON.parse(res.data));
					switch (code) {
						case 17:
							this.lawyerId = data.lawyerId;
							this.receiveRole = data.role;
							this.isHuman = true;
							this.pushAskList({
								type: QUESTION_TYPE.tip,
								text: msg
							});
							break;
						case 1:
							if (data.type === 1) {
								this.pushAskList({
									qId: data.createTime,
									type: QUESTION_TYPE.answer,
									header: require('../../static/icon/im_lawyer.png'),
									text: data.msgContent,
									isChat: true
								})
							} else if (data.type === 2) {
								const isImg = RegImg.test(data.msgContent);
								if (isImg) {
									this.pushAskList({
										qId: data.createTime,
										type: QUESTION_TYPE.answer,
										header: require('../../static/icon/im_lawyer.png'),
										text: data.msgContent,
										isChat: true,
										isImg: true
									})
								}
							} else if (data.type === 3) {
								this.pushAskList({
									qId: data.createTime,
									type: QUESTION_TYPE.answer,
									header: require('../../static/icon/im_lawyer.png'),
									text: data.msgContent,
									isChat: true,
									isFile: true
								})
							} else if (data.type === 5) {
								const {
									orderId,
									lawyerProductId
								} = JSON.parse(data.msgContent);
								this.pushAskList({
									qId: data.createTime,
									type: QUESTION_TYPE.answer,
									// header: require('../../static/icon/im_lawyer.png'),
									file: {
										img: require('../../static/common/lawyer__into_icon@2x.png'),
										orderId,
										lawyerProductId
									},
									isChat: false,
									isOrder: true
								})
							}
							break;
							// 留言
						case 16:
							this.pushAskList({
								type: QUESTION_TYPE.answer,
								header: require('../../static/icon/seat_icon.png'),
								text: msg,
								isChat: true,
								showLeaveMessageOpt: true
							});
							break;
						case 11:
						case 12:
							this.pushAskList({
								type: QUESTION_TYPE.tip,
								text: msg,
								isQueue: true
							});
							break;
						case 19:
							this.handleLinSocket();
							break;
						case 22:
							break;
					}
				})
			},
			/**
			 * 建立、关闭连接
			 */
			handleLinSocket() {
				if (this.isHuman) {
					this.socket.closeWebSocket();
					this.isHuman = false;
					this.pushAskList({
						type: QUESTION_TYPE.tip,
						text: '聊天已结束'
					})
				} else {
					this.pushAskList({
						type: QUESTION_TYPE.tip,
						text: '小法正在帮你连线人工客服，请稍后...'
					})
					this.socket.initWebSocket({
						url: this.socketConfig.url,
						success(res) {
							console.log('websocket success:', res)
						},
						fail(err) {
							console.log("linkWebsocket err", err)
						}
					})
				}
			},
			/**
			 * 发送websocket消息
			 * @param {Object} content 发送内容
			 * @param {Object} type 类型
			 */
			handleSendSocketMessage(content, type) {
				const _param = {
					sendId: this.userId,
					receiveId: this.lawyerId,
					type: type,
					msgContent: content || this.content,
					role: 'xiaofa_user',
					receiveRole: this.receiveRole,
					code: 2
				}
				this.socket.sendWebSocketMsg({
					data: JSON.stringify(_param),
					success(res) {
						console.log('send success:', res)
					}
				})
			}
		},
		mounted() {
			this.socketInit();
		},
		onLoad(opt) {
			const {
				topic,
				topicId,
				subTopicId,
				subTopic,
				content,
				riskId
			} = opt;

			this.userId = getApp().globalData.userId || this.$u.guid(10, false, 10);
			this.dateVal = `今天 ${this.$u.timeFormat(new Date().getTime(), 'hh:MM')}`;
			// 携带问题进入问答
			if (content) {
				this.content = content;
				this.lawApi();
			}
			if (topicId) {
				this.topicId = topicId;
			}
			if (topic) {
				this.level1 = topic;
			}
			if (subTopic) {
				this.level2 = subTopic;
			}
			if (riskId) {
				this.riskId = riskId;
				this.lawApi();
			}
			this.getRecommendData();
		},
		onShow() {}
	}
</script>

<style lang="less">
	@import "./index";
</style>
