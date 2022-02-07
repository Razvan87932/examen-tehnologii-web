import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

function findById(array, id) {
    return array.findIndex((d) => d.id === id);
}

const baseUrl = "/articles?limit=10&sortcol=id&sort=ASC";

function Articles() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [sortcol, setSortcol] = useState("id");
    const [sort, setSort] = useState("ASC");
    const [dataUrl, setDataUrl] = useState(baseUrl);
    const [change, setChange] = useState(false);

    const handlePageChange = async (page) => {
        setDataUrl(
            `/articles?limit=10&skip=${
                (page - 1) * 10
            }&sortcol=${sortcol}&sort=${sort}`
        );
        setPage((page - 1) * 10);
    };

    const handleSort = async (col, sortdir) => {
        setDataUrl(
            `/articles?limit=10&skip=${page}&sortcol=${
                col.sortField
            }&sort=${sortdir.toUpperCase()}`
        );
        setSort(sortdir.toUpperCase());
        setSortcol(col.sortField);
    };

    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);
    }, [dataUrl, change]);

    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    const handleEdit = (field) => (row) => (e) => {
        const newRow = { ...row };

        newRow[field] = e.target.innerText;

        const newData = data.data.slice(0);

        newData[findById(data.data, row.id)] = newRow;

        const update = {};

        update[field] = newRow[field];

        axios.put(`/article/${row.id}`, update)

        setChange(!change);
    };

    const columns = [
        {
            name: "Id",
            sortable: true,
            selector: (row) => row.id,
            sortField: "id",
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            sortField: "title",
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
            name: "Summary",
            selector: (row) => row.summary,
            sortable: true,
            sortField: "summary",
            cell: (row) => (
                <div
                    contentEditable
                    supressContentEditableWarning={true}
                    onBlur={handleEdit("summary")(row)}
                >
                    {row.summary}
                </div>
            ),
        },
        {
            name: "Creation date",
            selector: (row) => row.creationDate,
            sortable: true,
            sortField: "creationDate",
        },
    ];

    const expandRow = (row) => {
        console.log(":::", row);
        return (
            <div>
                {/* read prima entitate */}
                <Button
                    className="mx-2"
                    size="sm"
                    onClick={(e) => navigateTo(e, `/articleview/${row.data.id}`)}
                >
                    View
                </Button>
                {/* delete prima entiatae */}
                <Button
                    variant="danger"
                    className="mx2-"
                    size="sm"
                    onClick={(e) => {
                        axios.delete(
                            `/article/${row.data.id}`
                        );
                        setChange(!change);
                    }}
                >
                    Delete
                </Button>
            </div>
        );
    };

    return (
        <>
            <Container>
                {/* create pentru prima entitate */}
                <Row className="my-4">
                    <Col md={12} className="mx-auto">
                        <DataTable
                            title="Articole"
                            columns={columns}
                            data={data.data}
                            pagination
                            paginationServer
                            paginationComponentOptions={{
                                noRowsPerPage: true,
                            }}
                            paginationTotalRows={data["length"]}
                            onChangePage={handlePageChange}
                            sortServer
                            onSort={handleSort}
                            expandableRows
                            expandableRowsComponent={expandRow}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Articles;
