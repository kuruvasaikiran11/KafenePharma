const state = {
    productList: [],
    filteredList: [],
    showExpired: true,
    showLowStock: true,
};

$(document).ready(function () {

    if(sessionStorage.getItem('isLoggedIn') !== "true" || sessionStorage.getItem('isLoggedIn') === null){
        window.location.href = "../index.html"; 
    }

    // Fetch data from the API
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', function (data) {
        state.productList = data.map(function (item) {
            return {
                ...item,
                isExpired: new Date(item.expiryDate).getTime() < new Date().getTime(),
                isLowStock: item.stock < 100,
            };
        });
        state.filteredList = [...state.productList];
        renderTable();
    });

          
});

$("#logout-btn").click(function(){
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '../index.html';
});

function renderTableRow(obj) {
    const day = obj.expiryDate.split('-')[0];
    const month = obj.expiryDate.split('-')[1];
    const year = obj.expiryDate.split('-')[2];

    return `
        <tr class="TableRow ${obj.isExpired ? 'ExpiredRow' : ''}" key="${obj.id}">
            <td class="SecondaryText">${obj.id}</td>
            <td class="PrimaryText">${obj.medicineName}</td>
            <td class="SecondaryText">${obj.medicineBrand}</td>
            <td class="PrimaryText">${day} ${month}, ${year}</td>
            <td class="SecondaryText">$${obj.unitPrice}</td>
            <td class="SecondaryText">${obj.stock}</td>
        </tr>
    `;
}

function renderTable() {
    const tableRows = state.filteredList.map(function (item) {
        return renderTableRow(item);
    });
    $('#tableBody').html(tableRows.join(''));
    $('.TotalCount').text(`Count: ${state.filteredList.length}`);
} 

// function updateFilter(type, value) {
//     switch (type) {
//       case 'expired':
//         state.showExpired = value;
//         break;
//       case 'lowStock':
//         state.showLowStock = value;
//         break;
//     }
  
//     // Update the filtered list based on the updated state variables.
//     state.filteredList = state.productList.filter(function (item) {
//       return (state.showExpired || !item.isExpired) && (!state.showLowStock || item.stock >= 100);
//     });
  
//     // Render the table with the updated filtered list.
//     renderTable();
// }

//   // Handle checkbox click events
// $('.FilterCheckbox input').on('click', function () {
//     const type = $(this).attr('name').replace('product-', '');
//     const value = $(this).prop('checked');
//     updateFilter(type, value);
// });

function updateFilter(type, value) {
    switch (type) {
        case 'expired':
            state.showExpired = value;
            break;
        case 'low-stock':
            state.showLowStock = value;
            break;
    }

    // Update the filtered list based on the updated state variables.
    state.filteredList = state.productList.filter(function (item) {
        return (state.showExpired || !item.isExpired) && (state.showLowStock || item.stock >= 100);
    });

    // Render the table with the updated filtered list.
    renderTable();
}

// Handle checkbox click events
$('.FilterCheckbox input').on('change', function () {
    const type = $(this).attr('name').replace('product-', '');
    const value = $(this).prop('checked');
    updateFilter(type, value);
});

