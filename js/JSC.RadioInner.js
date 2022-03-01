!function(global) {
  'use strict';

  function RadioInner( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};

    this.classSwitcherActive = this.params.classSwitcherActive || 'JS-RadioInner-Switcher-active';
    this.classItemActive = this.params.classItemActive || 'JS-RadioInner-Item-active';
    this.classReady = this.params.classReady || 'JS-RadioInner-ready';
    this.onInit = this.params.onInit || null;
    this.onReady = this.params.onReady || null;

    this.__construct();
  };

  RadioInner.prototype.__construct = function(){
    this.$items = this.$element.find('.JS-RadioInner-Item');
    this.$switcherItem = this.$element.find('.JS-RadioInner-Switcher-Item');
    this.$switcher = this.$switcherItem.find('.JS-RadioInner-Switcher');

    this._init();

    this.$element.data('JS-RadioInner', this);
  };

  RadioInner.prototype._init = function(){
    var context = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, [this]);
    }

    this.$switcher.on('change.JS-RadioInner', function(e){
      e.stopPropagation();
      context.toggle.apply(context, [this]);
    });

    this._ready();
  };

  RadioInner.prototype._ready = function() {
    this.$element.addClass('JS-RadioInner-ready').addClass(this.classReady);

    if ( jQuery.isFunction(this.onReady) ) {
      this.onReady.apply(window, [this]);
    }
  };

  RadioInner.prototype.toggle = function( elem ){
    var $switcherItem = jQuery(elem).closest(this.$switcherItem),
        index = $switcherItem.index(),
        $item = this.$items.eq(index);

    if (!$switcherItem.hasClass(this.classSwitcherActive)) {
      this.$switcherItem
        .removeClass(this.classSwitcherActive)
        .removeClass('JS-RadioInner-Switcher-active');

      $switcherItem
        .addClass(this.classSwitcherActive)
        .addClass('JS-RadioInner-Switcher-active');
    }

    if (!$item.hasClass(this.classItemActive)) {
      this.$items
        .removeClass(this.classItemActive)
        .removeClass('JS-RadioInner-Item-active')

      $item
        .addClass(this.classItemActive)
        .addClass('JS-RadioInner-Item-active');
    }
  };
  /*--/RadioInner--*/

  global.RadioInner = RadioInner;
}(this);
