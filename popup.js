// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


window.addEventListener('load', getCurrentTabUrl);



 //object for article
 function Article(url, full, sum50, sent5)
 {
    this.url = url;
    this.full = full;
    this.sum50 = sum50;
    this.sent5 = sent5;
 }

 




function summarize(url)
{
  var summary;
  var text;
  var article = new Article(null, null, null, null);

    
  
    //Get 5 sentence summary
    $.ajax({
    type: 'POST',
    url: 'https:trimlyflask.herokuapp.com/5sentence',
    dataType: 'json',
    data: {url: url},
    success: function(o) {

          var s5 = o.summary;
          article.sent5 = s5;
          $('#sum').html(s5);
          //$('#sum').html(o.summary);
        }
    
         });

      //Get 50% sentence summary
    $.ajax({
    type: 'POST',
    url: 'https://trimlyflask.herokuapp.com/sum50',
    dataType: 'json',
    data: {url: url},
    success: function(o) {
          console.log(o.summary);
          summary = o.summary;
          text = o.text;
          article.url = url;
          article.full = text;
          article.sum50 = summary;

          (url, text, summary, null);
          //$('#sum').html(o.summary);

         
        },
        error: function(o) {
          $('#sum').html("This article cannot be summarized.");
        }
    
         });

    //Event listener to save the current article
    $(".save").on('click', function() {
      console.log("Ok");
       chrome.storage.local.get({'list': []}, function(result){
          var list = result.list;
          list.push(article);

          chrome.storage.local.set({list: list}, function() {
            chrome.storage.local.get('list', function(result) {
              console.log(result.list)
            })
          })
        });
 });
       
//Three button actions: 5 sentence, 50%, full text
 $(".50p").on('click', function() {
    $('#sum').html(article.sum50);
  });

 $(".5s").on('click', function() {
    $('#sum').html(article.sent5);
 });

 $(".FT").on('click', function() {
    $('#sum').html(article.full);
 });



}


function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    //$('#url').html(url);
    summarize(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

 /*
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Performing Google Image search for ' + url);

    getImageUrl(url, function(imageUrl, width, height) {

      renderStatus('Search term: ' + url + '\n' +
          'Google image search result: ' + imageUrl);
      var imageResult = document.getElementById('image-result');
      // Explicitly set the width/height to minimize the number of reflows. For
      // a single image, this does not matter, but if you're going to embed
      // multiple external images in your page, then the absence of width/height
      // attributes causes the popup to resize multiple times.
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});*/