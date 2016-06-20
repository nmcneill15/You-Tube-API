$(function(){
  var query = "";
  var results;
  $("#next, #prev").hide();

  $("#search-term").on("submit", function(e) {
    e.preventDefault();
    query = $("#query").val();
    getData(query);
    $("#query").val("").focus();
  });

  $("#next").on("click", function(e) {
    e.preventDefault();
    var next = "next";
    getData(query, next);
  });

  $("#prev").on("click", function(e) {
    e.preventDefault();
    var prev = "prev";
    getData(query, prev);
  });

  function getData(searchTerm, nav) {
    var params = {
      maxResults: 10,
      part: 'snippet',
      key: 'AIzaSyAWyHSOKvHq2ue-SufsUvsjWyvmJVmoaaU',
      q: searchTerm
    };

    if (results !== undefined && nav === "next") {
      params.pageToken = results.nextPageToken;
    }
    if (results !== undefined && nav === "prev") {
      params.pageToken = results.prevPageToken;
    }
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.getJSON(url, params, function(data) {
      results = data;
      displayData(results);
    });
  }

  function displayData(data) {
    $("#search-results").empty();
    console.log(data);
    var items = data.items;
    for (i = 0; i < items.length; i++) {
      var thumbnailURL = items[i].snippet.thumbnails.medium.url;
      var videoId = items[i].id.videoId;
      var link = videoLink(videoId);
      var tag = "<a href=" + link + " target=_blank ><img src=" + thumbnailURL + " /></a>";
      $("#search-results").append(tag);
    }
    if (data.hasOwnProperty('nextPageToken')) {
      $("#next").show();
    }
    if (data.hasOwnProperty('prevPageToken')) {
      $("#prev").show();
    }
  }

  function videoLink(vidID) {
    var video = "?v=" + vidID;
    var url = 'https://www.youtube.com/watch';
    return url + video;
  }

});
