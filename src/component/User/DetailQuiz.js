import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getDataQuiz } from '../../services/QuizServices';
import _ from 'lodash';
import { Button } from 'react-bootstrap';

import './DetailQuiz.scss';
import Question from './Question';
import { set } from 'nprogress';

const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);
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
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionId: key, answers: answers, questionDescription, questionImage };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrev = () => {
        if (index === 0) {
            return;
        }
        setIndex(index - 1);
    };

    const handleNext = () => {
        if (index + 1 === dataQuiz.length) {
            return;
        }
        setIndex(index + 1);
    };
    const handleFinish = () => {};
    console.log(dataQuiz);
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find((item) => +item.questionId === +questionId);
        if (question && question.answers) {
            let b = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            question.answers = b;
        }
        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    return (
        <div className="detail-quiz-container container">
            <div className="left-content">
                <div className="title">
                    Quiz #{quizId} : {location?.state?.quizTitile}
                </div>
                <hr />

                <div className="q-content">
                    <Question index={index} data={dataQuiz[index]} handleCheckbox={handleCheckbox} />
                </div>
                <div className="footer">
                    <div className="prev-next-button">
                        <Button variant="secondary" className="mx-auto" onClick={() => handlePrev()}>
                            Prev
                        </Button>
                        <Button variant="primary" className="mx-auto" onClick={() => handleNext()}>
                            Next
                        </Button>
                    </div>
                    <div className="finish-button">
                        <Button variant="warning" className="mx-auto" onClick={() => handleFinish()}>
                            Finish
                        </Button>
                    </div>
                </div>
            </div>
            <div className="right-content">count down</div>
        </div>
    );
};

export default DetailQuiz;
