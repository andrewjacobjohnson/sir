
function ajjClickCB() {
    var keyname = "week-2017-08-26-no-" + this.attributes["name"].value;
    var currentid = "ajj-checkbox-" + this.attributes["name"].value;
    var currentbox = document.getElementById(currentid);
    var input = {};
    input[keyname] = currentbox.checked;
    chrome.storage.local.set(input, function(){
        console.log(keyname + " " + currentbox.checked);
        chrome.storage.local.get(keyname, function(items){
            console.log(items);
        });
    });
}

// Make a parent wrapping element for each story
$(".list__link").wrap("<div class='ajj-link-wrap'></div>");
$(".ajj-link-wrap").prepend("<input type='checkbox' class='ajj-checkbox' style='position: absolute; margin-left: -10px;'>");

chrome.storage.local.get(["week-2017-08-26"], function(items){
    console.log(items);
});

var stories = document.getElementsByClassName("ajj-link-wrap");



for (var i = 0; i < stories.length; i++) {
    stories[i].firstChild.setAttribute("id", "ajj-checkbox-" + i);
    stories[i].firstChild.setAttribute("name", i);
    stories[i].firstChild.addEventListener('click', ajjClickCB);
}

chrome.storage.local.get(["date"], function(items){
    console.log(items);
});


