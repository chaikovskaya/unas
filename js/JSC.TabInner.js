!function(global) {
  'use strict';

  function TabInner( elem, params ){
    this.$element = jQuery(elem);
    this.params = params || {};

    this.classSwitcherActive = this.params.classSwitcherActive || 'JS-TabInner-Switcher-active';
    this.classItemActive = this.params.classItemActive || 'JS-TabInner-Item-active';
    this.classReady = this.params.classReady || 'JS-TabInner-ready';
    this.onInit = this.params.onInit || null;
    this.onReady = this.params.onReady || null;

    this.__construct();
  };

  TabInner.prototype.__construct = function(){
    this.$items = this.$element.find('.JS-TabInner-Item');
    this.$switcher = this.$element.find('.JS-TabInner-Switcher');
    this.$select = this.$element.find('.JS-TabInner-Select');

    this._init();

    this.$element.data('JS-TabInner', this);
  };

  TabInner.prototype._init = function(){
    var context = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, [this]);
    }

    this.$switcher.on('click.JS-TabInner', function(e){
      e.preventDefault();
      context.toggle.apply(context, [this]);
    });

    this.$select.on('change.JS-TabInner', function(e){
      context.toggleSelect.apply(context, [this]);
    });

    this._ready();
  };

  TabInner.prototype._ready = function() {
    this.$element.addClass('JS-TabInner-ready').addClass(this.classReady);

    if ( jQuery.isFunction(this.onReady) ) {
      this.onReady.apply(window, [this]);
    }
  };

  TabInner.prototype.toggleSelect = function( elem ){
    var index = elem.options.selectedIndex;

    this.toggle({} , index);
  }

  TabInner.prototype.toggle = function( elem, index1){
    var index = jQuery(elem).index();

    if (index < 0) {
      index = index1;
    }

    var $item = this.$items.eq(index),
        $switcher = this.$switcher.eq(index);

    if (!$switcher.hasClass(this.classSwitcherActive)) {
      this.$switcher
        .removeClass(this.classSwitcherActive)
        .removeClass('JS-TabInner-Switcher-active');

      $switcher
        .addClass(this.classSwitcherActive)
        .addClass('JS-TabInner-Switcher-active');
    }

    if (!$item.hasClass(this.classItemActive)) {
      this.$items
        .removeClass(this.classItemActive)
        .removeClass('JS-TabInner-Item-active')

      $item
        .addClass(this.classItemActive)
        .addClass('JS-TabInner-Item-active');
    }
  };
  /*--/TabInner--*/

  global.TabInner = TabInner;
}(this);
