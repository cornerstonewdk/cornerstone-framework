/* ===================================================
 * bootstrap-transition.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  $(function () {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd'
            ,  'msTransition'     : 'MSTransitionEnd'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide')

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSIBLE PLUGIN DEFINITION
  * ============================== */

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSIBLE DATA-API
  * ==================== */

  $(function () {
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function ( e ) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $(target).collapse(option)
    })
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (content, options) {
    this.options = options
    this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        escape.call(this)
        backdrop.call(this, function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element.addClass('in')

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element.removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
      }

  }


 /* MODAL PRIVATE METHODS
  * ===================== */

  function hideWithTransition() {
    var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
        }, 500)

    this.$element.one($.support.transition.end, function () {
      clearTimeout(timeout)
      hideModal.call(that)
    })
  }

  function hideModal(that) {
    this.$element
      .hide()
      .trigger('hidden')

    backdrop.call(this)
  }

  function backdrop(callback) {
    var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      if (this.options.backdrop != 'static') {
        this.$backdrop.click($.proxy(this.hide, this))
      }

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

    } else if (callback) {
      callback()
    }
  }

  function removeBackdrop() {
    this.$backdrop.remove()
    this.$backdrop = null
  }

  function escape() {
    var that = this
    if (this.isShown && this.options.keyboard) {
      $(document).on('keyup.dismiss.modal', function ( e ) {
        e.which == 27 && that.hide()
      })
    } else if (!this.isShown) {
      $(document).off('keyup.dismiss.modal')
    }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL DATA-API
  * ============== */

  $(function () {
    $('body').on('click.modal.data-api', '[data-toggle="modal"]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

      e.preventDefault()
      $target.modal(option)
    })
  })

}(window.jQuery);/* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , isHTML: function(text) {
      // html string detection logic adapted from jQuery
      return typeof text != 'string'
        || ( text.charAt(0) === "<"
          && text.charAt( text.length - 1 ) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.isHTML(content) ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu'))  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  "use strict";

  $.transit = {
    version: "0.1.3",

    // Map of $.css() keys to values for 'transitionProperty'.
    // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
    propertyMap: {
      marginLeft    : 'margin',
      marginRight   : 'margin',
      marginBottom  : 'margin',
      marginTop     : 'margin',
      paddingLeft   : 'padding',
      paddingRight  : 'padding',
      paddingBottom : 'padding',
      paddingTop    : 'padding'
    },

    // Will simply transition "instantly" if false
    enabled: true,

    // Set this to false if you don't want to use the transition end property.
    useTransitionEnd: false
  };

  var div = document.createElement('div');
  var support = {};

  // Helper function to get the proper vendor property name.
  // (`transition` => `WebkitTransition`)
  function getVendorPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }

  // Helper function to check if transform3D is supported.
  // Should return true for Webkits and Firefox 10+.
  function checkTransform3dSupport() {
    div.style[support.transform] = '';
    div.style[support.transform] = 'rotateY(90deg)';
    return div.style[support.transform] !== '';
  }

  var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

  // Check for the browser's transitions support.
  // You can access this in jQuery's `$.support.transition`.
  // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
  // we set $.support.transition to a string of the actual property name used.
  support.transition      = getVendorPropertyName('transition');
  support.transitionDelay = getVendorPropertyName('transitionDelay');
  support.transform       = getVendorPropertyName('transform');
  support.transformOrigin = getVendorPropertyName('transformOrigin');
  support.transform3d     = checkTransform3dSupport();

  $.extend($.support, support);

  var eventNames = {
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  // Detect the 'transitionend' event needed.
  var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

  // Avoid memory leak in IE.
  div = null;

  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    '_default': 'ease',
    'in':       'ease-in',
    'out':      'ease-out',
    'in-out':   'ease-in-out',
    'snap':     'cubic-bezier(0,1,.5,1)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  //
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks.transform = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform');
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, v) {
      var value = v;

      if (!(value instanceof Transform)) {
        value = new Transform(value);
      }

      // We've seen the 3D version of Scale() not work in Chrome when the
      // element being scaled extends outside of the viewport.  Thus, we're
      // forcing Chrome to not use the 3d transforms as well.  Not sure if
      // translate is affectede, but not risking it.  Detection code from
      // http://davidwalsh.name/detecting-google-chrome-javascript
      if (support.transform === 'WebkitTransform' && !isChrome) {
        elem.style[support.transform] = value.toString(true);
      } else {
        elem.style[support.transform] = value.toString();
      }

      $(elem).data('transform', value);
    }
  };

  // ## 'transformOrigin' CSS hook
  // Allows the use for `transformOrigin` to define where scaling and rotation
  // is pivoted.
  //
  //     $("#hello").css({ transformOrigin: '0 0' });
  //
  $.cssHooks.transformOrigin = {
    get: function(elem) {
      return elem.style[support.transformOrigin];
    },
    set: function(elem, value) {
      elem.style[support.transformOrigin] = value;
    }
  };

  // ## 'transition' CSS hook
  // Allows you to use the `transition` property in CSS.
  //
  //     $("#hello").css({ transition: 'all 0 ease 0' }); 
  //
  $.cssHooks.transition = {
    get: function(elem) {
      return elem.style[support.transition];
    },
    set: function(elem, value) {
      elem.style[support.transition] = value;
    }
  };

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('rotateX');
  registerCssHook('rotateY');
  registerCssHook('rotate3d');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
  //
  function Transform(str) {
    if (typeof str === 'string') { this.parse(str); }
    return this;
  }

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args =
        (typeof val === 'string')  ? val.split(',') :
        (val.constructor === Array) ? val :
        [ val ];

      args.unshift(prop);

      Transform.prototype.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    get: function(prop) {
      if (this.getter[prop]) {
        return this.getter[prop].apply(this);
      } else {
        return this[prop] || 0;
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(theta) {
        this.rotate = unit(theta, 'deg');
      },

      rotateX: function(theta) {
        this.rotateX = unit(theta, 'deg');
      },

      rotateY: function(theta) {
        this.rotateY = unit(theta, 'deg');
      },

      // ### scale
      //
      //     .css({ scale: 9 })      //=> "scale(9,9)"
      //     .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) { y = x; }
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### perspectvie
      perspective: function(dist) {
        this.perspective = unit(dist, 'px');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) { this._translateX = 0; }
        if (this._translateY === undefined) { this._translateY = 0; }

        if (x !== null) { this._translateX = unit(x, 'px'); }
        if (y !== null) { this._translateY = unit(y, 'px'); }

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    getter: {
      x: function() {
        return this._translateX || 0;
      },

      y: function() {
        return this._translateY || 0;
      },

      scale: function() {
        var s = (this.scale || "1,1").split(',');
        if (s[0]) { s[0] = parseFloat(s[0]); }
        if (s[1]) { s[1] = parseFloat(s[1]); }

        // "2.5,2.5" => 2.5
        // "2.5,1" => [2.5,1]
        return (s[0] === s[1]) ? s[0] : s;
      },

      rotate3d: function() {
        var s = (this.rotate3d || "0,0,0,0deg").split(',');
        for (var i=0; i<=3; ++i) {
          if (s[i]) { s[i] = parseFloat(s[i]); }
        }
        if (s[3]) { s[3] = unit(s[3], 'deg'); }

        return s;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string. If `use3d` is given,
    // it converts to a `-webkit-transition` CSS property string instead.
    toString: function(use3d) {
      var re = [];

      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          // Don't use 3D transformations if the browser can't support it.
          if ((!support.transform3d) && (
            (i === 'rotateX') ||
            (i === 'rotateY') ||
            (i === 'perspective') ||
            (i === 'transformOrigin'))) { continue; }

          if (i[0] !== '_') {
            if (use3d && (i === 'scale')) {
              re.push(i + "3d(" + this[i] + ",1)");
            } else if (use3d && (i === 'translate')) {
              re.push(i + "3d(" + this[i] + ",0)");
            } else {
              re.push(i + "(" + this[i] + ")");
            }
          }
        }
      }

      return re.join(" ");
    }
  };

  function callOrQueue(self, queue, fn) {
    if (queue === true) {
      self.queue(fn);
    } else if (queue) {
      self.queue(queue, fn);
    } else {
      fn();
    }
  }

  // ### getProperties(dict)
  // Returns properties (for `transition-property`) for dictionary `props`. The
  // value of `props` is what you would expect in `$.css(...)`.
  function getProperties(props) {
    var re = [];

    $.each(props, function(key) {
      key = $.camelCase(key); // Convert "text-align" => "textAlign"
      key = $.transit.propertyMap[key] || key;
      key = uncamel(key); // Convert back to dasherized

      if ($.inArray(key, re) === -1) { re.push(key); }
    });

    return re;
  }

  // ### getTransition()
  // Returns the transition string to be used for the `transition` CSS property.
  //
  // Example:
  //
  //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
  //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
  //
  function getTransition(properties, duration, easing, delay) {
    // Get the CSS properties needed.
    var props = getProperties(properties);

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

    // Build the duration/easing/delay attributes for it.
    var attribs = '' + toMS(duration) + ' ' + easing;
    if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

    // For more properties, add them this way:
    // "margin 200ms ease, padding 200ms ease, ..."
    var transitions = [];
    $.each(props, function(i, name) {
      transitions.push(name + ' ' + attribs);
    });

    return transitions.join(', ');
  }

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = $.fn.transit = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;
    var queue = true;

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = undefined;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }

    // Alternate syntax.
    if (typeof properties.easing !== 'undefined') {
      easing = properties.easing;
      delete properties.easing;
    }

    if (typeof properties.duration !== 'undefined') {
      duration = properties.duration;
      delete properties.duration;
    }

    if (typeof properties.complete !== 'undefined') {
      callback = properties.complete;
      delete properties.complete;
    }

    if (typeof properties.queue !== 'undefined') {
      queue = properties.queue;
      delete properties.queue;
    }

    if (typeof properties.delay !== 'undefined') {
      delay = properties.delay;
      delete properties.delay;
    }

    // Set defaults. (`400` duration, `ease` easing)
    if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
    if (typeof easing === 'undefined')   { easing = $.cssEase._default; }

    duration = toMS(duration);

    // Build the `transition` property.
    var transitionValue = getTransition(properties, duration, easing, delay);

    // Compute delay until callback.
    // If this becomes 0, don't bother setting the transition property.
    var work = $.transit.enabled && support.transition;
    var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

    // If there's nothing to do...
    if (i === 0) {
      var fn = function(next) {
        self.css(properties);
        if (callback) { callback.apply(self); }
        if (next) { next(); }
      };

      callOrQueue(self, queue, fn);
      return self;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    var run = function(nextCall) {
      var bound = false;

      // Prepare the callback.
      var cb = function() {
        if (bound) { self.unbind(transitionEnd, cb); }

        if (i > 0) {
          self.each(function() {
            this.style[support.transition] = (oldTransitions[this] || null);
          });
        }

        if (typeof callback === 'function') { callback.apply(self); }
        if (typeof nextCall === 'function') { nextCall(); }
      };

      if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
        // Use the 'transitionend' event if it's available.
        bound = true;
        self.bind(transitionEnd, cb);
      } else {
        // Fallback to timers if the 'transitionend' event isn't supported.
        window.setTimeout(cb, i);
      }

      // Apply transitions.
      self.each(function() {
        if (i > 0) {
          this.style[support.transition] = transitionValue;
        }
        $(this).css(properties);
      });
    };

    // Defer running. This allows the browser to paint any pending CSS it hasn't
    // painted yet before doing the transitions.
    var deferredRun = function(next) {
      var i = 0;

      // Durations that are too slow will get transitions mixed up.
      // (Tested on Mac/FF 7.0.1)
      if ((support.transition === 'MozTransition') && (i < 25)) { i = 25; }

      window.setTimeout(function() { run(next); }, i);
    };

    // Use jQuery's fx queue.
    callOrQueue(self, queue, deferredRun);

    // Chainability.
    return this;
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) { $.cssNumber[prop] = true; }

    $.transit.propertyMap[prop] = support.transform;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transform') || new Transform();
        return t.get(prop);
      },

      set: function(elem, value) {
        var t = $(elem).css('transform') || new Transform();
        t = t === "none" ? new Transform() : t;
        t.setFromString(prop, value);

        $(elem).css({ transform: t });
      }
    };
  }

  // ### uncamel(str)
  // Converts a camelcase string to a dasherized string.
  // (`marginLeft` => `margin-left`)
  function uncamel(str) {
    return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, units) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
      return i;
    } else {
      return "" + i + units;
    }
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  //     toMS('fast')   //=> '400ms'
  //     toMS(10)       //=> '10ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow for string durations like 'fast'.
    if ($.fx.speeds[i]) { i = $.fx.speeds[i]; }

    return unit(i, 'ms');
  }

  // Export some functions for testable-ness.
  $.transit.getTransitionValue = getTransition;
})(jQuery);
/**
 * @preserve Flux Slider v1.4.4
 * http://www.joelambert.co.uk/flux
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

// Flux namespace
window.flux = {
	version: '1.4.4'
};

(function($){
	flux.slider = function(elem, opts) {
		// Setup the flux.browser singleton to perform feature detection
		flux.browser.init();

		if(!flux.browser.supportsTransitions)
		{
			if(window.console && window.console.error)
				console.error("Flux Slider requires a browser that supports CSS3 transitions");
		}

		var _this = this;

		this.element = $(elem);

		// Make a list of all available transitions
		this.transitions = [];
		for(var fx in flux.transitions)
			this.transitions.push(fx);

		this.options = $.extend({
			autoplay: true,
			transitions: this.transitions,
			delay: 4000,
			pagination: true,
			controls: false,
			captions: false,
			width: null,
			height: null,
			onTransitionEnd: null
		}, opts);

		// Set the height/width if given [EXPERIMENTAL!]
		this.height = this.options.height ? this.options.height	: null;
		this.width 	= this.options.width  ? this.options.width 	: null;

		// Filter out non compatible transitions
		var newTrans = [];
		$(this.options.transitions).each(function(index, tran){
			var t = new flux.transitions[tran](this),
				compatible = true;
			
			if(t.options.requires3d && !flux.browser.supports3d)
				compatible = false;
				
			if(t.options.compatibilityCheck)
				compatible = t.options.compatibilityCheck();

			if(compatible)
				newTrans.push(tran);
		});		

		this.options.transitions = newTrans;

		this.images = new Array();
		this.imageLoadedCount = 0;
		this.currentImageIndex = 0;
		this.nextImageIndex = 1;
		this.playing = false;


		this.container = $('<div class="fluxslider"></div>').appendTo(this.element);
		
		this.surface = $('<div class="surface" style="position: relative"></div>').appendTo(this.container);
		
		// Listen for click events as we may want to follow a link
		this.container.bind('click', function(event) {
			if($(event.target).hasClass('hasLink'))
				window.location = $(event.target).data('href');
		});

		this.imageContainer = $('<div class="images loading"></div>').css({
			'position': 'relative',
			'overflow': 'hidden',
			'min-height': '100px'
		}).appendTo(this.surface);
		
		// If the height/width is already set then resize the container
		if(this.width && this.height)
		{
			this.imageContainer.css({
				width: this.width+'px',
				height: this.height+'px'
			});
		}

		// Create the placeholders for the current and next image
		this.image1 = $('<div class="image1" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer);
		this.image2 = $('<div class="image2" style="height: 100%; width: 100%"></div>').appendTo(this.imageContainer);

		$(this.image1).add(this.image2).css({
			'position': 'absolute',
			'top': '0px',
			'left': '0px'
		});
		
		// Get a list of the images to use
		this.element.find('img, a img').each(function(index, found_img){
			var imgClone = found_img.cloneNode(false),
				link = $(found_img).parent();

			// If this img is directly inside a link then save the link for later use
			if(link.is('a'))
				$(imgClone).data('href', link.attr('href'));

			_this.images.push(imgClone);

			// Remove the images from the DOM
			$(found_img).remove();
		});
		
		// Load the images afterwards as IE seems to load images synchronously
		for(var i=0; i<this.images.length; i++) {
			var image = new Image();
			image.onload = function() {
				_this.imageLoadedCount++;

				_this.width  = _this.width 	? _this.width  : this.width;
				_this.height = _this.height ? _this.height : this.height;

				if(_this.imageLoadedCount >= _this.images.length)
				{
					_this.finishedLoading();
					_this.setupImages();
				}
			};

			// Load the image to ensure its cached by the browser
			image.src = this.images[i].src;
		}
		
		// Catch when a transition has finished
		this.element.bind('fluxTransitionEnd', function(event, data) {
			// If the slider is currently playing then set the timeout for the next transition
			// if(_this.isPlaying())
			// 	_this.start();
			
			// Are we using a callback instead of events for notifying about transition ends?
			if(_this.options.onTransitionEnd) {					
				event.preventDefault();
				_this.options.onTransitionEnd(data);
			}
		});

		// Should we auto start the slider?
		if(this.options.autoplay)
			this.start();
			
		// Handle swipes
		this.element.bind('swipeLeft', function(event){
			_this.next(null, {direction: 'left'});
		}).bind('swipeRight', function(event){
			_this.prev(null, {direction: 'right'});
		});
		
		// Under FF7 autoplay breaks when the current tab loses focus
		setTimeout(function(){
			$(window).focus(function(){
				if(_this.isPlaying())
					_this.next();
			});
		}, 100);
	};

	flux.slider.prototype = {
		constructor: flux.slider,
		playing: false,
		start: function() {
			var _this = this;
			this.playing = true;
			this.interval = setInterval(function() {
				_this.transition();
			}, this.options.delay);
		},
		stop: function() {
			this.playing = false;
			clearInterval(this.interval);
			this.interval = null;
		},
		isPlaying: function() {
			return this.playing;
			//return this.interval != null;
		},
		next: function(trans, opts) {
			opts = opts || {};
			opts.direction = 'left';
			this.showImage(this.currentImageIndex+1, trans, opts);
		},
		prev: function(trans, opts) {
			opts = opts || {};
			opts.direction = 'right';
			this.showImage(this.currentImageIndex-1, trans, opts);
		},
		showImage: function(index, trans, opts) {
			this.setNextIndex(index);
			
			// Temporarily stop the transition interval
			//clearInterval(this.interval);
			//this.interval = null;
			
			this.setupImages();
			this.transition(trans, opts);
		},  
		finishedLoading: function() {
			var _this = this;

			this.container.css({
				width: this.width+'px',
				height: this.height+'px'
			});

			this.imageContainer.removeClass('loading');

			// Should we setup a pagination view?
			if(this.options.pagination)
			{
				// TODO: Attach to touch events if appropriate
				this.pagination = $('<ul class="pagination"></ul>').css({
					margin: '0px',
					padding: '0px',
					'text-align': 'center'
				});

				this.pagination.bind('click', function(event){
					event.preventDefault();
					_this.showImage($(event.target).data('index'));
				});

				$(this.images).each(function(index, image){
					var li = $('<li data-index="'+index+'">'+(index+1)+'</li>').css({
						display: 'inline-block',
						'margin-left': '0.5em',
						'cursor': 'pointer'
					}).appendTo(_this.pagination);

					if(index == 0)
						li.css('margin-left', 0).addClass('current');
				});

				this.container.append(this.pagination);
			}

			// Resize
			$(this.imageContainer).css({
				width: this.width+'px',
				height: this.height+'px'
			});

			$(this.image1).css({
				width: this.width+'px',
				height: this.height+'px'
			});

			$(this.image2).css({
				width: this.width+'px',
				height: this.height+'px'
			});

			this.container.css({
				width: this.width+'px',
				height: this.height+(this.options.pagination?this.pagination.height():0)+'px'
			});
			
			// Should we add prev/next controls?
			if(this.options.controls)
			{
				var css = {
					padding: '4px 10px 10px',
					'font-size': '60px',
					'font-family': 'arial, sans-serif',
					'line-height': '1em',
					'font-weight': 'bold',
					color: '#FFF',
					'text-decoration': 'none',
					background: 'rgba(0,0,0,0.5)',
					position: 'absolute',
					'z-index': 2000
				};
				
				this.nextButton = $('<a href="#">»</a>').css(css).css3({
					'border-radius': '4px'
				}).appendTo(this.surface).bind('click', function(event){
					event.preventDefault();
					_this.next();
				});
				
				this.prevButton = $('<a href="#">«</a>').css(css).css3({
					'border-radius': '4px'
				}).appendTo(this.surface).bind('click', function(event){
					event.preventDefault();
					_this.prev();
				});
				
				var top = (this.height - this.nextButton.height())/2;
				this.nextButton.css({
					top: top+'px',
					right: '10px'
				});
				
				this.prevButton.css({
					top: top+'px',
					left: '10px'
				});
			}
			
			// Should we use captions?
			if(this.options.captions)
			{
				this.captionBar = $('<div class="caption"></div>').css({
					background: 'rgba(0,0,0,0.6)',
					color: '#FFF',
					'font-size': '16px',
					'font-family': 'helvetica, arial, sans-serif',
					'text-decoration': 'none',
					'font-weight': 'bold',
					padding: '1.5em 1em',
					opacity: 0,
					position: 'absolute',
					'z-index': 110,
					width: '100%',
					bottom: 0
				}).css3({
					'transition-property': 'opacity',
					'transition-duration': '800ms',
					'box-sizing': 'border-box'
				}).prependTo(this.surface);
			}
			
			this.updateCaption();
		},
		setupImages: function() {
			var img1 = this.getImage(this.currentImageIndex),
				css1 = {
					'background-image': 'url("'+img1.src+'")',
					'z-index': 101,
					'cursor': 'auto'
				};

			// Does this image have an associated link?
			if($(img1).data('href'))
			{
				css1.cursor = 'pointer';
				this.image1.addClass('hasLink');
				this.image1.data('href', $(img1).data('href'));
			}
			else
			{
				this.image1.removeClass('hasLink');
				this.image1.data('href', null);
			}

			this.image1.css(css1).children().remove();

			this.image2.css({
				'background-image': 'url("'+this.getImage(this.nextImageIndex).src+'")',
				'z-index': 100
			}).show();

			if(this.options.pagination && this.pagination)
			{
				this.pagination.find('li.current').removeClass('current');
				$(this.pagination.find('li')[this.currentImageIndex]).addClass('current');
			}
		},
		transition: function(transition, opts) {
			// Allow a transition to be picked from ALL available transitions (not just the reduced set)
	        if(transition == undefined || !flux.transitions[transition])
	        {
	            // Pick a transition at random from the (possibly reduced set of) transitions
	            var index = Math.floor(Math.random()*(this.options.transitions.length));
	            transition = this.options.transitions[index];
	        }
			
			var tran = null;

			try {
		        tran = new flux.transitions[transition](this, $.extend(this.options[transition] ? this.options[transition] : {}, opts));
			}
			catch(e) {
				// If an invalid transition has been provided then use the fallback (default is to just switch the image)
				tran = new flux.transition(this, {fallback: true});
			}

	        tran.run();
			
	        this.currentImageIndex = this.nextImageIndex;
	        this.setNextIndex(this.currentImageIndex+1);
			this.updateCaption();
		},
		updateCaption: function() {
			var str = $(this.getImage(this.currentImageIndex)).attr('title');
			if(this.options.captions && this.captionBar)
			{
				if(str !== "")
					this.captionBar.html(str);
					
				this.captionBar.css('opacity', str === "" ? 0 : 1);
			}
		},
		getImage: function(index) {
			index = index % this.images.length;

			return this.images[index];
		},
		setNextIndex: function(nextIndex)
		{
			if(nextIndex == undefined)
				nextIndex = this.currentImageIndex+1;

			this.nextImageIndex = nextIndex;

			if(this.nextImageIndex > this.images.length-1)
				this.nextImageIndex = 0;

			if(this.nextImageIndex < 0)
				this.nextImageIndex = this.images.length-1;
		},
		increment: function() {
			this.currentImageIndex++;
			if(this.currentImageIndex > this.images.length-1)
				this.currentImageIndex = 0;
		}
	};
})(window.jQuery || window.Zepto);

/**
 * Helper object to determine support for various CSS3 functions
 * @author Joe Lambert
 */

