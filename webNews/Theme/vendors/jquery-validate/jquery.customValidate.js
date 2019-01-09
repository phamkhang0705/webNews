
jQuery.validator.setDefaults({
    ignore: '',
    errorElement: 'span',
    highlight: function (element, error, valid) {
        $(element).css("border", "1px solid red");
        //$(element).focus();
    },
    errorPlacement: function (error, element) {
        var parent = element.parent();
        if (parent.hasClass('input-group')) {
            parent.parent().append(error);
        } else {
            parent.append(error);
        }
    },
    unhighlight: function (element) {
        $(element).css("border", "1px solid #d2d6de");
    },
    success: function (label) { // khi hết lỗi thì làm gì
        label.closest('.form-group').removeClass('has-error');
        label.remove();
    },
});

//==================================================================
//	Description:  		chỉ validate số điện thoại 
//                      nhập vào 09 hoặc 01 và với 09 thì phải nhập 10 ký tự và 01 là 11 ký tự		
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("phone", function (value, element) {
    if (value.length == 0)
        return true;
    var reg = "^[0](9[0-9]{8}|1[0-9]{9})$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Số điện thoại không đúng định dạng, vui lòng kiểm tra lại!");

//==================================================================
//	Description:  Kiểm tra số điện thoại đơn giản
//                  chỉ bắt là số và 10-11 ký tự 
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("phonenumber", function (value, element) {
    if (value.length == 0)
        return true;
    var x = value.substring(0, 1);
    if (x == '+') {
        value = value.substring(1, value.length);

    }
    var reg = "^[0-9]{10,12}$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Số điện thoại không đúng định dạng, gồm 10 hoặc 11 ký tự!");

jQuery.validator.addMethod("phonebase", function (value, element) {
    if (value.length == 0)
        return true;
    var x = value.substring(0, 1);
    if (x == '+') {
        value = value.substring(1, value.length);

    }
    var reg = "^[0-9]{1,20}$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Số điện thoại không đúng định dạng, gồm 10 hoặc 11 ký tự!");


//==================================================================
//	Description:  Validate số					
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("number", function (value, element) {
    var reg = "^[0-9]+$";
    reg = new RegExp(reg);
    if (value.length == 0)
        return true;
    else if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Trường dữ liệu không đúng định dạng, vui lòng kiểm tra lại!");

//==================================================================
//	Description:  validate email đúng định dạng					
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("email", function (value, element) {
    if (value.length == 0)
        return true;
    var reg = "^[a-zA-Z][a-zA-Z0-9\.\_]+@[a-zA-Z][a-zA-Z0-9\.\_]+[\.][a-zA-Z]{2,4}$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Email không đúng định dạng, vui lòng kiểm tra lại!");

//==================================================================
//	Description:  kiểm tra tên đăng nhập đúng định dạng		
//               không có khoảng trắng, không cho phép nhập ký tự đặc biệt, chấp nhận dấu gạch dưới “_”, phải có ít nhất 1 ký tự chữ.
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("username", function (value, element) {
    if (value.length == 0)
        return true;
    var reg = "^[a-zA-Z0-9]([a-zA-Z0-9\_]){4,24}$";
    reg = new RegExp(reg);
    var reg2 = "[a-zA-Z]";
    reg2 = new RegExp(reg2);
    if (reg.test(value) && reg2.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Tên đăng nhập không đúng định dạng, vui lòng kiểm tra lại!");

//==================================================================
//	Description:  kiểm tra string UTF8 - Latin
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("utf8string", function (value, element) {
    if (value.length == 0)
        return true;
    var latin = value.latinize().replace(/\s/g, "");
    var regex = "^[a-zA-Z0-9]+$";
    var reg = new RegExp(regex);
    return reg.test(latin);
}, "String không đúng định dạng");

//==================================================================
//	Description:  		validate chứng minh thư nhân dân của user 
//                      Chỉ bao gồm ký tự số và gồm 9 hoặc 10,12 ký tự		
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("idcard", function (value, element) {
    if (value.length == 0)
        return true;
    var reg = "^([0-9]{9,10}|[0-9]{12})$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "Chứng minh thư nhân dân không đúng định dạng, vui lòng kiểm tra lại!");

//==================================================================
//	Description:  		validate với select option default = -1
//	Author: LongLD
//==================================================================
jQuery.validator.addMethod("selectrequired", function (value, element) {
    if (value == '-1' || value.length == 0) {
        return false;
    } else {
        return true;
    };
}, "Vui lòng chọn!");

jQuery.validator.addMethod("comparedate", function (value, element, param) {
    try {
        var d1 = moment(value, language.DateTime_Format),
        d2 = moment(param.element.val(), language.DateTime_Format);
        if (param.type == 1) {
            return d1.valueOf() <= d2.valueOf();
        } else if (param.type == 2) {
            return d1.valueOf() >= d2.valueOf();
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}, "");