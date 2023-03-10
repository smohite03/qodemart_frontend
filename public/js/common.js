/*eslint-disable*/
const url = 'http://localhost:3000/';
function checklogin(){
    var userid = sessionStorage.getItem("UserID");
    var email = sessionStorage.getItem("email");
    var token = sessionStorage.getItem("Token");
    var role = sessionStorage.getItem("role");
    if(userid != null || token != null){
        if(role == "Customer"){
            $('#loginstatus').html('<a href="/crm/customer/dashboard">Already Loged In</a>')
        }else{
            $('#loginstatus').html('<a href="/crm/seller/dashboard">Already Loged In</a>')
        }
        $('#username').html(email);
    }
}
function setSession(){
    var userid = sessionStorage.getItem("UserID");
    var token = sessionStorage.getItem("Token");
    if(userid == null || token == null){
        alert("Unauthorized User Please Login");
        window.location.href = "/crm";
    }
    var email = sessionStorage.getItem("email");
    $('#username').html(email);
}
function register()
{
    const fname = $('#fname').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const gender = $('#gender').val();
    const role = $('#role').val();
    const password = $('#password').val();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
        alert("Please enter a valid email address");
    }else if(fname == " ") {
        alert("Please enter a full name");
    }else if(phone == " ") {
        alert("Please enter a phone number");
    }else if(password == " ") {
        alert("Please enter a password");
    }
    const user = {
        fullName : fname,
        email : email,
        phoneNumber : phone,
        gender  : gender,
        role : role,
        password : password,
      };
    
      var saveData = $.ajax({
        type: "POST",
        url: ""+url+"user",
        data: user,
        dataType: "json",
        success: function(resultData){
            alert("Profile Created Successfully");
            window.location.href = "/crm";
        }
      });
}
function login()
{
    const email = $('#email').val();
    const password = $('#password').val();
    if(email == " ") {
        alert("Please enter email address");
    }else if(password == " ") {
        alert("Please enter a password");
    }
    const user = {
        email : email,
        password : password
    };
    
    $.ajax({
        type: "POST",
        url: ""+url+"user/login",
        data: user,
        dataType: "json",
        success: function(resultData){
            sessionStorage.setItem("UserID", resultData.session.id);
            sessionStorage.setItem("email", resultData.session.email);
            sessionStorage.setItem("role", resultData.session.role);
            sessionStorage.setItem("Token", resultData.token);
            if(resultData.session.role == "Customer"){
                window.location.href = "/crm/customer/dashboard";
            }else if(resultData.session.role == "Seller"){
                window.location.href = "/crm/seller/dashboard";
            }
        }, error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Please check your email and password try again");
         }
    });
}
function getCustomerDashboarddata()
{
    setSession()
}
function getsellerDashboarddata()
{
    setSession();
}
function submitCustomerprofile()
{
    const fname = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const pincode = $('#pincode').val();
    const city = $('#city').val();
    const state = $('#state').val();
    const address = $('#address').val();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
        alert("Please enter a valid email address");
    }else if(fname == " ") {
        alert("Please enter a full name");
    }else if(phone == " ") {
        alert("Please enter a phone number");
    }else if(city == " ") {
        alert("Please enter city");
    }
    const user =     {
        "customerId": sessionStorage.getItem("UserID"),
        "fullName": fname,
        "email": email,
        "phoneNumber": phone,
        "pincode": pincode,
        "city": city,
        "state": state,
        "area": address
    }
    
    $.ajax({
        async: true,
        type: "PUT",
        url: ""+url+"customer/profile",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: user,
        dataType: "text",
        success: function(resultData){
            alert(resultData);
            window.location.href = "/crm/customer/profile";
        }
    });
}

function submitSellerprofile()
{
    const fname = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const pincode = $('#pincode').val();
    const city = $('#city').val();
    const state = $('#state').val();
    const address = $('#address').val();
    const gst = $('#gst').val();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
        alert("Please enter a valid email address");
    }else if(fname == " ") {
        alert("Please enter a full name");
    }else if(phone == " ") {
        alert("Please enter a phone number");
    }else if(city == " ") {
        alert("Please enter city");
    }
    const user =     {
        "sellerId": sessionStorage.getItem("UserID"),
        "fullName": fname,
        "email": email,
        "phoneNumber": phone,
        "pincode": pincode,
        "city": city,
        "state": state,
        "shopArea": address,
        "gstNum": gst,
    }
    
    $.ajax({
        async: true,
        type: "PUT",
        url: ""+url+"seller/profile",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: user,
        dataType: "text",
        success: function(resultData){
            alert(resultData);
            window.location.href = "/crm/seller/profile";
        }
    });
}

