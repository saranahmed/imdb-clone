const router = require("express").Router();
const Movie = require("../models/Movie");
const movies = require("../config/movies.json");

router.get("/movies", async (req, res) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const limit = Number(req.query.limit) || 0;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genreOptions = [
      "Action",
      "Romance",
      "Comedy",
      "Drama",
      "Crime",
      "Adventure",
      "Sci-fi",
      "Music",
      "Family",
    ];

    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
      .where("genre")
      .in([...genre])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    res.status(200).json(response);
  } catch (error) {
    res.send(500).json({ error: true, message: "Internal server error" });
  }
});

// const insertMovies = async () => {
//   try {
//     const docs = await Movie.insertMany(movies);
//     return Promise.resolve(docs);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// insertMovies()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));

module.exports = router;
