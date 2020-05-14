var cart = {
    init: function () {
        cart.regEvents();
        setTimeout(cart.setQuantity(), 1000);
    },
    setQuantity: function (quantity) {
//        var qty = parseInt(localStorage.getItem('quantity'));
        $('.header-icons-noti').html(quantity);
    },
    regEvents: function () {
        var updateCart = function (quantity) {
//            localStorage.setItem('quantity', quantity);
            cart.setQuantity(quantity);
        }
        $('#btnContinue').off('click').on('click', function () {
            window.location.href = "/";
        });
        $('#btnPayment').off('click').on('click', function () {
            window.location.href = "/thanh-toan";
        });
        $('#btnUpdate').off('click').on('click', function () {
            var listProduct = $('.txtQuantity');
            var cartList = [];
            $.each(listProduct, function (i, item) {
                cartList.push({
                    Quantity: $(item).val(),
                    Product: {
                        ID: $(item).data('id')
                    }
                });
            });

            $.ajax({
                url: '/Cart/Update',
                data: { cartModel: JSON.stringify(cartList) },
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.Status == true) {
                        window.location.href = "/gio-hang";
                        updateCart(res.TotalQuantity);
                    }
                }
            });
        });

        $('#btnDeleteAll').off('click').on('click', function () {
            $.ajax({
                url: '/Cart/DeleteAll',
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.Status == true) {
                        window.location.href = "/gio-hang";
                        updateCart(res.TotalQuantity);
                    }
                }
            });
        });

        $('.btn-delete').off('click').on('click', function (e) {
            e.preventDefault();
            $.ajax({
                data: { id: $(this).data('id') },
                url: '/Cart/Delete',
                dataType: 'json',
                type: 'POST',
                success: function (res) {
                    if (res.Status == true) {
                        window.location.href = "/gio-hang";
                        updateCart(res.TotalQuantity);
                    }
                }
            });
        });

        $('.block2-btn-addcart').each(function () {
            $(this).on('click', function () {
                var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();
                var productId = $(this).parent().parent().data('id');
                $.ajax({
                    url: '/Cart/AddItem',
                    data: {
                        productId: productId,
                        quantity: 1
                    },
                    type: 'GET',
                    success: function (res) {
                        if (res.Status == true) {
                            swal("", "Thêm vào giỏ hàng thành công", "success");
                            var new_quantity = parseInt(res.TotalQuantity);
                            updateCart(new_quantity);
                        }
                    }
                });

            });
        });

        $('.btn-addcart').each(function () {
            $(this).on('click', function () {
                var nameProduct = $(this).data('name');
                var productId = $(this).data('id');
                $.ajax({
                    url: '/Cart/AddItem',
                    data: {
                        productId: productId,
                        quantity: 1
                    },
                    type: 'GET',
                    success: function (res) {
                        if (res.Status == true) {
                            swal("", "Thêm vào giỏ hàng thành công", "success");
                            var new_quantity = parseInt(res.TotalQuantity);
                            updateCart(new_quantity);
                        }
                    }
                });

            });
        });
    }
}
cart.init();