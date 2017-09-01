
function ajjClickCB() {
    console.log("CLICK");
    var input = {};
    var currentname = this.attributes["name"].value;
    var currentid = "ajj-checkbox-" + currentname;
    var currentbox = document.getElementById(currentid);
    console.log(currentid + " " + currentbox.checked);

    chrome.storage.local.get([url], function(items){
        console.log(items);
        console.log(`
        ^^^ these are items
        
        `);
        items[currentname] = currentbox.checked;
        console.log(items[currentname]);
        input["checks"] = items;
        chrome.storage.local.set(input, function(){
            console.log(currentname + " is " + currentbox.checked);
            chrome.storage.local.get([url], function(items2){
                console.log(items2);
                console.log(`
                
                
                `);
            });
        });
    });
}


var url = location.href.replace('https://www.economist.com/printedition/','');
$(".list__link").wrap("<div class='ajj-link-wrap'></div>");
$(".ajj-link-wrap").prepend("<input type='checkbox' class='ajj-checkbox' style='position: absolute; margin-left: -10px;'>");
var stories = document.getElementsByClassName("ajj-link-wrap");

chrome.storage.local.get(url, function(items){
    console.log(items);
    if (typeof items === 'array') {
        var items = [];
        for (var i = 0; i < stories.length; i++) {
            items.push(false);
        }
        var input = {};
        input[url] = items;
        chrome.storage.local.set(input, function(){
            /*chrome.storage.local.get([url], function(items){
                console.log("successfully logged: ");
                console.log(items);
            });*/
        });
    }    
    items[0] = true;
    var ouritems = items;
    console.log(ouritems);
    for (var i = 0; i < stories.length; i++) {
        stories[i].firstChild.setAttribute("id", "ajj-checkbox-" + i);
        stories[i].firstChild.setAttribute("name", i);
        if (items[i] === true) {
            stories[i].firstChild.setAttribute("checked", "checked");
        }
        stories[i].firstChild.addEventListener('click', ajjClickCB);
    }
});




