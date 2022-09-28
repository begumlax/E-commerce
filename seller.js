function Login() {
    var emailid = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    fetch("http://127.0.0.1:5000/login", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            "email_id": emailid,
            "password": password,
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response =>

            response.json())
        // Displaying results to console
        .then(json => {
 alert(json.message)
                    if (json.status == true) {
                        alert(json.message)
                        location.href = 'sellerform.html';
                    }
                });
}

function Register() {
    var username = document.getElementById('username').value;
    var emailid = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(username,emailid,password)
    fetch("http://127.0.0.1:5000/register", {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify({
                "username":username,
                "email_id": emailid,
                "password": password,
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        // Converting to JSON
        .then(response =>

            response.json())
        // Displaying results to console
        .then(json => {
alert(json.message)
        if(json.status==true){
                location.href = 'seller.html';
        }
        }
            );
}



function ProductAdd() {
    var productname = document.getElementById('pname').value;
    var productdescrb = document.getElementById('pdescrb').value;
    var url = document.getElementById('purl').value;
    var productprice = document.getElementById('price').value;
    console.log(productname, productdescrb, url, productprice)
    fetch("http://127.0.0.1:5000/sellerform", {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify({
                "productname": productname,
                "productdescrb": productdescrb,
                "imgurl": url,
                "productprice":productprice
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

        // Converting to JSON
        .then(response =>

            response.json())
        // Displaying results to console
        .then(json => {
            alert(json.message)
            if (json.status == true) {
                location.href = 'index(2).html';
            }
        });
}