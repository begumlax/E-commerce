$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});



function ProductAdd() {
    var sellerid = localStorage.getItem("sellerid")
    var productname = document.getElementById("pname").value;
    var productdescrb = document.getElementById("pdescrb").value;
    var categoryvalue = document.getElementById("category").value;
    var productdescrb = document.getElementById("pdescrb").value;
    var url = document.getElementById("purl").value;
    var productprice = document.getElementById("price").value;

    fetch("http://127.0.0.1:5000/sellerform", {
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
                )
            }
        });
}

function ProductsTrack() {
    var selleridL = localStorage.getItem("sellerid")

    fetch("http://127.0.0.1:5000/productsTrack", {
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
        });
}


function ProductsTrackIncome() {
    var selleridL = localStorage.getItem("sellerid")

    fetch("http://127.0.0.1:5000/productsTrackTotalincome", {
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
        });
}



 var i = 0;
function test() {
    i = i + 1
}




function ProductsList() {
   
    var sellerid = localStorage.getItem("sellerid")
    fetch("http://127.0.0.1:5000/SellerProductsList", {
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
            Maindata.forEach(function (singleproductdata){
                 
                        test()
                        console.log(i)
                    htmlCode =
                        htmlCode +
                        `
                        <tr
                        >    
                        <td> ${i} </td>
                        <td> ${singleproductdata.productname} </td>
                        <td> $${singleproductdata.productprice} </td>
                        <td> ${singleproductdata.productcategory} </td> 
                        <td> <i class="fa fa-edit text-primary"> </i></td>
                        <td> <i class="fa fa-trash text-danger"> </i></td>
                        </tr
                        >             
  `;
                
            },
            );
      

            const ProductCards = document.querySelector(".ProductsTable");
            ProductCards.innerHTML = htmlCode;
         
        });

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