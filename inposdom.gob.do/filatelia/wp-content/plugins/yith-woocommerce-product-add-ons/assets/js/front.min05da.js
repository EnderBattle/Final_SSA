function yith_wapo_replace_image(e,t=!1){var o=yith_wapo.replace_image_path,i=".yith_magnifier_zoom_magnifier, .zoomWindowContainer .zoomWindow",r=e.data("replace-image");if(null!==r&&(t||jQuery(o).attr("src")!==r)&&(void 0!==e.data("replace-image")&&""!=e.data("replace-image")&&(void 0===jQuery(o).attr("wapo-original-img")&&(jQuery(o).attr("wapo-original-img",jQuery(o).attr("src")),jQuery(i).length)&&jQuery(i).attr("wapo-original-img",jQuery(i).css("background-image").slice(4,-1).replace(/"/g,"")),jQuery(o).attr("src",r),jQuery(o).attr("srcset",r),jQuery(o).attr("data-src",r),jQuery(i).css("background-image","url("+r+")"),jQuery("#yith_wapo_product_img").val(r),jQuery(o).attr("data-large_image",r),0<jQuery(".woocommerce-product-gallery .woocommerce-product-gallery__image").length&&jQuery(".woocommerce-product-gallery").trigger("woocommerce_gallery_reset_slide_position"),jQuery(".woocommerce-product-gallery").trigger("woocommerce_gallery_init_zoom"),jQuery(document).trigger("yith-wapo-after-replace-image")),t)&&void 0!==jQuery(o).attr("wapo-original-img")){let a=!0;jQuery(".yith-wapo-option").each(function(e,t){t=jQuery(t);t.data("replace-image")&&t.hasClass("selected")&&(a=!1)}),a&&(e=jQuery(o).attr("wapo-original-img"),r=jQuery(i).attr("wapo-original-img"),jQuery(o).attr("src",e),jQuery(o).attr("srcset",e),jQuery(o).attr("data-src",e),jQuery(o).attr("data-large_image",e),jQuery(i).css("background-image","url("+r+")"),0<jQuery(".woocommerce-product-gallery .woocommerce-product-gallery__image").length&&jQuery(".woocommerce-product-gallery").trigger("woocommerce_gallery_reset_slide_position"),jQuery(".woocommerce-product-gallery").trigger("woocommerce_gallery_init_zoom"),jQuery(document).trigger("yith-wapo-after-replace-image"))}}function yith_wapo_check_required_fields(o){var i=!1,r=!1,e=yith_wapo.dom.single_add_to_cart_button;return jQuery("form.cart .yith-wapo-addon:not(.hidden):visible input, form.cart .yith-wapo-addon:not(.hidden):visible select, form.cart .yith-wapo-addon:not(.hidden):visible textarea").each(function(){var e=jQuery(this),t=(e.closest(".yith-wapo-option"),e.closest(".yith-wapo-addon")),a=e.closest("div.yith-wapo-addon.wapo-toggle").find("h3.wapo-addon-title.toggle-closed"),t=t.find(".wapo-addon-title");"file"===e.attr("type")||e.hasClass("wapo-product-qty")||(e.attr("required")&&("checkbox"===e.attr("type")||"radio"===e.attr("type"))&&!e.closest(".yith-wapo-option").hasClass("selected")||e.attr("required")&&(""==e.val()||"Required"==e.val())?("highlight"===o&&(showRequiredMessage(e),t.addClass("wapo-error"),a)&&a.click(),i=r=!0):restartRequiredElement(e))}),"hide"==o&&(jQuery(e).fadeIn(),r)&&jQuery(e).hide(),!i}function updateContainerProductPrice(a){if(!jQuery(".cart.yith-wcpb-bundle-form").length&&a.variation_id===parseInt(jQuery(".variation_id").val())){let e=jQuery("#yith-wapo-container"),t=0;var o;"undefined"!=typeof a.display_price&&(t=a.display_price,"yes"===yith_wapo.use_price_html_on_variations)&&"undefined"!=typeof a.price_html&&(o=jQuery(a.price_html).find("> .amount bdi").text(),o=wcPriceToFloat(o),isNaN(o)||t===o||(t=o)),e.attr("data-product-price",t),e.attr("data-product-id",a.variation_id)}}function yith_wapo_sprintf(e,...a){return e.replace(/%([sd])/g,function(e,t){return"s"===t?a.shift():"d"===t?(t=a.shift(),Number.isInteger(t)?t.toString():""):e})}function uploadFiles(a,o){for(var i=0;i<a.length;i++){let e=o.find(".yith-wapo-uploaded-file"),t=o.find(".yith-wapo-uploaded-file-element").last().data("index")+1;!isNaN(t)&&void 0!==t||(t=0),appendNewUploadedFile(i,a,e,t),i==a.length-1&&(e.show(),uploadSingleFile(a,0,o))}}function calculate_exact_file_size(e){let t=e.size,a=0;for(;900<t;)t/=1024,a++;return Math.round(100*t)/100+" "+["Bytes","KB","MB","GB"][a]}function yith_wapo_check_required_min_max(){var e,t;return!!checkRequiredSelect()&&!!checkTextInputLimit()&&!(!yith_wapo_check_required_fields("highlight")||(e=0,t="",jQuery("form.cart .yith-wapo-addon:not(.hidden)").each(function(){0<(t=yith_wapo_check_min_max(jQuery(this),!0))&&(e+=t)}),0<e))}function yith_wapo_check_min_max(a,e=!1){var t=a.data("addon-type"),o=a.data("min"),i=a.data("max"),r=a.data("exa"),n=a.find(".min-error-message"),c=a.find(".wapo-addon-title"),d=0,p=a.find("h3.wapo-addon-title.toggle-closed");if(c.removeClass("wapo-error"),"select"!==t&&(""!==o||""!==r||""!==i)){if("number"===t||"text"===t||"textarea"===t){if(jQuery(a).find(".yith-wapo-option-value").each(function(e){jQuery(this).val().length&&d++}),i&&i<d)return(t=jQuery(a).find(".options-container")).find(".max-selected-error").length||(t.append('<p class="max-selected-error">'+yith_wapo.i18n.maxOptionsSelectedMessage+"</p>"),c.addClass("wapo-error")),1}else d=a.find("input:checkbox:checked, input:radio:checked").length;if(0<r){let t=0;if(r==d)a.removeClass("required-min").find(".min-error").hide(),a.find("input:checkbox").not(":checked");else{if(e){t=r-d,a.addClass("required-min"),a.find(".min-error").show(),c.addClass("wapo-error");let e=yith_wapo.i18n.selectOptions.replace("%d",r);1===r&&(e=yith_wapo.i18n.selectAnOption),n.text(e),p&&p.click()}a.find(".yith-wapo-option:not(.out-of-stock) input:checkbox").not(":checked").attr("disabled",!1)}return t}if(0<o){t=o-d;if(!(o<=d)){if(e){let e=yith_wapo.i18n.selectAnOption;1<o&&(e=yith_wapo.i18n.selectAtLeast.replace("%d",o)),a.addClass("required-min"),a.find(".min-error").show(),c.addClass("wapo-error"),n.text(e),p&&p.click()}return t}a.removeClass("required-min").find(".min-error").hide()}if(i&&!(d<=i))return e&&(a.addClass("required-min"),(r=jQuery(a).find(".options-container")).find(".max-selected-error").length||(r.append('<small class="max-selected-error">'+yith_wapo.i18n.maxOptionsSelectedMessage+"</small>"),c.addClass("wapo-error"))),1;a.removeClass("required-min").find(".max-selected-error").hide()}}function checkRequiredSelect(){let r=!0;return jQuery(".yith-wapo-addon.yith-wapo-addon-type-select select").each(function(){var e,t,a,o,i=jQuery(this);i.is(":required")&&(t=(e=i.parents(".yith-wapo-addon")).find(".min-error-message"),a=e.find(".wapo-addon-title"),o=i.val(),t.text(""),a.removeClass("wapo-error"),e.removeClass("required-min"),"default"!==o||e.hasClass("hidden")||(r=!1)||(o=e.find(".min-error"),i=i.parents("div.yith-wapo-addon.wapo-toggle").find(".wapo-addon-title.toggle-closed"),e.addClass("required-min"),i&&i.click(),a.addClass("wapo-error"),t.text(yith_wapo.i18n.selectAnOption.replace("%d",1)),o.show()))}),r}function checkTextInputLimit(){let r=!0;return jQuery("form.cart .yith-wapo-addon.yith-wapo-addon-type-text:not(.hidden) input").each((e,t)=>{var t=jQuery(t),a=t.val(),o=t.attr("minlength"),i=t.attr("maxlength");""!==o&&a.length<o||""!==i&&a.length>i?(t.addClass("length-error"),t.siblings(".length-error-message").show(),r=!1):(t.siblings(".length-error-message").hide(),t.removeClass("length-error"))}),r}function yith_wapo_check_multiplied_price(e){let t=e.data("price");var a=e.data("price-sale");let o=e.data("default-price");var i=e.data("price-type"),r=e.data("price-method");let n="price",c=0;var d=e.val();0<!o&&(0<a&&"number"!==e.attr("type")&&"multiplied"===i&&(t=a,n="price-sale"),o=t,e.data("default-price",o)),"value_x_product"==r?(a=parseFloat(jQuery("#yith-wapo-container").attr("data-product-price")),c=d*a):"multiplied"==i&&(c=d*o),(0<c||"decrease"==r)&&e.data(n,c)}function yith_wapo_check_multiplied_length(t){var a=t.data("price");let o=t.data("default-price");var e=t.data("price-type");if(0<!o&&(o=a,t.data("default-price",o)),"characters"===e){a=t.data("remove-spaces");let e=t.val().length;a&&(e=t.val().replace(/\s+/g,"").length),t.data("price",e*o)}}jQuery(document).ready(function(p){initColorpicker=function(){var c={color:!1,mode:"hsl",controls:{horiz:"s",vert:"l",strip:"h"},hide:!0,target:!1,width:180,palettes:!1,change:function(e,t){var a=p(this).closest(".wp-picker-container"),o=a.find(".wp-picker-input-wrap"),i=a.find(".wp-picker-custom-placeholder"),r=a.find(".wp-picker-default-custom"),n=a.find(".wp-color-picker").data("addon-colorpicker-show"),a=a.find(".wp-color-picker").data("default-color");"placeholder"!==n||""===t.color.toString()&&"undefined"===t.color.toString()||(o.find(".wp-color-picker").show(),i.hide(),r.show(),i.css("line-height","3.0")),r.removeClass("default_color"),a!==t.color.toString()&&r.addClass("default_color"),p(document).trigger("wapo-colorpicker-change")},clear:function(e,t){var a=p(this).closest(".wp-picker-container"),o=a.find(".wp-picker-input-wrap"),i=a.find(".wp-picker-custom-placeholder"),r=a.find(".wp-picker-default-custom");"placeholder"===a.find(".wp-color-picker").data("addon-colorpicker-show")&&(o.find(".wp-color-picker").hide(),i.show(),r.hide(),i.css("line-height","0")),r.removeClass("testing123"),p(document).trigger("wapo-colorpicker-clear")}};function e(){p(".yith-wapo-block .yith-wapo-addon-type-colorpicker .wp-color-picker").each(function(){p(this).wpColorPicker(c);var e=p(this).closest(".wp-picker-container"),t=e.find("button .wp-color-result-text"),a=e.find(".wp-picker-default"),o=e.find(".wp-picker-input-wrap"),i=p(this).data("addon-colorpicker-show"),r=p(this).data("addon-placeholder"),t=(t.html(""),p(this).parents(".wp-picker-container")),n=t.find(".wp-picker-input-wrap");t.hasClass("yith-wapo-colorpicker-initialized")||t.addClass("yith-wapo-colorpicker-initialized"),n.find(".wp-picker-default-custom").length||(t=p("<span/>").attr({"class":"wp-picker-default-custom"}),n.find(".wp-picker-default, .wp-picker-clear").wrap(t)),"placeholder"===i&&(o.find(".wp-color-picker").hide(),o.find(".wp-picker-custom-placeholder").length||((n=p("<span/>").attr({"class":"wp-picker-custom-placeholder"})).html(r),o.find(".screen-reader-text").before(n)),t=e.find(".wp-picker-default-custom"),i=e.find(".wp-picker-custom-placeholder"),t.hide(),i.css("line-height","0")),a.trigger("click")})}p(document).on("yith-wapo-after-reload-addons",e),p(document).on("yith-wapo-after-reload-addons",initDatePickers),checkColorPickerOnInput=function(){p(document).on("click",function(e){p(e.target).is(".yith-wapo-colorpicker-container .iris-picker, .yith-wapo-colorpicker-container .iris-picker-inner")||0<(e=p(".yith-wapo-colorpicker-container .yith-wapo-colorpicker-initialized .wp-color-picker")).length&&e.iris("hide")}),p(".yith-wapo-colorpicker-container .yith-wapo-colorpicker-initialized .wp-color-picker").click(function(e){p(this).iris("show")})},e(),checkColorPickerOnInput()},initDatePickers=function(){p(".yith-wapo-block .yith_wapo_date.datepicker").each(function(){var e=p(this);initDatePicker(e)})},initTimePicker=function(t){let e=t.data("params"),i=e.time_data||"",a=e.show_time_selector||"";"object"==typeof i&&null!==i&&(i=Object.values(i)),a&&setTimeout(function(){var a,o,e;p("#wapo-datepicker-time").length||(a="",o=t.closest(".date-container").find(".temp-time").text(),p(i).each(function(e,t){a+=t!==o?"<option>"+t+"</option>":"<option selected>"+t+"</option>"}),e='<div id="wapo-datepicker-time"><label>'+yith_wapo.i18n.datepickerSetTime+'</label><select id="wapo-datepicker-time-select">'+a+'</select></div><div id="wapo-datepicker-save"><button>'+yith_wapo.i18n.datepickerSaveButton+"</button></div>",p(e).appendTo("#ui-datepicker-div"))},10)},initDatePicker=function(d){var e=d.data("params"),t="",a="",o=e.start_year||"",i=e.end_year||"",r=e.default_date||"",n=e.date_format||"",c=e.additional_opts||"",o={minDate:t=o?new Date(e.start_year,"00","01"):t,maxDate:a=i?new Date(e.end_year,"11","31"):a,defaultDate:r,dateFormat:n,beforeShowDay:function(o){let e=d.data("params"),t=e.selectable_days_opt||"",a=e.selectable_days||"",i=e.selected_items||"",r=e.enable_disable_date_rules||"",n=!0;if((r="enable"===r?1:0)&&(n=!1),"days"===t||"date"===t){var c=o.getDate()+"-"+(o.getMonth()+1)+"-"+o.getFullYear();if(-1===p.inArray(c,a))return n=!1}else if("before"===t){c=o.getTime();let e=new Date;if(e.setHours(0,0,0,0),c<(e=e.getTime()))return n=!1}return 0<i.length&&(i=JSON.parse(i),p.each(i,function(e,t){if("days"===e){let i=new Date(o);p.each(t,function(e,t){var[t,a,o]=t.split("-"),t=new Date(parseInt(t),parseInt(a)-1,parseInt(o));if(i.toDateString()===t.toDateString())return n=!!r,!1})}else if("daysweek"===e){let a=o.getDay();p.each(t,function(e,t){p.each(t,function(e,t){if(a==t)return n=!!r,!1})})}else if("months"===e){let a=o.getMonth();p.each(t,function(e,t){p.each(t,function(e,t){if(a==t-1)return n=!!r,!1})})}else if("years"===e){let a=o.getFullYear();p.each(t,function(e,t){p.each(t,function(e,t){if(a==t)return n=!!r,!1})})}})),n?[!0]:[!1]},beforeShow:function(e){initTimePicker(d)},onSelect:function(e,t){var a;0<p(t.dpDiv).find("#wapo-datepicker-time-select").length&&(t=p(t.dpDiv).find("#wapo-datepicker-time-select").val(),a=p(this).closest(".date-container").find(".temp-time"),p(this).val(e+" "+t),a.text(t))},onChangeMonthYear:function(e,t,a){initTimePicker(d)},onUpdateDatepicker:function(e){jQuery("#ui-datepicker-div").attr("wapo-option-id",e.id)},onClose:function(e,t){p(this).trigger("yith_wapo_date_field_updated",e)}},o=Object.assign(o,c);d.datepicker(o)},initColorpicker(),initDatePickers()}),jQuery(function(f){var a=!1;yith_wapo_conditional_logic_check=function(e={}){var c={};jQuery("form.cart .yith-wapo-addon.conditional_logic").each(function(){var e=!1,t=!1,a=jQuery(this).data("conditional_logic_display"),o=jQuery(this).data("conditional_logic_display_if"),i=String(jQuery(this).data("conditional_rule_addon")),r=String(jQuery(this).data("conditional_rule_addon_is")),n=String(jQuery(this).data("conditional_rule_variations")),i=void 0!==i&&"0"!==i&&""!==i&&i.split("|"),r=void 0!==r&&""!==r&&r.split("|");if((n=void 0!==n&&""!==n&&n.split("|"))||i&&r){if(i&&r)switch(o){case"all":e=function(e,t){for(var a=!0,o=0;o<e.length;o++)if(0!=e[o]&&e[o]){var i,r,n=e[o].split("-"),c=!1,d=!1;switch(d="undefined"!=typeof n[1]?(c=(jQuery("#yith-wapo-"+n[0]+"-"+n[1]).is(":checked")||jQuery("select#yith-wapo-"+n[0]).val()==n[1])&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden"),r=jQuery("input#yith-wapo-"+n[0]+"-"+n[1]).val(),i=jQuery("textarea#yith-wapo-"+n[0]+"-"+n[1]).val(),(void 0!==r&&""!==r||void 0!==i&&""!==i)&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden")):(c=(c=0<jQuery("#yith-wapo-addon-"+e[o]+" input:checkbox:checked").length||0<jQuery("#yith-wapo-addon-"+e[o]+" input:radio:checked").length||0<jQuery("#yith-wapo-addon-"+e[o]+" option:selected").length&&"default"!=jQuery("#yith-wapo-addon-"+e[o]+" option:selected").val())&&!jQuery("#yith-wapo-addon-"+e[o]).hasClass("hidden"),r="undefined",jQuery("#yith-wapo-addon-"+n[0]+" input, #yith-wapo-addon-"+n[0]+" textarea").each(function(e){""!==jQuery(this).val()&&(r=!0)}),"undefined"!=r&&""!==r&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden")),t[o]){case"selected":c||(a=!1);break;case"not-selected":c&&(a=!1);break;case"empty":d&&(a=!1);break;case"not-empty":d||(a=!1)}if(!a)break}return a}(i,r);break;case"any":e=function(e,t){for(var a=!1,o=0;o<e.length;o++)if(0!=e[o]&&e[o]){var i,r,n=e[o].split("-");switch(AddonNotEmpty="undefined"!=typeof n[1]?(AddonSelected=(jQuery("#yith-wapo-"+n[0]+"-"+n[1]).is(":checked")||jQuery("select#yith-wapo-"+n[0]).val()==n[1])&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden"),r=jQuery("input#yith-wapo-"+n[0]+"-"+n[1]).val(),i=jQuery("textarea#yith-wapo-"+n[0]+"-"+n[1]).val(),(void 0!==r&&""!==r||void 0!==i&&""!==i)&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden")):(AddonSelected=(AddonSelected=0<jQuery("#yith-wapo-addon-"+e[o]+" input:checkbox:checked").length||0<jQuery("#yith-wapo-addon-"+e[o]+" input:radio:checked").length||0<jQuery("#yith-wapo-addon-"+e[o]+" option:selected").length&&"default"!=jQuery("#yith-wapo-addon-"+e[o]+" option:selected").val())&&!jQuery("#yith-wapo-addon-"+e[o]).hasClass("hidden"),r="undefined",jQuery("#yith-wapo-addon-"+n[0]+" input, #yith-wapo-addon-"+n[0]+" textarea").each(function(e){""!==jQuery(this).val()&&(r=!0)}),"undefined"!=r&&""!==r&&!jQuery("#yith-wapo-addon-"+n[0]).hasClass("hidden")),t[o]){case"selected":AddonSelected&&(a=!0);break;case"not-selected":AddonSelected||(a=!0);break;case"empty":AddonNotEmpty||(a=!0);break;case"not-empty":AddonNotEmpty&&(a=!0)}if(a)break}return a}(i,r)}else e=!0;e&&n&&(o=jQuery(".variation_id").val(),-1===jQuery.inArray(String(o),n))||(t=!0)}else t=e=!0,a="show";switch(a){case"show":c[jQuery(this).attr("id")]=t&&e?"not-hidden":"hidden";break;case"hide":c[jQuery(this).attr("id")]=t&&e?"hidden":"not-hidden"}}),jQuery.each(c,function(e,t){e=jQuery("#"+e);"not-hidden"===t?(e.fadeIn().removeClass("hidden").find(".yith-wapo-option:not(.out-of-stock) .yith-wapo-option-value").attr("disabled",!1),yith_wapo_replace_image(e.find(".yith-wapo-option.selected")),e.hasClass("yith-wapo-addon-type-select")&&e.find(".yith-wapo-option-value").attr("disabled",!1),yith_wapo_check_min_max(e)):e.hide().addClass("hidden").find(".yith-wapo-option-value").attr("disabled",!0)}),JSON.stringify(c)!==JSON.stringify(e)&&yith_wapo_conditional_logic_check(c)},calculateAddonsPrice=function(){var u=0,h=0,y=0,w=f(yith_wapo.productQuantitySelector).val();return 0<!w&&(w=1),f("form.cart .yith-wapo-addon:not(.hidden):visible input, form.cart .yith-wapo-addon:not(.hidden):visible select, form.cart .yith-wapo-addon:not(.hidden):visible textarea").each(function(){let c=f(this),d=parseFloat(f("#yith-wapo-container").attr("data-product-price")),p=c.data("addon-id");if(p){let e=c.attr("type"),t=c.data("price-method"),a=0,o="",i=c.parents(".yith-wapo-addon"),r=i.data("addon-type"),n=1;if("number"===e&&0==c.val())return y;var l,s;c.is("textarea")&&(e="textarea"),(c.is(":checked")||c.find(":selected").is("option")||c.is("input:not([type=checkbox])")&&c.is("input:not([type=radio])")&&""!=c.val()||c.is("textarea")&&""!=c.val())&&(c.is("select")&&(c=c.find(":selected")),"number"===e&&yith_wapo_check_multiplied_price(c),"text"!==e&&"textarea"!==e||yith_wapo_check_multiplied_length(c),h!=p&&(h=c.data("addon-id"),u=c.data("first-free-options")),"yes"==c.data("first-free-enabled")&&0<u?u--:(void 0!==c.data("price-type")&&""!==c.data("price-type")&&(o=c.data("price-type")),l=c.data("price-sale"),s=c.data("price"),void 0!==l&&""!==l&&0<=l&&"multiplied"!==o?a=parseFloat(l):void 0!==s&&""!==s&&(a=parseFloat(s)),"percentage"===o&&"discount"!==t&&(a=a*d/100),"product"!==r||c.hasClass(".yith-wapo-option")||(c=c.parents(".yith-wapo-option"),(n=c.find(".wapo-product-qty"))&&1<(n=n.val())&&(a*=n)),1<w&&!i.hasClass("sell_individually")&&(a*=w),y+=a))}}),y},setTotalBoxPrices=function(e,t,a=!0){var o=yith_wapo.woocommerce_currency_symbol,i=yith_wapo.woocommerce_currency_pos,r=yith_wapo.total_thousand_sep,n=yith_wapo.decimal_sep,c=yith_wapo.num_decimal,d=f(yith_wapo.productQuantitySelector).val(),e=e*(d=0<!d?1:d),d=parseFloat(t),p=t=parseFloat(t+e),l=e,s=d,e=e.toFixed(c).replace(".",n).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+r),d=d.toFixed(c).replace(".",n).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+r),t=t.toFixed(c).replace(".",n).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+r),p="right"==i?(e+=o,d+=o,t+o):"right_space"==i?(e=e+" "+o,d=d+" "+o,t+" "+o):"left_space"==i?(e=o+" "+e,d=o+" "+d,o+" "+t):(e=o+e,d=o+d,o+t);yith_wapo.priceSuffix?calculateProductPrice():f("#wapo-total-product-price").html(e),replaceProductPrice(a,t,p),f("#wapo-total-options-price").html(d),f("#wapo-total-order-price").html(p),f("#wapo-total-price-table").css("opacity","1"),f(document).trigger("yith_wapo_product_price_updated",[l+s])},replaceProductPrice=function(a,e,o){if(("yes"===yith_wapo.replace_price_in_product_without_addons||f("#yith-wapo-container").length&&f("#yith-wapo-container").find(".yith-wapo-block").length)&&a&&"yes"===yith_wapo.replace_product_price&&!isNaN(parseFloat(e))&&0<f(yith_wapo.replace_product_price_class).length){let e=yith_wapo.priceSuffix,t=e?' <small class="woocommerce-price-suffix">'+e+"</small>":"";f(yith_wapo.replace_product_price_class).html('<span class="woocommerce-Price-amount amount"><bdi>'+o+"</bdi></span>"+t);a=f(yith_wapo.replace_product_price_class+" bdi").text();0===wcPriceToFloat(a)&&f(yith_wapo.replace_product_price_class).find("bdi").remove()}},calculateProductPrice=function(){var e={action:"update_totals_with_suffix",product_id:parseInt(f("#yith-wapo-container").attr("data-product-id")),security:yith_wapo.addons_nonce};jQuery.ajax({url:yith_wapo.ajaxurl,type:"post",data:e,success:function(e){e&&(e=e.price_html,f("#wapo-total-product-price").html(e))}})},calculateTotalAddonsPrice=function(e=!0){yith_wapo_conditional_logic_check(),"yes"===yith_wapo.hide_button_required&&yith_wapo_check_required_fields("hide"),f("#wapo-total-price-table").css("opacity","0.5");var t=parseFloat(f("#yith-wapo-container").attr("data-product-price")),a=yith_wapo.total_price_box_option,o=f("button.ywgc-amount-buttons.selected_button");0<o.length&&(t=o.data("price")),o=calculateAddonsPrice(),"hide_options"===a&&(0!==o?f("#wapo-total-price-table .hide_options tr.wapo-total-options").fadeIn():f("#wapo-total-price-table .hide_options tr.wapo-total-options").hide()),setTotalBoxPrices(t,o,e)},productQuantityChange=function(){let e=f(this),t=e.val(),a=e.closest(".yith-wapo-option").data("product-id"),o=e.closest(".option-add-to-cart").find(".add_to_cart_button"),i=1,r;o.length&&a&&(r="?add-to-cart="+a+"&quantity="+(i=1<t?t:i),o.attr("href",r))},wcPriceToFloat=function(e){e=e.replace(/(?![\.\,])\D/g,"").replace(yith_wapo.total_thousand_sep,"").replace(yith_wapo.decimal_sep,".");return parseFloat(e)},getDefaultProductPrice=function(){if(yith_wapo.enableGetDefaultVariationPrice){let o=f(".variations_form.cart").data("product_id");var e={action:"get_default_variation_price",product_id:parseInt(o),security:yith_wapo.addons_nonce};jQuery.ajax({url:yith_wapo.ajaxurl,type:"post",data:e,success:function(e){var t,a;e&&(t=e.price_html,(a=jQuery("#yith-wapo-container")).attr("data-product-price",e.current_price),a.attr("data-product-id",o),"yes"===yith_wapo.replace_product_price)&&a.find(".yith-wapo-block").length&&f(yith_wapo.replace_product_price_class).html(t)},complete:function(){}})}},checkDefaultOptionsOnLoad=function(){var e=f(".yith-wapo-addon:not(.conditional_logic) .yith-wapo-option.selected");f(e).each(function(){yith_wapo_replace_image(f(this))})},resetAddons=function(e,t){"yith_wccl"!==t&&(a?(getDefaultProductPrice(),f(document).trigger("yith-wapo-reset-addons")):a=!0)},foundVariation=function(e,t){updateContainerProductPrice(t),f(document).trigger("yith-wapo-reload-addons")},reloadAddons=function(e,t=""){var a=f("form.cart").serializeArray(),o=f("form.cart:not(.ywcp) #yith-wapo-container"),a={action:"live_print_blocks",addons:a,currency:yith_wapo.woocommerce_currency,current_language:yith_wapo.currentLanguage};""!=t&&(a.price=t),f("#yith-wapo-container").css("opacity","0.5"),f.ajax({url:yith_wapo.ajaxurl,type:"post",data:a,success:function(e){o.html(e),o.css("opacity","1"),f("form.cart").trigger("yith-wapo-after-reload-addons"),calculateTotalAddonsPrice()}})},removeUploadedFile=function(e){var e=e.target,t=f(e).closest(".yith-wapo-uploaded-file-element"),a=f(e).closest(".yith-wapo-option").data("max-multiple"),o=f(e).closest(".yith-wapo-ajax-uploader").find(".yith-wapo-uploaded-file-element").length,i=f(e).closest(".yith-wapo-ajax-uploader").find(".yith-wapo-ajax-uploader-container"),e=f(e).closest(".yith-wapo-option").find('input[type="hidden"].upload-parent');t.remove(),(void 0===a||o-1<a)&&i.fadeIn(),o-1<=0&&(e.val(""),calculateTotalAddonsPrice())},checkNumbersTotalValues=function(){var e=f("#yith-wapo-container .yith-wapo-addon-type-number:not(.hidden).numbers-check"),d=!1;return e.each(function(e){let t=f(this),a=t.data("numbers-min"),o=t.data("numbers-max"),i=0,r=!1,n="",c=t.find(".options");c.hasClass("error-message")&&c.removeClass("error-message"),t.find(".yith-wapo-numbers-error-message").remove(),t.find('input[type="number"]').each(function(){var e=f(this).val();if("undefined"===e||""===e)return!0;i+=parseFloat(e)}),void 0!==a&&i<a&&(r=!0,n=yith_wapo.messages.minErrorMessage+" "+a),void 0!==o&&i>o&&(r=!0,n=yith_wapo.messages.maxErrorMessage+" "+o),r&&(c.addClass("error-message"),t.append(f('<small class="yith-wapo-numbers-error-message">'+n+"</small>")),d=!0,jQuery("html, body").animate({scrollTop:t.offset().top-50},500))}),f(document).trigger("yith_wapo_check_number_total_values"),!d},checkMaxSelected=function(e){var t=e.closest(".yith-wapo-option"),e=e.closest(".yith-wapo-addon"),a=e.data("max"),e=e.find(".yith-wapo-option.selected").length;return""===a||0===a||(t.hasClass("selected")?e--:e++,!(a<e))},labelsOnChange=function(){if(!checkMaxSelected(f(this)))return f(this).prop("checked",!1),!1;var e=f(this).parent();e.hasClass("yith-wapo-option")||(e=e.closest(".yith-wapo-option")),f(this).is(":checked")?(e.hasClass("selection-single")&&(e.parent().find("input").prop("checked",!1),e.parent().find(".selected").removeClass("selected")),e.addClass("selected"),e.find("input").prop("checked",!0),yith_wapo_replace_image(e)):(e.removeClass("selected"),yith_wapo_replace_image(e,!0))},f(document).on("ywgc-amount-changed",function(e,t){t=t.data("price");jQuery("#yith-wapo-container").attr("data-product-price",t),calculateTotalAddonsPrice()}),f(document).on("yith-wapo-product-price-updated",function(e,t){void 0!==t&&f("#yith-wapo-container").attr("data-product-price",t),calculateTotalAddonsPrice()}),f(document).on("change",".gift-cards-list .ywgc-manual-amount-container input.ywgc-manual-amount",function(e){var t=f(this).val();jQuery("#yith-wapo-container").attr("data-product-price",t),calculateTotalAddonsPrice()}),f(document).on("ywdpd_price_html_updated",function(e,t){t=jQuery(t).children(".amount bdi").text(),t=wcPriceToFloat(t);isNaN(t)||(jQuery("#yith-wapo-container").attr("data-product-price",t),calculateTotalAddonsPrice())}),f(document).on("yith_wcpb_ajax_update_price_request",function(e,t){t=jQuery(t.price_html).children(".amount bdi").text(),t=wcPriceToFloat(t);isNaN(t)||(jQuery("#yith-wapo-container").attr("data-product-price",t),calculateTotalAddonsPrice())}),f(document).on("change","form.cart div.yith-wapo-addon, form.cart .quantity input[type=number]",function(){calculateTotalAddonsPrice()}),f(document).on("keyup",'form.cart .yith-wapo-addon-type-number input[type="number"], form.cart .yith-wapo-addon-type-text input[type="text"], form.cart .yith-wapo-addon-type-textarea textarea',function(){calculateTotalAddonsPrice()}),f(document).on("click","form.cart .yith-wapo-addon-type-colorpicker .yith-wapo-colorpicker-initialized input.wp-color-picker",function(){calculateTotalAddonsPrice()}),f(document).on("wapo-colorpicker-change",function(){calculateTotalAddonsPrice()}),calculateTotalAddonsPrice(),checkDefaultOptionsOnLoad(),f(document).on("change keyup",".yith-wapo-option .wapo-product-qty",productQuantityChange),f(document).on("reset_data",resetAddons),f(document).on("found_variation",foundVariation),f(document).on("yith-wapo-reload-addons",reloadAddons),f(document).on("click",".yith-wapo-uploaded-file .remove",removeUploadedFile),f(document).on("change",".yith-wapo-addon-type-label input",labelsOnChange)}),jQuery(document).on("change",".yith-wapo-addon-type-checkbox input",function(){var e=jQuery(this),t=e.parents(".checkboxbutton"),a=e.parents(".yith-wapo-option"),o=a.parent();"checked"!==e.attr("checked")?(a.hasClass("selection-single")&&(o.find("input").attr("checked",!1),o.find("input").prop("checked",!1),o.find(".selected, .checked").removeClass("selected checked")),e.attr("checked",!0),e.prop("checked",!0),a.addClass("selected"),t.addClass("checked"),yith_wapo_replace_image(a)):(e.attr("checked",!1),e.prop("checked",!1),a.removeClass("selected"),t.removeClass("checked"),yith_wapo_replace_image(a,!0))}),jQuery(document).on("click",".yith-wapo-addon-type-color .yith-wapo-option div.label",function(){jQuery(this).closest(".yith-wapo-option").find(".yith-proteo-standard-checkbox").click()}),jQuery(document).on("change",".yith-wapo-addon-type-color input",function(){var e=jQuery(this).parent();e.hasClass("yith-wapo-option")||(e=e.parent()),jQuery(this).is(":checked")?(e.addClass("selected"),e.hasClass("selection-single")&&(e.parent().find("input").prop("checked",!1),e.parent().find(".selected").removeClass("selected"),e.find("input").prop("checked",!0),e.addClass("selected")),yith_wapo_replace_image(e)):(e.removeClass("selected"),yith_wapo_replace_image(e,!0))}),jQuery(document).on("click",".yith-wapo-addon-type-label .yith-wapo-option div.label",function(e){e.preventDefault(),jQuery(this).closest(".yith-wapo-option").find(".yith-proteo-standard-checkbox").click()}),jQuery(document).on("click change",".yith-wapo-addon-type-product .quantity input",function(e){e.stopPropagation()}),jQuery(document).on("click",".yith-wapo-addon-type-product .yith-wapo-option .product-container",function(){jQuery(this).closest(".yith-wapo-option").find(".yith-proteo-standard-checkbox").click()}),jQuery(document).on("change",".yith-wapo-addon-type-product .yith-wapo-option input.yith-proteo-standard-checkbox",function(){var e=jQuery(this).parent();e.hasClass("yith-wapo-option")||(e=e.parent()),jQuery(this).is(":checked")?(e.addClass("selected"),e.hasClass("selection-single")&&(e.parent().find("input").prop("checked",!1),e.parent().find(".selected").removeClass("selected"),e.find("input").prop("checked",!0),e.addClass("selected")),yith_wapo_replace_image(e)):(e.removeClass("selected"),yith_wapo_replace_image(e,!0))}),jQuery(document).on("click",".yith-wapo-addon-type-radio input",function(){var e=jQuery(this).closest(".yith-wapo-option");e.hasClass("yith-wapo-option")||(e=e.closest(".yith-wapo-option")),jQuery(this).is(":checked")?(e.addClass("selected"),e.siblings().removeClass("selected"),yith_wapo_replace_image(e)):e.removeClass("selected")}),jQuery("body").on("change",".yith-wapo-addon-type-select select",function(){let e=jQuery(this).parent();var t=jQuery(this).find("option:selected"),a=e.find("div.option-image"),o=(e.hasClass("yith-wapo-option")||(e=e.parent()),t.data("image")),i=t.data("description"),r=e.find("p.option-description");void 0!==o&&o&&a.html(o='<img src="'+o+'" style="max-width: 100%">'),"default"===t.val()||""===o?a.hide():a.fadeIn(),void 0===i?r.empty():r.html(i),t.data("replace-image")?yith_wapo_replace_image(t):yith_wapo_replace_image(t,!0)}),jQuery(".yith-wapo-addon-type-select select").trigger("change"),jQuery(document).on("click",".yith-wapo-addon.wapo-toggle .addon-header",function(e){e.preventDefault();var e=jQuery(this).find(".wapo-addon-title"),t=e.closest(".yith-wapo-addon");t.hasClass("toggle-open")?t.removeClass("toggle-open").addClass("toggle-closed"):t.removeClass("toggle-closed").addClass("toggle-open"),e.hasClass("toggle-open")?e.removeClass("toggle-open").addClass("toggle-closed"):e.removeClass("toggle-closed").addClass("toggle-open"),t.find(".options-container").toggle("fast"),jQuery(document).trigger("yith_proteo_inizialize_html_elements")}),showRequiredMessage=function(e){e=e.closest(".yith-wapo-option");e.find(".required-error").length<1&&(e.append('<div class="required-error"><small class="required-message">'+yith_wapo.messages.requiredMessage+"</small></div>"),e.addClass("required-color"))},restartRequiredElement=function(e){var t=e.closest(".yith-wapo-option");e.closest(".yith-wapo-option").find(".required-error").remove(),t.removeClass("required-color")},jQuery("form.cart").on("change","#price_calculator.wc-measurement-price-calculator-price-table",function(){var e=jQuery("#price_calculator.wc-measurement-price-calculator-price-table .product_price .amount").text(),e=wcPriceToFloat(e);isNaN(e)||(jQuery("#yith-wapo-container").attr("data-product-price",e),jQuery(document).trigger("yith-wapo-reload-addons",[e]))}),jQuery("html").on("dragover",function(e){e.preventDefault(),e.stopPropagation()}),jQuery("html").on("drop",function(e){e.preventDefault(),e.stopPropagation()}),jQuery(document).on("dragenter",".yith-wapo-ajax-uploader",function(e){e.stopPropagation(),e.preventDefault(),jQuery(this).css("opacity","0.5")}),jQuery(document).on("dragover",".yith-wapo-ajax-uploader",function(e){e.stopPropagation(),e.preventDefault()}),jQuery(document).on("dragleave",".yith-wapo-ajax-uploader",function(e){e.stopPropagation(),e.preventDefault(),jQuery(e.target).hasClass("yith-wapo-ajax-uploader")&&jQuery(this).css("opacity","1")}),jQuery(".yith-wapo-ajax-uploader").on("drop",function(e){e.stopPropagation(),e.preventDefault(),jQuery(this).css("opacity","1");jQuery(this).closest(".yith-wapo-option").find("input.file");var t=jQuery(this),e=e.originalEvent.dataTransfer.files;checkBeforeUploadFiles(t,e)&&uploadFiles(e,t)}),jQuery(document).on("change",".yith-wapo-addon-type-file input.file",function(e){jQuery(this).closest(".yith-wapo-ajax-uploader").css("opacity","1");var t=jQuery(this),a=t.closest(".yith-wapo-option").find(".yith-wapo-ajax-uploader"),t=t[0].files;checkBeforeUploadFiles(a,t)&&uploadFiles(t,a)}),checkBeforeUploadFiles=function(e,o){var i,t=jQuery(e).find(".yith-wapo-uploaded-file-element").length+o.length,a=jQuery(e).closest(".yith-wapo-option").data("max-multiple");if(!jQuery(e).closest(".yith-wapo-option").hasClass("allow-multiple")&&1<t)return alert(yith_wapo.messages.maxFilesAllowed+"1"),!1;if(void 0!==a&&a<t)return alert(yith_wapo.messages.maxFilesAllowed+a),!1;for(i in o)if(jQuery.isNumeric(i)){let e=o[i],t="",a=!1;if(yith_wapo.upload_allowed_file_types.includes(e.name.split(".").pop().toLowerCase())||(t=yith_wapo.messages.noSupportedExtension,a=!0),parseFloat(e.size)>=parseFloat(1024*yith_wapo.upload_max_file_size*1024)&&(t=yith_wapo_sprintf(yith_wapo.messages.maxFileSize,e.name,yith_wapo.upload_max_file_size),a=!0),a)return alert(t),!1}return!0},appendNewUploadedFile=function(e,t,a,o){var i=calculate_exact_file_size(t[e]),e=t[e].name,t=jQuery(a).closest(".yith-wapo-option").data("option-id");a.append('<div class="yith-wapo-uploaded-file-element uploaded-file-'+o+'" data-index="'+o+'"><div class="yith-wapo-uploaded-file-info"><span class="info"><label class="file-name"><span>'+e+'</span></label><span class="file-size">'+i+'</span></span><i class="remove yith-plugin-fw__action-button__icon yith-icon yith-icon-trash" style="display:none"></i></div><div class="yith-wapo-loader-container" id="progressbar'+o+'"><div class="yith-wapo-loader-label"></div><div class="yith-wapo-loader" role="progressbar"></div></div><input type="hidden" id="yith-wapo-'+t+'" class="option yith-wapo-option-value" name="yith_wapo[0]['+t+'][]" ></div>')},uploadSingleFile=function(i,r,n,c=!1,d=0){0===parseInt(d)&&jQuery(n).find(".yith-wapo-uploaded-file-element.completed").length&&(d=jQuery(n).find(".yith-wapo-uploaded-file-element.completed").last().data("index")+1);var p=i.length-1,e=i[r],t=new FormData,a=jQuery(n).closest(".yith-wapo-option"),o=a.data("max-multiple"),l=jQuery(n).find(".yith-wapo-uploaded-file"),s=jQuery(n).find(".yith-wapo-ajax-uploader-container"),u=jQuery(n).find('.yith-wapo-uploaded-file-element[data-index="'+d+'"]'),h=jQuery(n).find(".yith-wapo-uploaded-file-info .remove"),y=jQuery(u).find(".yith-wapo-loader-container .yith-wapo-loader-label"),w=jQuery(u).find(".yith-wapo-loader-container .yith-wapo-loader");t.append("action","yith_wapo_upload_file"),t.append("currentFile",e),jQuery.ajax({url:yith_wapo.ajaxurl,type:"POST",contentType:!1,processData:!1,"async":!0,dataType:"json",data:t,xhr:function(){var e=jQuery.ajaxSettings.xhr();return e.upload&&(e.upload.addEventListener("progress",function(e){var t=0;e.lengthComputable&&(t=Math.ceil(e.loaded/e.total*100)),w.progressbar({value:t})},!1),e.addEventListener("progress",function(e){var t;1!=i.length&&!c||(a.hasClass("allow-multiple")&&(t=jQuery(n).find(".yith-wapo-uploaded-file-element").length,void 0===o||void 0!==o&&t<o)&&s.fadeIn(),h.fadeIn(),jQuery(n).closest(".yith-wapo-option").find('input[type="hidden"].upload-parent').val(1),calculateTotalAddonsPrice())},!1)),e},beforeSend:function(){s.hide(),l.show(),w.progressbar({change:function(){y.text(w.progressbar("value")+"% "+yith_wapo.i18n.uploadPercentageDoneString)},complete:function(e){jQuery(e.target).closest(".yith-wapo-loader-container").fadeOut()}}),w.show()},success:function(e,t){var a,o;"success"==t&&(t=u.find('input[type="hidden"]'),a=u.find(".yith-wapo-uploaded-file-info span.info"),o=e.type,t.val(e.url),"image/jpeg"!==o&&"image/jpg"!==o&&"image/png"!==o&&"image/gif"!==o||a.append('<img src="'+e.url+'" class="yith-wapo-img-uploaded" alt="Image uploaded from YITH Product Add-ons uploader">').fadeIn(),r<p)&&(r==p-1&&(c=!0),uploadSingleFile(i,r+1,n,c,d+1))},complete:function(){jQuery(u).addClass("completed"),console.log("Single file upload completed!")},error:function(e){console.log("File upload failed!")}})},jQuery(document).on("click",".yith-wapo-ajax-uploader .button, .yith-wapo-ajax-uploader .link",function(){jQuery(this).closest(".yith-wapo-option").find("input.file").click()}),jQuery("form.cart").on("click","span.checkboxbutton",function(){jQuery(this).find("input").is(":checked")?jQuery(this).addClass("checked"):jQuery(this).removeClass("checked")}),jQuery("form.cart").on("click","span.radiobutton",function(){jQuery(this).find("input").is(":checked")&&(jQuery(this).closest(".yith-wapo-addon.yith-wapo-addon-type-radio").find("span.radiobutton.checked").removeClass("checked"),jQuery(this).addClass("checked"))}),jQuery(document).on("change",".yith-wapo-addon-type-checkbox, .yith-wapo-addon-type-color, .yith-wapo-addon-type-label, .yith-wapo-addon-type-product",function(){yith_wapo_check_min_max(jQuery(this))}),jQuery(document).on("click","form.cart button",function(){var e=checkNumbersTotalValues(),t=yith_wapo_check_required_min_max();return!!e&&(t?jQuery("form.cart .yith-wapo-addon.conditional_logic.hidden").remove():yith_wapo.disable_scroll_on_required_mix_max||jQuery("html, body").animate({scrollTop:jQuery("#yith-wapo-container").offset().top-20},500),t)}),jQuery(document).on("click",".add-request-quote-button",function(e){e.preventDefault(),"undefined"==typeof yith_wapo_general&&(yith_wapo_general={do_submit:!0}),yith_wapo_check_required_min_max()?yith_wapo_general.do_submit=!0:yith_wapo_general.do_submit=!1}),jQuery(document).on("change keyup",".yith-wapo-addon-type-number input",function(){var e=jQuery(this).val();yith_wapo_replace_image(jQuery(this).closest(".yith-wapo-option"),""==e?!0:!1),yith_wapo_check_multiplied_price(jQuery(this))}),jQuery(".wapo-product-qty").keyup(function(){var e="?add-to-cart="+jQuery(this).data("product-id")+"&quantity="+jQuery(this).val();jQuery(this).parent().find("a").attr("href",e)}),jQuery(document).on("click","#wapo-datepicker-save button",function(e){e.preventDefault();e=jQuery("#ui-datepicker-div .ui-state-active");(e=0==e.length?jQuery("#ui-datepicker-div .ui-datepicker-today"):e).click(),jQuery(".hasDatepicker").datepicker("hide")}),jQuery(document).on("change","#wapo-datepicker-time-select",function(e){e.preventDefault();e=jQuery("#ui-datepicker-div").attr("wapo-option-id");jQuery("#"+e).closest(".date-container").find(".temp-time").text(jQuery(this).val())}),jQuery(document).on("yith_wcp_price_updated",function(e,t){var a=parseFloat(jQuery("form.cart.ywcp > div.quantity input.qty").val()),a=a?t/a:t;jQuery("#yith-wapo-container").attr("data-product-price",a),calculateTotalAddonsPrice()});