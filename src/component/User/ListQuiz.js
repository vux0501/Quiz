import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { getQuizByUser } from '../../services/QuizServices';
import './ListQuiz.scss';

const ListQuiz = () => {
    const [arrQuiz, setArrQuizz] = useState([]);
    useEffect(() => {
        getQuizData();
    }, []);
    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuizz(res.DT);
        }
    };
    return (
        <div className="list-quiz-container container">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        <Card key={index} style={{ width: '18rem' }}>
                            <div className="image-box">
                                <Card.Img variant="top" src={`data:image/jpge;base64,${quiz.image}`} />
                            </div>
                            <Card.Body>
                                <Card.Title>{quiz.id}</Card.Title>
                                <Card.Text>{quiz.description}</Card.Text>
                                <Button variant="primary">Start</Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            {arrQuiz && arrQuiz.length === 0 && <div>You don't have any quiz now</div>}
        </div>
    );
};

export default ListQuiz;
