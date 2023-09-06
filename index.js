var express = require('express');
const multer = require("multer");
var cors = require('cors');
require('dotenv').config()

const upload = multer({
	dest: "./public/uploads/"
});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), function(req, res) {
	try {
		res.json({
			name: req.file.originalname,
			type: req.file.mimetype,
			size: req.file.size
		})
	} catch (error) {
		res.json({
			error: "No file specified"
		})
	}
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Your app is listening on port ' + port)
});
