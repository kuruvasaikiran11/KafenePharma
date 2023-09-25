$(document).ready(function(){
    //Checking if user is logged in or not
    if(sessionStorage.getItem('isLoggedIn') === null || sessionStorage.getItem('isLoggedIn') === "false"){
        window.location.href = "../index.html";
    }

    //Fetching data from API
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", function (data) {
        console.log(data);
        usersData = data;
        renderTable(usersData);
    });
})

//logout Functionality
$("#logout-btn").click(function(){
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '../index.html';
});


//Handling the Search Filter Function
function handleFormSubmit(event) {
    event.preventDefault();   
}
window.handleSearch = function () {
    const searchTerm = document.querySelector(".SearchBox").value.toLowerCase();
    const filteredUsers = usersData.filter(function (user) {
      return user.fullName.toLowerCase().includes(searchTerm);
    });
    renderTable(filteredUsers); // Render filtered data
};
// Handle the reset button click event
window.handleReset = function () {
    document.querySelector(".SearchBox").value = ""; // Clear the search input
    renderTable(usersData); // Render the original data
};

//Showing data in Table
function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear the table body

    data.forEach(function (item) {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${item.id}</td>
        <td><img src="${item.profilePic}" alt="User Avatar" /></td>
        <td>${item.fullName}</td>
        <td>${item.dob}</td>
        <td>${item.gender}</td>
        <td>${item.currentCity}, ${item.currentCountry}</td>
      `;
      tableBody.appendChild(tableRow);
    });
}