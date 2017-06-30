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
    //let jsonData = data;
    data.forEach(obj => {
      let pg = $('<p>').addClass(obj.tag).text(obj.name);
      $('.people-list').append(pg);
    });
    //Create a second event handler, listening for your new custom event, that updates our “Hello World” h1 with the text “Viewing X people” where ‘X’ is the number received from the custom event.
    $('body').on('peopleAdded', function(event, peeps) {
      $('h1').text(`Viewing ${peeps} people`);
    });

    // trigger custom event
    let numPeeps = $('.people-list p').length;
    $('.people-list').trigger('peopleAdded', [numPeeps]);


    //Now query for the collection of paragraphs within the .something-new div and limit to only the first and third elements, then add the zebra class to those items.
    let pgraph = $('.something-new');
    pgraph.find('p').filter(':even').addClass('zebra');
    //Finally, loop through the whole collection and prepend their tag within a span with the class role.
    let role = $('<span>').addClass('role');
    pgraph.find('p').before(role);
    //Returning to our people list, create an event handler so that whenever you click on the person, their department (from the original JSON data) is appended, or removed if it’s already there, within a span with the class department.

    pgraph.on('click', 'p', function(e) {
      let exists = $(this).has($('.department')).length;
      if (exists) {
        $('.department').remove();
      } else {
        let person = data.filter(obj => obj.name === e.target.innerText);
        let span = $('<span>').addClass('department').text(person[0].department);
        span.appendTo($(this));
      }

    });

    let me = {
      "name": "Sam Chittenden",
      "tag": "Designer",
      "department": "Development"
    }
    data.push(me);


    let sam = $('<p>').addClass(me.tag).text(me.name);
      $('.people-list').append(sam).trigger('peopleAdded', data.length);

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
