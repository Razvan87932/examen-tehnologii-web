import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function findById(array, id) {
    return array.findIndex((d) => d.id === id);
}


const baseUrl = "/article";

// read pentru prima entitate
function Article() {
    // id-ul din url
    const {id} = useParams();

    const [data, setData] = useState([]);
    const [reference, setreference] = useState([]);
    const [change, setChange] = useState(false);

    const [dataUrl, setDataUrl] = useState(`${baseUrl}/${id}`);

    // preluam datele, datele article si references
    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);

        const newreference = await axios.get(`${dataUrl}/reference`)

        setreference(newreference.data);
    }, [dataUrl, change]);

    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    const expandRow = (row) => {
        console.log(":::", row);
        return (
            <div>
              {/* buton view */}
            <Button className="mx-2" size="sm" onClick={(e) => navigateTo(e, `/articleview/${id}/reference/${row.data.id}`)}>View</Button>
            {/* buton delete - DELETE pentru a doua entitate */}
            <Button variant="danger" className="mx-2" size="sm" onClick={(e) => {
                axios.delete(`/article/${id}/reference/${row.data.id}`);
                setChange(!change);
            }}>Delete</Button>
          </div>
        );
    }

    const handleEdit = (field) => (row) => (e) => {
        const newRow = { ...row };

        newRow[field] = e.target.innerText;


        const newData = reference.slice(0);

        newData[findById(reference, row.id)] = newRow;

        const update = {};

        update[field] = newRow[field];


        axios.put(`/article/${id}/reference/${row.id}`, update)

        setChange(!change);
    };

    const columns = [
        {
            name: "Id",
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            cell: (row) => (
                <div
                    contentEditable
                    supressContentEditableWarning={true}
                    onBlur={handleEdit("title")(row)}
                >
                    {row.title}
                </div>
            ),
        },
        {
            name: "Authors",
            selector: (row) => row.authors,
            sortable: true,
            cell: (row) => (
                <div
                    contentEditable
                    supressContentEditableWarning={true}
                    onBlur={handleEdit("authors")(row)}
                >
                    {row.authors}
                </div>
            ),
        },
        {
            name: "Date",
            selector: (row) => row.date,
            sortable: true
        },
    ];

    return (
        <>
        {/* layout grid */}
        <Container>
            <Row className="my-4">
                <Col className="mx-auto text-center" md={8}>
                    {/* detaliile articleei */}
                    <h2>Articol</h2>
                    <p>Data: {data.creationDate}</p>
                    <p>Titlu: {data.title}</p>
                </Col>
            </Row>
            <Row className="my-4">
                    <Col md={12} className="mx-auto">
                        <DataTable title="References"
                            columns={columns}
                            expandableRows
                            expandableRowsComponent={expandRow}
                            data={reference}/>
                            
                    </Col>
                </Row>
        </Container>
        </>
    );
}

export default Article;