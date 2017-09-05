
// Whenever you click on a checkbox, save the checkbox's new state to storage
function sirExtensionCheck() {
    var currentNumber = this.attributes["name"].value;
    var currentCheckbox = document.getElementById("sirextension-checkbox-" + currentNumber);
    chrome.storage.local.get(sirExtensionUrlDate, function(items){
        items[sirExtensionUrlDate][currentNumber] = currentCheckbox.checked;
        chrome.storage.local.set(items, function(){ });
    });
}

// Set up variables and put checkboxes everywhere
var sirExtensionUrlDate = location.href.replace('https://www.economist.com/printedition/','');
$(".list__link").wrap("<div class='sirextension-linkwrap'></div>");
$(".sirextension-linkwrap").prepend("<input type='checkbox' style='position: absolute; margin-left: -10px;'>");
var sirExtensionStories = document.getElementsByClassName("sirextension-linkwrap");

chrome.storage.local.get(sirExtensionUrlDate, function(items){

    // If the data stored at this date is not an array, make it an array and populate it with spots for each story for this date, then upload it.
    // Instantiates the data on the first visit.
    if (Object.prototype.toString.call( items[sirExtensionUrlDate] ) !== '[object Array]') {
        items[sirExtensionUrlDate] = [];
        for (var i = 0; i < sirExtensionStories.length; i++) {
            items[sirExtensionUrlDate].push(false);
        }
        chrome.storage.local.set(items, function(){
            console.log("successfully uploaded the following data:");
            console.log(items);
        });
    }

    // Now populate the page with checkboxes according to the data we've retrieved
    for (var i = 0; i < sirExtensionStories.length; i++) {
        sirExtensionStories[i].firstChild.setAttribute("id", "sirextension-checkbox-" + i);
        sirExtensionStories[i].firstChild.setAttribute("name", i);
        if (items[sirExtensionUrlDate][i] === true) {
            sirExtensionStories[i].firstChild.setAttribute("checked", "checked");
        }
        sirExtensionStories[i].firstChild.addEventListener('click', sirExtensionCheck);
    }
    
});




