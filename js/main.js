/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 720;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').not('.JS-Dropdown-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initDropdownMarks() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown-Marks').not('.JS-Dropdown-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}


function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initScrollUp() {
    $(window).scroll(function(){
        var position = $(window).scrollTop(),
            positionBlock = $('.js-main-content').scrollTop();

        if (position > positionBlock) {
            $('body').addClass('main-content-animate');
        } else {
            $('body').removeClass('main-content-animate');
        }
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
        $.validator.messages.email = GLOBAL.FORMERROR.EMAIL;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 (999) 999-99-99',
        "tabThrough": true,
        "showMaskOnHover": false,
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function initSwitch() {
    $('.js-switch').each(function() {
        var $img = $(this).find('.js-switch-img'),
            $link = $(this).find('.js-switch-link'),
            classActive = 'products-img_active';

        if ($link.length == 1) {
            $link.hide();
        }

        $link.hover(function(){
            var index = $(this).index();

            $img.removeClass(classActive);
            $img.eq(index).addClass(classActive);
        });
    });
}

function initPassword() {
    jQuery('.js-password').each(function() {
        var $element = jQuery(this),
            $link = $element.find('.js-password-link'),
            $input = $element.find('.js-password-input'),
            $classActive = $element.data('password');

        $link.on("click", function() {
            $element.toggleClass($classActive);
            if ($input.attr('type') == 'password') {
                $input.attr('type','text');
            } else {
                $input.attr('type','password');
            }
        });
    });
}

function initTab() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
        return false;
    }

    var common = {};

    jQuery('.JS-Tab').not('.JS-Tab-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('tab'));
        new Tab(this, jQuery.extend({}, common, local));
    });
}

function initPopup() {
    $(".js-popup").fancybox({
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>",
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function openPopupProfile($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-profile');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initPopupRegistration();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupProfile() {
    $(".js-open-profile").on('click', function() {
        $.fancybox.close();
        openPopupProfile($(".js-open-profile"));
    });
}

function initQuantity() {
    if (typeof(Quantity) === 'undefined' || !jQuery.isFunction(Quantity)) {
        return false;
    }

    var common = {};

    $('.JS-Quantity').not('.JS-Quantity-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('quantity'));
        new Quantity(this, jQuery.extend({}, common, local));
    });
}

function initSearch() {
    $('.js-search').each(function(){
        var $element = $(this),
            classDynamic = $(this).data('search-dynamic'),
            $input = $(this).find('.js-search-input'),
            $link = $(this).find('.js-search-reset');

        $link.on('click', function(e, data) {
            $input.val('');
            $element.removeClass(classDynamic);
        });

        $input.on('input', function(e, data) {
            var val = $input.val();
            if (val != '') {
                $element.addClass(classDynamic);
            } else {
                $element.removeClass(classDynamic);
            }
        });
    });
}

function initScrollTop() {
    var $scrolltop = $('.js-scrolltop'),
        scrolltopActiveClass = $scrolltop.data('scrolltop');

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1) {
            $scrolltop.addClass(scrolltopActiveClass);
        } else {
            $scrolltop.removeClass(scrolltopActiveClass);
        }
    });
    $scrolltop.click(function(){
        $('html, body').animate({scrollTop: '0px'}, 500);
        return false;
    });
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 26,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

function initAccordion() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion').not('.JS-Accordion-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

function initShowMore(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = { },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initSliderRange() {
    jQuery('.js-slider-range').each(function() {
        var $element = $(this),
            $track = $element.find('.js-slider-range-track');

        var min = Number($(this).find('.min-price').attr('data-value'));
        var max = Number($(this).find('.max-price').attr('data-value'));

        var price_id = $(this).attr('data-code');

        $track.slider({
            range: true,
            min: min,
            max: max,
            drag: true,
            values: [min, max],
            classes: {
                "ui-slider-handle": "slider-range-button",
                "ui-slider-range": "slider-range-quantity"
            },
            slide: function (event, ui) {
                $("input#minCost_" + price_id).val(ui.values[0]);
                $("input#maxCost_" + price_id).val(ui.values[1]);

                $('#minCost_' + price_id).trigger('change');
            },
            stop: function (event, ui) {
                $("input#minCost_" + price_id).val(ui.values[0]);
                $("input#maxCost_" + price_id).val(ui.values[1]);

                $('#minCost_' + price_id).trigger('change');
            }
        });
    });
}

function initTooltip() {
    $('.js-tooltip').each(function() {
        var $content = $(this).find('.js-tooltip-content'),
            classElement = $(this).data('tooltip-class');

        Tipped.create($(this), $content, {
            position: 'top',
            size: 'x-small',
            skin: 'light',
            hideOthers: true,
        });
    });
}

function initParallaxHeader() {
    $(".js-parallax-banner").each(function(){
        var scene = this;
        var parallaxInstance = new Parallax(scene, {
            relativeInput: true,
            hoverOnly: true,
            pointerEvents: true,
        });
    });
}

function initIndicator(currentAmount, currentTotal) {
    $('.js-indicator').each(function() {
        var $element = $(this),
            total = $element.data("indicator-total"),
            $value = $element.find('.js-indicator-value');

        if ((currentAmount > 0) && (currentTotal > 0)) {
            var percent = (currentAmount * 100)/currentTotal;
        }

        var res = (total * percent)/100;
        if (res) {
            $value.attr('stroke-dasharray', res + ',' + total);
        }
    });
}

function initSliderMainBanner() {
    $(".js-slider-main-banner").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 45,
            items: 1,
            nav: true,
            responsive: {
                0: {
                },
                720: {
                    mouseDrag: true,
                },
                992: {
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);
                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);
            updateButtons();
        });
    });
}