function getCustomerProdiledata(){
    setSession();
    $.ajax({
        type: "GET",
        url: ""+url+"customer/profile?customerId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            $('#name').val(resultData.fullName);
            $('#email').val(resultData.email);
            $('#phone').val(resultData.phoneNumber);
            $('#pincode').val(resultData.pincode)
            $('#city').val(resultData.city);
            $('#state').val(resultData.state);
            $('#address').val(resultData.area);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function getSellerProfiledata(){
    setSession();
    $.ajax({
        type: "GET",
        url: ""+url+"seller/profile?sellerId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            $('#name').val(resultData.fullName);
            $('#email').val(resultData.email);
            $('#phone').val(resultData.phoneNumber);
            $('#pincode').val(resultData.pincode)
            $('#city').val(resultData.city);
            $('#state').val(resultData.state);
            $('#address').val(resultData.shopArea);
            $('#gst').val(resultData.gstNum);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}
function getallproduct()
{
    checklogin();
    var productArray = [];
    let page = 1;
    $.ajax({
        type: "GET",
        url: ""+url+"product/"+page+"",
        dataType: "json",
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                console.log(resultData[key]);
                product = '<div class="col-lg-3 col-md-4 col-sm-6 pb-1"><div class="card product-item border-0 mb-4"><div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0"><img class="img-fluid w-100" src="'+resultData[key].imgpath+'" alt=""></div><div class="card-body border-left border-right text-center p-0 pt-4 pb-3"><h6 class="text-truncate mb-3">'+resultData[key].productName+'</h6><div class="d-flex justify-content-center"><h6>Rs '+resultData[key].productRate+' </h6></div></div><a style="text-align: center" href="http://localhost:8000/detail?id='+resultData[key].id+'" class="card-footer border">View Product Details</a></div></div>';
                productArray = productArray + product;
            });
            $('#products').html(productArray);
        }
    });
}
function getallproductbyCategory()
{
    checklogin();
    const urlParams = new URLSearchParams(location.search);
    let category = 0;
    for (const [key, value] of urlParams) {
        category = value;
    }
    $('#category').html(category);
    var productArray = [];
    $.ajax({
        type: "GET",
        url: ""+url+"product/category?category="+category+"",
        dataType: "json",
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                console.log(resultData[key]);
                product = '<div class="col-lg-3 col-md-4 col-sm-6 pb-1"><div class="card product-item border-0 mb-4"><div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0"><img class="img-fluid w-100" src="'+resultData[key].imgpath+'" alt=""></div><div class="card-body border-left border-right text-center p-0 pt-4 pb-3"><h6 class="text-truncate mb-3">'+resultData[key].productName+'</h6><div class="d-flex justify-content-center"><h6>Rs '+resultData[key].productRate+' </h6></div></div><a style="text-align: center" href="http://localhost:8000/detail?id='+resultData[key].id+'" class="card-footer border">View Product Details</a></div></div>';
                productArray = productArray + product;
            });
            $('#products').html(productArray);
        }
    });
}

function showproductdetail(){
    checklogin();
    const urlParams = new URLSearchParams(location.search);
    let id = 0;
    for (const [key, value] of urlParams) {
        id = value;
    }
    $.ajax({
        type: "GET",
        url: ""+url+"product/item/?id="+id+"",
        dataType: "json",
        success: function(resultData){
            product = '<div class="col-lg-5 pb-5"><div id="product-carousel" class="carousel slide" data-ride="carousel"><div class="carousel-inner border"><div class="carousel-item active"><img class="w-100 h-100" src="'+resultData[0].imgpath+'" alt="Image"></div></div></div></div><div class="col-lg-7 pb-5"><h3 class="font-weight-semi-bold">'+resultData[0].productName+'<input value="'+resultData[0].productName+'" id="productid" hidden></h3><h3 class="font-weight-semi-bold mb-4">Rs '+resultData[0].productRate+'</h3><p class="mb-4">'+resultData[0].productDiscription+'</p></p><div class="d-flex align-items-center mb-4 pt-2"><div class="input-group quantity mr-3" style="width: 130px;"><div class="input-group-btn"><input type="text" class="form-control bg-secondary text-center" id="quantity" value="1"></div><button class="btn btn-primary px-3" onclick="addtoCart('+resultData[0].id+')"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button></div></div><input id="productrate" value = "'+resultData[0].productRate+'" hidden/> ';
            $('#products').html(product);
        }
    });
}

