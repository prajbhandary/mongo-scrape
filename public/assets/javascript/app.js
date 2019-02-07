$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      //"<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>"
      $("#articles").append("<div class=" +'"card w-30"> <div class="card-body">' 
      + "<h5 class=" + '"card-title"' + "data-id='" + data[i]._id + "'>"+data[i].title+"</h5>"
      + "<p class=" +'"card-text">'+"<a href="+data[i].link+">"+ data[i].link +"</a></p>"
      + "<a href=" + '"#"'+ "class=" +'"btn btn-primary">'+"Save Article</a>"
      + "<a href=" + '"#"'+ "class=" +'"btn btn-primary">'+"Delete Article</a>"
       + "</div></div>");
    }
  });











