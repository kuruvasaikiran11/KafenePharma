const state = {
    orderList: [],
    filteredList: [],
    showNew: true,
    showPacked: true,
    showInTransit: true,
    showDelivered: true,
};

$(document).ready(function () {

    // if(localStorage.getItem('isLoggedIn') === "false"){
    //     window.location.href = "../index.html"; 
    // }
    if((sessionStorage.getItem('isLoggedIn') === "false") || (sessionStorage.getItem('isLoggedIn') === null)){
        window.location.href = "../index.html"; 
    }
    
    // Fetch data from the API
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', function (data) {
        state.orderList = data;
        state.filteredList = data;
        renderTable();
    });

    // Handle checkbox click events
    $('.FilterCheckbox input').on('change', function () {
        const type = $(this).attr('name').replace('orders-', '');
        const value = $(this).prop('checked');
        updateFilter(type, value);
    });
});

// $("#logout-btn").click(function(){
//     localStorage.setItem('isLoggedIn', 'false');
//     window.location.href = '../index.html';
// })

$("#logout-btn").click(function(){
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.href = '../index.html';
})


function renderTableRow(obj) {
    const day = obj.orderDate.split('-')[0];
    const month = obj.orderDate.split('-')[1];
    const year = obj.orderDate.split('-')[2];

    return `
        <tr class="TableRow" key="${obj.id}">
            <td class="SecondaryText">${obj.id}</td>
            <td class="PrimaryText">${obj.customerName}</td>
            <td class="PrimaryText">${day} ${month}, ${year} <br /><span class="SecondaryText">${obj.orderTime}</span></td>
            <td class="SecondaryText">$${obj.amount}</td>
            <td class="PrimaryText">${obj.orderStatus}</td>
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

function updateFilter(type, value) {
    switch (type) {
        case 'new':
            state.showNew = value;
            break;
        case 'packed':
            state.showPacked = value;
            break;
        case 'transit':
            state.showInTransit = value;
            break;
        case 'delivered':
            state.showDelivered = value;
            break;
    }

    state.filteredList = state.orderList.filter(function (item) {
        const isVisible =
            (state.showNew && item.orderStatus === 'New') ||
            (state.showPacked && item.orderStatus === 'Packed') ||
            (state.showInTransit && item.orderStatus === 'InTransit') ||
            (state.showDelivered && item.orderStatus === 'Delivered');

        return isVisible;
    });

    renderTable();
}