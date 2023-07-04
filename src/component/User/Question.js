import React from 'react';
import _ from 'lodash';
import Form from 'react-bootstrap/Form';

const Question = (props) => {
    const { data, index } = props;
    const handleCheckbox = (event, idAnswer, idQuestion) => {
        data.answers.isSelected = true;

        props.handleCheckbox(idAnswer, idQuestion);
    };
    if (_.isEmpty(data)) {
        return <></>;
    }

    return (
        <>
            <div className="question-content">
                {data.questionImage ? (
                    <div className="q-image">
                        <img src={`data:image/jpge;base64,${data.questionImage}`} alt="not found" />
                    </div>
                ) : (
                    <div className="q-image"></div>
                )}
                <div className="question">
                    Question {index + 1}. {data.questionDescription}
                </div>
                <div className="answer">
                    {data.answers &&
                        data.answers.length > 0 &&
                        data.answers.map((answer, index) => {
                            return (
                                <Form className="a-child" key={`answer-${index}`}>
                                    <Form.Check
                                        checked={answer.isSelected}
                                        type={'checkbox'}
                                        label={answer.description}
                                        id={answer.description}
                                        onChange={(event) => handleCheckbox(event, answer.id, +data.questionId)}
                                    />
                                </Form>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Question;
