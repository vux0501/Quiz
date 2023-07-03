import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getDataQuiz } from '../../services/QuizServices';
import _ from 'lodash';

const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;

    useEffect(() => {
        fetchQuestion();
    });
    const fetchQuestion = async () => {
        const res = await getDataQuiz(quizId);

        if (res && res.EC === 0) {
            let raw = res.DT;
            let questionImage = null;
            let questionDescription = null;

            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = [];
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            questionImage = item.image;
                        }
                        answers.push(item.answers);
                    });

                    return { questionId: key, answers: answers, questionDescription, questionImage };
                })
                .value();
            console.log(data);
        }
    };

    return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
