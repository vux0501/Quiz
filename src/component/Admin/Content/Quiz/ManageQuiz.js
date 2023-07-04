import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './ManageQuiz.scss';
import Select from 'react-select';
import { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { postCreateNewQuiz } from '../../../../services/QuizServices';
import { toast } from 'react-toastify';

const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [descripton, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState(options[0]);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [inputImageValue, setInputImageValue] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            setInputImageValue(event.target.files[0].mozFullPath);
        } else {
            setPreviewImage('');
        }
    };
    console.log(name, descripton, difficulty, image, previewImage);
    const handleClear = () => {
        setName('');
        setDescription('');
        setImage('');
        setPreviewImage(null);
        setInputImageValue('');
    };

    const handleSubmit = async () => {
        if (!name) {
            toast.error('Please provide a name');
            return;
        }
        if (!descripton) {
            toast.error('Please provide a descripton');
            return;
        }
        if (!image) {
            toast.error('Please update an image');
            return;
        }
        let res = await postCreateNewQuiz(descripton, name, difficulty?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClear();
        }
    };
    return (
        <div className="manage-quiz-container">
            <div className="title">Manage Quizzes</div>
            <hr />
            <div className="add-new">
                <fieldset className="border border-2 rounded-3 rounded-lg p-3">
                    <legend className="float-none w-auto px-3">Add new quiz</legend>
                    <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="."
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingDescription" label="Description">
                        <Form.Control
                            type="text"
                            placeholder="."
                            value={descripton}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                    </FloatingLabel>
                    <Select
                        isSearchable={false}
                        className="my-3"
                        defaultValue={difficulty}
                        onChange={setDifficulty}
                        options={options}
                    />
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control
                            value={inputImageValue}
                            accept="image/png, image/jpeg"
                            type="file"
                            onChange={(event) => handleUploadImage(event)}
                        />
                        <div className="image-container">
                            <div className="img-preview">
                                {previewImage ? <Image src={previewImage} /> : <span>Preview Image</span>}
                            </div>
                        </div>
                    </Form.Group>
                    <div className="btn-container">
                        <Button variant="secondary" onClick={() => handleClear()}>
                            Clear
                        </Button>
                        <Button variant="primary" onClick={() => handleSubmit()}>
                            Save
                        </Button>
                    </div>
                </fieldset>
            </div>
            <div className="list-quiz">table</div>
        </div>
    );
};

export default ManageQuiz;
