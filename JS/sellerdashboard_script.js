$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

var API_URL = "http://127.0.0.1:5000"

function ProductAdd() {
    var sellerid = localStorage.getItem("sellerid")
    var productname = document.getElementById("pname").value;
    var productdescrb = document.getElementById("pdescrb").value;
    var categoryvalue = document.getElementById("category").value;
    var productdescrb = document.getElementById("pdescrb").value;
    var url = document.getElementById("purl").value;
    var productprice = document.getElementById("price").value;

    fetch(API_URL+"/sellerform", {
            method: "POST",
            body: JSON.stringify({
                productname: productname,
                productdescrb: productdescrb,
                imgurl: url,
                productprice: productprice,
                category: categoryvalue,
                addedby: sellerid
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
                         location.href = "sellerdashboard.html"
                     })
                 }

             }).catch(function (error) {
            alert(error + "Added");
        });
}

function RemoveProductTable(productid) {
    console.log(productid)
    fetch(API_URL+"/RemoveProduct", {
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

            if (json.status == true) {
                swal(
                    'Success',
                    json.message,
                    'success'
                ).then((value) => {
                    location.href = "sellerdashboard.html"
                })
            } else {
                alert(json.message)
            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}


function ProductsTrack() {
    var selleridL = localStorage.getItem("sellerid")

    fetch(API_URL+"/productsTrack", {
            method: "POST",
            body: JSON.stringify({
                sellerid: selleridL

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.totalcount)
            if (json.status == true) {
                document.getElementById("totalitems").innerHTML = json.totalcount[0];
                document.getElementById("totalamount").innerHTML = "$" + json.totalcount[1];

            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}


function ProductsTrackIncome() {
    var selleridL = localStorage.getItem("sellerid")

    fetch(API_URL+"/productsTrackTotalincome", {
            method: "POST",
            body: JSON.stringify({
                sellerid: selleridL

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.totalcount[1])
            if (json.status == true) {
                document.getElementById("totalorders").innerHTML = json.totalcount[0];
                document.getElementById("totalincome").innerHTML = "$" + json.totalcount[1];

            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}

function EditProduct(productid) {
    console.log(productid)
    fetch(API_URL+"/EditProductDetails", {
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
            console.log(json.data[0])
            if (json.status == true) {
                localStorage.setItem("tableproudctid", json.data[0].product_id)
                localStorage.setItem("tableproductname", json.data[0].product_name)
                localStorage.setItem("tableproductprice", json.data[0].product_price)
                localStorage.setItem("tableproductcategory", json.data[0].catergory)
                localStorage.setItem("tableproductdescrb", json.data[0].product_desc)
                localStorage.setItem("tableproductimg", json.data[0].productimgurl)
                UpdateEditForm()

            } else {
                alert(json.message)
            }
        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });
}


function UpdateEditForm() {
    var pname = localStorage.getItem("tableproductname")
    var pprice = localStorage.getItem("tableproductprice")
    var pcate = localStorage.getItem("tableproductcategory")
    var pdescb = localStorage.getItem("tableproductdescrb")
    var pdimg = localStorage.getItem("tableproductimg")
    console.log(pname, pprice, pcate)
    document.getElementById("productN").value = pname
    document.getElementById("productP").value = "$" + pprice
    document.getElementById("productC").value = pcate
    document.getElementById("productdesc").value = pdescb
    document.getElementById("cardimg").src = pdimg


}
var i = 0;

function test() {
    i = i + 1
}




function ProductsList() {

    var sellerid = localStorage.getItem("sellerid")
    fetch(API_URL+"/SellerProductsList", {
            method: "POST",
            body: JSON.stringify({
                seller_id: sellerid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json.data);
            Maindata = json.data;
            let htmlCode = ``;
            Maindata.forEach(function (singleproductdata) {

                test()
                console.log(i)
                htmlCode =
                    htmlCode +
                    `
                        <tr>    
                        <td> ${i} </td>
                        <td> ${singleproductdata.productname} </td>
                        <td> $${singleproductdata.productprice} </td>
                        <td> ${singleproductdata.productcategory} </td> 
                        <td type = "button" data-toggle="modal" data-target="#updateproductdetails" style="cursor:pointer;" onclick="EditProduct(${singleproductdata.product_id})"> <i class="fa fa-edit text-primary"> </i></td>
                        <td style="cursor:pointer" onclick="RemoveProductTable(${singleproductdata.product_id})"> <i class="fa fa-trash text-danger"> </i></td>
                        </tr>             
  `;

            }, );


            const ProductCards = document.querySelector(".ProductsTable");
            ProductCards.innerHTML = htmlCode;

        }).catch(function (error) {
            alert(error + " ,Backend API'S are not in running Please run your API'S to get a response");
        });

}

function UpdateProduct() {
    var Id = localStorage.getItem("tableproudctid")
    var Name = document.getElementById("productN").value
    var Price = document.getElementById("productP").value
    var Descrb = document.getElementById("productdesc").value
    alert( Name, Price, Descrb);
    fetch(API_URL+"/UpdateProduct", {
            method: "POST",
            body: JSON.stringify({
                product_id: Id,
                product_name: Name,
                product_price: Price,
                product_descrb: Descrb
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
            .then((json) => {
                
                if(json.status==true){
                        swal(
                            'Success',
                            json.message,
                            'success'
                        ).then((value) => {
                            location.href = "sellerdashboard.html"
                        })
                }
                
               })
}

function OpenSections(getpage) {
    if (getpage == 'TotalItems') {
        location.href = 'sellerproductdetails.html'
    } else if (getpage == 'TotalAmoount') {
        location.href = 'sellersales.html'

    } else if (getpage == 'TotalOrders') {
        location.href = 'sellerorders.html'

    } else {
        location.href = 'sellerproductincome.html'

    }
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