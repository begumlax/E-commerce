var countshirts = 0;
var countTshirts = 0;
var counttops = 0;
countjeans = 0;
function SellerLogin() {
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
           
            if (json.status == true) {
                swal(
                    'Success',
                    'Login Success',
                    'success'
                ).then((value) => {
                    localStorage.setItem("selleremail", json.email_id);
                    localStorage.setItem("sellerid", json.seller_id);

                    location.href = "sellerdashboard.html";

                })
               
            }else{
                swal(
                    'Error!',
                     json.message,
                    'error',
                )
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
            console.log(json)
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
               
            }else{
                 swal(
                     'Error!',
                     json.message,
                     'error',
                 )
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
        location.href = "index.html"
    })
  
}

function UserRegister() {
    var emailid = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log( emailid, password);
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
           
            if (json.status == true) {
                swal(
                    'Success',
                    json.message,
                    'success'
                ).then((value) => {
                    location.href = "userlogin.html";
                })
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
          
            if (json.status == true) {
                swal(
                    'Success',
                    json.message,
                    'success'
                ).then((value) => {
                    location.href = "seller.html";
                })
            }else{
                 swal(
                     'Error!',
                      json.message,
                     'error',
                 )
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
                   if (countTshirts <= 4) {
                       countTshirts = countTshirts + 1;
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
            }});
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
                ).then((value) => {
                    location.href = "homepage.html"
                })
               
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
                // if (countshirts <= 4) {
                // countshirts = countshirts + 1;
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
            ProductCards.innerHTML = htmlCode;
        });
    
}

function Load_JEANS(categoryGET) {
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
                if (countshirts <= 4) {
                    countshirts = countshirts + 1;
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
                }
            });

            const Jeanspants = document.querySelector(".jeanspants");
            Jeanspants.innerHTML = htmlCode;
        });

}

function Load_JEANSHomepage(categoryGET) {
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
                if (countjeans <= 4) {
                    countjeans = countjeans + 1;
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
                }
            });

            const Jeanspants = document.querySelector(".jeanspantshome");
            Jeanspants.innerHTML = htmlCode;
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
                 if (counttops <= 4) {
                     counttops = counttops + 1;
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
            }});
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
            console.log(json.data)
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
    }).then((willDelete) => {
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
                                GetCart_Homepage()
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

