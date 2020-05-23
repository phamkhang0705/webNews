var checkout = {
    init: function () {
        checkout.regEvents();
    },
    GetDistrictByProvinceId: function (provinceId, districtId, controlSelect, optionAll) {
        $.ajax({
            url: '/Cart/GetDistrictByProvinceId',
            type: "Post",
            data: {
                provinceId: provinceId
            },
            async: true,
            success: function (response) {
                var val = $(controlSelect).val();
                var selected = '';
                $(controlSelect).empty();
                if (optionAll)
                    $(controlSelect).append('<option value="">Chọn quận/huyện</option>');
                if (!$.isEmptyObject(response))
                    $.each(response,
                        function (key, value) {
                            selected = districtId === value.Id ? "selected" : "";
                            $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.name + '</option>');
                        });
            },
            error: function (e) {
                SweetAlert("Có lỗi trong quá trình xử lý");
            }
        });
    },
    GetWardByDistrictId: function (districtId, wardId, controlSelect, optionAll) {
        $.ajax({
            url: '/Cart/GetWardByDistrictId',
            type: "Post",
            data: {
                districtId: districtId
            },
            async: true,
            success: function (response) {
                var val = $(controlSelect).val();
                var selected = '';
                $(controlSelect).empty();
                if (optionAll)
                    $(controlSelect).append('<option value="">Chọn phường/xã</option>');
                if (!$.isEmptyObject(response))
                    $.each(response,
                        function (key, value) {
                            selected = wardId === value.Id ? "selected" : "";
                            $(controlSelect).append('<option value="' +
                                value.Id +
                                '"' +
                                selected +
                                '>' +
                                value.name +
                                '</option>');
                        });
            },
            error: function (e) {
                SweetAlert("Có lỗi trong quá trình xử lý");
            }
        })
    },
    mask: function (show) {
        show = show || false;

        if (show == true) {
            $('#mask').addClass('in');
        } else {
            $('#mask').removeClass('in');
        }
    },
    regEvents: function () {

        $('#check_out_form').on('change',
            '#txtProvinceId',
            function (e) {
                e.preventDefault();
                var provinceId = $('#txtProvinceId').val();
                checkout.GetDistrictByProvinceId(provinceId, null, '#txtDistrictId', true);
            });

        $('#check_out_form').on('change',
            '#txtDistrictId',
            function (e) {
                e.preventDefault();
                var districtId = $('#txtDistrictId').val();
                checkout.GetWardByDistrictId(districtId, null, '#txtWardId', true);
            });

        $('#check_out_form').on('click', '#btnRegis',
            function (e) {
                e.preventDefault();
                var $form = $("#check_out_form").on();
                if ($form.valid()) {
                    var data = {
                        CustomerName: $form.find('#txtCustomerName').val(),
                        Phone: $form.find('#txtPhone').val(),
                        ProvinceId: $form.find('#txtProvinceId').val(),
                        DistrictId: $form.find('#txtDistrictId').val(),
                        WardId: $form.find('#txtWardId').val(),
                        Address: $form.find('#txtAddress').val()
                    }
                    $.ajax({
                        url: '/Cart/CheckOut',
                        type: "Post",
                        data: data,
                        async: true,
                        beforeSend: function () {
                            $("#loading").show();
                        }, complete: function () {
                            $("#loading").hide();
                        },
                        success: function (response) {
                            if (response.Status == "01") {
                                swal({
                                    title: 'Đặt hàng thành công',
                                    text: "Chúng tôi sẽ liên hệ lại ngay!",
                                    type: 'info',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Đóng'
                                }).then(function () {
                                    window.location.href = 'trang-chu';
                                })
                            } else {
                                swal("Có lỗi trong quá trình xử lý");
                            }
                        },
                        error: function (e) {
                            swal("Có lỗi trong quá trình xử lý");
                        }
                    });
                }
            });
    }
}
checkout.init();