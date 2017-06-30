//Return now to our AJAX example at the start of this section, suppose your API can’t handle sending back just the HTML for our #content div and instead returns a whole page. Assuming that the response includes our desired HTML also in the #content div, update our success handler to load only that content into our #content element.

var $content = $('#content'); // Area we want to load the content into
var $navLinks = $('#nav .link'); // Actual navigation links
 
// Bind to the click event
navLinks.on('click', function (event) {
event.preventDefault(); // Stop the browser from actually navigating
var $link = $(event.currentTarget); // Get a jQuery wrapped instance of the element that was clicked
var href = $link.attr('href'); // Get the url the link was originally going to load
 
// Retrieve the HTML via AJAX and load it into our $content section via the `.html` method
$.get(href, function success (html) {
$content.html($(html).filter($('#content')));
});
});