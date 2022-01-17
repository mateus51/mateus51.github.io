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
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        alert('aqui')
        sleep('100000')
        // done
    }

    alert("name = " + name + " | phone = " + phone + " | choice = " + choice + " | mensagem = " + message)

}
    
function getById(identifier) {
    return document.getElementById(identifier).value;
}