$('#form').submit(function(e) {
  e.preventDefault();
  let scores = [];
  $('#form').find('select option:selected').each((i,e) => {
    scores.push($(e).text().replace(/\s\([^)]+\)/,''));
  });

  let name = $('#name').val();
  let photo = $('#photo').val();

  // console.log({name, photo, scores});
  $.post('/api/friends', {name, photo, scores})
    .then(data => {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);

      // Show the modal with the best match
      $("#results-modal").modal("toggle");
    });
});