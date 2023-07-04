import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalResult.scss';

const ModalResult = (props) => {
    const { show, setShow, dataResult } = props;
    let score = (dataResult.countCorrect / dataResult.countTotal) * 10;
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your result</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body-result">
                    <div className="correct-answer-container">
                        <span>Correct answer: </span>
                        <div className="correct-answer">
                            {dataResult.countCorrect} / {dataResult.countTotal}{' '}
                        </div>
                    </div>
                    <div className="score-container">
                        <span>Score: </span>
                        <div className="score">{score.toFixed(1)}</div>
                    </div>
                    <div className="pass-fail">
                        {score >= 5 ? <span className="pass">PASS</span> : <span className="fail">FAIL</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Show answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalResult;
