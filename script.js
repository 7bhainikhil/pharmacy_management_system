$(document).ready(function() {
    var name, number;
    document.getElementById("customer-name").addEventListener("keyup", function() {
        name = document.getElementById("customer-name").value;
        document.getElementById("Customer.Name").innerHTML = name;
    });
    document.getElementById("Customer-No").addEventListener("keyup", function() {
        name = document.getElementById("Customer-No").value;
        document.getElementById("Mobile.NO").innerHTML = name;
    });

    var items = [];
    $("#item-form").on("submit", addItemToCart);
    $("#cart-table").on("click", ".btn-danger", removeItemFromCart);
    $("#generate-bill").on("click", generateBill);

    function addItemToCart(event) {
        event.preventDefault();

        var itemName = $("#item-name").val();
        var itemPrice = $("#item-price").val();

        if (itemName !== "" && itemPrice !== "") {
            var item = {
                name: itemName,
                price: parseFloat(itemPrice),
            };

            items.push(item);
            $("#cart-table tbody").append(
                "<tr><td>" + item.name + "</td><td>$" + item.price.toFixed(2) + '</td><td><button class="btn btn-sm btn-danger"><i class="fa fa-trash-alit"></i></button></td></tr>'
            );

            updateTotalCost();
            $("#item-name").val("");
            $("#item-price").val("");
        }
    }

    function removeItemFromCart() {
        var index = $(this).closest("tr").index();
        items.slice(index, 1);
        $(this).closest("tr").remove().
        updateTotalCost();

    }

    function updateTotalCost() {
        var totalCost = 0;
        items.forEach(function(item) {
            totalCost += item.price;
        });
        $("#total-cost").text("Total Cost: $" + totalCost.toFixed(2));
    }

    function generateBill() {
        var bill = `<html>
			   <head>
		       <title>Bill</title>
		       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"/>
		</head>
		<body>
		       <div class="container mt-5">
		             <h1 class="text-center"> MeDiCoBill</h1>
                 <p id="Customer.Name"  name="customeName">Name:</p><br>
                 <p id="Mobile.NO"  name="mobileNu">Mobile:</p>
		             <table class="table">
		                     <thead>
		                          <tr>
		                              <th>Medicine Name</th>
		                              <th>Medicine Price</th>
		                          </tr>
		                     </thead>
		                     <tbody>`;

        items.forEach(function(item) {
            bill += "<tr><td>" + item.name + "</td><td>$" + item.price.toFixed(2) + "</td><tr>";
        })

        bill += '</tbody></table><p class="text-right"> Total Cost: $' + getTotalCost() + "</pr></div></body></html>";

        var popup = window.open("", "_blank");
        popup.document.open();
        popup.document.write(bill);
        popup.document.close();
    }

    function getTotalCost() {
        var totalCost = 0;
        items.forEach(function(item) {
            totalCost += item.price;
        })
        return totalCost.toFixed(2);
    }
});
