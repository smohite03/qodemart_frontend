/*eslint-disable*/
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
        url: "http://localhost:3000/user",
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
        url: "http://localhost:3000/user/login",
        data: user,
        dataType: "json",
        success: function(resultData){
            sessionStorage.setItem("UserID", resultData.session.id);
            sessionStorage.setItem("email", resultData.session.email);
            sessionStorage.setItem("role", resultData.session.role);
            sessionStorage.setItem("Token", resultData.token);
        }
    });
}
function genrateReport()
{
   
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
        url: "http://localhost:3000/customer/profile",
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
        url: "http://localhost:3000/seller/profile",
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
    $.ajax({
        async: true,
        type: "GET",
        url: "http://localhost:3000/seller/profile",
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
