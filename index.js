const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // needed for sqlite
};

const db = knex(knexConfig);

// server
const server = express();

// Middleware
server.use(helmet());
server.use(express.json());

// GET all
server.get("/api/cohorts", async (req, res) => {
  try {
    const cohort = await db("cohorts");
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Students test
server.get("/api/students", async (req, res) => {
    try {
      const student = await db("students");
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// GET by id
server.get("/api/cohorts/:id", async (req, res) => {
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET students by cohort id
server.get("/api/cohorts/:id/students", async (req, res) => {
    try {
      const cohort = await db("cohorts")
        .join('students', 'students.cohort_id', 'cohorts.id')
        .select('students.id', 'students.name')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

const errors = {
  "19": "Another record with that value exists"
};

// POST
server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

// UPDATE
server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// DELETE
server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch (error) {}
});

// Listen on...
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
