var API_URL = "http://127.0.0.1:5000"

function UserLogin() {
    GetCart_Length()
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch(API_URL+"/userlogin", {
            method: "POST",
            body: JSON.stringify({
                email_id: emailid,
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
           
            localStorage.setItem("emailid", json.email_id)
            localStorage.setItem("userid", json.user_id)
            if (json.status == true) {
                swal(
                    'Success',
                    json.message,
                    'success'
                ).then((value) => {
                    localStorage.setItem("access","yes");
                    location.href = "homepage.html";
                })
            } else {
                swal(
                    'Error!',
                    json.message,
                    'error',
                )
            }
        }).catch(function (error) {
            alert(error+" ,Backend API'S are not in running Please run your API'S to get a response");
        });;
}

function Loguout() {
    localStorage.clear()
    swal(
        'Success',
        'LogOut Success !',
        'success'
    ).then((value) => {
        location.href = "index.html" 
       
    })

}

function UserRegister() {
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(emailid, password);
    fetch(API_URL+"/userregister", {
            method: "POST",
            body: JSON.stringify({
                email_id: emailid,
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.status == true) {
                swal(
                    'Success',
                    json.message,
                    'success'
                )
            } else {
                swal(
                    'Error!',
                    json.message,
                    'error',
                )
            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}


function GetCart_Length() {

    var emailid = localStorage.getItem("emailid")
    fetch(API_URL+"/UsercartIteams", {
            method: "POST",
            body: JSON.stringify({
                email_id: emailid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem("Addcart", json.data.length)
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });

}