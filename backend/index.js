const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// set up prisma
const { PrismaClient } = require("./src/generated/prisma/client.js");
const prisma = new PrismaClient();

// allow all cross-origin requests
const cors = require("cors");
app.use(cors());

// allow server to parse json bodies
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// get array of all boards
app.get("/boards", async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
});

// add new board and respond with newly updated boards
app.post("/boards", jsonParser, async (req, res) => {
    const { created, title, author, category, imgSrc, imgAlt } = req.body;

    await prisma.board.create({
        data: {
            created,
            title,
            author,
            category,
            imgSrc,
            imgAlt,
        },
    });

    const boards = await prisma.board.findMany();
    res.json(boards);
});

// delete board with specified id
app.delete("/boards/:id", async (req, res) => {
    const boardId = Number(req.params.id);

    await prisma.card.deleteMany({
        where: {
            boardId: boardId,
        },
    });

    await prisma.board.delete({
        where: {
            id: boardId,
        },
    });

    const boards = await prisma.board.findMany();
    res.json(boards);
});

// get details of board with specified id
app.get("/boards/:id", async (req, res) => {
    const boardId = Number(req.params.id);

    try {
        const board = await prisma.board.findFirstOrThrow({
            where: {
                id: boardId,
            },
        });

        res.json(board);
    } catch (error) {
        res.status(404).send("Board not found");
    }
});

// get all cards associated with specified board
app.get("/board/cards/:boardId", async (req, res) => {
    const boardId = Number(req.params.boardId);

    const cards = await prisma.card.findMany({
        where: {
            boardId: boardId,
        },
    });
    res.json(cards);
});

// add card to specified board
app.post("/board/cards/:boardId", jsonParser, async (req, res) => {
    const boardId = Number(req.params.boardId);

    const { message, author, imgSrc, imgAlt, upvotes } = req.body;

    await prisma.card.create({
        data: {
            boardId: boardId,
            message: message,
            author: author,
            imgSrc: imgSrc,
            imgAlt: imgAlt,
            upvotes: upvotes,
        },
    });

    const cards = await prisma.card.findMany({
        where: {
            boardId: boardId,
        },
    });
    res.json(cards);
});

// upvote a card
app.post("/card/upvote/:cardId", async (req, res) => {
    const cardId = Number(req.params.cardId);

    try {
        const { upvotes } = await prisma.card.findFirstOrThrow({
            where: {
                id: cardId,
            },
        });

        await prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                upvotes: upvotes + 1,
            },
        });

        const card = await prisma.card.findMany({
            where: {
                id: cardId,
            },
        });

        res.status(200).send();
    } catch (error) {
        res.status(404).send("Card not found");
    }
});

// delete a card
app.delete("/card/:id", async (req, res) => {
    const cardId = Number(req.params.id);

    await prisma.card.delete({
        where: {
            id: cardId,
        },
    });

    res.status(204).send();
});
