function Login() {
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("http://127.0.0.1:5000/login", {
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
            alert(json.message);
            if (json.status == true) {
                alert(json.message);
                location.href = "sellerform.html";
            }
        });
}


function UserLogin() {
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch("http://127.0.0.1:5000/userlogin", {
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
            localStorage.setItem("emailid", json.email_id)
            localStorage.setItem("userid", json.user_id)
            if (json.status == true) {
                swal(
                    'Success',
                     'Login Success',
                    'success'
                ).then((value) => {
                    location.href = "homepage.html";
                })
               
            }
        });
}

function Loguout(){
    localStorage.clear()
    swal(
        'Success',
        'LogOut Success !',
        'success'
    ).then((value) => {
        location.href = "index(2).html"
    })
  
}

function UserRegister() {
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(username, emailid, password);
    fetch("http://127.0.0.1:5000/userregister", {
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
            alert(json.message);
            if (json.status == true) {
                location.href = "seller.html";
            }
        });
}

function Register() {
    var username = document.getElementById("username").value;
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(username, emailid, password);
    fetch("http://127.0.0.1:5000/register", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            username: username,
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
            alert(json.message);
            if (json.status == true) {
                location.href = "seller.html";
            }
        });
}

function ProductAdd() {
    var productname = document.getElementById("pname").value;
    var productdescrb = document.getElementById("pdescrb").value;
    var categoryvalue = document.getElementById("category").value; 
    var productdescrb = document.getElementById("pdescrb").value;
    var url = document.getElementById("purl").value;
    var productprice = document.getElementById("price").value;
    
    console.log(category);
    fetch("http://127.0.0.1:5000/sellerform", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            productname: productname,
            productdescrb: productdescrb,
            imgurl: url,
            productprice: productprice,
            category: categoryvalue 
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
                swal(
                    'Success',
                    json.message,
                    'success'
                )
                setTimeout(() => {
                    location.href = "index(2).html";
                }, 2000);
               
            }
        });
}