(function($) {
	flux.browser = {
		init: function() {
			// Have we already been initialised?
			if(flux.browser.supportsTransitions !== undefined)
				return;

			var div = document.createElement('div'),
				prefixes = ['-webkit', '-moz', '-o', '-ms'],
				domPrefixes = ['Webkit', 'Moz', 'O', 'Ms'];

			// Does the current browser support CSS Transitions?
			if(window.Modernizr && Modernizr.csstransitions !== undefined)
				flux.browser.supportsTransitions = Modernizr.csstransitions;
			else
			{
				flux.browser.supportsTransitions = this.supportsCSSProperty('Transition');
			}

			// Does the current browser support 3D CSS Transforms?
			if(window.Modernizr && Modernizr.csstransforms3d !== undefined)
				flux.browser.supports3d = Modernizr.csstransforms3d;
			else
			{
				// Custom detection when Modernizr isn't available
				flux.browser.supports3d = this.supportsCSSProperty("Perspective");
				
				if ( flux.browser.supports3d && 'webkitPerspective' in $('body').get(0).style ) {
					// Double check with a media query (similar to how Modernizr does this)
					var div3D = $('<div id="csstransform3d"></div>');
					var mq = $('<style media="(transform-3d), ('+prefixes.join('-transform-3d),(')+'-transform-3d)">div#csstransform3d { position: absolute; left: 9px }</style>');

					$('body').append(div3D);
					$('head').append(mq);

					flux.browser.supports3d = div3D.get(0).offsetLeft == 9;

					div3D.remove();
					mq.remove();	
				}
			}

		},
		supportsCSSProperty: function(prop) {
			var div = document.createElement('div'),
				prefixes = ['-webkit', '-moz', '-o', '-ms'],
				domPrefixes = ['Webkit', 'Moz', 'O', 'Ms'];
				
			var support = false;
			for(var i=0; i<domPrefixes.length; i++)
			{
				if(domPrefixes[i]+prop in div.style)
					support = support || true;
			}
			
			return support;
		},
		translate: function(x, y, z) {
			x = (x != undefined) ? x : 0;
			y = (y != undefined) ? y : 0;
			z = (z != undefined) ? z : 0;

			return 'translate' + (flux.browser.supports3d ? '3d(' : '(') + x + 'px,' + y + (flux.browser.supports3d ? 'px,' + z + 'px)' : 'px)');
		},

		rotateX: function(deg) {
			return flux.browser.rotate('x', deg);
		},

		rotateY: function(deg) {
			return flux.browser.rotate('y', deg);
		},

		rotateZ: function(deg) {
			return flux.browser.rotate('z', deg);
		},

		rotate: function(axis, deg) {
			if(!axis in {'x':'', 'y':'', 'z':''})
				axis = 'z';

			deg = (deg != undefined) ? deg : 0;

			if(flux.browser.supports3d)
				return 'rotate3d('+(axis == 'x' ? '1' : '0')+', '+(axis == 'y' ? '1' : '0')+', '+(axis == 'z' ? '1' : '0')+', '+deg+'deg)';
			else
			{
				if(axis == 'z')
					return 'rotate('+deg+'deg)';
				else
					return '';
			}
		}
	};

	$(function(){
		// To continue to work with legacy code, ensure that flux.browser is initialised on document ready at the latest
		flux.browser.init();
	});
})(window.jQuery || window.Zepto);

