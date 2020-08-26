const xiaofaBaseUrl = 'https://xiaofa.aegis-info.com/api/'
const install = (Vue, vm) => {
	// 获取客观题
	const getObjectiveQuestions = (params = {}) => vm.$u.get('http://ai-model.aegis-info.com/exam/objective/questions',
		params);
	// 获取客观题解析
	const getObjectiveResult = (params = {}) => vm.$u.post('http://ai-model.aegis-info.com/exam_answer/predict', params);
	// 获取主观题大题
	const getSubjectQuestion = (params = {}) => vm.$u.get('http://ai-model.aegis-info.com/exam/subjective/problems',
		params);
	// 获取主观题小题
	const getSubjectSubQuestion = (params = {}) => vm.$u.get('http://ai-model.aegis-info.com/exam/subjective/questions',
		params);
	// 获取学生回答
	const getSubjectAnswer = (params = {}) => vm.$u.get('http://ai-model.aegis-info.com/exam/subjective/answers', params);
	// 获取主观题解析
	const getSubjectResult = (params = {}) => vm.$u.post('http://ai-model.aegis-info.com/exam_score_test/rate', params);

	vm.$u.api = {
		getObjectiveQuestions,
		getObjectiveResult,
		getSubjectQuestion,
		getSubjectSubQuestion,
		getSubjectAnswer,
		getSubjectResult
	}
}

export default {
	install
}
