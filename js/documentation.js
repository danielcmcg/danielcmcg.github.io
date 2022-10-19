window.onload = function() {
  FetchPostFromURL();
}

function FetchPostFromURL() {
  const queryString = window.location.search;
  var postId = queryString.substring(1);
  if (postId != "") {
    ReadPost(postId);
  } else {
    ReadPostsTitles();
  }
}

function ReadPost(id) {
  var rawFile = new XMLHttpRequest();
  var path = "documentation/documents/" + id;
  rawFile.open("GET", path, true);
  rawFile.onload = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        var converter = new showdown.Converter();
        const lastModifiedDate = new Date(rawFile.getResponseHeader('Last-Modified'));
        document.getElementById("PostBody").innerHTML = converter.makeHtml(allText);
      } else {
        document.getElementById("PostBody").innerHTML = "Post not found.";
      }
    }
  }
  rawFile.send(null);
}

function ReadPostsTitles() {
  var converter = new showdown.Converter();
  document.getElementById("PostBody").innerHTML = converter.makeHtml(
    "### Documents\n"
  );

  var rawFile = new XMLHttpRequest();
  var path = "documentation/titles";
  rawFile.open("GET", path, true);
  rawFile.onload = function() {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;

        var titles = allText.split("\n");

        for (var i = 0; i < titles.length; i++) {
          if (titles[i] != "") {
            document.getElementById("PostBody").innerHTML += converter.makeHtml(
              "- [" + titles[i] + "](/documentation.html?" + titles[i].replaceAll(" ", "_") + ")\n"
            );
          }
        }
      }
    }
  }

  rawFile.send(null);
}
