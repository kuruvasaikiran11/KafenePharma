
$(document).ready(function(){
    if((sessionStorage.getItem('isLoggedIn') === null) || (sessionStorage.getItem('isLoggedIn') === "false")){
        window.location.href = "index.html";
    }
})

$("#logout-btn").click(function(){
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '../index.html';
});