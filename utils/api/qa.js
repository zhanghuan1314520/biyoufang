var e = {
    queryQuestionList: "/QA/v3.0/questions",
    qaDetail: "/QA/v3.0/question/{questionId}/answers",
    createQuestion: "/QA/v3.0/question",
    createAnswer: "/QA/v3.0/question/{questionId}/answer",
    qaAdopt: "/QA/v3.0/question/{questionId}/answer/{answerId}/adopt",
    qaLike: "/QA/v3.0/question/{questionId}/answer/{answerId}/like",
    getNoanswerCount: "/QA/v3.0/question/noanswer/count",
    myQuizQa: "/QA/v3.0/questions/myself",
    removeQuizQa: "/QA/v3.0/question/{questionId}",
    myAnswerQa: "/QA/v3.0/answers/myself",
    removeAnswerQa: "/QA/v3.0/question/{questionId}/answer/{answerId}",
    getNoanswerCountInQa: "/QA/v3.0/question/noanswer/count"
};

module.exports = e;