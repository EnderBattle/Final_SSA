!function(u){u.fn.archivesCW=function(e){return e&&"object"!=typeof e||(e=u.extend({},u.fn.archivesCW.defaults,e)),this.each(function(){new $archivesCW(u(this),e)})},$archivesCW=function(t,n){function a(){d==l-1?e.addClass("disabled"):e.removeClass("disabled"),0==d?c.addClass("disabled"):c.removeClass("disabled")}function r(){o.find("a.selected, a[rel="+d+"]").toggleClass("selected");var e=o.find("a.selected").parent();o.css("top",-e.index()*parseInt(s.outerHeight()))}function i(e,n){var i=d;e<i?(u.isFunction(n.goNext)?n:u.fn.archivesCW.defaults).goNext(t,i,e):(u.isFunction(n.goPrev)?n:u.fn.archivesCW.defaults).goPrev(t,i,e),d=e;var e=t.find(".menu a[rel="+d+"]");t.find('a.title:not([href="#"])').attr("href",e.attr("href")),e=e.html(),f.html(e),a(),r()}var s=t.find(".calendar-navigation"),o=s.find(".menu"),d=parseInt(o.find("a.current").attr("rel")),f=s.find(".title"),e=s.find(".prev-year"),c=s.find(".next-year");s.find(".prev-year").on("click",function(e){e.preventDefault(),u(this).is(".disabled")||i(d+1,n)}),s.find(".next-year").on("click",function(e){e.preventDefault(),u(this).is(".disabled")||i(d-1,n)}),s.on("click",'.arrow-down, a.title[href="#"]',function(e){e.preventDefault(),u.isFunction(n.showDropdown)&&n.showDropdown(o)}),o.mouseleave(function(){var e=u(this);u(this).data("timer",setTimeout(function(){u.isFunction(n.hideDropdown)&&n.hideDropdown(e)},300))}).mouseenter(function(){u(this).data("timer")&&clearTimeout(u(this).data("timer"))}),o.find("a").on("click",function(e){e.preventDefault(),u(this).is(".selected")||(u(this).removeClass("selected"),e=parseInt(u(this).attr("rel")),i(e,n),u.isFunction(n.hideDropdown)&&n.hideDropdown(o))});var l=o.find("li").length;l<=1&&s.find(".arrow-down").hide(),r(),a()},u.fn.archivesCW.defaults={goNext:function(e,n,i){e.find(".year").css({"margin-left":"-100%",opacity:1}),e.find(".year[rel="+n+"]").css({"margin-left":0,"z-index":2}).animate({opacity:.5},300),e.find(".year[rel="+i+"]").css({"z-index":3}).animate({"margin-left":0})},goPrev:function(e,n,i){e.find(".year:not(.last)").css({"margin-left":"-100%",opacity:1}),e.find(".year[rel="+i+"]").css({"margin-left":0,opacity:.3,"z-index":2}).animate({opacity:1},300),e.find(".year[rel="+n+"]").css({"margin-left":0,"z-index":3}).animate({"margin-left":"-100%"})},showDropdown:function(e){e.show()},hideDropdown:function(e){e.hide()}}}(jQuery),jQuery(function(e){e(".calendar-archives").archivesCW()});