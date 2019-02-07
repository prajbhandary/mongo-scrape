//require
var express = require ("express");
var db = require ("./models");
var PORT =  process.env.PORT ||3000;
var axios = require ("axios");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

var app = express();

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ exteded: true }));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, function(err) {
	if(err) throw err;
	console.log('database connected');
});

app.get("/scrape", function(req, res) {
	axios.get("https://www.teamtalk.com/").then(function(response) {
	  var $ = cheerio.load(response.data);
  	  $(".articleList__item").each(function(i, element) {
		var result = {};
		
		result.link = $(this)
		.children("a")
		.attr("href");
		result.title = $(this)
		.children("a")
		.children("figure")
		.children("figcaption")
		.children("h3")
		.text();
		result.img = $(this)
		.children("a")
		.children("figure")
		.children("span")
		.children("img")
		.attr("data-src")
		

		db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
		//console.log(result.text)
	  });
	  res.send("Scrape Complete");
	});
  });
   

  app.get("/articles", function(req, res) {
	// Grab every document in the Articles collection
	db.Article.find({})
	  .then(function(dbArticle) {
		// If we were able to successfully find Articles, send them back to the client
		res.json(dbArticle);
	  })
	  .catch(function(err) {
		// If an error occurred, send it to the client
		res.json(err);
	  });
  });



app.listen(PORT,function(){
    console.log ("Server Starting at PORT " + PORT);
})