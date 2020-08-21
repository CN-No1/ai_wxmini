<template>
	<view class="case-detail-page">
		<image class="banner" src="../../static/banner/banner_case.png"></image>
		<view class="case-info-wrap">
			<view class="case-desc">
				<view class="title item">案件描述</view>
				<view class="voice-input item">
					<view class="btn">
						<image src="../../static/icon/icon_voice@2x.png"></image><text>语音输入</text>
					</view>
				</view>
			</view>
			<view class="textarea-input">
				<u-input type="textarea" v-model="caseDesc" :clearable="false" height="300" border placeholder="请在此处详细描述案件情况及想要律师提供些什么帮助等…"
				 placeholder-style="color:#9BA0A4;font-size:26rpx;line-height:42rpx;" maxlength="512" :auto-height="false"
				 border-color="#EEEEEE" :custom-style="customStyle"></u-input>
			</view>
			<view class="image-wrap">
				<u-upload :action="uploadAction" max-count="6" ref="uUpload" width="152" :custom-btn="true" del-bg-color="#333333"
				 @on-success="handleSuccess" @on-remove="handleRemove">
					<view slot="addBtn" :class="uploadImg.length === 3 ? 'slot-btn margin-left-0': 'slot-btn'">
						<image src="../../static/icon/upload_icon.png" class="upload-img"></image>
						<view class="text">上传照片</view>
					</view>
				</u-upload>
			</view>
			<view class="select-wrap case-stage-wrap u-border-bottom u-border-top" @click="showCaseStage = true">
				<view class="label">涉案金额</view>
				<view class="value">
					<text class="text">{{caseStageLabel || '请选择'}}</text>
					<image src="../../static/icon/icon_next@2x.png"></image>
				</view>
				<!-- <u-select v-model="showCaseStage" :list="caseStageData" :safe-area-inset-bottom="true" title="案情阶段"></u-select> -->
			</view>
			<view class="select-wrap emergency-wrap u-border-bottom" @click="showEmergency = true">
				<view class="label">紧急程度</view>
				<view class="value">
					<text class="text">{{emergencyLabel || '请选择'}}</text>
					<image src="../../static/icon/icon_next@2x.png"></image>
				</view>
			</view>
			<view class="radio-wrap">
				<u-radio con-size="30rpx" :name="isrRadio" @change="handleRadioChange">
					<view class="text">同意<text>《隐私协议》《免责声明》</text></view>
				</u-radio>
			</view>
		</view>
		<u-picker mode="selector" v-model="showCaseStage" :default-selector="[0]" range-key="label" :range="caseStageData"
		 @confirm="handleConfirmCaseStage()"></u-picker>
		<u-picker mode="selector" v-model="showEmergency" :default-selector="emergency" range-key="label" :range="emergencyData"
		 @confirm="handleConfirmEmergency()"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCaseStage: false,
				showEmergency: false,
				caseStageData: [{
						value: 1,
						label: '未立案'
					},
					{
						value: 2,
						label: '法院审理阶段'
					},
					{
						value: 3,
						label: '执行阶段或已结案'
					}
				],
				emergencyData: [{
						value: 1,
						label: '紧急'
					},
					{
						value: 2,
						label: '特别紧急'
					}
				],
				caseDesc: '', // 案件描述
				customStyle: {
					'border-radius': '10px',
					'padding': '24rpx 18rpx',
					'line-height': '36rpx',
					'color': '#333333',
					'font-size': '28rpx'
				},
				uploadAction: 'https://t-xiaofa-lawyer.aegis-info.com/mall-im/api/common/uploadFile',
				uploadImg: [],
				caseStage: 1, // 案情阶段
				caseStageLabel: '',
				emergency: 1, // 紧急程度
				emergencyLabel: '',
				isrRadio: '1', // 是否同意
			};
		},
		mounted() {
			this.caseStageLabel = this.caseStageData.find(_x => _x.value === this.emergency).label;
			this.emergencyLabel = this.emergencyData.find(_x => _x.value === this.emergency).label
		},
		methods: {
			/**
			 * 图片上传成功
			 * @param {Object} data
			 * @param {Object} index
			 * @param {Object} lists
			 */
			handleSuccess(data, index, lists) {
				if (data && data.code === 200) {
					this.uploadImg.push(data.data);
				}
			},
			/**
			 * 移除图片
			 * @param {Object} index
			 * @param {Object} lists
			 */
			handleRemove(index, lists) {
				this.uploadImg.splice(index, 1);
			},
			/**
			 * 案情阶段确认
			 */
			handleConfirmCaseStage(index) {
				const {
					value,
					label
				} = this.caseStageData.find((_x, _i) => _i === index[0]);
				this.caseStage = value;
				this.caseStageLabel = label
			},
			/**
			 * 紧急程度确认
			 * @param {Object} index
			 */
			handleConfirmEmergency(index) {
				const {
					value,
					label
				} = this.emergencyData.find((_x, _i) => _i === index[0]);
				this.emergency = value;
				this.emergencyLabel = label
			},
			handleRadioChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	.case-detail-page {
		.banner {
			height: 310upx;
			width: 100%;
		}

		.case-info-wrap {
			padding: 32upx 32upx 32upx 0;
			box-sizing: border-box;

			.case-desc {
				display: flex;
				align-items: center;
				margin-bottom: 12upx;
				padding-left: 40upx;
				box-sizing: border-box;

				.item {
					flex: 0 0 50%;

					&.title {
						font-size: 32upx;
						color: #131415;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: Regular;
					}

					&.voice-input {
						text-align: right;
					}

					.btn {
						padding: 12upx 20upx;
						box-sizing: border-box;
						background: rgba(249, 252, 255, 1);
						box-shadow: 0 0 8upx 0 rgba(0, 51, 95, 0.24);
						border-radius: 30px;
						display: inline-block;
						font-size: 24upx;
						color: #007EFF;
						font-family: PingFangSC-Regular, PingFang SC;

						image {
							width: 18upx;
							height: 28upx;
							margin-right: 8upx;
							vertical-align: text-top;
						}
					}
				}
			}

			.textarea-input {
				padding-left: 40upx;
				box-sizing: border-box;
			}

			.image-wrap {
				margin-top: 26upx;
				margin-bottom: 60upx;
				padding-left: 40upx;
				box-sizing: border-box;

				&.margin-left-0 {}

				.u-list-item {
					margin: 20upx 20upx 0 20upx;
					box-sizing: border-box;
					border-width: 0;
					overflow: visible;

					&:first-child {
						margin-left: 0;
					}

					image {
						width: 152upx;
						height: 152upx;
					}

					.u-delete-icon {
						top: -20upx;
						right: -16upx;
					}

					.u-error-btn {
						background-color: rgba(0, 0, 0, .4);
					}
				}

				.slot-btn {
					border-radius: 10upx;
					border: 2px dashed rgba(0, 126, 255, 1);
					text-align: center;
					padding: 18upx 20upx 20upx 20upx;
					box-sizing: border-box;
					margin-top: 20upx;
					// margin-left: 10upx;

					.upload-img {
						width: 64upx;
						height: 64upx;
					}

					.text {
						color: #9BA0A4;
						font-size: 26upx;
						font-family: PingFangSC-Regular, PingFang SC;
					}
				}
			}

			.select-wrap {
				padding: 38upx 8upx 38upx 40upx;
				box-sizing: border-box;
				display: flex;

				.label {
					color: #131415;
					font-size: 32upx;
					flex: 0 0 260upx;
					font-family: PingFangSC-Regular, PingFang SC;
				}

				.value {
					display: flex;
					align-items: center;
					flex: 1;

					.text {
						flex: 1;
						text-align: right;
						font-size: 26upx;
						color: #656C74;
					}

					image {
						width: 24upx;
						flex: 0 0 24upx;
						height: 24upx;
						margin-left: 8upx;
					}
				}
			}

			.radio-wrap {
				padding-top: 28upx;
				padding-left: 40upx;

				.text {
					color: #666666;
					font-size: 22upx;
					font-family: PingFangSC-Regular, PingFang SC;

					text {
						color: #007EFF;
					}
				}
			}
		}
	}
</style>
