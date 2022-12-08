var searchinputEl = $('#question');
var formatEl = $('#format');
var buttonEl = $('#submit');
var containerEl = $('#container');


$(buttonEl).click(formSubmitHandler = function () {
    event.preventDefault();

    var question = $('#question').val();
    var format = $('#format option:selected').val();

    if (question !== null) {
        getSearchResults(question, format);
        console.log(question + " and " + format + "!");
    } else {
        alert('Please enter a valid input');
    }
});

var getSearchResults = function (question, format) {
    var apiUrl = 'https://www.loc.gov/' + format + '/?q=' + question + '&fo=json';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var results = data.results;
                    displayResults(results);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function () {
            alert('Unable to connect');
        });
};

var displayResults = function (results) {
    for (var i = 0; i < results.length; i++) {
        console.log(results[i].title);
        $('.card-title').text(results[i].title);
        console.log(results[i].description.toString());
        $('.card-text').text(results[i].description.toString());
        console.log(results[i].url);
        $('.card-link').text(results[i].title);
        $('.card-link').attr('href', results[i].url);
    }
}