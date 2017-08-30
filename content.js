var i = 0;
// Make a parent wrapping element for each story
$(".list__link").wrap("<div class='ajj-link-wrap'></div>");
$(".ajj-link-wrap").prepend("<input type='checkbox' style='position: absolute; margin-left: -10px;' name='ajj-checkbox'>");

var stories = document.getElementsByClassName("ajj-link-wrap");

for (var i = 0; i < stories.length; i++) {
}
