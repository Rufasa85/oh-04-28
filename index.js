const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "movies_db",
  },
  console.log("connect!")
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/movies", (req, res) => {
  db.query(`SELECT * FROM movies`, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "oh noes!", err: err });
    }
    res.json(data);
  });
});

app.get("/api/reviews", (req, res) => {
    db.query(`SELECT movie_name AS title,review FROM reviews
    JOIN movies
    ON reviews.movie_id=movies.id`, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "oh noes!", err: err });
        }
        res.json(data);
      });
});

app.post("/api/new-movie", (req, res) => {
  db.query(`INSERT INTO movies(movie_name) VALUES(?)`,req.body.movie_name,(err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "oh noes!", err: err });
      }
      res.json(data);
    }
  );
});

app.put("/api/review/:id", (req, res) => {
    db.query(`UPDATE reviews SET review=? WHERE id = ?`,[req.body.review,req.params.id],(err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "oh noes!", err: err });
        }
        res.json(data);
      }
    );
});

app.delete("/api/movie/:id", (req, res) => {
    db.query(`DELETE FROM movies WHERE id = ?`,req.params.id,(err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "oh noes!", err: err });
        }
        res.json(data);
      }
    );
});

app.listen(PORT, () => {
  console.log(`listenin on port ${PORT}!`);
});
