   function Placeorder() {
       var userid = localStorage.getItem("userid")
       var productid = localStorage.getItem("product_id")
       var emailid = localStorage.getItem("emailid")
       var Name = document.getElementById("name").value;
       var Phone = document.getElementById("phone").value;
       var Street = document.getElementById("street").value;
       var State = document.getElementById("state").value;
       var City = document.getElementById("city").value;
       var Pincode = document.getElementById("pincode").value;

       var useraddress = "Name:" + Name + "," + "Street:" + Street + "," + "City:" + City + "," + "State:" + State + "," + "Pincode:" + Pincode + "," + "Phone:" + Phone
       console.log(useraddress)
       if (Name == '' || Phone == '' || Street == '' || State == '' || City == '' || Pincode == '') {
           swal(
               'Error!',
               "Fill the order form correctly.",
               'error',
           )
       } else {
           fetch("http://127.0.0.1:5000/OrderProduct", {
                   method: "POST",
                   body: JSON.stringify({
                       product_id: productid,
                       user_id: userid,
                       address: useraddress,
                       email_id: emailid
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
                       ).then((value) => {
                           
                           location.href = "homepage.html";

                       })

                   }
               });
       }

   }