


var Service = function () {
    var base = this;
    this.ChecPermission = function (permission, callback) {
        //  callback();
        //return true;
        base.AuthenAjaxPost({
            Url: window.location.href + "/CheckPermission?permission=" + permission.toUpperCase()
        }, function (rs) {

            if (rs.code == "00") {
                alert(rs.message);
                return false;
            } else {
                callback();
                return true;
            }
        });
        return false;
    }
    this.CheckAuthen = function (option, fnSuccess, fnError) {
        $.ajax({
            url: option.Url,
            type: 'Post',
            data: option.Data,
            beforeSend: function () {
                base.RequestStart();
            },
            async: (option.async == undefined ? true : option.async),
            complete: function () {
                // base.RequestEnd();
            },
            success: function (rs) {
                if (!rs.IsAuthen)
                    base.RequestEnd();
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                if (!fnError)
                    Dialog.Alert(ServerError_Lang, Dialog.Error);
                if (typeof fnError === "function")
                    fnError(e);
                base.RequestEnd();
            }
        });
    }
    this.AjaxPostDemo = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.append("__RequestVerificationToken", $("input[name=__RequestVerificationToken]").val());
        }
        else {
            var data = new FormData();
            data.append("__RequestVerificationToken", $("input[name=__RequestVerificationToken]").val());
            option.Data = data;
        }
        if (option.CheckAuthen != false) {
            base.CheckAuthen({
                Url: "/Admin/Index/CheckAuthen",
            }, function (rs) {
                if (!rs.IsAuthen) {
                    Dialog.Alert(language.SessionTimeout, Dialog.Error, "Session Timedout", function () {
                        window.location = "/Admin/login?ReturnUrl=" + window.location.href;
                    });
                } else {
                    $.ajax({
                        url: option.Url,
                        type: 'Post',
                        //contentType: false,
                        //mimeType: false,
                        ////contentType: 'multipart/form-data',
                        ////mimeType: 'multipart/form-data',
                        //processData: false,
                        enctype: 'multipart/form-data',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: option.Data,
                        dataType: 'json',

                        beforeSend: function () {
                            base.RequestStart();
                        },
                        async: (option.async == undefined ? true : option.async),
                        complete: function () {
                            base.RequestEnd();
                        },
                        success: function (rs) {
                            if (typeof fnSuccess === "function")
                                fnSuccess(rs);
                        },
                        error: function (e) {
                            if (!fnError)
                                Dialog.Alert(language.Message_Error, Dialog.Error);
                            if (typeof fnError === "function")
                                fnError(e);
                        }
                    });
                }
            }, function (e) {
            });
        } else {
            $.ajax({
                url: option.Url,
                type: 'Post',
                //contentType: false,
                //mimeType: false,
                ////contentType: 'multipart/form-data',
                ////mimeType: 'multipart/form-data',
                //processData: false,
                enctype: 'multipart/form-data',
                cache: false,
                contentType: false,
                processData: false,
                data: option.Data,
                dataType: 'json',

                beforeSend: function () {
                    base.RequestStart();
                },
                async: (option.async == undefined ? true : option.async),
                complete: function () {
                    base.RequestEnd();
                },
                success: function (rs) {
                    if (typeof fnSuccess === "function")
                        fnSuccess(rs);
                },
                error: function (e) {
                    if (!fnError)
                        Dialog.Alert(language.Message_Error, Dialog.Error);
                    if (typeof fnError === "function")
                        fnError(e);
                }
            });
        }
    }

    this.RequestStart = function () {
        if ($("body > div.ajaxInProgress").length <= 0) {
            var str = '<div class="ajaxInProgress"><div class="loading-ct" >' +
                //'<i class="fa fa-spinner fa-pulse"></i>' +
                '<img src="/Assets/Admin/images/ajax-loader.gif">' +
                '<div>' + language.LoadingText + '</div>' +
                ' </div> </div>';
            $("body").append(str);
        }
        //console.log($('body > div.ajaxInProgress'));
        $("body > div.ajaxInProgress").show();
    },
        this.EncodeHtml = function (string) {
            var entityMap = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            return String(string).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });

        },
        this.RequestEnd = function () {
            if ($("body > div.ajaxInProgress").length > 0)
                $("body > div.ajaxInProgress").hide();
        }

    //nhannv Check authen before request
    this.AuthenAjaxPost = function (option, fnSuccess, fnError) {
        base.AjaxPost({
            Url: "/Admin/Index/CheckAuthen",
        }, function (rs) {

            if (!rs.IsAuthen) {
                Dialog.Alert(language.SessionTimeout, Dialog.Error, "Session Timedout", function () {
                    window.location = "/Admin/login?ReturnUrl=" + window.location.href;
                });

            } else {
                base.AjaxPost(option, fnSuccess, fnError);
            }

        }, function (e) {

        });

    }
    this.encodeHtml = function (r) {
        return r.replace(/[\x26\x0A\<>'"]/g, function (r) { return "&#" + r.charCodeAt(0) + ";" });
    }
    //----hoanglt Ajaxt get file
    this.AjaxPostFile = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
        }
        $.ajax({
            url: option.Url,
            type: 'Post',
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            data: option.Data,
            dataType: 'json',

            beforeSend: function () {
                base.RequestStart();
            },
            async: (option.async == undefined ? true : option.async),
            complete: function () {
                base.RequestEnd();
            },
            success: function (rs) {
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                if (!fnError)
                    Dialog.Alert(ServerError_Lang, Dialog.Error);
                if (typeof fnError === "function")
                    fnError(e);
            }
        });
    }

    //--Posst FormCollection
    this.AjaxPostFormCollection = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.append("__RequestVerificationToken", $("input[name=__RequestVerificationToken]").val());
        }
        else {
            var data = new FormData();
            data.append("__RequestVerificationToken", $("input[name=__RequestVerificationToken]").val());
            option.Data = data;
        }
        if (option.CheckAuthen != false) {
            base.CheckAuthen({
                Url: "/Admin/Index/CheckAuthen",
            }, function (rs) {
                if (!rs.IsAuthen) {
                    Dialog.Alert(language.SessionTimeout, Dialog.Error, "Session Timedout", function () {
                        window.location = "/Admin/login?ReturnUrl=" + window.location.href;
                    });
                } else {
                    $.ajax({
                        url: option.Url,
                        type: 'Post',
                        enctype: 'multipart/form-data',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: option.Data,
                        dataType: 'json',

                        beforeSend: function () {
                            base.RequestStart();
                        },
                        async: (option.async == undefined ? true : option.async),
                        complete: function () {
                            base.RequestEnd();
                        },
                        success: function (rs) {
                            if (typeof fnSuccess === "function")
                                fnSuccess(rs);
                        },
                        error: function (e) {
                            if (!fnError)
                                Dialog.Alert(ServerError_Lang, Dialog.Error);
                            if (typeof fnError === "function")
                                fnError(e);
                        }
                    });
                }
            }, function (e) {
            });
        } else {
            $.ajax({
                url: option.Url,
                type: 'Post',
                enctype: 'multipart/form-data',
                cache: false,
                contentType: false,
                processData: false,
                data: option.Data,
                dataType: 'json',

                beforeSend: function () {
                    base.RequestStart();
                },
                async: (option.async == undefined ? true : option.async),
                complete: function () {
                    base.RequestEnd();
                },
                success: function (rs) {
                    if (typeof fnSuccess === "function")
                        fnSuccess(rs);
                },
                error: function (e) {
                    if (!fnError)
                        Dialog.Alert(ServerError_Lang, Dialog.Error);
                    if (typeof fnError === "function")
                        fnError(e);
                }
            });
        }
    }

    this.AjaxPost = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
        }
        //Loading();
        //  console.log(option.Data);
        $.ajax({
            url: option.Url,
            type: 'Post',
            data: option.Data,
            //headers: {
            //    'X-Request-Verification-Token': verificationToken
            //},
            beforeSend: function () {
                base.RequestStart();
            },
            async: (option.async == undefined ? true : option.async),
            complete: function () {
                base.RequestEnd();
            },
            success: function (rs) {
                //EndLoading();
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                //EndLoading();
                if (typeof fnError === "function")
                    fnError(e);
            }
        });
    }
    this.AjaxPostSearch = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
        }
        //  console.log(option.Data);
        var me = $(this);
        if (me.data('requestRunning')) {
            return;
        }
        me.data('requestRunning', true);
        $.ajax({
            url: option.Url,
            type: 'Post',
            data: option.Data,
            //headers: {
            //    'X-Request-Verification-Token': verificationToken
            //},
            beforeSend: function () {
                base.RequestStart();
            },
            async: (option.async == undefined ? true : option.async),
            complete: function () {
                me.data('requestRunning', false);
                base.RequestEnd();
            },
            success: function (rs) {
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                if (typeof fnError === "function")
                    fnError(e);
            }
        });
    }
    this.AjaxPostList = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
        }
        $.ajax({
            url: option.Url,
            type: 'Post',
            data: option.Data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                base.RequestStart();
            },
            complete: function () {
                base.RequestEnd();
            },
            success: function (rs) {
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                if (typeof fnError === "function")
                    fnError(e);
            }
        });
    }

    this.AjaxGet = function (option, fnSuccess, fnError) {
        if (option.Data) {
            option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
        }
        $.ajax({
            url: option.Url,
            type: 'Get',
            data: option.Data,
            beforeSend: function () {
                base.RequestStart();
            },
            complete: function () {
                base.RequestEnd();
            },
            success: function (rs) {
                if (typeof fnSuccess === "function")
                    fnSuccess(rs);
            },
            error: function (e) {
                if (typeof fnError === "function")
                    fnError(e);
            }
        });
    }

    this.JoinObject = function (oldObj, newObj) {
        if (typeof oldObj === "object" && oldObj != null
            && typeof newObj === "object" && newObj != null) {
            for (var key in newObj) {
                if (newObj.hasOwnProperty(key)) {
                    oldObj[key] = newObj[key];
                }
            }
        }
        return oldObj;
    }

    this.NumberToString = function (value) {
        return value != null ? value.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
    };

    this.DateToString = function (value, fomart) {
        return moment(new Date(parseInt(value.slice(6, -2)))).format(fomart);
    };

    this.round = function (value) {
        var val = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        return (val * 100) / 100;
    }

    this.getFormData = function ($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    //==================================================================
    //	Description:  Bootstrap Table					 Option, function
    //	Author: 
    //==================================================================
    this.Sprintf = function (str) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace(/%s/g, function () {
            var arg = args[i++];

            if (typeof arg === 'undefined') {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    };
    this.BootstrapTableOption1 = function (option) {

        var obj = {
            locale: 'vi',
            classes: 'table table-hover table-condensed',
            cache: false,
            striped: true,
            height: 'auto',
            pagination: true,
            pageSize: 15,
            pageList: [15, 20, 30, 50, 100],
            paginationFirstText: 'Trang đầu',
            paginationPreText: 'Trước',
            paginationNextText: 'Sau',
            paginationLastText: 'Trang cuối',
            showFooter: false,
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return base.Sprintf('Tổng: %s', totalRows);
            },
            formatRecordsPerPage: function (pageNumber) {
                return base.Sprintf('Hiển thị %s dòng trên trang', pageNumber);
            },
            formatLoadingMessage: function () {
                return '<div class="ajaxInProgress"> <div class="loading-ct" >' +
                    '<img src="/Assets/Admin/images/ajax-loader.gif">' +
                    '<div>' + language.LoadingText + '</div>' +
                    '</div> </div>';
            },
            formatNoMatches: function () {
                return "Không tìm thấy dữ liệu theo điều kiện tìm kiếm. Vui lòng thử lại";
            },

            method: 'post',
            sidePagination: 'server',
            queryParams: function (params) {
                return params;
            },
            responseHandler: function (res) {
                if (res.total == 0) {
                    Dialog.Alert("Không tìm thấy dữ liệu theo điều kiện tìm kiếm!", Dialog.Error);
                    return {
                        total: 0,
                        rows: []
                    };
                } else {
                    return {
                        total: res.total,
                        rows: res.data
                    };
                }
            },
        };

        return base.JoinObject(obj, option);
    }
    this.BootstrapTableOption = function (option) {

        var obj = {
            locale: language.localeTable,
            classes: 'table table-condensed', // table-hover
            cache: false,
            pagination: true,
            pageSize: 10,
            pageList: [10, 15, 20, 30, 50, 100],
            formatLoadingMessage: function () {
                return '<div class="ajaxInProgress"> <div class="loading-ct" >' +
                    '<img src="/Assets/Admin/images/ajax-loader.gif">' +
                    '<div>' + language.LoadingText + '</div>' +
                    '</div> </div>';
            },

            method: 'post',
            sidePagination: 'server',
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return 'Tổng: ' + totalRows + ' ';
            },
            formatRecordsPerPage: function (pageNumber) {
                return 'Hiển thị ' + pageNumber + ' bản ghi trên trang';
            },
            formatNoMatches: function () {
                return 'Không tìm thấy dữ liệu theo điều kiện tìm kiếm. Vui lòng thử lại!';
            },
            queryParams: function (params) {
                return params;
            },
            responseHandler: function (res) {
                return {
                    total: res.total,
                    rows: res.data
                };
            },
        };

        return base.JoinObject(obj, option);
    }

    this.BootstrapTableOptionClient = function (option) {

        var obj = {
            locale: 'vi',
            classes: 'table table-condensed table-hover table-bordered table-striped',
            pagination: true,
            height: 'auto',
            pageSize: 5,
            pageList: [10, 15, 20, 30, 50, 100],
            showHeader: true,
            sidePagination: 'client',
            formatLoadingMessage: function () {
                return '<div class="ajaxInProgress"> <div class="loading-ct" >' +
                    '<img src="/Assets/Admin/images/ajax-loader.gif">' +
                    '<div>' + language.LoadingText + '</div>' +
                    '</div> </div>';
            },
            formatShowingRows: function (pageFrom, pageTo, totalRows) {
                return 'Tổng: ' + totalRows + ' ';
            },
            formatRecordsPerPage: function (pageNumber) {
                return 'Hiển thị ' + pageNumber + ' bản ghi trên trang';
            }
        };

        return base.JoinObject(obj, option);
    }

    this.BootstrapTableColumn = function (type, option) {
        var align = "";
        var formatFn;
        var className = "";
        if (typeof type === "function")
            type = type();
        switch (type) {
            case "Number":
                align = "right";
                className = "row-number";
                formatFn = function (value) {
                    return value ? value.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
                break;
            case "Number2":
                align = "right";
                className = "row-number";
                formatFn = function (value) {
                    return value ? value.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
                break;
            case "NumberNull":
                align = "right";
                className = "row-number";
                formatFn = function (value) {
                    if (value == null) {
                        return "";
                    } else
                        return value ? value.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
                break;
            /*  - phase 2 báo cáo cần view date ko */
            case "Date0":
                align = "center";
                className = "row-date";
                formatFn = function (value) {
                    return value ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY') : "";
                }
                break;
            //case "DateTime0":
            //    align = "center";
            //    className = "row-date";
            //    formatFn = function (value) {
            //        return value ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "";
            //    }
            //    break;
            /*  - Dự án này áp dụng luôn 1 kiêu date format */
            case "DateTimeFull":
            case "Date":
            case "DateTime":
                align = "center";
                className = "row-date";
                formatFn = function (value) {
                    return value ? moment(new Date(parseInt(value.slice(6, -2)))).format(language.DateTime_Format) : "";
                }
                break;
            default:
                align = "left";
                className = "row-string";
                formatFn = function (value) {
                    value = value != undefined ? value : "";
                    return value.length>=20 ? value.substring(0,20)+'...' : value;
//                    return value;
                }
                break;
        }
        var obj = {
            align: align,
            valign: "middle",
            width: "100px",
            'class': className,
            formatter: formatFn,
        };
        return base.JoinObject(obj, option);
    }

    this.BootstrapTableSTT = function (table, index) {
        var option = table.bootstrapTable('getOptions');
        var i = (option.pageNumber - 1) * option.pageSize;
        return i + index + 1;
    }

    this.ResponseHandlerFooter = function (res) {
        var obj = {
            total: res.total,
            rows: res.data != null ? res.data : [],
        };
        obj.rows.Footer = res.footer;
        return obj;
    }

    this.Sum = function (items, prop) {
        return items.reduce(function (a, b) {
            var num1 = isNaN(parseFloat(a)) ? 0 : parseFloat(a);
            var num2 = isNaN(parseFloat(b[prop])) ? 0 : parseFloat(b[prop]);
            return num1 + num2;
        }, 0);
    };

    this.FormatMoney = function (val) {
        val = isNaN(parseFloat(val)) ? 0 : parseFloat(val);
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };

    this.ResponseHandlerSearch = function (res, $modalSearch, $table) {
        $modalSearch.modal("hide");
        if (res.total == 0) {
            $("body").css('padding-right', 0);
            $table.bootstrapTable('removeAll');
            Dialog.Alert(Message_DataSearch_Null_Lang, Dialog.Error);
        }
        return {
            total: res.total,
            rows: res.data
        };
    },

        // - ResetView Table
        this.ResetViewTable = function ($table) {
            $table.bootstrapTable('resetView');
        };

    // -  setup amount-mask
    this.SetupAmountMask = function () {
        //Mask_groupSeparator: '.',
        //Mask_radixPoint: ',',
        //Mask_integerDigits: 11,
        //Mask_digits: 0,
        $('.amount-mask').on().inputmask({
            alias: 'decimal',
            placeholder: '',
            groupSeparator: language.Mask_groupSeparator,
            radixPoint: language.Mask_radixPoint,
            autoGroup: true,
            digits: language.Mask_digits,
            allowPlus: false,
            allowMinus: false,
            autoUnmask: true,
            integerDigits: language.Mask_integerDigits
        });
        $('.amount-mask2').on().inputmask({
            alias: 'decimal',
            placeholder: '',
            groupSeparator: language.Mask_groupSeparator,
            radixPoint: language.Mask_radixPoint,
            autoGroup: true,
            digits: language.Mask_digits,
            allowPlus: true,
            allowMinus: true,
            autoUnmask: true,
            integerDigits: language.Mask_integerDigits
        });
        $('.discount-mask').inputmask({
            alias: "percentage",
            placeholder: '',
            radixPoint: language.Mask_radixPoint,
            autoUnmask: true,
        });
    }

    // -  set date
    this.DefaultDate = function () {
        var dfFormDate = new Date();
        var defaultDate = new Date();
        var dfToDate = new Date();
        var dfMax = new Date();
        dfFormDate.setHours(0);
        dfFormDate.setMinutes(0);
        dfFormDate.setSeconds(0);
        dfFormDate.setMilliseconds(000);
        dfToDate.setHours(23);
        dfToDate.setMinutes(59);
        dfToDate.setSeconds(59);
        dfToDate.setMilliseconds(000);
        dfMax.setHours(23);
        dfMax.setMinutes(59);
        dfMax.setSeconds(59);
        dfMax.setMilliseconds(999);
        return {
            Default: defaultDate,
            FormDate: dfFormDate,
            ToDate: dfToDate,
            MaxDate: dfMax,
            MomentFromDate: moment(dfFormDate),
            MomentToDate: moment(dfToDate),
            MomentMaxDate: moment(dfMax)
        }
    }
    this.SetMinDateMaxDate = function () {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return {
            FirstDay: firstDay,
            LastDay: lastDay
        }
    }
    this.SetupInputDate = function (input1) {
        input1.datetimepicker({
            format: language.Date_Format,
            showTodayButton: true,
            maxDate: base.DefaultDate().MomentMaxDate,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }

    this.SetupDateTimeNomal = function (input) {
        input.datetimepicker({
            format: language.DateTime_Format,
            showTodayButton: true,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }

    // -  set date
    this.SetupDateTime = function (input1, input2) {
        input1.datetimepicker({
            format: language.DateTime_Format,
            showTodayButton: true,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true,
        });
        input2.datetimepicker({
            format: language.DateTime_Format,
            showTodayButton: true,
            defaultDate: base.DefaultDate().MomentToDate,
            showClose: true,
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }
    this.SetupDateTimeNon = function (input1, input2) {
        input1.datetimepicker({
            format: language.DateTime_Format,
            showTodayButton: true,
            //maxDate: base.DefaultDate().MomentMaxDate,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true,
        });
        input2.datetimepicker({
            format: language.DateTime_Format,
            showTodayButton: true,
            //maxDate: base.DefaultDate().MomentMaxDate,
            defaultDate: base.DefaultDate().MomentToDate,
            showClose: true,
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }
    this.SetupDate_Not_Time = function (input1, input2) {
        input1.datetimepicker({
            format: language.Date_Format,
            showTodayButton: true,
            maxDate: base.DefaultDate().MomentMaxDate,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true,
        });
        input2.datetimepicker({
            format: language.Date_Format,
            showTodayButton: true,
            maxDate: base.DefaultDate().MomentMaxDate,
            defaultDate: base.DefaultDate().MomentToDate,
            showClose: true,
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }
    this.SetupDateTimeCurrentMoth = function (input1) {

        var currentYear = (new Date).getFullYear();
        //var currentMonth = (new Date).getMonth() + 1;
        //var currentDay = (new Date).getDate();

        input1.datetimepicker({
            format: language.DateTime_Format,
            //changeMonth: false,
            //changeYear: false,
            showTodayButton: true,
            defaultDate: base.DefaultDate().MomentFromDate,
            showClose: true,
            minDate: new Date(currentYear, 11, 1),
            maxDate: new Date(currentYear, 11, 31)
        });
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
    }
    this.SetupOnlyDate = function (input1) {
        input1.datetimepicker({
            format: language.Date_Format,
            showTodayButton: true,
            defaultDate: Sv.DefaultDate().MomentFromDate,
            showClose: true
        });
    }
    this.SetupOnlyYear = function (input1) {
        input1.datetimepicker({
            format: "YYYY",
            showTodayButton: true,
            defaultDate: Sv.DefaultDate().MomentFromDate,
            showClose: true
        });
    }
    this.SetupOnlyMonth = function (input1) {
        input1.datetimepicker({
            format: "MM",
            showTodayButton: true,
            defaultDate: Sv.DefaultDate().MomentFromDate,
            showClose: true
        });
    }
    this.SetupDateAndSetDefault = function (input, defaultDate) {
        input.datetimepicker({
            format: language.Date_Format,
            showTodayButton: true,
            showClose: true,
            defaultDate: defaultDate
        });
    }

    this.SetupDateAndSetDefaultNotMaxDate = function (input, defaultDate) {
        input.datetimepicker({
            format: "DD-MM-YYYY HH:mm:ss",
            showTodayButton: true,
            showClose: true,
            defaultDate: defaultDate
        });
    }

    this.SetupDate = function () {
        for (i = 0; i < arguments.length; i++) {
            var input = arguments[i];
            input.datetimepicker({
                format: language.Date_Format,
                showTodayButton: true,
                maxDate: base.DefaultDate().MomentMaxDate,
                defaultDate: base.DefaultDate().MomentFromDate,
                showClose: true,
            });
        }
        $('.datemask').inputmask({
            alias: language.DateTime_Alias,
            placeholder: ""
        });
        $('.date1mask').inputmask({
            alias: language.Date_Alias,
            placeholder: ""
        });
    }


    this.BindPopup = function (url, model, callback) {
        base.AjaxPost({
            Url: url,
            Data: model
        }, function (rs) {
            if (rs.Status === "00") {
                Dialog.Alert(rs.Message, Dialog.Error);
            } else {
                if (typeof callback == "function")
                    callback(rs);
            }
        }, function () {
            Dialog.Alert(ServerError_Lang, Dialog.Error);
        });
    }


    this.ConfigAutocomplete = function (idControl, url, displayField, valueField, triggerLength, fnSelect, fnQuery, fnProcess, option) {
        var optionDefault = {
            onSelect: function (item) {
                $(idControl).data("seletectedValue", item.value);
                $(idControl).data("seletectedText", item.text);
                //$(idControl).valid();
                if (typeof (fnSelect) == "function")
                    fnSelect(item);
            },
            cache: false,
            ajax: {
                url: url,
                timeout: 500,
                displayField: displayField,
                valueField: valueField,
                cache: false,
                triggerLength: triggerLength,
                loadingClass: "ax",
                preDispatch: (fnQuery == undefined ? function (query) {
                    return {
                        search: query
                    }
                } : fnQuery),
                preProcess: (fnProcess == undefined ? function (data) {
                    if (data.success === false) {
                        return false;
                    }
                    return data;
                } : fnProcess)
            }
        }
        $.extend(optionDefault, option);
        $(idControl).typeahead(optionDefault);
    }

    //==================================================================
    //	Description:  config 	Typeahead				
    //	Author:  dirUpload DirViewFile DefaultUrl
    //==================================================================
    this.ConfigTypeahead = function ($e, option) {
        var optionDefault = {
            onSelect: function (item) {
                $e.data("object", JSON.parse(item.object));
                $e.data("seletectedValue", item.value);
                $e.data("seletectedText", item.text);
                if (typeof (option.onSelect) == "function")
                    option.onSelect(item);
            },
            cache: false,
            fillValueOld: false,
            ajax: {
                url: option.url,
                timeout: option.timeout ? option.timeout : 500,
                displayField: option.displayField,
                valueField: option.valueField,
                cache: false,
                triggerLength: option.triggerLength ? option.triggerLength : 2,
                loadingClass: option.loadingClass ? option.loadingClass : "",
                preDispatch: function (query) {
                    if (option.preDispatch == undefined)
                        return {
                            search: query
                        }
                    else
                        return option.preDispatch(query);
                },
                preProcess: function (data) {
                    if (option.preProcess == undefined) {
                        if (data.success === false) {
                            return false;
                        }
                        return data;
                    } else {
                        return option.preProcess(data);
                    }
                },
                loading: function (check) {
                    check ? base.RequestStart() : base.RequestEnd();
                },
            }
        }
        $.extend(optionDefault, option);
        $e.typeahead(optionDefault);
    }

    this.FormReset = function () {
        var optiondefault = {
            Type: "",
            Value: "",
            Element: $(".FormSearchInput"),
            Custom: undefined,
        }

        for (var i = 0; i < arguments.length; i++) {
            // lấy ra các option
            var option = arguments[i];
            var options = {};
            // check nếu option == input => gán vào element
            if (!option.Element)
                options.Element = option;
            else
                options = option;

            // Extend với thằng default (bổ sung những giá trị mà người dùng ko điền (những giá trị default))
            options = $.extend({}, optiondefault, options);
            if (options.Custom && typeof options.Custom === "function") {
                options.Custom(options.Element);
                continue;
            }
            // check tồn tại element
            if (options.Element.length == 0) continue;
            // check type(date, datetime, datetimefull,number,text, hoặc để tự nó làm (custom))
            switch (options.Type) {
                case "Date":
                    if (options.Value)
                        options.Element.data("DateTimePicker").date(options.Value);
                    else
                        options.Element.data("DateTimePicker").date(new Date(moment().format('YYYY-MM-DD HH:MM:SS')));
                    break;
                case "Typeahead":
                    options.Element.data("seletectedValue", "");
                    options.Element.data("seletectedText", "");
                    options.Element.data("seletectedObject", {});
                    options.Element.val("");
                    break;
                case "Number":
                    options.Element.val(0);
                    break;
                default:
                    if (options.Value)
                        options.Element.val(options.Value);
                    else
                        options.Element.val("");
                    break;
            }
        }
    };
    this.DocSo = function ($e, val) {
        if (val > 0) {
            $e.html(language.MoneyToString(val));
        } else {
            $e.html("");
        }
    }
    this.LoadTableSearch = function ($table, url, showDialog) {
        $table.bootstrapTable('refreshOptions', {
            url: url,
            responseHandler: function (res) {
                if (res.Status) {
                    if (res.Status == "URL") {
                        window.location.assign(res.Message);
                        return false;
                    }
                    if (res.Status == "Login") {
                        window.location = "/Admin/login?ReturnUrl=" + window.location.href;
                        return false;
                    }
                    return base.ResponseHandler($table, showDialog, res.Data);
                } else {
                    return base.ResponseHandler($table, showDialog, res);
                }
            },
            sidePagination: 'server',
        });
    }

    this.GetUrlFileUpload = function () {
        var appSetting = '@(System.Configuration.ConfigurationManager.AppSettings["DirViewFile"].ToString())';
        return appSetting;
    }
    //--ResetForm
    this.ResetForm = function ($form, $fdate, $todate) {
        var validator = $form.validate();
        validator.resetForm();
        $form.each(function () {
            this.reset();
        });
        if ($form.find($fdate).length > 0) {
            $form.find($fdate).data("DateTimePicker").date(Sv.DefaultDate().MomentFromDate);
        }
        if ($form.find($todate).length > 0) {
            $form.find($todate).data("DateTimePicker").date(Sv.DefaultDate().MomentToDate);
        }
    }
    this.ResetFormOnly = function ($form) {
        var validator = $form.validate();
        validator.resetForm();
        $form.each(function () {
            this.reset();
        });
    }
    //HoangLT customize pagging
    this.PaggingService = function (option, fnSuccess, fnError) {
        $(".pagination li a").click(function (e) {
            var link = $(this).attr('data-value');
            var page = parseInt($(this).html());
            var className = $(this).parent().attr("class").trim();
            if (className == 'page-pre' || className == 'page-next' || className == 'page-first' || className == 'page-last') {
                page = parseInt($(this).attr('data-id'));
            }
            if (option.Data) {
                option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
            }
            var me = $(this);
            if (me.data('requestRunning')) {
                return;
            }
            me.data('requestRunning', true);

            $.ajax({
                url: link,
                type: 'Post',
                data: { search: option.Data, page: page },
                beforeSend: function () {
                    base.RequestStart();
                },
                async: (option.async == undefined ? true : option.async),
                complete: function () {
                    me.data('requestRunning', false);
                    base.RequestEnd();
                },
                success: function (rs) {
                    if (typeof fnSuccess === "function")
                        fnSuccess(rs);
                },
                error: function (e) {
                    if (typeof fnError === "function")
                        fnError(e);
                }
            });
        });
    }
    this.ChangePageNumber = function (option, fnSuccess, fnError) {
        $('#dropPagging li a').on('click', function () {
            var numpage = parseInt($(this).html());
            if (option.Data) {
                option.Data.__RequestVerificationToken = $("input[name=__RequestVerificationToken]").val();
                option.Data.Numperpage = numpage;
            }
            $(option.HidentNumperPage).val(numpage);
            $("#dropPagging li").find(".active").removeClass("active");
            $(this).parent().addClass("active");
            var me = $(this);
            if (me.data('requestRunning')) {
                return;
            }
            me.data('requestRunning', true);

            $.ajax({
                url: option.Url,
                type: 'Post',
                data: { search: option.Data, page: option.Page },
                beforeSend: function () {
                    base.RequestStart();
                },
                async: (option.async == undefined ? true : option.async),
                complete: function () {
                    me.data('requestRunning', false);
                    base.RequestEnd();
                },
                success: function (rs) {
                    if (typeof fnSuccess === "function")
                        fnSuccess(rs);
                },
                error: function (e) {
                    if (typeof fnError === "function")
                        fnError(e);
                }
            });
        });
    }
    //Bind Footer

    this.totalTextFormatter = function (data) {
        return language.TextTotal;
    }
    this.sumFormatter = function (data) {
        var field = this.field;
        var totalSum = data.reduce(function (sum, row) {
            return (sum) + (row[field] || 0);
        }, 0);
        return totalSum ? totalSum.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
    }

    this.getAllUrlParams = function (url) {

        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

        // we'll store the parameters here
        var obj = {};

        // if query string exists
        if (queryString) {

            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];

            // split our query string into its component parts
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');

                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });

                // set parameter value (use 'true' if empty)
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                paramValue = paramValue.toLowerCase();

                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }

        return obj;
    };
    this.Loading = function () {
        var str =
            '<div id="modal-loading-parent"  class="modal fade" role="dialog" style="opacity: 0.6;background: #000;display: block;">' +
            ' </div>' +
            '<div id="modal-loading"  class="modal fade" style="margin-top: 14%;">' +
            '<div class="modal-dialog">' +
            '  <div class="modal-content">' +
            '  <div class="modal-body text-center">' +
            '   <br />' +
            ' <i class="fa fa-spinner fa-4x fa-spin" style="margin-bottom: 20px;"></i>' +
            ' <h4>Đang xử lý dữ liệu, vui lòng đợi trong giây lát...</h4>' +
            ' <br />' +
            '<br />' +
            ' </div>' +
            ' </div>' +
            ' </div>' +
            ' </div>' +
            '<input type="button" data-toggle="modal" data-target="#modal-loading" id="popdialogloading" style="display:none" />';
        $('body').append(str);
        $('#popdialogloading').click();
    };
    this.EndLoading = function () {
        setTimeout(function () {
            $('body').find('div#modal-loading').remove();
            $('body').find('div#modal-loading-parent').remove();
            $('.modal-backdrop').remove();
            $('#popdialogloading').remove();
            $('body').removeClass('modal-open');
            $('body').removeAttr('style');
        },
            500);
    };

    this.GetImageBase64 = function (file, $image) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            $image.attr('src', reader.result);
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
};
var Sv = new Service();

$(document).ready(function () {
    /*  Description: Cấu hình datetimepicker
                Author: PMNinh  */
    $('.input-date').datetimepicker({
        locale: language.localeDate,
        format: language.Date_Format,
        showTodayButton: true,
        showClose: true
    });

    /*  Description: Cấu hình datetimepicker (hiển thị cả giờ phút)
        Author: PMNinh  */
    $('.input-datetime').datetimepicker({
        locale: language.localeDate,
        format: language.DateTime_Format,
        showTodayButton: true,
        showClose: true
    });

    /*  Description: Cấu hình bootsrtap select
        Author: PMNinh  */
    //$('.selectpicker').selectpicker({
    //    liveSearch: true,
    //    style: 'btn-default',
    //    size: 10,
    //    noneSelectedText: ''
    //});

    /*  Description: Cấu hình Mask cho các control nhập số tiền (ko có phần thập phân)
        Author: PMNinh  */
    $('.price-mask').inputmask({
        alias: 'decimal',
        groupSeparator: '.', /* Ký tự phân cách giữa phần trăm, nghìn... */
        radixPoint: ",", /* Ký tự phân cách với phần thập phân */
        autoGroup: true,
        digits: 0, /* Lấy bao nhiêu số phần thập phân, mặc định của inputmask là 2 */
        autoUnmask: true, /* Tự động bỏ mask khi lấy giá trị */
        allowMinus: false, /* Không cho nhập dấu trừ */
        allowPlus: false, /* Không cho nhập dấu cộng */
        integerDigits: 9
    });

    /*  Description: Cấu hình Mask cho các control nhập số tiền
        Author: PMNinh  */
    $('.price-mask-digits').inputmask({
        alias: 'decimal',
        groupSeparator: '.', /* Ký tự phân cách giữa phần trăm, nghìn... */
        radixPoint: ",", /* Ký tự phân cách với phần thập phân */
        autoGroup: true,
        digits: 2, /* Lấy bao nhiêu số phần thập phân, mặc định của inputmask là 2 */
        autoUnmask: true, /* Tự động bỏ mask khi lấy giá trị */
        allowMinus: false, /* Không cho nhập dấu trừ */
        allowPlus: false, /* Không cho nhập dấu cộng */
        integerDigits: 9
    });

    /*  Description: Cấu hình Mask cho các control nhập chiết khấu
        Author: PMNinh  */
    $('.discounted-mask').inputmask("percentage", {
        placeholder: '',
        radixPoint: ",",
        autoUnmask: true
    });

    /*  Description: Cấu hình Validation các control  */
    $('form.formValid').each(function () {
        $(this).validate({
            ignore: '',
            errorPlacement: function (error, element) {
                var tagParent = element.parent();
                /* PMNinh: Đoạn kiểm tra nếu như thẻ div bọc chưa butt;on và input 
                            thì add class lỗi lên thẻ div cha cao hơn */
                if (tagParent.hasClass('input-group')) {
                    tagParent.parent().append(error);
                } else {
                    tagParent.append(error);
                }
                error.addClass('css-error');
            },
            onfocusout: false,
            invalidHandler: function (form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    validator.errorList[0].element.focus();
                }
            }
        });
    });

    /*  Description: Cấu hình Validation định dạng ngày tháng  */
    $.validator.addMethod("dateFormat", function (value, element, params) {
        var isDate = function (valueDate) {
            var currVal = valueDate;
            if (currVal === "") return false;
            var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
            var dtArray = currVal.match(rxDatePattern);
            if (dtArray == null) return false;
            var dtDay = dtArray[1];
            var dtMonth = dtArray[3];
            var dtYear = dtArray[5];
            if (dtMonth < 1 || dtMonth > 12)
                return false;
            else if (dtDay < 1 || dtDay > 31)
                return false;
            else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31)
                return false;
            else if (dtMonth === 2) {
                var isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0));
                if (dtDay > 29 || (dtDay === 29 && !isleap))
                    return false;
            }
            return true;
        };
        return this.optional(element) || isDate(value);
    }, 'Message Null'); // - ko show buộc phải customer đa ngôn ngữ (hoặc phải customer câu thông báo này) -- Định dạng ngày không hợp lệ, vui lòng kiểm tra lại

    /*  Description: Cấu hình Validation báo lỗi khi mật khấu chứa các ký tự unicode như â, ă...
        Author: PMNinh  */
    $.validator.addMethod("password-regex", function (value, element) {
        return this.optional(element) || /^[A-Za-z0-9\s`~!@#$%^&*()+={}|;:'",.<>\/?\\-]+$/.test(value);
    }, 'Message Null'); // - Mật khẩu chứa ký tự không hợp lệ (ă, â, đ, ...), vui lòng kiểm tra lại

    /*  Description: Cấu hình Validation báo lỗi khi chứa ký tự khoảng trắng.  */
    $.validator.addMethod("nospace", function (value, element) {
        return value.indexOf(" ") < 0 && value != "";
    }, "Message Null"); // Không chưa ký tự khoảng trắng

    /*  Description: Cấu hình Validation chỉ nhập chữ và báo lỗi khi nhập số hoặc ký tự đặc biệt như !@#$%^&*()_+-=...  */
    $.validator.addMethod("spacecharacters", function (value, element) {
        return this.optional(element) || !/[~`!@#$%\^&*()_+=\-\[\]\\';,./{}|\\":<>\?0-9]/g.test(value);
    }, 'Message Null'); // -Không chứa ký tự đặc biệt, vui lòng kiểm tra lại

    $(".date-picker").datetimepicker({
        locale: language.localeDate,
        format: language.DateTime_Format,
        showTodayButton: true,
        maxDate: new Date(),
        defaultDate: new Date(),
        showClose: true,
    });

    $('.date-mask').inputmask({
        alias: language.Date_Format,
        placeholder: ""
    });

    /*  Description: Cấu hình Mask datetime
        Author: PMNinh  */
    $('.datetime-mask').inputmask("datetime", { "placeholder": "" });

    // config modal close
    $(".modal,.bootbox.modal").on('hidden.bs.modal', function () {
        //var p = $("body").css('padding-right');
        //console.log(p);
    });
    $('body').on('hidden.bs.modal', function () {
        if ($('.modal.in').length > 0) {
            $('body').addClass('modal-open');
        }
    });
});

var Dialog = {
    Success: 'Thành công',
    Warning: 'Cảnh báo',
    Error: 'Lỗi',
    CONFIRM: 'primary',
    /*  Description: Dialog thông báo
                     - message: Thông tin thông báo cần hiển thị.
                     - status: Trạng thái dialog (Success: Thành công, Warning: Cảnh báo, Error: Thất bại).
                     - callbackFuntion: Function Callback thực hiện sau khi ấn nút xác nhận form thông báo.  */
    Alert: function (message, status, dialogtitle, callbackFuntion, hideModalFuntion) {
        var typeDialog = this._getTypeDialog(status);
        bootbox.dialog({
            message: message,
            title: dialogtitle != 'undefine' ? dialogtitle : typeDialog.title,
            closeButton: false,
            className: typeDialog.className,
            buttons: {
                success: {
                    label: "<i class='fa fa-check'></i>" + language.Btn_Close,
                    className: typeDialog.buttonClass,
                    callback: callbackFuntion
                }
            }
        }).on('shown.bs.modal', function () {
            $('.bootbox').find('button:first').focus();
        }).on('hidden.bs.modal', function () {
            var p = $("body").css('padding-right');
            var p1 = parseInt(p) - 17;
            if (p1 >= 0)
                $("body").css('padding-right', p1);
            hideModalFuntion == undefined ? function () { } : hideModalFuntion();
        });
    },
    /*  Description: Dialog Config custom
                    - message: Thông tin thông báo cần hiển thị.
                    - callbackFuntion: Function Callback thực hiện sau khi ấn nút xác nhận form thông báo.  */
    ConfirmCustom: function (title, message, callbackFuntion, showModalFuntion) {
        var typeDialog = this._getTypeDialog(this.CONFIRM);
        bootbox.dialog({
            message: message,
            title: title ? title : typeDialog.title,// title ? typeDialog.title : title,
            closeButton: false,
            className: typeDialog.className,
            buttons: {
                success: {
                    label: "<i class='fa fa-check'></i>" + language.Btn_Confirm,
                    className: typeDialog.buttonClass,
                    callback: callbackFuntion
                },
                cancel: {
                    label: "<i class='fa fa-reply'></i>" + language.Btn_Close,
                    className: "btn btn-df"
                }
            }
        }).on('shown.bs.modal', showModalFuntion == undefined ? function () {
            //$('.bootbox').find('button:first').focus();
        } : showModalFuntion);
    },

    /*  Description: Hàm xác định kiểu của Dialog
        Author: PMNinh  */
    _getTypeDialog: function (status) {
        var type = {};
        switch (status) {
            case 'success':
                type = {
                    title: language.TitlePopupSuccess,
                    className: 'my-modal-success',
                    buttonClass: 'btn-sm btn-lue'
                };
                break;
            case 'warning':
                type = {
                    title: Status_Confirm,
                    className: 'my-modal-warning',
                    buttonClass: 'btn-sm btn-blue'
                };
                break;
            case 'error':
                type = {
                    title: language.TitlePopupError,
                    className: 'my-modal-error',
                    buttonClass: 'btn-sm btn-blue'
                };
                break;
            case 'primary':
                type = {
                    title: language.TitlePopupPrimary,
                    className: 'my-modal-primary',
                    buttonClass: 'btn-sm btn-blue'
                };

                break;
        }
        return type;
    }

}
