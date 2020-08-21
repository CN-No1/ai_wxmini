const xiaofaBaseUrl = 'https://xiaofa.aegis-info.com/api/'
const install = (Vue, vm) => {
	// 获取首页机构配置信息
	const getH5Setting = (params = {}) => vm.$u.get('xiaofa-manager/h5SettingsApi/h5Settings', params);
	// 获取法律专题
	const getCoreFeatures = (params = {}) => vm.$u.post('xiaofa-manager/subjectApi/multi_subject', params);
	// 获取热点资讯
	const getHotPoint = (params = {}) => vm.$u.post('xiaofa-manager/subjectApi/hotPoint', params);
	// 热点资讯详情
	const getHotPointDetails = (params = {}) => vm.$u.get('https://epide.aegis-info.com/api/getInfoById', params);
	// 推荐问题
	const getRecommend = (params = {}) => vm.$u.get(`${xiaofaBaseUrl}law_inference/simple/recommend`, params);
	// 调用小法问答接口
	const lawApi = (params = {}) => vm.$u.post(`${xiaofaBaseUrl}law_inference/simple/law_qa`, params);
	// 获取短信验证码
	const getCode = (params = {}) => vm.$u.get(`sso/getAuthCode`, params);
	// 登录
	const login = (params = {}) => vm.$u.post(`sso/login2`, params,  {'content-type': 'application/x-www-form-urlencoded'});
	// 获取二级专题
	const getSubTopic = (params = {}) => vm.$u.get(`${xiaofaBaseUrl}law_inference/simple/recommend/topic`, params);
	vm.$u.api = {
		getH5Setting,
		getCoreFeatures,
		getHotPoint,
		getHotPointDetails,
		getRecommend,
		lawApi,
		getCode,
		login,
		getSubTopic
	}
}

export default {
	install
}
