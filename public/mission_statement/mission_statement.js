$.ajax({
    url: '/loggedinquery',
    type: 'GET',
}).done(function(data) {
    if (data.loggedin === 'no') {
        window.localStorage.removeItem('user');   
    }
});  

$.ajax({
    "url": "../data?collection=general_info",
    "method": "GET"
}).done(res => {
    const generalInfo = res[0];
    console.log(generalInfo);
    const missionStatement = generalInfo.mission_statement;
    
    $('.content-body').append('<div>' + missionStatement + '</div>');

    
});