function showAllproduct()
{
    setSession();
    var productArray = [];
    $.ajax({
        type: "GET",
        url: ""+url+"product/seller/?sellerId="+sessionStorage.getItem("UserID")+"",
        dataType: "json",
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                console.log(resultData);
                product = '<tr><td>'+resultData[key].id+'</td><td>'+resultData[key].productName+'</td><td>'+resultData[key].productRate+' Rs</td><td>'+resultData[key].productCategory+'</td><td><button class="btn btn-sm btn-danger" onclick="deleteProduct('+resultData[key].id+')">Delete</button></td></tr>';
                productArray = productArray + product;
            });
            $('#productSeller').html(productArray);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function deleteProduct(ProductId){
    $.ajax({
        type: "DELETE",
        url: ""+url+"product/item/?id="+ProductId+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "text",
        success: function(resultData){
            alert(resultData);
            window.location.href = "/crm/seller/products";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function getOrderbySeller()
{
    setSession();
    let customername;
    var customerphone;
    var customeraddress;
    var orderArray = [];
    $.ajax({
        type: "GET",
        url: ""+url+"order/seller?sellerId="+sessionStorage.getItem("UserID")+"",
        dataType: "json",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                $.ajax({
                    type: "GET",
                    url: ""+url+"customer/profile?customerId="+resultData[key].customerId+"",
                    headers: {
                        authorization: 'Bearer ' + sessionStorage.getItem("Token"),
                    },
                    dataType: "json",
                    success: function(resultCustData){
                        customername = resultCustData.fullName;
                        customerphone = resultCustData.phoneNumber;
                        customeraddress = resultCustData.area +' '+ resultCustData.city;
                        order = '<tr><td><button onclick="showProductsofOrder('+resultData[key].id+');" data-toggle="modal" data-target="#productModal" class="btn btn-sm btn-info">'+resultData[key].id+'</button></td><td>'+customername+'</td><td>'+resultData[key].createdAt+'</td><td>'+customeraddress+'</td><td>'+customerphone+'</td><td><button class="btn btn-sm btn-warning">'+resultData[key].orderStatus+'</button></td><td><button class="btn btn-dark btn-sm" onclick="deliveredOrder('+resultData[key].id+')">Delivered</button><button class="btn btn-sm btn-danger" onclick="cancelOrder('+resultData[key].id+')">Cancel</button></td></tr>';
                        orderArray = orderArray + order;
                        $('#orderSeller').html(orderArray);
                    }
                });
            });

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function getOrderbyCustomer()
{
    setSession();
    var orderArray = [];
    $.ajax({
        type: "GET",
        url: ""+url+"order/customer?custId="+sessionStorage.getItem("UserID")+"",
        dataType: "json",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                console.log(resultData);
                var date = new Date(resultData[key].createdAt);
                date.setDate(date.getDate() + 7);
                var product = String(resultData[key].productIds);
                order = '<tr><td><button type="button" onclick="showProductsofOrder('+resultData[key].id+');" data-toggle="modal" data-target="#productModal"  class="btn btn-sm btn-info">'+resultData[key].id+'</button></td><td>'+resultData[key].OrderDesciption+'</td><td>'+resultData[key].createdAt+'</td><td>'+date+'</td><td><button class="btn btn-sm btn-warning">'+resultData[key].orderStatus+'</button></td></tr>';
                orderArray = orderArray + order;
            });
            $('#orderCustomer').html(orderArray);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function showProductsofOrder(orderId)
{
    var productArray = [];
    $.ajax({
        type: "GET",
        url: ""+url+"order/?orderId="+orderId+"",
        dataType: "json",
        success: function(resultData){
            var productsString =  resultData[0].productIds;
            const products = JSON.parse(productsString);
            let sno = 1;
            for (let i = 0; i < products.length; i++) {
                $.ajax({
                    type: "GET",
                    url: ""+url+"product/item/?id="+products[i].product+"",
                    dataType: "json",
                    success: function(resultData){
                        product = '<tr><td>'+sno+'</td><td>'+resultData[0].productName+'</td><td>'+resultData[0].productCategory+'</td><td>'+resultData[0].productRate+'</td><td>'+products[i].quantity+'</td><td>'+products[i].quantity * resultData[0].productRate+'</td></tr>';
                        productArray = productArray + product;
                        sno++;
                        $('#orderProduct').html(productArray);
                    }
                });
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function addtoCart(ProductID)
{
    var userid = sessionStorage.getItem("UserID");
    var role = sessionStorage.getItem("role");
    if(role == "Seller"){
        alert("You Cannot add Products To Cart Please Login as Customer To Do So"); 
        return;
    }
    if(userid == null){
        alert("Please Login Before To Add Product");
        window.location.href = "/crm";
    }
    const quanitity = $('#quantity').val();
    const productname = $('#productid').val();
    const productrate = $('#productrate').val();
    const cart = {
        "custId": userid,
        "productId": ProductID,
        "productName": productname,
        "productRate": productrate,
        "productQuantity": quanitity
      }
    $.ajax({
        type: "POST",
        url: ""+url+"cart",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: cart,
        dataType: "text",
        success: function(resultData){
            alert("Product Successfully Added TO Cart");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Please Login Before Adding Product TO Cart");
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function viewCustomerCart() {
    checklogin();
    var productArr = [];
    var total = 0;
    var userid = sessionStorage.getItem("UserID");
    if(userid == null){
        alert("Please Login");
        window.location.href = "/crm";
    }
    $.ajax({
        type: "GET",
        url: ""+url+"cart/?custId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            if(resultData.length == 0){
                alert('Please Add Product To Cart');
                $("#checkoutbtn").prop('disabled', true);
            }else{
                Object.keys(resultData).forEach(key => {
                    total = total + resultData[key].productRate * resultData[key].productQuantity;
                    order = '<tr><td class="align-middle">'+resultData[key].productName+'</td><td class="align-middle">Rs '+resultData[key].productRate+'</td><td class="align-middle">'+resultData[key].productQuantity+'</td><td class="align-middle">Rs '+resultData[key].productRate * resultData[key].productQuantity+'</td><td class="align-middle"><button class="btn btn-sm btn-primary" onclick="removeItemfromCart('+resultData[key].id+')"><i class="fa fa-times"></i> Delete</button></td></tr>';
                    productArr = productArr + order;
                    $('#total').html(total + ' Rs');
                    $('#cartvalues').html(productArr);
                });
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                alert("Unauthorize User Please Login");
                window.location.href = "/crm";
            }
         }
    });
}

function clearPastUserDetails()
{
    sessionStorage.clear();
    $.ajax({
        type: "POST",
        url: ""+url+"user/logout",
        dataType: "json",
        success: function(resultData){
            console.log("Logout Sccessfully");
        },
    });
}

function removeItemfromCart(id)
{
    $.ajax({
        type: "DELETE",
        url: ""+url+"cart?id="+id+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "text",
        success: function(resultData){
            alert("Cart Item Deleted Successfully");
            window.location.href = "/cart";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                alert("Unauthorize User Please Login")
                window.location.href = "/crm";
            }
         }
    });
}

function contact(){
    checklogin();
}

function submitProduct(){
    const productName = $('#productName').val();
    const productRate = $('#productRate').val();
    const productCategory = $('#productCategory').val();
    const productImage = $('#productImage').val();
    const productDiscription = $('#productDiscription').val();
    if(productName == " "){
        alert("Please enter a product name");
    }else if(productRate == " "){
        alert("Please enter a product rate");
    }else if(productDiscription == " "){
        alert("Please enter a product discription");
    }

    const fileInput = $('#productImage')[0];
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        dataType: "text",
        contentType: false,
        processData: false,
        success: function (data) {
            product = {
                "sellerId": sessionStorage.getItem("UserID"),
                "imgpath": '/static/uploads/' + data,
                "productName": productName,
                "productRate": productRate,
                "productDiscription": productDiscription,
                "productCategory": productCategory
              }
              $.ajax({
                async: true,
                type: "POST",
                url: ""+url+"product",
                headers: {
                    authorization: 'Bearer ' + sessionStorage.getItem("Token"),
                },
                data: product,
                dataType: "text",
                success: function(resultData){
                    alert(resultData);
                    window.location.href = "/crm/seller/products";
                }
            });
        },
      });
}

function checkoutOrder()
{
    checklogin();
    var productArr = [];
    var total = 0;
    var userid = sessionStorage.getItem("UserID");
    if(userid == null){
        alert("Please Login");
        window.location.href = "/crm";
    }
    $.ajax({
        type: "GET",
        url: ""+url+"cart/?custId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                total = total + resultData[key].productRate * resultData[key].productQuantity;
                order = '<div class="d-flex justify-content-between"><p>'+resultData[key].productName+' '+resultData[key].productQuantity+'</p><p>Rs '+resultData[key].productRate+'</p></div>'
                productArr = productArr + order;
                $('#total').html(total + ' Rs');
                $('#cartvalues').html(productArr);
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                alert("Unauthorize User Please Login");
                window.location.href = "/crm";
            }
         }
    });

    $.ajax({
        type: "GET",
        url: ""+url+"customer/profile?customerId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            $('#name').val(resultData.fullName);
            $('#email').val(resultData.email);
            $('#phone').val(resultData.phoneNumber);
            $('#pincode').val(resultData.pincode)
            $('#city').val(resultData.city);
            $('#state').val(resultData.state);
            $('#address').val(resultData.area);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function makeOrderArray(productId, productQuantity,  sellerId) {
    console.log(productId, productQuantity, sellerId);
    const custId = sessionStorage.getItem("UserID");
    const OrderDesciption = $('#discription').val();
    var orderArray = '[{ "product": '+productId+', "quantity": '+productQuantity+'}]';
    const order = {
        "custId": custId,
        "sellerId": sellerId,
        "productIds": orderArray,
        "orderStatus": "Pending",
        "paymentStatus": "Completed",
        "OrderDesciption": OrderDesciption
      };
      console.log(order);
      $.ajax({
        type: "POST",
        url: ""+url+"order",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: order,
        dataType: "text",
        success: function(resultData){
            console.log("Order Created");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Please Login Before Placing The Order");
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
     
}

function getSeller(productId, productQuantity){
    $.ajax({
        type: "GET",
        url: ""+url+"product/item/?id="+productId+"",
        dataType: "json",
        success: function(resultData){
            sellerId = resultData[0].sellerId;
            makeOrderArray(productId, productQuantity, sellerId);
        }
    });
}

function placeOrder()
{
    var productarr = {};
    $.ajax({
        type: "GET",
        url: ""+url+"cart/?custId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "json",
        success: function(resultData){
            Object.keys(resultData).forEach(key => {
                productId = resultData[key].productId;
                productQuantity =  resultData[key].productQuantity;
                getSeller(productId, productQuantity);
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                alert("Unauthorize User Please Login");
                window.location.href = "/crm";
            }
         }
    });
    clearcartvalues();
}

function clearcartvalues() {
    $.ajax({
        type: "DELETE",
        url: ""+url+"cart/clear?custId="+sessionStorage.getItem("UserID")+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        dataType: "text",
        success: function(resultData){
            alert("Order Created Successfully");
            window.location.href = "/crm/customer/orders";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(errorThrown == "Forbidden"){
                window.location.href = "/crm";
            }
         }
    });
}

function deliveredOrder(orderID) {
    statusOrder = {
        "orderStatus": "Delivered",
    }
    $.ajax({
        type: "PUT",
        url: ""+url+"order/status?id="+orderID+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: statusOrder,
        dataType: "text",
        success: function(resultData){
            alert("Order Status Updated Successfully");
            window.location.href = "/crm/seller/orders";
        }
    });
}

function cancelOrder(orderID){
    statusOrder = {
        "orderStatus": "Canceled",
    }
    $.ajax({
        type: "PUT",
        url: ""+url+"order/status?id="+orderID+"",
        headers: {
            authorization: 'Bearer ' + sessionStorage.getItem("Token"),
        },
        data: statusOrder,
        dataType: "text",
        success: function(resultData){
            alert("Order Status Updated Successfully");
            window.location.href = "/crm/seller/orders";
        }
    });
}
