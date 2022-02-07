import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

// create a doua entitate master-detail - bootstrap form
function CreateReference() {
    // state-uri
    const [title, setTitle] = useState("");
    const [date , setDate] = useState(new Date());
    const [id, setId] = useState(0);
    const [authors, setAuthors] = useState("");

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/article/${id}/reference`, {
            title,
            date,
            authors,
            articleId: id
        })  
    }

    return (
        <Container>
        <Row className="my-4">
            <Col md={6} className="text-center mx-auto">
                <h3>Create reference</h3>
            </Col>
        </Row>
        <Row>
            <Col md={4} className="mx-auto">
            <Form>

            <Form.Group className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control type="number" placeholder="id" value={id} onChange={e => setId(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Titlu</Form.Label>
                <Form.Control type="text" placeholder="titlu" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Autori</Form.Label>
                <Form.Control type="url" placeholder="autori" value={authors} onChange={e => setAuthors(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
            </Form.Group>



            <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
            </Col>
        </Row>
    </Container>
        
    );
}

export default CreateReference;
