const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("Hello from NodeJS!");
});

const PORT = process.env.PORT || 3000;
const fs = require('fs');

fs.readFile(__dirname + "/Assets/story.txt", (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});