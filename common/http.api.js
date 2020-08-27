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
	// 获取司法摘要解析
	const getJudicialSummaryResult = (params = {}) => vm.$u.post('http://58.213.45.42:6800/v2/api/summary/sfzy', params);
	// 获取舆情文本解析
	const getPublicSentimentResult = (params = {}) => vm.$u.get('http://domainc.aegis-info.com/domain_predict', params);
	// 获取规则引擎解析
	const getEngineResult = (params = {}) => vm.$u.post('http://tagresolve.aegis-info.com/api/v1/graph/parse/', params);

	vm.$u.api = {
		getObjectiveQuestions,
		getObjectiveResult,
		getSubjectQuestion,
		getSubjectSubQuestion,
		getSubjectAnswer,
		getSubjectResult,
		getJudicialSummaryResult,
		getPublicSentimentResult,
		getEngineResult
	}
}

export default {
	install
}
