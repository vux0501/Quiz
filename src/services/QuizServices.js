import axios from '../utils/axiosCustomize';

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
};

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
    return axios.post('/api/v1/quiz-submit', { ...data });
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
    //submit data
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);

    return axios.post('api/v1/quiz', data);
};

export { getQuizByUser, getDataQuiz, postSubmitQuiz, postCreateNewQuiz };