function Load_Tshirts(categoryGET) {
    console.log(categoryGET)
    fetch("http://127.0.0.1:5000/Porducts", {
        method: "POST",
        body: JSON.stringify({
            category: categoryGET
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Maindata = json.data;
            let htmlCode = ``;
            Maindata.forEach(function (singleproductdata) {
                htmlCode =
                    htmlCode +
                    `
                     <ul class="cards col">
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img  src="${singleproductdata.productimgurl}">
                 <div class="star" style="text-align:center">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="card_content">
                    <h2 class="card_title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${singleproductdata.productname}</h2>
                    <br>
                    <p class="card_text" style="overflow: hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Price $${singleproductdata.productprice}</p>
                    <button class="btn1 card_btn" onclick="UserAddcart(${singleproductdata.product_id})"><a style="text-decoration: none;">Add Cart &nbsp; <i style="color: white;font-size:20px"
                class="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                </div>
            </div>
        </li>
    </ul>
  `;
            });
            const ProductCards = document.querySelector(".tshirts");
            ProductCards.innerHTML = htmlCode;
        });
}



function UserAddcart(productid) {
    emailid = localStorage.getItem("emailid");
    userID = localStorage.getItem("userid");
    if (emailid) {
        fetch("http://127.0.0.1:5000/User_Addtocart", {
            method: "POST",
            body: JSON.stringify({
                user_id:userID,
                email_id:emailid,
                product_id: productid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                swal(
                    'Success',
                    json.message,
                    'success'
                )
                GetCart_Homepage()
            });
    } else {
        swal(
            'Error!',
            "Please login first to add your cart !",
            'error',
        ).then((value) => {
            location.href = "userlogin.html"
        })
    }

}

function Addcart(productid){
    user = localStorage.getItem("user");
    if(user){
        fetch("http://127.0.0.1:5000/Addtocart", {
            method: "POST",
            body: JSON.stringify({
                product_id: productid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                swal(
                    'Success',
                    json.message,
                    'success'
                )

            });
    }else{
        swal(
            'Error!',
            "Please login first to add your cart !",
            'error',
        ).then((value) => {
            location.href = "userlogin.html"
        })
    }
    
}


function Load_Shirts(categoryGET) {
    console.log(categoryGET)
    fetch("http://127.0.0.1:5000/Porducts", {
        method: "POST",
        body: JSON.stringify({
            category: categoryGET
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Maindata = json.data;
            let htmlCode = ``;
            Maindata.forEach(function (singleproductdata) {

                // document.getElementById("newproductname").innerHTML = singleproductdata.productname;
                // document.getElementById("newproductimg").src = singleproductdata.productimgurl;
                // document.getElementById("newproductprice").innerHTML = singleproductdata.productprice;

                htmlCode =
                    htmlCode +
                  `
    <ul class="cards col">
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img  src="${singleproductdata.productimgurl}">
                 <div class="star" style="text-align:center">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="card_content">
                    <h2 class="card_title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${singleproductdata.productname}</h2>
                    <br>
                    <p class="card_text" style="overflow: hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Price $${singleproductdata.productprice}</p>
                    <button class="btn1 card_btn" onclick="UserAddcart(${singleproductdata.product_id})"><a style="text-decoration: none;">Add Cart &nbsp; <i style="color: white;font-size:20px"
                class="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                </div>
            </div>
        </li>
    </ul>

  `;
            }); 
            const ProductCards = document.querySelector(".newproducts");
            const UniqueShirts = document.querySelector(".uniqueshirts");
            ProductCards.innerHTML = htmlCode;
            UniqueShirts.innerHTML = htmlCode;
        });
}



function Load_Tops(categoryGET) {
    console.log(categoryGET)
    fetch("http://127.0.0.1:5000/Porducts", {
        method: "POST",
        body: JSON.stringify({
            category: categoryGET
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Maindata = json.data;
            let htmlCode = ``;
            Maindata.forEach(function (singleproductdata) {
                htmlCode =
                    htmlCode +
                    `
                   <ul class="cards col">
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img  src="${singleproductdata.productimgurl}">
                 <div class="star" style="text-align:center">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="card_content">
                    <h2 class="card_title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${singleproductdata.productname}</h2>
                    <br>
                    <p class="card_text" style="overflow: hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Price $${singleproductdata.productprice}</p>
                    <button class="btn1 card_btn" onclick="UserAddcart(${singleproductdata.product_id})"><a style="text-decoration: none;">Add Cart &nbsp; <i style="color: white;font-size:20px"
                class="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                </div>
            </div>
        </li>
    </ul>
  `;
            });
            const ProductCards = document.querySelector(".womentops");
            ProductCards.innerHTML = htmlCode;
        });
}



function GetCart() {
    var emailid = localStorage.getItem("emailid")
    fetch("http://127.0.0.1:5000/UsercartIteams", {
        method: "POST",
        body: JSON.stringify({
            email_id: emailid
        }), headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.json())
        .then((json) => {

            if (json.status == false) {
                swal(
                    'Error!',
                    json.message,
                    'error',
                ).then((value) => {
                    location.href = "homepage.html"
                })

            } else {
                localStorage.setItem("Addcart", json.data.length)

            }

            Maindata = json.data;
            let htmlCode = ``;
            Maindata.forEach(function (singleproductdata) {
                htmlCode =
                    htmlCode +
                    `

                     <ul class="cards col">
        <li class="cards_item">
            <div class="card">
                <div class="card_image"><img  src="${singleproductdata.productimgurl}">
                 <div class="star" style="text-align:center">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="card_content">
                    <h2 class="card_title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${singleproductdata.productname}</h2>
                    <br>
                    <p class="card_text" style="overflow: hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Price $${singleproductdata.productprice}</p>
                    <button class="btn1 card_btn"  onclick="Buynow(${singleproductdata.product_id})"><a style="text-decoration: none;">Buy Now &nbsp; <i style="color: white;font-size:20px"
                class="fa fa-shopping-cart" aria-hidden="true"></i></a></button>
                <br>
                 <button class="btn1 card_btn"  onclick="Remove(${singleproductdata.product_id})"><a style="text-decoration: none;">Remove &nbsp;<i style="color: white;font-size:17px"
                class="fas fa-trash-alt" aria-hidden="true"></i></a></button>
                </div> 
            </div>
        </li>
    </ul>
  `;
            });
            const ProductCards = document.querySelector(".newproducts");
            ProductCards.innerHTML = htmlCode;

        });

}




function GetCart_Homepage() {
    var emailid = localStorage.getItem("emailid")
    fetch("http://127.0.0.1:5000/UsercartIteams", {
        method: "POST",
        body: JSON.stringify({
            email_id: emailid
        }), headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem("Addcart", json.data.length)
        });

}






function Buynow(productid){
    fetch("http://127.0.0.1:5000/Buynow", {
        method: "POST",
        body: JSON.stringify({
            product_id: productid
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Maindata = json.data;
            localStorage.setItem("product_id",json.data[0].product_id)
            localStorage.setItem("productimgurl", json.data[0].productimgurl)
            localStorage.setItem("productdescrb", json.data[0].productdescription)
            localStorage.setItem("productname", json.data[0].productname)
            localStorage.setItem("productprice", json.data[0].productprice)

            location.href = "sproduct(2).html";
           
        });
    

}



function Remove(productid) {
    var email = localStorage.getItem("emailid")
    swal({
        title: "Are you sure?",
        text: "Once removed, you will not be able to find in cart!",
        icon: "warning",
        buttons: {
            cancel: "Cacel",
            onclick:"Okay"
        },
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                fetch("http://127.0.0.1:5000/UserRemovecart", {
                    method: "POST",
                    body: JSON.stringify({
                        email_id:email,
                        product_id: productid
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        {

                            if (json.status == true) {
                                GetCart()
                            }

                        }
                    });
            } 
        });


  
}





function renderDataInTheTable(todos) {
    const mytable = document.getElementById("carttable");
    
    todos.forEach(todo => {
        let newRow = document.createElement("tr");
        Object.values(todo).forEach((value) => {
            let cell = document.createElement("td");
            cell.innerText = value;
            newRow.appendChild(cell);
        })
        mytable.appendChild(newRow);
    });
}

