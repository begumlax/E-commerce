var countshirts = 0;
var countTshirts = 0;
var counttops = 0;
countjeans = 0;

var API_URL = "http://127.0.0.1:5000";

function SellerLogin() {
  var emailid = document.getElementById("selleremail").value;
  var password = document.getElementById("sellerpassword").value;
  console.log(emailid, password);
  fetch(API_URL + "/login", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({
        email_id: emailid,
        password: password,
      }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    // Converting to JSON
    .then((response) => response.json())
    // Displaying results to console
    .then((json) => {
      if (json.status == true) {
        swal("Success", "Login Success", "success").then((value) => {
          localStorage.setItem("selleremail", json.email_id);
          localStorage.setItem("sellerid", json.seller_id);
          localStorage.setItem("sellername", json.username);
          localStorage.setItem("sellerprofile", json.profile);

          location.href = "sellerdashboard.html";
        });
      } else {
        swal("Error!", json.message, "error");
      }
    })
    .catch(function (error) {
      alert(
        error +
        " ,Backend API'S are not in running Please run your API'S to get a response"
      );
    });
}

function Register() {
  var Username = document.getElementById("Susername").value;
  var emailid = document.getElementById("Semail").value;
  var password = document.getElementById("Spassword").value;
  // var sellerprofileimage = document.getElementById("Sprofileimg");

  fetch(API_URL + "/register", {
    method: "POST",
    body: JSON.stringify({
      username: Username,
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
        swal("Success", json.message, "success").then((value) => {
        location.href = "index.html";
      });
      } else {
        swal("Error!", json.message, "error");
      }
    })
    .catch(function (error) {
      alert(
        error +
        " ,Backend API'S are not in running Please run your API'S to get a response"
      );
    });
}

function Registers() {
  var username = document.getElementById("Susername").value;
  var emailid = document.getElementById("Semail").value;
  var password = document.getElementById("Spassword").value;
  var sellerprofileimage = document.getElementById("Sprofileimg");

  var formData = new FormData();
  formData.append("username", username);
  formData.append("email_id", emailid);
  formData.append("password", password);
  formData.append("profileimage", sellerprofileimage.files[0]);



  //   fetch(API_URL + "/sellerregisterwithprofile", {
  //     // Adding method type
  //     method: "POST",
  //     // Adding body or contents to send
  //     body: payload,
  //   })
  // Converting to JSON
  // .then((response) => response.json())
  // // Displaying results to console
  // .then((json) => {
  //   if (json.status == true) {
  //     swal("Success", json.message, "success").then((value) => {
  //       location.href = "index.html";
  //     });
  //   } else {
  //     swal("Error!", json.message, "error").then((value) => {
  //       location.href = "index.html";
  //     });
  //   }
  // });
  // .catch(function (error) {
  //     alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
  // });
}