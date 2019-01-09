/*
 * metismenu - v1.1.3
 * Easy menu jQuery plugin for Twitter Bootstrap 3
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */
;(function($, window, document, undefined) {

    var pluginName = "metisMenu",
        defaults = {
            toggle: true,
            doubleTapToGo: false
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {

            var $this = this.element,
                $toggle = this.settings.toggle,
                obj = this;

            if (this.isIE() <= 9) {
                $this.find("li.active").has("ul").children("ul").collapse("show");
                $this.find("li").not(".active").has("ul").children("ul").collapse("hide");
            } else {
                $this.find("li.active").has("ul").children("ul").addClass("collapse in");
                $this.find("li").not(".active").has("ul").children("ul").addClass("collapse");
            }

            //add the "doubleTapToGo" class to active items if needed
            if (obj.settings.doubleTapToGo) {
                $this.find("li.active").has("ul").children("a").addClass("doubleTapToGo");
            }

            $this.find("li").has("ul").children("a").on("click" + "." + pluginName, function(e) {
                e.preventDefault();

                //Do we need to enable the double tap
                if (obj.settings.doubleTapToGo) {

                    //if we hit a second time on the link and the href is valid, navigate to that url
                    if (obj.doubleTapToGo($(this)) && $(this).attr("href") !== "#" && $(this).attr("href") !== "") {
                        e.stopPropagation();
                        document.location = $(this).attr("href");
                        return;
                    }
                }

                $(this).parent("li").toggleClass("active").children("ul").collapse("toggle");

                if ($toggle) {
                    $(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide");
                }

            });
        },

        isIE: function() { //https://gist.github.com/padolsey/527683
            var undef,
                v = 3,
                div = document.createElement("div"),
                all = div.getElementsByTagName("i");

            while (
                div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->",
                all[0]
            ) {
                return v > 4 ? v : undef;
            }
        },

        //Enable the link on the second click.
        doubleTapToGo: function(elem) {
            var $this = this.element;

            //if the class "doubleTapToGo" exists, remove it and return
            if (elem.hasClass("doubleTapToGo")) {
                elem.removeClass("doubleTapToGo");
                return true;
            }

            //does not exists, add a new class and return false
            if (elem.parent().children("ul").length) {
                 //first remove all other class
                $this.find(".doubleTapToGo").removeClass("doubleTapToGo");
                //add the class on the current element
                elem.addClass("doubleTapToGo");
                return false;
            }
        },

        remove: function() {
            this.element.off("." + pluginName);
            this.element.removeData(pluginName);
        }

    };

    $.fn[pluginName] = function(options) {
        this.each(function () {
            var el = $(this);
            if (el.data(pluginName)) {
                el.data(pluginName).remove();
            }
            el.data(pluginName, new Plugin(this, options));
        });
        return this;
    };
    //LongLD - config menu
    var $zpbuttonmenu = $(".menu-toggle-zp");
    var $zpmenu = $(".navbar-default.sidebar.ecod-left-admin-backend");
    $zpbuttonmenu.click(function () {
        menuLdl();
    });
    $("html").keydown(function (e) {
        if (e.ctrlKey && e.shiftKey && e.which == 76)
            menuLdl();
    });
    function menuLdl() {
        var $a = $zpbuttonmenu;
        // showw
        if ($a.hasClass("hvr-bounce-to-left")) {
            $a.removeClass("hvr-bounce-to-left").addClass("hvr-bounce-to-right");
            $a.find("i").removeClass("fa-caret-left").addClass("fa-caret-right");

            $a.removeAttr("style");
            $a.css("position", "relative");
            $a.css("top", -50);
            $a.animate({ left: 266 });
            $zpmenu.animate({ left: -250 });
            $(".page-header").animate({ paddingLeft: 44 });
            $("#page-wrapper").animate({ marginLeft: 0 }); //css("margin-left", 0);
        }
            //hide
        else {
            $a.addClass("hvr-bounce-to-left").removeClass("hvr-bounce-to-right");
            $a.find("i").addClass("fa-caret-left").removeClass("fa-caret-right");


            $a.removeAttr("style");
            $a.css("position", "absolute");
            $a.css("top", 0);
            $a.animate({ right: 0 });
            $zpmenu.animate({ left: 0 });
            $(".page-header").animate({ paddingLeft: 15 });
            $("#page-wrapper").animate({ marginLeft: 250 }); //css("margin-left", 0);
        }
    }

})(jQuery, window, document);