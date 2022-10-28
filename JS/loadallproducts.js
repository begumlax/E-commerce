var API_URL = "http://127.0.0.1:5000"

function Load_ALLTshirts(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow"  src="${singleproductdata.productimgurl}">
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
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}





function Load_ALLShirts(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow" src="${singleproductdata.productimgurl}">
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

            const ProductCards = document.querySelector(".ALLSHIRTS");
            ProductCards.innerHTML = htmlCode;
        })

}


function Load_ALLJEANSHomepage(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow" src="${singleproductdata.productimgurl}">
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

            const Jeanspants = document.querySelector(".ALLJEANSPANTS");
            Jeanspants.innerHTML = htmlCode;
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });

}



function Load_Kurtas(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow"  src="${singleproductdata.productimgurl}">
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

            const Jeanspants = document.querySelector(".ALLKURTA");
            Jeanspants.innerHTML = htmlCode;
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });

}

function Load_Womenstops(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow" src="${singleproductdata.productimgurl}">
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
            const ProductCards = document.querySelector(".ALLWOMENSTOPS");
            ProductCards.innerHTML = htmlCode;
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}

function Load_ALLTops(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow" src="${singleproductdata.productimgurl}">
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
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}

function Load_ALLMensCatergory(categoryGET) {
    console.log(categoryGET)
    fetch(API_URL + "/Porducts", {
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
                <div class="card_image"><img class="shadowshow" src="${singleproductdata.productimgurl}">
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
            const ProductCards = document.querySelector(".ALLWOMENS");
            ProductCards.innerHTML = htmlCode;
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}


function Load_OrderProducts() {
    userid = localStorage.getItem("userid");
    fetch(API_URL + "/OrderProducts", {
            method: "POST",
            body: JSON.stringify({
                user_id: userid
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
                <div class="card_image"><img class="shadowshow"  src="${singleproductdata.product_imgurl}">
                 <div class="star" style="text-align:center">
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
                </div>
                <div class="card_content">
                    <h2 class="card_title" style="overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${singleproductdata.product_name}</h2>
                    <br>
                    <p class="card_text" style="overflow: hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">Price $${singleproductdata.product_price}</p>
                    <button onclick="TrackOrderMap(${singleproductdata.order_id})" class="btn1 card_btn">Track Product &nbsp; <i style="color: white;font-size:20px"
                class="fas fa-map-marker-alt" aria-hidden="true"></i></button>
                </div>
            </div>
        </li>
    </ul>

  `;
            });

            const Jeanspants = document.querySelector(".ORDEREDPRODUCTS");
            Jeanspants.innerHTML = htmlCode;
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });

}


function TrackOrderMap(orderid) {

    console.log(orderid)
    fetch(API_URL + "/trackorder", {
            method: "POST",
            body: JSON.stringify({
                order_id: orderid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            var date = new Date();
            var date2 = new Date();
            date2.setDate(new Date().getDate() + 1)

            var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            var tommdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            console.log(current_date, tommdate)
            Maindata = json.data;
            
            console.log(Maindata[0]);
            if (json.status == true) {
                for (let i = 0; i < Maindata.length; i++) {
                    localStorage.setItem("ordernumber", Maindata[i].order_id)
                    localStorage.setItem("orderdate", Maindata[i].order_date)
                    localStorage.setItem("imageurl", Maindata[i].product_imgurl)
                    localStorage.setItem("orderprice", Maindata[i].product_price)
                    localStorage.setItem("ordername", Maindata[i].product_name)
                    localStorage.setItem("orderdescription", Maindata[i].product_description)
                    localStorage.setItem("orderaddress", Maindata[i].product_address)

                }
                location.href = "trackingproduct.html"
            } else {
                alert("ORDER NUMBER DOES'T EXIST")
            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}