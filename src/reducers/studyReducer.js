const initiateState = {
  questionsSet: new Set(),
  numberOfQuestions: 0,
  currentTestId: null,
  tests: [],
};

export default function (state = initiateState, action) {
  switch (action.type) {
    case "saveQuestion":
      return {
        ...state,
        numberOfQuestions: state.questionsSet.has(action.payload.id)
          ? state.numberOfQuestions
          : state.numberOfQuestions + 1,
        questionsSet: state.questionsSet.add(action.payload.id),
      };

    case "reset":
      return {
        ...state,
        numberOfQuestions: 0,
        questionsSet: new Set(),
      };
    case "testId":
      return {
        ...state,
        currentTestId: action.payload,
      };
    case "fetchTestsSuccess":
      return {
        ...state,
        tests: action.payload.OBJECT,
      };
    case "fetchTestsFailed":
      return {
        ...state,
        error: action.payload.DESCRIPTION,
      };
    case "fetchQuestionsSuccess":
      return {
        ...state,
        questions: action.payload.OBJECT,
      };
    case "fetchQuestionsFailed":
      return {
        ...state,
        error: action.payload.DESCRIPTION,
      };
    default:
      return state;
  }
}
