function submitRsvpForm(data) {
    var name = getById("name");
    
    var phone = getById("phone");
    
    var choice = getById("choice");
    
    var message = getById("message");
    
    var data = {
        'name': getById('name'),
        'phone': getById('phone'),
        'message': getById('message'),
        'rsvp': getById('choice')
    };

    console.log("name = " + name + " | phone = " + phone + " | choice = " + choice);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://3zl0fxap3d.execute-api.us-east-2.amazonaws.com/prod/rsvp");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    alert("Obrigado por confirmar sua presença!");
}
    
function getById(identifier) {
    return document.getElementById(identifier).value;
}