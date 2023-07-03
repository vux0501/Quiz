import React from 'react';
import _ from 'lodash';
import Form from 'react-bootstrap/Form';

const Question = (props) => {
    const { data, index } = props;
    if (_.isEmpty(data)) {
        return <></>;
    }

    return (
        <>
            <div className="question">
                Question {index + 1}. {data.questionDescription}
            </div>
            <div className="question-content">
                {data.questionImage && (
                    <div className="q-image">
                        <img src={`data:image/jpge;base64,${data.questionImage}`} alt="not found" />
                    </div>
                )}
                <div className="answer">
                    {data.answers &&
                        data.answers.length > 0 &&
                        data.answers.map((answer, index) => {
                            return (
                                <Form key={`answer-${index}`}>
                                    <Form.Check type={'checkbox'} label={answer.description} id={answer.description} />
                                </Form>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Question;
