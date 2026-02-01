const Board = require("../models/Board");
const List = require("../models/List");

const createList = async (req, res) => {
  try {
    const { title, boardId } = rea.body;

    if (!title || !boardId) {
      return res.status(400).json({ message: "Title and boardId required" });
    }

    const board = await Board.findById(boardId).populate("Workspace");

    if (!board || !board.workspace.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const list = new List({
      title,
      board: boardId,
    });

    await list.save();

    res.status(201).json(list);
  } catch (error) {}
};
