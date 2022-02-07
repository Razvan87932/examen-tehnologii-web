const express = require("express");
const cors = require("cors");
const validator = require("validator");
const path = require("path");

const app = express();

// incarcare modele si init db
const db = require("./models");
db.sequelize.sync();

// json rest api
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


// operatie POST pentru prima entitate
app.post("/article", async (req, res) => {

    if (!req.body.title || req.body.title.length < 3) {
        return res.status(500).send({
            error: "Invalid title size"
        });
    }

    if (!req.body.summary || req.body.summary.length < 10) {
        return res.status(500).send({
            error: "Invalid summary size"
        });
    }

    const article = await db.Article.create({
        ...req.body,
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(article);
});

// operatie GET pentru prima entitate
app.get("/article/:id", async (req, res) => {
    const article = await db.Article.findByPk(req.params.id);

    // 404 daca nu exista
    if (!article) {
        return res.status(404).send();
    }

    return res.status(200).send(article);
});

// operatie PUT pentru prima entitate
app.put("/article/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);

    const article = await db.Article.findByPk(req.params.id);

    // 404 daca nu exista
    if (!article) {
        return res.status(404).send();
    }

    await db.Article.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru prima entitate
app.delete("/article/:id", async (req, res) => {
    await db.Reference.destroy({
        where: {
            articleId: req.params.id
        }
    });

    await db.Article.destroy({
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

// operatie GET pentru prima entitate, paginare, sortare dupa coloana
app.get("/articles", async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.skip) || 0;
    const sortcol = req.query.sortcol;;
    const sort = req.query.sort;

    const cols = ["id", "description", "creationDate"];

    // daca avem o coloana invalida
    if (!cols.includes(sortcol) && sortcol != undefined) {
        return res.status(500).send({
            error: "Invalid sort column"
        });
    }

    // daca avem un mod de sortare incompatibil
    if (sort != "DESC" && sort != "ASC" && sort != undefined) {
        return res.status(500).send();
    }

    const length = (await db.Article.findAll()).length;

    let articles;

    if (sortcol && sort) {
        articles = await db.Article.findAll({
            offset,
            limit,
            order: [[sortcol, sort]]
        });
    } else {
        articles = await db.Article.findAll({
            offset,
            limit
        });
    }

    return res.status(200).send({
        data: articles,
        length
    });
});

// operatie POST pentru a doua entitate ca subresursa
app.post("/article/:id/reference", async (req, res) => {

    if (!req.body.title || req.body.title.length < 5) {
        return res.status(500).send({
            error: "Invalid title size"
        });
    }

    const reference = await db.Reference.create({
        ...req.body,
        articleId: req.params.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(reference);
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/article/:id/reference/:referenceid", async (req, res) => {
    const reference = await db.Reference.findByPk(req.params.referenceid);

    if (!reference) {
        return res.status(404).send();
    }

    return res.status(200).send(reference);
});


// operatie PUT pentru a doua entitate ca subresursa
app.put("/article/:id/reference/:referenceid", async (req, res) => {
    const reference = await db.Reference.findByPk(req.params.id);

    if (!reference) {
        return res.status(404).send();
    }

    await db.Reference.update(req.body, {
        where: {
            id: req.params.referenceid,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru a doua entitate ca subresursa
app.delete("/article/:id/reference/:referenceid", async (req, res) => {
    await db.Reference.destroy({
        where: {
            id: req.params.referenceid,
        },
    });

    return res.status(200).send();
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/article/:id/reference", async (req, res) => {
    const reference = await db.Reference.findAll({
        where: {
            articleId: req.params.id,
        },
    });

    return res.status(200).send(reference);
});

// pornim serverul
app.listen(process.env.PORT || 5000, async () => {
    console.log("app start on 5000");
});
