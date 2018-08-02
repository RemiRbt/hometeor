import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './pageYoutube.html';

var pageYoutubeTimer;

/* TEMPLATE PAGES */

Template.pageYoutube.onRendered(function () {

  var feed = [];

  var sortByDate = function (a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  feed = [];
  var updateFeed = function () {
    feed = [];
    $("#feed").html("");
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=50&channelId=UC2yYUdgsBE8NB_xak1QBQOQ&key=AIzaSyAEcS2kA6OcxLvH3aGvfotGfnshGTiSM0w',
      dataType: 'json',
      success: function (json) {
        var i = 0;
        $.each(json.items, function (index, value) {
          $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=' + value.snippet.resourceId.channelId + '&maxResults=5&key=AIzaSyAEcS2kA6OcxLvH3aGvfotGfnshGTiSM0w',
            dataType: 'json',
            success: function (json2) {
              $.each(json2.items, function (index2, value2) {
                feed[i] = [];
                feed[i]["title"] = value2.snippet.title;
                feed[i]["img"] = value2.snippet.thumbnails.medium.url;
                feed[i]["date"] = value2.snippet.publishedAt;
                feed[i]["channel"] = value2.snippet.channelTitle;
                i++;
              });
            }
          }).done(function () {
            ///not sorted yet
            $("#feed").html("");
            console.log(feed.sort(sortByDate));
            $.each(feed.sort(sortByDate), function (i, v) {
              htmlFeed = "<div class='feed-item'>" +
              "<div class='d-flex flex-column justify-content-around align-items-center'>" +
              "<h3>"+feed[i]["title"]+"</h3>" +
              "<img src='"+feed[i]["img"]+"' alt=''>" +
              "</div>" +
              "<p>"+feed[i]["channel"]+"</p>" +
              "</div>";
              $("#feed").append(htmlFeed);
            });
          });
        });
      }
    });
  }

  $(document).ready(function () {
    updateFeed();
    pageYoutubeTimer = Meteor.setInterval(updateFeed, 1200000);
  });
});

Template.pageYoutube.onDestroyed(function () {
  clearInterval(pageYoutubeTimer);
});