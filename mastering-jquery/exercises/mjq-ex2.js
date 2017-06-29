$('h1').css('color', 'blue').text('Hello World');
$('h3.not-this').removeClass('not-this').addClass('this');
$('h5').replaceWith('<h5>I need a subtitle <span>That\'s better</span></h5>');
$('.to-remove').remove();
let someNew = $('<div>');
someNew.addClass('something-new');
let newP = $('<p>');
newP.text('I\'m new here');
newP.appendTo(someNew);
$('body').append(someNew);
$('.something-new > p').remove();
$('.something-new').addClass('people-list');


//Load exercises/data/mjq.json from AJAX and create individual paragraphs inside the people listfor each person. The text should be their name, and the class should be their tag.

$.ajax('data/mjq.json', {
  success: function(data, status, jqXHR) {
    data.forEach(obj => {
      let pg = $('<p>').addClass(obj.tag).text(obj.name);
      $('.people-list').append(pg);
    });
    //Now query for the collection of paragraphs within the .something-new div and limit to only the first and third elements, then add the zebra class to those items.
    let pgraph = $('.something-new');
    pgraph.find('p').filter(':even').addClass('zebra');
    //Finally, loop through the whole collection and prepend their tag within a span with the class role.
    let role = $('<span>').addClass('role');
    pgraph.find('p').before(role);
  },
  error: function(jqXHR, status) {
    // status is a string description of why request failed
    console.warn("Failed with status:", status);
  },
  complete: function(jqXHR, status) {
    // Do any cleanup needed regardless of status
    console.log('call complete');
  }
});
