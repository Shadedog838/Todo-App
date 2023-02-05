const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool =  require("../db");


// all todos and name
router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// create a todo
router.post("/todos", authorize, async (req, res) => {
  try {
    const { description } =  req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// update a todo
router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description = $ WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
router.delete("/todod/:id", authorize, async(req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error("err.message");
  }
})

module.exports = router;