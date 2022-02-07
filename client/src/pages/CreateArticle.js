import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

// create prima entitate
function CreateArticle() {
    // state-urile formului
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/article", {
            summary: description,
            title
        });
    };

    return (
        <Container>
            <Row className="my-4">
                <Col md={6} className="text-center mx-auto">
                    <h3>Create article</h3>
                </Col>
            </Row>
            <Row>
                <Col md={4} className="mx-auto">
                    <Form>
                    <Form.Group className="mb-3">
                            <Form.Label>Titlu</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="titlu"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rezumat</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="rezumat"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateArticle;
