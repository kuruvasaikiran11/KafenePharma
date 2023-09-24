let user = "saisk";
let pass = "saisk";

$(document).ready(function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // Redirect to the order page if logged in
        window.location.href = 'orders/order.html';
    }

    $('.login').submit(function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        if ((username !== user) && (pass !== password)) {
            alert('Please Enter Valid Credentials: ' + username + ' ' + password);
        } else {
            // Save user details in localStorage
            // localStorage.setItem('username', username);
            localStorage.setItem('isLoggedIn', 'true');
            console.log("Correct")
            alert('Login Successful!');
            // Redirect to the home page (you may need to handle routing differently)
            window.location.href = 'orders/order.html';
        }
    });
});