(function($){
	/**
	 * Helper function for cross-browser CSS3 support, prepends all possible prefixes to all properties passed in
	 * @param {Object} props Ker/value pairs of CSS3 properties
	 */
	$.fn.css3 = function(props) {
		var css = {};
		var prefixes = ['webkit', 'moz', 'ms', 'o'];

		for(var prop in props)
		{
			// Add the vendor specific versions
			for(var i=0; i<prefixes.length; i++)
				css['-'+prefixes[i]+'-'+prop] = props[prop];
			
			// Add the actual version	
			css[prop] = props[prop];
		}
		
		this.css(css);
		return this;
	};
	
	/**
	 * Helper function to bind to the correct transition end event
	 * @param {function} callback The function to call when the event fires
	 */
	$.fn.transitionEnd = function(callback) {
		var _this = this;
		
		var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd'];
		
		for(var i=0; i < events.length; i++)
		{
			this.bind(events[i], function(event){
				// Automatically stop listening for the event
				for(var j=0; j<events.length;j++)
					$(this).unbind(events[j]);

				// Perform the callback function
				if(callback)
					callback.call(this, event);
			});
		}
		
		return this;
	};

	flux.transition = function(fluxslider, opts) {
		this.options = $.extend({
			requires3d: false,
			after: function() {
				// Default callback for after the transition has completed
			}
		}, opts);

		this.slider = fluxslider;

		// We need to ensure transitions degrade gracefully if the transition is unsupported or not loaded
		if((this.options.requires3d && !flux.browser.supports3d) || !flux.browser.supportsTransitions || this.options.fallback === true)
		{
			var _this = this;
			
			this.options.after = undefined;

			this.options.setup = function() {
				//console.error("Fallback setup()");
				_this.fallbackSetup();
			};
			
			this.options.execute = function() {
				//console.error("Fallback execute()");
				_this.fallbackExecute();
			};
		}
	};

	flux.transition.prototype = {
		constructor: flux.transition,
		hasFinished: false, // This is a lock to ensure that the fluxTransitionEnd event is only fired once per tansition
		run: function() {
			var _this = this;

			// do something
			if(this.options.setup !== undefined)
				this.options.setup.call(this);
			
			// Remove the background image from the top image
			this.slider.image1.css({
				'background-image': 'none'
			});

			this.slider.imageContainer.css('overflow', this.options.requires3d ? 'visible' : 'hidden');

			// For some of the 3D effects using Zepto we need to delay the transitions for some reason
			setTimeout(function(){
				if(_this.options.execute !== undefined)
					_this.options.execute.call(_this);
			}, 5);
		},
		finished: function() {
			if(this.hasFinished)
				return;
				
			this.hasFinished = true;
			
			if(this.options.after)
				this.options.after.call(this);

			this.slider.imageContainer.css('overflow', 'hidden');	

			this.slider.setupImages();

			// Trigger an event to signal the end of a transition
			this.slider.element.trigger('fluxTransitionEnd', {
				currentImage: this.slider.getImage(this.slider.currentImageIndex)
			});
		},
		fallbackSetup: function() {
			
		},
		fallbackExecute: function() {
			this.finished();
		}
	};

	flux.transitions = {};
	
	// Flux grid transition
	
	flux.transition_grid = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			columns: 6,
			rows: 6,
			forceSquare: false,
			setup: function() {
				var imgWidth = this.slider.image1.width(),
					imgHeight = this.slider.image1.height();
					
				var colWidth = Math.floor(imgWidth / this.options.columns),
					rowHeight = Math.floor(imgHeight / this.options.rows);
					
				if(this.options.forceSquare)
				{
					rowHeight = colWidth;
					this.options.rows = Math.floor(imgHeight / rowHeight);
				}

				// Work out how much space remains with the adjusted barWidth
				var colRemainder = imgWidth - (this.options.columns * colWidth),
					colAddPerLoop = Math.ceil(colRemainder / this.options.columns),
					
					rowRemainder = imgHeight - (this.options.rows * rowHeight),
					rowAddPerLoop = Math.ceil(rowRemainder / this.options.rows),
					
					delayBetweenBars = 150,
					height = this.slider.image1.height(),
					totalLeft = 0,
					totalTop = 0,
					fragment = document.createDocumentFragment();
				
				for(var i=0; i<this.options.columns; i++) {
					var thisColWidth = colWidth,
						totalTop = 0;

					if(colRemainder > 0)
					{
						var add = colRemainder >= colAddPerLoop ? colAddPerLoop : colRemainder;
						thisColWidth += add;
						colRemainder -= add;
					}
					
					for(var j=0; j<this.options.rows; j++)
					{
						var thisRowHeight = rowHeight,
							thisRowRemainder = rowRemainder;

						if(thisRowRemainder > 0)
						{
							var add = thisRowRemainder >= rowAddPerLoop ? rowAddPerLoop : thisRowRemainder;
							thisRowHeight += add;
							thisRowRemainder -= add;
						}
						
						var tile = $('<div class="tile tile-'+i+'-'+j+'"></div>').css({
							width: thisColWidth+'px',
							height: thisRowHeight+'px',
							position: 'absolute',
							top: totalTop+'px',
							left: totalLeft+'px'
						});
						
						this.options.renderTile.call(this, tile, i, j, thisColWidth, thisRowHeight, totalLeft, totalTop);
						
						fragment.appendChild(tile.get(0));
						
						totalTop += thisRowHeight;
					}
					
					totalLeft += thisColWidth;
				}

				// Append the fragement to the surface
				this.slider.image1.get(0).appendChild(fragment);
			},
			execute: function() {
				var _this = this,
					height = this.slider.image1.height(),
					bars = this.slider.image1.find('div.barcontainer');

				this.slider.image2.hide();

				// Get notified when the last transition has completed
				bars.last().transitionEnd(function(event){
					_this.slider.image2.show();

					_this.finished();
				});

				bars.css3({
					'transform': flux.browser.rotateX(-90) + ' ' + flux.browser.translate(0, height/2, height/2)
				});
			},
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				
			}
		}, opts));	
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.bars = function(fluxslider, opts) {
		return new flux.transition_grid(fluxslider, $.extend({
			columns: 10,
			rows: 1,
			delayBetweenBars: 40,
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				$(elem).css({
					'background-image': this.slider.image1.css('background-image'),
					'background-position': '-'+leftOffset+'px 0px'
				}).css3({
					'transition-duration': '400ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all',
					'transition-delay': (colIndex*this.options.delayBetweenBars)+'ms'
				});
			},
			execute: function() {
				var _this = this;
	
				var height = this.slider.image1.height();
	
				var bars = this.slider.image1.find('div.tile');
	
				// Get notified when the last transition has completed
				$(bars[bars.length-1]).transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					bars.css({
						'opacity': '0.5'
					}).css3({
						'transform': flux.browser.translate(0, height)
					});
				}, 50);
				
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.bars3d = function(fluxslider, opts) {
		return new flux.transition_grid(fluxslider, $.extend({
			requires3d: true,
			columns: 7,
			rows: 1,
			delayBetweenBars: 150,
			perspective: 1000,
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				var bar = $('<div class="bar-'+colIndex+'"></div>').css({
					width: colWidth+'px',
					height: '100%',
					position: 'absolute',
					top: '0px',
					left: '0px',
					'z-index': 200,

					'background-image': this.slider.image1.css('background-image'),
					'background-position': '-'+leftOffset+'px 0px',
					'background-repeat': 'no-repeat'
				}).css3({
					'backface-visibility': 'hidden'
				}),

				bar2 = $(bar.get(0).cloneNode(false)).css({
					'background-image': this.slider.image2.css('background-image')
				}).css3({
					'transform': flux.browser.rotateX(90) + ' ' + flux.browser.translate(0, -rowHeight/2, rowHeight/2)
				}),

				left = $('<div class="side bar-'+colIndex+'"></div>').css({
					width: rowHeight+'px',
					height: rowHeight+'px',
					position: 'absolute',
					top: '0px',
					left: '0px',
					background: '#222',
					'z-index': 190
				}).css3({
					'transform': flux.browser.rotateY(90) + ' ' + flux.browser.translate(rowHeight/2, 0, -rowHeight/2) + ' ' + flux.browser.rotateY(180),
					'backface-visibility': 'hidden'
				}),

				right = $(left.get(0).cloneNode(false)).css3({
					'transform': flux.browser.rotateY(90) + ' ' + flux.browser.translate(rowHeight/2, 0, colWidth-rowHeight/2)
				});

				$(elem).css({
					width: colWidth+'px',
					height: '100%',
					position: 'absolute',
					top: '0px',
					left: leftOffset+'px',
					'z-index': colIndex > this.options.columns/2 ? 1000-colIndex : 1000 // Fix for Chrome to ensure that the z-index layering is correct!
				}).css3({
					'transition-duration': '800ms',
					'transition-timing-function': 'linear',
					'transition-property': 'all',
					'transition-delay': (colIndex*this.options.delayBetweenBars)+'ms',
					'transform-style': 'preserve-3d'
				}).append(bar).append(bar2).append(left).append(right);
			},
			execute: function() {
				this.slider.image1.css3({
					'perspective': this.options.perspective,
					'perspective-origin': '50% 50%'
				}).css({
					'-moz-transform': 'perspective('+this.options.perspective+'px)',
					'-moz-perspective': 'none',
					'-moz-transform-style': 'preserve-3d'
				});
				
				var _this = this,
					height = this.slider.image1.height(),
					bars = this.slider.image1.find('div.tile');

				this.slider.image2.hide();

				// Get notified when the last transition has completed
				bars.last().transitionEnd(function(event){
					_this.slider.image1.css3({
						'transform-style': 'flat'
					});
					
					_this.slider.image2.show();

					_this.finished();
				});
				
				setTimeout(function(){
					bars.css3({
						'transform': flux.browser.rotateX(-90) + ' ' + flux.browser.translate(0, height/2, height/2)
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {	
	flux.transitions.blinds = function(fluxslider, opts) {
		return new flux.transitions.bars(fluxslider, $.extend({
			execute: function() {
				var _this = this;

				var height = this.slider.image1.height();

				var bars = this.slider.image1.find('div.tile');

				// Get notified when the last transition has completed
				$(bars[bars.length-1]).transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					bars.css({
						'opacity': '0.5'
					}).css3({
						'transform': 'scalex(0.0001)'
					});
				}, 50);
			}
		}, opts));
	}
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.blinds3d = function(fluxslider, opts) {
		return new flux.transitions.tiles3d(fluxslider, $.extend({
			forceSquare: false,
			rows: 1,
			columns: 6
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.zip = function(fluxslider, opts) {
		return new flux.transitions.bars(fluxslider, $.extend({
			execute: function() {
				var _this = this;

				var height = this.slider.image1.height();

				var bars = this.slider.image1.find('div.tile');

				// Get notified when the last transition has completed
				$(bars[bars.length-1]).transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					bars.each(function(index, bar){						
						$(bar).css({
							'opacity': '0.3'
						}).css3({
							'transform': flux.browser.translate(0, (index%2 ? '-'+(2*height) : height))
						});		
					});
				}, 20);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.blocks = function(fluxslider, opts) {
		return new flux.transition_grid(fluxslider, $.extend({
			forceSquare: true,
			delayBetweenBars: 100,
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				var delay = Math.floor(Math.random()*10*this.options.delayBetweenBars);
				
				$(elem).css({
					'background-image': this.slider.image1.css('background-image'),
					'background-position': '-'+leftOffset+'px -'+topOffset+'px'
				}).css3({
					'transition-duration': '350ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all',
					'transition-delay': delay+'ms'
				});
				
				// Keep track of the last elem to fire
				if(this.maxDelay === undefined)
					this.maxDelay = 0;
					
				if(delay > this.maxDelay)
				{
					this.maxDelay = delay;
					this.maxDelayTile = elem;
				}
			},
			execute: function() {
				var _this = this;
	
				var blocks = this.slider.image1.find('div.tile');
	
				// Get notified when the last transition has completed
				this.maxDelayTile.transitionEnd(function(){
					_this.finished();
				});
	
				setTimeout(function(){
					blocks.each(function(index, block){				
						$(block).css({
							'opacity': '0'
						}).css3({
							'transform': 'scale(0.8)'
						});
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.blocks2 = function(fluxslider, opts) {
		return new flux.transition_grid(fluxslider, $.extend({
			cols: 12,
			forceSquare: true,
			delayBetweenDiagnols: 150,
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				var delay = Math.floor(Math.random()*10*this.options.delayBetweenBars);
				
				$(elem).css({
					'background-image': this.slider.image1.css('background-image'),
					'background-position': '-'+leftOffset+'px -'+topOffset+'px'
				}).css3({
					'transition-duration': '350ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all',
					'transition-delay': (colIndex+rowIndex)*this.options.delayBetweenDiagnols+'ms',
					'backface-visibility': 'hidden' // trigger hardware acceleration
				});
			},
			execute: function() {
				var _this = this;
	
				var blocks = this.slider.image1.find('div.tile');
	
				// Get notified when the last transition has completed
				blocks.last().transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					blocks.each(function(index, block){				
						$(block).css({
							'opacity': '0'
						}).css3({
							'transform': 'scale(0.8)'
						});
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.concentric = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			blockSize: 60,
			delay: 150,
			alternate: false,
			setup: function() {
				var w = this.slider.image1.width(),
					h = this.slider.image1.height(),
					largestLength = Math.sqrt(w*w + h*h), // Largest length is the diagonal

					// How many blocks do we need?
					blockCount = Math.ceil(((largestLength-this.options.blockSize)/2) / this.options.blockSize) + 1, // 1 extra to account for the round border
					fragment = document.createDocumentFragment();

				for(var i=0; i<blockCount; i++)
				{
					var thisBlockSize = (2*i*this.options.blockSize)+this.options.blockSize;

					var block = $('<div></div>').attr('class', 'block block-'+i).css({
						width: thisBlockSize+'px',
						height: thisBlockSize+'px',
						position: 'absolute',
						top: ((h-thisBlockSize)/2)+'px',
						left: ((w-thisBlockSize)/2)+'px',

						'z-index': 100+(blockCount-i),

						'background-image': this.slider.image1.css('background-image'),
						'background-position': 'center center'
					}).css3({
						'border-radius': thisBlockSize+'px',
						'transition-duration': '800ms',
						'transition-timing-function': 'linear',
						'transition-property': 'all',
						'transition-delay': ((blockCount-i)*this.options.delay)+'ms'
					});

					fragment.appendChild(block.get(0));
				}

				//this.slider.image1.append($(fragment));
				this.slider.image1.get(0).appendChild(fragment);
			},
			execute: function() {
				var _this = this;

				var blocks = this.slider.image1.find('div.block');

				// Get notified when the last transition has completed
				$(blocks[0]).transitionEnd(function(){
					_this.finished();
				});

				setTimeout(function(){
					blocks.each(function(index, block){
						$(block).css({
							'opacity': '0'
						}).css3({
							'transform': flux.browser.rotateZ((!_this.options.alternate || index%2 ? '' : '-')+'90')
						});
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.warp = function(fluxslider, opts) {
		return new flux.transitions.concentric(fluxslider, $.extend({
			delay: 30,
			alternate: true
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.cube = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			requires3d: true,
			barWidth: 100,
			direction: 'left',
			perspective: 1000,
			setup: function() {
				var width = this.slider.image1.width();
				var height = this.slider.image1.height();

				// Setup the container to allow 3D perspective

				this.slider.image1.css3({
					'perspective': this.options.perspective,
					'perspective-origin': '50% 50%'
				});

				this.cubeContainer = $('<div class="cube"></div>').css({
					width: width+'px',
					height: height+'px',
					position: 'relative'
				}).css3({
					'transition-duration': '800ms',
					'transition-timing-function': 'linear',
					'transition-property': 'all',
					'transform-style': 'preserve-3d'
				});

				var css = {
					height: '100%',
					width: '100%',
					position: 'absolute',
					top: '0px',
					left: '0px'
				};

				var currentFace = $('<div class="face current"></div>').css($.extend(css, {
					background: this.slider.image1.css('background-image')
				})).css3({
					'backface-visibility': 'hidden'
				});

				this.cubeContainer.append(currentFace);

				var nextFace = $('<div class="face next"></div>').css($.extend(css, {
					background: this.slider.image2.css('background-image')
				})).css3({
					'transform' : this.options.transitionStrings.call(this, this.options.direction, 'nextFace'),
					'backface-visibility': 'hidden'
				});

				this.cubeContainer.append(nextFace);

				this.slider.image1.append(this.cubeContainer);
			},
			execute: function() {
				var _this = this;

				var width = this.slider.image1.width();
				var height = this.slider.image1.height();

				this.slider.image2.hide();
				this.cubeContainer.transitionEnd(function(){
					_this.slider.image2.show();

					_this.finished();
				});
				
				setTimeout(function(){
					_this.cubeContainer.css3({
						'transform' : _this.options.transitionStrings.call(_this, _this.options.direction, 'container')
					});
				}, 50);
			},
			transitionStrings: function(direction, elem) {
				var width = this.slider.image1.width();
				var height = this.slider.image1.height();

				// Define the various transforms that are required to perform various cube rotations
				var t = {
					'up' : {
						'nextFace': flux.browser.rotateX(-90) + ' ' + flux.browser.translate(0, height/2, height/2),
						'container': flux.browser.rotateX(90) + ' ' + flux.browser.translate(0, -height/2, height/2)
					},
					'down' : {
						'nextFace': flux.browser.rotateX(90) + ' ' + flux.browser.translate(0, -height/2, height/2),
						'container': flux.browser.rotateX(-90) + ' ' + flux.browser.translate(0, height/2, height/2)
					},
					'left' : {
						'nextFace': flux.browser.rotateY(90) + ' ' + flux.browser.translate(width/2, 0, width/2),
						'container': flux.browser.rotateY(-90) + ' ' + flux.browser.translate(-width/2, 0, width/2)
					},
					'right' : {
						'nextFace': flux.browser.rotateY(-90) + ' ' + flux.browser.translate(-width/2, 0, width/2),
						'container': flux.browser.rotateY(90) + ' ' + flux.browser.translate(width/2, 0, width/2)
					}
				};

				return (t[direction] && t[direction][elem]) ? t[direction][elem] : false;
			}
		}, opts));	
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.tiles3d = function(fluxslider, opts) {
		return new flux.transition_grid(fluxslider, $.extend({
			requires3d: true,
			forceSquare: true,
			columns: 5,
			perspective: 600,
			delayBetweenBarsX: 200,
			delayBetweenBarsY: 150,
			renderTile: function(elem, colIndex, rowIndex, colWidth, rowHeight, leftOffset, topOffset) {
				var tile = $('<div></div>').css({
					width: colWidth+'px',
					height: rowHeight+'px',
					position: 'absolute',
					top: '0px',
					left: '0px',
					//'z-index': 200, // Removed to make compatible with FF10 (Chrome bug seems to have been fixed)

					'background-image': this.slider.image1.css('background-image'),
					'background-position': '-'+leftOffset+'px -'+topOffset+'px',
					'background-repeat': 'no-repeat',
					'-moz-transform': 'translateZ(1px)'
				}).css3({
					'backface-visibility': 'hidden'
				});

				var tile2 = $(tile.get(0).cloneNode(false)).css({
					'background-image': this.slider.image2.css('background-image')
					//'z-index': 190 // Removed to make compatible with FF10 (Chrome bug seems to have been fixed)
				}).css3({
					'transform': flux.browser.rotateY(180),
					'backface-visibility': 'hidden'
				});

				$(elem).css({
					'z-index': (colIndex > this.options.columns/2 ? 500-colIndex : 500) + (rowIndex > this.options.rows/2 ? 500-rowIndex : 500) // Fix for Chrome to ensure that the z-index layering is correct!
				}).css3({
					'transition-duration': '800ms',
					'transition-timing-function': 'ease-out',
					'transition-property': 'all',
					'transition-delay': (colIndex*this.options.delayBetweenBarsX+rowIndex*this.options.delayBetweenBarsY)+'ms',
					'transform-style': 'preserve-3d'
				}).append(tile).append(tile2);
			},
			execute: function() {
				this.slider.image1.css3({
					'perspective': this.options.perspective,
					'perspective-origin': '50% 50%'
				});
				
				var _this = this;

				var tiles = this.slider.image1.find('div.tile');

				this.slider.image2.hide();

				// Get notified when the last transition has completed
				tiles.last().transitionEnd(function(event){
					_this.slider.image2.show();

					_this.finished();
				});
				
				setTimeout(function(){
					tiles.css3({
						'transform': flux.browser.rotateY(180)
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.turn = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			requires3d: true,
			perspective: 1300,
			direction: 'left',
			setup: function() {				
				var tab = $('<div class="tab"></div>').css({
						width: '50%',
						height: '100%',
						position: 'absolute',
						top: '0px',
						left: this.options.direction == 'left' ? '50%' : '0%',
						'z-index':101
					}).css3({
						'transform-style': 'preserve-3d',
						'transition-duration': '1000ms',
						'transition-timing-function': 'ease-out',
						'transition-property': 'all',
						'transform-origin': this.options.direction == 'left' ? 'left center' : 'right center'
					}),

				front = $('<div></div>').appendTo(tab).css({
						'background-image': this.slider.image1.css('background-image'),
						'background-position': (this.options.direction == 'left' ? '-'+(this.slider.image1.width()/2) : 0)+'px 0',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: '0',
						left: '0',
						'-moz-transform': 'translateZ(1px)'
					}).css3({
						'backface-visibility': 'hidden'
					}),

				back = $('<div></div>').appendTo(tab).css({
						'background-image': this.slider.image2.css('background-image'),
						'background-position': (this.options.direction == 'left' ? 0 : '-'+(this.slider.image1.width()/2))+'px 0',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: '0',
						left: '0'
					}).css3({
						transform: flux.browser.rotateY(180),
						'backface-visibility': 'hidden'
					}),

				current = $('<div></div>').css({
					position: 'absolute',
					top: '0',
					left: this.options.direction == 'left' ? '0' : '50%',
					width: '50%',
					height: '100%',
					'background-image': this.slider.image1.css('background-image'),
					'background-position': (this.options.direction == 'left' ? 0 : '-'+(this.slider.image1.width()/2))+'px 0',
					'z-index':100
				}),

				overlay = $('<div class="overlay"></div>').css({
					position: 'absolute',
					top: '0',
					left: this.options.direction == 'left' ? '50%' : '0',
					width: '50%',
					height: '100%',
					background: '#000',
					opacity: 1
				}).css3({
					'transition-duration': '800ms',
					'transition-timing-function': 'linear',
					'transition-property': 'opacity'
				}),

				container = $('<div></div>').css3({
					width: '100%',
					height: '100%'
				}).css3({
					'perspective': this.options.perspective,
					'perspective-origin': '50% 50%'
				}).append(tab).append(current).append(overlay);

				this.slider.image1.append(container);
			},
			execute: function() {
				var _this = this;

				this.slider.image1.find('div.tab').first().transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					_this.slider.image1.find('div.tab').css3({
						// 179 not 180 so that the tab rotates the correct way in Firefox
						transform: flux.browser.rotateY(_this.options.direction == 'left' ? -179 : 179)
					});
					_this.slider.image1.find('div.overlay').css({
						opacity: 0
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.slide = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			direction: 'left',
			setup: function() {
				var width = this.slider.image1.width(),
					height = this.slider.image1.height(),

				currentImage = $('<div class="current"></div>').css({
					height: height+'px',
					width: width+'px',
					position: 'absolute',
					top: '0px',
					left: '0px',
					background: this.slider[this.options.direction == 'left' ? 'image1' : 'image2'].css('background-image')	
				}).css3({
					'backface-visibility': 'hidden'
				}),

				nextImage = $('<div class="next"></div>').css({
					height: height+'px',
					width: width+'px',
					position: 'absolute',
					top: '0px',
					left: width+'px',
					background: this.slider[this.options.direction == 'left' ? 'image2' : 'image1'].css('background-image')
				}).css3({
					'backface-visibility': 'hidden'
				});

				this.slideContainer = $('<div class="slide"></div>').css({
					width: (2*width)+'px',
					height: height+'px',
					position: 'relative',
					left: this.options.direction == 'left' ? '0px' : -width+'px',
					'z-index': 101
				}).css3({
					'transition-duration': '600ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all'
				});

				this.slideContainer.append(currentImage).append(nextImage);

				this.slider.image1.append(this.slideContainer);
			},
			execute: function() {
				var _this = this,
					delta = this.slider.image1.width();

				if(this.options.direction == 'left')
					delta = -delta;

				this.slideContainer.transitionEnd(function(){
					_this.finished();
				});
				
				setTimeout(function(){
					_this.slideContainer.css3({
						'transform' : flux.browser.translate(delta)
					});
				}, 50);
			}
		}, opts));	
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.swipe = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			setup: function() {
				var img = $('<div></div>').css({
					width: '100%',
					height: '100%',
					'background-image': this.slider.image1.css('background-image')
				}).css3({
					'transition-duration': '1600ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'all',
					'mask-image': '-webkit-linear-gradient(left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 48%, rgba(0,0,0,1) 52%, rgba(0,0,0,1) 100%)',
					'mask-position': '70%',
					'mask-size': '400%'
				});
				
				this.slider.image1.append(img);
			},
			execute: function() {
				//return;
				var _this = this,
					img = this.slider.image1.find('div');

				// Get notified when the last transition has completed
				$(img).transitionEnd(function(){
					_this.finished();
				});

				setTimeout(function(){
					$(img).css3({
						'mask-position': '30%'
					});
				}, 50);
			},
			compatibilityCheck: function() {
				return flux.browser.supportsCSSProperty('MaskImage');
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

(function($) {
	flux.transitions.dissolve = function(fluxslider, opts) {
		return new flux.transition(fluxslider, $.extend({
			setup: function() {
				var img = $('<div class="image"></div>').css({
					width: '100%',
					height: '100%',
					'background-image': this.slider.image1.css('background-image')	
				}).css3({
					'transition-duration': '600ms',
					'transition-timing-function': 'ease-in',
					'transition-property': 'opacity'
				});
				
				this.slider.image1.append(img);
			},
			execute: function() {
				var _this = this,
					img = this.slider.image1.find('div.image');

				// Get notified when the last transition has completed
				$(img).transitionEnd(function(){
					_this.finished();
				});

				setTimeout(function(){
					$(img).css({
						'opacity': '0.0'
					});
				}, 50);
			}
		}, opts));
	};
})(window.jQuery || window.Zepto);

/*!
 * jQuery MotionCAPTCHA v0.2
 * 
 * Proof of concept only for now, check the roadmap to see when it will be ready for wider use!
 * 
 * http://josscrowcroft.com/projects/motioncaptcha-jquery-plugin/
 * 
 * DEMO: http://josscrowcroft.com/demos/motioncaptcha/
 * CODE: https://github.com/josscrowcroft/MotionCAPTCHA
 * 
 * Copyright (c) 2011 Joss Crowcroft - joss[at]josscrowcroftcom | http://www.josscrowcroft.com
 * 
 * Incoporates other open source projects, attributed below.
 */
jQuery.fn.motionCaptcha || (function($) {
	
	/**
	 * Main plugin function definition
	 */
	$.fn.motionCaptcha = function(options) {
		
		/**
		 * Act on matched form element:
		 * This could be set up to iterate over multiple elements, but tbh would it ever be useful?
		 */
		return this.each(function() {
				
			// Build main options before element iteration:
			var opts = $.extend({}, $.fn.motionCaptcha.defaults, options);
			
			// Ensure option ID params are valid #selectors:
			opts.actionId = '#' + opts.actionId.replace(/\#/g, '');
			opts.canvasId = '#' + opts.canvasId.replace(/\#/g, '');
			opts.divId = '#' + opts.divId.replace(/\#/g, '');
			opts.submitId = ( opts.submitId ) ? '#' + opts.submitId.replace(/\#/g, '') : false;

			// Plugin setup:

			// Set up Harmony vars:
			var brush,
				locked = false;
				
			// Set up MotionCAPTCHA form and jQuery elements:
			var $body = $('body'),
				$form = $(this),
				$container = $(opts.divId),
				$canvas = $(opts.canvasId);
			
			// Set up MotionCAPTCHA canvas vars:
			var canvasWidth = $canvas.width(),
				canvasHeight = $canvas.height(),
				borderLeftWidth = 1 * $canvas.css('borderLeftWidth').replace('px', ''),
				borderTopWidth = 1 * $canvas.css('borderTopWidth').replace('px', '');			

			// Canvas setup:
			
			// Set the canvas DOM element's dimensions to match the display width/height (pretty important):
			$canvas[0].width = canvasWidth;
			$canvas[0].height = canvasHeight;
			
			// Get DOM reference to canvas context:
			var ctx = $canvas[0].getContext("2d");
			
			// Add canvasWidth and canvasHeight values to context, for Ribbon brush:
			ctx.canvasWidth = canvasWidth;
			ctx.canvasHeight = canvasHeight;
			
			// Set canvas context font and fillStyle:
			ctx.font = opts.canvasFont;
			ctx.fillStyle = opts.canvasTextColor;
			
			// Set random shape
			$canvas.addClass( opts.shapes[Math.floor(Math.random() * (opts.shapes.length) )] );
			
			// Set up Dollar Recognizer and drawing vars:
			var _isDown = false,
				_holdStill = false,
				_points = [], 
				_r = new DollarRecognizer();

			// Create the Harmony Ribbon brush:
			brush = new Ribbon(ctx);
			



			// Mousedown event
			// Start Harmony brushstroke and begin recording DR points:
			var touchStartEvent = function(event) {
				if ( locked )
					return false;
				
				// Prevent default action:
				event.preventDefault();
				
				// Get mouse position inside the canvas:
				var pos = getPos(event),
					x = pos[0],
					y = pos[1];
				
				// Internal drawing var	
				_isDown = true;
				
				// Prevent jumpy-touch bug on android, no effect on other platforms:
				_holdStill = true;
				
				// Disable text selection:
				$('body').addClass('mc-noselect');
				
				// Clear canvas:
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				
				// Start brushstroke:
				brush.strokeStart(x, y);

				// Remove 'mc-invalid' and 'mc-valid' classes from canvas:
				$canvas.removeClass('mc-invalid mc-valid');
				
				// Add the first point to the points array:
				_points = [NewPoint(x, y)];

				return false;
			}; // mousedown/touchstart event

			// Mousemove event:
			var touchMoveEvent = function(event) {
				if ( _holdStill ) {
					return _holdStill = 0;
				}
				// If mouse is down and canvas not locked:
				if ( !locked && _isDown ) {
									
					// Prevent default action:
					event.preventDefault();

					// Get mouse position inside the canvas:
					var pos = getPos(event),
						x = pos[0],
						y = pos[1];
					
					// Append point to points array:
					_points[_points.length] = NewPoint(x, y);
					
					// Do brushstroke:
					brush.stroke(x, y);
				}
				return false;
			}; // mousemove/touchmove event
			
			
			// Mouseup event:
			var touchEndEvent = function(event) {
				// If mouse is down and canvas not locked:
				if ( !locked && _isDown ) {
					_isDown = false;
					
					// Allow text-selection again:
					$('body').removeClass('mc-noselect');
					
					// Dollar Recognizer result:
					if (_points.length >= 10) {
						var result = _r.Recognize(_points);
						// Check result:
						if ( $canvas.attr('class').match(result.Name) && result.Score > 0.7 ) {
							
							// Lock the canvas:
							locked = 1;
							
							// Destroy the Harmony brush (give it time to finish drawing)
							setTimeout( brush.destroy, 500 );
							
							// Add 'mc-valid' class to canvas:
							$canvas.addClass('mc-valid');
							
							// Write success message into canvas:
							ctx.fillText(opts.successMsg, 10, 24);
							
							// Call the onSuccess function to handle the rest of the business:
							// Pass in the form, the canvas, the canvas context:
							opts.onSuccess($form, $canvas, ctx);
							
						} else {
							
							// Add 'mc-invalid' class to canvas:
							$canvas.addClass('mc-invalid');
							
							// Write error message into canvas:
							ctx.fillText(opts.errorMsg, 10, 24);
							
							// Pass off to the error callback to finish up:
							opts.onError($form, $canvas, ctx);
						}
						
					} else { // fewer than 10 points were recorded:
						
						// Add 'mc-invalid' class to canvas:
						$canvas.addClass('mc-invalid');
						
						// Write error message into canvas:
						ctx.fillText(opts.errorMsg, 10, 24);

						// Pass off to the error callback to finish up:
						opts.onError($form, $canvas, ctx);
					}
				}
				return false;
			}; // mouseup/touchend event

			// Bind events to canvas:
			$canvas.bind({
				mousedown:  touchStartEvent,
				mousemove: touchMoveEvent,
				mouseup:  touchEndEvent
			});

			// Mobile touch events:
			$canvas[0].addEventListener('touchstart', touchStartEvent, false);
			$canvas[0].addEventListener('touchmove', touchMoveEvent, false);
			$canvas[0].addEventListener('touchend', touchEndEvent, false);

			// Add active CSS class to form:
			$form.addClass(opts.cssClass.replace(/\./, ''))

		
			/**
			 * Get X/Y mouse position, relative to (/inside) the canvas
			 * 
			 * Handles cross-browser quirks rather nicely, I feel.
			 * 
			 * @todo For 1.0, if no way to obtain coordinates, don't activate MotionCAPTCHA.
			 */
			function getPos(event) {
				var x, y;
				
				// Check for mobile first to avoid android jumpy-touch bug (iOS / Android):
				if ( event.touches && event.touches.length > 0 ) {
					// iOS/android uses event.touches, relative to entire page:
					x = event.touches[0].pageX - $canvas.offset().left + borderLeftWidth;
					y = event.touches[0].pageY - $canvas.offset().top + borderTopWidth;
				} else if ( event.offsetX ) {
					// Chrome/Safari give the event offset relative to the target event:
					x = event.offsetX - borderLeftWidth;
					y = event.offsetY - borderTopWidth;
				} else {
					// Otherwise, subtract page click from canvas offset (Firefox uses this):
					x = event.pageX - $canvas.offset().left - borderLeftWidth;
					y = event.pageY - $canvas.offset().top - borderTopWidth;
				}
				return [x,y];
			}

		}); // this.each

	} // end main plugin function
	
	
	/**
	 * Exposed default plugin settings, which can be overridden in plugin call.
	 */
	$.fn.motionCaptcha.defaults = {
		actionId: '#mc-action',     // The ID of the input containing the form action
		divId: '#mc',               // If you use an ID other than '#mc' for the placeholder, pass it in here
		canvasId: '#mc-canvas',     // The ID of the MotionCAPTCHA canvas element
		submitId: false,            // If your form has multiple submit buttons, give the ID of the main one here
		cssClass: '.mc-active',     // This CSS class is applied to the form, when the plugin is active
	
		// An array of shape names that you want MotionCAPTCHA to use:
		shapes: ['triangle', 'x', 'rectangle', 'circle', 'check', 'caret', 'zigzag', 'arrow', 'leftbracket', 'rightbracket', 'v', 'delete', 'star', 'pigtail'],
		
		// Canvas vars:
		canvasFont: '15px "Lucida Grande"',
		canvasTextColor: '#111',
		
		// These messages are displayed inside the canvas after a user finishes drawing:
		errorMsg: 'Please try again.',
		successMsg: 'Captcha passed!',
		
		// This message is displayed if the user's browser doesn't support canvas:
		noCanvasMsg: "Your browser doesn't support <canvas> - try Chrome, FF4, Safari or IE9.",
		
		// This could be any HTML string (eg. '<label>Draw this shit yo:</label>'):
		label: '<p>Please draw the shape in the box to submit the form:</p>',
		
		// Callback function to execute when a user successfully draws the shape
		// Passed in the form, the canvas and the canvas context
		// Scope (this) is active plugin options object (opts)
		// NB: The default onSuccess callback function enables the submit button, and adds the form action attribute:
		onSuccess: function($form, $canvas, ctx) {
			var opts = this,
				$submit = opts.submitId ? $form.find(opts.submitId) : $form.find('input[type=submit]:disabled');
						
			// Set the form action:
			$form.attr( 'action', $(opts.actionId).val() );
			
			// Enable the submit button:
			$submit.prop('disabled', false);
			
			return;
		},
		
		// Callback function to execute when a user successfully draws the shape
		// Passed in the form, the canvas and the canvas context
		// Scope (this) is active plugin options object (opts)
		onError: function($form, $canvas, ctx) {
			var opts = this;
			return;
		}
	};
	




	/*!
	 * Harmony | mrdoob | Ribbon Brush class
	 * http://mrdoob.com/projects/harmony/
	 */
	
	function Ribbon( ctx ) {
		this.init( ctx );
	}
	
	Ribbon.prototype = {
		ctx: null,
		X: null, 
		Y: null,
		painters: null,
		interval: null,
		init: function( ctx ) {
			var scope = this,
				userAgent = navigator.userAgent.toLowerCase(),
				brushSize = ( userAgent.search("android") > -1 || userAgent.search("iphone") > -1 ) ? 2 : 1,
				strokeColor = [0, 0, 0];
			
			this.ctx = ctx;
			this.ctx.globalCompositeOperation = 'source-over';
			
			this.X = this.ctx.canvasWidth / 2;
			this.Y = this.ctx.canvasHeight / 2;
	
			this.painters = [];
			
			// Draw each of the lines:
			for ( var i = 0; i < 38; i++ ) {
				this.painters.push({
					dx: this.ctx.canvasWidth / 2, 
					dy: this.ctx.canvasHeight / 2, 
					ax: 0, 
					ay: 0, 
					div: 0.1, 
					ease: Math.random() * 0.18 + 0.60
				});
			}
			
			// Set the ticker:
			this.interval = setInterval( update, 1000/60 );
			
			function update() {
				var i;
				
				scope.ctx.lineWidth = brushSize;			
				scope.ctx.strokeStyle = "rgba(" + strokeColor[0] + ", " + strokeColor[1] + ", " + strokeColor[2] + ", " + 0.06 + ")";
				
				for ( i = 0; i < scope.painters.length; i++ ) {
					scope.ctx.beginPath();
					scope.ctx.moveTo(scope.painters[i].dx, scope.painters[i].dy);
					
					scope.painters[i].dx -= scope.painters[i].ax = (scope.painters[i].ax + (scope.painters[i].dx - scope.X) * scope.painters[i].div) * scope.painters[i].ease;
					scope.painters[i].dy -= scope.painters[i].ay = (scope.painters[i].ay + (scope.painters[i].dy - scope.Y) * scope.painters[i].div) * scope.painters[i].ease;
					scope.ctx.lineTo(scope.painters[i].dx, scope.painters[i].dy);
					scope.ctx.stroke();
				}
			}
		},
		destroy: function() {
			clearInterval(this.interval);
		},
		strokeStart: function( X, Y ) {
			this.X = X;
			this.Y = Y
	
			for (var i = 0; i < this.painters.length; i++) {
				this.painters[i].dx = X;
				this.painters[i].dy = Y;
			}
	
			this.shouldDraw = true;
		},
		stroke: function( X, Y ) {
			this.X = X;
			this.Y = Y;
		}
	};

	
	
	/*!
	 * The $1 Unistroke Recognizer
	 * http://depts.washington.edu/aimgroup/proj/dollar/
	 * 
	 * Jacob O. Wobbrock, Ph.D. | wobbrock@u.washington.edu
	 * Andrew D. Wilson, Ph.D. | awilson@microsoft.com
	 * Yang Li, Ph.D. | yangli@cs.washington.edu
	 * 
	 * Modified to include the Protractor gesture recognizing algorithm
	 * http://www.yangl.org/pdf/protractor-chi2010.pdf
	 * 
	 * Adapted and modified for purpose by Joss Crowcroft
	 * http://www.josscrowcroft.com
	 * 
	 * The original software is distributed under the "New BSD License" agreement
	 * 
	 * Copyright (c) 2007-2011, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li. All rights reserved.
	**/
	
	// Point class
	function Point(x, y) {
		this.X = x;
		this.Y = y;
	}
	
	// Wrapper for Point class (saves mega kb when compressing the template definitions):
	function NewPoint(x, y) {
		return new Point(x, y)
	}
	
	// Rectangle class
	function Rectangle(x, y, width, height) {
		this.X = x;
		this.Y = y;
		this.Width = width;
		this.Height = height;
	}
	
	// Template class: a unistroke template
	function Template(name, points) {
		this.Name = name;
		this.Points = Resample(points, NumPoints);
		var radians = IndicativeAngle(this.Points);
		this.Points = RotateBy(this.Points, -radians);
		this.Points = ScaleTo(this.Points, SquareSize);
		this.Points = TranslateTo(this.Points, Origin);
		this.Vector = Vectorize(this.Points); // for Protractor
	}
	
	// Result class
	function Result(name, score) {
		this.Name = name;
		this.Score = score;
	}
	
	// DollarRecognizer class constants
	var NumTemplates = 16,
		NumPoints = 64,
		SquareSize = 250.0,
		Origin = NewPoint(0,0);
	
	// DollarRecognizer class
	function DollarRecognizer() {
	
		// Predefined templates for each gesture type:
		this.Templates = [];
		
		this.Templates.push( new Template("triangle", [NewPoint(137,139),NewPoint(135,141),NewPoint(133,144),NewPoint(132,146),NewPoint(130,149),NewPoint(128,151),NewPoint(126,155),NewPoint(123,160),NewPoint(120,166),NewPoint(116,171),NewPoint(112,177),NewPoint(107,183),NewPoint(102,188),NewPoint(100,191),NewPoint(95,195),NewPoint(90,199),NewPoint(86,203),NewPoint(82,206),NewPoint(80,209),NewPoint(75,213),NewPoint(73,213),NewPoint(70,216),NewPoint(67,219),NewPoint(64,221),NewPoint(61,223),NewPoint(60,225),NewPoint(62,226),NewPoint(65,225),NewPoint(67,226),NewPoint(74,226),NewPoint(77,227),NewPoint(85,229),NewPoint(91,230),NewPoint(99,231),NewPoint(108,232),NewPoint(116,233),NewPoint(125,233),NewPoint(134,234),NewPoint(145,233),NewPoint(153,232),NewPoint(160,233),NewPoint(170,234),NewPoint(177,235),NewPoint(179,236),NewPoint(186,237),NewPoint(193,238),NewPoint(198,239),NewPoint(200,237),NewPoint(202,239),NewPoint(204,238),NewPoint(206,234),NewPoint(205,230),NewPoint(202,222),NewPoint(197,216),NewPoint(192,207),NewPoint(186,198),NewPoint(179,189),NewPoint(174,183),NewPoint(170,178),NewPoint(164,171),NewPoint(161,168),NewPoint(154,160),NewPoint(148,155),NewPoint(143,150),NewPoint(138,148),NewPoint(136,148)]) );
		
		this.Templates.push( new Template("x", [NewPoint(87,142),NewPoint(89,145),NewPoint(91,148),NewPoint(93,151),NewPoint(96,155),NewPoint(98,157),NewPoint(100,160),NewPoint(102,162),NewPoint(106,167),NewPoint(108,169),NewPoint(110,171),NewPoint(115,177),NewPoint(119,183),NewPoint(123,189),NewPoint(127,193),NewPoint(129,196),NewPoint(133,200),NewPoint(137,206),NewPoint(140,209),NewPoint(143,212),NewPoint(146,215),NewPoint(151,220),NewPoint(153,222),NewPoint(155,223),NewPoint(157,225),NewPoint(158,223),NewPoint(157,218),NewPoint(155,211),NewPoint(154,208),NewPoint(152,200),NewPoint(150,189),NewPoint(148,179),NewPoint(147,170),NewPoint(147,158),NewPoint(147,148),NewPoint(147,141),NewPoint(147,136),NewPoint(144,135),NewPoint(142,137),NewPoint(140,139),NewPoint(135,145),NewPoint(131,152),NewPoint(124,163),NewPoint(116,177),NewPoint(108,191),NewPoint(100,206),NewPoint(94,217),NewPoint(91,222),NewPoint(89,225),NewPoint(87,226),NewPoint(87,224)]) );
		
		this.Templates.push( new Template("rectangle", [NewPoint(78,149),NewPoint(78,153),NewPoint(78,157),NewPoint(78,160),NewPoint(79,162),NewPoint(79,164),NewPoint(79,167),NewPoint(79,169),NewPoint(79,173),NewPoint(79,178),NewPoint(79,183),NewPoint(80,189),NewPoint(80,193),NewPoint(80,198),NewPoint(80,202),NewPoint(81,208),NewPoint(81,210),NewPoint(81,216),NewPoint(82,222),NewPoint(82,224),NewPoint(82,227),NewPoint(83,229),NewPoint(83,231),NewPoint(85,230),NewPoint(88,232),NewPoint(90,233),NewPoint(92,232),NewPoint(94,233),NewPoint(99,232),NewPoint(102,233),NewPoint(106,233),NewPoint(109,234),NewPoint(117,235),NewPoint(123,236),NewPoint(126,236),NewPoint(135,237),NewPoint(142,238),NewPoint(145,238),NewPoint(152,238),NewPoint(154,239),NewPoint(165,238),NewPoint(174,237),NewPoint(179,236),NewPoint(186,235),NewPoint(191,235),NewPoint(195,233),NewPoint(197,233),NewPoint(200,233),NewPoint(201,235),NewPoint(201,233),NewPoint(199,231),NewPoint(198,226),NewPoint(198,220),NewPoint(196,207),NewPoint(195,195),NewPoint(195,181),NewPoint(195,173),NewPoint(195,163),NewPoint(194,155),NewPoint(192,145),NewPoint(192,143),NewPoint(192,138),NewPoint(191,135),NewPoint(191,133),NewPoint(191,130),NewPoint(190,128),NewPoint(188,129),NewPoint(186,129),NewPoint(181,132),NewPoint(173,131),NewPoint(162,131),NewPoint(151,132),NewPoint(149,132),NewPoint(138,132),NewPoint(136,132),NewPoint(122,131),NewPoint(120,131),NewPoint(109,130),NewPoint(107,130),NewPoint(90,132),NewPoint(81,133),NewPoint(76,133)]) );
		
		this.Templates.push( new Template("circle", [NewPoint(127,141),NewPoint(124,140),NewPoint(120,139),NewPoint(118,139),NewPoint(116,139),NewPoint(111,140),NewPoint(109,141),NewPoint(104,144),NewPoint(100,147),NewPoint(96,152),NewPoint(93,157),NewPoint(90,163),NewPoint(87,169),NewPoint(85,175),NewPoint(83,181),NewPoint(82,190),NewPoint(82,195),NewPoint(83,200),NewPoint(84,205),NewPoint(88,213),NewPoint(91,216),NewPoint(96,219),NewPoint(103,222),NewPoint(108,224),NewPoint(111,224),NewPoint(120,224),NewPoint(133,223),NewPoint(142,222),NewPoint(152,218),NewPoint(160,214),NewPoint(167,210),NewPoint(173,204),NewPoint(178,198),NewPoint(179,196),NewPoint(182,188),NewPoint(182,177),NewPoint(178,167),NewPoint(170,150),NewPoint(163,138),NewPoint(152,130),NewPoint(143,129),NewPoint(140,131),NewPoint(129,136),NewPoint(126,139)]) );
		
		this.Templates.push( new Template("check", [NewPoint(91,185),NewPoint(93,185),NewPoint(95,185),NewPoint(97,185),NewPoint(100,188),NewPoint(102,189),NewPoint(104,190),NewPoint(106,193),NewPoint(108,195),NewPoint(110,198),NewPoint(112,201),NewPoint(114,204),NewPoint(115,207),NewPoint(117,210),NewPoint(118,212),NewPoint(120,214),NewPoint(121,217),NewPoint(122,219),NewPoint(123,222),NewPoint(124,224),NewPoint(126,226),NewPoint(127,229),NewPoint(129,231),NewPoint(130,233),NewPoint(129,231),NewPoint(129,228),NewPoint(129,226),NewPoint(129,224),NewPoint(129,221),NewPoint(129,218),NewPoint(129,212),NewPoint(129,208),NewPoint(130,198),NewPoint(132,189),NewPoint(134,182),NewPoint(137,173),NewPoint(143,164),NewPoint(147,157),NewPoint(151,151),NewPoint(155,144),NewPoint(161,137),NewPoint(165,131),NewPoint(171,122),NewPoint(174,118),NewPoint(176,114),NewPoint(177,112),NewPoint(177,114),NewPoint(175,116),NewPoint(173,118)]) );
		
		this.Templates.push( new Template("caret", [NewPoint(79,245),NewPoint(79,242),NewPoint(79,239),NewPoint(80,237),NewPoint(80,234),NewPoint(81,232),NewPoint(82,230),NewPoint(84,224),NewPoint(86,220),NewPoint(86,218),NewPoint(87,216),NewPoint(88,213),NewPoint(90,207),NewPoint(91,202),NewPoint(92,200),NewPoint(93,194),NewPoint(94,192),NewPoint(96,189),NewPoint(97,186),NewPoint(100,179),NewPoint(102,173),NewPoint(105,165),NewPoint(107,160),NewPoint(109,158),NewPoint(112,151),NewPoint(115,144),NewPoint(117,139),NewPoint(119,136),NewPoint(119,134),NewPoint(120,132),NewPoint(121,129),NewPoint(122,127),NewPoint(124,125),NewPoint(126,124),NewPoint(129,125),NewPoint(131,127),NewPoint(132,130),NewPoint(136,139),NewPoint(141,154),NewPoint(145,166),NewPoint(151,182),NewPoint(156,193),NewPoint(157,196),NewPoint(161,209),NewPoint(162,211),NewPoint(167,223),NewPoint(169,229),NewPoint(170,231),NewPoint(173,237),NewPoint(176,242),NewPoint(177,244),NewPoint(179,250),NewPoint(181,255),NewPoint(182,257)]) );
		
		this.Templates.push( new Template("zigzag", [NewPoint(307,216),NewPoint(333,186),NewPoint(356,215),NewPoint(375,186),NewPoint(399,216),NewPoint(418,186)]) );
		
		this.Templates.push( new Template("arrow", [NewPoint(68,222),NewPoint(70,220),NewPoint(73,218),NewPoint(75,217),NewPoint(77,215),NewPoint(80,213),NewPoint(82,212),NewPoint(84,210),NewPoint(87,209),NewPoint(89,208),NewPoint(92,206),NewPoint(95,204),NewPoint(101,201),NewPoint(106,198),NewPoint(112,194),NewPoint(118,191),NewPoint(124,187),NewPoint(127,186),NewPoint(132,183),NewPoint(138,181),NewPoint(141,180),NewPoint(146,178),NewPoint(154,173),NewPoint(159,171),NewPoint(161,170),NewPoint(166,167),NewPoint(168,167),NewPoint(171,166),NewPoint(174,164),NewPoint(177,162),NewPoint(180,160),NewPoint(182,158),NewPoint(183,156),NewPoint(181,154),NewPoint(178,153),NewPoint(171,153),NewPoint(164,153),NewPoint(160,153),NewPoint(150,154),NewPoint(147,155),NewPoint(141,157),NewPoint(137,158),NewPoint(135,158),NewPoint(137,158),NewPoint(140,157),NewPoint(143,156),NewPoint(151,154),NewPoint(160,152),NewPoint(170,149),NewPoint(179,147),NewPoint(185,145),NewPoint(192,144),NewPoint(196,144),NewPoint(198,144),NewPoint(200,144),NewPoint(201,147),NewPoint(199,149),NewPoint(194,157),NewPoint(191,160),NewPoint(186,167),NewPoint(180,176),NewPoint(177,179),NewPoint(171,187),NewPoint(169,189),NewPoint(165,194),NewPoint(164,196)]) );
		
		this.Templates.push( new Template("leftbracket", [NewPoint(140,124),NewPoint(138,123),NewPoint(135,122),NewPoint(133,123),NewPoint(130,123),NewPoint(128,124),NewPoint(125,125),NewPoint(122,124),NewPoint(120,124),NewPoint(118,124),NewPoint(116,125),NewPoint(113,125),NewPoint(111,125),NewPoint(108,124),NewPoint(106,125),NewPoint(104,125),NewPoint(102,124),NewPoint(100,123),NewPoint(98,123),NewPoint(95,124),NewPoint(93,123),NewPoint(90,124),NewPoint(88,124),NewPoint(85,125),NewPoint(83,126),NewPoint(81,127),NewPoint(81,129),NewPoint(82,131),NewPoint(82,134),NewPoint(83,138),NewPoint(84,141),NewPoint(84,144),NewPoint(85,148),NewPoint(85,151),NewPoint(86,156),NewPoint(86,160),NewPoint(86,164),NewPoint(86,168),NewPoint(87,171),NewPoint(87,175),NewPoint(87,179),NewPoint(87,182),NewPoint(87,186),NewPoint(88,188),NewPoint(88,195),NewPoint(88,198),NewPoint(88,201),NewPoint(88,207),NewPoint(89,211),NewPoint(89,213),NewPoint(89,217),NewPoint(89,222),NewPoint(88,225),NewPoint(88,229),NewPoint(88,231),NewPoint(88,233),NewPoint(88,235),NewPoint(89,237),NewPoint(89,240),NewPoint(89,242),NewPoint(91,241),NewPoint(94,241),NewPoint(96,240),NewPoint(98,239),NewPoint(105,240),NewPoint(109,240),NewPoint(113,239),NewPoint(116,240),NewPoint(121,239),NewPoint(130,240),NewPoint(136,237),NewPoint(139,237),NewPoint(144,238),NewPoint(151,237),NewPoint(157,236),NewPoint(159,237)]) );
		
		this.Templates.push( new Template("rightbracket", [NewPoint(112,138),NewPoint(112,136),NewPoint(115,136),NewPoint(118,137),NewPoint(120,136),NewPoint(123,136),NewPoint(125,136),NewPoint(128,136),NewPoint(131,136),NewPoint(134,135),NewPoint(137,135),NewPoint(140,134),NewPoint(143,133),NewPoint(145,132),NewPoint(147,132),NewPoint(149,132),NewPoint(152,132),NewPoint(153,134),NewPoint(154,137),NewPoint(155,141),NewPoint(156,144),NewPoint(157,152),NewPoint(158,161),NewPoint(160,170),NewPoint(162,182),NewPoint(164,192),NewPoint(166,200),NewPoint(167,209),NewPoint(168,214),NewPoint(168,216),NewPoint(169,221),NewPoint(169,223),NewPoint(169,228),NewPoint(169,231),NewPoint(166,233),NewPoint(164,234),NewPoint(161,235),NewPoint(155,236),NewPoint(147,235),NewPoint(140,233),NewPoint(131,233),NewPoint(124,233),NewPoint(117,235),NewPoint(114,238),NewPoint(112,238)]) );
		
		this.Templates.push( new Template("v", [NewPoint(89,164),NewPoint(90,162),NewPoint(92,162),NewPoint(94,164),NewPoint(95,166),NewPoint(96,169),NewPoint(97,171),NewPoint(99,175),NewPoint(101,178),NewPoint(103,182),NewPoint(106,189),NewPoint(108,194),NewPoint(111,199),NewPoint(114,204),NewPoint(117,209),NewPoint(119,214),NewPoint(122,218),NewPoint(124,222),NewPoint(126,225),NewPoint(128,228),NewPoint(130,229),NewPoint(133,233),NewPoint(134,236),NewPoint(136,239),NewPoint(138,240),NewPoint(139,242),NewPoint(140,244),NewPoint(142,242),NewPoint(142,240),NewPoint(142,237),NewPoint(143,235),NewPoint(143,233),NewPoint(145,229),NewPoint(146,226),NewPoint(148,217),NewPoint(149,208),NewPoint(149,205),NewPoint(151,196),NewPoint(151,193),NewPoint(153,182),NewPoint(155,172),NewPoint(157,165),NewPoint(159,160),NewPoint(162,155),NewPoint(164,150),NewPoint(165,148),NewPoint(166,146)]) );
		
		this.Templates.push( new Template("delete", [NewPoint(123,129),NewPoint(123,131),NewPoint(124,133),NewPoint(125,136),NewPoint(127,140),NewPoint(129,142),NewPoint(133,148),NewPoint(137,154),NewPoint(143,158),NewPoint(145,161),NewPoint(148,164),NewPoint(153,170),NewPoint(158,176),NewPoint(160,178),NewPoint(164,183),NewPoint(168,188),NewPoint(171,191),NewPoint(175,196),NewPoint(178,200),NewPoint(180,202),NewPoint(181,205),NewPoint(184,208),NewPoint(186,210),NewPoint(187,213),NewPoint(188,215),NewPoint(186,212),NewPoint(183,211),NewPoint(177,208),NewPoint(169,206),NewPoint(162,205),NewPoint(154,207),NewPoint(145,209),NewPoint(137,210),NewPoint(129,214),NewPoint(122,217),NewPoint(118,218),NewPoint(111,221),NewPoint(109,222),NewPoint(110,219),NewPoint(112,217),NewPoint(118,209),NewPoint(120,207),NewPoint(128,196),NewPoint(135,187),NewPoint(138,183),NewPoint(148,167),NewPoint(157,153),NewPoint(163,145),NewPoint(165,142),NewPoint(172,133),NewPoint(177,127),NewPoint(179,127),NewPoint(180,125)]) );
		
		this.Templates.push( new Template("star", [NewPoint(75,250),NewPoint(75,247),NewPoint(77,244),NewPoint(78,242),NewPoint(79,239),NewPoint(80,237),NewPoint(82,234),NewPoint(82,232),NewPoint(84,229),NewPoint(85,225),NewPoint(87,222),NewPoint(88,219),NewPoint(89,216),NewPoint(91,212),NewPoint(92,208),NewPoint(94,204),NewPoint(95,201),NewPoint(96,196),NewPoint(97,194),NewPoint(98,191),NewPoint(100,185),NewPoint(102,178),NewPoint(104,173),NewPoint(104,171),NewPoint(105,164),NewPoint(106,158),NewPoint(107,156),NewPoint(107,152),NewPoint(108,145),NewPoint(109,141),NewPoint(110,139),NewPoint(112,133),NewPoint(113,131),NewPoint(116,127),NewPoint(117,125),NewPoint(119,122),NewPoint(121,121),NewPoint(123,120),NewPoint(125,122),NewPoint(125,125),NewPoint(127,130),NewPoint(128,133),NewPoint(131,143),NewPoint(136,153),NewPoint(140,163),NewPoint(144,172),NewPoint(145,175),NewPoint(151,189),NewPoint(156,201),NewPoint(161,213),NewPoint(166,225),NewPoint(169,233),NewPoint(171,236),NewPoint(174,243),NewPoint(177,247),NewPoint(178,249),NewPoint(179,251),NewPoint(180,253),NewPoint(180,255),NewPoint(179,257),NewPoint(177,257),NewPoint(174,255),NewPoint(169,250),NewPoint(164,247),NewPoint(160,245),NewPoint(149,238),NewPoint(138,230),NewPoint(127,221),NewPoint(124,220),NewPoint(112,212),NewPoint(110,210),NewPoint(96,201),NewPoint(84,195),NewPoint(74,190),NewPoint(64,182),NewPoint(55,175),NewPoint(51,172),NewPoint(49,170),NewPoint(51,169),NewPoint(56,169),NewPoint(66,169),NewPoint(78,168),NewPoint(92,166),NewPoint(107,164),NewPoint(123,161),NewPoint(140,162),NewPoint(156,162),NewPoint(171,160),NewPoint(173,160),NewPoint(186,160),NewPoint(195,160),NewPoint(198,161),NewPoint(203,163),NewPoint(208,163),NewPoint(206,164),NewPoint(200,167),NewPoint(187,172),NewPoint(174,179),NewPoint(172,181),NewPoint(153,192),NewPoint(137,201),NewPoint(123,211),NewPoint(112,220),NewPoint(99,229),NewPoint(90,237),NewPoint(80,244),NewPoint(73,250),NewPoint(69,254),NewPoint(69,252)]) );
		
		this.Templates.push( new Template("pigtail", [NewPoint(81,219),NewPoint(84,218),NewPoint(86,220),NewPoint(88,220),NewPoint(90,220),NewPoint(92,219),NewPoint(95,220),NewPoint(97,219),NewPoint(99,220),NewPoint(102,218),NewPoint(105,217),NewPoint(107,216),NewPoint(110,216),NewPoint(113,214),NewPoint(116,212),NewPoint(118,210),NewPoint(121,208),NewPoint(124,205),NewPoint(126,202),NewPoint(129,199),NewPoint(132,196),NewPoint(136,191),NewPoint(139,187),NewPoint(142,182),NewPoint(144,179),NewPoint(146,174),NewPoint(148,170),NewPoint(149,168),NewPoint(151,162),NewPoint(152,160),NewPoint(152,157),NewPoint(152,155),NewPoint(152,151),NewPoint(152,149),NewPoint(152,146),NewPoint(149,142),NewPoint(148,139),NewPoint(145,137),NewPoint(141,135),NewPoint(139,135),NewPoint(134,136),NewPoint(130,140),NewPoint(128,142),NewPoint(126,145),NewPoint(122,150),NewPoint(119,158),NewPoint(117,163),NewPoint(115,170),NewPoint(114,175),NewPoint(117,184),NewPoint(120,190),NewPoint(125,199),NewPoint(129,203),NewPoint(133,208),NewPoint(138,213),NewPoint(145,215),NewPoint(155,218),NewPoint(164,219),NewPoint(166,219),NewPoint(177,219),NewPoint(182,218),NewPoint(192,216),NewPoint(196,213),NewPoint(199,212),NewPoint(201,211)]) );
		

		// $1 Gesture Recognizer API (now using Protractor instead)
		this.Recognize = function(points) {
			var b = +Infinity,
				t = 0,
				radians,
				i,
				score,
				vector;
			
			points = Resample(points, NumPoints);
			radians = IndicativeAngle(points);
			points = RotateBy(points, -radians);
			vector = Vectorize(points); // for Protractor
			
			for (i = 0; i < this.Templates.length; i++) {
				var d = OptimalCosineDistance(this.Templates[i].Vector, vector);
				if (d < b) {
					b = d; // best (least) distance
					t = i; // unistroke template
				}
			}
			return new Result(this.Templates[t].Name, 1 / b);
		};
		
	}
	
	// Helper functions:
	function Resample(points, n) {
		var I = PathLength(points) / (n - 1), // interval length
			D = 0.0,
			newpoints = new Array(points[0]),
			i;
		for (i = 1; i < points.length; i++) {
			var d = Distance(points[i - 1], points[i]);
			if ((D + d) >= I) {
				var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X),
					qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y),
					q = NewPoint(qx, qy);
				newpoints[newpoints.length] = q; // append new point 'q'
				points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
				D = 0.0;
			}
			else D += d;
		}
		// somtimes we fall a rounding-error short of adding the last point, so add it if so
		if (newpoints.length == n - 1) {
			newpoints[newpoints.length] = NewPoint(points[points.length - 1].X, points[points.length - 1].Y);
		}
		return newpoints;
	}
	function IndicativeAngle(points) {
		var c = Centroid(points);
		return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
	}
	function RotateBy(points, radians) {
		var c = Centroid(points),
			cos = Math.cos(radians),
			sin = Math.sin(radians),
			newpoints = [],
			i;
		for (i = 0; i < points.length; i++) {
			var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X,
				qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
			newpoints[newpoints.length] = NewPoint(qx, qy);
		}
		return newpoints;
	}
	function ScaleTo(points, size) {
		var B = BoundingBox(points),
			newpoints = [],
			i;
		for (i = 0; i < points.length; i++) {
			var qx = points[i].X * (size / B.Width),
				qy = points[i].Y * (size / B.Height);
			newpoints[newpoints.length] = NewPoint(qx, qy);
		}
		return newpoints;
	}
	function TranslateTo(points, pt) {
		var c = Centroid(points),
			newpoints = [],
			i;
		for (i = 0; i < points.length; i++) {
			var qx = points[i].X + pt.X - c.X,
				qy = points[i].Y + pt.Y - c.Y;
			newpoints[newpoints.length] = NewPoint(qx, qy);
		}
		return newpoints;
	}
	function Vectorize(points) { // for Protractor
		var sum = 0.0,
			vector = [],
			i,
			magnitude;
		for ( i = 0; i < points.length; i++) {
			vector[vector.length] = points[i].X;
			vector[vector.length] = points[i].Y;
			sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
		}
		magnitude = Math.sqrt(sum);
		for ( i = 0; i < vector.length; i++ )
			vector[i] /= magnitude;
		return vector;
	}
	function OptimalCosineDistance(v1, v2) { // for Protractor
		var a = 0.0,
			b = 0.0,
			i,
			angle;
		for (i = 0; i < v1.length; i += 2) {
			a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
	                b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
		}
		angle = Math.atan(b / a);
		return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
	}
	function Centroid(points) {
		var x = 0.0, 
			y = 0.0,
			i;
		for (i = 0; i < points.length; i++) {
			x += points[i].X;
			y += points[i].Y;
		}
		x /= points.length;
		y /= points.length;
		return NewPoint(x, y);
	}
	function BoundingBox(points) {
		var minX = +Infinity, 
			maxX = -Infinity, 
			minY = +Infinity, 
			maxY = -Infinity,
			i;
		for (i = 0; i < points.length; i++) {
			if (points[i].X < minX)
				minX = points[i].X;
			if (points[i].X > maxX)
				maxX = points[i].X;
			if (points[i].Y < minY)
				minY = points[i].Y;
			if (points[i].Y > maxY)
				maxY = points[i].Y;
		}
		return new Rectangle(minX, minY, maxX - minX, maxY - minY);
	}
	function PathLength(points) {
		var d = 0.0,
			i;
		for (i = 1; i < points.length; i++) {
			d += Distance(points[i - 1], points[i]);
		}
		return d;
	}
	function Distance(p1, p2) {
		var dx = p2.X - p1.X,
			dy = p2.Y - p1.Y;
		return Math.sqrt(dx * dx + dy * dy);
	}

})(jQuery);/** @preserve
jSignature v2
Copyright (c) 2012 Willow Systems Corp http://willow-systems.com
Copyright (c) 2010 Brinley Ang http://www.unbolt.net
MIT License <http://www.opensource.org/licenses/mit-license.php> 

*/
;(function() {

var apinamespace = 'jSignature'

/**
Allows one to delay certain eventual action by setting up a timer for it and allowing one to delay it
by "kick"ing it. Sorta like "kick the can down the road"

@public
@class
@param
@returns {Type}
*/
var KickTimerClass = function(time, callback) {
	var timer
	this.kick = function() {
		clearTimeout(timer)
		timer = setTimeout(
			callback
			, time
		)		
	}
	this.clear = function() {
		clearTimeout(timer)
	}
	return this
}

var PubSubClass = function(context){
	'use strict'
	/*  @preserve 
	-----------------------------------------------------------------------------------------------
	JavaScript PubSub library
	2012 (c) Willow Systems Corp (www.willow-systems.com)
	based on Peter Higgins (dante@dojotoolkit.org)
	Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
	Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
	http://dojofoundation.org/license for more information.
	-----------------------------------------------------------------------------------------------
	*/
	this.topics = {}
	// here we choose what will be "this" for the called events.
	// if context is defined, it's context. Else, 'this' is this instance of PubSub
	this.context = context ? context : this
	/**
	 * Allows caller to emit an event and pass arguments to event listeners.
	 * @public
	 * @function
	 * @param topic {String} Name of the channel on which to voice this event
	 * @param **arguments Any number of arguments you want to pass to the listeners of this event.
	 */
	this.publish = function(topic, arg1, arg2, etc) {
		'use strict'
		if (this.topics[topic]) {
			var currentTopic = this.topics[topic]
			, args = Array.prototype.slice.call(arguments, 1)
			, toremove = []
			, fn
			, i, l
			, pair

			for (i = 0, l = currentTopic.length; i < l; i++) {
				pair = currentTopic[i] // this is a [function, once_flag] array
				fn = pair[0] 
				if (pair[1] /* 'run once' flag set */){
				  pair[0] = function(){}
				  toremove.push(i)
				}
			   	fn.apply(this.context, args)
			}
			for (i = 0, l = toremove.length; i < l; i++) {
			  currentTopic.splice(toremove[i], 1)
			}
		}
	}
	/**
	 * Allows listener code to subscribe to channel and be called when data is available 
	 * @public
	 * @function
	 * @param topic {String} Name of the channel on which to voice this event
	 * @param callback {Function} Executable (function pointer) that will be ran when event is voiced on this channel.
	 * @param once {Boolean} (optional. False by default) Flag indicating if the function is to be triggered only once.
	 * @returns {Object} A token object that cen be used for unsubscribing.  
	 */
	this.subscribe = function(topic, callback, once) {
		'use strict'
		if (!this.topics[topic]) {
			this.topics[topic] = [[callback, once]];
		} else {
			this.topics[topic].push([callback,once]);
		}
		return {
			"topic": topic,
			"callback": callback
		};
	};
	/**
	 * Allows listener code to unsubscribe from a channel 
	 * @public
	 * @function
	 * @param token {Object} A token object that was returned by `subscribe` method 
	 */
	this.unsubscribe = function(token) {
		if (this.topics[token.topic]) {
			var currentTopic = this.topics[token.topic]
			
			for (var i = 0, l = currentTopic.length; i < l; i++) {
				if (currentTopic[i][0] === token.callback) {
					currentTopic.splice(i, 1)
				}
			}
		}
	}
}

/// Returns front, back and "decor" colors derived from element (as jQuery obj)
function getColors($e){
	var tmp
	, undef
	, frontcolor = $e.css('color')
	, backcolor
	
	while(backcolor === undef && $e !== undef){
		try{
			tmp = $e.css('background-color')				
		} catch (ex) {
			tmp = 'transparent'
		}
		if (tmp !== 'transparent' && tmp !== 'rgba(0, 0, 0, 0)'){
			backcolor = tmp
		}
		try{
			$e = $e.parent()
			if ($e[0] === document){
				$e = undef
			}
		} catch (ec) {
			$e = undef
		}
	}

	var rgbaregex = /rgb[a]*\((\d+),\s*(\d+),\s*(\d+)/ // modern browsers
	, hexregex = /#([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})/ // IE 8 and less.
	, frontcolorcomponents

	// Decomposing Front color into R, G, B ints
	tmp = undef
	tmp = frontcolor.match(rgbaregex)
	if (tmp){
		frontcolorcomponents = {'r':parseInt(tmp[1],10),'g':parseInt(tmp[2],10),'b':parseInt(tmp[3],10)}
	} else {
		tmp = frontcolor.match(hexregex)
		if (tmp) {
			frontcolorcomponents = {'r':parseInt(tmp[1],16),'g':parseInt(tmp[2],16),'b':parseInt(tmp[3],16)}
		}
	}
//		if(!frontcolorcomponents){
//			frontcolorcomponents = {'r':255,'g':255,'b':255}
//		}

	var backcolorcomponents
	// Decomposing back color into R, G, B ints
	if(!backcolor){
		// HIghly unlikely since this means that no background styling was applied to any element from here to top of dom.
		// we'll pick up back color from front color
		if(frontcolorcomponents){
			if (Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b]) > 127){
				backcolorcomponents = {'r':0,'g':0,'b':0}
			} else {
				backcolorcomponents = {'r':255,'g':255,'b':255}
			}
		} else {
			// arg!!! front color is in format we don't understand (hsl, named colors)
			// Let's just go with white background.
			backcolorcomponents = {'r':255,'g':255,'b':255}
		}
	} else {
		tmp = undef
		tmp = backcolor.match(rgbaregex)
		if (tmp){
			backcolorcomponents = {'r':parseInt(tmp[1],10),'g':parseInt(tmp[2],10),'b':parseInt(tmp[3],10)}
		} else {
			tmp = backcolor.match(hexregex)
			if (tmp) {
				backcolorcomponents = {'r':parseInt(tmp[1],16),'g':parseInt(tmp[2],16),'b':parseInt(tmp[3],16)}
			}
		}
//			if(!backcolorcomponents){
//				backcolorcomponents = {'r':0,'g':0,'b':0}
//			}
	}
	
	// Deriving Decor color
	// THis is LAZY!!!! Better way would be to use HSL and adjust luminocity. However, that could be an overkill. 
	
	var toRGBfn = function(o){return 'rgb(' + [o.r, o.g, o.b].join(', ') + ')'} 
	, decorcolorcomponents
	, frontcolorbrightness
	, adjusted
	
	if (frontcolorcomponents && backcolorcomponents){
		var backcolorbrightness = Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b])
		
		frontcolorbrightness = Math.max.apply(null, [backcolorcomponents.r, backcolorcomponents.g, backcolorcomponents.b])
		adjusted = Math.round(frontcolorbrightness + (-1 * (frontcolorbrightness - backcolorbrightness) * 0.75)) // "dimming" the difference between pen and back.
		decorcolorcomponents = {'r':adjusted,'g':adjusted,'b':adjusted} // always shade of gray
	} else if (frontcolorcomponents) {
		frontcolorbrightness = Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b])
		var polarity = +1
		if (frontcolorbrightness > 127){
			polarity = -1
		}
		// shifting by 25% (64 points on RGB scale)
		adjusted = Math.round(frontcolorbrightness + (polarity * 96)) // "dimming" the pen's color by 75% to get decor color.
		decorcolorcomponents = {'r':adjusted,'g':adjusted,'b':adjusted} // always shade of gray
	} else {
		decorcolorcomponents = {'r':191,'g':191,'b':191} // always shade of gray
	}

	return {
		'color': frontcolor
		, 'background-color': backcolorcomponents? toRGBfn(backcolorcomponents) : backcolor
		, 'decor-color': toRGBfn(decorcolorcomponents)
	}
}

function Vector(x,y){
	this.x = x
	this.y = y
	this.reverse = function(){
		return new this.constructor( 
			this.x * -1
			, this.y * -1
		)
	}
	this._length = null
	this.getLength = function(){
		if (!this._length){
			this._length = Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) )
		}
		return this._length
	}
	
	var polarity = function (e){
		return Math.round(e / Math.abs(e))
	}
	this.resizeTo = function(length){
		// proportionally changes x,y such that the hypotenuse (vector length) is = new length
		if (this.x === 0 && this.y === 0){
			this._length = 0
		} else if (this.x === 0){
			this._length = length
			this.y = length * polarity(this.y)
		} else if(this.y === 0){
			this._length = length
			this.x = length * polarity(this.x)
		} else {
			var proportion = Math.abs(this.y / this.x)
				, x = Math.sqrt(Math.pow(length, 2) / (1 + Math.pow(proportion, 2)))
				, y = proportion * x
			this._length = length
			this.x = x * polarity(this.x)
			this.y = y * polarity(this.y)
		}
		return this
	}
	
	/**
	 * Calculates the angle between 'this' vector and another.
	 * @public
	 * @function
	 * @returns {Number} The angle between the two vectors as measured in PI. 
	 */
	this.angleTo = function(vectorB) {
		var divisor = this.getLength() * vectorB.getLength()
		if (divisor === 0) {
			return 0
		} else {
			// JavaScript floating point math is screwed up.
			// because of it, the core of the formula can, on occasion, have values
			// over 1.0 and below -1.0.
			return Math.acos(
				Math.min( 
					Math.max( 
						( this.x * vectorB.x + this.y * vectorB.y ) / divisor
						, -1.0
					)
					, 1.0
				)
			) / Math.PI
		}
	}
}

function Point(x,y){
	this.x = x
	this.y = y
	
	this.getVectorToCoordinates = function (x, y) {
		return new Vector(x - this.x, y - this.y)
	}
	this.getVectorFromCoordinates = function (x, y) {
		return this.getVectorToCoordinates(x, y).reverse()
	}
	this.getVectorToPoint = function (point) {
		return new Vector(point.x - this.x, point.y - this.y)
	}
	this.getVectorFromPoint = function (point) {
		return this.getVectorToPoint(point).reverse()
	}
}

/*
 * About data structure:
 * We don't store / deal with "pictures" this signature capture code captures "vectors"
 * 
 * We don't store bitmaps. We store "strokes" as arrays of arrays. (Actually, arrays of objects containing arrays of coordinates.
 * 
 * Stroke = mousedown + mousemoved * n (+ mouseup but we don't record that as that was the "end / lack of movement" indicator)
 * 
 * Vectors = not classical vectors where numbers indicated shift relative last position. Our vectors are actually coordinates against top left of canvas.
 * 			we could calc the classical vectors, but keeping the the actual coordinates allows us (through Math.max / min) 
 * 			to calc the size of resulting drawing very quickly. If we want classical vectors later, we can always get them in backend code.
 * 
 * So, the data structure:
 * 
 * var data = [
 * 	{ // stroke starts
 * 		x : [101, 98, 57, 43] // x points
 * 		, y : [1, 23, 65, 87] // y points
 * 	} // stroke ends
 * 	, { // stroke starts
 * 		x : [55, 56, 57, 58] // x points
 * 		, y : [101, 97, 54, 4] // y points
 * 	} // stroke ends
 * 	, { // stroke consisting of just a dot
 * 		x : [53] // x points
 * 		, y : [151] // y points
 * 	} // stroke ends
 * ]
 * 
 * we don't care or store stroke width (it's canvas-size-relative), color, shadow values. These can be added / changed on whim post-capture.
 * 
 */
function DataEngine(storageObject, context, startStrokeFn, addToStrokeFn, endStrokeFn){
	this.data = storageObject // we expect this to be an instance of Array
	this.context = context

	if (storageObject.length){
		// we have data to render
		var numofstrokes = storageObject.length
		, stroke
		, numofpoints
		
		for (var i = 0; i < numofstrokes; i++){
			stroke = storageObject[i]
			numofpoints = stroke.x.length
			startStrokeFn.call(context, stroke)
			for(var j = 1; j < numofpoints; j++){
				addToStrokeFn.call(context, stroke, j)
			}
			endStrokeFn.call(context, stroke)
		}
	}

	this.changed = function(){}
	
	this.startStrokeFn = startStrokeFn
	this.addToStrokeFn = addToStrokeFn
	this.endStrokeFn = endStrokeFn

	this.inStroke = false
	
	this._lastPoint = null
	this._stroke = null
	this.startStroke = function(point){
		if(point && typeof(point.x) == "number" && typeof(point.y) == "number"){
			this._stroke = {'x':[point.x], 'y':[point.y]}
			this.data.push(this._stroke)
			this._lastPoint = point
			this.inStroke = true
			// 'this' does not work same inside setTimeout(
			var stroke = this._stroke 
			, fn = this.startStrokeFn
			, context = this.context
			setTimeout(
				// some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
				function() {fn.call(context, stroke)}
				, 3
			)
			return point
		} else {
			return null
		}
	}
	// that "5" at the very end of this if is important to explain.
	// we do NOT render links between two captured points (in the middle of the stroke) if the distance is shorter than that number.
	// not only do we NOT render it, we also do NOT capture (add) these intermediate points to storage.
	// when clustering of these is too tight, it produces noise on the line, which, because of smoothing, makes lines too curvy.
	// maybe, later, we can expose this as a configurable setting of some sort.
	this.addToStroke = function(point){
		if (this.inStroke && 
			typeof(point.x) === "number" && 
			typeof(point.y) === "number" &&
			// calculates absolute shift in diagonal pixels away from original point
			(Math.abs(point.x - this._lastPoint.x) + Math.abs(point.y - this._lastPoint.y)) > 4
		){
			var positionInStroke = this._stroke.x.length
			this._stroke.x.push(point.x)
			this._stroke.y.push(point.y)
			this._lastPoint = point
			
			var stroke = this._stroke
			, fn = this.addToStrokeFn
			, context = this.context
			setTimeout(
				// some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
				function() {fn.call(context, stroke, positionInStroke)}
				, 3
			)
			return point
		} else {
			return null
		}
	}
	this.endStroke = function(){
		var c = this.inStroke
		this.inStroke = false
		this._lastPoint = null
		if (c){
			var stroke = this._stroke
			, fn = this.endStrokeFn // 'this' does not work same inside setTimeout(
			, context = this.context
			, changedfn = this.changed
			setTimeout(
				// some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
				function(){
					fn.call(context, stroke)
					changedfn.call(context)
				}
				, 3
			)
			return true
		} else {
			return null
		}
	}
}

var basicDot = function(ctx, x, y, size){
	var fillStyle = ctx.fillStyle
	ctx.fillStyle = ctx.strokeStyle
	ctx.fillRect(x + size / -2 , y + size / -2, size, size)
	ctx.fillStyle = fillStyle
}
, basicLine = function(ctx, startx, starty, endx, endy){
	ctx.beginPath()
	ctx.moveTo(startx, starty)
	ctx.lineTo(endx, endy)
	ctx.stroke()
}
, basicCurve = function(ctx, startx, starty, endx, endy, cp1x, cp1y, cp2x, cp2y){
	ctx.beginPath()
	ctx.moveTo(startx, starty)
	ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endx, endy)
	ctx.stroke()
}
, strokeStartCallback = function(stroke) {
	// this = jSignatureClass instance
	basicDot(this.canvasContext, stroke.x[0], stroke.y[0], this.settings.lineWidth)
}
, strokeAddCallback = function(stroke, positionInStroke){
	// this = jSignatureClass instance

	// Because we are funky this way, here we draw TWO curves.
	// 1. POSSIBLY "this line" - spanning from point right before us, to this latest point.
	// 2. POSSIBLY "prior curve" - spanning from "latest point" to the one before it.
	
	// Why you ask?
	// long lines (ones with many pixels between them) do not look good when they are part of a large curvy stroke.
	// You know, the jaggedy crocodile spine instead of a pretty, smooth curve. Yuck!
	// We want to approximate pretty curves in-place of those ugly lines.
	// To approximate a very nice curve we need to know the direction of line before and after.
	// Hence, on long lines we actually wait for another point beyond it to come back from
	// mousemoved before we draw this curve.
	
	// So for "prior curve" to be calc'ed we need 4 points 
	// 	A, B, C, D (we are on D now, A is 3 points in the past.)
	// and 3 lines:
	//  pre-line (from points A to B), 
	//  this line (from points B to C), (we call it "this" because if it was not yet, it's the only one we can draw for sure.) 
	//  post-line (from points C to D) (even through D point is 'current' we don't know how we can draw it yet)
	//
	// Well, actually, we don't need to *know* the point A, just the vector A->B
	var Cpoint = new Point(stroke.x[positionInStroke-1], stroke.y[positionInStroke-1])
		, Dpoint = new Point(stroke.x[positionInStroke], stroke.y[positionInStroke])
		, CDvector = Cpoint.getVectorToPoint(Dpoint)
		
	// Again, we have a chance here to draw TWO things:
	//  BC Curve (only if it's long, because if it was short, it was drawn by previous callback) and 
	//  CD Line (only if it's short)
	
	// So, let's start with BC curve.
	// if there is only 2 points in stroke array, we don't have "history" long enough to have point B, let alone point A.
	// Falling through to drawing line CD is proper, as that's the only line we have points for.
	if(positionInStroke > 1) {
		// we are here when there are at least 3 points in stroke array.
		var Bpoint = new Point(stroke.x[positionInStroke-2], stroke.y[positionInStroke-2])
		, BCvector = Bpoint.getVectorToPoint(Cpoint)
		, ABvector
		if(BCvector.getLength() > this.lineCurveThreshold){
			// Yey! Pretty curves, here we come!
			if(positionInStroke > 2) {
				// we are here when at least 4 points in stroke array.
				ABvector = (new Point(stroke.x[positionInStroke-3], stroke.y[positionInStroke-3])).getVectorToPoint(Bpoint)
			} else {
				ABvector = new Vector(0,0)
			}

			var minlenfraction = 0.05
			, maxlen = BCvector.getLength() * 0.35
			, ABCangle = BCvector.angleTo(ABvector.reverse())
			, BCDangle = CDvector.angleTo(BCvector.reverse())
			, BCP1vector = new Vector(ABvector.x + BCvector.x, ABvector.y + BCvector.y).resizeTo(
				Math.max(minlenfraction, ABCangle) * maxlen
			)
			, CCP2vector = (new Vector(BCvector.x + CDvector.x, BCvector.y + CDvector.y)).reverse().resizeTo(
				Math.max(minlenfraction, BCDangle) * maxlen
			)
			
			basicCurve(
				this.canvasContext
				, Bpoint.x
				, Bpoint.y
				, Cpoint.x
				, Cpoint.y
				, Bpoint.x + BCP1vector.x
				, Bpoint.y + BCP1vector.y
				, Cpoint.x + CCP2vector.x
				, Cpoint.y + CCP2vector.y
			)
		}
	}
	if(CDvector.getLength() <= this.lineCurveThreshold){
		basicLine(
			this.canvasContext
			, Cpoint.x
			, Cpoint.y
			, Dpoint.x
			, Dpoint.y
		)
	}
}
, strokeEndCallback = function(stroke){
	// this = jSignatureClass instance

	// Here we tidy up things left unfinished in last strokeAddCallback run.
	
	// What's POTENTIALLY left unfinished there is the curve between the last points
	// in the stroke, if the len of that line is more than lineCurveThreshold
	// If the last line was shorter than lineCurveThreshold, it was drawn there, and there
	// is nothing for us here to do.
	// We can also be called when there is only one point in the stroke (meaning, the 
	// stroke was just a dot), in which case, again, there is nothing for us to do.
				
	// So for "this curve" to be calc'ed we need 3 points 
	// 	A, B, C
	// and 2 lines:
	//  pre-line (from points A to B), 
	//  this line (from points B to C) 
	// Well, actually, we don't need to *know* the point A, just the vector A->B
	// so, we really need points B, C and AB vector.
	var positionInStroke = stroke.x.length - 1
	
	if (positionInStroke > 0){
		// there are at least 2 points in the stroke.we are in business.
		var Cpoint = new Point(stroke.x[positionInStroke], stroke.y[positionInStroke])
			, Bpoint = new Point(stroke.x[positionInStroke-1], stroke.y[positionInStroke-1])
			, BCvector = Bpoint.getVectorToPoint(Cpoint)
			, ABvector
		if (BCvector.getLength() > this.lineCurveThreshold){
			// yep. This one was left undrawn in prior callback. Have to draw it now.
			if (positionInStroke > 1){
				// we have at least 3 elems in stroke
				ABvector = (new Point(stroke.x[positionInStroke-2], stroke.y[positionInStroke-2])).getVectorToPoint(Bpoint)
				var BCP1vector = new Vector(ABvector.x + BCvector.x, ABvector.y + BCvector.y).resizeTo(BCvector.getLength() / 2)
				basicCurve(
					this.canvasContext
					, Bpoint.x
					, Bpoint.y
					, Cpoint.x
					, Cpoint.y
					, Bpoint.x + BCP1vector.x
					, Bpoint.y + BCP1vector.y
					, Cpoint.x
					, Cpoint.y
				)
			} else {
				// Since there is no AB leg, there is no curve to draw. This line is still "long" but no curve.
				basicLine(
					this.canvasContext
					, Bpoint.x
					, Bpoint.y
					, Cpoint.x
					, Cpoint.y
				)
			}
		}
	}
}


/*
var getDataStats = function(){
	var strokecnt = strokes.length
		, stroke
		, pointid
		, pointcnt
		, x, y
		, maxX = Number.NEGATIVE_INFINITY
		, maxY = Number.NEGATIVE_INFINITY
		, minX = Number.POSITIVE_INFINITY
		, minY = Number.POSITIVE_INFINITY
	for(strokeid = 0; strokeid < strokecnt; strokeid++){
		stroke = strokes[strokeid]
		pointcnt = stroke.length
		for(pointid = 0; pointid < pointcnt; pointid++){
			x = stroke.x[pointid]
			y = stroke.y[pointid]
			if (x > maxX){
				maxX = x
			} else if (x < minX) {
				minX = x
			}
			if (y > maxY){
				maxY = y
			} else if (y < minY) {
				minY = y
			}
		}
	}
	return {'maxX': maxX, 'minX': minX, 'maxY': maxY, 'minY': minY}
}
*/

function conditionallyLinkCanvasResizeToWindowResize(jSignatureInstance, settingsWidth, apinamespace, globalEvents){
	'use strict'
	if ( settingsWidth === 'ratio' || settingsWidth.split('')[settingsWidth.length - 1] === '%' ) {
		
		this.eventTokens[apinamespace + '.parentresized'] = globalEvents.subscribe(
			apinamespace + '.parentresized'
			, (function(eventTokens, $parent, originalParentWidth, sizeRatio){
				'use strict'

				return function(){
					'use strict'

					var w = $parent.width()
					if (w !== originalParentWidth) {
					
						// UNsubscribing this particular instance of signature pad only.
						// there is a separate `eventTokens` per each instance of signature pad 
						for (var key in eventTokens){
							if (eventTokens.hasOwnProperty(key)) {
								globalEvents.unsubscribe(eventTokens[key])
								delete eventTokens[key]
                            }
						}

						var settings = jSignatureInstance.settings
						jSignatureInstance.$parent.children().remove()
						for (var key in jSignatureInstance){
							if (jSignatureInstance.hasOwnProperty(key)) {
								delete jSignatureInstance[key]
							}
						}
						
						// scale data to new signature pad size
						settings.data = (function(data, scale){
							var newData = []
							var o, i, l, j, m, stroke
							for ( i = 0, l = data.length; i < l; i++) {
                            	stroke = data[i]
                            	
                            	o = {'x':[],'y':[]}
                            	
                            	for ( j = 0, m = stroke.x.length; j < m; j++) {
                                	o.x.push(stroke.x[j] * scale)
                                	o.y.push(stroke.y[j] * scale)
                                }
                            
                            	newData.push(o)
                            }
							return newData
						})(
							settings.data
							, w * 1.0 / originalParentWidth
						)
						
						$parent[apinamespace](settings)
			        }
				}
			})(
				this.eventTokens
				, this.$parent
				, this.$parent.width()
				, this.canvas.width * 1.0 / this.canvas.height
			)
		)
	}
}


function jSignatureClass(parent, options, instanceExtensions) {

	var $parent = this.$parent = $(parent)
	, eventTokens = this.eventTokens = {}
	, events = this.events = new PubSubClass(this)
	, globalEvents = $.fn[apinamespace]('globalEvents')
	, settings = {
		'width' : 'ratio'
		,'height' : 'ratio'
		,'sizeRatio': 4 // only used when height = 'ratio'
		,'color' : '#000'
		,'background-color': '#fff'
		,'decor-color': '#eee'
		,'lineWidth' : 0
		,'minFatFingerCompensation' : -10
		,'showUndoButton': false
		,'data': []
	}
	
	$.extend(settings, getColors($parent))
	if (options) {
		$.extend(settings, options)
	}
	this.settings = settings

	for (var extensionName in instanceExtensions){
		if (instanceExtensions.hasOwnProperty(extensionName)) {
			instanceExtensions[extensionName].call(this, extensionName)
		}
	}

	this.events.publish(apinamespace+'.initializing')

	// these, when enabled, will hover above the sig area. Hence we append them to DOM before canvas.
	this.$controlbarUpper = (function(){
		var controlbarstyle = 'padding:0 !important;margin:0 !important;'+
			'width: 100% !important; height: 0 !important;'+
			'margin-top:-1em !important;margin-bottom:1em !important;'
		return $('<div style="'+controlbarstyle+'"></div>').appendTo($parent)
	})();

	this.isCanvasEmulator = false // will be flipped by initializer when needed.
	var canvas = this.canvas = this.initializeCanvas(settings)
	, $canvas = $(canvas)

	this.$controlbarLower = (function(){
		var controlbarstyle = 'padding:0 !important;margin:0 !important;'+
			'width: 100% !important; height: 0 !important;'+
			'margin-top:-1.5em !important;margin-bottom:1.5em !important;'
		return $('<div style="'+controlbarstyle+'"></div>').appendTo($parent)
	})();

	this.canvasContext = canvas.getContext("2d")

	// Most of our exposed API will be looking for this:
	$canvas.data(apinamespace + '.this', this)

	settings.lineWidth = (function(defaultLineWidth, canvasWidth){
		if (!defaultLineWidth){
			return Math.max(
				Math.round(canvasWidth / 400) /*+1 pixel for every extra 300px of width.*/
				, 2 /* minimum line width */
			) 
		} else {
			return defaultLineWidth
		}
	})(settings.lineWidth, canvas.width);

	this.lineCurveThreshold = settings.lineWidth * 3

	// Add custom class if defined
	if(settings.cssclass && $.trim(settings.cssclass) != "") {
		$canvas.addClass(settings.cssclass)
	}

	// used for shifting the drawing point up on touch devices, so one can see the drawing above the finger.
	this.fatFingerCompensation = 0

	var movementHandlers = (function(jSignatureInstance) {

		//================================
		// mouse down, move, up handlers:

		// shifts - adjustment values in viewport pixels drived from position of canvas on the page
		var shiftX
		, shiftY
		, setStartValues = function(){
			var tos = $(jSignatureInstance.canvas).offset()
			shiftX = tos.left * -1
			shiftY = tos.top * -1
		}
		, getPointFromEvent = function(e) {
			var firstEvent = (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0] : e)
			// All devices i tried report correct coordinates in pageX,Y
			// Android Chrome 2.3.x, 3.1, 3.2., Opera Mobile,  safari iOS 4.x,
			// Windows: Chrome, FF, IE9, Safari
			// None of that scroll shift calc vs screenXY other sigs do is needed.
			// ... oh, yeah, the "fatFinger.." is for tablets so that people see what they draw.
			return new Point(
				Math.round(firstEvent.pageX + shiftX)
				, Math.round(firstEvent.pageY + shiftY) + jSignatureInstance.fatFingerCompensation
			)
		}
		, timer = new KickTimerClass(
			750
			, function() { jSignatureInstance.dataEngine.endStroke() }
		)

		this.drawEndHandler = function(e) {
			try { e.preventDefault() } catch (ex) {}
			timer.clear()
			jSignatureInstance.dataEngine.endStroke()
		}
		this.drawStartHandler = function(e) {
			e.preventDefault()
			// for performance we cache the offsets
			// we recalc these only at the beginning the stroke			
			setStartValues()
			jSignatureInstance.dataEngine.startStroke( getPointFromEvent(e) )
			timer.kick()
		}
		this.drawMoveHandler = function(e) {
			e.preventDefault()
			if (!jSignatureInstance.dataEngine.inStroke){
				return
			} 
			jSignatureInstance.dataEngine.addToStroke( getPointFromEvent(e) )
			timer.kick()
		}

		return this

	}).call( {}, this )

	//
	//================================

	;(function(drawEndHandler, drawStartHandler, drawMoveHandler) {
		var canvas = this.canvas
		, $canvas = $(canvas)
		, undef
		if (this.isCanvasEmulator){
			$canvas.bind('mousemove.'+apinamespace, drawMoveHandler)
			$canvas.bind('mouseup.'+apinamespace, drawEndHandler)
			$canvas.bind('mousedown.'+apinamespace, drawStartHandler)
		} else {
			canvas.ontouchstart = function(e) {
				canvas.onmousedown = undef
				canvas.onmouseup = undef
				canvas.onmousemove = undef

				this.fatFingerCompensation = (
					settings.minFatFingerCompensation && 
					settings.lineWidth * -3 > settings.minFatFingerCompensation
				) ? settings.lineWidth * -3 : settings.minFatFingerCompensation

				drawStartHandler(e)

				canvas.ontouchend = drawEndHandler
				canvas.ontouchstart = drawStartHandler
				canvas.ontouchmove = drawMoveHandler
			}
			canvas.onmousedown = function(e) {
				canvas.ontouchstart = undef
				canvas.ontouchend = undef
				canvas.ontouchmove = undef

				drawStartHandler(e)

				canvas.onmousedown = drawStartHandler
				canvas.onmouseup = drawEndHandler
				canvas.onmousemove = drawMoveHandler
			}
		}
	}).call( 
		this
		, movementHandlers.drawEndHandler
		, movementHandlers.drawStartHandler
		, movementHandlers.drawMoveHandler
	)

	//=========================================
	// various event handlers

	// on mouseout + mouseup canvas did not know that mouseUP fired. Continued to draw despite mouse UP.
	// it is bettr than
	// $canvas.bind('mouseout', drawEndHandler)
	// because we don't want to break the stroke where user accidentally gets ouside and wants to get back in quickly.
	eventTokens[apinamespace + '.windowmouseup'] = globalEvents.subscribe(
		apinamespace + '.windowmouseup'
		, movementHandlers.drawEndHandler
	)

	this.events.publish(apinamespace+'.attachingEventHandlers')

	// If we have proportional width, we sign up to events broadcasting "window resized" and checking if
	// parent's width changed. If so, we (1) extract settings + data from current signature pad,
	// (2) remove signature pad from parent, and (3) reinit new signature pad at new size with same settings, (rescaled) data.
	conditionallyLinkCanvasResizeToWindowResize.call(
		this
		, this
		, settings.width.toString(10)
		, apinamespace, globalEvents
	)
	
	// end of event handlers.
	// ===============================

	this.resetCanvas(settings.data)

	// resetCanvas renders the data on the screen and fires ONE "change" event
	// if there is data. If you have controls that rely on "change" firing
	// attach them to something that runs before this.resetCanvas, like
	// apinamespace+'.attachingEventHandlers' that fires a bit higher.
	this.events.publish(apinamespace+'.initialized')

	return this
} // end of initBase

//=========================================================================
// jSignatureClass's methods and supporting fn's

jSignatureClass.prototype.resetCanvas = function(data){
	var canvas = this.canvas
	, settings = this.settings
	, ctx = this.canvasContext
	, isCanvasEmulator = this.isCanvasEmulator

	, cw = canvas.width
	, ch = canvas.height
	
	// preparing colors, drawing area

	ctx.clearRect(0, 0, cw + 30, ch + 30)

	ctx.shadowColor = ctx.fillStyle = settings['background-color']
	if (isCanvasEmulator){
		// FLashCanvas fills with Black by default, covering up the parent div's background
		// hence we refill 
		ctx.fillRect(0,0,cw + 30, ch + 30)
	}

	ctx.lineWidth = Math.ceil(parseInt(settings.lineWidth, 10))
	ctx.lineCap = ctx.lineJoin = "round"
	
	// signature line
	ctx.strokeStyle = settings['decor-color']
	ctx.shadowOffsetX = 0
	ctx.shadowOffsetY = 0
	var lineoffset = Math.round( ch / 5 )
	basicLine(ctx, lineoffset * 1.5, ch - lineoffset, cw - (lineoffset * 1.5), ch - lineoffset)
	ctx.strokeStyle = settings.color

	if (!isCanvasEmulator){
		ctx.shadowColor = ctx.strokeStyle
		ctx.shadowOffsetX = ctx.lineWidth * 0.5
		ctx.shadowOffsetY = ctx.lineWidth * -0.6
		ctx.shadowBlur = 0					
	}
	
	// setting up new dataEngine

	if (!data) { data = [] }
	
	var dataEngine = this.dataEngine = new DataEngine(
		data
		, this
		, strokeStartCallback
		, strokeAddCallback
		, strokeEndCallback
	)

	settings.data = data  // onwindowresize handler uses it, i think.
	$(canvas).data(apinamespace+'.data', data)
		.data(apinamespace+'.settings', settings)

	// we fire "change" event on every change in data.
	// setting this up:
	dataEngine.changed = (function(target, events, apinamespace) {
		'use strict'
		return function() {
			events.publish(apinamespace+'.change')
			target.trigger('change') 
		}
	})(this.$parent, this.events, apinamespace)
	// let's trigger change on all data reloads
	dataEngine.changed()

	// import filters will be passing this back as indication of "we rendered"
	return true
}


function initializeCanvasEmulator(canvas){
	if (canvas.getContext){
		return false
	} else if (typeof FlashCanvas !== "undefined") {
		canvas = FlashCanvas.initElement(canvas)
		
		var zoom = 1
		// FlashCanvas uses flash which has this annoying habit of NOT scaling with page zoom. 
		// It matches pixel-to-pixel to screen instead.
		// Since we are targeting ONLY IE 7, 8 with FlashCanvas, we will test the zoom only the IE8, IE7 way
		if (window && window.screen && window.screen.deviceXDPI && window.screen.logicalXDPI){
			zoom = window.screen.deviceXDPI * 1.0 / window.screen.logicalXDPI
		}
		if (zoom !== 1){
			// We effectively abuse the brokenness of FlashCanvas and force the flash rendering surface to
			// occupy larger pixel dimensions than the wrapping, scaled up DIV and Canvas elems.
			$(canvas).children('object').get(0).resize(Math.ceil(canvas.width * zoom), Math.ceil(canvas.height * zoom))
			// And by applying "scale" transformation we can talk "browser pixels" to FlashCanvas
			// and have it translate the "browser pixels" to "screen pixels"
			canvas.getContext('2d').scale(zoom, zoom)
			// Note to self: don't reuse Canvas element. Repeated "scale" are cumulative.
		}
		return true
	} else {
		throw new Error("Canvas element does not support 2d context. jSignature cannot proceed.")
	}
}

jSignatureClass.prototype.initializeCanvas = function(settings) {
	// ===========
	// Init + Sizing code

	var canvas = document.createElement('canvas')
	, $canvas = $(canvas)

	// We cannot work with circular dependency
	if (settings.width === settings.height && settings.height === 'ratio') {
    	settings.width = '100%'
    }

	$canvas.css(
		'margin'
		, 0
	).css(
		'padding'
		, 0
	).css(
		'border'
		, 'none'
	).css(
		'height'
		, settings.height === 'ratio' || !settings.height ? 1 : settings.height.toString(10)
	).css(
		'width'
		, settings.width === 'ratio' || !settings.width ? 1 : settings.width.toString(10)
	)

	$canvas.appendTo(this.$parent)

	// we could not do this until canvas is rendered (appended to DOM)
	if (settings.height === 'ratio') {
		$canvas.css(
			'height'
			, Math.round( $canvas.width() / settings.sizeRatio )
		)
    } else if (settings.width === 'ratio') {
		$canvas.css(
			'width'
			, Math.round( $canvas.height() * settings.sizeRatio )
		)
    }

	$canvas.addClass(apinamespace)

	// canvas's drawing area resolution is independent from canvas's size.
	// pixels are just scaled up or down when internal resolution does not
	// match external size. So...

	canvas.width = $canvas.width()
	canvas.height = $canvas.height()
	
	// Special case Sizing code

	this.isCanvasEmulator = initializeCanvasEmulator(canvas)

	// End of Sizing Code
	// ===========

	// normally select preventer would be short, but
	// Canvas emulator on IE does NOT provide value for Event. Hence this convoluted line.
	canvas.onselectstart = function(e){if(e && e.preventDefault){e.preventDefault()}; if(e && e.stopPropagation){e.stopPropagation()}; return false;}

	return canvas
}


var GlobalJSignatureObjectInitializer = function(){

	var globalEvents = new PubSubClass()
	
	// common "window resized" event listener.
	// jSignature instances will subscribe to this chanel.
	// to resize themselves when needed.
	;(function(globalEvents, apinamespace, $, window){
		'use strict'

		var resizetimer
		, runner = function(){
			globalEvents.publish(
				apinamespace + '.parentresized'
			)
		}

		// jSignature knows how to resize its content when its parent is resized
		// window resize is the only way we can catch resize events though...
		$(window).bind('resize.'+apinamespace, function(){
			if (resizetimer) {
                clearTimeout(resizetimer)
			}
			resizetimer = setTimeout( 
				runner
				, 500
			)
		})
		// when mouse exists canvas element and "up"s outside, we cannot catch it with
		// callbacks attached to canvas. This catches it outside.
		.bind('mouseup.'+apinamespace, function(e){
			globalEvents.publish(
				apinamespace + '.windowmouseup'
				, e
			)
		})

	})(globalEvents, apinamespace, $, window)

	var jSignatureInstanceExtensions = {
		'exampleExtension':function(extensionName){
			// we are called very early in instance's life.
			// right after the settings are resolved and 
			// jSignatureInstance.events is created 
			// and right before first ("jSignature.initializing") event is called.
			// You don't really need to manupilate 
			// jSignatureInstance directly, just attach
			// a bunch of events to jSignatureInstance.events
			// (look at the source of jSignatureClass to see when these fire)
			// and your special pieces of code will attach by themselves.

			// this function runs every time a new instance is set up.
			// this means every var you create will live only for one instance
			// unless you attach it to something outside, like "window."
			// and pick it up later from there.

			// when globalEvents' events fire, 'this' is globalEvents object
			// when jSignatureInstance's events fire, 'this' is jSignatureInstance

			// Here,
			// this = is new jSignatureClass's instance.

			// The way you COULD approch setting this up is:
			// if you have multistep set up, attach event to "jSignature.initializing"
			// that attaches other events to be fired further lower the init stream.
			// Or, if you know for sure you rely on only one jSignatureInstance's event,
			// just attach to it directly

			this.events.subscribe(
				// name of the event
				apinamespace + '.initializing'
				// event handlers, can pass args too, but in majority of cases,
				// 'this' which is jSignatureClass object instance pointer is enough to get by.
				, function(){
					if (this.settings.hasOwnProperty('non-existent setting category?')) {
						console.log(extensionName + ' is here')
					}
				}
			)
		}
	}

	var exportplugins = {
		'default':function(data){return this.toDataURL()}
		, 'native':function(data){return data}
		, 'image':function(data){
			/*this = canvas elem */
			var imagestring = this.toDataURL()
			
			if (typeof imagestring === 'string' && 
				imagestring.length > 4 && 
				imagestring.slice(0,5) === 'data:' &&
				imagestring.indexOf(',') !== -1){
				
				var splitterpos = imagestring.indexOf(',')

				return [
			        imagestring.slice(5, splitterpos)
			        , imagestring.substr(splitterpos + 1)
		        ]
			}
			return []
		}
	}

	// will be part of "importplugins"
	function _renderImageOnCanvas( data, formattype, rerendercallable ) {
		'use strict'
		// #1. Do NOT rely on this. No worky on IE 
		//   (url max len + lack of base64 decoder + possibly other issues)
		// #2. This does NOT affect what is captured as "signature" as far as vector data is 
		// concerned. This is treated same as "signature line" - i.e. completely ignored
		// the only time you see imported image data exported is if you export as image.

		// we do NOT call rerendercallable here (unlike in other import plugins)
		// because importing image does absolutely nothing to the underlying vector data storage
		// This could be a way to "import" old signatures stored as images
		// This could also be a way to import extra decor into signature area.
		
		var img = new Image()
		// this = Canvas DOM elem. Not jQuery object. Not Canvas's parent div.
		, c = this

		img.onload = function() {
			var ctx = c.getContext("2d").drawImage( 
				img, 0, 0
				, ( img.width < c.width) ? img.width : c.width
				, ( img.height < c.height) ? img.height : c.height
			)
		}

		img.src = 'data:' + formattype + ',' + data
	}

	var importplugins = {
		'native':function(data, formattype, rerendercallable){
			// we expect data as Array of objects of arrays here - whatever 'default' EXPORT plugin spits out.
			// returning Truthy to indicate we are good, all updated.
			rerendercallable( data )
		}
		, 'image': _renderImageOnCanvas
		, 'image/png;base64': _renderImageOnCanvas
		, 'image/jpeg;base64': _renderImageOnCanvas
		, 'image/jpg;base64': _renderImageOnCanvas
	}

	function _clearDrawingArea( data ) {
		this.find('canvas.'+apinamespace)
			.add(this.filter('canvas.'+apinamespace))
			.data(apinamespace+'.this').resetCanvas( data )
		return this
	}

	function _setDrawingData( data, formattype ) {
		var undef

		if (formattype === undef && typeof data === 'string' && data.substr(0,5) === 'data:') {
			formattype = data.slice(5).split(',')[0]
			// 5 chars of "data:" + mimetype len + 1 "," char = all skipped.
			data = data.slice(6 + formattype.length) 
			if (formattype === data) return
		}

		var $canvas = this.find('canvas.'+apinamespace).add(this.filter('canvas.'+apinamespace))

		if (!importplugins.hasOwnProperty(formattype)){
			throw new Error(apinamespace + " is unable to find import plugin with for format '"+ String(formattype) +"'")
		} else if ($canvas.length !== 0){
			importplugins[formattype].call(
				$canvas[0]
				, data
				, formattype
				, (function(jSignatureInstance){ 
					return function(){ return jSignatureInstance.resetCanvas.apply(jSignatureInstance, arguments) }
				})($canvas.data(apinamespace+'.this'))
			)
		}

		return this
	}

	//These are exposed as methods under $obj.jSignature('methodname', *args)
	var plugins = {'export':exportplugins, 'import':importplugins, 'instance': jSignatureInstanceExtensions}
	, methods = {
		'init' : function( options ) {
			return this.each( function() {
				new jSignatureClass(this, options, jSignatureInstanceExtensions)
				// it attaches itself to canvas elem as
				// $(canvas).data(apinamespace+'.this') = instance
			}) // end Each
		}
		, 'getSettings' : function() {
			return this.find('canvas.'+apinamespace)
				.add(this.filter('canvas.'+apinamespace))
				.data(apinamespace+'.this').settings
		}
		// around since v1
		, 'clear' : _clearDrawingArea
		// was mistakenly introduced instead of 'clear' in v2
		, 'reset' : _clearDrawingArea
		, 'addPlugin' : function(pluginType, pluginName, callable){
			if (plugins.hasOwnProperty(pluginType)){
				plugins[pluginType][pluginName] = callable
			}
			return this
		}
		, 'listPlugins' : function(pluginType){
			var answer = []
			if (plugins.hasOwnProperty(pluginType)){
				var o = plugins[pluginType]
				for (var k in o){
					if (o.hasOwnProperty(k)){
						answer.push(k)
					}
				}
			}
			return answer
		}
		, 'getData' : function( formattype ) {
			var undef, $canvas=this.find('canvas.'+apinamespace).add(this.filter('canvas.'+apinamespace))
			if (formattype === undef) formattype = 'default'
			if ($canvas.length !== 0 && exportplugins.hasOwnProperty(formattype)){				
				return exportplugins[formattype].call(
					$canvas.get(0) // canvas dom elem
					, $canvas.data(apinamespace+'.data') // raw signature data as array of objects of arrays
				)
			}
		}
		// around since v1. Took only one arg - data-url-formatted string with (likely png of) signature image
		, 'importData' : _setDrawingData
		// was mistakenly introduced instead of 'importData' in v2
		, 'setData' : _setDrawingData
		// this is one and same instance for all jSignature.
		, 'globalEvents' : function(){return globalEvents}
		// there will be a separate one for each jSignature instance.
		, 'events' : function() {
			return this.find('canvas.'+apinamespace)
					.add(this.filter('canvas.'+apinamespace))
					.data(apinamespace+'.this').events
		}
	} // end of methods declaration.
	
	$.fn[apinamespace] = function(method) {
		'use strict'
		if ( !method || typeof method === 'object' ) {
			return methods.init.apply( this, arguments )
		} else if ( typeof method === 'string' && methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ))
		} else {
			$.error( 'Method ' +  String(method) + ' does not exist on jQuery.' + apinamespace )
		}
	}

} // end of GlobalJSignatureObjectInitializer

GlobalJSignatureObjectInitializer()

})();
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
 *  Author: 김우섭
 *  License :
 */

// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "jquery" ], function ($) {
            factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function (jQuery, window, document, undefined) {
    (function ($, window, undefined) {
        var pluginPrefix = "",
            isDebug = true,
            deviceType = {
                MOBILE:null,
                PAD:null,
                DESKTOP:null
            },
            pluginCollection = {
                // Bootstrap
                "alert":true, "button":true, "carousel":true, "collapse":true, "dropdown":true,
                "modal":true, "popover":true, "scrollspy":true, "tab":true, "tooltip":true,
                "typeahead":true,
                // Custom
                "sign":true, "motioncapcha":true, "loading":false, "fixedbar":false, "rangeinput":false
            },
            featuredpluginCollection = {
                "media":true, "editor":true, "datatables":true, "datapicker":true, "listview":true,
                "scrollview":true, "chart":true
            };

        /**
         * Widget 은 폼, 컴포넌트, 플러그인, 피처드플러그인, 제스처로 구성되어 있다.
         * @name Widget
         * @class Widget
         * @constructor
         */
        var Widget = function () {
        };

        Widget.prototype.init = function () {
            this.registryPlugin();
            this.registryFeaturedPlugin();
            this.common.touch();
            this.common.getDeviceType();
        };

        Widget.prototype.registryPlugin = function () {
            for (var idx in pluginCollection) {
                //noinspection JSUnfilteredForInLoop
                var orginName = idx;
                var isNeededInit = false;

                // 플러그인 이름에 대문자->소문자, 간소화 등을 처리
                if (idx === "motioncapcha") {
                    orginName = "motionCaptcha";
                } else if (idx === "sign") {
                    orginName = "jSignature";
                } else {
                    isNeededInit = true;
                }

                // Wrapping이 필요한 플러그인들만을 기존 플러그인명을 그대로 사용하기 위해서 prefix old로 재정의 한다.
                //noinspection JSUnfilteredForInLoop
                if (pluginCollection[idx]) {
                    $.fn["old" + orginName] = $.fn[orginName];

                    // jSignature 플러그인은 내부적으로도 $.jSignature 사용하므로 isNeededInit으로 플러그인 제거를 방지
                    if (isNeededInit) {
                        $.fn[orginName] = undefined;
                    }
                }

                // PluginCollection에 정의된 목록대로 플러그인들을 등록한다.
                // 반복문에선 function 종료된 시점인 경우 반복문의 마지막 값이 저장되는 Closure 특징으로 한번 더 Closure를 추가함.
                $.fn[pluginPrefix + idx] = (function (name) {
                    return function (options) {
                        var widget = new Widget();
                        return this.each(function () {
                            widget[name].init(options, this);
                        });
                    }
                })(pluginPrefix + idx);
            }
        };

        Widget.prototype.registryFeaturedPlugin = function () {
//            _debugger(featuredpluginCollection);
        };

        Widget.prototype.common = {
            init:function (target, options, element) {
                target.options = $.extend({}, target.options, options);

                target.element = element;
                target.$element = $(element);

                target._build();
            },
            touch:function () {

                function getTouchPageXY(e) {
                    if (e.type.match("touch.*")) {
                        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        e.pageX = touch.pageX;
                        e.pageY = touch.pageY;
                    }
                }

                $(document).on("touchstart mousedown touchmove mousemove touchend mouseup", function (e) {
                    if (e.type.match("touch.*")) {
                        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                        e.pageX = touch.pageX;
                        e.pageY = touch.pageY;
                    }
                    if (e.type !== "mousemove") {

                    }
                });


                /**
                 * 드래그 이벤트
                 * 설정:
                 * x: true, // 수평 드래그 활성화 여부
                 * y: true, // 수직 드래그 활성호 여부
                 * drag: true // 드래그 이벤트 실행 여부
                 *
                 * Events: dragStart, drag, dragEnd.
                 * Examples$(".myelementent").drag({y: false}).on("drag", function(event, x, y) {
                 *  // do your custom thing
                 *  });
                 */
                $.fn.drag = function (conf) {
                    var doc, draggable;
                    conf = $.extend({x:true, y:true, drag:true}, conf);
                    doc = doc || $(document).on("mousedown mouseup touchstart touchend", function (e) {
                        var touch;
                        var el = $(e.target);

                        // 마우스와 터치 이벤트가 시작하고 타겟 엘리먼트가 드래그인 경우
                        if (e.type.match("mousedown|touchstart") && el.data("drag")) {

                            var offset = el.position(),
                                x0 = e.pageX - offset.left,
                                y0 = e.pageY - offset.top,
                                start = true;

                            doc.on("mousemove.drag touchmove.drag", function (e) {
                                var x = e.pageX - x0,
                                    y = e.pageY - y0,
                                    props = {};

                                if (conf.x) {
                                    props.left = x;
                                }
                                if (conf.y) {
                                    props.top = y;
                                }

                                if (start) {
                                    el.trigger("dragStart");
                                    start = false;
                                }

                                if (conf.drag) {
                                    el.css(props);
                                }

                                el.trigger("drag", [y, x]);
                                draggable = el;
                            });

                            e.preventDefault();
                        } else {

                            try {
                                if (draggable) {
                                    draggable.trigger("dragEnd");
                                }
                            } finally {
                                // 이벤트 제거
                                doc.off("mousemove.drag touchmove.drag");
                                draggable = null;
                            }
                        }

                    });

                    return this.data("drag", true);
                };
            },
            replaceAll:function (target, searchText, replaceText) {
                console.log(typeof target);
                if (typeof target === "string") {
                    target.replace(new RegExp(searchText, "gi"), replaceText);
                }
            },
            // 터치 컨테이너와 포인터의 CSS 준비
            prepareTouchCss:function (element) {
                var vendors = ['webkit', 'moz', 'ms', 'o', ''];
                var css_props = {
                    "userSelect":"none",
                    "touchCallout":"none",
                    "userDrag":"none",
                    "tapHighlightColor":"rgba(0,0,0,0)"
                };

                var prop = '';
                for (var i = 0; i < vendors.length; i++) {
                    var stylePropert = "";
                    for (var p in css_props) {
                        prop = p;
                        if (vendors[i]) {
                            prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1);
                        }
                        stylePropert += prop + ":" + css_props[p] + "; ";
                    }

                    element.attr("style", element.attr("style") + ";" + stylePropert);
                }

            },
            // UserAgent 정보를 통해 디바이스 구분
            getDeviceType:function () {
                if (navigator.userAgent.toUpperCase().match("IOS")) {
                    $.browser.os = "IOS";
                    $.browser.version = 4;
                } else if (navigator.userAgent.toUpperCase().match("IOS")) {
                    $.browser.os = "ANDROID";
                }
            }
        };

        /**
         * alert 은 화면에 경고 메세지를 표현하기 위한 플러그인이다.
         * @name alert
         */
        Widget.prototype.alert = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldalert(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * button 은 버튼에 toggle 기능을 추가한 플러그인이다.
         * @name button
         */
        Widget.prototype.button = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldbutton(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * 캐러셀은 이미지 슬라이더 플러그인으로 CSS3 효과를 추가해 다양한 형태의 화면전환를 연출시킨다.
         * @name carousel
         * TODO 반응형 웹사이트에 대응하기 위하 유동적으로 높이와 폭을 잡아야하며, background-size 역시 그 비율에 맞게 조절이 필요하다.
         */
        Widget.prototype.carousel = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{

            },
            _before:function () {

            },
            _build:function () {
                this._before();
                this.initFluxWidth = this.$element.width();
                this.flux = new flux.slider(this.$element, this.options);
                this._done();
            },
            _done:function () {
                var self = this;

                // 반응형 콜백 처리
                var delay = (function(){
                    var timer = 0;
                    return function(callback, ms){
                        clearTimeout (timer);
                        timer = setTimeout(callback, ms);
                    };
                })();
                $(window).on("resize", function (e) {
                    delay(function(){
                    }, 500);
                });

                // 기존 플러그인에 없는 파괴 함수 추가
                this.flux = {
                    remove: function() {
                        console.log("remove");
                    }
                };
                console.log(this.flux.remove());
            },
            responsiveSlider:function () {
                var isIncreaseWidth = (this.initFluxWidth < $(".fluxslider").width());
                if(!isIncreaseWidth) {
                    this.options.width = $(".fluxslider").width();
                } else {
                    this.options.width = this.initFluxWidth;
                }

                this.flux.start();
            },
            swipeSlider: function() {

            }
        };

        /**
         * 콜라스는 아코디언으로 수직으로 접기/펼치기 기능을 하는 플러그인이다.
         * @name collapse
         */
        Widget.prototype.collapse = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldcollapse(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * dropdown은 메뉴와 같은 네비게이션에서 하위 메뉴를 노출 시킬 때 사용 되는 플러그인이다.
         * @name dropdown
         */
        Widget.prototype.dropdown = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.olddropdown(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * modal은 팝업 형태로 노출되는 플러그인이다.
         * @name modal
         * TODO 오페라 및 모바일에서 비정상적인 작동과, 성능이 저하되는 문제가 발생하므로 조치가 필요하다.
         */
        Widget.prototype.modal = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldmodal(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * popover
         * @name popover
         */
        Widget.prototype.popover = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldpopover(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * scrollspy
         * @name scrollspy
         */
        Widget.prototype.scrollspy = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldscrollspy(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * 탭은
         * @name tab
         */
        Widget.prototype.tab = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtab(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * tooltip
         * @name tooltip
         */
        Widget.prototype.tooltip = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtooltip(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * typeahead
         * @name typeahead
         */
        Widget.prototype.typeahead = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldtypeahead(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * sign
         * @name sign
         * TODO 터치 이벤트 중복 문제 해결필
         */
        Widget.prototype.sign = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldjSignature(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * Motion Capcha 은 Form 전송시(로그인, 회원가입 등) 스팸 방지를 위한 터치 기반 Capcha 플러그인이다.
         * @name motioncapcha
         * TODO 갤럭시 S3 기본 브라우저에서 로딩 후 첫화면이 아닌 스크롤로 이동해서 보여지는 경우 모션이 표현 되지 않는 문제.
         */
        Widget.prototype.motioncapcha = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                //noinspection JSUnresolvedFunction
                this.$element.oldmotionCaptcha(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * loading
         * @name loading
         */
        Widget.prototype.loading = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
//            this.$element.oldmotionCaptcha(this.options);
                this._done();
            },
            _done:function () {

            }
        };

        /**
         * fixedbar
         * @name fixedbar
         */
        Widget.prototype.fixedbar = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
//            this.$element.oldalert(this.options);
                this._done();
            },
            _done:function () {

            },
            fixedbar:function () {

            }
        };

        /**
         * slider
         * @name slider
         * TODO input 태그에 pseudo 클래스 :before, :after를 사용은 유효성에 위배되므로 별개 UI(div)로 표현함.
         * http://stackoverflow.com/questions/4574912/css-content-generation-before-input-elementents
         */
        Widget.prototype.rangeinput = {
            init:function (options, element) {
                this.widget = new Widget();
                this.widget.common.init(this, options, element);
            },
            options:{ },
            _before:function () {

            },
            _build:function () {
                this._before();
                this._create();
                this._done();
            },
            _done:function () {
            },
            _create:function () {
                var defaultOptions = {
                    min:0,
                    max:100,
                    step:'any',
                    steps:0,
                    value:0,
                    precision:undefined,
                    vertical:0,
                    keyboard:false,
                    progress:false,
                    speed:100,
                    inputShow:false,
                    css:{
                        input:'range',
                        slider:'slider',
                        progress:'progress',
                        handle:'handle'
                    }
                };

                function round(value, precision) {
                    var n = Math.pow(10, precision);
                    return Math.round(value * n) / n;
                }

                function dim(el, key) {
                    var v = parseInt(el.css(key), 10);
                    if (v) {
                        return v;
                    }
                    var s = el[0].currentStyle;
                    return s && s.width && parseInt(s.width, 10);
                }

                function hasEvent(el) {
                    var e = el.data("events");
                    return e && e.onSlide;
                }

                function RangeInput(input, conf) {
                    var self = this,
                        css = conf.css,
                        root = $("<div><div/><a href='#'/></div>").data("rangeinput", self),
                        vertical,
                        value, // current value
                        origo, // handle's start point
                        len, // length of the range
                        pos;				// current position of the handle

                    // UI 엘리먼트 생성
                    input.before(root);

                    var handle = root.addClass(css.slider).find("a").addClass(css.handle),
                        progress = root.find("div").addClass(css.progress);

                    $.each("min,max,step,value".split(","), function (i, key) {
                        var val = input.attr(key);
                        if (parseFloat(val)) {
                            conf[key] = parseFloat(val, 10);
                        }
                    });

                    var range = conf.max - conf.min,
                        step = conf.step == 'any' ? 0 : conf.step,
                        precision = conf.precision;

                    if (precision === undefined) {
                        precision = step.toString().split(".");
                        precision = precision.length === 2 ? precision[1].length : 0;
                    }

                    // Replace built-in range input (type attribute cannot be changed)
                    if (input.attr("type") == 'range') {
                        var def = input.clone().wrap("<div/>").parent().html(),
                            clone = $(def.replace(/type/i, "type=tel data-orig-type"));

                        clone.val(conf.value);
                        input.replaceWith(clone);
                        input = clone;
                    }

                    input.addClass(css.input);

                    // input UI를 노출시키고 싶지 않은 경우 처리
                    if (!conf.inputShow) {
                        input.css({
                            position:"absolute",
                            left:"-10000em"
                        });
                    }

                    var fire = $(self).add(input), fireOnSlide = true;

                    /**
                     * @param evt types include: click, keydown, blur and api (setValue call)
                     * @param isSetValue when called trough setValue() call (keydown, blur, api)
                     * range 슬라이드 함수
                     * 수직 슬라이드 구현예정
                     */
                    function slide(evt, x, val, isSetValue) {

                        // calculate value based on slide position
                        if (val === undefined) {
                            val = x / len * range;

                            // x is calculated based on val. we need to strip off min during calculation
                        } else if (isSetValue) {
                            val -= conf.min;
                        }

                        // increment in steps
                        if (step) {
                            val = Math.round(val / step) * step;
                        }

                        // count x based on value or tweak x if stepping is done
                        if (x === undefined || step) {
                            x = val * len / range;
                        }

                        // crazy value?
                        if (isNaN(val)) {
                            return self;
                        }

                        // stay within range
                        x = Math.max(0, Math.min(x, len));
                        val = x / len * range;

                        if (isSetValue || !vertical) {
                            val += conf.min;
                        }

                        // in vertical ranges value rises upwards
                        if (vertical) {
                            if (isSetValue) {
                                x = len - x;
                            } else {
                                val = conf.max - val;
                            }
                        }

                        // precision
                        val = round(val, precision);

                        // onSlide
                        var isClick = evt.type == "click";
                        if (fireOnSlide && value !== undefined && !isClick) {
                            evt.type = "onSlide";
                            fire.trigger(evt, [val, x]);
                            if (evt.isDefaultPrevented()) {
                                return self;
                            }
                        }

                        // speed & callback
                        // 터치 거리에 따른 가속도값 필요
                        var speed = isClick ? conf.speed : 0,
                            callback = isClick ? function () {
                                evt.type = "change";
                                fire.trigger(evt, [val]);
                            } : null;

                        if (vertical) {
                            this.progressHeight = len - x + handle.height() / 2;
                            if ($.browser.os === "IOS" && $.browser.version > 4) {
                                handle.animate({
                                    top:x
                                }, speed, callback);
                            } else {
                                handle.transition({
                                        y:x
                                    }, speed, callback);
                            }
                            if (conf.progress) {
                                progress.css({
                                    height:this.progressHeight
                                });
                            }
                        } else {
                            this.progressWidth = x + handle.width() / 2;
                            if ($.browser.os === "IOS" && $.browser.version > 4) {
                                handle.animate({
                                    left:x
                                }, speed, callback);
                            } else {
                                handle.transition({
                                        x:x
                                    }, speed, callback);
                            }
                            if (conf.progress) {
                                progress.css({
                                    width:this.progressWidth
                                });
                            }
                        }

                        // 현재값과 좌표 저장
                        value = val;
                        pos = x;

                        input[0].value = val;
                        return self;
                    }


                    $.extend(self, {

                        getValue:function () {
                            return value;
                        },

                        setValue:function (val, e) {
                            init();
                            return slide(e || $.Event("api"), undefined, val, true);
                        },

                        getConf:function () {
                            return conf;
                        },

                        getProgress:function () {
                            return progress;
                        },

                        getHandle:function () {
                            return handle;
                        },

                        getInput:function () {
                            return input;
                        },

                        step:function (am, e) {
                            e = e || $.Event();
                            var step = conf.step == 'any' ? 1 : conf.step;
                            self.setValue(value + step * (am || 1), e);
                        },

                        // HTML5 compatible name
                        stepUp:function (am) {
                            return self.step(am || 1);
                        },

                        // HTML5 compatible name
                        stepDown:function (am) {
                            return self.step(-am || -1);
                        }

                    });

                    // callbacks
                    $.each("onSlide,change".split(","), function (i, name) {

                        // from configuration
                        if ($.isFunction(conf[name])) {
                            $(self).on(name, conf[name]);
                        }

                        // API methods
                        self[name] = function (fn) {
                            if (fn) {
                                $(self).on(name, fn);
                            }
                            return self;
                        };
                    });


                    // dragging
                    handle.drag({drag:false}).on("dragStart",function () {

                        /* do some pre- calculations for seek() function. improves performance */
                        init();

                        // avoid redundant event triggering (= heavy stuff)
                        fireOnSlide = hasEvent($(self)) || hasEvent(input);


                    }).on("drag",function (e, y, x) {

                            if (input.is(":disabled")) {
                                return false;
                            }
                            slide(e, vertical ? y : x);

                        }).on("dragEnd",function (e) {
                            if (!e.isDefaultPrevented()) {
                                e.type = "change";
                                fire.trigger(e, [value]);
                            }

                        }).click(function (e) {
                            return e.preventDefault();
                        });

                    // clicking
                    root.click(function (e) {
                        if (input.is(":disabled") || e.target == handle[0]) {
                            return e.preventDefault();
                        }
                        init();
                        var fix = vertical ? handle.height() / 2 : handle.width() / 2;
                        slide(e, vertical ? len - origo - fix + e.pageY : e.pageX - origo - fix);
                    });

                    if (conf.keyboard) {

                        input.keydown(function (e) {

                            if (input.attr("readonly")) {
                                return;
                            }

                            var key = e.keyCode,
                                up = $([75, 76, 38, 33, 39]).index(key) != -1,
                                down = $([74, 72, 40, 34, 37]).index(key) != -1;

                            if ((up || down) && !(e.shiftKey || e.altKey || e.ctrlKey)) {

                                // UP: 	k=75, l=76, up=38, pageup=33, right=39
                                if (up) {
                                    self.step(key == 33 ? 10 : 1, e);

                                    // DOWN:	j=74, h=72, down=40, pagedown=34, left=37
                                } else if (down) {
                                    self.step(key == 34 ? -10 : -1, e);
                                }
                                return e.preventDefault();
                            }
                        });
                    }


                    input.blur(function (e) {
                        var val = $(this).val();
                        if (val !== value) {
                            self.setValue(val, e);
                        }
                    });


                    // HTML5 DOM methods
                    $.extend(input[0], { stepUp:self.stepUp, stepDown:self.stepDown});


                    // calculate all dimension related stuff
                    function init() {
                        vertical = conf.vertical || dim(root, "height") > dim(root, "width");

                        if (vertical) {
                            len = dim(root, "height") - dim(handle, "height");
                            origo = root.offset().top + len;

                        } else {
                            len = dim(root, "width") - dim(handle, "width");
                            origo = root.offset().left;
                        }
                    }

                    function begin() {
                        init();
                        self.setValue(conf.value !== undefined ? conf.value : conf.min);
                    }

                    begin();

                    // some browsers cannot get dimensions upon initialization
                    if (!len) {
                        $(window).load(begin);
                    }
                }

                $.expr[':'].range = function (el) {
                    var type = el.getAttribute("type");
                    return type && type == 'range' || !!$(el).filter("input").data("rangeinput");
                };

                // jQuery plugin implementation
                $.fn._rangeinput = function (conf) {

                    // already installed
                    if (this.data("rangeinput")) {
                        return this;
                    }

                    // extend configuration with globals
                    conf = $.extend(true, {}, defaultOptions, conf);

                    var els;

                    this.each(function () {
                        var el = new RangeInput($(this), $.extend(true, {}, conf));
                        var input = el.getInput().data("rangeinput", el);
                        els = els ? els.add(input) : input;
                    });

                    return els ? els : this;
                };

                this.$element._rangeinput(this.options);
            }
        };

        var widget = new Widget();
        widget.init();

    }(jQuery, this));
}));
