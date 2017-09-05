
function ajjClickCB() {
    console.log("CLICK");
    var currentNumber = this.attributes["name"].value;
    var currentCheckbox = document.getElementById("ajj-checkbox-" + currentNumber);

    chrome.storage.local.get(urlDate, function(items){
        console.log(items);
        console.log(`
        ^^^ these are items
        
        `);
        items[urlDate][currentNumber] = currentCheckbox.checked;
        chrome.storage.local.set(items, function(){ });
    });
}


var urlDate = location.href.replace('https://www.economist.com/printedition/','');
$(".list__link").wrap("<div class='ajj-link-wrap'></div>");
$(".ajj-link-wrap").prepend("<input type='checkbox' class='ajj-checkbox' style='position: absolute; margin-left: -10px;'>");
var stories = document.getElementsByClassName("ajj-link-wrap");

chrome.storage.local.get(urlDate, function(items){

    // If the data stored at this date is not an array, make it an array and populate it with spots for each story for this date, then upload it.
    // Instantiates the data on the first visit.
    if (Object.prototype.toString.call( items[urlDate] ) !== '[object Array]') {
        items[urlDate] = [];
        for (var i = 0; i < stories.length; i++) {
            items[urlDate].push(false);
        }
        chrome.storage.local.set(items, function(){
            console.log("successfully uploaded the following data:");
            console.log(items);
        });
    }

    // Now populate the page with checkboxes according to the data we've retrieved

    
    for (var i = 0; i < stories.length; i++) {
        stories[i].firstChild.setAttribute("id", "ajj-checkbox-" + i);
        stories[i].firstChild.setAttribute("name", i);
        if (items[urlDate][i] === true) {
            stories[i].firstChild.setAttribute("checked", "checked");
        }
        stories[i].firstChild.addEventListener('click', ajjClickCB);
    }
});