function initSliderCategory() {
    $(".js-slider-category").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: false,
            mouseDrag: false,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                    mouseDrag: true,
                },
                720: {
                    items: 2,
                    loop: itemLength > 2 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                 },
                1200: {
                    items: 3,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);
        });
    });
}

function initSliderCatalogGallery() {
    $(".js-slider-catalog-gallery").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                },
                720: {
                    items: 2,
                    loop: itemLength > 2 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 4,
                    loop: itemLength > 4 ? true : false,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);
                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);
            updateButtons();
        });
    });
}

function initSliderProducts() {
    $(".js-slider-products").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                },
                720: {
                    items: 2,
                    loop: itemLength > 2 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                    items: 3,
                    loop: itemLength > 3 ? true : false,
                },
                1200: {
                    items: 4,
                    loop: itemLength > 4 ? true : false,
                },
                1640: {
                    items: 5,
                    loop: itemLength > 5 ? true : false,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);

                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);

            updateButtons();
        });
    });
}

function initSliderNew() {
    $(".js-slider-new").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                },
                720: {
                    items: 2,
                    loop: itemLength > 2 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                    items: 3,
                    loop: itemLength > 3 ? true : false,
                },
                1640: {
                    autoWidth: true,
                    items: 3,
                    loop: itemLength > 3 ? true : false,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);

                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);

            updateButtons();
        });
    });
}

function initSliderOwnProducts() {
    $(".js-slider-own-products").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                },
                720: {
                    items: 2,
                    loop: itemLength > 2 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                    items: 3,
                    loop: itemLength > 3 ? true : false,
                },
                1200: {
                    items: 4,
                    loop: itemLength > 4 ? true : false,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);

                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);

            updateButtons();
        });
    });
}

function initSliderInstagram() {
    $(".js-slider-instagram").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: false,
            mouseDrag: false,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            responsive: {
                0: {
                    items: 1,
                    loop: itemLength > 1 ? true : false,
                    margin: 24,
                    mouseDrag: true,
                },
                720: {
                    items: 3,
                    loop: itemLength > 3 ? true : false,
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                },
                1200: {
                    items: 4,
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);
        });
    });
}
function reInitSliderInstagram() {
    $(".js-slider-instagram .js-slider-list").trigger('destroy.owl.carousel');
}

function initSliderVideo() {
    $(".js-slider-video").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: false,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoHeight: false,
            smartSpeed: 300,
            margin: 40,
            nav: true,
            items: 1,
            responsive: {
                0: {
                    margin: 24,
                },
                720: {
                    mouseDrag: true,
                    margin: 24,
                },
                992: {
                },
                1200: {
                },
                1640: {
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);

                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);

            updateButtons();
        });
    });
}


function initSliderAbout() {
    $(".js-slider-about").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $prev = $element.find('.js-slider-prev'),
            $next = $element.find('.js-slider-next'),
            $item = $list.find('.js-slider-item'),
            itemLength = $item.length,
            $currentPage = $element.find('.js-slider-current'),
            $amountPages = $element.find('.js-slider-amount');

        var isStart = itemLength > 1 ? true : false;

        function updateButtons() {
            $prev.removeClass('slider-button_disabled');
            $next.removeClass('slider-button_disabled');
            var prevOwl = $list.find('.owl-prev');
            if (prevOwl.hasClass('disabled') && !$prev.hasClass('slider-button_disabled')) {
                $prev.addClass('slider-button_disabled');
            }

            var nextOwl = $list.find('.owl-next');
            if (nextOwl.hasClass('disabled') && !$next.hasClass('slider-button_disabled')) {
                $next.addClass('slider-button_disabled');
            }
        }

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isStart,
            mouseDrag: isStart,
            touchDrag: isStart,
            autoWidth: true,
            autoHeight: false,
            smartSpeed: 300,
            margin: 0,
            nav: true,
            items: 3,
            responsive: {
                0: {
                },
                720: {
                    mouseDrag: true,
                },
                992: {
                },
                1200: {
                },
                1640: {
                },
            },
            onInitialized : function(event) {
                var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
                initIndicator(index, itemLength);
                if (itemLength < 10) {
                    itemLength =  '0' + itemLength;
                }
                $amountPages.html(itemLength);

                updateButtons();
            },
        }));
        if (!isStart) {
            $buttons.remove();
        }
        $prev.click(function(){
            $list.trigger("prev.owl.carousel");
        });
        $next.click(function(){
            $list.trigger("next.owl.carousel");
        });
        $list.on('translated.owl.carousel', function(event) {
            var index = $list.find('.owl-item.active .js-slider-item').data('slider-index');
            initIndicator(index, itemLength);
            if (index < 10) {
                index =  '0' + index;
            }
            $currentPage.html(index);

            updateButtons();
        });
    });
}


function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        reInitSliderInstagram();
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        initSliderInstagram();
    } else {
        GLOBAL.widthWindow = '';
        initSliderInstagram();
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
    });

    initDropdown();
    initDropdownMarks();
    initMobileMenu();
    initScroll();
    initScrollUp();
    initValidate();
    initMask();
    initForm();
    initSwitch();
    initPopup();
    initPopupProfile();
    initPassword();
    initTab();
    initSearch();
    initScrollTop();
    initExpand();
    initAccordion();
    initShowMore();
    initSelect();
    initSliderRange();
    initQuantity();
    initTooltip();
    initParallaxHeader();
    initSliderMainBanner();
    initSliderCategory();
    initSliderCatalogGallery();
    initSliderProducts();
    initSliderNew();
    initSliderOwnProducts();
    initSliderVideo();
    initSliderAbout();
});
