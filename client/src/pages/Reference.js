import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";


const baseUrl = "/article"

// read a doua entitate - master - detail
function Reference() {
    // id-ul din url
    const {id, articleId} = useParams();

    const [data, setData] = useState([]);

    const [dataUrl, setDataUrl] = useState(`${baseUrl}/${articleId}/reference/${id}`);

    // preluam datele din server
    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);
    }, [dataUrl]);

    return (
        <>
        <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center" md={8}>
                    <h3>{data.title}</h3>
                    <p>Autori: {data.authors}</p>
                    <p>Data: {data.date}</p>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Reference;