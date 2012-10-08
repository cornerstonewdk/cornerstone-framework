/* ===================================================
 * bootstrap-transition.js v2.1.0
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
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
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
 * bootstrap-affix.js v2.1.0
 * http://twitter.github.com/bootstrap/javascript.html#affix
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


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window).on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.1.0
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
 * bootstrap-button.js v2.1.0
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
 * bootstrap-carousel.js v2.1.0
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
      var $active = this.$element.find('.item.active')
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
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
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
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide', {
            relatedTarget: $next[0]
          })

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
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
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
 * bootstrap-collapse.js v2.1.0
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
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
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
    $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
      var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
      $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
      $(target).collapse(option)
    })
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.1.0
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

  var toggle = '[data-toggle=dropdown]'
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
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
        $this.focus()
      }

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider) a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    getParent($(toggle))
      .removeClass('open')
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
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
    $('html')
      .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown touchstart.dropdown.data-api', '.dropdown', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
      .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)
  })

}(window.jQuery);/* =========================================================
 * bootstrap-modal.js v2.1.0
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

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
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

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)
            .focus()

          that.enforceFocus()

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

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
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
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
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
      var $this = $(this)
        , href = $this.attr('href')
        , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

      e.preventDefault()

      $target
        .modal(option)
        .one('hide', function () {
          $this.focus()
        })
    })
  })

}(window.jQuery);/* ===========================================================
 * bootstrap-tooltip.js v2.1.0
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

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
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

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
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

      return this
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

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
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
  , html: true
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.1.0
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

  var Popover = function (element, options) {
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

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.options.html ? 'html' : 'text'](content)

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

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
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
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.1.0
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

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
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
              && $href.length
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

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function (option) {
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

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.1.0
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

  var Tab = function (element) {
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
 * bootstrap-typeahead.js v2.1.0
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
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
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
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = !~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
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
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /*   TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-cornerstone.js
 *  Description: 이 플러그인은 부트스트랩 플러그인들 중 코너스톤에 필요한 기능들을 추가한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

(function () {
    var _has_touch = ('ontouchstart' in window);

    /*
     Alert 기능 확장 : Close할때 마크업 삭제가 아닌 display none/block 처리 추가
     */
    this.Alert = (function () {
        var Alert;

        function Alert() {
        }

        Alert = $.fn.alert.Constructor;

        Alert.prototype.hide = function (type, next) {
            console.log("alert hello world");
        };

        $.fn.alert.Constructor = Alert;

    })();

    /*
     Carousel 스와이프 기능 추가
     스와이프 기능을 사용할 Carousel 영역에 data-slide="swipe" 를 선언하므로 작동
     */
    this.Carousel = (function () {
        var Carousel;

        function Carousel() {
        }

        Carousel = $.fn.carousel.Constructor;

        Carousel.prototype.activeSwipe = function () {
            var self;
            self = this;
            this.$element.swipe().live("swipeLeft",function (e, swipeEventObj) {
                if (!self.isActive) {
                    self.pause();
                    self.slide("next");
                    self.isActive = true;
                }
            }).live("swipeRight", function (e, swipeEventObj) {
                    if (!self.isActive) {
                        self.pause();
                        self.slide("prev");
                        self.isActive = true;
                    }
                });
            this.$element.live("slide",function (e) {
                return self.isActive = true;
            }).live("slid", function (e) {
                    self.isActive = false;
                });
        };

        $.fn.carousel.Constructor = Carousel;

        /*
         터치기반인 경우 Swipe 활성화
         */
        $(function () {
            $('[data-slide="swipe"]').carousel("activeSwipe");
        });

        return Carousel;

    })();

    /*
     Popover : DATA-API 방식을 추가함.
     */
    this.Popover = (function () {
        var Popover;

        function Popover() {
        }

        Popover = $.fn.popover.Constructor;

        /* 확장 코딩 */

        $.fn.popover.Constructor = Popover;


        /*
         DATA API 기능 추가 예정
         */
        $(function () {
            $('[data-toggle=popover]').each(function (i) {
                $(this).popover().live("click", function (e) {
                    e.preventDefault();
                });
            });
        });
    })();

    /*
     Tooltip : DATA-API 방식을 추가함.
     */
    this.Tooltip = (function () {
        var Tooltip;

        function Tooltip() {
        }

        Tooltip = $.fn.tooltip.Constructor;

        /* 확장 코딩 */

        $.fn.tooltip.Constructor = Tooltip;

        /*
         DATA API 기능 추가 예정
         */
        $(function () {
            $('[data-toggle="tooltip"]').tooltip({
                selector:"[rel=tooltip]"
            });
        });
    })();

}).call(this);
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-touch.js
 *  Description: 위젯 플러그인에서 사용되는 최소한의 터치이벤트를 구현한 플러그인으로 드래그와 스와이프 이벤트 등이 있다.
 *  Author: 김우섭
 *  License :
 */

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
    var _pos = {}, _offset, _touch_start_time, swipeTime = 350, swipeMinDistance = 10, _has_touch = ('ontouchstart' in window);

    /**
     * @class Touch
     * @constructor
     */
    var Touch = function () {
        var self = this;
        $(document).on("touchstart mousedown touchmove mousemove touchend mouseup", function (e) {

        });
    };

    Touch.prototype = {
        /**
         * get the x and y positions from the event object
         * @param  event
         * @return array  [{ x: int, y: int }]
         */
        getXYfromEvent:function (event) {
            event = event || window.event;

            // no touches, use the event pageX and pageY
            if (typeof event === "object" && !event.type.match("touch.*")) {
                var doc = document,
                    body = doc.body;

                return [
                    {
                        x:event.pageX || event.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && doc.clientLeft || 0 ),
                        y:event.pageY || event.clientY + ( doc && doc.scrollTop || body && body.scrollTop || 0 ) - ( doc && doc.clientTop || body && doc.clientTop || 0 )
                    }
                ];
            } else {
                // multitouch, return array with positions
                var pos = [], src, touches = event.touches.length > 0 ? event.touches : event.changedTouches;
                for (var t = 0, len = touches.length; t < len; t++) {
                    src = touches[t];
                    pos.push({ x:src.pageX, y:src.pageY });
                }
                return pos;
            }
        },

        getTouchPageXY:function (e) {
            if (e.type.match("touch.*")) {
                touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                e.pageX = touch.pageX;
                e.pageY = touch.pageY;
            }
        },

        /**
         * calculate the angle between two points
         * @param   object  pos1 { x: int, y: int }
         * @param   object  pos2 { x: int, y: int }
         */
        getAngle:function (pos1, pos2) {
            return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180 / Math.PI;
        },

        /**
         * angle to direction define
         * @param  float    angle
         * @return string   direction
         */
        getDirectionFromAngle:function (angle) {
            var directions = {
                down:angle >= 45 && angle < 135, //90
                left:angle >= 135 || angle <= -135, //180
                up:angle < -45 && angle > -135, //270
                right:angle >= -45 && angle <= 45 //0
            };

            var direction, key;
            for (key in directions) {
                if (directions[key]) {
                    direction = key;
                    break;
                }
            }
            return direction;
        },

        /**
         * count the number of fingers in the event
         * when no fingers are detected, one finger is returned (mouse pointer)
         * @param  event
         * @return int  fingers
         */
        countFingers:function (event) {
            // there is a bug on android (until v4?) that touches is always 1,
            // so no multitouch is supported, e.g. no, zoom and rotation...
            return event.touches ? event.touches.length : 1;
        },

        /**
         * trigger an event/callback by name with params
         * @param string name
         * @param array  params
         */
        triggerEvent:function (eventName, params) {
            // return touches object
            params.touches = this.getXYfromEvent(params.originalEvent);
            params.type = eventName;

            // trigger callback
            if (typeof self["on" + eventName] === "function") {
                self["on" + eventName].call(self, params);
            }
        },

        drag:function (element, option) {
            var doc, draggable, el, self = this;
            option = $.extend({x:true, y:true, drag:true}, option);
            doc = doc || $(document).on("mousedown mouseup touchstart touchend", function (e) {
                self.getTouchPageXY(e);

                var touch, offset, x0, y0, x, y;
                el = $(e.target);

                // 마우스와 터치 이벤트가 시작하고 타겟 엘리먼트가 드래그인 경우
                if (e.type.match("mousedown|touchstart") && el.data("drag")) {
                    offset = el.position(), x0 = e.pageX - offset.left, y0 = e.pageY - offset.top, x, y, start = true;

                    doc.on("mousemove.drag touchmove.drag", function (e) {
                        self.getTouchPageXY(e);
                        x = e.pageX - x0, y = e.pageY - y0, props = {};

                        if (option.x) {
                            props.left = x;
                        }
                        if (option.y) {
                            props.top = y;
                        }

                        if (start) {
                            el.trigger("dragStart");
                            start = false;
                        }

                        if (option.drag) {
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

            return element.data("drag", true);
        },

        swipe:function (element, option) {
            var doc, draggable, self = this, option = $.extend({x:true, y:true, swipe:true}, option),
                el = $(element), touch, offset, x0, y0, x, y;

            $("img", $(element)).on("mousedown", function () {
                return false;
            });

            el.on("touchstart",function (e) {
                _touch_start_time = new Date().getTime();
                _pos.start = self.getXYfromEvent(event);
                _fingers = self.countFingers(event);
                _first = true;
                _event_start = event;

                var box = $(this)[0].getBoundingClientRect();
                var clientTop = $(this)[0].clientTop || document.body.clientTop || 0;
                var clientLeft = $(this)[0].clientLeft || document.body.clientLeft || 0;
                var scrollTop = window.pageYOffset || $(this)[0].scrollTop || document.body.scrollTop;
                var scrollLeft = window.pageXOffset || $(this)[0].scrollLeft || document.body.scrollLeft;

                _offset = {
                    top:box.top + scrollTop - clientTop,
                    left:box.left + scrollLeft - clientLeft
                };

                offset = el.position(), x0 = e.pageX - offset.left, y0 = e.pageY - offset.top, x, y, start = true;

                e.preventDefault();
            }).on("touchend.swipe.*", function (e) {
                    _pos.move = self.getXYfromEvent(event);
                    if (!_pos.move) {
                        return;
                    }

                    // get the distance we moved
                    var _distance_x = _pos.move[0].x - _pos.start[0].x;
                    var _distance_y = _pos.move[0].y - _pos.start[0].y;
                    _distance = Math.sqrt(_distance_x * _distance_x + _distance_y * _distance_y);

                    // compare the kind of gesture by time
                    var now = new Date().getTime();
                    var touchTime = now - _touch_start_time;

                    console.log(swipeTime, touchTime, _distance, swipeMinDistance);
                    if ((swipeTime > touchTime) && (_distance > swipeMinDistance)) {
                        // calculate the angle
                        _angle = self.getAngle(_pos.start[0], _pos.move[0]);
                        _direction = self.getDirectionFromAngle(_angle);

                        _gesture = 'swipe';

                        var position = {
                            x:_pos.move[0].x - _offset.left,
                            y:_pos.move[0].y - _offset.top
                        };

                        var eventObj = {
                            originalEvent:event,
                            position:position,
                            direction:_direction,
                            distance:_distance,
                            distanceX:_distance_x,
                            distanceY:_distance_y,
                            angle:_angle
                        };

                        if (typeof eventObj.direction === "string" && eventObj.direction === "left") {
                            el.trigger("swipeLeft", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "right") {
                            el.trigger("swipeRight", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "up") {
                            el.trigger("swipeUp", eventObj);
                        } else if (typeof eventObj.direction === "string" && eventObj.direction === "down") {
                            el.trigger("swipeDown", eventObj);
                        }

                        el.trigger("swipe", eventObj);
                    }

                });
            return el.data("swipe", true);
        }
    };

    /**
     ### 사용법
     $().drag

     ### 플러그인 옵션

     |  이름  |   타입   | 기본값 | 설명
     |:------|:-------:|:----:|:------------:
     | x     | boolean | true | X축 드래그 활성화 여부
     | y     | boolean | true | Y축 드래그 활성화 여부
     | drag  | boolean | true | Drag 활성화 여부


     @method $().drag
     @param option{string} 드래그 플러그인의 사용자 설정값
     @return {jQuery} chainable jQuery 클래스
     */
    $.fn.drag = function (option) {
        var touch = new Touch();
        return touch.drag($(this), option);
    };

    /**
     ### 사용법
     $().swipe

     @method $().swipe
     @param option{string} 드래그 플러그인의 사용자 설정값
     @return {jQuery} chainable jQuery 클래스
     */
    $.fn.swipe = function (option) {
        var touch = new Touch();
        return touch.swipe($(this), option);
    };

}))
;/*!
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
jQuery.fn.motioncaptcha || (function ($) {

    /**
     * Main plugin function definition
     */
    $.fn.motioncaptcha = function (options) {

        /**
         * Act on matched form element:
         * This could be set up to iterate over multiple elements, but tbh would it ever be useful?
         */
        return this.each(function () {

            // Build main options before element iteration:
            var opts = $.extend({}, $.fn.motioncaptcha.defaults, options);

            // Ensure option ID params are valid #selectors:
            opts.actionId = "#" + opts.actionId.replace(/\#/g, "");
            opts.canvasId = "#" + opts.canvasId.replace(/\#/g, "");
            opts.divId = "#" + opts.divId.replace(/\#/g, "");
            opts.submitId = ( opts.submitId ) ? "#" + opts.submitId.replace(/\#/g, "") : false;

            // Plugin setup:

            // Set up Harmony vars:
            var brush,
                locked = false;

            // Set up MotionCAPTCHA form and jQuery elements:
            var $body = $("body"),
                $form = $(this),
                $container = $(opts.divId),
                $canvas = $(opts.canvasId);

            // Set up MotionCAPTCHA canvas vars:
            var canvasWidth = $canvas.width(),
                canvasHeight = $canvas.height(),
                borderLeftWidth = parseInt($canvas.css("borderLeftWidth").replace("px", "")),
                borderTopWidth = parseInt($canvas.css("borderTopWidth").replace("px", ""));

            // Canvas setup:

            // Set the canvas DOM element"s dimensions to match the display width/height (pretty important):
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
            $canvas.addClass(opts.shapes[Math.floor(Math.random() * (opts.shapes.length))]);

            // Set up Dollar Recognizer and drawing vars:
            var _isDown = false,
                _holdStill = false,
                _points = [],
                _r = new DollarRecognizer();

            // Create the Harmony Ribbon brush:
            brush = new Simple(ctx);


            // Mousedown event
            // Start Harmony brushstroke and begin recording DR points:
            var touchStartEvent = function (event) {
                if (locked)
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
                $("body").addClass("mc-noselect");

                // Clear canvas:
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                // Start brushstroke:
                brush.strokeStart(x, y);

                // Remove "mc-invalid" and "mc-valid" classes from canvas:
                $canvas.removeClass("mc-invalid mc-valid");

                // Add the first point to the points array:
                _points = [NewPoint(x, y)];

                return false;
            }; // mousedown/touchstart event

            // Mousemove event:
            var touchMoveEvent = function (event) {
                if (_holdStill) {
                    return _holdStill = 0;
                }
                // If mouse is down and canvas not locked:
                if (!locked && _isDown) {

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
            var touchEndEvent = function (event) {
                // If mouse is down and canvas not locked:
                if (!locked && _isDown) {
                    _isDown = false;

                    // Allow text-selection again:
                    $("body").removeClass("mc-noselect");

                    // Dollar Recognizer result:
                    if (_points.length >= 10) {
                        var result = _r.Recognize(_points);
                        // Check result:
                        if ($canvas.attr("class").match(result.Name) && result.Score > 0.7) {

                            // Lock the canvas:
                            locked = 1;

                            // Destroy the Harmony brush (give it time to finish drawing)
                            setTimeout(brush.destroy, 500);

                            // Add "mc-valid" class to canvas:
                            $canvas.addClass("mc-valid");

                            // Write success message into canvas:
                            ctx.fillText(opts.successMsg, 10, 24);

                            // Call the onSuccess function to handle the rest of the business:
                            // Pass in the form, the canvas, the canvas context:
                            opts.onSuccess($form, $canvas, ctx);

                        } else {

                            // Add "mc-invalid" class to canvas:
                            $canvas.addClass("mc-invalid");

                            // Write error message into canvas:
                            ctx.fillText(opts.errorMsg, 10, 24);

                            // Pass off to the error callback to finish up:
                            opts.onError($form, $canvas, ctx);
                        }

                    } else { // fewer than 10 points were recorded:

                        // Add "mc-invalid" class to canvas:
                        $canvas.addClass("mc-invalid");

                        // Write error message into canvas:
                        ctx.fillText(opts.errorMsg, 10, 24);

                        // Pass off to the error callback to finish up:
                        opts.onError($form, $canvas, ctx);
                    }
                }
                return false;
            }; // mouseup/touchend event

            // 터치 기반이 아닌 환경에서만 마우스 이벤트 활성화
            if(!("ontouchstart" in window)) {
                $canvas.bind({
                    mousedown:touchStartEvent,
                    mousemove:touchMoveEvent,
                    mouseup:touchEndEvent
                });
            }

            // Mobile touch events:
            $canvas[0].addEventListener("touchstart", touchStartEvent, false);
            $canvas[0].addEventListener("touchmove", touchMoveEvent, false);
            $canvas[0].addEventListener("touchend", touchEndEvent, false);

            // Add active CSS class to form:
            $form.addClass(opts.cssClass.replace(/\./, ""))


            /**
             * Get X/Y mouse position, relative to (/inside) the canvas
             *
             * Handles cross-browser quirks rather nicely, I feel.
             *
             * @todo For 1.0, if no way to obtain coordinates, don"t activate MotionCAPTCHA.
             */
            function getPos(event) {
                var x, y;

                // Check for mobile first to avoid android jumpy-touch bug (iOS / Android):
                if (typeof event.touches === "object" && event.touches.length > 0) {
                    // iOS/android uses event.touches, relative to entire page:
                    x = event.touches[0].pageX - $canvas.offset().left + borderLeftWidth;
                    y = event.touches[0].pageY - $canvas.offset().top + borderTopWidth;
                } else if (event.offsetX) {
                    // Chrome/Safari give the event offset relative to the target event:
                    x = event.offsetX - borderLeftWidth;
                    y = event.offsetY - borderTopWidth;
                } else {
                    // Otherwise, subtract page click from canvas offset (Firefox uses this):
                    x = event.pageX - $canvas.offset().left - borderLeftWidth;
                    y = event.pageY - $canvas.offset().top - borderTopWidth;
                }

                return [x, y];
            }

        }); // this.each

    } // end main plugin function


    /**
     * Exposed default plugin settings, which can be overridden in plugin call.
     */
    $.fn.motioncaptcha.defaults = {
        actionId:"#mc-action", // The ID of the input containing the form action
        divId:"#mc", // If you use an ID other than "#mc" for the placeholder, pass it in here
        canvasId:"#mc-canvas", // The ID of the MotionCAPTCHA canvas element
        submitId:false, // If your form has multiple submit buttons, give the ID of the main one here
        cssClass:".mc-active", // This CSS class is applied to the form, when the plugin is active

        // An array of shape names that you want MotionCAPTCHA to use:
        shapes:["triangle", "x", "rectangle", "circle", "check", "caret", "zigzag", "arrow", "leftbracket", "rightbracket", "v", "delete", "star", "pigtail"],

        // Canvas vars:
        canvasFont:"15px 'Lucida Grande'",
        canvasTextColor:"#111",

        // These messages are displayed inside the canvas after a user finishes drawing:
        errorMsg:"Please try again.",
        successMsg:"Captcha passed!",

        // This message is displayed if the user"s browser doesn"t support canvas:
        noCanvasMsg:"Your browser doesn't support <canvas> - try Chrome, FF4, Safari or IE9.",

        // This could be any HTML string (eg. "<label>Draw this shit yo:</label>"):
        label:"<p>Please draw the shape in the box to submit the form:</p>",

        // Callback function to execute when a user successfully draws the shape
        // Passed in the form, the canvas and the canvas context
        // Scope (this) is active plugin options object (opts)
        // NB: The default onSuccess callback function enables the submit button, and adds the form action attribute:
        onSuccess:function ($form, $canvas, ctx) {
            var opts = this,
                $submit = opts.submitId ? $form.find(opts.submitId) : $form.find("input[type=submit]:disabled");

            // Set the form action:
            $form.attr("action", $(opts.actionId).val());

            // Enable the submit button:
            $submit.prop("disabled", false);
        },

        // Callback function to execute when a user successfully draws the shape
        // Passed in the form, the canvas and the canvas context
        // Scope (this) is active plugin options object (opts)
        onError:function ($form, $canvas, ctx) {
            var opts = this;
        }
    };


    /*!
     * Harmony | mrdoob | Ribbon Brush class
     * http://mrdoob.com/projects/harmony/
     */
    function Simple(context) {
        this.init(context);
    }

    Simple.prototype = {
        context:null,

        prevMouseX:null, prevMouseY:null,

        init:function (context) {
            this.context = context;
            this.context.globalCompositeOperation = "source-over";
            this.context.lineWidth = 3;
        },

        destroy:function () {
        },

        strokeStart:function (mouseX, mouseY) {
            COLOR = [0, 0, 0];
            this.prevMouseX = mouseX;
            this.prevMouseY = mouseY;

            this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.5)";
        },

        stroke:function (mouseX, mouseY) {
            this.context.beginPath();
            this.context.moveTo(this.prevMouseX, this.prevMouseY);
            this.context.lineTo(mouseX, mouseY);
            this.context.stroke();

            this.prevMouseX = mouseX;
            this.prevMouseY = mouseY;
        },

        strokeEnd:function () {

        }
    }


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
        Origin = NewPoint(0, 0);

    // DollarRecognizer class
    function DollarRecognizer() {

        // Predefined templates for each gesture type:
        this.Templates = [];

        this.Templates.push(new Template("triangle", [NewPoint(137, 139), NewPoint(135, 141), NewPoint(133, 144), NewPoint(132, 146), NewPoint(130, 149), NewPoint(128, 151), NewPoint(126, 155), NewPoint(123, 160), NewPoint(120, 166), NewPoint(116, 171), NewPoint(112, 177), NewPoint(107, 183), NewPoint(102, 188), NewPoint(100, 191), NewPoint(95, 195), NewPoint(90, 199), NewPoint(86, 203), NewPoint(82, 206), NewPoint(80, 209), NewPoint(75, 213), NewPoint(73, 213), NewPoint(70, 216), NewPoint(67, 219), NewPoint(64, 221), NewPoint(61, 223), NewPoint(60, 225), NewPoint(62, 226), NewPoint(65, 225), NewPoint(67, 226), NewPoint(74, 226), NewPoint(77, 227), NewPoint(85, 229), NewPoint(91, 230), NewPoint(99, 231), NewPoint(108, 232), NewPoint(116, 233), NewPoint(125, 233), NewPoint(134, 234), NewPoint(145, 233), NewPoint(153, 232), NewPoint(160, 233), NewPoint(170, 234), NewPoint(177, 235), NewPoint(179, 236), NewPoint(186, 237), NewPoint(193, 238), NewPoint(198, 239), NewPoint(200, 237), NewPoint(202, 239), NewPoint(204, 238), NewPoint(206, 234), NewPoint(205, 230), NewPoint(202, 222), NewPoint(197, 216), NewPoint(192, 207), NewPoint(186, 198), NewPoint(179, 189), NewPoint(174, 183), NewPoint(170, 178), NewPoint(164, 171), NewPoint(161, 168), NewPoint(154, 160), NewPoint(148, 155), NewPoint(143, 150), NewPoint(138, 148), NewPoint(136, 148)]));

        this.Templates.push(new Template("x", [NewPoint(87, 142), NewPoint(89, 145), NewPoint(91, 148), NewPoint(93, 151), NewPoint(96, 155), NewPoint(98, 157), NewPoint(100, 160), NewPoint(102, 162), NewPoint(106, 167), NewPoint(108, 169), NewPoint(110, 171), NewPoint(115, 177), NewPoint(119, 183), NewPoint(123, 189), NewPoint(127, 193), NewPoint(129, 196), NewPoint(133, 200), NewPoint(137, 206), NewPoint(140, 209), NewPoint(143, 212), NewPoint(146, 215), NewPoint(151, 220), NewPoint(153, 222), NewPoint(155, 223), NewPoint(157, 225), NewPoint(158, 223), NewPoint(157, 218), NewPoint(155, 211), NewPoint(154, 208), NewPoint(152, 200), NewPoint(150, 189), NewPoint(148, 179), NewPoint(147, 170), NewPoint(147, 158), NewPoint(147, 148), NewPoint(147, 141), NewPoint(147, 136), NewPoint(144, 135), NewPoint(142, 137), NewPoint(140, 139), NewPoint(135, 145), NewPoint(131, 152), NewPoint(124, 163), NewPoint(116, 177), NewPoint(108, 191), NewPoint(100, 206), NewPoint(94, 217), NewPoint(91, 222), NewPoint(89, 225), NewPoint(87, 226), NewPoint(87, 224)]));

        this.Templates.push(new Template("rectangle", [NewPoint(78, 149), NewPoint(78, 153), NewPoint(78, 157), NewPoint(78, 160), NewPoint(79, 162), NewPoint(79, 164), NewPoint(79, 167), NewPoint(79, 169), NewPoint(79, 173), NewPoint(79, 178), NewPoint(79, 183), NewPoint(80, 189), NewPoint(80, 193), NewPoint(80, 198), NewPoint(80, 202), NewPoint(81, 208), NewPoint(81, 210), NewPoint(81, 216), NewPoint(82, 222), NewPoint(82, 224), NewPoint(82, 227), NewPoint(83, 229), NewPoint(83, 231), NewPoint(85, 230), NewPoint(88, 232), NewPoint(90, 233), NewPoint(92, 232), NewPoint(94, 233), NewPoint(99, 232), NewPoint(102, 233), NewPoint(106, 233), NewPoint(109, 234), NewPoint(117, 235), NewPoint(123, 236), NewPoint(126, 236), NewPoint(135, 237), NewPoint(142, 238), NewPoint(145, 238), NewPoint(152, 238), NewPoint(154, 239), NewPoint(165, 238), NewPoint(174, 237), NewPoint(179, 236), NewPoint(186, 235), NewPoint(191, 235), NewPoint(195, 233), NewPoint(197, 233), NewPoint(200, 233), NewPoint(201, 235), NewPoint(201, 233), NewPoint(199, 231), NewPoint(198, 226), NewPoint(198, 220), NewPoint(196, 207), NewPoint(195, 195), NewPoint(195, 181), NewPoint(195, 173), NewPoint(195, 163), NewPoint(194, 155), NewPoint(192, 145), NewPoint(192, 143), NewPoint(192, 138), NewPoint(191, 135), NewPoint(191, 133), NewPoint(191, 130), NewPoint(190, 128), NewPoint(188, 129), NewPoint(186, 129), NewPoint(181, 132), NewPoint(173, 131), NewPoint(162, 131), NewPoint(151, 132), NewPoint(149, 132), NewPoint(138, 132), NewPoint(136, 132), NewPoint(122, 131), NewPoint(120, 131), NewPoint(109, 130), NewPoint(107, 130), NewPoint(90, 132), NewPoint(81, 133), NewPoint(76, 133)]));

        this.Templates.push(new Template("circle", [NewPoint(127, 141), NewPoint(124, 140), NewPoint(120, 139), NewPoint(118, 139), NewPoint(116, 139), NewPoint(111, 140), NewPoint(109, 141), NewPoint(104, 144), NewPoint(100, 147), NewPoint(96, 152), NewPoint(93, 157), NewPoint(90, 163), NewPoint(87, 169), NewPoint(85, 175), NewPoint(83, 181), NewPoint(82, 190), NewPoint(82, 195), NewPoint(83, 200), NewPoint(84, 205), NewPoint(88, 213), NewPoint(91, 216), NewPoint(96, 219), NewPoint(103, 222), NewPoint(108, 224), NewPoint(111, 224), NewPoint(120, 224), NewPoint(133, 223), NewPoint(142, 222), NewPoint(152, 218), NewPoint(160, 214), NewPoint(167, 210), NewPoint(173, 204), NewPoint(178, 198), NewPoint(179, 196), NewPoint(182, 188), NewPoint(182, 177), NewPoint(178, 167), NewPoint(170, 150), NewPoint(163, 138), NewPoint(152, 130), NewPoint(143, 129), NewPoint(140, 131), NewPoint(129, 136), NewPoint(126, 139)]));

        this.Templates.push(new Template("check", [NewPoint(91, 185), NewPoint(93, 185), NewPoint(95, 185), NewPoint(97, 185), NewPoint(100, 188), NewPoint(102, 189), NewPoint(104, 190), NewPoint(106, 193), NewPoint(108, 195), NewPoint(110, 198), NewPoint(112, 201), NewPoint(114, 204), NewPoint(115, 207), NewPoint(117, 210), NewPoint(118, 212), NewPoint(120, 214), NewPoint(121, 217), NewPoint(122, 219), NewPoint(123, 222), NewPoint(124, 224), NewPoint(126, 226), NewPoint(127, 229), NewPoint(129, 231), NewPoint(130, 233), NewPoint(129, 231), NewPoint(129, 228), NewPoint(129, 226), NewPoint(129, 224), NewPoint(129, 221), NewPoint(129, 218), NewPoint(129, 212), NewPoint(129, 208), NewPoint(130, 198), NewPoint(132, 189), NewPoint(134, 182), NewPoint(137, 173), NewPoint(143, 164), NewPoint(147, 157), NewPoint(151, 151), NewPoint(155, 144), NewPoint(161, 137), NewPoint(165, 131), NewPoint(171, 122), NewPoint(174, 118), NewPoint(176, 114), NewPoint(177, 112), NewPoint(177, 114), NewPoint(175, 116), NewPoint(173, 118)]));

        this.Templates.push(new Template("caret", [NewPoint(79, 245), NewPoint(79, 242), NewPoint(79, 239), NewPoint(80, 237), NewPoint(80, 234), NewPoint(81, 232), NewPoint(82, 230), NewPoint(84, 224), NewPoint(86, 220), NewPoint(86, 218), NewPoint(87, 216), NewPoint(88, 213), NewPoint(90, 207), NewPoint(91, 202), NewPoint(92, 200), NewPoint(93, 194), NewPoint(94, 192), NewPoint(96, 189), NewPoint(97, 186), NewPoint(100, 179), NewPoint(102, 173), NewPoint(105, 165), NewPoint(107, 160), NewPoint(109, 158), NewPoint(112, 151), NewPoint(115, 144), NewPoint(117, 139), NewPoint(119, 136), NewPoint(119, 134), NewPoint(120, 132), NewPoint(121, 129), NewPoint(122, 127), NewPoint(124, 125), NewPoint(126, 124), NewPoint(129, 125), NewPoint(131, 127), NewPoint(132, 130), NewPoint(136, 139), NewPoint(141, 154), NewPoint(145, 166), NewPoint(151, 182), NewPoint(156, 193), NewPoint(157, 196), NewPoint(161, 209), NewPoint(162, 211), NewPoint(167, 223), NewPoint(169, 229), NewPoint(170, 231), NewPoint(173, 237), NewPoint(176, 242), NewPoint(177, 244), NewPoint(179, 250), NewPoint(181, 255), NewPoint(182, 257)]));

        this.Templates.push(new Template("zigzag", [NewPoint(307, 216), NewPoint(333, 186), NewPoint(356, 215), NewPoint(375, 186), NewPoint(399, 216), NewPoint(418, 186)]));

        this.Templates.push(new Template("arrow", [NewPoint(68, 222), NewPoint(70, 220), NewPoint(73, 218), NewPoint(75, 217), NewPoint(77, 215), NewPoint(80, 213), NewPoint(82, 212), NewPoint(84, 210), NewPoint(87, 209), NewPoint(89, 208), NewPoint(92, 206), NewPoint(95, 204), NewPoint(101, 201), NewPoint(106, 198), NewPoint(112, 194), NewPoint(118, 191), NewPoint(124, 187), NewPoint(127, 186), NewPoint(132, 183), NewPoint(138, 181), NewPoint(141, 180), NewPoint(146, 178), NewPoint(154, 173), NewPoint(159, 171), NewPoint(161, 170), NewPoint(166, 167), NewPoint(168, 167), NewPoint(171, 166), NewPoint(174, 164), NewPoint(177, 162), NewPoint(180, 160), NewPoint(182, 158), NewPoint(183, 156), NewPoint(181, 154), NewPoint(178, 153), NewPoint(171, 153), NewPoint(164, 153), NewPoint(160, 153), NewPoint(150, 154), NewPoint(147, 155), NewPoint(141, 157), NewPoint(137, 158), NewPoint(135, 158), NewPoint(137, 158), NewPoint(140, 157), NewPoint(143, 156), NewPoint(151, 154), NewPoint(160, 152), NewPoint(170, 149), NewPoint(179, 147), NewPoint(185, 145), NewPoint(192, 144), NewPoint(196, 144), NewPoint(198, 144), NewPoint(200, 144), NewPoint(201, 147), NewPoint(199, 149), NewPoint(194, 157), NewPoint(191, 160), NewPoint(186, 167), NewPoint(180, 176), NewPoint(177, 179), NewPoint(171, 187), NewPoint(169, 189), NewPoint(165, 194), NewPoint(164, 196)]));

        this.Templates.push(new Template("leftbracket", [NewPoint(140, 124), NewPoint(138, 123), NewPoint(135, 122), NewPoint(133, 123), NewPoint(130, 123), NewPoint(128, 124), NewPoint(125, 125), NewPoint(122, 124), NewPoint(120, 124), NewPoint(118, 124), NewPoint(116, 125), NewPoint(113, 125), NewPoint(111, 125), NewPoint(108, 124), NewPoint(106, 125), NewPoint(104, 125), NewPoint(102, 124), NewPoint(100, 123), NewPoint(98, 123), NewPoint(95, 124), NewPoint(93, 123), NewPoint(90, 124), NewPoint(88, 124), NewPoint(85, 125), NewPoint(83, 126), NewPoint(81, 127), NewPoint(81, 129), NewPoint(82, 131), NewPoint(82, 134), NewPoint(83, 138), NewPoint(84, 141), NewPoint(84, 144), NewPoint(85, 148), NewPoint(85, 151), NewPoint(86, 156), NewPoint(86, 160), NewPoint(86, 164), NewPoint(86, 168), NewPoint(87, 171), NewPoint(87, 175), NewPoint(87, 179), NewPoint(87, 182), NewPoint(87, 186), NewPoint(88, 188), NewPoint(88, 195), NewPoint(88, 198), NewPoint(88, 201), NewPoint(88, 207), NewPoint(89, 211), NewPoint(89, 213), NewPoint(89, 217), NewPoint(89, 222), NewPoint(88, 225), NewPoint(88, 229), NewPoint(88, 231), NewPoint(88, 233), NewPoint(88, 235), NewPoint(89, 237), NewPoint(89, 240), NewPoint(89, 242), NewPoint(91, 241), NewPoint(94, 241), NewPoint(96, 240), NewPoint(98, 239), NewPoint(105, 240), NewPoint(109, 240), NewPoint(113, 239), NewPoint(116, 240), NewPoint(121, 239), NewPoint(130, 240), NewPoint(136, 237), NewPoint(139, 237), NewPoint(144, 238), NewPoint(151, 237), NewPoint(157, 236), NewPoint(159, 237)]));

        this.Templates.push(new Template("rightbracket", [NewPoint(112, 138), NewPoint(112, 136), NewPoint(115, 136), NewPoint(118, 137), NewPoint(120, 136), NewPoint(123, 136), NewPoint(125, 136), NewPoint(128, 136), NewPoint(131, 136), NewPoint(134, 135), NewPoint(137, 135), NewPoint(140, 134), NewPoint(143, 133), NewPoint(145, 132), NewPoint(147, 132), NewPoint(149, 132), NewPoint(152, 132), NewPoint(153, 134), NewPoint(154, 137), NewPoint(155, 141), NewPoint(156, 144), NewPoint(157, 152), NewPoint(158, 161), NewPoint(160, 170), NewPoint(162, 182), NewPoint(164, 192), NewPoint(166, 200), NewPoint(167, 209), NewPoint(168, 214), NewPoint(168, 216), NewPoint(169, 221), NewPoint(169, 223), NewPoint(169, 228), NewPoint(169, 231), NewPoint(166, 233), NewPoint(164, 234), NewPoint(161, 235), NewPoint(155, 236), NewPoint(147, 235), NewPoint(140, 233), NewPoint(131, 233), NewPoint(124, 233), NewPoint(117, 235), NewPoint(114, 238), NewPoint(112, 238)]));

        this.Templates.push(new Template("v", [NewPoint(89, 164), NewPoint(90, 162), NewPoint(92, 162), NewPoint(94, 164), NewPoint(95, 166), NewPoint(96, 169), NewPoint(97, 171), NewPoint(99, 175), NewPoint(101, 178), NewPoint(103, 182), NewPoint(106, 189), NewPoint(108, 194), NewPoint(111, 199), NewPoint(114, 204), NewPoint(117, 209), NewPoint(119, 214), NewPoint(122, 218), NewPoint(124, 222), NewPoint(126, 225), NewPoint(128, 228), NewPoint(130, 229), NewPoint(133, 233), NewPoint(134, 236), NewPoint(136, 239), NewPoint(138, 240), NewPoint(139, 242), NewPoint(140, 244), NewPoint(142, 242), NewPoint(142, 240), NewPoint(142, 237), NewPoint(143, 235), NewPoint(143, 233), NewPoint(145, 229), NewPoint(146, 226), NewPoint(148, 217), NewPoint(149, 208), NewPoint(149, 205), NewPoint(151, 196), NewPoint(151, 193), NewPoint(153, 182), NewPoint(155, 172), NewPoint(157, 165), NewPoint(159, 160), NewPoint(162, 155), NewPoint(164, 150), NewPoint(165, 148), NewPoint(166, 146)]));

        this.Templates.push(new Template("delete", [NewPoint(123, 129), NewPoint(123, 131), NewPoint(124, 133), NewPoint(125, 136), NewPoint(127, 140), NewPoint(129, 142), NewPoint(133, 148), NewPoint(137, 154), NewPoint(143, 158), NewPoint(145, 161), NewPoint(148, 164), NewPoint(153, 170), NewPoint(158, 176), NewPoint(160, 178), NewPoint(164, 183), NewPoint(168, 188), NewPoint(171, 191), NewPoint(175, 196), NewPoint(178, 200), NewPoint(180, 202), NewPoint(181, 205), NewPoint(184, 208), NewPoint(186, 210), NewPoint(187, 213), NewPoint(188, 215), NewPoint(186, 212), NewPoint(183, 211), NewPoint(177, 208), NewPoint(169, 206), NewPoint(162, 205), NewPoint(154, 207), NewPoint(145, 209), NewPoint(137, 210), NewPoint(129, 214), NewPoint(122, 217), NewPoint(118, 218), NewPoint(111, 221), NewPoint(109, 222), NewPoint(110, 219), NewPoint(112, 217), NewPoint(118, 209), NewPoint(120, 207), NewPoint(128, 196), NewPoint(135, 187), NewPoint(138, 183), NewPoint(148, 167), NewPoint(157, 153), NewPoint(163, 145), NewPoint(165, 142), NewPoint(172, 133), NewPoint(177, 127), NewPoint(179, 127), NewPoint(180, 125)]));

        this.Templates.push(new Template("star", [NewPoint(75, 250), NewPoint(75, 247), NewPoint(77, 244), NewPoint(78, 242), NewPoint(79, 239), NewPoint(80, 237), NewPoint(82, 234), NewPoint(82, 232), NewPoint(84, 229), NewPoint(85, 225), NewPoint(87, 222), NewPoint(88, 219), NewPoint(89, 216), NewPoint(91, 212), NewPoint(92, 208), NewPoint(94, 204), NewPoint(95, 201), NewPoint(96, 196), NewPoint(97, 194), NewPoint(98, 191), NewPoint(100, 185), NewPoint(102, 178), NewPoint(104, 173), NewPoint(104, 171), NewPoint(105, 164), NewPoint(106, 158), NewPoint(107, 156), NewPoint(107, 152), NewPoint(108, 145), NewPoint(109, 141), NewPoint(110, 139), NewPoint(112, 133), NewPoint(113, 131), NewPoint(116, 127), NewPoint(117, 125), NewPoint(119, 122), NewPoint(121, 121), NewPoint(123, 120), NewPoint(125, 122), NewPoint(125, 125), NewPoint(127, 130), NewPoint(128, 133), NewPoint(131, 143), NewPoint(136, 153), NewPoint(140, 163), NewPoint(144, 172), NewPoint(145, 175), NewPoint(151, 189), NewPoint(156, 201), NewPoint(161, 213), NewPoint(166, 225), NewPoint(169, 233), NewPoint(171, 236), NewPoint(174, 243), NewPoint(177, 247), NewPoint(178, 249), NewPoint(179, 251), NewPoint(180, 253), NewPoint(180, 255), NewPoint(179, 257), NewPoint(177, 257), NewPoint(174, 255), NewPoint(169, 250), NewPoint(164, 247), NewPoint(160, 245), NewPoint(149, 238), NewPoint(138, 230), NewPoint(127, 221), NewPoint(124, 220), NewPoint(112, 212), NewPoint(110, 210), NewPoint(96, 201), NewPoint(84, 195), NewPoint(74, 190), NewPoint(64, 182), NewPoint(55, 175), NewPoint(51, 172), NewPoint(49, 170), NewPoint(51, 169), NewPoint(56, 169), NewPoint(66, 169), NewPoint(78, 168), NewPoint(92, 166), NewPoint(107, 164), NewPoint(123, 161), NewPoint(140, 162), NewPoint(156, 162), NewPoint(171, 160), NewPoint(173, 160), NewPoint(186, 160), NewPoint(195, 160), NewPoint(198, 161), NewPoint(203, 163), NewPoint(208, 163), NewPoint(206, 164), NewPoint(200, 167), NewPoint(187, 172), NewPoint(174, 179), NewPoint(172, 181), NewPoint(153, 192), NewPoint(137, 201), NewPoint(123, 211), NewPoint(112, 220), NewPoint(99, 229), NewPoint(90, 237), NewPoint(80, 244), NewPoint(73, 250), NewPoint(69, 254), NewPoint(69, 252)]));

        this.Templates.push(new Template("pigtail", [NewPoint(81, 219), NewPoint(84, 218), NewPoint(86, 220), NewPoint(88, 220), NewPoint(90, 220), NewPoint(92, 219), NewPoint(95, 220), NewPoint(97, 219), NewPoint(99, 220), NewPoint(102, 218), NewPoint(105, 217), NewPoint(107, 216), NewPoint(110, 216), NewPoint(113, 214), NewPoint(116, 212), NewPoint(118, 210), NewPoint(121, 208), NewPoint(124, 205), NewPoint(126, 202), NewPoint(129, 199), NewPoint(132, 196), NewPoint(136, 191), NewPoint(139, 187), NewPoint(142, 182), NewPoint(144, 179), NewPoint(146, 174), NewPoint(148, 170), NewPoint(149, 168), NewPoint(151, 162), NewPoint(152, 160), NewPoint(152, 157), NewPoint(152, 155), NewPoint(152, 151), NewPoint(152, 149), NewPoint(152, 146), NewPoint(149, 142), NewPoint(148, 139), NewPoint(145, 137), NewPoint(141, 135), NewPoint(139, 135), NewPoint(134, 136), NewPoint(130, 140), NewPoint(128, 142), NewPoint(126, 145), NewPoint(122, 150), NewPoint(119, 158), NewPoint(117, 163), NewPoint(115, 170), NewPoint(114, 175), NewPoint(117, 184), NewPoint(120, 190), NewPoint(125, 199), NewPoint(129, 203), NewPoint(133, 208), NewPoint(138, 213), NewPoint(145, 215), NewPoint(155, 218), NewPoint(164, 219), NewPoint(166, 219), NewPoint(177, 219), NewPoint(182, 218), NewPoint(192, 216), NewPoint(196, 213), NewPoint(199, 212), NewPoint(201, 211)]));


        // $1 Gesture Recognizer API (now using Protractor instead)
        this.Recognize = function (points) {
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
                newpoints[newpoints.length] = q; // append new point "q"
                points.splice(i, 0, q); // insert "q" at position i in points s.t. "q" will be the next i
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
        for (i = 0; i < points.length; i++) {
            vector[vector.length] = points[i].X;
            vector[vector.length] = points[i].Y;
            sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
        }
        magnitude = Math.sqrt(sum);
        for (i = 0; i < vector.length; i++)
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

})(jQuery);/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-rangeinput.js
 *  Description: 범위 입력상자는 HTML5 요소이지만 webkit 기반외의 브라우저에서 작동하지 않으므로 다른 브라우저에서도 정상적으로 작동하도록 구현한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

// 세미콜론은 패키징 작업시 앞쪽 스크립트가 닫지 않은 경우 오류를 사전에 막기 위함
;
(function (root, doc, factory) {
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
    /**
     Provides more functionality for the widget module..

     @module widget
     @submodule widget-foo
     @main widget
     **/
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
            progress:'slider-bar',
            handle:'slide-handle'
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

            root = $("<div><div></div><button></button></div>").data("rangeinput", self),
            vertical,
            value, // current value
            origo, // handle's start point
            len, // length of the range
            pos; // current position of the handle

        // UI 엘리먼트 생성
        input.before(root);

        var handle = root.addClass(css.slider).find("button").addClass(css.handle),
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

            clone.addClass("figure inline");
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
        } else {
            root.addClass("inline");
            root.css({
                width: root.width() - (input.width() * 2),
                marginRight: input.width() * 0.25,
                float:"left"
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


            if (input[0].value == val) {
                return self;
            }

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
                if (false && conf.progress) {
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

            if (!this.insertingValue && input[0].value != val) {
                this.insertingValue = true;
                input[0].value = val;
                this.insertingValue = false;
            } else {
                return self;
            }

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
    $.fn.rangeinput = function (conf) {

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
    if (navigator.userAgent.match("Android.*/4.0 Mobile Safari/")) {
        $("input[type=range]").each(function (i) {
            var options = $(this).data("rangeOptions");

            $(this).addClass("range-android").parent().addClass("range-android");

            if (typeof options === "object" && options.inputShow) {
                var $rangeTarget = $(this), $numTarget = $("<input type='tel' value='" + $rangeTarget.val() + "' class='widget-range btn-block figure range inline' />");

                $rangeTarget.on("change", function () {
                    $numTarget.val($(this).val());
                });

                $numTarget.insertAfter($rangeTarget).on("change", function (e) {
                    $rangeTarget.val($(this).val());
                });

                $rangeTarget.addClass("inline");
                $rangeTarget.css({
                    width: $rangeTarget.width() - ($numTarget.width() * 2),
                    marginRight: $numTarget.width() * 0.2,
                    float:"left"
                });

                $numTarget.removeClass("btn-block");

            }
        });
    } else {
        $("input[type=range]").each(function (i) {
            var options = $(this).data("rangeOptions");
            $(this).rangeinput(options);
        });
    }
}));
/** @preserve
 sign v2
 Copyright (c) 2012 Willow Systems Corp http://willow-systems.com
 Copyright (c) 2010 Brinley Ang http://www.unbolt.net
 MIT License <http://www.opensource.org/licenses/mit-license.php>

 */
;
(function () {

    var Initializer = function ($) {

        /// Returns front, back and "decor" colors derived from element (as jQuery obj)
        function getColors($e) {
            var tmp
                , undef
                , frontcolor = $e.css('color')
                , backcolor

            while (backcolor === undef && $e !== undef) {
                try {
                    tmp = $e.css('background-color')
                } catch (ex) {
                    tmp = 'transparent'
                }
                if (tmp !== 'transparent' && tmp !== 'rgba(0, 0, 0, 0)') {
                    backcolor = tmp
                }
                try {
                    $e = $e.parent()
                    if ($e[0] === document) {
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
            if (tmp) {
                frontcolorcomponents = {'r':parseInt(tmp[1], 10), 'g':parseInt(tmp[2], 10), 'b':parseInt(tmp[3], 10)}
            } else {
                tmp = frontcolor.match(hexregex)
                if (tmp) {
                    frontcolorcomponents = {'r':parseInt(tmp[1], 16), 'g':parseInt(tmp[2], 16), 'b':parseInt(tmp[3], 16)}
                }
            }
//		if(!frontcolorcomponents){
//			frontcolorcomponents = {'r':255,'g':255,'b':255}
//		}

            var backcolorcomponents
            // Decomposing back color into R, G, B ints
            if (!backcolor) {
                // HIghly unlikely since this means that no background styling was applied to any element from here to top of dom.
                // we'll pick up back color from front color
                if (frontcolorcomponents) {
                    if (Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b]) > 127) {
                        backcolorcomponents = {'r':0, 'g':0, 'b':0}
                    } else {
                        backcolorcomponents = {'r':255, 'g':255, 'b':255}
                    }
                } else {
                    // arg!!! front color is in format we don't understand (hsl, named colors)
                    // Let's just go with white background.
                    backcolorcomponents = {'r':255, 'g':255, 'b':255}
                }
            } else {
                tmp = undef
                tmp = backcolor.match(rgbaregex)
                if (tmp) {
                    backcolorcomponents = {'r':parseInt(tmp[1], 10), 'g':parseInt(tmp[2], 10), 'b':parseInt(tmp[3], 10)}
                } else {
                    tmp = backcolor.match(hexregex)
                    if (tmp) {
                        backcolorcomponents = {'r':parseInt(tmp[1], 16), 'g':parseInt(tmp[2], 16), 'b':parseInt(tmp[3], 16)}
                    }
                }
//			if(!backcolorcomponents){
//				backcolorcomponents = {'r':0,'g':0,'b':0}
//			}
            }

            // Deriving Decor color
            // THis is LAZY!!!! Better way would be to use HSL and adjust luminocity. However, that could be an overkill.

            var toRGBfn = function (o) {
                    return 'rgb(' + [o.r, o.g, o.b].join(', ') + ')'
                }
                , decorcolorcomponents
                , frontcolorbrightness
                , adjusted

            if (frontcolorcomponents && backcolorcomponents) {
                var backcolorbrightness = Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b])

                frontcolorbrightness = Math.max.apply(null, [backcolorcomponents.r, backcolorcomponents.g, backcolorcomponents.b])
                adjusted = Math.round(frontcolorbrightness + (-1 * (frontcolorbrightness - backcolorbrightness) * 0.75)) // "dimming" the difference between pen and back.
                decorcolorcomponents = {'r':adjusted, 'g':adjusted, 'b':adjusted} // always shade of gray
            } else if (frontcolorcomponents) {
                frontcolorbrightness = Math.max.apply(null, [frontcolorcomponents.r, frontcolorcomponents.g, frontcolorcomponents.b])
                var polarity = +1
                if (frontcolorbrightness > 127) {
                    polarity = -1
                }
                // shifting by 25% (64 points on RGB scale)
                adjusted = Math.round(frontcolorbrightness + (polarity * 96)) // "dimming" the pen's color by 75% to get decor color.
                decorcolorcomponents = {'r':adjusted, 'g':adjusted, 'b':adjusted} // always shade of gray
            } else {
                decorcolorcomponents = {'r':191, 'g':191, 'b':191} // always shade of gray
            }

            return {
                'color':frontcolor, 'background-color':backcolorcomponents ? toRGBfn(backcolorcomponents) : backcolor, 'decor-color':toRGBfn(decorcolorcomponents)
            }
        }

        function Vector(x, y) {
            this.x = x
            this.y = y
            this.reverse = function () {
                return new this.constructor(
                    this.x * -1
                    , this.y * -1
                )
            }
            this._length = null
            this.getLength = function () {
                if (!this._length) {
                    this._length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
                }
                return this._length
            }

            var polarity = function (e) {
                return Math.round(e / Math.abs(e))
            }
            this.resizeTo = function (length) {
                // proportionally changes x,y such that the hypotenuse (vector length) is = new length
                if (this.x === 0 && this.y === 0) {
                    this._length = 0
                } else if (this.x === 0) {
                    this._length = length
                    this.y = length * polarity(this.y)
                } else if (this.y === 0) {
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
            this.angleTo = function (vectorB) {
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

        function Point(x, y) {
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
        function DataEngine(storageObject) {
            this.data = storageObject // we expect this to be an instance of Array

            this.changed = function () {
            }

            this.startStrokeFn = function () {
            }
            this.addToStrokeFn = function () {
            }
            this.endStrokeFn = function () {
            }

            this.inStroke = false

            this._lastPoint = null
            this._stroke = null
            this.startStroke = function (point) {
                if (point && typeof(point.x) == "number" && typeof(point.y) == "number") {
                    this._stroke = {'x':[point.x], 'y':[point.y]}
                    this.data.push(this._stroke)
                    this._lastPoint = point
                    this.inStroke = true
                    // 'this' does not work same inside setTimeout(
                    var stroke = this._stroke
                        , fn = this.startStrokeFn
                    setTimeout(
                        // some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
                        function () {
                            fn(stroke)
                        }
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
            this.addToStroke = function (point) {
                if (this.inStroke &&
                    typeof(point.x) === "number" &&
                    typeof(point.y) === "number" &&
                    // calculates absolute shift in diagonal pixels away from original point
                    (Math.abs(point.x - this._lastPoint.x) + Math.abs(point.y - this._lastPoint.y)) > 4
                    ) {
                    var positionInStroke = this._stroke.x.length
                    this._stroke.x.push(point.x)
                    this._stroke.y.push(point.y)
                    this._lastPoint = point

                    var stroke = this._stroke
                        , fn = this.addToStrokeFn
                    setTimeout(
                        // some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
                        function () {
                            fn(stroke, positionInStroke)
                        }
                        , 3
                    )
                    return point
                } else {
                    return null
                }
            }
            this.endStroke = function () {
                var c = this.inStroke
                this.inStroke = false
                this._lastPoint = null
                if (c) {
                    var fn = this.endStrokeFn // 'this' does not work same inside setTimeout(
                        , stroke = this._stroke
                    setTimeout(
                        // some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
                        function () {
                            fn(stroke)
                        }
                        , 3
                    )

                    var changedfn = this.changed
                    setTimeout(
                        // some IE's don't support passing args per setTimeout API. Have to create closure every time instead.
                        changedfn
                        , 3
                    )
                    return true
                } else {
                    return null
                }
            }
        }

        var apinamespace = 'sign'
            , boundevents = {}
            , initBase = function (options) {

                var pubsubtokens = {}

                var settings = {
                    'width':'ratio', 'height':'ratio', 'sizeRatio':4 // only used when height = 'ratio'
                    , 'color':'#000', 'background-color':'#fff', 'decor-color':'#eee', 'lineWidth':0, 'minFatFingerCompensation':-10
                }

                var $parent = $(this)
                $.extend(settings, getColors($parent))
                if (options) {
                    $.extend(settings, options)
                }

                // We cannot work with circular dependency
                if (settings.width === settings.height && settings.height === 'ratio') {
                    settings.width = '100%'
                }

                var canvas = document.createElement('canvas')
                canvas.style.width = settings.width === 'ratio' ? '1px' : settings.width.toString(10)
                canvas.style.height = settings.height === 'ratio' ? '1px' : settings.height.toString(10)
                var $canvas = $(canvas)
                $canvas.appendTo($parent)

                // we could not do this until canvas is rendered
                if (settings.height === 'ratio') {
                    canvas.style.height = Math.round(canvas.offsetWidth / settings.sizeRatio).toString(10) + 'px'
                } else if (settings.width === 'ratio') {
                    canvas.style.width = Math.round(canvas.offsetHeight * settings.sizeRatio).toString(10) + 'px'
                }

                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight

                $canvas.addClass(apinamespace)

                var canvas_emulator = (function () {
                    if (canvas.getContext) {
                        return false
                    } else if (typeof FlashCanvas !== "undefined") {
                        canvas = FlashCanvas.initElement(canvas)

                        var zoom = 1
                        // FlashCanvas uses flash which has this annoying habit of NOT scaling with page zoom.
                        // It matches pixel-to-pixel to screen instead.
                        // Since we are targeting ONLY IE 7, 8 with FlashCanvas, we will test the zoom only the IE8, IE7 way
                        if (window && window.screen && window.screen.deviceXDPI && window.screen.logicalXDPI) {
                            zoom = window.screen.deviceXDPI * 1.0 / window.screen.logicalXDPI
                        }
                        if (zoom !== 1) {
                            // We effectively abuse the brokenness of FlashCanvas and force the flash rendering surface to
                            // occupy larger pixel dimensions than the wrapping, scaled up DIV and Canvas elems.
                            $canvas.children('object').get(0).resize(Math.ceil(canvas.width * zoom), Math.ceil(canvas.height * zoom))
                            // And by applying "scale" transformation we can talk "browser pixels" to FlashCanvas
                            // and have it translate the "browser pixels" to "screen pixels"
                            canvas.getContext('2d').scale(zoom, zoom)
                            // Note to self: don't reuse Canvas element. Repeated "scale" are cumulative.
                        }
                        return true
                    } else {
                        throw new Error("Canvas element does not support 2d context. " + apinamespace + " cannot proceed.")
                    }
                })();

                settings.lineWidth = (function (defaultLineWidth, canvasWidth) {
                    if (defaultLineWidth === 0) {
                        return Math.max(
                            Math.round(canvasWidth / 400) /*+1 pixel for every extra 300px of width.*/
                            , 2 /* minimum line width */
                        )
                    } else {
                        return defaultLineWidth
                    }
                })(settings.lineWidth, canvas.width);

                var small_screen = canvas.width < 600 ? true : false

                // normally select preventer would be short, but
                // vml-based Canvas emulator on IE does NOT provide value for Event. Hence this convoluted line.
                canvas.onselectstart = function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault()
                    }
                    ;
                    if (e && e.stopPropagation) {
                        e.stopPropagation()
                    }
                    ;
                    return false;
                }

                // Add custom class if defined
                if (settings.cssclass && $.trim(settings.cssclass) != "") {
                    $canvas.addClass(settings.cssclass)
                }

                var ctx = canvas.getContext("2d")
                    , dataEngine, undef
                    , strokeStartCallback, strokeAddCallback, strokeEndCallback
                // shifts - adjustment values in viewport pixels drived from position of canvas on the page
                    , shiftX
                    , shiftY
                    , dotShift = Math.round(settings.lineWidth / 2) * -1 // only for single dots at start. this draws fat ones "centered"
                    , basicDot = function (x, y) {
                        ctx.fillStyle = settings.color
                        ctx.fillRect(x + dotShift, y + dotShift, settings.lineWidth, settings.lineWidth)
                        ctx.fillStyle = settings['background-color']
                    }
                    , basicLine = function (startx, starty, endx, endy) {
                        ctx.beginPath()
                        ctx.moveTo(startx, starty)
                        ctx.lineTo(endx, endy)
                        ctx.stroke()
                    }
                    , basicCurve = function (startx, starty, endx, endy, cp1x, cp1y, cp2x, cp2y) {
                        ctx.beginPath()
                        ctx.moveTo(startx, starty)
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endx, endy)
                        ctx.stroke()
                    }
                    , resetCanvas = function (data) {
                        var cw = canvas.width
                            , ch = canvas.height

                        ctx.clearRect(0, 0, cw + 30, ch + 30)

                        ctx.shadowColor = ctx.fillStyle = settings['background-color']
                        if (canvas_emulator) {
                            // FLashCanvas fills with Black by default, covering up the parent div's background
                            // hence we refill
                            ctx.fillRect(0, 0, cw + 30, ch + 30)
                        }

                        ctx.lineWidth = Math.ceil(parseInt(settings.lineWidth, 10))
                        ctx.lineCap = ctx.lineJoin = "round"

                        // signature line
                        var lineoffset = Math.round(ch / 5)
                        ctx.strokeStyle = settings['decor-color']
                        ctx.shadowOffsetX = 0
                        ctx.shadowOffsetY = 0
                        basicLine(lineoffset * 1.5, ch - lineoffset, cw - (lineoffset * 1.5), ch - lineoffset)

                        ctx.strokeStyle = settings.color

                        if (!canvas_emulator && !small_screen) {
                            ctx.shadowColor = ctx.strokeStyle
                            ctx.shadowOffsetX = ctx.lineWidth * 0.5
                            ctx.shadowOffsetY = ctx.lineWidth * -0.6
                            ctx.shadowBlur = 0
                        }

                        if (data === undef) {
                            data = []
                        }
                        else {
                            // we have data to render
                            var numofstrokes = data.length
                                , stroke
                                , numofpoints

                            for (var i = 0; i < numofstrokes; i++) {
                                stroke = data[i]
                                numofpoints = stroke.x.length
                                strokeStartCallback(stroke)
                                for (var j = 1; j < numofpoints; j++) {
                                    strokeAddCallback(stroke, j)
                                }
                                strokeEndCallback(stroke)
                            }
                        }

                        dataEngine = new DataEngine(data)
                        dataEngine.startStrokeFn = strokeStartCallback
                        dataEngine.addToStrokeFn = strokeAddCallback
                        dataEngine.endStrokeFn = strokeEndCallback
                        dataEngine.changed = function () {
                            $parent.trigger('change')
                        }

                        $canvas.data(apinamespace + '.data', data)
                        settings.data = data
                        $canvas.data(apinamespace + '.settings', settings)

                        // import filters will be passing this back as indication of "we rendered"
                        return true
                    }
                    , timer = null // used for endign stroke when no movement occurs for some time.
                    , clearIdleTimeout = function () {
                        clearTimeout(timer)
                    }
                    , drawEndHandler = function (e) {
                        try {
                            e.preventDefault()
                        } catch (ex) {
                        }
                        clearIdleTimeout()
                        dataEngine.endStroke()
                    }
                    , resetIdleTimeout = function () {
                        // global scope:
                        // timer, drawEndHandler
                        clearTimeout(timer)
                        timer = setTimeout(
                            drawEndHandler
                            , 750 // no moving for this many ms? = done with the stroke.
                        )
                    }
                    , setStartValues = function () {
                        var tos = $canvas.offset()
                        shiftX = tos.left * -1
                        shiftY = tos.top * -1
                    }
                    , fatFingerCompensation = 0 // in pixels. Usually a x5 multiple of line width enabled auto on touch devices.
                    , getPointFromEvent = function (e) {
                        var firstEvent = (e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0] : e)
                        // All devices i tried report correct coordinates in pageX,Y
                        // Android Chrome 2.3.x, 3.1, 3.2., Opera Mobile,  safari iOS 4.x,
                        // Windows: Chrome, FF, IE9, Safari
                        // None of that scroll shift calc vs screenXY other sigs do is needed.
                        // ... oh, yeah, the "fatFinger.." is for tablets so that people see what they draw.
                        return new Point(
                            Math.round(firstEvent.pageX + shiftX)
                            , Math.round(firstEvent.pageY + shiftY) + fatFingerCompensation
                        )
                    }
                    , drawStartHandler = function (e) {
                        e.preventDefault();
                        // for performance we cache the offsets
                        // we recalc these only at the beginning the stroke
                        setStartValues()
                        dataEngine.startStroke(getPointFromEvent(e))
                        resetIdleTimeout()
                    }
                    , drawMoveHandler = function (e) {
                        e.preventDefault();
                        if (!dataEngine.inStroke) {
                            return
                        } else {
                            var acceptedPoint = dataEngine.addToStroke(getPointFromEvent(e))
                            if (acceptedPoint) {
                                resetIdleTimeout()
                            }
                        }
                    }
                    , lineCurveThreshold = settings.lineWidth * 3
                /*
                 , getDataStats = function(){
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
                 // basicDot(stroke.x[0], stroke.y[0])
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

                strokeStartCallback = function (stroke) {
                    basicDot(stroke.x[0], stroke.y[0])
                }
                strokeAddCallback = function (stroke, positionInStroke) {
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
                    var Cpoint = new Point(stroke.x[positionInStroke - 1], stroke.y[positionInStroke - 1])
                        , Dpoint = new Point(stroke.x[positionInStroke], stroke.y[positionInStroke])
                        , CDvector = Cpoint.getVectorToPoint(Dpoint)

                    // Again, we have a chance here to draw TWO things:
                    //  BC Curve (only if it's long, because if it was short, it was drawn by previous callback) and
                    //  CD Line (only if it's short)

                    // So, let's start with BC curve.
                    // if there is only 2 points in stroke array, we don't have "history" long enough to have point B, let alone point A.
                    // Falling through to drawing line CD is proper, as that's the only line we have points for.
                    if (positionInStroke > 1) {
                        // we are here when there are at least 3 points in stroke array.
                        var Bpoint = new Point(stroke.x[positionInStroke - 2], stroke.y[positionInStroke - 2])
                            , BCvector = Bpoint.getVectorToPoint(Cpoint)
                            , ABvector
                        if (BCvector.getLength() > lineCurveThreshold) {
                            // Yey! Pretty curves, here we come!
                            if (positionInStroke > 2) {
                                // we are here when at least 4 points in stroke array.
                                ABvector = (new Point(stroke.x[positionInStroke - 3], stroke.y[positionInStroke - 3])).getVectorToPoint(Bpoint)
                            } else {
                                ABvector = new Vector(0, 0)
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
                                Bpoint.x
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
                    if (CDvector.getLength() <= lineCurveThreshold) {
                        basicLine(
                            Cpoint.x
                            , Cpoint.y
                            , Dpoint.x
                            , Dpoint.y
                        )
                    }
                }
                strokeEndCallback = function (stroke) {
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

                    if (positionInStroke > 0) {
                        // there are at least 2 points in the stroke.we are in business.
                        var Cpoint = new Point(stroke.x[positionInStroke], stroke.y[positionInStroke])
                            , Bpoint = new Point(stroke.x[positionInStroke - 1], stroke.y[positionInStroke - 1])
                            , BCvector = Bpoint.getVectorToPoint(Cpoint)
                            , ABvector
                        if (BCvector.getLength() > lineCurveThreshold) {
                            // yep. This one was left undrawn in prior callback. Have to draw it now.
                            if (positionInStroke > 1) {
                                // we have at least 3 elems in stroke
                                ABvector = (new Point(stroke.x[positionInStroke - 2], stroke.y[positionInStroke - 2])).getVectorToPoint(Bpoint)
                                var BCP1vector = new Vector(ABvector.x + BCvector.x, ABvector.y + BCvector.y).resizeTo(BCvector.getLength() / 2)
                                basicCurve(
                                    Bpoint.x
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
                                    Bpoint.x
                                    , Bpoint.y
                                    , Cpoint.x
                                    , Cpoint.y
                                )
                            }

                        }
                    }
                };

                if (canvas_emulator) {
                    $canvas.bind('mousedown.' + apinamespace, function (e) {
                        $canvas.unbind('mousedown.' + apinamespace);
                        drawStartHandler(e);
                        $canvas.bind('mousemove.' + apinamespace, drawMoveHandler);
                        $canvas.bind('mouseup.' + apinamespace, drawEndHandler);
                        $canvas.bind('mousedown.' + apinamespace, drawStartHandler);
                    })
                } else {
                    canvas.ontouchstart = function (e) {
                        canvas.onmousedown = null;
                        canvas.onmouseup = null;
                        canvas.onmousemove = null;
                        fatFingerCompensation = (
                            settings.minFatFingerCompensation &&
                                settings.lineWidth * -3 > settings.minFatFingerCompensation
                            ) ? settings.lineWidth * -3 : settings.minFatFingerCompensation;
                        drawStartHandler(e);
                        canvas.ontouchend = drawEndHandler;
                        canvas.ontouchstart = drawStartHandler;
                        canvas.ontouchmove = drawMoveHandler;
                    }
                    canvas.onmousedown = function (e) {
                        canvas.ontouchstart = null;
                        canvas.ontouchend = null;
                        canvas.ontouchmove = null;
                        drawStartHandler(e);
                        canvas.onmousedown = drawStartHandler;
                        canvas.onmouseup = drawEndHandler;
                        canvas.onmousemove = drawMoveHandler;
                    }
                }

                /*
                 * API EXPOSED THROUGH jQuery.data() on Canvas element.
                 */
                //  $canvas.data('signature.data', data) is set every time we reset canvas. See resetCanvas
                // $canvas.data(apinamespace+'.settings', settings)
                $canvas.data(apinamespace + '.reset', resetCanvas)

                // If we have proportional width, we sign up to events broadcasting "window resized" and checking if
                // parent's width changed. If so, we (1) extract settings + data from current signature pad,
                // (2) remove signature pad from parent, and (3) reinit new signature pad at new size with same settings, (rescaled) data.
                if ((function (settingsWidth) {
                    return ( settingsWidth === 'ratio' || settingsWidth.split('')[settingsWidth.length - 1] === '%' )
                })(settings.width.toString(10))
                    ) {

                    pubsubtokens[apinamespace + '.parentresized'] = $.fn[apinamespace]('PubSub').subscribe(
                        apinamespace + '.parentresized'
                        , (function (pubsubtokens, apinamespace, $parent, originalParentWidth, sizeRatio) {
                            'use strict'

                            return function () {
                                'use strict'
                                var w = $parent.width()
                                if (w !== originalParentWidth) {

                                    // UNsubscribing this particular instance of signature pad only.
                                    // there is a separate `pubsubtokens` per each instance of signature pad
                                    var pubsub = $parent[apinamespace]('PubSub')
                                    for (var key in pubsubtokens) {
                                        if (pubsubtokens.hasOwnProperty(key)) {
                                            pubsub.unsubscribe(pubsubtokens[key])
                                            delete pubsubtokens[key]
                                        }
                                    }

                                    // $parent sits in upper closue because it's part of upper self-exec'ing function's args.
                                    // we support separate parent for each instance of signature pad.
                                    // in other words, you can still have more than one signature pad per page.
                                    var $canvas = $parent.find('canvas')
                                        , settings = $canvas.data(apinamespace + '.settings')
                                    $canvas.remove()

                                    // scale data to new signature pad size
                                    settings.data = (function (data, scale) {
                                        var newData = []
                                        var o, i, l, j, m, stroke
                                        for (i = 0, l = data.length; i < l; i++) {
                                            stroke = data[i]

                                            o = {'x':[], 'y':[]}

                                            for (j = 0, m = stroke.x.length; j < m; j++) {
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
                            pubsubtokens
                            , apinamespace
                            , $parent
                            , $parent.width()
                            , canvas.width * 1.0 / canvas.height
                        )
                    )
                }

                // we have one (aka `singleton`) `boundevents' per whole sign.
                if (!boundevents['windowresize']) {
                    boundevents['windowresize'] = true

                    ;
                    (function (apinamespace, $, window) {
                        'use strict'

                        var resizetimer
                            , runner = function () {
                                $.fn[apinamespace]('PubSub').publish(
                                    apinamespace + '.parentresized'
                                )
                            }

                        $(window).bind('resize.' + apinamespace, function () {
                            if (resizetimer) {
                                clearTimeout(resizetimer)
                            }
                            resizetimer = setTimeout(
                                runner
                                , 700
                            )
                        })
                    })(apinamespace, $, window)
                }

                // on mouseout + mouseup canvas did not know that mouseUP fired. Continued to draw despite mouse UP.
                // it is bettr than
                // $canvas.bind('mouseout', drawEndHandler)
                // because we don't want to break the stroke where user accidentally gets ouside and wants to get back in quickly.
                pubsubtokens[apinamespace + '.windowmouseup'] = $.fn[apinamespace]('PubSub').subscribe(
                    apinamespace + '.windowmouseup'
                    , drawEndHandler
                )

                if (!boundevents['windowmouseup']) {
                    boundevents['windowmouseup'] = true

                    ;
                    (function (apinamespace, $, window) {
                        'use strict'
                        $(window).bind('mouseup.' + apinamespace, function (e) {
                            $.fn[apinamespace]('PubSub').publish(
                                apinamespace + '.windowmouseup'
                                , e
                            )
                        })
                    })(apinamespace, $, window)
                }

                resetCanvas(settings.data)
            } // end of initBase

        var exportplugins = {
            'default':function (data) {
                return this.toDataURL()
            }, 'native':function (data) {
                return data
            }, 'image':function (data) {
                /*this = canvas elem */
                var imagestring = this.toDataURL()

                if (typeof imagestring === 'string' &&
                    imagestring.length > 4 &&
                    imagestring.slice(0, 5) === 'data:' &&
                    imagestring.indexOf(',') !== -1) {

                    var splitterpos = imagestring.indexOf(',')

                    return [
                        imagestring.slice(5, splitterpos)
                        , imagestring.substr(splitterpos + 1)
                    ]
                }
                return []
            }
        }

        function _renderImageOnCanvas(data, formattype, rerendercallable) {
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

            img.onload = function () {
                var ctx = c.getContext("2d").drawImage(
                    img, 0, 0
                    , ( img.width < c.width) ? img.width : c.width
                    , ( img.height < c.height) ? img.height : c.height
                )
            }

            img.src = 'data:' + formattype + ',' + data
        }

        var importplugins = {
            'native':function (data, formattype, rerendercallable) {
                // we expect data as Array of objects of arrays here - whatever 'default' EXPORT plugin spits out.
                // returning Truthy to indicate we are good, all updated.
                rerendercallable(data)
            }, 'image':_renderImageOnCanvas, 'image/png;base64':_renderImageOnCanvas, 'image/jpeg;base64':_renderImageOnCanvas, 'image/jpg;base64':_renderImageOnCanvas
        }

        function _clearDrawingArea(data) {
            this.find('canvas.' + apinamespace)
                .add(this.filter('canvas.' + apinamespace))
                .data(apinamespace + '.reset')(data)
            return this
        }

        function _setDrawingData(data, formattype) {
            var undef

            if (formattype === undef && typeof data === 'string' && data.substr(0, 5) === 'data:') {
                formattype = data.slice(5).split(',')[0]
                // 5 chars of "data:" + mimetype len + 1 "," char = all skipped.
                data = data.slice(6 + formattype.length)
                if (formattype === data) return
            }

            var $canvas = this.find('canvas.' + apinamespace).add(this.filter('canvas.' + apinamespace))

            if (!importplugins.hasOwnProperty(formattype)) {
                throw new Error(apinamespace + " is unable to find import plugin with for format '" + String(formattype) + "'")
            } else if ($canvas.length !== 0) {
                importplugins[formattype].call(
                    $canvas[0]
                    , data
                    , formattype
                    , $canvas.data(apinamespace + '.reset')
                )
            }

            return this
        }

        var PubSubInstance = new (function () {
            'use strict'
            /*  @preserve
             -----------------------------------------------------------------------------------------------
             PubSub
             2012 (c) ddotsenko@willowsystems.com
             based on Peter Higgins (dante@dojotoolkit.org)
             Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
             Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
             http://dojofoundation.org/license for more information.
             -----------------------------------------------------------------------------------------------
             */
            this.topics = {};
            /**
             * Allows caller to emit an event and pass arguments to event listeners.
             * @public
             * @function
             * @param topic {String} Name of the channel on which to voice this event
             * @param **arguments Any number of arguments you want to pass to the listeners of this event.
             */
            this.publish = function (topic, arg1, arg2, etc) {
                'use strict'
                if (this.topics[topic]) {
                    var currentTopic = this.topics[topic]
                        , args = Array.prototype.slice.call(arguments, 1)

                    for (var i = 0, l = currentTopic.length; i < l; i++) {
                        currentTopic[i].apply(null, args);
                    }
                }
            };
            /**
             * Allows listener code to subscribe to channel and be called when data is available
             * @public
             * @function
             * @param topic {String} Name of the channel on which to voice this event
             * @param callback {Function} Executable (function pointer) that will be ran when event is voiced on this channel.
             * @returns {Object} A token object that cen be used for unsubscribing.
             */
            this.subscribe = function (topic, callback) {
                'use strict'
                if (!this.topics[topic]) {
                    this.topics[topic] = [callback];
                } else {
                    this.topics[topic].push(callback);
                }
                return {
                    "topic":topic,
                    "callback":callback
                };
            };
            /**
             * Allows listener code to unsubscribe from a channel
             * @public
             * @function
             * @param token {Object} A token object that was returned by `subscribe` method
             */
            this.unsubscribe = function (token) {
                if (this.topics[token.topic]) {
                    var currentTopic = this.topics[token.topic]

                    for (var i = 0, l = currentTopic.length; i < l; i++) {
                        if (currentTopic[i] === token.callback) {
                            currentTopic.splice(i, 1)
                        }
                    }
                }
            }

        })();

        //These are exposed as methods under $obj.sign('methodname', *args)
        var methods = {
            'init':function (options) {
                return this.each(function () {
                    initBase.call(this, options)
                }) // end Each
            }, 'getSettings':function () {
                var undef, $canvas = this.find('canvas.' + apinamespace).add(this.filter('canvas.' + apinamespace))
                return $canvas.data(apinamespace + '.settings')
            }
            // around since v1
            , 'clear':_clearDrawingArea
            // was mistakenly introduced instead of 'clear' in v2
            , 'reset':_clearDrawingArea, 'addPlugin':function (pluginType, pluginName, callable) {
                var plugins = {'export':exportplugins, 'import':importplugins}
                if (plugins.hasOwnProperty(pluginType)) {
                    plugins[pluginType][pluginName] = callable
                }
                return this
            }, 'listPlugins':function (pluginType) {
                var plugins = {'export':exportplugins, 'import':importplugins}
                    , answer = []
                if (plugins.hasOwnProperty(pluginType)) {
                    var o = plugins[pluginType]
                    for (var k in o) {
                        if (o.hasOwnProperty(k)) {
                            answer.push(k)
                        }
                    }
                }
                return answer
            }, 'getData':function (formattype) {
                var undef, $canvas = this.find('canvas.' + apinamespace).add(this.filter('canvas.' + apinamespace))
                if (formattype === undef) formattype = 'default'
                if ($canvas.length !== 0 && exportplugins.hasOwnProperty(formattype)) {
                    return exportplugins[formattype].call(
                        $canvas.get(0) // canvas dom elem
                        , $canvas.data(apinamespace + '.data') // raw signature data as array of objects of arrays
                    )
                }
            }
            // around since v1. Took only one arg - data-url-formatted string with (likely png of) signature image
            , 'importData':_setDrawingData
            // was mistakenly introduced instead of 'importData' in v2
            , 'setData':_setDrawingData, 'PubSub':function () {
                return PubSubInstance
            }
        } // end of methods declaration.

        $.fn[apinamespace] = function (method) {
            'use strict'
            if (!method || typeof method === 'object') {
                return methods.init.apply(this, arguments)
            } else if (typeof method === 'string' && methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                $.error('Method ' + String(method) + ' does not exist on jQuery.' + apinamespace)
            }
        }

    } // end of Initializer

////Because plugins are minified together with sign, multiple defines per (minified) file blow up and dont make sense
////Need to revisit this later.

//if ( typeof define === "function" && define.amd != null) {
//	// AMD-loader compatible resource declaration
//	// you need to call this one with jQuery as argument.
//	define(function(){return Initializer} )
//} else {
    // global-polluting outcome.
//    if (this.jQuery == null) {
//        throw new Error("We need jQuery for some of the functionality. jQuery is not detected. Failing to initialize...")
//    }
    Initializer(this.jQuery)
//}

})(jQuery, window);
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : plugin-spinner.js
 *  Description: 스피너는 화면전환 등의 로딩이 필요한 컨텐츠에 대해 UI적으로 로딩 중이라는 것을 표현하기 위한 플러그인이다.
 *  Author: 김우섭
 *  License :
 */

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
    /**
     * @class Spinner
     * @constructor
     */
    var Spinner = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.spinner.defaults, options);
    };

    Spinner.prototype.setState = function (state) {
        var d = "disabled"
            , $el = this.$element
            , data = $el.data()
            , val = $el.is("input") ? "val" : "html";

        state = state + "Text";
        data.resetText || $el.data("resetText", $el[val]());

        $el[val](data[state] || this.options[state]);

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == "loadingText" ?
                $el.addClass(d).attr(d, d) :
                $el.removeClass(d).removeAttr(d)
        }, 0)
    };

    Spinner.prototype.toggle = function () {
        console.log("toggle");
        var $parent = this.$element.parent("[data-toggle='buttons-radio']");

        $parent && $parent
            .find(".active")
            .removeClass("active");

        this.$element.toggleClass("active")
    };

    Spinner.prototype.show = function () {
        this.showText();
        $("div.widget-spinner").show();
    };

    Spinner.prototype.showAll = function () {
        this.showText();
        $("div.widget-spinner").addClass("all").show();
    };

    Spinner.prototype.showText = function () {
        var text = this.$element.data("spinner-text");

        if(typeof text !== "string" && $.trim(text).length < 1) {
            return false;
        }

        $("div.widget-spinner div.spinner-center").attr({
            "data-content": text
        });
        console.log(text);
    };

    Spinner.prototype.removeText = function () {
        $("div.widget-spinner div.spinner-center").attr({
            "data-content": ""
        });
    };

    Spinner.prototype.hide = function () {
        this.removeText();
        $("div.widget-spinner").removeClass("all").hide();
    };

//    Spinner.prototype.destroy = function () {
//        $(".widget-spinner").remove();
//    };


    /* BUTTON PLUGIN DEFINITION
     * ======================== */

    $.fn.spinner = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data("spinner")
                , options = typeof option == "object" && option;

            if (!data) {
                $this.data("spinner", (data = new Spinner(this, options)));
            }

            if (option == "show") {
                data.show();
            } else if (option == "showAll") {
                data.showAll();
            } else if (option == "hide") {
                data.hide();
            } else if (option) {
                data.setState(option)
            }
        })
    };

    $.fn.spinner.defaults = {
        loadingText:"loading..."
    };

    $.fn.spinner.Constructor = Spinner;


    /* BUTTON DATA-API
     * =============== */
//
//    $(function () {
//        $("body").on("click.Spinner.data-api", "[data-toggle^=button]", function ( e ) {
//            var $btn = $(e.target)
//            if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn")
//            $btn.button("toggle")
//        })
//    })
}));

(function () {
    function d3_class(ctor, properties) {
        try {
            for (var key in properties) {
                Object.defineProperty(ctor.prototype, key, {
                    value:properties[key],
                    enumerable:false
                });
            }
        } catch (e) {
            ctor.prototype = properties;
        }
    }

    function d3_arrayCopy(pseudoarray) {
        var i = -1, n = pseudoarray.length, array = [];
        while (++i < n) array.push(pseudoarray[i]);
        return array;
    }

    function d3_arraySlice(pseudoarray) {
        return Array.prototype.slice.call(pseudoarray);
    }

    function d3_Map() {
    }

    function d3_identity(d) {
        return d;
    }

    function d3_this() {
        return this;
    }

    function d3_true() {
        return true;
    }

    function d3_functor(v) {
        return typeof v === "function" ? v : function () {
            return v;
        };
    }

    function d3_rebind(target, source, method) {
        return function () {
            var value = method.apply(source, arguments);
            return arguments.length ? target : value;
        };
    }

    function d3_number(x) {
        return x != null && !isNaN(x);
    }

    function d3_zipLength(d) {
        return d.length;
    }

    function d3_splitter(d) {
        return d == null;
    }

    function d3_collapse(s) {
        return s.trim().replace(/\s+/g, " ");
    }

    function d3_range_integerScale(x) {
        var k = 1;
        while (x * k % 1) k *= 10;
        return k;
    }

    function d3_dispatch() {
    }

    function d3_dispatch_event(dispatch) {
        function event() {
            var z = listeners, i = -1, n = z.length, l;
            while (++i < n) if (l = z[i].on) l.apply(this, arguments);
            return dispatch;
        }

        var listeners = [], listenerByName = new d3_Map;
        event.on = function (name, listener) {
            var l = listenerByName.get(name), i;
            if (arguments.length < 2) return l && l.on;
            if (l) {
                l.on = null;
                listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
                listenerByName.remove(name);
            }
            if (listener) listeners.push(listenerByName.set(name, {
                on:listener
            }));
            return dispatch;
        };
        return event;
    }

    function d3_format_precision(x, p) {
        return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
    }

    function d3_format_typeDefault(x) {
        return x + "";
    }

    function d3_format_group(value) {
        var i = value.lastIndexOf("."), f = i >= 0 ? value.substring(i) : (i = value.length, ""), t = [];
        while (i > 0) t.push(value.substring(i -= 3, i + 3));
        return t.reverse().join(",") + f;
    }

    function d3_formatPrefix(d, i) {
        var k = Math.pow(10, Math.abs(8 - i) * 3);
        return {
            scale:i > 8 ? function (d) {
                return d / k;
            } : function (d) {
                return d * k;
            },
            symbol:d
        };
    }

    function d3_ease_clamp(f) {
        return function (t) {
            return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
        };
    }

    function d3_ease_reverse(f) {
        return function (t) {
            return 1 - f(1 - t);
        };
    }

    function d3_ease_reflect(f) {
        return function (t) {
            return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
        };
    }

    function d3_ease_identity(t) {
        return t;
    }

    function d3_ease_poly(e) {
        return function (t) {
            return Math.pow(t, e);
        };
    }

    function d3_ease_sin(t) {
        return 1 - Math.cos(t * Math.PI / 2);
    }

    function d3_ease_exp(t) {
        return Math.pow(2, 10 * (t - 1));
    }

    function d3_ease_circle(t) {
        return 1 - Math.sqrt(1 - t * t);
    }

    function d3_ease_elastic(a, p) {
        var s;
        if (arguments.length < 2) p = .45;
        if (arguments.length < 1) {
            a = 1;
            s = p / 4;
        } else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return function (t) {
            return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
        };
    }

    function d3_ease_back(s) {
        if (!s) s = 1.70158;
        return function (t) {
            return t * t * ((s + 1) * t - s);
        };
    }

    function d3_ease_bounce(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }

    function d3_eventCancel() {
        d3.event.stopPropagation();
        d3.event.preventDefault();
    }

    function d3_eventSource() {
        var e = d3.event, s;
        while (s = e.sourceEvent) e = s;
        return e;
    }

    function d3_eventDispatch(target) {
        var dispatch = new d3_dispatch, i = 0, n = arguments.length;
        while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        dispatch.of = function (thiz, argumentz) {
            return function (e1) {
                try {
                    var e0 = e1.sourceEvent = d3.event;
                    e1.target = target;
                    d3.event = e1;
                    dispatch[e1.type].apply(thiz, argumentz);
                } finally {
                    d3.event = e0;
                }
            };
        };
        return dispatch;
    }

    function d3_transform(m) {
        var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
        if (r0[0] * r1[1] < r1[0] * r0[1]) {
            r0[0] *= -1;
            r0[1] *= -1;
            kx *= -1;
            kz *= -1;
        }
        this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees;
        this.translate = [ m.e, m.f ];
        this.scale = [ kx, ky ];
        this.skew = ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0;
    }

    function d3_transformDot(a, b) {
        return a[0] * b[0] + a[1] * b[1];
    }

    function d3_transformNormalize(a) {
        var k = Math.sqrt(d3_transformDot(a, a));
        if (k) {
            a[0] /= k;
            a[1] /= k;
        }
        return k;
    }

    function d3_transformCombine(a, b, k) {
        a[0] += k * b[0];
        a[1] += k * b[1];
        return a;
    }

    function d3_interpolateByName(name) {
        return name == "transform" ? d3.interpolateTransform : d3.interpolate;
    }

    function d3_uninterpolateNumber(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (x) {
            return (x - a) * b;
        };
    }

    function d3_uninterpolateClamp(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (x) {
            return Math.max(0, Math.min(1, (x - a) * b));
        };
    }

    function d3_rgb(r, g, b) {
        return new d3_Rgb(r, g, b);
    }

    function d3_Rgb(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    function d3_rgb_hex(v) {
        return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
    }

    function d3_rgb_parse(format, rgb, hsl) {
        var r = 0, g = 0, b = 0, m1, m2, name;
        m1 = /([a-z]+)\((.*)\)/i.exec(format);
        if (m1) {
            m2 = m1[2].split(",");
            switch (m1[1]) {
                case "hsl":
                {
                    return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
                }
                case "rgb":
                {
                    return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
                }
            }
        }
        if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);
        if (format != null && format.charAt(0) === "#") {
            if (format.length === 4) {
                r = format.charAt(1);
                r += r;
                g = format.charAt(2);
                g += g;
                b = format.charAt(3);
                b += b;
            } else if (format.length === 7) {
                r = format.substring(1, 3);
                g = format.substring(3, 5);
                b = format.substring(5, 7);
            }
            r = parseInt(r, 16);
            g = parseInt(g, 16);
            b = parseInt(b, 16);
        }
        return rgb(r, g, b);
    }

    function d3_rgb_hsl(r, g, b) {
        var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
        if (d) {
            s = l < .5 ? d / (max + min) : d / (2 - max - min);
            if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
            h *= 60;
        } else {
            s = h = 0;
        }
        return d3_hsl(h, s, l);
    }

    function d3_rgb_lab(r, g, b) {
        r = d3_rgb_xyz(r);
        g = d3_rgb_xyz(g);
        b = d3_rgb_xyz(b);
        var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
        return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
    }

    function d3_rgb_xyz(r) {
        return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
    }

    function d3_rgb_parseNumber(c) {
        var f = parseFloat(c);
        return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
    }

    function d3_hsl(h, s, l) {
        return new d3_Hsl(h, s, l);
    }

    function d3_Hsl(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }

    function d3_hsl_rgb(h, s, l) {
        function v(h) {
            if (h > 360) h -= 360; else if (h < 0) h += 360;
            if (h < 60) return m1 + (m2 - m1) * h / 60;
            if (h < 180) return m2;
            if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
            return m1;
        }

        function vv(h) {
            return Math.round(v(h) * 255);
        }

        var m1, m2;
        h = h % 360;
        if (h < 0) h += 360;
        s = s < 0 ? 0 : s > 1 ? 1 : s;
        l = l < 0 ? 0 : l > 1 ? 1 : l;
        m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
        m1 = 2 * l - m2;
        return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
    }

    function d3_hcl(h, c, l) {
        return new d3_Hcl(h, c, l);
    }

    function d3_Hcl(h, c, l) {
        this.h = h;
        this.c = c;
        this.l = l;
    }

    function d3_hcl_lab(h, c, l) {
        return d3_lab(l, Math.cos(h *= Math.PI / 180) * c, Math.sin(h) * c);
    }

    function d3_lab(l, a, b) {
        return new d3_Lab(l, a, b);
    }

    function d3_Lab(l, a, b) {
        this.l = l;
        this.a = a;
        this.b = b;
    }

    function d3_lab_rgb(l, a, b) {
        var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
        x = d3_lab_xyz(x) * d3_lab_X;
        y = d3_lab_xyz(y) * d3_lab_Y;
        z = d3_lab_xyz(z) * d3_lab_Z;
        return d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
    }

    function d3_lab_hcl(l, a, b) {
        return d3_hcl(Math.atan2(b, a) / Math.PI * 180, Math.sqrt(a * a + b * b), l);
    }

    function d3_lab_xyz(x) {
        return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
    }

    function d3_xyz_lab(x) {
        return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
    }

    function d3_xyz_rgb(r) {
        return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
    }

    function d3_selection(groups) {
        d3_arraySubclass(groups, d3_selectionPrototype);
        return groups;
    }

    function d3_selection_selector(selector) {
        return function () {
            return d3_select(selector, this);
        };
    }

    function d3_selection_selectorAll(selector) {
        return function () {
            return d3_selectAll(selector, this);
        };
    }

    function d3_selection_attr(name, value) {
        function attrNull() {
            this.removeAttribute(name);
        }

        function attrNullNS() {
            this.removeAttributeNS(name.space, name.local);
        }

        function attrConstant() {
            this.setAttribute(name, value);
        }

        function attrConstantNS() {
            this.setAttributeNS(name.space, name.local, value);
        }

        function attrFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
        }

        function attrFunctionNS() {
            var x = value.apply(this, arguments);
            if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
        }

        name = d3.ns.qualify(name);
        return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
    }

    function d3_selection_classedRe(name) {
        return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
    }

    function d3_selection_classed(name, value) {
        function classedConstant() {
            var i = -1;
            while (++i < n) name[i](this, value);
        }

        function classedFunction() {
            var i = -1, x = value.apply(this, arguments);
            while (++i < n) name[i](this, x);
        }

        name = name.trim().split(/\s+/).map(d3_selection_classedName);
        var n = name.length;
        return typeof value === "function" ? classedFunction : classedConstant;
    }

    function d3_selection_classedName(name) {
        var re = d3_selection_classedRe(name);
        return function (node, value) {
            if (c = node.classList) return value ? c.add(name) : c.remove(name);
            var c = node.className, cb = c.baseVal != null, cv = cb ? c.baseVal : c;
            if (value) {
                re.lastIndex = 0;
                if (!re.test(cv)) {
                    cv = d3_collapse(cv + " " + name);
                    if (cb) c.baseVal = cv; else node.className = cv;
                }
            } else if (cv) {
                cv = d3_collapse(cv.replace(re, " "));
                if (cb) c.baseVal = cv; else node.className = cv;
            }
        };
    }

    function d3_selection_style(name, value, priority) {
        function styleNull() {
            this.style.removeProperty(name);
        }

        function styleConstant() {
            this.style.setProperty(name, value, priority);
        }

        function styleFunction() {
            var x = value.apply(this, arguments);
            if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
        }

        return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
    }

    function d3_selection_property(name, value) {
        function propertyNull() {
            delete this[name];
        }

        function propertyConstant() {
            this[name] = value;
        }

        function propertyFunction() {
            var x = value.apply(this, arguments);
            if (x == null) delete this[name]; else this[name] = x;
        }

        return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
    }

    function d3_selection_dataNode(data) {
        return {
            __data__:data
        };
    }

    function d3_selection_filter(selector) {
        return function () {
            return d3_selectMatches(this, selector);
        };
    }

    function d3_selection_sortComparator(comparator) {
        if (!arguments.length) comparator = d3.ascending;
        return function (a, b) {
            return comparator(a && a.__data__, b && b.__data__);
        };
    }

    function d3_selection_on(type, listener, capture) {
        function onRemove() {
            var wrapper = this[name];
            if (wrapper) {
                this.removeEventListener(type, wrapper, wrapper.$);
                delete this[name];
            }
        }

        function onAdd() {
            function wrapper(e) {
                var o = d3.event;
                d3.event = e;
                args[0] = node.__data__;
                try {
                    listener.apply(node, args);
                } finally {
                    d3.event = o;
                }
            }

            var node = this, args = arguments;
            onRemove.call(this);
            this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
            wrapper._ = listener;
        }

        var name = "__on" + type, i = type.indexOf(".");
        if (i > 0) type = type.substring(0, i);
        return listener ? onAdd : onRemove;
    }

    function d3_selection_each(groups, callback) {
        for (var j = 0, m = groups.length; j < m; j++) {
            for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
                if (node = group[i]) callback(node, i, j);
            }
        }
        return groups;
    }

    function d3_selection_enter(selection) {
        d3_arraySubclass(selection, d3_selection_enterPrototype);
        return selection;
    }

    function d3_transition(groups, id, time) {
        d3_arraySubclass(groups, d3_transitionPrototype);
        var tweens = new d3_Map, event = d3.dispatch("start", "end"), ease = d3_transitionEase;
        groups.id = id;
        groups.time = time;
        groups.tween = function (name, tween) {
            if (arguments.length < 2) return tweens.get(name);
            if (tween == null) tweens.remove(name); else tweens.set(name, tween);
            return groups;
        };
        groups.ease = function (value) {
            if (!arguments.length) return ease;
            ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
            return groups;
        };
        groups.each = function (type, listener) {
            if (arguments.length < 2) return d3_transition_each.call(groups, type);
            event.on(type, listener);
            return groups;
        };
        d3.timer(function (elapsed) {
            return d3_selection_each(groups, function (node, i, j) {
                function start(elapsed) {
                    if (lock.active > id) return stop();
                    lock.active = id;
                    tweens.forEach(function (key, value) {
                        if (value = value.call(node, d, i)) {
                            tweened.push(value);
                        }
                    });
                    event.start.call(node, d, i);
                    if (!tick(elapsed)) d3.timer(tick, 0, time);
                    return 1;
                }

                function tick(elapsed) {
                    if (lock.active !== id) return stop();
                    var t = (elapsed - delay) / duration, e = ease(t), n = tweened.length;
                    while (n > 0) {
                        tweened[--n].call(node, e);
                    }
                    if (t >= 1) {
                        stop();
                        d3_transitionId = id;
                        event.end.call(node, d, i);
                        d3_transitionId = 0;
                        return 1;
                    }
                }

                function stop() {
                    if (!--lock.count) delete node.__transition__;
                    return 1;
                }

                var tweened = [], delay = node.delay, duration = node.duration, lock = (node = node.node).__transition__ || (node.__transition__ = {
                    active:0,
                    count:0
                }), d = node.__data__;
                ++lock.count;
                delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);
            });
        }, 0, time);
        return groups;
    }

    function d3_transition_each(callback) {
        var id = d3_transitionId, ease = d3_transitionEase, delay = d3_transitionDelay, duration = d3_transitionDuration;
        d3_transitionId = this.id;
        d3_transitionEase = this.ease();
        d3_selection_each(this, function (node, i, j) {
            d3_transitionDelay = node.delay;
            d3_transitionDuration = node.duration;
            callback.call(node = node.node, node.__data__, i, j);
        });
        d3_transitionId = id;
        d3_transitionEase = ease;
        d3_transitionDelay = delay;
        d3_transitionDuration = duration;
        return this;
    }

    function d3_tweenNull(d, i, a) {
        return a != "" && d3_tweenRemove;
    }

    function d3_tweenByName(b, name) {
        return d3.tween(b, d3_interpolateByName(name));
    }

    function d3_timer_step() {
        var elapsed, now = Date.now(), t1 = d3_timer_queue;
        while (t1) {
            elapsed = now - t1.then;
            if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
            t1 = t1.next;
        }
        var delay = d3_timer_flush() - now;
        if (delay > 24) {
            if (isFinite(delay)) {
                clearTimeout(d3_timer_timeout);
                d3_timer_timeout = setTimeout(d3_timer_step, delay);
            }
            d3_timer_interval = 0;
        } else {
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
        }
    }

    function d3_timer_flush() {
        var t0 = null, t1 = d3_timer_queue, then = Infinity;
        while (t1) {
            if (t1.flush) {
                t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
            } else {
                then = Math.min(then, t1.then + t1.delay);
                t1 = (t0 = t1).next;
            }
        }
        return then;
    }

    function d3_mousePoint(container, e) {
        var svg = container.ownerSVGElement || container;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            if (d3_mouse_bug44083 < 0 && (window.scrollX || window.scrollY)) {
                svg = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
                var ctm = svg[0][0].getScreenCTM();
                d3_mouse_bug44083 = !(ctm.f || ctm.e);
                svg.remove();
            }
            if (d3_mouse_bug44083) {
                point.x = e.pageX;
                point.y = e.pageY;
            } else {
                point.x = e.clientX;
                point.y = e.clientY;
            }
            point = point.matrixTransform(container.getScreenCTM().inverse());
            return [ point.x, point.y ];
        }
        var rect = container.getBoundingClientRect();
        return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
    }

    function d3_noop() {
    }

    function d3_scaleExtent(domain) {
        var start = domain[0], stop = domain[domain.length - 1];
        return start < stop ? [ start, stop ] : [ stop, start ];
    }

    function d3_scaleRange(scale) {
        return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
    }

    function d3_scale_nice(domain, nice) {
        var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
        if (x1 < x0) {
            dx = i0, i0 = i1, i1 = dx;
            dx = x0, x0 = x1, x1 = dx;
        }
        if (nice = nice(x1 - x0)) {
            domain[i0] = nice.floor(x0);
            domain[i1] = nice.ceil(x1);
        }
        return domain;
    }

    function d3_scale_niceDefault() {
        return Math;
    }

    function d3_scale_linear(domain, range, interpolate, clamp) {
        function rescale() {
            var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
            output = linear(domain, range, uninterpolate, interpolate);
            input = linear(range, domain, uninterpolate, d3.interpolate);
            return scale;
        }

        function scale(x) {
            return output(x);
        }

        var output, input;
        scale.invert = function (y) {
            return input(y);
        };
        scale.domain = function (x) {
            if (!arguments.length) return domain;
            domain = x.map(Number);
            return rescale();
        };
        scale.range = function (x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.rangeRound = function (x) {
            return scale.range(x).interpolate(d3.interpolateRound);
        };
        scale.clamp = function (x) {
            if (!arguments.length) return clamp;
            clamp = x;
            return rescale();
        };
        scale.interpolate = function (x) {
            if (!arguments.length) return interpolate;
            interpolate = x;
            return rescale();
        };
        scale.ticks = function (m) {
            return d3_scale_linearTicks(domain, m);
        };
        scale.tickFormat = function (m) {
            return d3_scale_linearTickFormat(domain, m);
        };
        scale.nice = function () {
            d3_scale_nice(domain, d3_scale_linearNice);
            return rescale();
        };
        scale.copy = function () {
            return d3_scale_linear(domain, range, interpolate, clamp);
        };
        return rescale();
    }

    function d3_scale_linearRebind(scale, linear) {
        return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
    }

    function d3_scale_linearNice(dx) {
        dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
        return dx && {
            floor:function (x) {
                return Math.floor(x / dx) * dx;
            },
            ceil:function (x) {
                return Math.ceil(x / dx) * dx;
            }
        };
    }

    function d3_scale_linearTickRange(domain, m) {
        var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
        if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
        extent[0] = Math.ceil(extent[0] / step) * step;
        extent[1] = Math.floor(extent[1] / step) * step + step * .5;
        extent[2] = step;
        return extent;
    }

    function d3_scale_linearTicks(domain, m) {
        return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
    }

    function d3_scale_linearTickFormat(domain, m) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
    }

    function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
        var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
        return function (x) {
            return i(u(x));
        };
    }

    function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
        var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
        if (domain[k] < domain[0]) {
            domain = domain.slice().reverse();
            range = range.slice().reverse();
        }
        while (++j <= k) {
            u.push(uninterpolate(domain[j - 1], domain[j]));
            i.push(interpolate(range[j - 1], range[j]));
        }
        return function (x) {
            var j = d3.bisect(domain, x, 1, k) - 1;
            return i[j](u[j](x));
        };
    }

    function d3_scale_log(linear, log) {
        function scale(x) {
            return linear(log(x));
        }

        var pow = log.pow;
        scale.invert = function (x) {
            return pow(linear.invert(x));
        };
        scale.domain = function (x) {
            if (!arguments.length) return linear.domain().map(pow);
            log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
            pow = log.pow;
            linear.domain(x.map(log));
            return scale;
        };
        scale.nice = function () {
            linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
            return scale;
        };
        scale.ticks = function () {
            var extent = d3_scaleExtent(linear.domain()), ticks = [];
            if (extent.every(isFinite)) {
                var i = Math.floor(extent[0]), j = Math.ceil(extent[1]), u = pow(extent[0]), v = pow(extent[1]);
                if (log === d3_scale_logn) {
                    ticks.push(pow(i));
                    for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
                } else {
                    for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
                    ticks.push(pow(i));
                }
                for (i = 0; ticks[i] < u; i++) {
                }
                for (j = ticks.length; ticks[j - 1] > v; j--) {
                }
                ticks = ticks.slice(i, j);
            }
            return ticks;
        };
        scale.tickFormat = function (n, format) {
            if (arguments.length < 2) format = d3_scale_logFormat;
            if (arguments.length < 1) return format;
            var k = Math.max(.1, n / scale.ticks().length), f = log === d3_scale_logn ? (e = -1e-12, Math.floor) : (e = 1e-12, Math.ceil), e;
            return function (d) {
                return d / pow(f(log(d) + e)) <= k ? format(d) : "";
            };
        };
        scale.copy = function () {
            return d3_scale_log(linear.copy(), log);
        };
        return d3_scale_linearRebind(scale, linear);
    }

    function d3_scale_logp(x) {
        return Math.log(x < 0 ? 0 : x) / Math.LN10;
    }

    function d3_scale_logn(x) {
        return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
    }

    function d3_scale_pow(linear, exponent) {
        function scale(x) {
            return linear(powp(x));
        }

        var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
        scale.invert = function (x) {
            return powb(linear.invert(x));
        };
        scale.domain = function (x) {
            if (!arguments.length) return linear.domain().map(powb);
            linear.domain(x.map(powp));
            return scale;
        };
        scale.ticks = function (m) {
            return d3_scale_linearTicks(scale.domain(), m);
        };
        scale.tickFormat = function (m) {
            return d3_scale_linearTickFormat(scale.domain(), m);
        };
        scale.nice = function () {
            return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
        };
        scale.exponent = function (x) {
            if (!arguments.length) return exponent;
            var domain = scale.domain();
            powp = d3_scale_powPow(exponent = x);
            powb = d3_scale_powPow(1 / exponent);
            return scale.domain(domain);
        };
        scale.copy = function () {
            return d3_scale_pow(linear.copy(), exponent);
        };
        return d3_scale_linearRebind(scale, linear);
    }

    function d3_scale_powPow(e) {
        return function (x) {
            return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
        };
    }

    function d3_scale_ordinal(domain, ranger) {
        function scale(x) {
            return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
        }

        function steps(start, step) {
            return d3.range(domain.length).map(function (i) {
                return start + step * i;
            });
        }

        var index, range, rangeBand;
        scale.domain = function (x) {
            if (!arguments.length) return domain;
            domain = [];
            index = new d3_Map;
            var i = -1, n = x.length, xi;
            while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
            return scale[ranger.t].apply(scale, ranger.a);
        };
        scale.range = function (x) {
            if (!arguments.length) return range;
            range = x;
            rangeBand = 0;
            ranger = {
                t:"range",
                a:arguments
            };
            return scale;
        };
        scale.rangePoints = function (x, padding) {
            if (arguments.length < 2) padding = 0;
            var start = x[0], stop = x[1], step = (stop - start) / (Math.max(1, domain.length - 1) + padding);
            range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
            rangeBand = 0;
            ranger = {
                t:"rangePoints",
                a:arguments
            };
            return scale;
        };
        scale.rangeBands = function (x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
            range = steps(start + step * outerPadding, step);
            if (reverse) range.reverse();
            rangeBand = step * (1 - padding);
            ranger = {
                t:"rangeBands",
                a:arguments
            };
            return scale;
        };
        scale.rangeRoundBands = function (x, padding, outerPadding) {
            if (arguments.length < 2) padding = 0;
            if (arguments.length < 3) outerPadding = padding;
            var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding)), error = stop - start - (domain.length - padding) * step;
            range = steps(start + Math.round(error / 2), step);
            if (reverse) range.reverse();
            rangeBand = Math.round(step * (1 - padding));
            ranger = {
                t:"rangeRoundBands",
                a:arguments
            };
            return scale;
        };
        scale.rangeBand = function () {
            return rangeBand;
        };
        scale.rangeExtent = function () {
            return d3_scaleExtent(ranger.a[0]);
        };
        scale.copy = function () {
            return d3_scale_ordinal(domain, ranger);
        };
        return scale.domain(domain);
    }

    function d3_scale_quantile(domain, range) {
        function rescale() {
            var k = 0, n = domain.length, q = range.length;
            thresholds = [];
            while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
            return scale;
        }

        function scale(x) {
            if (isNaN(x = +x)) return NaN;
            return range[d3.bisect(thresholds, x)];
        }

        var thresholds;
        scale.domain = function (x) {
            if (!arguments.length) return domain;
            domain = x.filter(function (d) {
                return !isNaN(d);
            }).sort(d3.ascending);
            return rescale();
        };
        scale.range = function (x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.quantiles = function () {
            return thresholds;
        };
        scale.copy = function () {
            return d3_scale_quantile(domain, range);
        };
        return rescale();
    }

    function d3_scale_quantize(x0, x1, range) {
        function scale(x) {
            return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
        }

        function rescale() {
            kx = range.length / (x1 - x0);
            i = range.length - 1;
            return scale;
        }

        var kx, i;
        scale.domain = function (x) {
            if (!arguments.length) return [ x0, x1 ];
            x0 = +x[0];
            x1 = +x[x.length - 1];
            return rescale();
        };
        scale.range = function (x) {
            if (!arguments.length) return range;
            range = x;
            return rescale();
        };
        scale.copy = function () {
            return d3_scale_quantize(x0, x1, range);
        };
        return rescale();
    }

    function d3_scale_threshold(domain, range) {
        function scale(x) {
            return range[d3.bisect(domain, x)];
        }

        scale.domain = function (_) {
            if (!arguments.length) return domain;
            domain = _;
            return scale;
        };
        scale.range = function (_) {
            if (!arguments.length) return range;
            range = _;
            return scale;
        };
        scale.copy = function () {
            return d3_scale_threshold(domain, range);
        };
        return scale;
    }

    function d3_scale_identity(domain) {
        function identity(x) {
            return +x;
        }

        identity.invert = identity;
        identity.domain = identity.range = function (x) {
            if (!arguments.length) return domain;
            domain = x.map(identity);
            return identity;
        };
        identity.ticks = function (m) {
            return d3_scale_linearTicks(domain, m);
        };
        identity.tickFormat = function (m) {
            return d3_scale_linearTickFormat(domain, m);
        };
        identity.copy = function () {
            return d3_scale_identity(domain);
        };
        return identity;
    }

    function d3_svg_arcInnerRadius(d) {
        return d.innerRadius;
    }

    function d3_svg_arcOuterRadius(d) {
        return d.outerRadius;
    }

    function d3_svg_arcStartAngle(d) {
        return d.startAngle;
    }

    function d3_svg_arcEndAngle(d) {
        return d.endAngle;
    }

    function d3_svg_line(projection) {
        function line(data) {
            function segment() {
                segments.push("M", interpolate(projection(points), tension));
            }

            var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
            while (++i < n) {
                if (defined.call(this, d = data[i], i)) {
                    points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
                } else if (points.length) {
                    segment();
                    points = [];
                }
            }
            if (points.length) segment();
            return segments.length ? segments.join("") : null;
        }

        var x = d3_svg_lineX, y = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
        line.x = function (_) {
            if (!arguments.length) return x;
            x = _;
            return line;
        };
        line.y = function (_) {
            if (!arguments.length) return y;
            y = _;
            return line;
        };
        line.defined = function (_) {
            if (!arguments.length) return defined;
            defined = _;
            return line;
        };
        line.interpolate = function (_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            return line;
        };
        line.tension = function (_) {
            if (!arguments.length) return tension;
            tension = _;
            return line;
        };
        return line;
    }

    function d3_svg_lineX(d) {
        return d[0];
    }

    function d3_svg_lineY(d) {
        return d[1];
    }

    function d3_svg_lineLinear(points) {
        return points.join("L");
    }

    function d3_svg_lineLinearClosed(points) {
        return d3_svg_lineLinear(points) + "Z";
    }

    function d3_svg_lineStepBefore(points) {
        var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
        while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
        return path.join("");
    }

    function d3_svg_lineStepAfter(points) {
        var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
        while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
        return path.join("");
    }

    function d3_svg_lineCardinalOpen(points, tension) {
        return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1), d3_svg_lineCardinalTangents(points, tension));
    }

    function d3_svg_lineCardinalClosed(points, tension) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
    }

    function d3_svg_lineCardinal(points, tension, closed) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
    }

    function d3_svg_lineHermite(points, tangents) {
        if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
            return d3_svg_lineLinear(points);
        }
        var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
        if (quad) {
            path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
            p0 = points[1];
            pi = 2;
        }
        if (tangents.length > 1) {
            t = tangents[1];
            p = points[pi];
            pi++;
            path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            for (var i = 2; i < tangents.length; i++, pi++) {
                p = points[pi];
                t = tangents[i];
                path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
            }
        }
        if (quad) {
            var lp = points[pi];
            path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
        }
        return path;
    }

    function d3_svg_lineCardinalTangents(points, tension) {
        var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
        while (++i < n) {
            p0 = p1;
            p1 = p2;
            p2 = points[i];
            tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
        }
        return tangents;
    }

    function d3_svg_lineBasis(points) {
        if (points.length < 3) return d3_svg_lineLinear(points);
        var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0 ];
        d3_svg_lineBasisBezier(path, px, py);
        while (++i < n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        i = -1;
        while (++i < 2) {
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }

    function d3_svg_lineBasisOpen(points) {
        if (points.length < 4) return d3_svg_lineLinear(points);
        var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
        while (++i < 3) {
            pi = points[i];
            px.push(pi[0]);
            py.push(pi[1]);
        }
        path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
        --i;
        while (++i < n) {
            pi = points[i];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }

    function d3_svg_lineBasisClosed(points) {
        var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
        while (++i < 4) {
            pi = points[i % n];
            px.push(pi[0]);
            py.push(pi[1]);
        }
        path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
        --i;
        while (++i < m) {
            pi = points[i % n];
            px.shift();
            px.push(pi[0]);
            py.shift();
            py.push(pi[1]);
            d3_svg_lineBasisBezier(path, px, py);
        }
        return path.join("");
    }

    function d3_svg_lineBundle(points, tension) {
        var n = points.length - 1;
        if (n) {
            var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
            while (++i <= n) {
                p = points[i];
                t = i / n;
                p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
                p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
            }
        }
        return d3_svg_lineBasis(points);
    }

    function d3_svg_lineDot4(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    function d3_svg_lineBasisBezier(path, x, y) {
        path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
    }

    function d3_svg_lineSlope(p0, p1) {
        return (p1[1] - p0[1]) / (p1[0] - p0[0]);
    }

    function d3_svg_lineFiniteDifferences(points) {
        var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
        while (++i < j) {
            m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
        }
        m[i] = d;
        return m;
    }

    function d3_svg_lineMonotoneTangents(points) {
        var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
        while (++i < j) {
            d = d3_svg_lineSlope(points[i], points[i + 1]);
            if (Math.abs(d) < 1e-6) {
                m[i] = m[i + 1] = 0;
            } else {
                a = m[i] / d;
                b = m[i + 1] / d;
                s = a * a + b * b;
                if (s > 9) {
                    s = d * 3 / Math.sqrt(s);
                    m[i] = s * a;
                    m[i + 1] = s * b;
                }
            }
        }
        i = -1;
        while (++i <= j) {
            s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
            tangents.push([ s || 0, m[i] * s || 0 ]);
        }
        return tangents;
    }

    function d3_svg_lineMonotone(points) {
        return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
    }

    function d3_svg_lineRadial(points) {
        var point, i = -1, n = points.length, r, a;
        while (++i < n) {
            point = points[i];
            r = point[0];
            a = point[1] + d3_svg_arcOffset;
            point[0] = r * Math.cos(a);
            point[1] = r * Math.sin(a);
        }
        return points;
    }

    function d3_svg_area(projection) {
        function area(data) {
            function segment() {
                segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
            }

            var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function () {
                return x;
            } : d3_functor(x1), fy1 = y0 === y1 ? function () {
                return y;
            } : d3_functor(y1), x, y;
            while (++i < n) {
                if (defined.call(this, d = data[i], i)) {
                    points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
                    points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
                } else if (points0.length) {
                    segment();
                    points0 = [];
                    points1 = [];
                }
            }
            if (points0.length) segment();
            return segments.length ? segments.join("") : null;
        }

        var x0 = d3_svg_lineX, x1 = d3_svg_lineX, y0 = 0, y1 = d3_svg_lineY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
        area.x = function (_) {
            if (!arguments.length) return x1;
            x0 = x1 = _;
            return area;
        };
        area.x0 = function (_) {
            if (!arguments.length) return x0;
            x0 = _;
            return area;
        };
        area.x1 = function (_) {
            if (!arguments.length) return x1;
            x1 = _;
            return area;
        };
        area.y = function (_) {
            if (!arguments.length) return y1;
            y0 = y1 = _;
            return area;
        };
        area.y0 = function (_) {
            if (!arguments.length) return y0;
            y0 = _;
            return area;
        };
        area.y1 = function (_) {
            if (!arguments.length) return y1;
            y1 = _;
            return area;
        };
        area.defined = function (_) {
            if (!arguments.length) return defined;
            defined = _;
            return area;
        };
        area.interpolate = function (_) {
            if (!arguments.length) return interpolateKey;
            if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
            interpolateReverse = interpolate.reverse || interpolate;
            L = interpolate.closed ? "M" : "L";
            return area;
        };
        area.tension = function (_) {
            if (!arguments.length) return tension;
            tension = _;
            return area;
        };
        return area;
    }

    function d3_svg_chordSource(d) {
        return d.source;
    }

    function d3_svg_chordTarget(d) {
        return d.target;
    }

    function d3_svg_chordRadius(d) {
        return d.radius;
    }

    function d3_svg_chordStartAngle(d) {
        return d.startAngle;
    }

    function d3_svg_chordEndAngle(d) {
        return d.endAngle;
    }

    function d3_svg_diagonalProjection(d) {
        return [ d.x, d.y ];
    }

    function d3_svg_diagonalRadialProjection(projection) {
        return function () {
            var d = projection.apply(this, arguments), r = d[0], a = d[1] + d3_svg_arcOffset;
            return [ r * Math.cos(a), r * Math.sin(a) ];
        };
    }

    function d3_svg_symbolSize() {
        return 64;
    }

    function d3_svg_symbolType() {
        return "circle";
    }

    function d3_svg_symbolCircle(size) {
        var r = Math.sqrt(size / Math.PI);
        return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
    }

    function d3_svg_axisX(selection, x) {
        selection.attr("transform", function (d) {
            return "translate(" + x(d) + ",0)";
        });
    }

    function d3_svg_axisY(selection, y) {
        selection.attr("transform", function (d) {
            return "translate(0," + y(d) + ")";
        });
    }

    function d3_svg_axisSubdivide(scale, ticks, m) {
        subticks = [];
        if (m && ticks.length > 1) {
            var extent = d3_scaleExtent(scale.domain()), subticks, i = -1, n = ticks.length, d = (ticks[1] - ticks[0]) / ++m, j, v;
            while (++i < n) {
                for (j = m; --j > 0;) {
                    if ((v = +ticks[i] - j * d) >= extent[0]) {
                        subticks.push(v);
                    }
                }
            }
            for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
                subticks.push(v);
            }
        }
        return subticks;
    }

    function d3_behavior_zoomDelta() {
        if (!d3_behavior_zoomDiv) {
            d3_behavior_zoomDiv = d3.select("body").append("div").style("visibility", "hidden").style("top", 0).style("height", 0).style("width", 0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode;
        }
        var e = d3.event, delta;
        try {
            d3_behavior_zoomDiv.scrollTop = 1e3;
            d3_behavior_zoomDiv.dispatchEvent(e);
            delta = 1e3 - d3_behavior_zoomDiv.scrollTop;
        } catch (error) {
            delta = e.wheelDelta || -e.detail * 5;
        }
        return delta;
    }

    function d3_layout_bundlePath(link) {
        var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
        while (start !== lca) {
            start = start.parent;
            points.push(start);
        }
        var k = points.length;
        while (end !== lca) {
            points.splice(k, 0, end);
            end = end.parent;
        }
        return points;
    }

    function d3_layout_bundleAncestors(node) {
        var ancestors = [], parent = node.parent;
        while (parent != null) {
            ancestors.push(node);
            node = parent;
            parent = parent.parent;
        }
        ancestors.push(node);
        return ancestors;
    }

    function d3_layout_bundleLeastCommonAncestor(a, b) {
        if (a === b) return a;
        var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
        while (aNode === bNode) {
            sharedNode = aNode;
            aNode = aNodes.pop();
            bNode = bNodes.pop();
        }
        return sharedNode;
    }

    function d3_layout_forceDragstart(d) {
        d.fixed |= 2;
    }

    function d3_layout_forceDragend(d) {
        d.fixed &= 1;
    }

    function d3_layout_forceMouseover(d) {
        d.fixed |= 4;
    }

    function d3_layout_forceMouseout(d) {
        d.fixed &= 3;
    }

    function d3_layout_forceAccumulate(quad, alpha, charges) {
        var cx = 0, cy = 0;
        quad.charge = 0;
        if (!quad.leaf) {
            var nodes = quad.nodes, n = nodes.length, i = -1, c;
            while (++i < n) {
                c = nodes[i];
                if (c == null) continue;
                d3_layout_forceAccumulate(c, alpha, charges);
                quad.charge += c.charge;
                cx += c.charge * c.cx;
                cy += c.charge * c.cy;
            }
        }
        if (quad.point) {
            if (!quad.leaf) {
                quad.point.x += Math.random() - .5;
                quad.point.y += Math.random() - .5;
            }
            var k = alpha * charges[quad.point.index];
            quad.charge += quad.pointCharge = k;
            cx += k * quad.point.x;
            cy += k * quad.point.y;
        }
        quad.cx = cx / quad.charge;
        quad.cy = cy / quad.charge;
    }

    function d3_layout_forceLinkDistance(link) {
        return 20;
    }

    function d3_layout_forceLinkStrength(link) {
        return 1;
    }

    function d3_layout_stackX(d) {
        return d.x;
    }

    function d3_layout_stackY(d) {
        return d.y;
    }

    function d3_layout_stackOut(d, y0, y) {
        d.y0 = y0;
        d.y = y;
    }

    function d3_layout_stackOrderDefault(data) {
        return d3.range(data.length);
    }

    function d3_layout_stackOffsetZero(data) {
        var j = -1, m = data[0].length, y0 = [];
        while (++j < m) y0[j] = 0;
        return y0;
    }

    function d3_layout_stackMaxIndex(array) {
        var i = 1, j = 0, v = array[0][1], k, n = array.length;
        for (; i < n; ++i) {
            if ((k = array[i][1]) > v) {
                j = i;
                v = k;
            }
        }
        return j;
    }

    function d3_layout_stackReduceSum(d) {
        return d.reduce(d3_layout_stackSum, 0);
    }

    function d3_layout_stackSum(p, d) {
        return p + d[1];
    }

    function d3_layout_histogramBinSturges(range, values) {
        return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
    }

    function d3_layout_histogramBinFixed(range, n) {
        var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
        while (++x <= n) f[x] = m * x + b;
        return f;
    }

    function d3_layout_histogramRange(values) {
        return [ d3.min(values), d3.max(values) ];
    }

    function d3_layout_hierarchyRebind(object, hierarchy) {
        d3.rebind(object, hierarchy, "sort", "children", "value");
        object.links = d3_layout_hierarchyLinks;
        object.nodes = function (d) {
            d3_layout_hierarchyInline = true;
            return (object.nodes = object)(d);
        };
        return object;
    }

    function d3_layout_hierarchyChildren(d) {
        return d.children;
    }

    function d3_layout_hierarchyValue(d) {
        return d.value;
    }

    function d3_layout_hierarchySort(a, b) {
        return b.value - a.value;
    }

    function d3_layout_hierarchyLinks(nodes) {
        return d3.merge(nodes.map(function (parent) {
            return (parent.children || []).map(function (child) {
                return {
                    source:parent,
                    target:child
                };
            });
        }));
    }

    function d3_layout_packSort(a, b) {
        return a.value - b.value;
    }

    function d3_layout_packInsert(a, b) {
        var c = a._pack_next;
        a._pack_next = b;
        b._pack_prev = a;
        b._pack_next = c;
        c._pack_prev = b;
    }

    function d3_layout_packSplice(a, b) {
        a._pack_next = b;
        b._pack_prev = a;
    }

    function d3_layout_packIntersects(a, b) {
        var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
        return dr * dr - dx * dx - dy * dy > .001;
    }

    function d3_layout_packSiblings(node) {
        function bound(node) {
            xMin = Math.min(node.x - node.r, xMin);
            xMax = Math.max(node.x + node.r, xMax);
            yMin = Math.min(node.y - node.r, yMin);
            yMax = Math.max(node.y + node.r, yMax);
        }

        if (!(nodes = node.children) || !(n = nodes.length)) return;
        var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
        nodes.forEach(d3_layout_packLink);
        a = nodes[0];
        a.x = -a.r;
        a.y = 0;
        bound(a);
        if (n > 1) {
            b = nodes[1];
            b.x = b.r;
            b.y = 0;
            bound(b);
            if (n > 2) {
                c = nodes[2];
                d3_layout_packPlace(a, b, c);
                bound(c);
                d3_layout_packInsert(a, c);
                a._pack_prev = c;
                d3_layout_packInsert(c, b);
                b = a._pack_next;
                for (i = 3; i < n; i++) {
                    d3_layout_packPlace(a, b, c = nodes[i]);
                    var isect = 0, s1 = 1, s2 = 1;
                    for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
                        if (d3_layout_packIntersects(j, c)) {
                            isect = 1;
                            break;
                        }
                    }
                    if (isect == 1) {
                        for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
                            if (d3_layout_packIntersects(k, c)) {
                                break;
                            }
                        }
                    }
                    if (isect) {
                        if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
                        i--;
                    } else {
                        d3_layout_packInsert(a, c);
                        b = c;
                        bound(c);
                    }
                }
            }
        }
        var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
        for (i = 0; i < n; i++) {
            c = nodes[i];
            c.x -= cx;
            c.y -= cy;
            cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
        }
        node.r = cr;
        nodes.forEach(d3_layout_packUnlink);
    }

    function d3_layout_packLink(node) {
        node._pack_next = node._pack_prev = node;
    }

    function d3_layout_packUnlink(node) {
        delete node._pack_next;
        delete node._pack_prev;
    }

    function d3_layout_packTransform(node, x, y, k) {
        var children = node.children;
        node.x = x += k * node.x;
        node.y = y += k * node.y;
        node.r *= k;
        if (children) {
            var i = -1, n = children.length;
            while (++i < n) d3_layout_packTransform(children[i], x, y, k);
        }
    }

    function d3_layout_packPlace(a, b, c) {
        var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
        if (db && (dx || dy)) {
            var da = b.r + c.r, dc = dx * dx + dy * dy;
            da *= da;
            db *= db;
            var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
            c.x = a.x + x * dx + y * dy;
            c.y = a.y + x * dy - y * dx;
        } else {
            c.x = a.x + db;
            c.y = a.y;
        }
    }

    function d3_layout_clusterY(children) {
        return 1 + d3.max(children, function (child) {
            return child.y;
        });
    }

    function d3_layout_clusterX(children) {
        return children.reduce(function (x, child) {
            return x + child.x;
        }, 0) / children.length;
    }

    function d3_layout_clusterLeft(node) {
        var children = node.children;
        return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
    }

    function d3_layout_clusterRight(node) {
        var children = node.children, n;
        return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
    }

    function d3_layout_treeSeparation(a, b) {
        return a.parent == b.parent ? 1 : 2;
    }

    function d3_layout_treeLeft(node) {
        var children = node.children;
        return children && children.length ? children[0] : node._tree.thread;
    }

    function d3_layout_treeRight(node) {
        var children = node.children, n;
        return children && (n = children.length) ? children[n - 1] : node._tree.thread;
    }

    function d3_layout_treeSearch(node, compare) {
        var children = node.children;
        if (children && (n = children.length)) {
            var child, n, i = -1;
            while (++i < n) {
                if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
                    node = child;
                }
            }
        }
        return node;
    }

    function d3_layout_treeRightmost(a, b) {
        return a.x - b.x;
    }

    function d3_layout_treeLeftmost(a, b) {
        return b.x - a.x;
    }

    function d3_layout_treeDeepest(a, b) {
        return a.depth - b.depth;
    }

    function d3_layout_treeVisitAfter(node, callback) {
        function visit(node, previousSibling) {
            var children = node.children;
            if (children && (n = children.length)) {
                var child, previousChild = null, i = -1, n;
                while (++i < n) {
                    child = children[i];
                    visit(child, previousChild);
                    previousChild = child;
                }
            }
            callback(node, previousSibling);
        }

        visit(node, null);
    }

    function d3_layout_treeShift(node) {
        var shift = 0, change = 0, children = node.children, i = children.length, child;
        while (--i >= 0) {
            child = children[i]._tree;
            child.prelim += shift;
            child.mod += shift;
            shift += child.shift + (change += child.change);
        }
    }

    function d3_layout_treeMove(ancestor, node, shift) {
        ancestor = ancestor._tree;
        node = node._tree;
        var change = shift / (node.number - ancestor.number);
        ancestor.change += change;
        node.change -= change;
        node.shift += shift;
        node.prelim += shift;
        node.mod += shift;
    }

    function d3_layout_treeAncestor(vim, node, ancestor) {
        return vim._tree.ancestor.parent == node.parent ? vim._tree.ancestor : ancestor;
    }

    function d3_layout_treemapPadNull(node) {
        return {
            x:node.x,
            y:node.y,
            dx:node.dx,
            dy:node.dy
        };
    }

    function d3_layout_treemapPad(node, padding) {
        var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
        if (dx < 0) {
            x += dx / 2;
            dx = 0;
        }
        if (dy < 0) {
            y += dy / 2;
            dy = 0;
        }
        return {
            x:x,
            y:y,
            dx:dx,
            dy:dy
        };
    }

    function d3_dsv(delimiter, mimeType) {
        function dsv(url, callback) {
            d3.text(url, mimeType, function (text) {
                callback(text && dsv.parse(text));
            });
        }

        function formatRow(row) {
            return row.map(formatValue).join(delimiter);
        }

        function formatValue(text) {
            return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
        }

        var reParse = new RegExp("\r\n|[" + delimiter + "\r\n]", "g"), reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
        dsv.parse = function (text) {
            var header;
            return dsv.parseRows(text, function (row, i) {
                if (i) {
                    var o = {}, j = -1, m = header.length;
                    while (++j < m) o[header[j]] = row[j];
                    return o;
                } else {
                    header = row;
                    return null;
                }
            });
        };
        dsv.parseRows = function (text, f) {
            function token() {
                if (reParse.lastIndex >= text.length) return EOF;
                if (eol) {
                    eol = false;
                    return EOL;
                }
                var j = reParse.lastIndex;
                if (text.charCodeAt(j) === 34) {
                    var i = j;
                    while (i++ < text.length) {
                        if (text.charCodeAt(i) === 34) {
                            if (text.charCodeAt(i + 1) !== 34) break;
                            i++;
                        }
                    }
                    reParse.lastIndex = i + 2;
                    var c = text.charCodeAt(i + 1);
                    if (c === 13) {
                        eol = true;
                        if (text.charCodeAt(i + 2) === 10) reParse.lastIndex++;
                    } else if (c === 10) {
                        eol = true;
                    }
                    return text.substring(j + 1, i).replace(/""/g, '"');
                }
                var m = reParse.exec(text);
                if (m) {
                    eol = m[0].charCodeAt(0) !== delimiterCode;
                    return text.substring(j, m.index);
                }
                reParse.lastIndex = text.length;
                return text.substring(j);
            }

            var EOL = {}, EOF = {}, rows = [], n = 0, t, eol;
            reParse.lastIndex = 0;
            while ((t = token()) !== EOF) {
                var a = [];
                while (t !== EOL && t !== EOF) {
                    a.push(t);
                    t = token();
                }
                if (f && !(a = f(a, n++))) continue;
                rows.push(a);
            }
            return rows;
        };
        dsv.format = function (rows) {
            return rows.map(formatRow).join("\n");
        };
        return dsv;
    }

    function d3_geo_type(types, defaultValue) {
        return function (object) {
            return object && types.hasOwnProperty(object.type) ? types[object.type](object) : defaultValue;
        };
    }

    function d3_path_circle(radius) {
        return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + +2 * radius + "z";
    }

    function d3_geo_bounds(o, f) {
        if (d3_geo_boundsTypes.hasOwnProperty(o.type)) d3_geo_boundsTypes[o.type](o, f);
    }

    function d3_geo_boundsFeature(o, f) {
        d3_geo_bounds(o.geometry, f);
    }

    function d3_geo_boundsFeatureCollection(o, f) {
        for (var a = o.features, i = 0, n = a.length; i < n; i++) {
            d3_geo_bounds(a[i].geometry, f);
        }
    }

    function d3_geo_boundsGeometryCollection(o, f) {
        for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
            d3_geo_bounds(a[i], f);
        }
    }

    function d3_geo_boundsLineString(o, f) {
        for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
            f.apply(null, a[i]);
        }
    }

    function d3_geo_boundsMultiLineString(o, f) {
        for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
            for (var b = a[i], j = 0, m = b.length; j < m; j++) {
                f.apply(null, b[j]);
            }
        }
    }

    function d3_geo_boundsMultiPolygon(o, f) {
        for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
            for (var b = a[i][0], j = 0, m = b.length; j < m; j++) {
                f.apply(null, b[j]);
            }
        }
    }

    function d3_geo_boundsPoint(o, f) {
        f.apply(null, o.coordinates);
    }

    function d3_geo_boundsPolygon(o, f) {
        for (var a = o.coordinates[0], i = 0, n = a.length; i < n; i++) {
            f.apply(null, a[i]);
        }
    }

    function d3_geo_greatArcSource(d) {
        return d.source;
    }

    function d3_geo_greatArcTarget(d) {
        return d.target;
    }

    function d3_geo_greatArcInterpolator() {
        function interpolate(t) {
            var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
            return [ Math.atan2(y, x) / d3_geo_radians, Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_geo_radians ];
        }

        var x0, y0, cy0, sy0, kx0, ky0, x1, y1, cy1, sy1, kx1, ky1, d, k;
        interpolate.distance = function () {
            if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))));
            return d;
        };
        interpolate.source = function (_) {
            var cx0 = Math.cos(x0 = _[0] * d3_geo_radians), sx0 = Math.sin(x0);
            cy0 = Math.cos(y0 = _[1] * d3_geo_radians);
            sy0 = Math.sin(y0);
            kx0 = cy0 * cx0;
            ky0 = cy0 * sx0;
            d = null;
            return interpolate;
        };
        interpolate.target = function (_) {
            var cx1 = Math.cos(x1 = _[0] * d3_geo_radians), sx1 = Math.sin(x1);
            cy1 = Math.cos(y1 = _[1] * d3_geo_radians);
            sy1 = Math.sin(y1);
            kx1 = cy1 * cx1;
            ky1 = cy1 * sx1;
            d = null;
            return interpolate;
        };
        return interpolate;
    }

    function d3_geo_greatArcInterpolate(a, b) {
        var i = d3_geo_greatArcInterpolator().source(a).target(b);
        i.distance();
        return i;
    }

    function d3_geom_contourStart(grid) {
        var x = 0, y = 0;
        while (true) {
            if (grid(x, y)) {
                return [ x, y ];
            }
            if (x === 0) {
                x = y + 1;
                y = 0;
            } else {
                x = x - 1;
                y = y + 1;
            }
        }
    }

    function d3_geom_hullCCW(i1, i2, i3, v) {
        var t, a, b, c, d, e, f;
        t = v[i1];
        a = t[0];
        b = t[1];
        t = v[i2];
        c = t[0];
        d = t[1];
        t = v[i3];
        e = t[0];
        f = t[1];
        return (f - b) * (c - a) - (d - b) * (e - a) > 0;
    }

    function d3_geom_polygonInside(p, a, b) {
        return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
    }

    function d3_geom_polygonIntersect(c, d, a, b) {
        var x1 = c[0], x2 = d[0], x3 = a[0], x4 = b[0], y1 = c[1], y2 = d[1], y3 = a[1], y4 = b[1], x13 = x1 - x3, x21 = x2 - x1, x43 = x4 - x3, y13 = y1 - y3, y21 = y2 - y1, y43 = y4 - y3, ua = (x43 * y13 - y43 * x13) / (y43 * x21 - x43 * y21);
        return [ x1 + ua * x21, y1 + ua * y21 ];
    }

    function d3_voronoi_tessellate(vertices, callback) {
        var Sites = {
            list:vertices.map(function (v, i) {
                return {
                    index:i,
                    x:v[0],
                    y:v[1]
                };
            }).sort(function (a, b) {
                    return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
                }),
            bottomSite:null
        };
        var EdgeList = {
            list:[],
            leftEnd:null,
            rightEnd:null,
            init:function () {
                EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
                EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
                EdgeList.leftEnd.r = EdgeList.rightEnd;
                EdgeList.rightEnd.l = EdgeList.leftEnd;
                EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
            },
            createHalfEdge:function (edge, side) {
                return {
                    edge:edge,
                    side:side,
                    vertex:null,
                    l:null,
                    r:null
                };
            },
            insert:function (lb, he) {
                he.l = lb;
                he.r = lb.r;
                lb.r.l = he;
                lb.r = he;
            },
            leftBound:function (p) {
                var he = EdgeList.leftEnd;
                do {
                    he = he.r;
                } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
                he = he.l;
                return he;
            },
            del:function (he) {
                he.l.r = he.r;
                he.r.l = he.l;
                he.edge = null;
            },
            right:function (he) {
                return he.r;
            },
            left:function (he) {
                return he.l;
            },
            leftRegion:function (he) {
                return he.edge == null ? Sites.bottomSite : he.edge.region[he.side];
            },
            rightRegion:function (he) {
                return he.edge == null ? Sites.bottomSite : he.edge.region[d3_voronoi_opposite[he.side]];
            }
        };
        var Geom = {
            bisect:function (s1, s2) {
                var newEdge = {
                    region:{
                        l:s1,
                        r:s2
                    },
                    ep:{
                        l:null,
                        r:null
                    }
                };
                var dx = s2.x - s1.x, dy = s2.y - s1.y, adx = dx > 0 ? dx : -dx, ady = dy > 0 ? dy : -dy;
                newEdge.c = s1.x * dx + s1.y * dy + (dx * dx + dy * dy) * .5;
                if (adx > ady) {
                    newEdge.a = 1;
                    newEdge.b = dy / dx;
                    newEdge.c /= dx;
                } else {
                    newEdge.b = 1;
                    newEdge.a = dx / dy;
                    newEdge.c /= dy;
                }
                return newEdge;
            },
            intersect:function (el1, el2) {
                var e1 = el1.edge, e2 = el2.edge;
                if (!e1 || !e2 || e1.region.r == e2.region.r) {
                    return null;
                }
                var d = e1.a * e2.b - e1.b * e2.a;
                if (Math.abs(d) < 1e-10) {
                    return null;
                }
                var xint = (e1.c * e2.b - e2.c * e1.b) / d, yint = (e2.c * e1.a - e1.c * e2.a) / d, e1r = e1.region.r, e2r = e2.region.r, el, e;
                if (e1r.y < e2r.y || e1r.y == e2r.y && e1r.x < e2r.x) {
                    el = el1;
                    e = e1;
                } else {
                    el = el2;
                    e = e2;
                }
                var rightOfSite = xint >= e.region.r.x;
                if (rightOfSite && el.side === "l" || !rightOfSite && el.side === "r") {
                    return null;
                }
                return {
                    x:xint,
                    y:yint
                };
            },
            rightOf:function (he, p) {
                var e = he.edge, topsite = e.region.r, rightOfSite = p.x > topsite.x;
                if (rightOfSite && he.side === "l") {
                    return 1;
                }
                if (!rightOfSite && he.side === "r") {
                    return 0;
                }
                if (e.a === 1) {
                    var dyp = p.y - topsite.y, dxp = p.x - topsite.x, fast = 0, above = 0;
                    if (!rightOfSite && e.b < 0 || rightOfSite && e.b >= 0) {
                        above = fast = dyp >= e.b * dxp;
                    } else {
                        above = p.x + p.y * e.b > e.c;
                        if (e.b < 0) {
                            above = !above;
                        }
                        if (!above) {
                            fast = 1;
                        }
                    }
                    if (!fast) {
                        var dxs = topsite.x - e.region.l.x;
                        above = e.b * (dxp * dxp - dyp * dyp) < dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b);
                        if (e.b < 0) {
                            above = !above;
                        }
                    }
                } else {
                    var yl = e.c - e.a * p.x, t1 = p.y - yl, t2 = p.x - topsite.x, t3 = yl - topsite.y;
                    above = t1 * t1 > t2 * t2 + t3 * t3;
                }
                return he.side === "l" ? above : !above;
            },
            endPoint:function (edge, side, site) {
                edge.ep[side] = site;
                if (!edge.ep[d3_voronoi_opposite[side]]) return;
                callback(edge);
            },
            distance:function (s, t) {
                var dx = s.x - t.x, dy = s.y - t.y;
                return Math.sqrt(dx * dx + dy * dy);
            }
        };
        var EventQueue = {
            list:[],
            insert:function (he, site, offset) {
                he.vertex = site;
                he.ystar = site.y + offset;
                for (var i = 0, list = EventQueue.list, l = list.length; i < l; i++) {
                    var next = list[i];
                    if (he.ystar > next.ystar || he.ystar == next.ystar && site.x > next.vertex.x) {
                        continue;
                    } else {
                        break;
                    }
                }
                list.splice(i, 0, he);
            },
            del:function (he) {
                for (var i = 0, ls = EventQueue.list, l = ls.length; i < l && ls[i] != he; ++i) {
                }
                ls.splice(i, 1);
            },
            empty:function () {
                return EventQueue.list.length === 0;
            },
            nextEvent:function (he) {
                for (var i = 0, ls = EventQueue.list, l = ls.length; i < l; ++i) {
                    if (ls[i] == he) return ls[i + 1];
                }
                return null;
            },
            min:function () {
                var elem = EventQueue.list[0];
                return {
                    x:elem.vertex.x,
                    y:elem.ystar
                };
            },
            extractMin:function () {
                return EventQueue.list.shift();
            }
        };
        EdgeList.init();
        Sites.bottomSite = Sites.list.shift();
        var newSite = Sites.list.shift(), newIntStar;
        var lbnd, rbnd, llbnd, rrbnd, bisector;
        var bot, top, temp, p, v;
        var e, pm;
        while (true) {
            if (!EventQueue.empty()) {
                newIntStar = EventQueue.min();
            }
            if (newSite && (EventQueue.empty() || newSite.y < newIntStar.y || newSite.y == newIntStar.y && newSite.x < newIntStar.x)) {
                lbnd = EdgeList.leftBound(newSite);
                rbnd = EdgeList.right(lbnd);
                bot = EdgeList.rightRegion(lbnd);
                e = Geom.bisect(bot, newSite);
                bisector = EdgeList.createHalfEdge(e, "l");
                EdgeList.insert(lbnd, bisector);
                p = Geom.intersect(lbnd, bisector);
                if (p) {
                    EventQueue.del(lbnd);
                    EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
                }
                lbnd = bisector;
                bisector = EdgeList.createHalfEdge(e, "r");
                EdgeList.insert(lbnd, bisector);
                p = Geom.intersect(bisector, rbnd);
                if (p) {
                    EventQueue.insert(bisector, p, Geom.distance(p, newSite));
                }
                newSite = Sites.list.shift();
            } else if (!EventQueue.empty()) {
                lbnd = EventQueue.extractMin();
                llbnd = EdgeList.left(lbnd);
                rbnd = EdgeList.right(lbnd);
                rrbnd = EdgeList.right(rbnd);
                bot = EdgeList.leftRegion(lbnd);
                top = EdgeList.rightRegion(rbnd);
                v = lbnd.vertex;
                Geom.endPoint(lbnd.edge, lbnd.side, v);
                Geom.endPoint(rbnd.edge, rbnd.side, v);
                EdgeList.del(lbnd);
                EventQueue.del(rbnd);
                EdgeList.del(rbnd);
                pm = "l";
                if (bot.y > top.y) {
                    temp = bot;
                    bot = top;
                    top = temp;
                    pm = "r";
                }
                e = Geom.bisect(bot, top);
                bisector = EdgeList.createHalfEdge(e, pm);
                EdgeList.insert(llbnd, bisector);
                Geom.endPoint(e, d3_voronoi_opposite[pm], v);
                p = Geom.intersect(llbnd, bisector);
                if (p) {
                    EventQueue.del(llbnd);
                    EventQueue.insert(llbnd, p, Geom.distance(p, bot));
                }
                p = Geom.intersect(bisector, rrbnd);
                if (p) {
                    EventQueue.insert(bisector, p, Geom.distance(p, bot));
                }
            } else {
                break;
            }
        }
        for (lbnd = EdgeList.right(EdgeList.leftEnd); lbnd != EdgeList.rightEnd; lbnd = EdgeList.right(lbnd)) {
            callback(lbnd.edge);
        }
    }

    function d3_geom_quadtreeNode() {
        return {
            leaf:true,
            nodes:[],
            point:null
        };
    }

    function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
        if (!f(node, x1, y1, x2, y2)) {
            var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
            if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
            if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
            if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
            if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
        }
    }

    function d3_geom_quadtreePoint(p) {
        return {
            x:p[0],
            y:p[1]
        };
    }

    function d3_time_utc() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
    }

    function d3_time_formatAbbreviate(name) {
        return name.substring(0, 3);
    }

    function d3_time_parse(date, template, string, j) {
        var c, p, i = 0, n = template.length, m = string.length;
        while (i < n) {
            if (j >= m) return -1;
            c = template.charCodeAt(i++);
            if (c == 37) {
                p = d3_time_parsers[template.charAt(i++)];
                if (!p || (j = p(date, string, j)) < 0) return -1;
            } else if (c != string.charCodeAt(j++)) {
                return -1;
            }
        }
        return j;
    }

    function d3_time_formatRe(names) {
        return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
    }

    function d3_time_formatLookup(names) {
        var map = new d3_Map, i = -1, n = names.length;
        while (++i < n) map.set(names[i].toLowerCase(), i);
        return map;
    }

    function d3_time_parseWeekdayAbbrev(date, string, i) {
        d3_time_dayAbbrevRe.lastIndex = 0;
        var n = d3_time_dayAbbrevRe.exec(string.substring(i));
        return n ? i += n[0].length : -1;
    }

    function d3_time_parseWeekday(date, string, i) {
        d3_time_dayRe.lastIndex = 0;
        var n = d3_time_dayRe.exec(string.substring(i));
        return n ? i += n[0].length : -1;
    }

    function d3_time_parseMonthAbbrev(date, string, i) {
        d3_time_monthAbbrevRe.lastIndex = 0;
        var n = d3_time_monthAbbrevRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
    }

    function d3_time_parseMonth(date, string, i) {
        d3_time_monthRe.lastIndex = 0;
        var n = d3_time_monthRe.exec(string.substring(i));
        return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
    }

    function d3_time_parseLocaleFull(date, string, i) {
        return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
    }

    function d3_time_parseLocaleDate(date, string, i) {
        return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
    }

    function d3_time_parseLocaleTime(date, string, i) {
        return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }

    function d3_time_parseFullYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 4));
        return n ? (date.y = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseYear(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.y = d3_time_expandYear(+n[0]), i += n[0].length) : -1;
    }

    function d3_time_expandYear(d) {
        return d + (d > 68 ? 1900 : 2e3);
    }

    function d3_time_parseMonthNumber(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
    }

    function d3_time_parseDay(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.d = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseHour24(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.H = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseMinutes(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.M = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseSeconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 2));
        return n ? (date.S = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseMilliseconds(date, string, i) {
        d3_time_numberRe.lastIndex = 0;
        var n = d3_time_numberRe.exec(string.substring(i, i + 3));
        return n ? (date.L = +n[0], i += n[0].length) : -1;
    }

    function d3_time_parseAmPm(date, string, i) {
        var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
        return n == null ? -1 : (date.p = n, i);
    }

    function d3_time_zone(d) {
        var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = ~~(Math.abs(z) / 60), zm = Math.abs(z) % 60;
        return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
    }

    function d3_time_formatIsoNative(date) {
        return date.toISOString();
    }

    function d3_time_interval(local, step, number) {
        function round(date) {
            var d0 = local(date), d1 = offset(d0, 1);
            return date - d0 < d1 - date ? d0 : d1;
        }

        function ceil(date) {
            step(date = local(new d3_time(date - 1)), 1);
            return date;
        }

        function offset(date, k) {
            step(date = new d3_time(+date), k);
            return date;
        }

        function range(t0, t1, dt) {
            var time = ceil(t0), times = [];
            if (dt > 1) {
                while (time < t1) {
                    if (!(number(time) % dt)) times.push(new Date(+time));
                    step(time, 1);
                }
            } else {
                while (time < t1) times.push(new Date(+time)), step(time, 1);
            }
            return times;
        }

        function range_utc(t0, t1, dt) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time_utc;
                utc._ = t0;
                return range(utc, t1, dt);
            } finally {
                d3_time = Date;
            }
        }

        local.floor = local;
        local.round = round;
        local.ceil = ceil;
        local.offset = offset;
        local.range = range;
        var utc = local.utc = d3_time_interval_utc(local);
        utc.floor = utc;
        utc.round = d3_time_interval_utc(round);
        utc.ceil = d3_time_interval_utc(ceil);
        utc.offset = d3_time_interval_utc(offset);
        utc.range = range_utc;
        return local;
    }

    function d3_time_interval_utc(method) {
        return function (date, k) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time_utc;
                utc._ = date;
                return method(utc, k)._;
            } finally {
                d3_time = Date;
            }
        };
    }

    function d3_time_scale(linear, methods, format) {
        function scale(x) {
            return linear(x);
        }

        scale.invert = function (x) {
            return d3_time_scaleDate(linear.invert(x));
        };
        scale.domain = function (x) {
            if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
            linear.domain(x);
            return scale;
        };
        scale.nice = function (m) {
            return scale.domain(d3_scale_nice(scale.domain(), function () {
                return m;
            }));
        };
        scale.ticks = function (m, k) {
            var extent = d3_time_scaleExtent(scale.domain());
            if (typeof m !== "function") {
                var span = extent[1] - extent[0], target = span / m, i = d3.bisect(d3_time_scaleSteps, target);
                if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
                if (!i) return linear.ticks(m).map(d3_time_scaleDate);
                if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
                m = methods[i];
                k = m[1];
                m = m[0].range;
            }
            return m(extent[0], new Date(+extent[1] + 1), k);
        };
        scale.tickFormat = function () {
            return format;
        };
        scale.copy = function () {
            return d3_time_scale(linear.copy(), methods, format);
        };
        return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
    }

    function d3_time_scaleExtent(domain) {
        var start = domain[0], stop = domain[domain.length - 1];
        return start < stop ? [ start, stop ] : [ stop, start ];
    }

    function d3_time_scaleDate(t) {
        return new Date(t);
    }

    function d3_time_scaleFormat(formats) {
        return function (date) {
            var i = formats.length - 1, f = formats[i];
            while (!f[1](date)) f = formats[--i];
            return f[0](date);
        };
    }

    function d3_time_scaleSetYear(y) {
        var d = new Date(y, 0, 1);
        d.setFullYear(y);
        return d;
    }

    function d3_time_scaleGetYear(d) {
        var y = d.getFullYear(), d0 = d3_time_scaleSetYear(y), d1 = d3_time_scaleSetYear(y + 1);
        return y + (d - d0) / (d1 - d0);
    }

    function d3_time_scaleUTCSetYear(y) {
        var d = new Date(Date.UTC(y, 0, 1));
        d.setUTCFullYear(y);
        return d;
    }

    function d3_time_scaleUTCGetYear(d) {
        var y = d.getUTCFullYear(), d0 = d3_time_scaleUTCSetYear(y), d1 = d3_time_scaleUTCSetYear(y + 1);
        return y + (d - d0) / (d1 - d0);
    }

    if (!Date.now) Date.now = function () {
        return +(new Date);
    };
    try {
        document.createElement("div").style.setProperty("opacity", 0, "");
    } catch (error) {
        var d3_style_prototype = CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
        d3_style_prototype.setProperty = function (name, value, priority) {
            d3_style_setProperty.call(this, name, value + "", priority);
        };
    }
    d3 = {
        version:"2.10.1"
    };
    var d3_array = d3_arraySlice;
    try {
        d3_array(document.documentElement.childNodes)[0].nodeType;
    } catch (e) {
        d3_array = d3_arrayCopy;
    }
    var d3_arraySubclass = [].__proto__ ? function (array, prototype) {
        array.__proto__ = prototype;
    } : function (array, prototype) {
        for (var property in prototype) array[property] = prototype[property];
    };
    d3.map = function (object) {
        var map = new d3_Map;
        for (var key in object) map.set(key, object[key]);
        return map;
    };
    d3_class(d3_Map, {
        has:function (key) {
            return d3_map_prefix + key in this;
        },
        get:function (key) {
            return this[d3_map_prefix + key];
        },
        set:function (key, value) {
            return this[d3_map_prefix + key] = value;
        },
        remove:function (key) {
            key = d3_map_prefix + key;
            return key in this && delete this[key];
        },
        keys:function () {
            var keys = [];
            this.forEach(function (key) {
                keys.push(key);
            });
            return keys;
        },
        values:function () {
            var values = [];
            this.forEach(function (key, value) {
                values.push(value);
            });
            return values;
        },
        entries:function () {
            var entries = [];
            this.forEach(function (key, value) {
                entries.push({
                    key:key,
                    value:value
                });
            });
            return entries;
        },
        forEach:function (f) {
            for (var key in this) {
                if (key.charCodeAt(0) === d3_map_prefixCode) {
                    f.call(this, key.substring(1), this[key]);
                }
            }
        }
    });
    var d3_map_prefix = "\0", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
    d3.functor = d3_functor;
    d3.rebind = function (target, source) {
        var i = 1, n = arguments.length, method;
        while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
        return target;
    };
    d3.ascending = function (a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    };
    d3.descending = function (a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    };
    d3.mean = function (array, f) {
        var n = array.length, a, m = 0, i = -1, j = 0;
        if (arguments.length === 1) {
            while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
        } else {
            while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
        }
        return j ? m : undefined;
    };
    d3.median = function (array, f) {
        if (arguments.length > 1) array = array.map(f);
        array = array.filter(d3_number);
        return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
    };
    d3.min = function (array, f) {
        var i = -1, n = array.length, a, b;
        if (arguments.length === 1) {
            while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
            while (++i < n) if ((b = array[i]) != null && a > b) a = b;
        } else {
            while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
        }
        return a;
    };
    d3.max = function (array, f) {
        var i = -1, n = array.length, a, b;
        if (arguments.length === 1) {
            while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
            while (++i < n) if ((b = array[i]) != null && b > a) a = b;
        } else {
            while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
        }
        return a;
    };
    d3.extent = function (array, f) {
        var i = -1, n = array.length, a, b, c;
        if (arguments.length === 1) {
            while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
            while (++i < n) if ((b = array[i]) != null) {
                if (a > b) a = b;
                if (c < b) c = b;
            }
        } else {
            while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
            while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
                if (a > b) a = b;
                if (c < b) c = b;
            }
        }
        return [ a, c ];
    };
    d3.random = {
        normal:function (µ, σ) {
            var n = arguments.length;
            if (n < 2) σ = 1;
            if (n < 1) µ = 0;
            return function () {
                var x, y, r;
                do {
                    x = Math.random() * 2 - 1;
                    y = Math.random() * 2 - 1;
                    r = x * x + y * y;
                } while (!r || r > 1);
                return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
            };
        },
        logNormal:function (µ, σ) {
            var n = arguments.length;
            if (n < 2) σ = 1;
            if (n < 1) µ = 0;
            var random = d3.random.normal();
            return function () {
                return Math.exp(µ + σ * random());
            };
        },
        irwinHall:function (m) {
            return function () {
                for (var s = 0, j = 0; j < m; j++) s += Math.random();
                return s / m;
            };
        }
    };
    d3.sum = function (array, f) {
        var s = 0, n = array.length, a, i = -1;
        if (arguments.length === 1) {
            while (++i < n) if (!isNaN(a = +array[i])) s += a;
        } else {
            while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
        }
        return s;
    };
    d3.quantile = function (values, p) {
        var H = (values.length - 1) * p + 1, h = Math.floor(H), v = values[h - 1], e = H - h;
        return e ? v + e * (values[h] - v) : v;
    };
    d3.transpose = function (matrix) {
        return d3.zip.apply(d3, matrix);
    };
    d3.zip = function () {
        if (!(n = arguments.length)) return [];
        for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
            for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
                zip[j] = arguments[j][i];
            }
        }
        return zips;
    };
    d3.bisector = function (f) {
        return {
            left:function (a, x, lo, hi) {
                if (arguments.length < 3) lo = 0;
                if (arguments.length < 4) hi = a.length;
                while (lo < hi) {
                    var mid = lo + hi >>> 1;
                    if (f.call(a, a[mid], mid) < x) lo = mid + 1; else hi = mid;
                }
                return lo;
            },
            right:function (a, x, lo, hi) {
                if (arguments.length < 3) lo = 0;
                if (arguments.length < 4) hi = a.length;
                while (lo < hi) {
                    var mid = lo + hi >>> 1;
                    if (x < f.call(a, a[mid], mid)) hi = mid; else lo = mid + 1;
                }
                return lo;
            }
        };
    };
    var d3_bisector = d3.bisector(function (d) {
        return d;
    });
    d3.bisectLeft = d3_bisector.left;
    d3.bisect = d3.bisectRight = d3_bisector.right;
    d3.first = function (array, f) {
        var i = 0, n = array.length, a = array[0], b;
        if (arguments.length === 1) f = d3.ascending;
        while (++i < n) {
            if (f.call(array, a, b = array[i]) > 0) {
                a = b;
            }
        }
        return a;
    };
    d3.last = function (array, f) {
        var i = 0, n = array.length, a = array[0], b;
        if (arguments.length === 1) f = d3.ascending;
        while (++i < n) {
            if (f.call(array, a, b = array[i]) <= 0) {
                a = b;
            }
        }
        return a;
    };
    d3.nest = function () {
        function map(array, depth) {
            if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
            var i = -1, n = array.length, key = keys[depth++], keyValue, object, valuesByKey = new d3_Map, values, o = {};
            while (++i < n) {
                if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
                    values.push(object);
                } else {
                    valuesByKey.set(keyValue, [ object ]);
                }
            }
            valuesByKey.forEach(function (keyValue, values) {
                o[keyValue] = map(values, depth);
            });
            return o;
        }

        function entries(map, depth) {
            if (depth >= keys.length) return map;
            var a = [], sortKey = sortKeys[depth++], key;
            for (key in map) {
                a.push({
                    key:key,
                    values:entries(map[key], depth)
                });
            }
            if (sortKey) a.sort(function (a, b) {
                return sortKey(a.key, b.key);
            });
            return a;
        }

        var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
        nest.map = function (array) {
            return map(array, 0);
        };
        nest.entries = function (array) {
            return entries(map(array, 0), 0);
        };
        nest.key = function (d) {
            keys.push(d);
            return nest;
        };
        nest.sortKeys = function (order) {
            sortKeys[keys.length - 1] = order;
            return nest;
        };
        nest.sortValues = function (order) {
            sortValues = order;
            return nest;
        };
        nest.rollup = function (f) {
            rollup = f;
            return nest;
        };
        return nest;
    };
    d3.keys = function (map) {
        var keys = [];
        for (var key in map) keys.push(key);
        return keys;
    };
    d3.values = function (map) {
        var values = [];
        for (var key in map) values.push(map[key]);
        return values;
    };
    d3.entries = function (map) {
        var entries = [];
        for (var key in map) entries.push({
            key:key,
            value:map[key]
        });
        return entries;
    };
    d3.permute = function (array, indexes) {
        var permutes = [], i = -1, n = indexes.length;
        while (++i < n) permutes[i] = array[indexes[i]];
        return permutes;
    };
    d3.merge = function (arrays) {
        return Array.prototype.concat.apply([], arrays);
    };
    d3.split = function (array, f) {
        var arrays = [], values = [], value, i = -1, n = array.length;
        if (arguments.length < 2) f = d3_splitter;
        while (++i < n) {
            if (f.call(values, value = array[i], i)) {
                values = [];
            } else {
                if (!values.length) arrays.push(values);
                values.push(value);
            }
        }
        return arrays;
    };
    d3.range = function (start, stop, step) {
        if (arguments.length < 3) {
            step = 1;
            if (arguments.length < 2) {
                stop = start;
                start = 0;
            }
        }
        if ((stop - start) / step === Infinity) throw new Error("infinite range");
        var range = [], k = d3_range_integerScale(Math.abs(step)), i = -1, j;
        start *= k, stop *= k, step *= k;
        if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
        return range;
    };
    d3.requote = function (s) {
        return s.replace(d3_requote_re, "\\$&");
    };
    var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (x, n) {
        return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
    };
    d3.xhr = function (url, mime, callback) {
        var req = new XMLHttpRequest;
        if (arguments.length < 3) callback = mime, mime = null; else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
        req.open("GET", url, true);
        if (mime) req.setRequestHeader("Accept", mime);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                var s = req.status;
                callback(!s && req.response || s >= 200 && s < 300 || s === 304 ? req : null);
            }
        };
        req.send(null);
    };
    d3.text = function (url, mime, callback) {
        function ready(req) {
            callback(req && req.responseText);
        }

        if (arguments.length < 3) {
            callback = mime;
            mime = null;
        }
        d3.xhr(url, mime, ready);
    };
    d3.json = function (url, callback) {
        d3.text(url, "application/json", function (text) {
            callback(text ? JSON.parse(text) : null);
        });
    };
    d3.html = function (url, callback) {
        d3.text(url, "text/html", function (text) {
            if (text != null) {
                var range = document.createRange();
                range.selectNode(document.body);
                text = range.createContextualFragment(text);
            }
            callback(text);
        });
    };
    d3.xml = function (url, mime, callback) {
        function ready(req) {
            callback(req && req.responseXML);
        }

        if (arguments.length < 3) {
            callback = mime;
            mime = null;
        }
        d3.xhr(url, mime, ready);
    };
    var d3_nsPrefix = {
        svg:"http://www.w3.org/2000/svg",
        xhtml:"http://www.w3.org/1999/xhtml",
        xlink:"http://www.w3.org/1999/xlink",
        xml:"http://www.w3.org/XML/1998/namespace",
        xmlns:"http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix:d3_nsPrefix,
        qualify:function (name) {
            var i = name.indexOf(":"), prefix = name;
            if (i >= 0) {
                prefix = name.substring(0, i);
                name = name.substring(i + 1);
            }
            return d3_nsPrefix.hasOwnProperty(prefix) ? {
                space:d3_nsPrefix[prefix],
                local:name
            } : name;
        }
    };
    d3.dispatch = function () {
        var dispatch = new d3_dispatch, i = -1, n = arguments.length;
        while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
        return dispatch;
    };
    d3_dispatch.prototype.on = function (type, listener) {
        var i = type.indexOf("."), name = "";
        if (i > 0) {
            name = type.substring(i + 1);
            type = type.substring(0, i);
        }
        return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    };
    d3.format = function (specifier) {
        var match = d3_format_re.exec(specifier), fill = match[1] || " ", sign = match[3] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, suffix = "", integer = false;
        if (precision) precision = +precision.substring(1);
        if (zfill) {
            fill = "0";
            if (comma) width -= Math.floor((width - 1) / 4);
        }
        switch (type) {
            case "n":
                comma = true;
                type = "g";
                break;
            case "%":
                scale = 100;
                suffix = "%";
                type = "f";
                break;
            case "p":
                scale = 100;
                suffix = "%";
                type = "r";
                break;
            case "d":
                integer = true;
                precision = 0;
                break;
            case "s":
                scale = -1;
                type = "r";
                break;
        }
        if (type == "r" && !precision) type = "g";
        type = d3_format_types.get(type) || d3_format_typeDefault;
        return function (value) {
            if (integer && value % 1) return "";
            var negative = value < 0 && (value = -value) ? "-" : sign;
            if (scale < 0) {
                var prefix = d3.formatPrefix(value, precision);
                value = prefix.scale(value);
                suffix = prefix.symbol;
            } else {
                value *= scale;
            }
            value = type(value, precision);
            if (zfill) {
                var length = value.length + negative.length;
                if (length < width) value = (new Array(width - length + 1)).join(fill) + value;
                if (comma) value = d3_format_group(value);
                value = negative + value;
            } else {
                if (comma) value = d3_format_group(value);
                value = negative + value;
                var length = value.length;
                if (length < width) value = (new Array(width - length + 1)).join(fill) + value;
            }
            return value + suffix;
        };
    };
    var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;
    var d3_format_types = d3.map({
        g:function (x, p) {
            return x.toPrecision(p);
        },
        e:function (x, p) {
            return x.toExponential(p);
        },
        f:function (x, p) {
            return x.toFixed(p);
        },
        r:function (x, p) {
            return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p)));
        }
    });
    var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "μ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
    d3.formatPrefix = function (value, precision) {
        var i = 0;
        if (value) {
            if (value < 0) value *= -1;
            if (precision) value = d3.round(value, d3_format_precision(value, precision));
            i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
            i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
        }
        return d3_formatPrefixes[8 + i / 3];
    };
    var d3_ease_quad = d3_ease_poly(2), d3_ease_cubic = d3_ease_poly(3), d3_ease_default = function () {
        return d3_ease_identity;
    };
    var d3_ease = d3.map({
        linear:d3_ease_default,
        poly:d3_ease_poly,
        quad:function () {
            return d3_ease_quad;
        },
        cubic:function () {
            return d3_ease_cubic;
        },
        sin:function () {
            return d3_ease_sin;
        },
        exp:function () {
            return d3_ease_exp;
        },
        circle:function () {
            return d3_ease_circle;
        },
        elastic:d3_ease_elastic,
        back:d3_ease_back,
        bounce:function () {
            return d3_ease_bounce;
        }
    });
    var d3_ease_mode = d3.map({
        "in":d3_ease_identity,
        out:d3_ease_reverse,
        "in-out":d3_ease_reflect,
        "out-in":function (f) {
            return d3_ease_reflect(d3_ease_reverse(f));
        }
    });
    d3.ease = function (name) {
        var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
        t = d3_ease.get(t) || d3_ease_default;
        m = d3_ease_mode.get(m) || d3_ease_identity;
        return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
    };
    d3.event = null;
    d3.transform = function (string) {
        var g = document.createElementNS(d3.ns.prefix.svg, "g");
        return (d3.transform = function (string) {
            g.setAttribute("transform", string);
            var t = g.transform.baseVal.consolidate();
            return new d3_transform(t ? t.matrix : d3_transformIdentity);
        })(string);
    };
    d3_transform.prototype.toString = function () {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
    };
    var d3_transformDegrees = 180 / Math.PI, d3_transformIdentity = {
        a:1,
        b:0,
        c:0,
        d:1,
        e:0,
        f:0
    };
    d3.interpolate = function (a, b) {
        var i = d3.interpolators.length, f;
        while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
        return f;
    };
    d3.interpolateNumber = function (a, b) {
        b -= a;
        return function (t) {
            return a + b * t;
        };
    };
    d3.interpolateRound = function (a, b) {
        b -= a;
        return function (t) {
            return Math.round(a + b * t);
        };
    };
    d3.interpolateString = function (a, b) {
        var m, i, j, s0 = 0, s1 = 0, s = [], q = [], n, o;
        d3_interpolate_number.lastIndex = 0;
        for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
            if (m.index) s.push(b.substring(s0, s1 = m.index));
            q.push({
                i:s.length,
                x:m[0]
            });
            s.push(null);
            s0 = d3_interpolate_number.lastIndex;
        }
        if (s0 < b.length) s.push(b.substring(s0));
        for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
            o = q[i];
            if (o.x == m[0]) {
                if (o.i) {
                    if (s[o.i + 1] == null) {
                        s[o.i - 1] += o.x;
                        s.splice(o.i, 1);
                        for (j = i + 1; j < n; ++j) q[j].i--;
                    } else {
                        s[o.i - 1] += o.x + s[o.i + 1];
                        s.splice(o.i, 2);
                        for (j = i + 1; j < n; ++j) q[j].i -= 2;
                    }
                } else {
                    if (s[o.i + 1] == null) {
                        s[o.i] = o.x;
                    } else {
                        s[o.i] = o.x + s[o.i + 1];
                        s.splice(o.i + 1, 1);
                        for (j = i + 1; j < n; ++j) q[j].i--;
                    }
                }
                q.splice(i, 1);
                n--;
                i--;
            } else {
                o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
            }
        }
        while (i < n) {
            o = q.pop();
            if (s[o.i + 1] == null) {
                s[o.i] = o.x;
            } else {
                s[o.i] = o.x + s[o.i + 1];
                s.splice(o.i + 1, 1);
            }
            n--;
        }
        if (s.length === 1) {
            return s[0] == null ? q[0].x : function () {
                return b;
            };
        }
        return function (t) {
            for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
    d3.interpolateTransform = function (a, b) {
        var s = [], q = [], n, A = d3.transform(a), B = d3.transform(b), ta = A.translate, tb = B.translate, ra = A.rotate, rb = B.rotate, wa = A.skew, wb = B.skew, ka = A.scale, kb = B.scale;
        if (ta[0] != tb[0] || ta[1] != tb[1]) {
            s.push("translate(", null, ",", null, ")");
            q.push({
                i:1,
                x:d3.interpolateNumber(ta[0], tb[0])
            }, {
                i:3,
                x:d3.interpolateNumber(ta[1], tb[1])
            });
        } else if (tb[0] || tb[1]) {
            s.push("translate(" + tb + ")");
        } else {
            s.push("");
        }
        if (ra != rb) {
            if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
            q.push({
                i:s.push(s.pop() + "rotate(", null, ")") - 2,
                x:d3.interpolateNumber(ra, rb)
            });
        } else if (rb) {
            s.push(s.pop() + "rotate(" + rb + ")");
        }
        if (wa != wb) {
            q.push({
                i:s.push(s.pop() + "skewX(", null, ")") - 2,
                x:d3.interpolateNumber(wa, wb)
            });
        } else if (wb) {
            s.push(s.pop() + "skewX(" + wb + ")");
        }
        if (ka[0] != kb[0] || ka[1] != kb[1]) {
            n = s.push(s.pop() + "scale(", null, ",", null, ")");
            q.push({
                i:n - 4,
                x:d3.interpolateNumber(ka[0], kb[0])
            }, {
                i:n - 2,
                x:d3.interpolateNumber(ka[1], kb[1])
            });
        } else if (kb[0] != 1 || kb[1] != 1) {
            s.push(s.pop() + "scale(" + kb + ")");
        }
        n = q.length;
        return function (t) {
            var i = -1, o;
            while (++i < n) s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
    d3.interpolateRgb = function (a, b) {
        a = d3.rgb(a);
        b = d3.rgb(b);
        var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
        return function (t) {
            return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
        };
    };
    d3.interpolateHsl = function (a, b) {
        a = d3.hsl(a);
        b = d3.hsl(b);
        var h0 = a.h, s0 = a.s, l0 = a.l, h1 = b.h - h0, s1 = b.s - s0, l1 = b.l - l0;
        if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360;
        return function (t) {
            return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t) + "";
        };
    };
    d3.interpolateLab = function (a, b) {
        a = d3.lab(a);
        b = d3.lab(b);
        var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
        return function (t) {
            return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
        };
    };
    d3.interpolateHcl = function (a, b) {
        a = d3.hcl(a);
        b = d3.hcl(b);
        var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
        if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
        return function (t) {
            return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
        };
    };
    d3.interpolateArray = function (a, b) {
        var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
        for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
        for (; i < na; ++i) c[i] = a[i];
        for (; i < nb; ++i) c[i] = b[i];
        return function (t) {
            for (i = 0; i < n0; ++i) c[i] = x[i](t);
            return c;
        };
    };
    d3.interpolateObject = function (a, b) {
        var i = {}, c = {}, k;
        for (k in a) {
            if (k in b) {
                i[k] = d3_interpolateByName(k)(a[k], b[k]);
            } else {
                c[k] = a[k];
            }
        }
        for (k in b) {
            if (!(k in a)) {
                c[k] = b[k];
            }
        }
        return function (t) {
            for (k in i) c[k] = i[k](t);
            return c;
        };
    };
    var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators = [ d3.interpolateObject, function (a, b) {
        return b instanceof Array && d3.interpolateArray(a, b);
    }, function (a, b) {
        return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + "");
    }, function (a, b) {
        return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(a, b);
    }, function (a, b) {
        return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b);
    } ];
    d3.rgb = function (r, g, b) {
        return arguments.length === 1 ? r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : d3_rgb(~~r, ~~g, ~~b);
    };
    d3_Rgb.prototype.brighter = function (k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        var r = this.r, g = this.g, b = this.b, i = 30;
        if (!r && !g && !b) return d3_rgb(i, i, i);
        if (r && r < i) r = i;
        if (g && g < i) g = i;
        if (b && b < i) b = i;
        return d3_rgb(Math.min(255, Math.floor(r / k)), Math.min(255, Math.floor(g / k)), Math.min(255, Math.floor(b / k)));
    };
    d3_Rgb.prototype.darker = function (k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_rgb(Math.floor(k * this.r), Math.floor(k * this.g), Math.floor(k * this.b));
    };
    d3_Rgb.prototype.hsl = function () {
        return d3_rgb_hsl(this.r, this.g, this.b);
    };
    d3_Rgb.prototype.toString = function () {
        return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
    };
    var d3_rgb_names = d3.map({
        aliceblue:"#f0f8ff",
        antiquewhite:"#faebd7",
        aqua:"#00ffff",
        aquamarine:"#7fffd4",
        azure:"#f0ffff",
        beige:"#f5f5dc",
        bisque:"#ffe4c4",
        black:"#000000",
        blanchedalmond:"#ffebcd",
        blue:"#0000ff",
        blueviolet:"#8a2be2",
        brown:"#a52a2a",
        burlywood:"#deb887",
        cadetblue:"#5f9ea0",
        chartreuse:"#7fff00",
        chocolate:"#d2691e",
        coral:"#ff7f50",
        cornflowerblue:"#6495ed",
        cornsilk:"#fff8dc",
        crimson:"#dc143c",
        cyan:"#00ffff",
        darkblue:"#00008b",
        darkcyan:"#008b8b",
        darkgoldenrod:"#b8860b",
        darkgray:"#a9a9a9",
        darkgreen:"#006400",
        darkgrey:"#a9a9a9",
        darkkhaki:"#bdb76b",
        darkmagenta:"#8b008b",
        darkolivegreen:"#556b2f",
        darkorange:"#ff8c00",
        darkorchid:"#9932cc",
        darkred:"#8b0000",
        darksalmon:"#e9967a",
        darkseagreen:"#8fbc8f",
        darkslateblue:"#483d8b",
        darkslategray:"#2f4f4f",
        darkslategrey:"#2f4f4f",
        darkturquoise:"#00ced1",
        darkviolet:"#9400d3",
        deeppink:"#ff1493",
        deepskyblue:"#00bfff",
        dimgray:"#696969",
        dimgrey:"#696969",
        dodgerblue:"#1e90ff",
        firebrick:"#b22222",
        floralwhite:"#fffaf0",
        forestgreen:"#228b22",
        fuchsia:"#ff00ff",
        gainsboro:"#dcdcdc",
        ghostwhite:"#f8f8ff",
        gold:"#ffd700",
        goldenrod:"#daa520",
        gray:"#808080",
        green:"#008000",
        greenyellow:"#adff2f",
        grey:"#808080",
        honeydew:"#f0fff0",
        hotpink:"#ff69b4",
        indianred:"#cd5c5c",
        indigo:"#4b0082",
        ivory:"#fffff0",
        khaki:"#f0e68c",
        lavender:"#e6e6fa",
        lavenderblush:"#fff0f5",
        lawngreen:"#7cfc00",
        lemonchiffon:"#fffacd",
        lightblue:"#add8e6",
        lightcoral:"#f08080",
        lightcyan:"#e0ffff",
        lightgoldenrodyellow:"#fafad2",
        lightgray:"#d3d3d3",
        lightgreen:"#90ee90",
        lightgrey:"#d3d3d3",
        lightpink:"#ffb6c1",
        lightsalmon:"#ffa07a",
        lightseagreen:"#20b2aa",
        lightskyblue:"#87cefa",
        lightslategray:"#778899",
        lightslategrey:"#778899",
        lightsteelblue:"#b0c4de",
        lightyellow:"#ffffe0",
        lime:"#00ff00",
        limegreen:"#32cd32",
        linen:"#faf0e6",
        magenta:"#ff00ff",
        maroon:"#800000",
        mediumaquamarine:"#66cdaa",
        mediumblue:"#0000cd",
        mediumorchid:"#ba55d3",
        mediumpurple:"#9370db",
        mediumseagreen:"#3cb371",
        mediumslateblue:"#7b68ee",
        mediumspringgreen:"#00fa9a",
        mediumturquoise:"#48d1cc",
        mediumvioletred:"#c71585",
        midnightblue:"#191970",
        mintcream:"#f5fffa",
        mistyrose:"#ffe4e1",
        moccasin:"#ffe4b5",
        navajowhite:"#ffdead",
        navy:"#000080",
        oldlace:"#fdf5e6",
        olive:"#808000",
        olivedrab:"#6b8e23",
        orange:"#ffa500",
        orangered:"#ff4500",
        orchid:"#da70d6",
        palegoldenrod:"#eee8aa",
        palegreen:"#98fb98",
        paleturquoise:"#afeeee",
        palevioletred:"#db7093",
        papayawhip:"#ffefd5",
        peachpuff:"#ffdab9",
        peru:"#cd853f",
        pink:"#ffc0cb",
        plum:"#dda0dd",
        powderblue:"#b0e0e6",
        purple:"#800080",
        red:"#ff0000",
        rosybrown:"#bc8f8f",
        royalblue:"#4169e1",
        saddlebrown:"#8b4513",
        salmon:"#fa8072",
        sandybrown:"#f4a460",
        seagreen:"#2e8b57",
        seashell:"#fff5ee",
        sienna:"#a0522d",
        silver:"#c0c0c0",
        skyblue:"#87ceeb",
        slateblue:"#6a5acd",
        slategray:"#708090",
        slategrey:"#708090",
        snow:"#fffafa",
        springgreen:"#00ff7f",
        steelblue:"#4682b4",
        tan:"#d2b48c",
        teal:"#008080",
        thistle:"#d8bfd8",
        tomato:"#ff6347",
        turquoise:"#40e0d0",
        violet:"#ee82ee",
        wheat:"#f5deb3",
        white:"#ffffff",
        whitesmoke:"#f5f5f5",
        yellow:"#ffff00",
        yellowgreen:"#9acd32"
    });
    d3_rgb_names.forEach(function (key, value) {
        d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
    });
    d3.hsl = function (h, s, l) {
        return arguments.length === 1 ? h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : d3_hsl(+h, +s, +l);
    };
    d3_Hsl.prototype.brighter = function (k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_hsl(this.h, this.s, this.l / k);
    };
    d3_Hsl.prototype.darker = function (k) {
        k = Math.pow(.7, arguments.length ? k : 1);
        return d3_hsl(this.h, this.s, k * this.l);
    };
    d3_Hsl.prototype.rgb = function () {
        return d3_hsl_rgb(this.h, this.s, this.l);
    };
    d3_Hsl.prototype.toString = function () {
        return this.rgb().toString();
    };
    d3.hcl = function (h, c, l) {
        return arguments.length === 1 ? h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l) : h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : d3_hcl(+h, +c, +l);
    };
    d3_Hcl.prototype.brighter = function (k) {
        return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_Hcl.prototype.darker = function (k) {
        return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
    };
    d3_Hcl.prototype.rgb = function () {
        return d3_hcl_lab(this.h, this.c, this.l).rgb();
    };
    d3_Hcl.prototype.toString = function () {
        return this.rgb() + "";
    };
    d3.lab = function (l, a, b) {
        return arguments.length === 1 ? l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b) : l instanceof d3_Hcl ? d3_hcl_lab(l.l, l.c, l.h) : d3_rgb_lab((l = d3.rgb(l)).r, l.g, l.b) : d3_lab(+l, +a, +b);
    };
    var d3_lab_K = 18;
    var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
    d3_Lab.prototype.brighter = function (k) {
        return d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_Lab.prototype.darker = function (k) {
        return d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
    };
    d3_Lab.prototype.rgb = function () {
        return d3_lab_rgb(this.l, this.a, this.b);
    };
    d3_Lab.prototype.toString = function () {
        return this.rgb() + "";
    };
    var d3_select = function (s, n) {
        return n.querySelector(s);
    }, d3_selectAll = function (s, n) {
        return n.querySelectorAll(s);
    }, d3_selectRoot = document.documentElement, d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector, d3_selectMatches = function (n, s) {
        return d3_selectMatcher.call(n, s);
    };
    if (typeof Sizzle === "function") {
        d3_select = function (s, n) {
            return Sizzle(s, n)[0] || null;
        };
        d3_selectAll = function (s, n) {
            return Sizzle.uniqueSort(Sizzle(s, n));
        };
        d3_selectMatches = Sizzle.matchesSelector;
    }
    var d3_selectionPrototype = [];
    d3.selection = function () {
        return d3_selectionRoot;
    };
    d3.selection.prototype = d3_selectionPrototype;
    d3_selectionPrototype.select = function (selector) {
        var subgroups = [], subgroup, subnode, group, node;
        if (typeof selector !== "function") selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m;) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = -1, n = group.length; ++i < n;) {
                if (node = group[i]) {
                    subgroup.push(subnode = selector.call(node, node.__data__, i));
                    if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_selection(subgroups);
    };
    d3_selectionPrototype.selectAll = function (selector) {
        var subgroups = [], subgroup, node;
        if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m;) {
            for (var group = this[j], i = -1, n = group.length; ++i < n;) {
                if (node = group[i]) {
                    subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
                    subgroup.parentNode = node;
                }
            }
        }
        return d3_selection(subgroups);
    };
    d3_selectionPrototype.attr = function (name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") {
                var node = this.node();
                name = d3.ns.qualify(name);
                return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
            }
            for (value in name) this.each(d3_selection_attr(value, name[value]));
            return this;
        }
        return this.each(d3_selection_attr(name, value));
    };
    d3_selectionPrototype.classed = function (name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") {
                var node = this.node(), n = (name = name.trim().split(/^|\s+/g)).length, i = -1;
                if (value = node.classList) {
                    while (++i < n) if (!value.contains(name[i])) return false;
                } else {
                    value = node.className;
                    if (value.baseVal != null) value = value.baseVal;
                    while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
                }
                return true;
            }
            for (value in name) this.each(d3_selection_classed(value, name[value]));
            return this;
        }
        return this.each(d3_selection_classed(name, value));
    };
    d3_selectionPrototype.style = function (name, value, priority) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof name !== "string") {
                if (n < 2) value = "";
                for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
                return this;
            }
            if (n < 2) return window.getComputedStyle(this.node(), null).getPropertyValue(name);
            priority = "";
        }
        return this.each(d3_selection_style(name, value, priority));
    };
    d3_selectionPrototype.property = function (name, value) {
        if (arguments.length < 2) {
            if (typeof name === "string") return this.node()[name];
            for (value in name) this.each(d3_selection_property(value, name[value]));
            return this;
        }
        return this.each(d3_selection_property(name, value));
    };
    d3_selectionPrototype.text = function (value) {
        return arguments.length < 1 ? this.node().textContent : this.each(typeof value === "function" ? function () {
            var v = value.apply(this, arguments);
            this.textContent = v == null ? "" : v;
        } : value == null ? function () {
            this.textContent = "";
        } : function () {
            this.textContent = value;
        });
    };
    d3_selectionPrototype.html = function (value) {
        return arguments.length < 1 ? this.node().innerHTML : this.each(typeof value === "function" ? function () {
            var v = value.apply(this, arguments);
            this.innerHTML = v == null ? "" : v;
        } : value == null ? function () {
            this.innerHTML = "";
        } : function () {
            this.innerHTML = value;
        });
    };
    d3_selectionPrototype.append = function (name) {
        function append() {
            return this.appendChild(document.createElementNS(this.namespaceURI, name));
        }

        function appendNS() {
            return this.appendChild(document.createElementNS(name.space, name.local));
        }

        name = d3.ns.qualify(name);
        return this.select(name.local ? appendNS : append);
    };
    d3_selectionPrototype.insert = function (name, before) {
        function insert() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, name), d3_select(before, this));
        }

        function insertNS() {
            return this.insertBefore(document.createElementNS(name.space, name.local), d3_select(before, this));
        }

        name = d3.ns.qualify(name);
        return this.select(name.local ? insertNS : insert);
    };
    d3_selectionPrototype.remove = function () {
        return this.each(function () {
            var parent = this.parentNode;
            if (parent) parent.removeChild(this);
        });
    };
    d3_selectionPrototype.data = function (value, key) {
        function bind(group, groupData) {
            var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), n1 = Math.max(n, m), updateNodes = [], enterNodes = [], exitNodes = [], node, nodeData;
            if (key) {
                var nodeByKeyValue = new d3_Map, keyValues = [], keyValue, j = groupData.length;
                for (i = -1; ++i < n;) {
                    keyValue = key.call(node = group[i], node.__data__, i);
                    if (nodeByKeyValue.has(keyValue)) {
                        exitNodes[j++] = node;
                    } else {
                        nodeByKeyValue.set(keyValue, node);
                    }
                    keyValues.push(keyValue);
                }
                for (i = -1; ++i < m;) {
                    keyValue = key.call(groupData, nodeData = groupData[i], i);
                    if (nodeByKeyValue.has(keyValue)) {
                        updateNodes[i] = node = nodeByKeyValue.get(keyValue);
                        node.__data__ = nodeData;
                        enterNodes[i] = exitNodes[i] = null;
                    } else {
                        enterNodes[i] = d3_selection_dataNode(nodeData);
                        updateNodes[i] = exitNodes[i] = null;
                    }
                    nodeByKeyValue.remove(keyValue);
                }
                for (i = -1; ++i < n;) {
                    if (nodeByKeyValue.has(keyValues[i])) {
                        exitNodes[i] = group[i];
                    }
                }
            } else {
                for (i = -1; ++i < n0;) {
                    node = group[i];
                    nodeData = groupData[i];
                    if (node) {
                        node.__data__ = nodeData;
                        updateNodes[i] = node;
                        enterNodes[i] = exitNodes[i] = null;
                    } else {
                        enterNodes[i] = d3_selection_dataNode(nodeData);
                        updateNodes[i] = exitNodes[i] = null;
                    }
                }
                for (; i < m; ++i) {
                    enterNodes[i] = d3_selection_dataNode(groupData[i]);
                    updateNodes[i] = exitNodes[i] = null;
                }
                for (; i < n1; ++i) {
                    exitNodes[i] = group[i];
                    enterNodes[i] = updateNodes[i] = null;
                }
            }
            enterNodes.update = updateNodes;
            enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
            enter.push(enterNodes);
            update.push(updateNodes);
            exit.push(exitNodes);
        }

        var i = -1, n = this.length, group, node;
        if (!arguments.length) {
            value = new Array(n = (group = this[0]).length);
            while (++i < n) {
                if (node = group[i]) {
                    value[i] = node.__data__;
                }
            }
            return value;
        }
        var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
        if (typeof value === "function") {
            while (++i < n) {
                bind(group = this[i], value.call(group, group.parentNode.__data__, i));
            }
        } else {
            while (++i < n) {
                bind(group = this[i], value);
            }
        }
        update.enter = function () {
            return enter;
        };
        update.exit = function () {
            return exit;
        };
        return update;
    };
    d3_selectionPrototype.datum = d3_selectionPrototype.map = function (value) {
        return arguments.length < 1 ? this.property("__data__") : this.property("__data__", value);
    };
    d3_selectionPrototype.filter = function (filter) {
        var subgroups = [], subgroup, group, node;
        if (typeof filter !== "function") filter = d3_selection_filter(filter);
        for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            subgroup.parentNode = (group = this[j]).parentNode;
            for (var i = 0, n = group.length; i < n; i++) {
                if ((node = group[i]) && filter.call(node, node.__data__, i)) {
                    subgroup.push(node);
                }
            }
        }
        return d3_selection(subgroups);
    };
    d3_selectionPrototype.order = function () {
        for (var j = -1, m = this.length; ++j < m;) {
            for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
                if (node = group[i]) {
                    if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
                    next = node;
                }
            }
        }
        return this;
    };
    d3_selectionPrototype.sort = function (comparator) {
        comparator = d3_selection_sortComparator.apply(this, arguments);
        for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
        return this.order();
    };
    d3_selectionPrototype.on = function (type, listener, capture) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof type !== "string") {
                if (n < 2) listener = false;
                for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
                return this;
            }
            if (n < 2) return (n = this.node()["__on" + type]) && n._;
            capture = false;
        }
        return this.each(d3_selection_on(type, listener, capture));
    };
    d3_selectionPrototype.each = function (callback) {
        return d3_selection_each(this, function (node, i, j) {
            callback.call(node, node.__data__, i, j);
        });
    };
    d3_selectionPrototype.call = function (callback) {
        callback.apply(this, (arguments[0] = this, arguments));
        return this;
    };
    d3_selectionPrototype.empty = function () {
        return !this.node();
    };
    d3_selectionPrototype.node = function (callback) {
        for (var j = 0, m = this.length; j < m; j++) {
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                var node = group[i];
                if (node) return node;
            }
        }
        return null;
    };
    d3_selectionPrototype.transition = function () {
        var subgroups = [], subgroup, node;
        for (var j = -1, m = this.length; ++j < m;) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n;) {
                subgroup.push((node = group[i]) ? {
                    node:node,
                    delay:d3_transitionDelay,
                    duration:d3_transitionDuration
                } : null);
            }
        }
        return d3_transition(subgroups, d3_transitionId || ++d3_transitionNextId, Date.now());
    };
    var d3_selectionRoot = d3_selection([
        [ document ]
    ]);
    d3_selectionRoot[0].parentNode = d3_selectRoot;
    d3.select = function (selector) {
        return typeof selector === "string" ? d3_selectionRoot.select(selector) : d3_selection([
            [ selector ]
        ]);
    };
    d3.selectAll = function (selector) {
        return typeof selector === "string" ? d3_selectionRoot.selectAll(selector) : d3_selection([ d3_array(selector) ]);
    };
    var d3_selection_enterPrototype = [];
    d3.selection.enter = d3_selection_enter;
    d3.selection.enter.prototype = d3_selection_enterPrototype;
    d3_selection_enterPrototype.append = d3_selectionPrototype.append;
    d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
    d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
    d3_selection_enterPrototype.node = d3_selectionPrototype.node;
    d3_selection_enterPrototype.select = function (selector) {
        var subgroups = [], subgroup, subnode, upgroup, group, node;
        for (var j = -1, m = this.length; ++j < m;) {
            upgroup = (group = this[j]).update;
            subgroups.push(subgroup = []);
            subgroup.parentNode = group.parentNode;
            for (var i = -1, n = group.length; ++i < n;) {
                if (node = group[i]) {
                    subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
                    subnode.__data__ = node.__data__;
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_selection(subgroups);
    };
    var d3_transitionPrototype = [], d3_transitionNextId = 0, d3_transitionId = 0, d3_transitionDefaultDelay = 0, d3_transitionDefaultDuration = 250, d3_transitionDefaultEase = d3.ease("cubic-in-out"), d3_transitionDelay = d3_transitionDefaultDelay, d3_transitionDuration = d3_transitionDefaultDuration, d3_transitionEase = d3_transitionDefaultEase;
    d3_transitionPrototype.call = d3_selectionPrototype.call;
    d3.transition = function (selection) {
        return arguments.length ? d3_transitionId ? selection.transition() : selection : d3_selectionRoot.transition();
    };
    d3.transition.prototype = d3_transitionPrototype;
    d3_transitionPrototype.select = function (selector) {
        var subgroups = [], subgroup, subnode, node;
        if (typeof selector !== "function") selector = d3_selection_selector(selector);
        for (var j = -1, m = this.length; ++j < m;) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = -1, n = group.length; ++i < n;) {
                if ((node = group[i]) && (subnode = selector.call(node.node, node.node.__data__, i))) {
                    if ("__data__" in node.node) subnode.__data__ = node.node.__data__;
                    subgroup.push({
                        node:subnode,
                        delay:node.delay,
                        duration:node.duration
                    });
                } else {
                    subgroup.push(null);
                }
            }
        }
        return d3_transition(subgroups, this.id, this.time).ease(this.ease());
    };
    d3_transitionPrototype.selectAll = function (selector) {
        var subgroups = [], subgroup, subnodes, node;
        if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);
        for (var j = -1, m = this.length; ++j < m;) {
            for (var group = this[j], i = -1, n = group.length; ++i < n;) {
                if (node = group[i]) {
                    subnodes = selector.call(node.node, node.node.__data__, i);
                    subgroups.push(subgroup = []);
                    for (var k = -1, o = subnodes.length; ++k < o;) {
                        subgroup.push({
                            node:subnodes[k],
                            delay:node.delay,
                            duration:node.duration
                        });
                    }
                }
            }
        }
        return d3_transition(subgroups, this.id, this.time).ease(this.ease());
    };
    d3_transitionPrototype.filter = function (filter) {
        var subgroups = [], subgroup, group, node;
        if (typeof filter !== "function") filter = d3_selection_filter(filter);
        for (var j = 0, m = this.length; j < m; j++) {
            subgroups.push(subgroup = []);
            for (var group = this[j], i = 0, n = group.length; i < n; i++) {
                if ((node = group[i]) && filter.call(node.node, node.node.__data__, i)) {
                    subgroup.push(node);
                }
            }
        }
        return d3_transition(subgroups, this.id, this.time).ease(this.ease());
    };
    d3_transitionPrototype.attr = function (name, value) {
        if (arguments.length < 2) {
            for (value in name) this.attrTween(value, d3_tweenByName(name[value], value));
            return this;
        }
        return this.attrTween(name, d3_tweenByName(value, name));
    };
    d3_transitionPrototype.attrTween = function (nameNS, tween) {
        function attrTween(d, i) {
            var f = tween.call(this, d, i, this.getAttribute(name));
            return f === d3_tweenRemove ? (this.removeAttribute(name), null) : f && function (t) {
                this.setAttribute(name, f(t));
            };
        }

        function attrTweenNS(d, i) {
            var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
            return f === d3_tweenRemove ? (this.removeAttributeNS(name.space, name.local), null) : f && function (t) {
                this.setAttributeNS(name.space, name.local, f(t));
            };
        }

        var name = d3.ns.qualify(nameNS);
        return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
    };
    d3_transitionPrototype.style = function (name, value, priority) {
        var n = arguments.length;
        if (n < 3) {
            if (typeof name !== "string") {
                if (n < 2) value = "";
                for (priority in name) this.styleTween(priority, d3_tweenByName(name[priority], priority), value);
                return this;
            }
            priority = "";
        }
        return this.styleTween(name, d3_tweenByName(value, name), priority);
    };
    d3_transitionPrototype.styleTween = function (name, tween, priority) {
        if (arguments.length < 3) priority = "";
        return this.tween("style." + name, function (d, i) {
            var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
            return f === d3_tweenRemove ? (this.style.removeProperty(name), null) : f && function (t) {
                this.style.setProperty(name, f(t), priority);
            };
        });
    };
    d3_transitionPrototype.text = function (value) {
        return this.tween("text", function (d, i) {
            this.textContent = typeof value === "function" ? value.call(this, d, i) : value;
        });
    };
    d3_transitionPrototype.remove = function () {
        return this.each("end.transition", function () {
            var p;
            if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
        });
    };
    d3_transitionPrototype.delay = function (value) {
        return d3_selection_each(this, typeof value === "function" ? function (node, i, j) {
            node.delay = value.call(node = node.node, node.__data__, i, j) | 0;
        } : (value = value | 0, function (node) {
            node.delay = value;
        }));
    };
    d3_transitionPrototype.duration = function (value) {
        return d3_selection_each(this, typeof value === "function" ? function (node, i, j) {
            node.duration = Math.max(1, value.call(node = node.node, node.__data__, i, j) | 0);
        } : (value = Math.max(1, value | 0), function (node) {
            node.duration = value;
        }));
    };
    d3_transitionPrototype.transition = function () {
        return this.select(d3_this);
    };
    d3.tween = function (b, interpolate) {
        function tweenFunction(d, i, a) {
            var v = b.call(this, d, i);
            return v == null ? a != "" && d3_tweenRemove : a != v && interpolate(a, v);
        }

        function tweenString(d, i, a) {
            return a != b && interpolate(a, b);
        }

        return typeof b === "function" ? tweenFunction : b == null ? d3_tweenNull : (b += "", tweenString);
    };
    var d3_tweenRemove = {};
    var d3_timer_queue = null, d3_timer_interval, d3_timer_timeout;
    d3.timer = function (callback, delay, then) {
        var found = false, t0, t1 = d3_timer_queue;
        if (arguments.length < 3) {
            if (arguments.length < 2) delay = 0; else if (!isFinite(delay)) return;
            then = Date.now();
        }
        while (t1) {
            if (t1.callback === callback) {
                t1.then = then;
                t1.delay = delay;
                found = true;
                break;
            }
            t0 = t1;
            t1 = t1.next;
        }
        if (!found) d3_timer_queue = {
            callback:callback,
            then:then,
            delay:delay,
            next:d3_timer_queue
        };
        if (!d3_timer_interval) {
            d3_timer_timeout = clearTimeout(d3_timer_timeout);
            d3_timer_interval = 1;
            d3_timer_frame(d3_timer_step);
        }
    };
    d3.timer.flush = function () {
        var elapsed, now = Date.now(), t1 = d3_timer_queue;
        while (t1) {
            elapsed = now - t1.then;
            if (!t1.delay) t1.flush = t1.callback(elapsed);
            t1 = t1.next;
        }
        d3_timer_flush();
    };
    var d3_timer_frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        setTimeout(callback, 17);
    };
    d3.mouse = function (container) {
        return d3_mousePoint(container, d3_eventSource());
    };
    var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;
    d3.touches = function (container, touches) {
        if (arguments.length < 2) touches = d3_eventSource().touches;
        return touches ? d3_array(touches).map(function (touch) {
            var point = d3_mousePoint(container, touch);
            point.identifier = touch.identifier;
            return point;
        }) : [];
    };
    d3.scale = {};
    d3.scale.linear = function () {
        return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3.interpolate, false);
    };
    d3.scale.log = function () {
        return d3_scale_log(d3.scale.linear(), d3_scale_logp);
    };
    var d3_scale_logFormat = d3.format(".0e");
    d3_scale_logp.pow = function (x) {
        return Math.pow(10, x);
    };
    d3_scale_logn.pow = function (x) {
        return -Math.pow(10, -x);
    };
    d3.scale.pow = function () {
        return d3_scale_pow(d3.scale.linear(), 1);
    };
    d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(.5);
    };
    d3.scale.ordinal = function () {
        return d3_scale_ordinal([], {
            t:"range",
            a:[
                []
            ]
        });
    };
    d3.scale.category10 = function () {
        return d3.scale.ordinal().range(d3_category10);
    };
    d3.scale.category20 = function () {
        return d3.scale.ordinal().range(d3_category20);
    };
    d3.scale.category20b = function () {
        return d3.scale.ordinal().range(d3_category20b);
    };
    d3.scale.category20c = function () {
        return d3.scale.ordinal().range(d3_category20c);
    };
    var d3_category10 = [ "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf" ];
    var d3_category20 = [ "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5" ];
    var d3_category20b = [ "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6" ];
    var d3_category20c = [ "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9" ];
    d3.scale.quantile = function () {
        return d3_scale_quantile([], []);
    };
    d3.scale.quantize = function () {
        return d3_scale_quantize(0, 1, [ 0, 1 ]);
    };
    d3.scale.threshold = function () {
        return d3_scale_threshold([ .5 ], [ 0, 1 ]);
    };
    d3.scale.identity = function () {
        return d3_scale_identity([ 0, 1 ]);
    };
    d3.svg = {};
    d3.svg.arc = function () {
        function arc() {
            var r0 = innerRadius.apply(this, arguments), r1 = outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset, a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset, da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0), df = da < Math.PI ? "0" : "1", c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
            return da >= d3_svg_arcMax ? r0 ? "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "M0," + r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + -r0 + "A" + r0 + "," + r0 + " 0 1,0 0," + r0 + "Z" : "M0," + r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + -r1 + "A" + r1 + "," + r1 + " 0 1,1 0," + r1 + "Z" : r0 ? "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L" + r0 * c1 + "," + r0 * s1 + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0 + "Z" : "M" + r1 * c0 + "," + r1 * s0 + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1 + "L0,0" + "Z";
        }

        var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
        arc.innerRadius = function (v) {
            if (!arguments.length) return innerRadius;
            innerRadius = d3_functor(v);
            return arc;
        };
        arc.outerRadius = function (v) {
            if (!arguments.length) return outerRadius;
            outerRadius = d3_functor(v);
            return arc;
        };
        arc.startAngle = function (v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return arc;
        };
        arc.endAngle = function (v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return arc;
        };
        arc.centroid = function () {
            var r = (innerRadius.apply(this, arguments) + outerRadius.apply(this, arguments)) / 2, a = (startAngle.apply(this, arguments) + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
            return [ Math.cos(a) * r, Math.sin(a) * r ];
        };
        return arc;
    };
    var d3_svg_arcOffset = -Math.PI / 2, d3_svg_arcMax = 2 * Math.PI - 1e-6;
    d3.svg.line = function () {
        return d3_svg_line(d3_identity);
    };
    var d3_svg_lineInterpolators = d3.map({
        linear:d3_svg_lineLinear,
        "linear-closed":d3_svg_lineLinearClosed,
        "step-before":d3_svg_lineStepBefore,
        "step-after":d3_svg_lineStepAfter,
        basis:d3_svg_lineBasis,
        "basis-open":d3_svg_lineBasisOpen,
        "basis-closed":d3_svg_lineBasisClosed,
        bundle:d3_svg_lineBundle,
        cardinal:d3_svg_lineCardinal,
        "cardinal-open":d3_svg_lineCardinalOpen,
        "cardinal-closed":d3_svg_lineCardinalClosed,
        monotone:d3_svg_lineMonotone
    });
    d3_svg_lineInterpolators.forEach(function (key, value) {
        value.key = key;
        value.closed = /-closed$/.test(key);
    });
    var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
    d3.svg.line.radial = function () {
        var line = d3_svg_line(d3_svg_lineRadial);
        line.radius = line.x, delete line.x;
        line.angle = line.y, delete line.y;
        return line;
    };
    d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
    d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
    d3.svg.area = function () {
        return d3_svg_area(d3_identity);
    };
    d3.svg.area.radial = function () {
        var area = d3_svg_area(d3_svg_lineRadial);
        area.radius = area.x, delete area.x;
        area.innerRadius = area.x0, delete area.x0;
        area.outerRadius = area.x1, delete area.x1;
        area.angle = area.y, delete area.y;
        area.startAngle = area.y0, delete area.y0;
        area.endAngle = area.y1, delete area.y1;
        return area;
    };
    d3.svg.chord = function () {
        function chord(d, i) {
            var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
            return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
        }

        function subgroup(self, f, d, i) {
            var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset, a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
            return {
                r:r,
                a0:a0,
                a1:a1,
                p0:[ r * Math.cos(a0), r * Math.sin(a0) ],
                p1:[ r * Math.cos(a1), r * Math.sin(a1) ]
            };
        }

        function equals(a, b) {
            return a.a0 == b.a0 && a.a1 == b.a1;
        }

        function arc(r, p, a) {
            return "A" + r + "," + r + " 0 " + +(a > Math.PI) + ",1 " + p;
        }

        function curve(r0, p0, r1, p1) {
            return "Q 0,0 " + p1;
        }

        var source = d3_svg_chordSource, target = d3_svg_chordTarget, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
        chord.radius = function (v) {
            if (!arguments.length) return radius;
            radius = d3_functor(v);
            return chord;
        };
        chord.source = function (v) {
            if (!arguments.length) return source;
            source = d3_functor(v);
            return chord;
        };
        chord.target = function (v) {
            if (!arguments.length) return target;
            target = d3_functor(v);
            return chord;
        };
        chord.startAngle = function (v) {
            if (!arguments.length) return startAngle;
            startAngle = d3_functor(v);
            return chord;
        };
        chord.endAngle = function (v) {
            if (!arguments.length) return endAngle;
            endAngle = d3_functor(v);
            return chord;
        };
        return chord;
    };
    d3.svg.diagonal = function () {
        function diagonal(d, i) {
            var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
                x:p0.x,
                y:m
            }, {
                x:p3.x,
                y:m
            }, p3 ];
            p = p.map(projection);
            return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
        }

        var source = d3_svg_chordSource, target = d3_svg_chordTarget, projection = d3_svg_diagonalProjection;
        diagonal.source = function (x) {
            if (!arguments.length) return source;
            source = d3_functor(x);
            return diagonal;
        };
        diagonal.target = function (x) {
            if (!arguments.length) return target;
            target = d3_functor(x);
            return diagonal;
        };
        diagonal.projection = function (x) {
            if (!arguments.length) return projection;
            projection = x;
            return diagonal;
        };
        return diagonal;
    };
    d3.svg.diagonal.radial = function () {
        var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
        diagonal.projection = function (x) {
            return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
        };
        return diagonal;
    };
    d3.svg.mouse = d3.mouse;
    d3.svg.touches = d3.touches;
    d3.svg.symbol = function () {
        function symbol(d, i) {
            return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
        }

        var type = d3_svg_symbolType, size = d3_svg_symbolSize;
        symbol.type = function (x) {
            if (!arguments.length) return type;
            type = d3_functor(x);
            return symbol;
        };
        symbol.size = function (x) {
            if (!arguments.length) return size;
            size = d3_functor(x);
            return symbol;
        };
        return symbol;
    };
    var d3_svg_symbols = d3.map({
        circle:d3_svg_symbolCircle,
        cross:function (size) {
            var r = Math.sqrt(size / 5) / 2;
            return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
        },
        diamond:function (size) {
            var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
            return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
        },
        square:function (size) {
            var r = Math.sqrt(size) / 2;
            return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
        },
        "triangle-down":function (size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
        },
        "triangle-up":function (size) {
            var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
            return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
        }
    });
    d3.svg.symbolTypes = d3_svg_symbols.keys();
    var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        function axis(g) {
            g.each(function () {
                var g = d3.select(this);
                var ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain() : tickValues, tickFormat = tickFormat_ == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String : tickFormat_;
                var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide), subtick = g.selectAll(".minor").data(subticks, String), subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6), subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(), subtickUpdate = d3.transition(subtick).style("opacity", 1);
                var tick = g.selectAll("g").data(ticks, String), tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6), tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(), tickUpdate = d3.transition(tick).style("opacity", 1), tickTransform;
                var range = d3_scaleRange(scale), path = g.selectAll(".domain").data([ 0 ]), pathEnter = path.enter().append("path").attr("class", "domain"), pathUpdate = d3.transition(path);
                var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
                this.__chart__ = scale1;
                tickEnter.append("line").attr("class", "tick");
                tickEnter.append("text");
                var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");
                switch (orient) {
                    case "bottom":
                    {
                        tickTransform = d3_svg_axisX;
                        subtickEnter.attr("y2", tickMinorSize);
                        subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
                        lineEnter.attr("y2", tickMajorSize);
                        textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
                        textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        text.attr("dy", ".71em").attr("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
                        break;
                    }
                    case "top":
                    {
                        tickTransform = d3_svg_axisX;
                        subtickEnter.attr("y2", -tickMinorSize);
                        subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
                        lineEnter.attr("y2", -tickMajorSize);
                        textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
                        lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
                        textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
                        text.attr("dy", "0em").attr("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
                        break;
                    }
                    case "left":
                    {
                        tickTransform = d3_svg_axisY;
                        subtickEnter.attr("x2", -tickMinorSize);
                        subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
                        lineEnter.attr("x2", -tickMajorSize);
                        textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
                        lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
                        textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
                        text.attr("dy", ".32em").attr("text-anchor", "end");
                        pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
                        break;
                    }
                    case "right":
                    {
                        tickTransform = d3_svg_axisY;
                        subtickEnter.attr("x2", tickMinorSize);
                        subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
                        lineEnter.attr("x2", tickMajorSize);
                        textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
                        lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
                        textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
                        text.attr("dy", ".32em").attr("text-anchor", "start");
                        pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
                        break;
                    }
                }
                if (scale.ticks) {
                    tickEnter.call(tickTransform, scale0);
                    tickUpdate.call(tickTransform, scale1);
                    tickExit.call(tickTransform, scale1);
                    subtickEnter.call(tickTransform, scale0);
                    subtickUpdate.call(tickTransform, scale1);
                    subtickExit.call(tickTransform, scale1);
                } else {
                    var dx = scale1.rangeBand() / 2, x = function (d) {
                        return scale1(d) + dx;
                    };
                    tickEnter.call(tickTransform, x);
                    tickUpdate.call(tickTransform, x);
                }
            });
        }

        var scale = d3.scale.linear(), orient = "bottom", tickMajorSize = 6, tickMinorSize = 6, tickEndSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_, tickSubdivide = 0;
        axis.scale = function (x) {
            if (!arguments.length) return scale;
            scale = x;
            return axis;
        };
        axis.orient = function (x) {
            if (!arguments.length) return orient;
            orient = x;
            return axis;
        };
        axis.ticks = function () {
            if (!arguments.length) return tickArguments_;
            tickArguments_ = arguments;
            return axis;
        };
        axis.tickValues = function (x) {
            if (!arguments.length) return tickValues;
            tickValues = x;
            return axis;
        };
        axis.tickFormat = function (x) {
            if (!arguments.length) return tickFormat_;
            tickFormat_ = x;
            return axis;
        };
        axis.tickSize = function (x, y, z) {
            if (!arguments.length) return tickMajorSize;
            var n = arguments.length - 1;
            tickMajorSize = +x;
            tickMinorSize = n > 1 ? +y : tickMajorSize;
            tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
            return axis;
        };
        axis.tickPadding = function (x) {
            if (!arguments.length) return tickPadding;
            tickPadding = +x;
            return axis;
        };
        axis.tickSubdivide = function (x) {
            if (!arguments.length) return tickSubdivide;
            tickSubdivide = +x;
            return axis;
        };
        return axis;
    };
    d3.svg.brush = function () {
        function brush(g) {
            g.each(function () {
                var g = d3.select(this), bg = g.selectAll(".background").data([ 0 ]), fg = g.selectAll(".extent").data([ 0 ]), tz = g.selectAll(".resize").data(resizes, String), e;
                g.style("pointer-events", "all").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
                bg.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
                fg.enter().append("rect").attr("class", "extent").style("cursor", "move");
                tz.enter().append("g").attr("class",function (d) {
                    return "resize " + d;
                }).style("cursor",function (d) {
                        return d3_svg_brushCursor[d];
                    }).append("rect").attr("x",function (d) {
                        return /[ew]$/.test(d) ? -3 : null;
                    }).attr("y",function (d) {
                        return /^[ns]/.test(d) ? -3 : null;
                    }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
                tz.style("display", brush.empty() ? "none" : null);
                tz.exit().remove();
                if (x) {
                    e = d3_scaleRange(x);
                    bg.attr("x", e[0]).attr("width", e[1] - e[0]);
                    redrawX(g);
                }
                if (y) {
                    e = d3_scaleRange(y);
                    bg.attr("y", e[0]).attr("height", e[1] - e[0]);
                    redrawY(g);
                }
                redraw(g);
            });
        }

        function redraw(g) {
            g.selectAll(".resize").attr("transform", function (d) {
                return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
            });
        }

        function redrawX(g) {
            g.select(".extent").attr("x", extent[0][0]);
            g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
        }

        function redrawY(g) {
            g.select(".extent").attr("y", extent[0][1]);
            g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
        }

        function brushstart() {
            function mouse() {
                var touches = d3.event.changedTouches;
                return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
            }

            function keydown() {
                if (d3.event.keyCode == 32) {
                    if (!dragging) {
                        center = null;
                        origin[0] -= extent[1][0];
                        origin[1] -= extent[1][1];
                        dragging = 2;
                    }
                    d3_eventCancel();
                }
            }

            function keyup() {
                if (d3.event.keyCode == 32 && dragging == 2) {
                    origin[0] += extent[1][0];
                    origin[1] += extent[1][1];
                    dragging = 0;
                    d3_eventCancel();
                }
            }

            function brushmove() {
                var point = mouse(), moved = false;
                if (offset) {
                    point[0] += offset[0];
                    point[1] += offset[1];
                }
                if (!dragging) {
                    if (d3.event.altKey) {
                        if (!center) center = [ (extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2 ];
                        origin[0] = extent[+(point[0] < center[0])][0];
                        origin[1] = extent[+(point[1] < center[1])][1];
                    } else center = null;
                }
                if (resizingX && move1(point, x, 0)) {
                    redrawX(g);
                    moved = true;
                }
                if (resizingY && move1(point, y, 1)) {
                    redrawY(g);
                    moved = true;
                }
                if (moved) {
                    redraw(g);
                    event_({
                        type:"brush",
                        mode:dragging ? "move" : "resize"
                    });
                }
            }

            function move1(point, scale, i) {
                var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], size = extent[1][i] - extent[0][i], min, max;
                if (dragging) {
                    r0 -= position;
                    r1 -= size + position;
                }
                min = Math.max(r0, Math.min(r1, point[i]));
                if (dragging) {
                    max = (min += position) + size;
                } else {
                    if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
                    if (position < min) {
                        max = min;
                        min = position;
                    } else {
                        max = position;
                    }
                }
                if (extent[0][i] !== min || extent[1][i] !== max) {
                    extentDomain = null;
                    extent[0][i] = min;
                    extent[1][i] = max;
                    return true;
                }
            }

            function brushend() {
                brushmove();
                g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
                d3.select("body").style("cursor", null);
                w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
                event_({
                    type:"brushend"
                });
                d3_eventCancel();
            }

            var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), center, origin = mouse(), offset;
            var w = d3.select(window).on("mousemove.brush", brushmove).on("mouseup.brush", brushend).on("touchmove.brush", brushmove).on("touchend.brush", brushend).on("keydown.brush", keydown).on("keyup.brush", keyup);
            if (dragging) {
                origin[0] = extent[0][0] - origin[0];
                origin[1] = extent[0][1] - origin[1];
            } else if (resizing) {
                var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
                offset = [ extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1] ];
                origin[0] = extent[ex][0];
                origin[1] = extent[ey][1];
            } else if (d3.event.altKey) center = origin.slice();
            g.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d3.select("body").style("cursor", eventTarget.style("cursor"));
            event_({
                type:"brushstart"
            });
            brushmove();
            d3_eventCancel();
        }

        var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, resizes = d3_svg_brushResizes[0], extent = [
            [ 0, 0 ],
            [ 0, 0 ]
        ], extentDomain;
        brush.x = function (z) {
            if (!arguments.length) return x;
            x = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
        };
        brush.y = function (z) {
            if (!arguments.length) return y;
            y = z;
            resizes = d3_svg_brushResizes[!x << 1 | !y];
            return brush;
        };
        brush.extent = function (z) {
            var x0, x1, y0, y1, t;
            if (!arguments.length) {
                z = extentDomain || extent;
                if (x) {
                    x0 = z[0][0], x1 = z[1][0];
                    if (!extentDomain) {
                        x0 = extent[0][0], x1 = extent[1][0];
                        if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
                        if (x1 < x0) t = x0, x0 = x1, x1 = t;
                    }
                }
                if (y) {
                    y0 = z[0][1], y1 = z[1][1];
                    if (!extentDomain) {
                        y0 = extent[0][1], y1 = extent[1][1];
                        if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
                        if (y1 < y0) t = y0, y0 = y1, y1 = t;
                    }
                }
                return x && y ? [
                    [ x0, y0 ],
                    [ x1, y1 ]
                ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
            }
            extentDomain = [
                [ 0, 0 ],
                [ 0, 0 ]
            ];
            if (x) {
                x0 = z[0], x1 = z[1];
                if (y) x0 = x0[0], x1 = x1[0];
                extentDomain[0][0] = x0, extentDomain[1][0] = x1;
                if (x.invert) x0 = x(x0), x1 = x(x1);
                if (x1 < x0) t = x0, x0 = x1, x1 = t;
                extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
            }
            if (y) {
                y0 = z[0], y1 = z[1];
                if (x) y0 = y0[1], y1 = y1[1];
                extentDomain[0][1] = y0, extentDomain[1][1] = y1;
                if (y.invert) y0 = y(y0), y1 = y(y1);
                if (y1 < y0) t = y0, y0 = y1, y1 = t;
                extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
            }
            return brush;
        };
        brush.clear = function () {
            extentDomain = null;
            extent[0][0] = extent[0][1] = extent[1][0] = extent[1][1] = 0;
            return brush;
        };
        brush.empty = function () {
            return x && extent[0][0] === extent[1][0] || y && extent[0][1] === extent[1][1];
        };
        return d3.rebind(brush, event, "on");
    };
    var d3_svg_brushCursor = {
        n:"ns-resize",
        e:"ew-resize",
        s:"ns-resize",
        w:"ew-resize",
        nw:"nwse-resize",
        ne:"nesw-resize",
        se:"nwse-resize",
        sw:"nesw-resize"
    };
    var d3_svg_brushResizes = [
        [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ],
        [ "e", "w" ],
        [ "n", "s" ],
        []
    ];
    d3.behavior = {};
    d3.behavior.drag = function () {
        function drag() {
            this.on("mousedown.drag", mousedown).on("touchstart.drag", mousedown);
        }

        function mousedown() {
            function point() {
                var p = target.parentNode;
                return touchId ? d3.touches(p).filter(function (p) {
                    return p.identifier === touchId;
                })[0] : d3.mouse(p);
            }

            function dragmove() {
                if (!target.parentNode) return dragend();
                var p = point(), dx = p[0] - origin_[0], dy = p[1] - origin_[1];
                moved |= dx | dy;
                origin_ = p;
                d3_eventCancel();
                event_({
                    type:"drag",
                    x:p[0] + offset[0],
                    y:p[1] + offset[1],
                    dx:dx,
                    dy:dy
                });
            }

            function dragend() {
                event_({
                    type:"dragend"
                });
                if (moved) {
                    d3_eventCancel();
                    if (d3.event.target === eventTarget) w.on("click.drag", click, true);
                }
                w.on(touchId ? "touchmove.drag-" + touchId : "mousemove.drag", null).on(touchId ? "touchend.drag-" + touchId : "mouseup.drag", null);
            }

            function click() {
                d3_eventCancel();
                w.on("click.drag", null);
            }

            var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, touchId = d3.event.touches && d3.event.changedTouches[0].identifier, offset, origin_ = point(), moved = 0;
            var w = d3.select(window).on(touchId ? "touchmove.drag-" + touchId : "mousemove.drag", dragmove).on(touchId ? "touchend.drag-" + touchId : "mouseup.drag", dragend, true);
            if (origin) {
                offset = origin.apply(target, arguments);
                offset = [ offset.x - origin_[0], offset.y - origin_[1] ];
            } else {
                offset = [ 0, 0 ];
            }
            if (!touchId) d3_eventCancel();
            event_({
                type:"dragstart"
            });
        }

        var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null;
        drag.origin = function (x) {
            if (!arguments.length) return origin;
            origin = x;
            return drag;
        };
        return d3.rebind(drag, event, "on");
    };
    d3.behavior.zoom = function () {
        function zoom() {
            this.on("mousedown.zoom", mousedown).on("mousewheel.zoom", mousewheel).on("mousemove.zoom", mousemove).on("DOMMouseScroll.zoom", mousewheel).on("dblclick.zoom", dblclick).on("touchstart.zoom", touchstart).on("touchmove.zoom", touchmove).on("touchend.zoom", touchstart);
        }

        function location(p) {
            return [ (p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale ];
        }

        function point(l) {
            return [ l[0] * scale + translate[0], l[1] * scale + translate[1] ];
        }

        function scaleTo(s) {
            scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
        }

        function translateTo(p, l) {
            l = point(l);
            translate[0] += p[0] - l[0];
            translate[1] += p[1] - l[1];
        }

        function dispatch(event) {
            if (x1) x1.domain(x0.range().map(function (x) {
                return (x - translate[0]) / scale;
            }).map(x0.invert));
            if (y1) y1.domain(y0.range().map(function (y) {
                return (y - translate[1]) / scale;
            }).map(y0.invert));
            d3.event.preventDefault();
            event({
                type:"zoom",
                scale:scale,
                translate:translate
            });
        }

        function mousedown() {
            function mousemove() {
                moved = 1;
                translateTo(d3.mouse(target), l);
                dispatch(event_);
            }

            function mouseup() {
                if (moved) d3_eventCancel();
                w.on("mousemove.zoom", null).on("mouseup.zoom", null);
                if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
            }

            function click() {
                d3_eventCancel();
                w.on("click.zoom", null);
            }

            var target = this, event_ = event.of(target, arguments), eventTarget = d3.event.target, moved = 0, w = d3.select(window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup), l = location(d3.mouse(target));
            window.focus();
            d3_eventCancel();
        }

        function mousewheel() {
            if (!translate0) translate0 = location(d3.mouse(this));
            scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
            translateTo(d3.mouse(this), translate0);
            dispatch(event.of(this, arguments));
        }

        function mousemove() {
            translate0 = null;
        }

        function dblclick() {
            var p = d3.mouse(this), l = location(p);
            scaleTo(d3.event.shiftKey ? scale / 2 : scale * 2);
            translateTo(p, l);
            dispatch(event.of(this, arguments));
        }

        function touchstart() {
            var touches = d3.touches(this), now = Date.now();
            scale0 = scale;
            translate0 = {};
            touches.forEach(function (t) {
                translate0[t.identifier] = location(t);
            });
            d3_eventCancel();
            if (touches.length === 1) {
                if (now - touchtime < 500) {
                    var p = touches[0], l = location(touches[0]);
                    scaleTo(scale * 2);
                    translateTo(p, l);
                    dispatch(event.of(this, arguments));
                }
                touchtime = now;
            }
        }

        function touchmove() {
            var touches = d3.touches(this), p0 = touches[0], l0 = translate0[p0.identifier];
            if (p1 = touches[1]) {
                var p1, l1 = translate0[p1.identifier];
                p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
                l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
                scaleTo(d3.event.scale * scale0);
            }
            translateTo(p0, l0);
            touchtime = null;
            dispatch(event.of(this, arguments));
        }

        var translate = [ 0, 0 ], translate0, scale = 1, scale0, scaleExtent = d3_behavior_zoomInfinity, event = d3_eventDispatch(zoom, "zoom"), x0, x1, y0, y1, touchtime;
        zoom.translate = function (x) {
            if (!arguments.length) return translate;
            translate = x.map(Number);
            return zoom;
        };
        zoom.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return zoom;
        };
        zoom.scaleExtent = function (x) {
            if (!arguments.length) return scaleExtent;
            scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
            return zoom;
        };
        zoom.x = function (z) {
            if (!arguments.length) return x1;
            x1 = z;
            x0 = z.copy();
            return zoom;
        };
        zoom.y = function (z) {
            if (!arguments.length) return y1;
            y1 = z;
            y0 = z.copy();
            return zoom;
        };
        return d3.rebind(zoom, event, "on");
    };
    var d3_behavior_zoomDiv, d3_behavior_zoomInfinity = [ 0, Infinity ];
    d3.layout = {};
    d3.layout.bundle = function () {
        return function (links) {
            var paths = [], i = -1, n = links.length;
            while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
            return paths;
        };
    };
    d3.layout.chord = function () {
        function relayout() {
            var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
            chords = [];
            groups = [];
            k = 0, i = -1;
            while (++i < n) {
                x = 0, j = -1;
                while (++j < n) {
                    x += matrix[i][j];
                }
                groupSums.push(x);
                subgroupIndex.push(d3.range(n));
                k += x;
            }
            if (sortGroups) {
                groupIndex.sort(function (a, b) {
                    return sortGroups(groupSums[a], groupSums[b]);
                });
            }
            if (sortSubgroups) {
                subgroupIndex.forEach(function (d, i) {
                    d.sort(function (a, b) {
                        return sortSubgroups(matrix[i][a], matrix[i][b]);
                    });
                });
            }
            k = (2 * Math.PI - padding * n) / k;
            x = 0, i = -1;
            while (++i < n) {
                x0 = x, j = -1;
                while (++j < n) {
                    var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
                    subgroups[di + "-" + dj] = {
                        index:di,
                        subindex:dj,
                        startAngle:a0,
                        endAngle:a1,
                        value:v
                    };
                }
                groups[di] = {
                    index:di,
                    startAngle:x0,
                    endAngle:x,
                    value:(x - x0) / k
                };
                x += padding;
            }
            i = -1;
            while (++i < n) {
                j = i - 1;
                while (++j < n) {
                    var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
                    if (source.value || target.value) {
                        chords.push(source.value < target.value ? {
                            source:target,
                            target:source
                        } : {
                            source:source,
                            target:target
                        });
                    }
                }
            }
            if (sortChords) resort();
        }

        function resort() {
            chords.sort(function (a, b) {
                return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
            });
        }

        var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
        chord.matrix = function (x) {
            if (!arguments.length) return matrix;
            n = (matrix = x) && matrix.length;
            chords = groups = null;
            return chord;
        };
        chord.padding = function (x) {
            if (!arguments.length) return padding;
            padding = x;
            chords = groups = null;
            return chord;
        };
        chord.sortGroups = function (x) {
            if (!arguments.length) return sortGroups;
            sortGroups = x;
            chords = groups = null;
            return chord;
        };
        chord.sortSubgroups = function (x) {
            if (!arguments.length) return sortSubgroups;
            sortSubgroups = x;
            chords = null;
            return chord;
        };
        chord.sortChords = function (x) {
            if (!arguments.length) return sortChords;
            sortChords = x;
            if (chords) resort();
            return chord;
        };
        chord.chords = function () {
            if (!chords) relayout();
            return chords;
        };
        chord.groups = function () {
            if (!groups) relayout();
            return groups;
        };
        return chord;
    };
    d3.layout.force = function () {
        function repulse(node) {
            return function (quad, x1, y1, x2, y2) {
                if (quad.point !== node) {
                    var dx = quad.cx - node.x, dy = quad.cy - node.y, dn = 1 / Math.sqrt(dx * dx + dy * dy);
                    if ((x2 - x1) * dn < theta) {
                        var k = quad.charge * dn * dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                        return true;
                    }
                    if (quad.point && isFinite(dn)) {
                        var k = quad.pointCharge * dn * dn;
                        node.px -= dx * k;
                        node.py -= dy * k;
                    }
                }
                return !quad.charge;
            };
        }

        function dragmove(d) {
            d.px = d3.event.x;
            d.py = d3.event.y;
            force.resume();
        }

        var force = {}, event = d3.dispatch("start", "tick", "end"), size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, gravity = .1, theta = .8, interval, nodes = [], links = [], distances, strengths, charges;
        force.tick = function () {
            if ((alpha *= .99) < .005) {
                event.end({
                    type:"end",
                    alpha:alpha = 0
                });
                return true;
            }
            var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
            for (i = 0; i < m; ++i) {
                o = links[i];
                s = o.source;
                t = o.target;
                x = t.x - s.x;
                y = t.y - s.y;
                if (l = x * x + y * y) {
                    l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
                    x *= l;
                    y *= l;
                    t.x -= x * (k = s.weight / (t.weight + s.weight));
                    t.y -= y * k;
                    s.x += x * (k = 1 - k);
                    s.y += y * k;
                }
            }
            if (k = alpha * gravity) {
                x = size[0] / 2;
                y = size[1] / 2;
                i = -1;
                if (k) while (++i < n) {
                    o = nodes[i];
                    o.x += (x - o.x) * k;
                    o.y += (y - o.y) * k;
                }
            }
            if (charge) {
                d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
                i = -1;
                while (++i < n) {
                    if (!(o = nodes[i]).fixed) {
                        q.visit(repulse(o));
                    }
                }
            }
            i = -1;
            while (++i < n) {
                o = nodes[i];
                if (o.fixed) {
                    o.x = o.px;
                    o.y = o.py;
                } else {
                    o.x -= (o.px - (o.px = o.x)) * friction;
                    o.y -= (o.py - (o.py = o.y)) * friction;
                }
            }
            event.tick({
                type:"tick",
                alpha:alpha
            });
        };
        force.nodes = function (x) {
            if (!arguments.length) return nodes;
            nodes = x;
            return force;
        };
        force.links = function (x) {
            if (!arguments.length) return links;
            links = x;
            return force;
        };
        force.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return force;
        };
        force.linkDistance = function (x) {
            if (!arguments.length) return linkDistance;
            linkDistance = d3_functor(x);
            return force;
        };
        force.distance = force.linkDistance;
        force.linkStrength = function (x) {
            if (!arguments.length) return linkStrength;
            linkStrength = d3_functor(x);
            return force;
        };
        force.friction = function (x) {
            if (!arguments.length) return friction;
            friction = x;
            return force;
        };
        force.charge = function (x) {
            if (!arguments.length) return charge;
            charge = typeof x === "function" ? x : +x;
            return force;
        };
        force.gravity = function (x) {
            if (!arguments.length) return gravity;
            gravity = x;
            return force;
        };
        force.theta = function (x) {
            if (!arguments.length) return theta;
            theta = x;
            return force;
        };
        force.alpha = function (x) {
            if (!arguments.length) return alpha;
            if (alpha) {
                if (x > 0) alpha = x; else alpha = 0;
            } else if (x > 0) {
                event.start({
                    type:"start",
                    alpha:alpha = x
                });
                d3.timer(force.tick);
            }
            return force;
        };
        force.start = function () {
            function position(dimension, size) {
                var neighbors = neighbor(i), j = -1, m = neighbors.length, x;
                while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
                return Math.random() * size;
            }

            function neighbor() {
                if (!neighbors) {
                    neighbors = [];
                    for (j = 0; j < n; ++j) {
                        neighbors[j] = [];
                    }
                    for (j = 0; j < m; ++j) {
                        var o = links[j];
                        neighbors[o.source.index].push(o.target);
                        neighbors[o.target.index].push(o.source);
                    }
                }
                return neighbors[i];
            }

            var i, j, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
            for (i = 0; i < n; ++i) {
                (o = nodes[i]).index = i;
                o.weight = 0;
            }
            distances = [];
            strengths = [];
            for (i = 0; i < m; ++i) {
                o = links[i];
                if (typeof o.source == "number") o.source = nodes[o.source];
                if (typeof o.target == "number") o.target = nodes[o.target];
                distances[i] = linkDistance.call(this, o, i);
                strengths[i] = linkStrength.call(this, o, i);
                ++o.source.weight;
                ++o.target.weight;
            }
            for (i = 0; i < n; ++i) {
                o = nodes[i];
                if (isNaN(o.x)) o.x = position("x", w);
                if (isNaN(o.y)) o.y = position("y", h);
                if (isNaN(o.px)) o.px = o.x;
                if (isNaN(o.py)) o.py = o.y;
            }
            charges = [];
            if (typeof charge === "function") {
                for (i = 0; i < n; ++i) {
                    charges[i] = +charge.call(this, nodes[i], i);
                }
            } else {
                for (i = 0; i < n; ++i) {
                    charges[i] = charge;
                }
            }
            return force.resume();
        };
        force.resume = function () {
            return force.alpha(.1);
        };
        force.stop = function () {
            return force.alpha(0);
        };
        force.drag = function () {
            if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart", d3_layout_forceDragstart).on("drag", dragmove).on("dragend", d3_layout_forceDragend);
            this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
        };
        return d3.rebind(force, event, "on");
    };
    d3.layout.partition = function () {
        function position(node, x, dx, dy) {
            var children = node.children;
            node.x = x;
            node.y = node.depth * dy;
            node.dx = dx;
            node.dy = dy;
            if (children && (n = children.length)) {
                var i = -1, n, c, d;
                dx = node.value ? dx / node.value : 0;
                while (++i < n) {
                    position(c = children[i], x, d = c.value * dx, dy);
                    x += d;
                }
            }
        }

        function depth(node) {
            var children = node.children, d = 0;
            if (children && (n = children.length)) {
                var i = -1, n;
                while (++i < n) d = Math.max(d, depth(children[i]));
            }
            return 1 + d;
        }

        function partition(d, i) {
            var nodes = hierarchy.call(this, d, i);
            position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
            return nodes;
        }

        var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
        partition.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return partition;
        };
        return d3_layout_hierarchyRebind(partition, hierarchy);
    };
    d3.layout.pie = function () {
        function pie(data, i) {
            var values = data.map(function (d, i) {
                return +value.call(pie, d, i);
            });
            var a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle);
            var k = ((typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - startAngle) / d3.sum(values);
            var index = d3.range(data.length);
            if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function (i, j) {
                return values[j] - values[i];
            } : function (i, j) {
                return sort(data[i], data[j]);
            });
            var arcs = [];
            index.forEach(function (i) {
                var d;
                arcs[i] = {
                    data:data[i],
                    value:d = values[i],
                    startAngle:a,
                    endAngle:a += d * k
                };
            });
            return arcs;
        }

        var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = 2 * Math.PI;
        pie.value = function (x) {
            if (!arguments.length) return value;
            value = x;
            return pie;
        };
        pie.sort = function (x) {
            if (!arguments.length) return sort;
            sort = x;
            return pie;
        };
        pie.startAngle = function (x) {
            if (!arguments.length) return startAngle;
            startAngle = x;
            return pie;
        };
        pie.endAngle = function (x) {
            if (!arguments.length) return endAngle;
            endAngle = x;
            return pie;
        };
        return pie;
    };
    var d3_layout_pieSortByValue = {};
    d3.layout.stack = function () {
        function stack(data, index) {
            var series = data.map(function (d, i) {
                return values.call(stack, d, i);
            });
            var points = series.map(function (d, i) {
                return d.map(function (v, i) {
                    return [ x.call(stack, v, i), y.call(stack, v, i) ];
                });
            });
            var orders = order.call(stack, points, index);
            series = d3.permute(series, orders);
            points = d3.permute(points, orders);
            var offsets = offset.call(stack, points, index);
            var n = series.length, m = series[0].length, i, j, o;
            for (j = 0; j < m; ++j) {
                out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
                for (i = 1; i < n; ++i) {
                    out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
                }
            }
            return data;
        }

        var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
        stack.values = function (x) {
            if (!arguments.length) return values;
            values = x;
            return stack;
        };
        stack.order = function (x) {
            if (!arguments.length) return order;
            order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
            return stack;
        };
        stack.offset = function (x) {
            if (!arguments.length) return offset;
            offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
            return stack;
        };
        stack.x = function (z) {
            if (!arguments.length) return x;
            x = z;
            return stack;
        };
        stack.y = function (z) {
            if (!arguments.length) return y;
            y = z;
            return stack;
        };
        stack.out = function (z) {
            if (!arguments.length) return out;
            out = z;
            return stack;
        };
        return stack;
    };
    var d3_layout_stackOrders = d3.map({
        "inside-out":function (data) {
            var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function (a, b) {
                return max[a] - max[b];
            }), top = 0, bottom = 0, tops = [], bottoms = [];
            for (i = 0; i < n; ++i) {
                j = index[i];
                if (top < bottom) {
                    top += sums[j];
                    tops.push(j);
                } else {
                    bottom += sums[j];
                    bottoms.push(j);
                }
            }
            return bottoms.reverse().concat(tops);
        },
        reverse:function (data) {
            return d3.range(data.length).reverse();
        },
        "default":d3_layout_stackOrderDefault
    });
    var d3_layout_stackOffsets = d3.map({
        silhouette:function (data) {
            var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
                for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                if (o > max) max = o;
                sums.push(o);
            }
            for (j = 0; j < m; ++j) {
                y0[j] = (max - sums[j]) / 2;
            }
            return y0;
        },
        wiggle:function (data) {
            var n = data.length, x = data[0], m = x.length, max = 0, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
            y0[0] = o = o0 = 0;
            for (j = 1; j < m; ++j) {
                for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
                for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
                    for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
                        s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
                    }
                    s2 += s3 * data[i][j][1];
                }
                y0[j] = o -= s1 ? s2 / s1 * dx : 0;
                if (o < o0) o0 = o;
            }
            for (j = 0; j < m; ++j) y0[j] -= o0;
            return y0;
        },
        expand:function (data) {
            var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
            for (j = 0; j < m; ++j) {
                for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
                if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
            }
            for (j = 0; j < m; ++j) y0[j] = 0;
            return y0;
        },
        zero:d3_layout_stackOffsetZero
    });
    d3.layout.histogram = function () {
        function histogram(data, i) {
            var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
            while (++i < m) {
                bin = bins[i] = [];
                bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
                bin.y = 0;
            }
            if (m > 0) {
                i = -1;
                while (++i < n) {
                    x = values[i];
                    if (x >= range[0] && x <= range[1]) {
                        bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
                        bin.y += k;
                        bin.push(data[i]);
                    }
                }
            }
            return bins;
        }

        var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
        histogram.value = function (x) {
            if (!arguments.length) return valuer;
            valuer = x;
            return histogram;
        };
        histogram.range = function (x) {
            if (!arguments.length) return ranger;
            ranger = d3_functor(x);
            return histogram;
        };
        histogram.bins = function (x) {
            if (!arguments.length) return binner;
            binner = typeof x === "number" ? function (range) {
                return d3_layout_histogramBinFixed(range, x);
            } : d3_functor(x);
            return histogram;
        };
        histogram.frequency = function (x) {
            if (!arguments.length) return frequency;
            frequency = !!x;
            return histogram;
        };
        return histogram;
    };
    d3.layout.hierarchy = function () {
        function recurse(data, depth, nodes) {
            var childs = children.call(hierarchy, data, depth), node = d3_layout_hierarchyInline ? data : {
                data:data
            };
            node.depth = depth;
            nodes.push(node);
            if (childs && (n = childs.length)) {
                var i = -1, n, c = node.children = [], v = 0, j = depth + 1, d;
                while (++i < n) {
                    d = recurse(childs[i], j, nodes);
                    d.parent = node;
                    c.push(d);
                    v += d.value;
                }
                if (sort) c.sort(sort);
                if (value) node.value = v;
            } else if (value) {
                node.value = +value.call(hierarchy, data, depth) || 0;
            }
            return node;
        }

        function revalue(node, depth) {
            var children = node.children, v = 0;
            if (children && (n = children.length)) {
                var i = -1, n, j = depth + 1;
                while (++i < n) v += revalue(children[i], j);
            } else if (value) {
                v = +value.call(hierarchy, d3_layout_hierarchyInline ? node : node.data, depth) || 0;
            }
            if (value) node.value = v;
            return v;
        }

        function hierarchy(d) {
            var nodes = [];
            recurse(d, 0, nodes);
            return nodes;
        }

        var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
        hierarchy.sort = function (x) {
            if (!arguments.length) return sort;
            sort = x;
            return hierarchy;
        };
        hierarchy.children = function (x) {
            if (!arguments.length) return children;
            children = x;
            return hierarchy;
        };
        hierarchy.value = function (x) {
            if (!arguments.length) return value;
            value = x;
            return hierarchy;
        };
        hierarchy.revalue = function (root) {
            revalue(root, 0);
            return root;
        };
        return hierarchy;
    };
    var d3_layout_hierarchyInline = false;
    d3.layout.pack = function () {
        function pack(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0];
            root.x = 0;
            root.y = 0;
            d3_layout_treeVisitAfter(root, function (d) {
                d.r = Math.sqrt(d.value);
            });
            d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
            var w = size[0], h = size[1], k = Math.max(2 * root.r / w, 2 * root.r / h);
            if (padding > 0) {
                var dr = padding * k / 2;
                d3_layout_treeVisitAfter(root, function (d) {
                    d.r += dr;
                });
                d3_layout_treeVisitAfter(root, d3_layout_packSiblings);
                d3_layout_treeVisitAfter(root, function (d) {
                    d.r -= dr;
                });
                k = Math.max(2 * root.r / w, 2 * root.r / h);
            }
            d3_layout_packTransform(root, w / 2, h / 2, 1 / k);
            return nodes;
        }

        var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ];
        pack.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return pack;
        };
        pack.padding = function (_) {
            if (!arguments.length) return padding;
            padding = +_;
            return pack;
        };
        return d3_layout_hierarchyRebind(pack, hierarchy);
    };
    d3.layout.cluster = function () {
        function cluster(d, i) {
            var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0, kx, ky;
            d3_layout_treeVisitAfter(root, function (node) {
                var children = node.children;
                if (children && children.length) {
                    node.x = d3_layout_clusterX(children);
                    node.y = d3_layout_clusterY(children);
                } else {
                    node.x = previousNode ? x += separation(node, previousNode) : 0;
                    node.y = 0;
                    previousNode = node;
                }
            });
            var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
            d3_layout_treeVisitAfter(root, function (node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0];
                node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
            });
            return nodes;
        }

        var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
        cluster.separation = function (x) {
            if (!arguments.length) return separation;
            separation = x;
            return cluster;
        };
        cluster.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return cluster;
        };
        return d3_layout_hierarchyRebind(cluster, hierarchy);
    };
    d3.layout.tree = function () {
        function tree(d, i) {
            function firstWalk(node, previousSibling) {
                var children = node.children, layout = node._tree;
                if (children && (n = children.length)) {
                    var n, firstChild = children[0], previousChild, ancestor = firstChild, child, i = -1;
                    while (++i < n) {
                        child = children[i];
                        firstWalk(child, previousChild);
                        ancestor = apportion(child, previousChild, ancestor);
                        previousChild = child;
                    }
                    d3_layout_treeShift(node);
                    var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
                    if (previousSibling) {
                        layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
                        layout.mod = layout.prelim - midpoint;
                    } else {
                        layout.prelim = midpoint;
                    }
                } else {
                    if (previousSibling) {
                        layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
                    }
                }
            }

            function secondWalk(node, x) {
                node.x = node._tree.prelim + x;
                var children = node.children;
                if (children && (n = children.length)) {
                    var i = -1, n;
                    x += node._tree.mod;
                    while (++i < n) {
                        secondWalk(children[i], x);
                    }
                }
            }

            function apportion(node, previousSibling, ancestor) {
                if (previousSibling) {
                    var vip = node, vop = node, vim = previousSibling, vom = node.parent.children[0], sip = vip._tree.mod, sop = vop._tree.mod, sim = vim._tree.mod, som = vom._tree.mod, shift;
                    while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
                        vom = d3_layout_treeLeft(vom);
                        vop = d3_layout_treeRight(vop);
                        vop._tree.ancestor = node;
                        shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
                        if (shift > 0) {
                            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
                            sip += shift;
                            sop += shift;
                        }
                        sim += vim._tree.mod;
                        sip += vip._tree.mod;
                        som += vom._tree.mod;
                        sop += vop._tree.mod;
                    }
                    if (vim && !d3_layout_treeRight(vop)) {
                        vop._tree.thread = vim;
                        vop._tree.mod += sim - sop;
                    }
                    if (vip && !d3_layout_treeLeft(vom)) {
                        vom._tree.thread = vip;
                        vom._tree.mod += sip - som;
                        ancestor = node;
                    }
                }
                return ancestor;
            }

            var nodes = hierarchy.call(this, d, i), root = nodes[0];
            d3_layout_treeVisitAfter(root, function (node, previousSibling) {
                node._tree = {
                    ancestor:node,
                    prelim:0,
                    mod:0,
                    change:0,
                    shift:0,
                    number:previousSibling ? previousSibling._tree.number + 1 : 0
                };
            });
            firstWalk(root);
            secondWalk(root, -root._tree.prelim);
            var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost), right = d3_layout_treeSearch(root, d3_layout_treeRightmost), deep = d3_layout_treeSearch(root, d3_layout_treeDeepest), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2, y1 = deep.depth || 1;
            d3_layout_treeVisitAfter(root, function (node) {
                node.x = (node.x - x0) / (x1 - x0) * size[0];
                node.y = node.depth / y1 * size[1];
                delete node._tree;
            });
            return nodes;
        }

        var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ];
        tree.separation = function (x) {
            if (!arguments.length) return separation;
            separation = x;
            return tree;
        };
        tree.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return tree;
        };
        return d3_layout_hierarchyRebind(tree, hierarchy);
    };
    d3.layout.treemap = function () {
        function scale(children, k) {
            var i = -1, n = children.length, child, area;
            while (++i < n) {
                area = (child = children[i]).value * (k < 0 ? 0 : k);
                child.area = isNaN(area) || area <= 0 ? 0 : area;
            }
        }

        function squarify(node) {
            var children = node.children;
            if (children && children.length) {
                var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = Math.min(rect.dx, rect.dy), n;
                scale(remaining, rect.dx * rect.dy / node.value);
                row.area = 0;
                while ((n = remaining.length) > 0) {
                    row.push(child = remaining[n - 1]);
                    row.area += child.area;
                    if ((score = worst(row, u)) <= best) {
                        remaining.pop();
                        best = score;
                    } else {
                        row.area -= row.pop().area;
                        position(row, u, rect, false);
                        u = Math.min(rect.dx, rect.dy);
                        row.length = row.area = 0;
                        best = Infinity;
                    }
                }
                if (row.length) {
                    position(row, u, rect, true);
                    row.length = row.area = 0;
                }
                children.forEach(squarify);
            }
        }

        function stickify(node) {
            var children = node.children;
            if (children && children.length) {
                var rect = pad(node), remaining = children.slice(), child, row = [];
                scale(remaining, rect.dx * rect.dy / node.value);
                row.area = 0;
                while (child = remaining.pop()) {
                    row.push(child);
                    row.area += child.area;
                    if (child.z != null) {
                        position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
                        row.length = row.area = 0;
                    }
                }
                children.forEach(stickify);
            }
        }

        function worst(row, u) {
            var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
            while (++i < n) {
                if (!(r = row[i].area)) continue;
                if (r < rmin) rmin = r;
                if (r > rmax) rmax = r;
            }
            s *= s;
            u *= u;
            return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
        }

        function position(row, u, rect, flush) {
            var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
            if (u == rect.dx) {
                if (flush || v > rect.dy) v = rect.dy;
                while (++i < n) {
                    o = row[i];
                    o.x = x;
                    o.y = y;
                    o.dy = v;
                    x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
                }
                o.z = true;
                o.dx += rect.x + rect.dx - x;
                rect.y += v;
                rect.dy -= v;
            } else {
                if (flush || v > rect.dx) v = rect.dx;
                while (++i < n) {
                    o = row[i];
                    o.x = x;
                    o.y = y;
                    o.dx = v;
                    y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
                }
                o.z = false;
                o.dy += rect.y + rect.dy - y;
                rect.x += v;
                rect.dx -= v;
            }
        }

        function treemap(d) {
            var nodes = stickies || hierarchy(d), root = nodes[0];
            root.x = 0;
            root.y = 0;
            root.dx = size[0];
            root.dy = size[1];
            if (stickies) hierarchy.revalue(root);
            scale([ root ], root.dx * root.dy / root.value);
            (stickies ? stickify : squarify)(root);
            if (sticky) stickies = nodes;
            return nodes;
        }

        var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, ratio = .5 * (1 + Math.sqrt(5));
        treemap.size = function (x) {
            if (!arguments.length) return size;
            size = x;
            return treemap;
        };
        treemap.padding = function (x) {
            function padFunction(node) {
                var p = x.call(treemap, node, node.depth);
                return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
            }

            function padConstant(node) {
                return d3_layout_treemapPad(node, x);
            }

            if (!arguments.length) return padding;
            var type;
            pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], padConstant) : padConstant;
            return treemap;
        };
        treemap.round = function (x) {
            if (!arguments.length) return round != Number;
            round = x ? Math.round : Number;
            return treemap;
        };
        treemap.sticky = function (x) {
            if (!arguments.length) return sticky;
            sticky = x;
            stickies = null;
            return treemap;
        };
        treemap.ratio = function (x) {
            if (!arguments.length) return ratio;
            ratio = x;
            return treemap;
        };
        return d3_layout_hierarchyRebind(treemap, hierarchy);
    };
    d3.csv = d3_dsv(",", "text/csv");
    d3.tsv = d3_dsv("	", "text/tab-separated-values");
    d3.geo = {};
    var d3_geo_radians = Math.PI / 180;
    d3.geo.azimuthal = function () {
        function azimuthal(coordinates) {
            var x1 = coordinates[0] * d3_geo_radians - x0, y1 = coordinates[1] * d3_geo_radians, cx1 = Math.cos(x1), sx1 = Math.sin(x1), cy1 = Math.cos(y1), sy1 = Math.sin(y1), cc = mode !== "orthographic" ? sy0 * sy1 + cy0 * cy1 * cx1 : null, c, k = mode === "stereographic" ? 1 / (1 + cc) : mode === "gnomonic" ? 1 / cc : mode === "equidistant" ? (c = Math.acos(cc), c ? c / Math.sin(c) : 0) : mode === "equalarea" ? Math.sqrt(2 / (1 + cc)) : 1, x = k * cy1 * sx1, y = k * (sy0 * cy1 * cx1 - cy0 * sy1);
            return [ scale * x + translate[0], scale * y + translate[1] ];
        }

        var mode = "orthographic", origin, scale = 200, translate = [ 480, 250 ], x0, y0, cy0, sy0;
        azimuthal.invert = function (coordinates) {
            var x = (coordinates[0] - translate[0]) / scale, y = (coordinates[1] - translate[1]) / scale, p = Math.sqrt(x * x + y * y), c = mode === "stereographic" ? 2 * Math.atan(p) : mode === "gnomonic" ? Math.atan(p) : mode === "equidistant" ? p : mode === "equalarea" ? 2 * Math.asin(.5 * p) : Math.asin(p), sc = Math.sin(c), cc = Math.cos(c);
            return [ (x0 + Math.atan2(x * sc, p * cy0 * cc + y * sy0 * sc)) / d3_geo_radians, Math.asin(cc * sy0 - (p ? y * sc * cy0 / p : 0)) / d3_geo_radians ];
        };
        azimuthal.mode = function (x) {
            if (!arguments.length) return mode;
            mode = x + "";
            return azimuthal;
        };
        azimuthal.origin = function (x) {
            if (!arguments.length) return origin;
            origin = x;
            x0 = origin[0] * d3_geo_radians;
            y0 = origin[1] * d3_geo_radians;
            cy0 = Math.cos(y0);
            sy0 = Math.sin(y0);
            return azimuthal;
        };
        azimuthal.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return azimuthal;
        };
        azimuthal.translate = function (x) {
            if (!arguments.length) return translate;
            translate = [ +x[0], +x[1] ];
            return azimuthal;
        };
        return azimuthal.origin([ 0, 0 ]);
    };
    d3.geo.albers = function () {
        function albers(coordinates) {
            var t = n * (d3_geo_radians * coordinates[0] - lng0), p = Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n;
            return [ scale * p * Math.sin(t) + translate[0], scale * (p * Math.cos(t) - p0) + translate[1] ];
        }

        function reload() {
            var phi1 = d3_geo_radians * parallels[0], phi2 = d3_geo_radians * parallels[1], lat0 = d3_geo_radians * origin[1], s = Math.sin(phi1), c = Math.cos(phi1);
            lng0 = d3_geo_radians * origin[0];
            n = .5 * (s + Math.sin(phi2));
            C = c * c + 2 * n * s;
            p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
            return albers;
        }

        var origin = [ -98, 38 ], parallels = [ 29.5, 45.5 ], scale = 1e3, translate = [ 480, 250 ], lng0, n, C, p0;
        albers.invert = function (coordinates) {
            var x = (coordinates[0] - translate[0]) / scale, y = (coordinates[1] - translate[1]) / scale, p0y = p0 + y, t = Math.atan2(x, p0y), p = Math.sqrt(x * x + p0y * p0y);
            return [ (lng0 + t / n) / d3_geo_radians, Math.asin((C - p * p * n * n) / (2 * n)) / d3_geo_radians ];
        };
        albers.origin = function (x) {
            if (!arguments.length) return origin;
            origin = [ +x[0], +x[1] ];
            return reload();
        };
        albers.parallels = function (x) {
            if (!arguments.length) return parallels;
            parallels = [ +x[0], +x[1] ];
            return reload();
        };
        albers.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return albers;
        };
        albers.translate = function (x) {
            if (!arguments.length) return translate;
            translate = [ +x[0], +x[1] ];
            return albers;
        };
        return reload();
    };
    d3.geo.albersUsa = function () {
        function albersUsa(coordinates) {
            var lon = coordinates[0], lat = coordinates[1];
            return (lat > 50 ? alaska : lon < -140 ? hawaii : lat < 21 ? puertoRico : lower48)(coordinates);
        }

        var lower48 = d3.geo.albers();
        var alaska = d3.geo.albers().origin([ -160, 60 ]).parallels([ 55, 65 ]);
        var hawaii = d3.geo.albers().origin([ -160, 20 ]).parallels([ 8, 18 ]);
        var puertoRico = d3.geo.albers().origin([ -60, 10 ]).parallels([ 8, 18 ]);
        albersUsa.scale = function (x) {
            if (!arguments.length) return lower48.scale();
            lower48.scale(x);
            alaska.scale(x * .6);
            hawaii.scale(x);
            puertoRico.scale(x * 1.5);
            return albersUsa.translate(lower48.translate());
        };
        albersUsa.translate = function (x) {
            if (!arguments.length) return lower48.translate();
            var dz = lower48.scale() / 1e3, dx = x[0], dy = x[1];
            lower48.translate(x);
            alaska.translate([ dx - 400 * dz, dy + 170 * dz ]);
            hawaii.translate([ dx - 190 * dz, dy + 200 * dz ]);
            puertoRico.translate([ dx + 580 * dz, dy + 430 * dz ]);
            return albersUsa;
        };
        return albersUsa.scale(lower48.scale());
    };
    d3.geo.bonne = function () {
        function bonne(coordinates) {
            var x = coordinates[0] * d3_geo_radians - x0, y = coordinates[1] * d3_geo_radians - y0;
            if (y1) {
                var p = c1 + y1 - y, E = x * Math.cos(y) / p;
                x = p * Math.sin(E);
                y = p * Math.cos(E) - c1;
            } else {
                x *= Math.cos(y);
                y *= -1;
            }
            return [ scale * x + translate[0], scale * y + translate[1] ];
        }

        var scale = 200, translate = [ 480, 250 ], x0, y0, y1, c1;
        bonne.invert = function (coordinates) {
            var x = (coordinates[0] - translate[0]) / scale, y = (coordinates[1] - translate[1]) / scale;
            if (y1) {
                var c = c1 + y, p = Math.sqrt(x * x + c * c);
                y = c1 + y1 - p;
                x = x0 + p * Math.atan2(x, c) / Math.cos(y);
            } else {
                y *= -1;
                x /= Math.cos(y);
            }
            return [ x / d3_geo_radians, y / d3_geo_radians ];
        };
        bonne.parallel = function (x) {
            if (!arguments.length) return y1 / d3_geo_radians;
            c1 = 1 / Math.tan(y1 = x * d3_geo_radians);
            return bonne;
        };
        bonne.origin = function (x) {
            if (!arguments.length) return [ x0 / d3_geo_radians, y0 / d3_geo_radians ];
            x0 = x[0] * d3_geo_radians;
            y0 = x[1] * d3_geo_radians;
            return bonne;
        };
        bonne.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return bonne;
        };
        bonne.translate = function (x) {
            if (!arguments.length) return translate;
            translate = [ +x[0], +x[1] ];
            return bonne;
        };
        return bonne.origin([ 0, 0 ]).parallel(45);
    };
    d3.geo.equirectangular = function () {
        function equirectangular(coordinates) {
            var x = coordinates[0] / 360, y = -coordinates[1] / 360;
            return [ scale * x + translate[0], scale * y + translate[1] ];
        }

        var scale = 500, translate = [ 480, 250 ];
        equirectangular.invert = function (coordinates) {
            var x = (coordinates[0] - translate[0]) / scale, y = (coordinates[1] - translate[1]) / scale;
            return [ 360 * x, -360 * y ];
        };
        equirectangular.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return equirectangular;
        };
        equirectangular.translate = function (x) {
            if (!arguments.length) return translate;
            translate = [ +x[0], +x[1] ];
            return equirectangular;
        };
        return equirectangular;
    };
    d3.geo.mercator = function () {
        function mercator(coordinates) {
            var x = coordinates[0] / 360, y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
            return [ scale * x + translate[0], scale * Math.max(-.5, Math.min(.5, y)) + translate[1] ];
        }

        var scale = 500, translate = [ 480, 250 ];
        mercator.invert = function (coordinates) {
            var x = (coordinates[0] - translate[0]) / scale, y = (coordinates[1] - translate[1]) / scale;
            return [ 360 * x, 2 * Math.atan(Math.exp(-360 * y * d3_geo_radians)) / d3_geo_radians - 90 ];
        };
        mercator.scale = function (x) {
            if (!arguments.length) return scale;
            scale = +x;
            return mercator;
        };
        mercator.translate = function (x) {
            if (!arguments.length) return translate;
            translate = [ +x[0], +x[1] ];
            return mercator;
        };
        return mercator;
    };
    d3.geo.path = function () {
        function path(d, i) {
            if (typeof pointRadius === "function") pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
            pathType(d);
            var result = buffer.length ? buffer.join("") : null;
            buffer = [];
            return result;
        }

        function project(coordinates) {
            return projection(coordinates).join(",");
        }

        function polygonArea(coordinates) {
            var sum = area(coordinates[0]), i = 0, n = coordinates.length;
            while (++i < n) sum -= area(coordinates[i]);
            return sum;
        }

        function polygonCentroid(coordinates) {
            var polygon = d3.geom.polygon(coordinates[0].map(projection)), area = polygon.area(), centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1), x = centroid[0], y = centroid[1], z = area, i = 0, n = coordinates.length;
            while (++i < n) {
                polygon = d3.geom.polygon(coordinates[i].map(projection));
                area = polygon.area();
                centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
                x -= centroid[0];
                y -= centroid[1];
                z -= area;
            }
            return [ x, y, 6 * z ];
        }

        function area(coordinates) {
            return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
        }

        var pointRadius = 4.5, pointCircle = d3_path_circle(pointRadius), projection = d3.geo.albersUsa(), buffer = [];
        var pathType = d3_geo_type({
            FeatureCollection:function (o) {
                var features = o.features, i = -1, n = features.length;
                while (++i < n) buffer.push(pathType(features[i].geometry));
            },
            Feature:function (o) {
                pathType(o.geometry);
            },
            Point:function (o) {
                buffer.push("M", project(o.coordinates), pointCircle);
            },
            MultiPoint:function (o) {
                var coordinates = o.coordinates, i = -1, n = coordinates.length;
                while (++i < n) buffer.push("M", project(coordinates[i]), pointCircle);
            },
            LineString:function (o) {
                var coordinates = o.coordinates, i = -1, n = coordinates.length;
                buffer.push("M");
                while (++i < n) buffer.push(project(coordinates[i]), "L");
                buffer.pop();
            },
            MultiLineString:function (o) {
                var coordinates = o.coordinates, i = -1, n = coordinates.length, subcoordinates, j, m;
                while (++i < n) {
                    subcoordinates = coordinates[i];
                    j = -1;
                    m = subcoordinates.length;
                    buffer.push("M");
                    while (++j < m) buffer.push(project(subcoordinates[j]), "L");
                    buffer.pop();
                }
            },
            Polygon:function (o) {
                var coordinates = o.coordinates, i = -1, n = coordinates.length, subcoordinates, j, m;
                while (++i < n) {
                    subcoordinates = coordinates[i];
                    j = -1;
                    if ((m = subcoordinates.length - 1) > 0) {
                        buffer.push("M");
                        while (++j < m) buffer.push(project(subcoordinates[j]), "L");
                        buffer[buffer.length - 1] = "Z";
                    }
                }
            },
            MultiPolygon:function (o) {
                var coordinates = o.coordinates, i = -1, n = coordinates.length, subcoordinates, j, m, subsubcoordinates, k, p;
                while (++i < n) {
                    subcoordinates = coordinates[i];
                    j = -1;
                    m = subcoordinates.length;
                    while (++j < m) {
                        subsubcoordinates = subcoordinates[j];
                        k = -1;
                        if ((p = subsubcoordinates.length - 1) > 0) {
                            buffer.push("M");
                            while (++k < p) buffer.push(project(subsubcoordinates[k]), "L");
                            buffer[buffer.length - 1] = "Z";
                        }
                    }
                }
            },
            GeometryCollection:function (o) {
                var geometries = o.geometries, i = -1, n = geometries.length;
                while (++i < n) buffer.push(pathType(geometries[i]));
            }
        });
        var areaType = path.area = d3_geo_type({
            FeatureCollection:function (o) {
                var area = 0, features = o.features, i = -1, n = features.length;
                while (++i < n) area += areaType(features[i]);
                return area;
            },
            Feature:function (o) {
                return areaType(o.geometry);
            },
            Polygon:function (o) {
                return polygonArea(o.coordinates);
            },
            MultiPolygon:function (o) {
                var sum = 0, coordinates = o.coordinates, i = -1, n = coordinates.length;
                while (++i < n) sum += polygonArea(coordinates[i]);
                return sum;
            },
            GeometryCollection:function (o) {
                var sum = 0, geometries = o.geometries, i = -1, n = geometries.length;
                while (++i < n) sum += areaType(geometries[i]);
                return sum;
            }
        }, 0);
        var centroidType = path.centroid = d3_geo_type({
            Feature:function (o) {
                return centroidType(o.geometry);
            },
            Polygon:function (o) {
                var centroid = polygonCentroid(o.coordinates);
                return [ centroid[0] / centroid[2], centroid[1] / centroid[2] ];
            },
            MultiPolygon:function (o) {
                var area = 0, coordinates = o.coordinates, centroid, x = 0, y = 0, z = 0, i = -1, n = coordinates.length;
                while (++i < n) {
                    centroid = polygonCentroid(coordinates[i]);
                    x += centroid[0];
                    y += centroid[1];
                    z += centroid[2];
                }
                return [ x / z, y / z ];
            }
        });
        path.projection = function (x) {
            projection = x;
            return path;
        };
        path.pointRadius = function (x) {
            if (typeof x === "function") pointRadius = x; else {
                pointRadius = +x;
                pointCircle = d3_path_circle(pointRadius);
            }
            return path;
        };
        return path;
    };
    d3.geo.bounds = function (feature) {
        var left = Infinity, bottom = Infinity, right = -Infinity, top = -Infinity;
        d3_geo_bounds(feature, function (x, y) {
            if (x < left) left = x;
            if (x > right) right = x;
            if (y < bottom) bottom = y;
            if (y > top) top = y;
        });
        return [
            [ left, bottom ],
            [ right, top ]
        ];
    };
    var d3_geo_boundsTypes = {
        Feature:d3_geo_boundsFeature,
        FeatureCollection:d3_geo_boundsFeatureCollection,
        GeometryCollection:d3_geo_boundsGeometryCollection,
        LineString:d3_geo_boundsLineString,
        MultiLineString:d3_geo_boundsMultiLineString,
        MultiPoint:d3_geo_boundsLineString,
        MultiPolygon:d3_geo_boundsMultiPolygon,
        Point:d3_geo_boundsPoint,
        Polygon:d3_geo_boundsPolygon
    };
    d3.geo.circle = function () {
        function circle() {
        }

        function visible(point) {
            return arc.distance(point) < radians;
        }

        function clip(coordinates) {
            var i = -1, n = coordinates.length, clipped = [], p0, p1, p2, d0, d1;
            while (++i < n) {
                d1 = arc.distance(p2 = coordinates[i]);
                if (d1 < radians) {
                    if (p1) clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
                    clipped.push(p2);
                    p0 = p1 = null;
                } else {
                    p1 = p2;
                    if (!p0 && clipped.length) {
                        clipped.push(d3_geo_greatArcInterpolate(clipped[clipped.length - 1], p1)((radians - d0) / (d1 - d0)));
                        p0 = p1;
                    }
                }
                d0 = d1;
            }
            p0 = coordinates[0];
            p1 = clipped[0];
            if (p1 && p2[0] === p0[0] && p2[1] === p0[1] && !(p2[0] === p1[0] && p2[1] === p1[1])) {
                clipped.push(p1);
            }
            return resample(clipped);
        }

        function resample(coordinates) {
            var i = 0, n = coordinates.length, j, m, resampled = n ? [ coordinates[0] ] : coordinates, resamples, origin = arc.source();
            while (++i < n) {
                resamples = arc.source(coordinates[i - 1])(coordinates[i]).coordinates;
                for (j = 0, m = resamples.length; ++j < m;) resampled.push(resamples[j]);
            }
            arc.source(origin);
            return resampled;
        }

        var origin = [ 0, 0 ], degrees = 90 - .01, radians = degrees * d3_geo_radians, arc = d3.geo.greatArc().source(origin).target(d3_identity);
        circle.clip = function (d) {
            if (typeof origin === "function") arc.source(origin.apply(this, arguments));
            return clipType(d) || null;
        };
        var clipType = d3_geo_type({
            FeatureCollection:function (o) {
                var features = o.features.map(clipType).filter(d3_identity);
                return features && (o = Object.create(o), o.features = features, o);
            },
            Feature:function (o) {
                var geometry = clipType(o.geometry);
                return geometry && (o = Object.create(o), o.geometry = geometry, o);
            },
            Point:function (o) {
                return visible(o.coordinates) && o;
            },
            MultiPoint:function (o) {
                var coordinates = o.coordinates.filter(visible);
                return coordinates.length && {
                    type:o.type,
                    coordinates:coordinates
                };
            },
            LineString:function (o) {
                var coordinates = clip(o.coordinates);
                return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
            },
            MultiLineString:function (o) {
                var coordinates = o.coordinates.map(clip).filter(function (d) {
                    return d.length;
                });
                return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
            },
            Polygon:function (o) {
                var coordinates = o.coordinates.map(clip);
                return coordinates[0].length && (o = Object.create(o), o.coordinates = coordinates, o);
            },
            MultiPolygon:function (o) {
                var coordinates = o.coordinates.map(function (d) {
                    return d.map(clip);
                }).filter(function (d) {
                        return d[0].length;
                    });
                return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
            },
            GeometryCollection:function (o) {
                var geometries = o.geometries.map(clipType).filter(d3_identity);
                return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
            }
        });
        circle.origin = function (x) {
            if (!arguments.length) return origin;
            origin = x;
            if (typeof origin !== "function") arc.source(origin);
            return circle;
        };
        circle.angle = function (x) {
            if (!arguments.length) return degrees;
            radians = (degrees = +x) * d3_geo_radians;
            return circle;
        };
        return d3.rebind(circle, arc, "precision");
    };
    d3.geo.greatArc = function () {
        function greatArc() {
            var d = greatArc.distance.apply(this, arguments), t = 0, dt = precision / d, coordinates = [ p0 ];
            while ((t += dt) < 1) coordinates.push(interpolate(t));
            coordinates.push(p1);
            return {
                type:"LineString",
                coordinates:coordinates
            };
        }

        var source = d3_geo_greatArcSource, p0, target = d3_geo_greatArcTarget, p1, precision = 6 * d3_geo_radians, interpolate = d3_geo_greatArcInterpolator();
        greatArc.distance = function () {
            if (typeof source === "function") interpolate.source(p0 = source.apply(this, arguments));
            if (typeof target === "function") interpolate.target(p1 = target.apply(this, arguments));
            return interpolate.distance();
        };
        greatArc.source = function (_) {
            if (!arguments.length) return source;
            source = _;
            if (typeof source !== "function") interpolate.source(p0 = source);
            return greatArc;
        };
        greatArc.target = function (_) {
            if (!arguments.length) return target;
            target = _;
            if (typeof target !== "function") interpolate.target(p1 = target);
            return greatArc;
        };
        greatArc.precision = function (_) {
            if (!arguments.length) return precision / d3_geo_radians;
            precision = _ * d3_geo_radians;
            return greatArc;
        };
        return greatArc;
    };
    d3.geo.greatCircle = d3.geo.circle;
    d3.geom = {};
    d3.geom.contour = function (grid, start) {
        var s = start || d3_geom_contourStart(grid), c = [], x = s[0], y = s[1], dx = 0, dy = 0, pdx = NaN, pdy = NaN, i = 0;
        do {
            i = 0;
            if (grid(x - 1, y - 1)) i += 1;
            if (grid(x, y - 1)) i += 2;
            if (grid(x - 1, y)) i += 4;
            if (grid(x, y)) i += 8;
            if (i === 6) {
                dx = pdy === -1 ? -1 : 1;
                dy = 0;
            } else if (i === 9) {
                dx = 0;
                dy = pdx === 1 ? -1 : 1;
            } else {
                dx = d3_geom_contourDx[i];
                dy = d3_geom_contourDy[i];
            }
            if (dx != pdx && dy != pdy) {
                c.push([ x, y ]);
                pdx = dx;
                pdy = dy;
            }
            x += dx;
            y += dy;
        } while (s[0] != x || s[1] != y);
        return c;
    };
    var d3_geom_contourDx = [ 1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN ], d3_geom_contourDy = [ 0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN ];
    d3.geom.hull = function (vertices) {
        if (vertices.length < 3) return [];
        var len = vertices.length, plen = len - 1, points = [], stack = [], i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;
        for (i = 1; i < len; ++i) {
            if (vertices[i][1] < vertices[h][1]) {
                h = i;
            } else if (vertices[i][1] == vertices[h][1]) {
                h = vertices[i][0] < vertices[h][0] ? i : h;
            }
        }
        for (i = 0; i < len; ++i) {
            if (i === h) continue;
            y1 = vertices[i][1] - vertices[h][1];
            x1 = vertices[i][0] - vertices[h][0];
            points.push({
                angle:Math.atan2(y1, x1),
                index:i
            });
        }
        points.sort(function (a, b) {
            return a.angle - b.angle;
        });
        a = points[0].angle;
        v = points[0].index;
        u = 0;
        for (i = 1; i < plen; ++i) {
            j = points[i].index;
            if (a == points[i].angle) {
                x1 = vertices[v][0] - vertices[h][0];
                y1 = vertices[v][1] - vertices[h][1];
                x2 = vertices[j][0] - vertices[h][0];
                y2 = vertices[j][1] - vertices[h][1];
                if (x1 * x1 + y1 * y1 >= x2 * x2 + y2 * y2) {
                    points[i].index = -1;
                } else {
                    points[u].index = -1;
                    a = points[i].angle;
                    u = i;
                    v = j;
                }
            } else {
                a = points[i].angle;
                u = i;
                v = j;
            }
        }
        stack.push(h);
        for (i = 0, j = 0; i < 2; ++j) {
            if (points[j].index !== -1) {
                stack.push(points[j].index);
                i++;
            }
        }
        sp = stack.length;
        for (; j < plen; ++j) {
            if (points[j].index === -1) continue;
            while (!d3_geom_hullCCW(stack[sp - 2], stack[sp - 1], points[j].index, vertices)) {
                --sp;
            }
            stack[sp++] = points[j].index;
        }
        var poly = [];
        for (i = 0; i < sp; ++i) {
            poly.push(vertices[stack[i]]);
        }
        return poly;
    };
    d3.geom.polygon = function (coordinates) {
        coordinates.area = function () {
            var i = 0, n = coordinates.length, a = coordinates[n - 1][0] * coordinates[0][1], b = coordinates[n - 1][1] * coordinates[0][0];
            while (++i < n) {
                a += coordinates[i - 1][0] * coordinates[i][1];
                b += coordinates[i - 1][1] * coordinates[i][0];
            }
            return (b - a) * .5;
        };
        coordinates.centroid = function (k) {
            var i = -1, n = coordinates.length, x = 0, y = 0, a, b = coordinates[n - 1], c;
            if (!arguments.length) k = -1 / (6 * coordinates.area());
            while (++i < n) {
                a = b;
                b = coordinates[i];
                c = a[0] * b[1] - b[0] * a[1];
                x += (a[0] + b[0]) * c;
                y += (a[1] + b[1]) * c;
            }
            return [ x * k, y * k ];
        };
        coordinates.clip = function (subject) {
            var input, i = -1, n = coordinates.length, j, m, a = coordinates[n - 1], b, c, d;
            while (++i < n) {
                input = subject.slice();
                subject.length = 0;
                b = coordinates[i];
                c = input[(m = input.length) - 1];
                j = -1;
                while (++j < m) {
                    d = input[j];
                    if (d3_geom_polygonInside(d, a, b)) {
                        if (!d3_geom_polygonInside(c, a, b)) {
                            subject.push(d3_geom_polygonIntersect(c, d, a, b));
                        }
                        subject.push(d);
                    } else if (d3_geom_polygonInside(c, a, b)) {
                        subject.push(d3_geom_polygonIntersect(c, d, a, b));
                    }
                    c = d;
                }
                a = b;
            }
            return subject;
        };
        return coordinates;
    };
    d3.geom.voronoi = function (vertices) {
        var polygons = vertices.map(function () {
            return [];
        });
        d3_voronoi_tessellate(vertices, function (e) {
            var s1, s2, x1, x2, y1, y2;
            if (e.a === 1 && e.b >= 0) {
                s1 = e.ep.r;
                s2 = e.ep.l;
            } else {
                s1 = e.ep.l;
                s2 = e.ep.r;
            }
            if (e.a === 1) {
                y1 = s1 ? s1.y : -1e6;
                x1 = e.c - e.b * y1;
                y2 = s2 ? s2.y : 1e6;
                x2 = e.c - e.b * y2;
            } else {
                x1 = s1 ? s1.x : -1e6;
                y1 = e.c - e.a * x1;
                x2 = s2 ? s2.x : 1e6;
                y2 = e.c - e.a * x2;
            }
            var v1 = [ x1, y1 ], v2 = [ x2, y2 ];
            polygons[e.region.l.index].push(v1, v2);
            polygons[e.region.r.index].push(v1, v2);
        });
        return polygons.map(function (polygon, i) {
            var cx = vertices[i][0], cy = vertices[i][1];
            polygon.forEach(function (v) {
                v.angle = Math.atan2(v[0] - cx, v[1] - cy);
            });
            return polygon.sort(function (a, b) {
                return a.angle - b.angle;
            }).filter(function (d, i) {
                    return !i || d.angle - polygon[i - 1].angle > 1e-10;
                });
        });
    };
    var d3_voronoi_opposite = {
        l:"r",
        r:"l"
    };
    d3.geom.delaunay = function (vertices) {
        var edges = vertices.map(function () {
            return [];
        }), triangles = [];
        d3_voronoi_tessellate(vertices, function (e) {
            edges[e.region.l.index].push(vertices[e.region.r.index]);
        });
        edges.forEach(function (edge, i) {
            var v = vertices[i], cx = v[0], cy = v[1];
            edge.forEach(function (v) {
                v.angle = Math.atan2(v[0] - cx, v[1] - cy);
            });
            edge.sort(function (a, b) {
                return a.angle - b.angle;
            });
            for (var j = 0, m = edge.length - 1; j < m; j++) {
                triangles.push([ v, edge[j], edge[j + 1] ]);
            }
        });
        return triangles;
    };
    d3.geom.quadtree = function (points, x1, y1, x2, y2) {
        function insert(n, p, x1, y1, x2, y2) {
            if (isNaN(p.x) || isNaN(p.y)) return;
            if (n.leaf) {
                var v = n.point;
                if (v) {
                    if (Math.abs(v.x - p.x) + Math.abs(v.y - p.y) < .01) {
                        insertChild(n, p, x1, y1, x2, y2);
                    } else {
                        n.point = null;
                        insertChild(n, v, x1, y1, x2, y2);
                        insertChild(n, p, x1, y1, x2, y2);
                    }
                } else {
                    n.point = p;
                }
            } else {
                insertChild(n, p, x1, y1, x2, y2);
            }
        }

        function insertChild(n, p, x1, y1, x2, y2) {
            var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, right = p.x >= sx, bottom = p.y >= sy, i = (bottom << 1) + right;
            n.leaf = false;
            n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
            if (right) x1 = sx; else x2 = sx;
            if (bottom) y1 = sy; else y2 = sy;
            insert(n, p, x1, y1, x2, y2);
        }

        var p, i = -1, n = points.length;
        if (n && isNaN(points[0].x)) points = points.map(d3_geom_quadtreePoint);
        if (arguments.length < 5) {
            if (arguments.length === 3) {
                y2 = x2 = y1;
                y1 = x1;
            } else {
                x1 = y1 = Infinity;
                x2 = y2 = -Infinity;
                while (++i < n) {
                    p = points[i];
                    if (p.x < x1) x1 = p.x;
                    if (p.y < y1) y1 = p.y;
                    if (p.x > x2) x2 = p.x;
                    if (p.y > y2) y2 = p.y;
                }
                var dx = x2 - x1, dy = y2 - y1;
                if (dx > dy) y2 = y1 + dx; else x2 = x1 + dy;
            }
        }
        var root = d3_geom_quadtreeNode();
        root.add = function (p) {
            insert(root, p, x1, y1, x2, y2);
        };
        root.visit = function (f) {
            d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
        };
        points.forEach(root.add);
        return root;
    };
    d3.time = {};
    var d3_time = Date, d3_time_daySymbols = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    d3_time_utc.prototype = {
        getDate:function () {
            return this._.getUTCDate();
        },
        getDay:function () {
            return this._.getUTCDay();
        },
        getFullYear:function () {
            return this._.getUTCFullYear();
        },
        getHours:function () {
            return this._.getUTCHours();
        },
        getMilliseconds:function () {
            return this._.getUTCMilliseconds();
        },
        getMinutes:function () {
            return this._.getUTCMinutes();
        },
        getMonth:function () {
            return this._.getUTCMonth();
        },
        getSeconds:function () {
            return this._.getUTCSeconds();
        },
        getTime:function () {
            return this._.getTime();
        },
        getTimezoneOffset:function () {
            return 0;
        },
        valueOf:function () {
            return this._.valueOf();
        },
        setDate:function () {
            d3_time_prototype.setUTCDate.apply(this._, arguments);
        },
        setDay:function () {
            d3_time_prototype.setUTCDay.apply(this._, arguments);
        },
        setFullYear:function () {
            d3_time_prototype.setUTCFullYear.apply(this._, arguments);
        },
        setHours:function () {
            d3_time_prototype.setUTCHours.apply(this._, arguments);
        },
        setMilliseconds:function () {
            d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
        },
        setMinutes:function () {
            d3_time_prototype.setUTCMinutes.apply(this._, arguments);
        },
        setMonth:function () {
            d3_time_prototype.setUTCMonth.apply(this._, arguments);
        },
        setSeconds:function () {
            d3_time_prototype.setUTCSeconds.apply(this._, arguments);
        },
        setTime:function () {
            d3_time_prototype.setTime.apply(this._, arguments);
        }
    };
    var d3_time_prototype = Date.prototype;
    var d3_time_formatDateTime = "%a %b %e %H:%M:%S %Y", d3_time_formatDate = "%m/%d/%y", d3_time_formatTime = "%H:%M:%S";
    var d3_time_days = d3_time_daySymbols, d3_time_dayAbbreviations = d3_time_days.map(d3_time_formatAbbreviate), d3_time_months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], d3_time_monthAbbreviations = d3_time_months.map(d3_time_formatAbbreviate);
    d3.time.format = function (template) {
        function format(date) {
            var string = [], i = -1, j = 0, c, f;
            while (++i < n) {
                if (template.charCodeAt(i) == 37) {
                    string.push(template.substring(j, i), (f = d3_time_formats[c = template.charAt(++i)]) ? f(date) : c);
                    j = i + 1;
                }
            }
            string.push(template.substring(j, i));
            return string.join("");
        }

        var n = template.length;
        format.parse = function (string) {
            var d = {
                y:1900,
                m:0,
                d:1,
                H:0,
                M:0,
                S:0,
                L:0
            }, i = d3_time_parse(d, template, string, 0);
            if (i != string.length) return null;
            if ("p" in d) d.H = d.H % 12 + d.p * 12;
            var date = new d3_time;
            date.setFullYear(d.y, d.m, d.d);
            date.setHours(d.H, d.M, d.S, d.L);
            return date;
        };
        format.toString = function () {
            return template;
        };
        return format;
    };
    var d3_time_zfill2 = d3.format("02d"), d3_time_zfill3 = d3.format("03d"), d3_time_zfill4 = d3.format("04d"), d3_time_sfill2 = d3.format("2d");
    var d3_time_dayRe = d3_time_formatRe(d3_time_days), d3_time_dayAbbrevRe = d3_time_formatRe(d3_time_dayAbbreviations), d3_time_monthRe = d3_time_formatRe(d3_time_months), d3_time_monthLookup = d3_time_formatLookup(d3_time_months), d3_time_monthAbbrevRe = d3_time_formatRe(d3_time_monthAbbreviations), d3_time_monthAbbrevLookup = d3_time_formatLookup(d3_time_monthAbbreviations);
    var d3_time_formats = {
        a:function (d) {
            return d3_time_dayAbbreviations[d.getDay()];
        },
        A:function (d) {
            return d3_time_days[d.getDay()];
        },
        b:function (d) {
            return d3_time_monthAbbreviations[d.getMonth()];
        },
        B:function (d) {
            return d3_time_months[d.getMonth()];
        },
        c:d3.time.format(d3_time_formatDateTime),
        d:function (d) {
            return d3_time_zfill2(d.getDate());
        },
        e:function (d) {
            return d3_time_sfill2(d.getDate());
        },
        H:function (d) {
            return d3_time_zfill2(d.getHours());
        },
        I:function (d) {
            return d3_time_zfill2(d.getHours() % 12 || 12);
        },
        j:function (d) {
            return d3_time_zfill3(1 + d3.time.dayOfYear(d));
        },
        L:function (d) {
            return d3_time_zfill3(d.getMilliseconds());
        },
        m:function (d) {
            return d3_time_zfill2(d.getMonth() + 1);
        },
        M:function (d) {
            return d3_time_zfill2(d.getMinutes());
        },
        p:function (d) {
            return d.getHours() >= 12 ? "PM" : "AM";
        },
        S:function (d) {
            return d3_time_zfill2(d.getSeconds());
        },
        U:function (d) {
            return d3_time_zfill2(d3.time.sundayOfYear(d));
        },
        w:function (d) {
            return d.getDay();
        },
        W:function (d) {
            return d3_time_zfill2(d3.time.mondayOfYear(d));
        },
        x:d3.time.format(d3_time_formatDate),
        X:d3.time.format(d3_time_formatTime),
        y:function (d) {
            return d3_time_zfill2(d.getFullYear() % 100);
        },
        Y:function (d) {
            return d3_time_zfill4(d.getFullYear() % 1e4);
        },
        Z:d3_time_zone,
        "%":function (d) {
            return "%";
        }
    };
    var d3_time_parsers = {
        a:d3_time_parseWeekdayAbbrev,
        A:d3_time_parseWeekday,
        b:d3_time_parseMonthAbbrev,
        B:d3_time_parseMonth,
        c:d3_time_parseLocaleFull,
        d:d3_time_parseDay,
        e:d3_time_parseDay,
        H:d3_time_parseHour24,
        I:d3_time_parseHour24,
        L:d3_time_parseMilliseconds,
        m:d3_time_parseMonthNumber,
        M:d3_time_parseMinutes,
        p:d3_time_parseAmPm,
        S:d3_time_parseSeconds,
        x:d3_time_parseLocaleDate,
        X:d3_time_parseLocaleTime,
        y:d3_time_parseYear,
        Y:d3_time_parseFullYear
    };
    var d3_time_numberRe = /^\s*\d+/;
    var d3_time_amPmLookup = d3.map({
        am:0,
        pm:1
    });
    d3.time.format.utc = function (template) {
        function format(date) {
            try {
                d3_time = d3_time_utc;
                var utc = new d3_time;
                utc._ = date;
                return local(utc);
            } finally {
                d3_time = Date;
            }
        }

        var local = d3.time.format(template);
        format.parse = function (string) {
            try {
                d3_time = d3_time_utc;
                var date = local.parse(string);
                return date && date._;
            } finally {
                d3_time = Date;
            }
        };
        format.toString = local.toString;
        return format;
    };
    var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;
    d3_time_formatIsoNative.parse = function (string) {
        var date = new Date(string);
        return isNaN(date) ? null : date;
    };
    d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
    d3.time.second = d3_time_interval(function (date) {
        return new d3_time(Math.floor(date / 1e3) * 1e3);
    }, function (date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 1e3);
    }, function (date) {
        return date.getSeconds();
    });
    d3.time.seconds = d3.time.second.range;
    d3.time.seconds.utc = d3.time.second.utc.range;
    d3.time.minute = d3_time_interval(function (date) {
        return new d3_time(Math.floor(date / 6e4) * 6e4);
    }, function (date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 6e4);
    }, function (date) {
        return date.getMinutes();
    });
    d3.time.minutes = d3.time.minute.range;
    d3.time.minutes.utc = d3.time.minute.utc.range;
    d3.time.hour = d3_time_interval(function (date) {
        var timezone = date.getTimezoneOffset() / 60;
        return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
    }, function (date, offset) {
        date.setTime(date.getTime() + Math.floor(offset) * 36e5);
    }, function (date) {
        return date.getHours();
    });
    d3.time.hours = d3.time.hour.range;
    d3.time.hours.utc = d3.time.hour.utc.range;
    d3.time.day = d3_time_interval(function (date) {
        var day = new d3_time(1970, 0);
        day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        return day;
    }, function (date, offset) {
        date.setDate(date.getDate() + offset);
    }, function (date) {
        return date.getDate() - 1;
    });
    d3.time.days = d3.time.day.range;
    d3.time.days.utc = d3.time.day.utc.range;
    d3.time.dayOfYear = function (date) {
        var year = d3.time.year(date);
        return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
    };
    d3_time_daySymbols.forEach(function (day, i) {
        day = day.toLowerCase();
        i = 7 - i;
        var interval = d3.time[day] = d3_time_interval(function (date) {
            (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
            return date;
        }, function (date, offset) {
            date.setDate(date.getDate() + Math.floor(offset) * 7);
        }, function (date) {
            var day = d3.time.year(date).getDay();
            return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
        });
        d3.time[day + "s"] = interval.range;
        d3.time[day + "s"].utc = interval.utc.range;
        d3.time[day + "OfYear"] = function (date) {
            var day = d3.time.year(date).getDay();
            return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
        };
    });
    d3.time.week = d3.time.sunday;
    d3.time.weeks = d3.time.sunday.range;
    d3.time.weeks.utc = d3.time.sunday.utc.range;
    d3.time.weekOfYear = d3.time.sundayOfYear;
    d3.time.month = d3_time_interval(function (date) {
        date = d3.time.day(date);
        date.setDate(1);
        return date;
    }, function (date, offset) {
        date.setMonth(date.getMonth() + offset);
    }, function (date) {
        return date.getMonth();
    });
    d3.time.months = d3.time.month.range;
    d3.time.months.utc = d3.time.month.utc.range;
    d3.time.year = d3_time_interval(function (date) {
        date = d3.time.day(date);
        date.setMonth(0, 1);
        return date;
    }, function (date, offset) {
        date.setFullYear(date.getFullYear() + offset);
    }, function (date) {
        return date.getFullYear();
    });
    d3.time.years = d3.time.year.range;
    d3.time.years.utc = d3.time.year.utc.range;
    var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
    var d3_time_scaleLocalMethods = [
        [ d3.time.second, 1 ],
        [ d3.time.second, 5 ],
        [ d3.time.second, 15 ],
        [ d3.time.second, 30 ],
        [ d3.time.minute, 1 ],
        [ d3.time.minute, 5 ],
        [ d3.time.minute, 15 ],
        [ d3.time.minute, 30 ],
        [ d3.time.hour, 1 ],
        [ d3.time.hour, 3 ],
        [ d3.time.hour, 6 ],
        [ d3.time.hour, 12 ],
        [ d3.time.day, 1 ],
        [ d3.time.day, 2 ],
        [ d3.time.week, 1 ],
        [ d3.time.month, 1 ],
        [ d3.time.month, 3 ],
        [ d3.time.year, 1 ]
    ];
    var d3_time_scaleLocalFormats = [
        [ d3.time.format("%Y"), function (d) {
            return true;
        } ],
        [ d3.time.format("%B"), function (d) {
            return d.getMonth();
        } ],
        [ d3.time.format("%b %d"), function (d) {
            return d.getDate() != 1;
        } ],
        [ d3.time.format("%a %d"), function (d) {
            return d.getDay() && d.getDate() != 1;
        } ],
        [ d3.time.format("%I %p"), function (d) {
            return d.getHours();
        } ],
        [ d3.time.format("%I:%M"), function (d) {
            return d.getMinutes();
        } ],
        [ d3.time.format(":%S"), function (d) {
            return d.getSeconds();
        } ],
        [ d3.time.format(".%L"), function (d) {
            return d.getMilliseconds();
        } ]
    ];
    var d3_time_scaleLinear = d3.scale.linear(), d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);
    d3_time_scaleLocalMethods.year = function (extent, m) {
        return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
    };
    d3.time.scale = function () {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
    };
    var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function (m) {
        return [ m[0].utc, m[1] ];
    });
    var d3_time_scaleUTCFormats = [
        [ d3.time.format.utc("%Y"), function (d) {
            return true;
        } ],
        [ d3.time.format.utc("%B"), function (d) {
            return d.getUTCMonth();
        } ],
        [ d3.time.format.utc("%b %d"), function (d) {
            return d.getUTCDate() != 1;
        } ],
        [ d3.time.format.utc("%a %d"), function (d) {
            return d.getUTCDay() && d.getUTCDate() != 1;
        } ],
        [ d3.time.format.utc("%I %p"), function (d) {
            return d.getUTCHours();
        } ],
        [ d3.time.format.utc("%I:%M"), function (d) {
            return d.getUTCMinutes();
        } ],
        [ d3.time.format.utc(":%S"), function (d) {
            return d.getUTCSeconds();
        } ],
        [ d3.time.format.utc(".%L"), function (d) {
            return d.getUTCMilliseconds();
        } ]
    ];
    var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);
    d3_time_scaleUTCMethods.year = function (extent, m) {
        return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
    };
    d3.time.scale.utc = function () {
        return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
    };
})();/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-chart.js
 *  Description: D3 chart를 jQuery 플러그인 형태로 사용 할 수 있고, 반응형 웹에 맞는 화면을 보여주도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define("FeaturedChart", [ "jquery", "d3" ], function ($, d3) {
            return factory($, root, doc, d3);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc, root.d3);
    }
}(this, document, function ($, window, document, d3, undefined) {

    var featuredChart,
        _options = {
            chartType:"bar",
            lineType:"basis",
            width:960,
            height:600,
            margin:[0, 0, 0, 0],
            padding:[0, 0, 0, 0],
            data:{},
            animate:false,
            color:d3.scale.category10()
        };

    FeaturedChart.name = 'FeaturedChart';

    function FeaturedChart(options) {

        // 배열로 넘어온 색상을 d3 색상 카테고리로 변환
        if(typeof options.color === "object" && options.color.length > 0) {
            options.color = d3.scale.ordinal().range(options.color);
        }

        this.options = $.extend({}, _options, options);
    }

    FeaturedChart.prototype.createChart = function (el) {
        var chartSize, matrix, widthSize, heightSize, width, height, target = d3.select(el), self = this,
            chartType = this.options.chartType;

        if (chartType === "line") {
            chartSize = this.lineChart(target);
        } else if (chartType === "bar") {
            chartSize = this.barChart(target);
        } else if (chartType === "pie") {
            chartSize = this.pieChart(target);
        } else {
            return false;
        }

        this.updateChart(el, chartSize);

//        $(window).on("resize", el, function () {
//            self.updateChart(el, chartSize);
//        });
    };

    FeaturedChart.prototype.updateChart = function (el, chartSize) {
        var width, widthSize, height, heightSize, matrix = getComputedStyle(el)[this.getCssVendorPropertyName(el, "Transform")];
        if (typeof matrix === "string" && matrix === "none") {
            matrix = "matrix(1, 0, 0, 1, 0, 0)";
        }
        matrix = eval(matrix.replace("matrix(", "[").replace(")", "]"));
        width = chartSize.width;
        widthSize = matrix[0];
        width = width * widthSize;
        height = chartSize.height;
        heightSize = matrix[3];
        height = height * heightSize;
        $(el).parent().css({
            width:width,
            height:height
        });
    };

    FeaturedChart.prototype.getCssVendorPropertyName = function (target, prop) {
        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        if (prop in target.style) {
            return prop;
        }

        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in target.style) {
                return vendorProp;
            }
        }
    };

    FeaturedChart.prototype.barChart = function (target) {
        var valueCount, arrayValue = [],
            self = this,
            m = self.options.margin,
            p = self.options.padding,
            w = self.options.width - m[1] - m[3],
            h = self.options.height - m[0] - m[2],
            x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]]),
            y = d3.scale.linear().range([0, h - p[0] - p[2]]),
            z = self.options.color,
            data = self.options.data;

        target = target.append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + p[3] + "," + (h - p[2]) + ")");

        // JSON 키 / 값의 개수 얻기
        function getJsonKeyLenght(obj) {
            var count = 0;
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    ++count;
                }
            }
            return count;
        }

        // VALUE 개수 구하기
        valueCount = getJsonKeyLenght(data[0]) - 1;
        for (var i = 0; i < valueCount; i++) {
            arrayValue.push("value" + i);
        }
        // 스택 레이아웃 구조로 데이터를 가공
        var causes = d3.layout.stack()(arrayValue.map(function (cause) {
            return data.map(function (d) {
                return {x:d.label, y:+d[cause]};
            });
        }));

        // X 축 값 설정
        x.domain(causes[0].map(function (d) {
            return d.x;
        }));
        // Y 축 값 설정
        y.domain([0, d3.max(causes[causes.length - 1], function (d) {
            return d.y;
        })]);

        // BAR를 그릴때 스타일링
        var cause = target.selectAll("g.cause")
            .data(causes)
            .enter().append("svg:g")
            .attr("class", "cause")
            .style("fill", function (d, i) {
                return z(i);
            })
            .style("stroke", function (d, i) {
                return d3.rgb(z(i)).darker();
            });

        // Bar가 Y축으로 올라갈때 애니매이션 연출
        var rect = cause.selectAll("rect")
            .data(Object)
            .enter().append("svg:rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("width", x.rangeBand())
            .transition().delay(function (d, i) {
                return i * 100;
            })
            .duration(100)
            .attr("y", function (d) {
                return -y(d.y0) - y(d.y);
            })
            .attr("height", function (d) {
                return y(d.y);
            });

        // X, Y축 스타일 지정 및 이름 설정
        var label = target.selectAll("text")
            .data(x.domain())
            .enter().append("svg:text")
            .attr("class", "x")
            .attr("x", function (d) {
                return x(d) + x.rangeBand() / 2;
            })
            .attr("y", 6)
            .attr("text-anchor", "middle")
            .attr("dy", ".71em")
            .style("fill", "#fff")
            .text(function (d) {
                return d;
            });

        var rule = target.selectAll("g.rule")
            .data(y.ticks(5))
            .enter().append("svg:g")
            .attr("class", "rule")
            .style("fill", "#fff")
            .attr("transform", function (d) {
                return "translate(0," + -y(d) + ")";
            });

        rule.append("svg:line")
            .attr("x2", w - p[1] - p[3])
            .style("stroke", function (d) {
                return d ? "#fff" : "#000";
            })
            .style("stroke-opacity", function (d) {
                return d ? .7 : null;
            });

        rule.append("svg:text")
            .attr("x", w - p[1] - p[3] + 6)
            .attr("dy", ".35em")
            .text(d3.format(",d"));

        return {width:self.options.width, height:self.options.height};
    };

    FeaturedChart.prototype.lineChart = function (target) {
        var self = this,
            m = self.options.margin,
            p = self.options.padding,
            w = self.options.width - m[1] - m[3],
            h = self.options.height - m[0] - m[2],
            data = self.options.data;

        var tempData = [];
        $.map(data, function (val, i) {
            tempData.push(parseInt(val.value0));
        });

        // X scale will fit all values from data[] within pixels 0-w
        var x = d3.scale.linear().domain([0, tempData.length]).range([0, w]);
        var y = d3.scale.linear().domain([0, d3.max(tempData)]).range([h, 0]);

        // create a line function that can convert data[] into x and y points
        var line = d3.svg.line()
            .x(function (d, i) {
                return x(i);
            })
            .y(function (d) {
                return y(d);
            }).interpolate(self.options.lineType);

        var graph = target.append("svg:svg")
            .attr("width", w + m[1] + m[3])
            .attr("height", h + m[0] + m[2])
            .append("svg:g")
            .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

        graph.append("svg:path").attr("d", line(tempData))
            .attr("transform", "translate(-25)");

        // X 축 생성
        var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

        // X 축 추가
        graph.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + h + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("class","text")
            .text(function (d) {
                return data[d].label;
            });

        // Y 축 생성
        var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

        // Y 축 추가
        graph.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(-25,0)")
            .call(yAxisLeft)
            .selectAll("text")
            .attr("class","text");

        return {width:self.options.width, height:self.options.height};
    };

    FeaturedChart.prototype.pieChart = function (target) {
        var self = this,
            w = self.options.width,
            h = self.options.height,
            r = Math.min(w, h) / 2,
            color = self.options.color,
            donut = d3.layout.pie().sort(null),
            data = self.options.data;

        /**
         * 1. target 엘리먼트에 svg 태그를 생성
         * 2. data 바인딩
         * 3. 폭, 높이값 지정
         */
        var vis = target = target.append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");

        var arc = d3.svg.arc().innerRadius(0).outerRadius(r);

        var pie = d3.layout.pie().value(function (d) {
            return d.value0;
        });

        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("svg:g")
            .attr("class", "slice");

        arcs.append("svg:path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc);

        arcs.append("svg:text")
            .attr("transform", function (d) {
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("class", "label")
            .text(function (d, i) {
                return data[i].label;
            });

        return {width:this.options.width, height:this.options.height};
    };

    $.fn.featuredChart = function (options) {
        return this.each(function (i) {
            featuredChart = new FeaturedChart(options);
            featuredChart.createChart(this);
        });
    };

    $.fn.featuredChart.Constructor = FeaturedChart;

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=chart]").each(function (i) {
        var self = this,
            dataUrl = $(this).data("chartBind");

        $.getJSON(dataUrl).success(function (msg) {
            featuredChart = new FeaturedChart({
                margin:$(self).data("chartMargin"),
                padding:$(self).data("chartPadding"),
                chartType:$(self).data("chartType"),
                lineType:$(self).data("chartListtype"),
                data:msg
            });
            featuredChart.createChart(self);
        }).error(function (jqXHR, textStatus, errorThrown) {
                console.log("getJSON Error", jqXHR, textStatus, errorThrown);
            });
    });

    return FeaturedChart;
}));/*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.3
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function(i,ka,t,q){var m=function(h){function n(a,b){var c=m.defaults.columns,d=a.aoColumns.length;b=i.extend({},m.models.oColumn,c,{sSortingClass:a.oClasses.sSortable,sSortingClassJUI:a.oClasses.sSortJUI,nTh:b?b:t.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.oDefaults:d});a.aoColumns.push(b);if(a.aoPreSearchCols[d]===q||a.aoPreSearchCols[d]===null)a.aoPreSearchCols[d]=i.extend({},m.models.oSearch);else{b=a.aoPreSearchCols[d];
if(b.bRegex===q)b.bRegex=true;if(b.bSmart===q)b.bSmart=true;if(b.bCaseInsensitive===q)b.bCaseInsensitive=true}p(a,d,null)}function p(a,b,c){var d=a.aoColumns[b];if(c!==q&&c!==null){if(c.mDataProp&&!c.mData)c.mData=c.mDataProp;if(c.sType!==q){d.sType=c.sType;d._bAutoType=false}i.extend(d,c);r(d,c,"sWidth","sWidthOrig");if(c.iDataSort!==q)d.aDataSort=[c.iDataSort];r(d,c,"aDataSort")}var e=d.mRender?ba(d.mRender):null,f=ba(d.mData);d.fnGetData=function(g,j){var k=f(g,j);if(d.mRender&&j&&j!=="")return e(k,
j,g);return k};d.fnSetData=Ia(d.mData);if(!a.oFeatures.bSort)d.bSortable=false;if(!d.bSortable||i.inArray("asc",d.asSorting)==-1&&i.inArray("desc",d.asSorting)==-1){d.sSortingClass=a.oClasses.sSortableNone;d.sSortingClassJUI=""}else if(d.bSortable||i.inArray("asc",d.asSorting)==-1&&i.inArray("desc",d.asSorting)==-1){d.sSortingClass=a.oClasses.sSortable;d.sSortingClassJUI=a.oClasses.sSortJUI}else if(i.inArray("asc",d.asSorting)!=-1&&i.inArray("desc",d.asSorting)==-1){d.sSortingClass=a.oClasses.sSortableAsc;
d.sSortingClassJUI=a.oClasses.sSortJUIAscAllowed}else if(i.inArray("asc",d.asSorting)==-1&&i.inArray("desc",d.asSorting)!=-1){d.sSortingClass=a.oClasses.sSortableDesc;d.sSortingClassJUI=a.oClasses.sSortJUIDescAllowed}}function o(a){if(a.oFeatures.bAutoWidth===false)return false;ra(a);for(var b=0,c=a.aoColumns.length;b<c;b++)a.aoColumns[b].nTh.style.width=a.aoColumns[b].sWidth}function v(a,b){a=z(a,"bVisible");return typeof a[b]==="number"?a[b]:null}function x(a,b){a=z(a,"bVisible");b=i.inArray(b,
a);return b!==-1?b:null}function D(a){return z(a,"bVisible").length}function z(a,b){var c=[];i.map(a.aoColumns,function(d,e){d[b]&&c.push(e)});return c}function F(a){for(var b=m.ext.aTypes,c=b.length,d=0;d<c;d++){var e=b[d](a);if(e!==null)return e}return"string"}function G(a,b){b=b.split(",");for(var c=[],d=0,e=a.aoColumns.length;d<e;d++)for(var f=0;f<e;f++)if(a.aoColumns[d].sName==b[f]){c.push(f);break}return c}function Q(a){for(var b="",c=0,d=a.aoColumns.length;c<d;c++)b+=a.aoColumns[c].sName+",";
if(b.length==d)return"";return b.slice(0,-1)}function la(a,b,c,d){var e,f,g,j,k;if(b)for(e=b.length-1;e>=0;e--){var l=b[e].aTargets;i.isArray(l)||M(a,1,"aTargets must be an array of targets, not a "+typeof l);f=0;for(g=l.length;f<g;f++)if(typeof l[f]==="number"&&l[f]>=0){for(;a.aoColumns.length<=l[f];)n(a);d(l[f],b[e])}else if(typeof l[f]==="number"&&l[f]<0)d(a.aoColumns.length+l[f],b[e]);else if(typeof l[f]==="string"){j=0;for(k=a.aoColumns.length;j<k;j++)if(l[f]=="_all"||i(a.aoColumns[j].nTh).hasClass(l[f]))d(j,
b[e])}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function O(a,b){var c;c=i.isArray(b)?b.slice():i.extend(true,{},b);b=a.aoData.length;var d=i.extend(true,{},m.models.oRow);d._aData=c;a.aoData.push(d);var e;d=0;for(var f=a.aoColumns.length;d<f;d++){c=a.aoColumns[d];typeof c.fnRender==="function"&&c.bUseRendered&&c.mData!==null?R(a,b,d,ca(a,b,d)):R(a,b,d,E(a,b,d));if(c._bAutoType&&c.sType!="string"){e=E(a,b,d,"type");if(e!==null&&e!==""){e=F(e);if(c.sType===null)c.sType=e;else if(c.sType!=e&&c.sType!=
"html")c.sType="string"}}}a.aiDisplayMaster.push(b);a.oFeatures.bDeferRender||sa(a,b);return b}function da(a){var b,c,d,e,f,g,j,k,l;if(a.bDeferLoading||a.sAjaxSource===null){j=a.nTBody.childNodes;b=0;for(c=j.length;b<c;b++)if(j[b].nodeName.toUpperCase()=="TR"){k=a.aoData.length;j[b]._DT_RowIndex=k;a.aoData.push(i.extend(true,{},m.models.oRow,{nTr:j[b]}));a.aiDisplayMaster.push(k);g=j[b].childNodes;d=f=0;for(e=g.length;d<e;d++){l=g[d].nodeName.toUpperCase();if(l=="TD"||l=="TH"){R(a,k,f,i.trim(g[d].innerHTML));
f++}}}}j=ea(a);g=[];b=0;for(c=j.length;b<c;b++){d=0;for(e=j[b].childNodes.length;d<e;d++){f=j[b].childNodes[d];l=f.nodeName.toUpperCase();if(l=="TD"||l=="TH")g.push(f)}}e=0;for(j=a.aoColumns.length;e<j;e++){l=a.aoColumns[e];if(l.sTitle===null)l.sTitle=l.nTh.innerHTML;f=l._bAutoType;k=typeof l.fnRender==="function";var y=l.sClass!==null,u=l.bVisible,w,A;if(f||k||y||!u){b=0;for(c=a.aoData.length;b<c;b++){d=a.aoData[b];w=g[b*j+e];if(f&&l.sType!="string"){A=E(a,b,e,"type");if(A!==""){A=F(A);if(l.sType===
null)l.sType=A;else if(l.sType!=A&&l.sType!="html")l.sType="string"}}if(typeof l.mData==="function")w.innerHTML=E(a,b,e,"display");if(k){A=ca(a,b,e);w.innerHTML=A;l.bUseRendered&&R(a,b,e,A)}if(y)w.className+=" "+l.sClass;if(u)d._anHidden[e]=null;else{d._anHidden[e]=w;w.parentNode.removeChild(w)}l.fnCreatedCell&&l.fnCreatedCell.call(a.oInstance,w,E(a,b,e,"display"),d._aData,b,e)}}}if(a.aoRowCreatedCallback.length!==0){b=0;for(c=a.aoData.length;b<c;b++){d=a.aoData[b];L(a,"aoRowCreatedCallback",null,
[d.nTr,d._aData,b])}}}function S(a,b){return b._DT_RowIndex!==q?b._DT_RowIndex:null}function ta(a,b,c){b=T(a,b);var d=0;for(a=a.aoColumns.length;d<a;d++)if(b[d]===c)return d;return-1}function ma(a,b,c,d){for(var e=[],f=0,g=d.length;f<g;f++)e.push(E(a,b,d[f],c));return e}function E(a,b,c,d){var e=a.aoColumns[c];if((c=e.fnGetData(a.aoData[b]._aData,d))===q){if(a.iDrawError!=a.iDraw&&e.sDefaultContent===null){M(a,0,"Requested unknown parameter "+(typeof e.mData=="function"?"{mData function}":"'"+e.mData+
"'")+" from the data source for row "+b);a.iDrawError=a.iDraw}return e.sDefaultContent}if(c===null&&e.sDefaultContent!==null)c=e.sDefaultContent;else if(typeof c==="function")return c();if(d=="display"&&c===null)return"";return c}function R(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d)}function ba(a){if(a===null)return function(){return null};else if(typeof a==="function")return function(c,d,e){return a(c,d,e)};else if(typeof a==="string"&&(a.indexOf(".")!==-1||a.indexOf("[")!==-1)){var b=
function(c,d,e){var f=e.split("."),g;if(e!==""){var j=0;for(g=f.length;j<g;j++){if(e=f[j].match(fa)){f[j]=f[j].replace(fa,"");if(f[j]!=="")c=c[f[j]];g=[];f.splice(0,j+1);f=f.join(".");j=0;for(var k=c.length;j<k;j++)g.push(b(c[j],d,f));c=e[0].substring(1,e[0].length-1);c=c===""?g:g.join(c);break}if(c===null||c[f[j]]===q)return q;c=c[f[j]]}}return c};return function(c,d){return b(c,d,a)}}else return function(c){return c[a]}}function Ia(a){if(a===null)return function(){};else if(typeof a==="function")return function(c,
d){a(c,"set",d)};else if(typeof a==="string"&&(a.indexOf(".")!==-1||a.indexOf("[")!==-1)){var b=function(c,d,e){e=e.split(".");var f,g,j=0;for(g=e.length-1;j<g;j++){if(f=e[j].match(fa)){e[j]=e[j].replace(fa,"");c[e[j]]=[];f=e.slice();f.splice(0,j+1);g=f.join(".");for(var k=0,l=d.length;k<l;k++){f={};b(f,d[k],g);c[e[j]].push(f)}return}if(c[e[j]]===null||c[e[j]]===q)c[e[j]]={};c=c[e[j]]}c[e[e.length-1].replace(fa,"")]=d};return function(c,d){return b(c,d,a)}}else return function(c,d){c[a]=d}}function na(a){for(var b=
[],c=a.aoData.length,d=0;d<c;d++)b.push(a.aoData[d]._aData);return b}function ua(a){a.aoData.splice(0,a.aoData.length);a.aiDisplayMaster.splice(0,a.aiDisplayMaster.length);a.aiDisplay.splice(0,a.aiDisplay.length);J(a)}function va(a,b){for(var c=-1,d=0,e=a.length;d<e;d++)if(a[d]==b)c=d;else a[d]>b&&a[d]--;c!=-1&&a.splice(c,1)}function ca(a,b,c){var d=a.aoColumns[c];return d.fnRender({iDataRow:b,iDataColumn:c,oSettings:a,aData:a.aoData[b]._aData,mDataProp:d.mData},E(a,b,c,"display"))}function sa(a,
b){var c=a.aoData[b],d;if(c.nTr===null){c.nTr=t.createElement("tr");c.nTr._DT_RowIndex=b;if(c._aData.DT_RowId)c.nTr.id=c._aData.DT_RowId;c._aData.DT_RowClass&&i(c.nTr).addClass(c._aData.DT_RowClass);for(var e=0,f=a.aoColumns.length;e<f;e++){var g=a.aoColumns[e];d=t.createElement(g.sCellType);d.innerHTML=typeof g.fnRender==="function"&&(!g.bUseRendered||g.mData===null)?ca(a,b,e):E(a,b,e,"display");if(g.sClass!==null)d.className=g.sClass;if(g.bVisible){c.nTr.appendChild(d);c._anHidden[e]=null}else c._anHidden[e]=
d;g.fnCreatedCell&&g.fnCreatedCell.call(a.oInstance,d,E(a,b,e,"display"),c._aData,b,e)}L(a,"aoRowCreatedCallback",null,[c.nTr,c._aData,b])}}function Ja(a){var b,c,d;if(a.nTHead.getElementsByTagName("th").length!==0){b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;c.setAttribute("role","columnheader");if(a.aoColumns[b].bSortable){c.setAttribute("tabindex",a.iTabIndex);c.setAttribute("aria-controls",a.sTableId)}a.aoColumns[b].sClass!==null&&i(c).addClass(a.aoColumns[b].sClass);if(a.aoColumns[b].sTitle!=
c.innerHTML)c.innerHTML=a.aoColumns[b].sTitle}}else{var e=t.createElement("tr");b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;c.innerHTML=a.aoColumns[b].sTitle;c.setAttribute("tabindex","0");a.aoColumns[b].sClass!==null&&i(c).addClass(a.aoColumns[b].sClass);e.appendChild(c)}i(a.nTHead).html("")[0].appendChild(e);ga(a.aoHeader,a.nTHead)}i(a.nTHead).children("tr").attr("role","row");if(a.bJUI){b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;e=t.createElement("div");e.className=
a.oClasses.sSortJUIWrapper;i(c).contents().appendTo(e);var f=t.createElement("span");f.className=a.oClasses.sSortIcon;e.appendChild(f);c.appendChild(e)}}if(a.oFeatures.bSort)for(b=0;b<a.aoColumns.length;b++)a.aoColumns[b].bSortable!==false?wa(a,a.aoColumns[b].nTh,b):i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);a.oClasses.sFooterTH!==""&&i(a.nTFoot).children("tr").children("th").addClass(a.oClasses.sFooterTH);if(a.nTFoot!==null){c=W(a,null,a.aoFooter);b=0;for(d=a.aoColumns.length;b<d;b++)if(c[b]){a.aoColumns[b].nTf=
c[b];a.aoColumns[b].sClass&&i(c[b]).addClass(a.aoColumns[b].sClass)}}}function ha(a,b,c){var d,e,f,g=[],j=[],k=a.aoColumns.length,l;if(c===q)c=false;d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=k-1;f>=0;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++){l=k=1;if(j[d][f]===q){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+k]!==q&&g[d][f].cell==g[d+k][f].cell;){j[d+
k][f]=1;k++}for(;g[d][f+l]!==q&&g[d][f].cell==g[d][f+l].cell;){for(c=0;c<k;c++)j[d+c][f+l]=1;l++}g[d][f].cell.rowSpan=k;g[d][f].cell.colSpan=l}}}}function H(a){var b=L(a,"aoPreDrawCallback","preDraw",[a]);if(i.inArray(false,b)!==-1)N(a,false);else{var c,d;b=[];var e=0,f=a.asStripeClasses.length;c=a.aoOpenRows.length;a.bDrawing=true;if(a.iInitDisplayStart!==q&&a.iInitDisplayStart!=-1){a._iDisplayStart=a.oFeatures.bServerSide?a.iInitDisplayStart:a.iInitDisplayStart>=a.fnRecordsDisplay()?0:a.iInitDisplayStart;
a.iInitDisplayStart=-1;J(a)}if(a.bDeferLoading){a.bDeferLoading=false;a.iDraw++}else if(a.oFeatures.bServerSide){if(!a.bDestroying&&!Ka(a))return}else a.iDraw++;if(a.aiDisplay.length!==0){var g=a._iDisplayStart;d=a._iDisplayEnd;if(a.oFeatures.bServerSide){g=0;d=a.aoData.length}for(g=g;g<d;g++){var j=a.aoData[a.aiDisplay[g]];j.nTr===null&&sa(a,a.aiDisplay[g]);var k=j.nTr;if(f!==0){var l=a.asStripeClasses[e%f];if(j._sRowStripe!=l){i(k).removeClass(j._sRowStripe).addClass(l);j._sRowStripe=l}}L(a,"aoRowCallback",
null,[k,a.aoData[a.aiDisplay[g]]._aData,e,g]);b.push(k);e++;if(c!==0)for(j=0;j<c;j++)if(k==a.aoOpenRows[j].nParent){b.push(a.aoOpenRows[j].nTr);break}}}else{b[0]=t.createElement("tr");if(a.asStripeClasses[0])b[0].className=a.asStripeClasses[0];c=a.oLanguage;f=c.sZeroRecords;if(a.iDraw==1&&a.sAjaxSource!==null&&!a.oFeatures.bServerSide)f=c.sLoadingRecords;else if(c.sEmptyTable&&a.fnRecordsTotal()===0)f=c.sEmptyTable;c=t.createElement("td");c.setAttribute("valign","top");c.colSpan=D(a);c.className=
a.oClasses.sRowEmpty;c.innerHTML=xa(a,f);b[e].appendChild(c)}L(a,"aoHeaderCallback","header",[i(a.nTHead).children("tr")[0],na(a),a._iDisplayStart,a.fnDisplayEnd(),a.aiDisplay]);L(a,"aoFooterCallback","footer",[i(a.nTFoot).children("tr")[0],na(a),a._iDisplayStart,a.fnDisplayEnd(),a.aiDisplay]);e=t.createDocumentFragment();c=t.createDocumentFragment();if(a.nTBody){f=a.nTBody.parentNode;c.appendChild(a.nTBody);if(!a.oScroll.bInfinite||!a._bInitComplete||a.bSorted||a.bFiltered)for(;c=a.nTBody.firstChild;)a.nTBody.removeChild(c);
c=0;for(d=b.length;c<d;c++)e.appendChild(b[c]);a.nTBody.appendChild(e);f!==null&&f.appendChild(a.nTBody)}L(a,"aoDrawCallback","draw",[a]);a.bSorted=false;a.bFiltered=false;a.bDrawing=false;if(a.oFeatures.bServerSide){N(a,false);a._bInitComplete||oa(a)}}}function pa(a){if(a.oFeatures.bSort)X(a,a.oPreviousSearch);else if(a.oFeatures.bFilter)U(a,a.oPreviousSearch);else{J(a);H(a)}}function La(a){var b=i("<div></div>")[0];a.nTable.parentNode.insertBefore(b,a.nTable);a.nTableWrapper=i('<div id="'+a.sTableId+
'_wrapper" class="'+a.oClasses.sWrapper+'" role="grid"></div>')[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var c=a.nTableWrapper,d=a.sDom.split(""),e,f,g,j,k,l,y,u=0;u<d.length;u++){f=0;g=d[u];if(g=="<"){j=i("<div></div>")[0];k=d[u+1];if(k=="'"||k=='"'){l="";for(y=2;d[u+y]!=k;){l+=d[u+y];y++}if(l=="H")l=a.oClasses.sJUIHeader;else if(l=="F")l=a.oClasses.sJUIFooter;if(l.indexOf(".")!=-1){k=l.split(".");j.id=k[0].substr(1,k[0].length-1);j.className=k[1]}else if(l.charAt(0)=="#")j.id=l.substr(1,
l.length-1);else j.className=l;u+=y}c.appendChild(j);c=j}else if(g==">")c=c.parentNode;else if(g=="l"&&a.oFeatures.bPaginate&&a.oFeatures.bLengthChange){e=Ma(a);f=1}else if(g=="f"&&a.oFeatures.bFilter){e=Na(a);f=1}else if(g=="r"&&a.oFeatures.bProcessing){e=Oa(a);f=1}else if(g=="t"){e=Pa(a);f=1}else if(g=="i"&&a.oFeatures.bInfo){e=Qa(a);f=1}else if(g=="p"&&a.oFeatures.bPaginate){e=Ra(a);f=1}else if(m.ext.aoFeatures.length!==0){j=m.ext.aoFeatures;y=0;for(k=j.length;y<k;y++)if(g==j[y].cFeature){if(e=
j[y].fnInit(a))f=1;break}}if(f==1&&e!==null){if(typeof a.aanFeatures[g]!=="object")a.aanFeatures[g]=[];a.aanFeatures[g].push(e);c.appendChild(e)}}b.parentNode.replaceChild(a.nTableWrapper,b)}function ga(a,b){b=i(b).children("tr");var c,d,e,f,g,j,k,l,y=function(A,Y,C){for(;A[Y][C];)C++;return C};a.splice(0,a.length);d=0;for(j=b.length;d<j;d++)a.push([]);d=0;for(j=b.length;d<j;d++){e=0;for(k=b[d].childNodes.length;e<k;e++){c=b[d].childNodes[e];if(c.nodeName.toUpperCase()=="TD"||c.nodeName.toUpperCase()==
"TH"){var u=c.getAttribute("colspan")*1,w=c.getAttribute("rowspan")*1;u=!u||u===0||u===1?1:u;w=!w||w===0||w===1?1:w;l=y(a,d,0);for(g=0;g<u;g++)for(f=0;f<w;f++){a[d+f][l+g]={cell:c,unique:u==1?true:false};a[d+f].nTr=b[d]}}}}}function W(a,b,c){var d=[];if(!c){c=a.aoHeader;if(b){c=[];ga(c,b)}}b=0;for(var e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function Ka(a){if(a.bAjaxDataGet){a.iDraw++;N(a,true);var b=Sa(a);ya(a,b);
a.fnServerData.call(a.oInstance,a.sAjaxSource,b,function(c){Ta(a,c)},a);return false}else return true}function Sa(a){var b=a.aoColumns.length,c=[],d,e,f,g;c.push({name:"sEcho",value:a.iDraw});c.push({name:"iColumns",value:b});c.push({name:"sColumns",value:Q(a)});c.push({name:"iDisplayStart",value:a._iDisplayStart});c.push({name:"iDisplayLength",value:a.oFeatures.bPaginate!==false?a._iDisplayLength:-1});for(f=0;f<b;f++){d=a.aoColumns[f].mData;c.push({name:"mDataProp_"+f,value:typeof d==="function"?
"function":d})}if(a.oFeatures.bFilter!==false){c.push({name:"sSearch",value:a.oPreviousSearch.sSearch});c.push({name:"bRegex",value:a.oPreviousSearch.bRegex});for(f=0;f<b;f++){c.push({name:"sSearch_"+f,value:a.aoPreSearchCols[f].sSearch});c.push({name:"bRegex_"+f,value:a.aoPreSearchCols[f].bRegex});c.push({name:"bSearchable_"+f,value:a.aoColumns[f].bSearchable})}}if(a.oFeatures.bSort!==false){var j=0;d=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):a.aaSorting.slice();for(f=0;f<d.length;f++){e=
a.aoColumns[d[f][0]].aDataSort;for(g=0;g<e.length;g++){c.push({name:"iSortCol_"+j,value:e[g]});c.push({name:"sSortDir_"+j,value:d[f][1]});j++}}c.push({name:"iSortingCols",value:j});for(f=0;f<b;f++)c.push({name:"bSortable_"+f,value:a.aoColumns[f].bSortable})}return c}function ya(a,b){L(a,"aoServerParams","serverParams",[b])}function Ta(a,b){if(b.sEcho!==q)if(b.sEcho*1<a.iDraw)return;else a.iDraw=b.sEcho*1;if(!a.oScroll.bInfinite||a.oScroll.bInfinite&&(a.bSorted||a.bFiltered))ua(a);a._iRecordsTotal=
parseInt(b.iTotalRecords,10);a._iRecordsDisplay=parseInt(b.iTotalDisplayRecords,10);var c=Q(a);c=b.sColumns!==q&&c!==""&&b.sColumns!=c;var d;if(c)d=G(a,b.sColumns);b=ba(a.sAjaxDataProp)(b);for(var e=0,f=b.length;e<f;e++)if(c){for(var g=[],j=0,k=a.aoColumns.length;j<k;j++)g.push(b[e][d[j]]);O(a,g)}else O(a,b[e]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=false;H(a);a.bAjaxDataGet=true;N(a,false)}function Na(a){var b=a.oPreviousSearch,c=a.oLanguage.sSearch;c=c.indexOf("_INPUT_")!==-1?c.replace("_INPUT_",
'<input type="text" />'):c===""?'<input type="text" />':c+' <input type="text" />';var d=t.createElement("div");d.className=a.oClasses.sFilter;d.innerHTML="<label>"+c+"</label>";if(!a.aanFeatures.f)d.id=a.sTableId+"_filter";c=i('input[type="text"]',d);d._DT_Input=c[0];c.val(b.sSearch.replace('"',"&quot;"));c.bind("keyup.DT",function(){for(var e=a.aanFeatures.f,f=this.value===""?"":this.value,g=0,j=e.length;g<j;g++)e[g]!=i(this).parents("div.dataTables_filter")[0]&&i(e[g]._DT_Input).val(f);f!=b.sSearch&&
U(a,{sSearch:f,bRegex:b.bRegex,bSmart:b.bSmart,bCaseInsensitive:b.bCaseInsensitive})});c.attr("aria-controls",a.sTableId).bind("keypress.DT",function(e){if(e.keyCode==13)return false});return d}function U(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(g){d.sSearch=g.sSearch;d.bRegex=g.bRegex;d.bSmart=g.bSmart;d.bCaseInsensitive=g.bCaseInsensitive};if(a.oFeatures.bServerSide)f(b);else{Ua(a,b.sSearch,c,b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<a.aoPreSearchCols.length;b++)Va(a,
e[b].sSearch,b,e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);Wa(a)}a.bFiltered=true;i(a.oInstance).trigger("filter",a);a._iDisplayStart=0;J(a);H(a);za(a,0)}function Wa(a){for(var b=m.ext.afnFiltering,c=z(a,"bSearchable"),d=0,e=b.length;d<e;d++)for(var f=0,g=0,j=a.aiDisplay.length;g<j;g++){var k=a.aiDisplay[g-f];if(!b[d](a,ma(a,k,"filter",c),k)){a.aiDisplay.splice(g-f,1);f++}}}function Va(a,b,c,d,e,f){if(b!==""){var g=0;b=Aa(b,d,e,f);for(d=a.aiDisplay.length-1;d>=0;d--){e=Xa(E(a,a.aiDisplay[d],c,
"filter"),a.aoColumns[c].sType);if(!b.test(e)){a.aiDisplay.splice(d,1);g++}}}}function Ua(a,b,c,d,e,f){d=Aa(b,d,e,f);e=a.oPreviousSearch;c||(c=0);if(m.ext.afnFiltering.length!==0)c=1;if(b.length<=0){a.aiDisplay.splice(0,a.aiDisplay.length);a.aiDisplay=a.aiDisplayMaster.slice()}else if(a.aiDisplay.length==a.aiDisplayMaster.length||e.sSearch.length>b.length||c==1||b.indexOf(e.sSearch)!==0){a.aiDisplay.splice(0,a.aiDisplay.length);za(a,1);for(b=0;b<a.aiDisplayMaster.length;b++)d.test(a.asDataSearch[b])&&
a.aiDisplay.push(a.aiDisplayMaster[b])}else for(b=c=0;b<a.asDataSearch.length;b++)if(!d.test(a.asDataSearch[b])){a.aiDisplay.splice(b-c,1);c++}}function za(a,b){if(!a.oFeatures.bServerSide){a.asDataSearch=[];var c=z(a,"bSearchable");b=b===1?a.aiDisplayMaster:a.aiDisplay;for(var d=0,e=b.length;d<e;d++)a.asDataSearch[d]=Ba(a,ma(a,b[d],"filter",c))}}function Ba(a,b){a=b.join("  ");if(a.indexOf("&")!==-1)a=i("<div>").html(a).text();return a.replace(/[\n\r]/g," ")}function Aa(a,b,c,d){if(c){a=b?a.split(" "):
Ca(a).split(" ");a="^(?=.*?"+a.join(")(?=.*?")+").*$";return new RegExp(a,d?"i":"")}else{a=b?a:Ca(a);return new RegExp(a,d?"i":"")}}function Xa(a,b){if(typeof m.ext.ofnSearch[b]==="function")return m.ext.ofnSearch[b](a);else if(a===null)return"";else if(b=="html")return a.replace(/[\r\n]/g," ").replace(/<.*?>/g,"");else if(typeof a==="string")return a.replace(/[\r\n]/g," ");return a}function Ca(a){return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),
"\\$1")}function Qa(a){var b=t.createElement("div");b.className=a.oClasses.sInfo;if(!a.aanFeatures.i){a.aoDrawCallback.push({fn:Ya,sName:"information"});b.id=a.sTableId+"_info"}a.nTable.setAttribute("aria-describedby",a.sTableId+"_info");return b}function Ya(a){if(!(!a.oFeatures.bInfo||a.aanFeatures.i.length===0)){var b=a.oLanguage,c=a._iDisplayStart+1,d=a.fnDisplayEnd(),e=a.fnRecordsTotal(),f=a.fnRecordsDisplay(),g;g=f===0&&f==e?b.sInfoEmpty:f===0?b.sInfoEmpty+" "+b.sInfoFiltered:f==e?b.sInfo:b.sInfo+
" "+b.sInfoFiltered;g+=b.sInfoPostFix;g=xa(a,g);if(b.fnInfoCallback!==null)g=b.fnInfoCallback.call(a.oInstance,a,c,d,e,f,g);a=a.aanFeatures.i;b=0;for(c=a.length;b<c;b++)i(a[b]).html(g)}}function xa(a,b){var c=a.fnFormatNumber(a._iDisplayStart+1),d=a.fnDisplayEnd();d=a.fnFormatNumber(d);var e=a.fnRecordsDisplay();e=a.fnFormatNumber(e);var f=a.fnRecordsTotal();f=a.fnFormatNumber(f);if(a.oScroll.bInfinite)c=a.fnFormatNumber(1);return b.replace("_START_",c).replace("_END_",d).replace("_TOTAL_",e).replace("_MAX_",
f)}function qa(a){var b,c,d=a.iInitDisplayStart;if(a.bInitialised===false)setTimeout(function(){qa(a)},200);else{La(a);Ja(a);ha(a,a.aoHeader);a.nTFoot&&ha(a,a.aoFooter);N(a,true);a.oFeatures.bAutoWidth&&ra(a);b=0;for(c=a.aoColumns.length;b<c;b++)if(a.aoColumns[b].sWidth!==null)a.aoColumns[b].nTh.style.width=s(a.aoColumns[b].sWidth);if(a.oFeatures.bSort)X(a);else if(a.oFeatures.bFilter)U(a,a.oPreviousSearch);else{a.aiDisplay=a.aiDisplayMaster.slice();J(a);H(a)}if(a.sAjaxSource!==null&&!a.oFeatures.bServerSide){c=
[];ya(a,c);a.fnServerData.call(a.oInstance,a.sAjaxSource,c,function(e){var f=a.sAjaxDataProp!==""?ba(a.sAjaxDataProp)(e):e;for(b=0;b<f.length;b++)O(a,f[b]);a.iInitDisplayStart=d;if(a.oFeatures.bSort)X(a);else{a.aiDisplay=a.aiDisplayMaster.slice();J(a);H(a)}N(a,false);oa(a,e)},a)}else if(!a.oFeatures.bServerSide){N(a,false);oa(a)}}}function oa(a,b){a._bInitComplete=true;L(a,"aoInitComplete","init",[a,b])}function Da(a){var b=m.defaults.oLanguage;!a.sEmptyTable&&a.sZeroRecords&&b.sEmptyTable==="No data available in table"&&
r(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&a.sZeroRecords&&b.sLoadingRecords==="Loading..."&&r(a,a,"sZeroRecords","sLoadingRecords")}function Ma(a){if(a.oScroll.bInfinite)return null;var b='<select size="1" '+('name="'+a.sTableId+'_length"')+">",c,d,e=a.aLengthMenu;if(e.length==2&&typeof e[0]==="object"&&typeof e[1]==="object"){c=0;for(d=e[0].length;c<d;c++)b+='<option value="'+e[0][c]+'">'+e[1][c]+"</option>"}else{c=0;for(d=e.length;c<d;c++)b+='<option value="'+e[c]+'">'+e[c]+"</option>"}b+=
"</select>";e=t.createElement("div");if(!a.aanFeatures.l)e.id=a.sTableId+"_length";e.className=a.oClasses.sLength;e.innerHTML="<label>"+a.oLanguage.sLengthMenu.replace("_MENU_",b)+"</label>";i('select option[value="'+a._iDisplayLength+'"]',e).attr("selected",true);i("select",e).bind("change.DT",function(){var f=i(this).val(),g=a.aanFeatures.l;c=0;for(d=g.length;c<d;c++)g[c]!=this.parentNode&&i("select",g[c]).val(f);a._iDisplayLength=parseInt(f,10);J(a);if(a.fnDisplayEnd()==a.fnRecordsDisplay()){a._iDisplayStart=
a.fnDisplayEnd()-a._iDisplayLength;if(a._iDisplayStart<0)a._iDisplayStart=0}if(a._iDisplayLength==-1)a._iDisplayStart=0;H(a)});i("select",e).attr("aria-controls",a.sTableId);return e}function J(a){a._iDisplayEnd=a.oFeatures.bPaginate===false?a.aiDisplay.length:a._iDisplayStart+a._iDisplayLength>a.aiDisplay.length||a._iDisplayLength==-1?a.aiDisplay.length:a._iDisplayStart+a._iDisplayLength}function Ra(a){if(a.oScroll.bInfinite)return null;var b=t.createElement("div");b.className=a.oClasses.sPaging+
a.sPaginationType;m.ext.oPagination[a.sPaginationType].fnInit(a,b,function(c){J(c);H(c)});a.aanFeatures.p||a.aoDrawCallback.push({fn:function(c){m.ext.oPagination[c.sPaginationType].fnUpdate(c,function(d){J(d);H(d)})},sName:"pagination"});return b}function Ea(a,b){var c=a._iDisplayStart;if(typeof b==="number"){a._iDisplayStart=b*a._iDisplayLength;if(a._iDisplayStart>a.fnRecordsDisplay())a._iDisplayStart=0}else if(b=="first")a._iDisplayStart=0;else if(b=="previous"){a._iDisplayStart=a._iDisplayLength>=
0?a._iDisplayStart-a._iDisplayLength:0;if(a._iDisplayStart<0)a._iDisplayStart=0}else if(b=="next")if(a._iDisplayLength>=0){if(a._iDisplayStart+a._iDisplayLength<a.fnRecordsDisplay())a._iDisplayStart+=a._iDisplayLength}else a._iDisplayStart=0;else if(b=="last")if(a._iDisplayLength>=0){b=parseInt((a.fnRecordsDisplay()-1)/a._iDisplayLength,10)+1;a._iDisplayStart=(b-1)*a._iDisplayLength}else a._iDisplayStart=0;else M(a,0,"Unknown paging action: "+b);i(a.oInstance).trigger("page",a);return c!=a._iDisplayStart}
function Oa(a){var b=t.createElement("div");if(!a.aanFeatures.r)b.id=a.sTableId+"_processing";b.innerHTML=a.oLanguage.sProcessing;b.className=a.oClasses.sProcessing;a.nTable.parentNode.insertBefore(b,a.nTable);return b}function N(a,b){if(a.oFeatures.bProcessing)for(var c=a.aanFeatures.r,d=0,e=c.length;d<e;d++)c[d].style.visibility=b?"visible":"hidden";i(a.oInstance).trigger("processing",[a,b])}function Pa(a){if(a.oScroll.sX===""&&a.oScroll.sY==="")return a.nTable;var b=t.createElement("div"),c=t.createElement("div"),
d=t.createElement("div"),e=t.createElement("div"),f=t.createElement("div"),g=t.createElement("div"),j=a.nTable.cloneNode(false),k=a.nTable.cloneNode(false),l=a.nTable.getElementsByTagName("thead")[0],y=a.nTable.getElementsByTagName("tfoot").length===0?null:a.nTable.getElementsByTagName("tfoot")[0],u=a.oClasses;c.appendChild(d);f.appendChild(g);e.appendChild(a.nTable);b.appendChild(c);b.appendChild(e);d.appendChild(j);j.appendChild(l);if(y!==null){b.appendChild(f);g.appendChild(k);k.appendChild(y)}b.className=
u.sScrollWrapper;c.className=u.sScrollHead;d.className=u.sScrollHeadInner;e.className=u.sScrollBody;f.className=u.sScrollFoot;g.className=u.sScrollFootInner;if(a.oScroll.bAutoCss){c.style.overflow="hidden";c.style.position="relative";f.style.overflow="hidden";e.style.overflow="auto"}c.style.border="0";c.style.width="100%";f.style.border="0";d.style.width=a.oScroll.sXInner!==""?a.oScroll.sXInner:"100%";j.removeAttribute("id");j.style.marginLeft="0";a.nTable.style.marginLeft="0";if(y!==null){k.removeAttribute("id");
k.style.marginLeft="0"}d=i(a.nTable).children("caption");if(d.length>0){d=d[0];if(d._captionSide==="top")j.appendChild(d);else d._captionSide==="bottom"&&y&&k.appendChild(d)}if(a.oScroll.sX!==""){c.style.width=s(a.oScroll.sX);e.style.width=s(a.oScroll.sX);if(y!==null)f.style.width=s(a.oScroll.sX);i(e).scroll(function(){c.scrollLeft=this.scrollLeft;if(y!==null)f.scrollLeft=this.scrollLeft})}if(a.oScroll.sY!=="")e.style.height=s(a.oScroll.sY);a.aoDrawCallback.push({fn:Za,sName:"scrolling"});a.oScroll.bInfinite&&
i(e).scroll(function(){if(!a.bDrawing&&i(this).scrollTop()!==0)if(i(this).scrollTop()+i(this).height()>i(a.nTable).height()-a.oScroll.iLoadGap)if(a.fnDisplayEnd()<a.fnRecordsDisplay()){Ea(a,"next");J(a);H(a)}});a.nScrollHead=c;a.nScrollFoot=f;return b}function Za(a){var b=a.nScrollHead.getElementsByTagName("div")[0],c=b.getElementsByTagName("table")[0],d=a.nTable.parentNode,e,f,g,j,k,l,y,u,w=[],A=a.nTFoot!==null?a.nScrollFoot.getElementsByTagName("div")[0]:null,Y=a.nTFoot!==null?A.getElementsByTagName("table")[0]:
null,C=a.oBrowser.bScrollOversize;i(a.nTable).children("thead, tfoot").remove();g=i(a.nTHead).clone()[0];a.nTable.insertBefore(g,a.nTable.childNodes[0]);if(a.nTFoot!==null){k=i(a.nTFoot).clone()[0];a.nTable.insertBefore(k,a.nTable.childNodes[1])}if(a.oScroll.sX===""){d.style.width="100%";b.parentNode.style.width="100%"}var ia=W(a,g);e=0;for(f=ia.length;e<f;e++){y=v(a,e);ia[e].style.width=a.aoColumns[y].sWidth}a.nTFoot!==null&&V(function(I){I.style.width=""},k.getElementsByTagName("tr"));if(a.oScroll.bCollapse&&
a.oScroll.sY!=="")d.style.height=d.offsetHeight+a.nTHead.offsetHeight+"px";e=i(a.nTable).outerWidth();if(a.oScroll.sX===""){a.nTable.style.width="100%";if(C&&(i("tbody",d).height()>d.offsetHeight||i(d).css("overflow-y")=="scroll"))a.nTable.style.width=s(i(a.nTable).outerWidth()-a.oScroll.iBarWidth)}else if(a.oScroll.sXInner!=="")a.nTable.style.width=s(a.oScroll.sXInner);else if(e==i(d).width()&&i(d).height()<i(a.nTable).height()){a.nTable.style.width=s(e-a.oScroll.iBarWidth);if(i(a.nTable).outerWidth()>
e-a.oScroll.iBarWidth)a.nTable.style.width=s(e)}else a.nTable.style.width=s(e);e=i(a.nTable).outerWidth();f=a.nTHead.getElementsByTagName("tr");g=g.getElementsByTagName("tr");V(function(I,P){l=I.style;l.paddingTop="0";l.paddingBottom="0";l.borderTopWidth="0";l.borderBottomWidth="0";l.height=0;u=i(I).width();P.style.width=s(u);w.push(u)},g,f);i(g).height(0);if(a.nTFoot!==null){j=k.getElementsByTagName("tr");k=a.nTFoot.getElementsByTagName("tr");V(function(I,P){l=I.style;l.paddingTop="0";l.paddingBottom=
"0";l.borderTopWidth="0";l.borderBottomWidth="0";l.height=0;u=i(I).width();P.style.width=s(u);w.push(u)},j,k);i(j).height(0)}V(function(I){I.innerHTML="";I.style.width=s(w.shift())},g);a.nTFoot!==null&&V(function(I){I.innerHTML="";I.style.width=s(w.shift())},j);if(i(a.nTable).outerWidth()<e){j=d.scrollHeight>d.offsetHeight||i(d).css("overflow-y")=="scroll"?e+a.oScroll.iBarWidth:e;if(C&&(d.scrollHeight>d.offsetHeight||i(d).css("overflow-y")=="scroll"))a.nTable.style.width=s(j-a.oScroll.iBarWidth);
d.style.width=s(j);b.parentNode.style.width=s(j);if(a.nTFoot!==null)A.parentNode.style.width=s(j);if(a.oScroll.sX==="")M(a,1,"The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.");else a.oScroll.sXInner!==""&&M(a,1,"The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")}else{d.style.width=s("100%");b.parentNode.style.width=
s("100%");if(a.nTFoot!==null)A.parentNode.style.width=s("100%")}if(a.oScroll.sY==="")if(C)d.style.height=s(a.nTable.offsetHeight+a.oScroll.iBarWidth);if(a.oScroll.sY!==""&&a.oScroll.bCollapse){d.style.height=s(a.oScroll.sY);C=a.oScroll.sX!==""&&a.nTable.offsetWidth>d.offsetWidth?a.oScroll.iBarWidth:0;if(a.nTable.offsetHeight<d.offsetHeight)d.style.height=s(a.nTable.offsetHeight+C)}C=i(a.nTable).outerWidth();c.style.width=s(C);b.style.width=s(C);c=i(a.nTable).height()>d.clientHeight||i(d).css("overflow-y")==
"scroll";b.style.paddingRight=c?a.oScroll.iBarWidth+"px":"0px";if(a.nTFoot!==null){Y.style.width=s(C);A.style.width=s(C);A.style.paddingRight=c?a.oScroll.iBarWidth+"px":"0px"}i(d).scroll();if(a.bSorted||a.bFiltered)d.scrollTop=0}function V(a,b,c){for(var d=0,e=b.length;d<e;d++)for(var f=0,g=b[d].childNodes.length;f<g;f++)if(b[d].childNodes[f].nodeType==1)c?a(b[d].childNodes[f],c[d].childNodes[f]):a(b[d].childNodes[f])}function $a(a,b){if(!a||a===null||a==="")return 0;b||(b=t.getElementsByTagName("body")[0]);
var c=t.createElement("div");c.style.width=s(a);b.appendChild(c);a=c.offsetWidth;b.removeChild(c);return a}function ra(a){var b=0,c,d=0,e=a.aoColumns.length,f,g=i("th",a.nTHead),j=a.nTable.getAttribute("width");for(f=0;f<e;f++)if(a.aoColumns[f].bVisible){d++;if(a.aoColumns[f].sWidth!==null){c=$a(a.aoColumns[f].sWidthOrig,a.nTable.parentNode);if(c!==null)a.aoColumns[f].sWidth=s(c);b++}}if(e==g.length&&b===0&&d==e&&a.oScroll.sX===""&&a.oScroll.sY==="")for(f=0;f<a.aoColumns.length;f++){c=i(g[f]).width();
if(c!==null)a.aoColumns[f].sWidth=s(c)}else{b=a.nTable.cloneNode(false);f=a.nTHead.cloneNode(true);d=t.createElement("tbody");c=t.createElement("tr");b.removeAttribute("id");b.appendChild(f);if(a.nTFoot!==null){b.appendChild(a.nTFoot.cloneNode(true));V(function(l){l.style.width=""},b.getElementsByTagName("tr"))}b.appendChild(d);d.appendChild(c);d=i("thead th",b);if(d.length===0)d=i("tbody tr:eq(0)>td",b);g=W(a,f);for(f=d=0;f<e;f++){var k=a.aoColumns[f];if(k.bVisible&&k.sWidthOrig!==null&&k.sWidthOrig!==
"")g[f-d].style.width=s(k.sWidthOrig);else if(k.bVisible)g[f-d].style.width="";else d++}for(f=0;f<e;f++)if(a.aoColumns[f].bVisible){d=ab(a,f);if(d!==null){d=d.cloneNode(true);if(a.aoColumns[f].sContentPadding!=="")d.innerHTML+=a.aoColumns[f].sContentPadding;c.appendChild(d)}}e=a.nTable.parentNode;e.appendChild(b);if(a.oScroll.sX!==""&&a.oScroll.sXInner!=="")b.style.width=s(a.oScroll.sXInner);else if(a.oScroll.sX!==""){b.style.width="";if(i(b).width()<e.offsetWidth)b.style.width=s(e.offsetWidth)}else if(a.oScroll.sY!==
"")b.style.width=s(e.offsetWidth);else if(j)b.style.width=s(j);b.style.visibility="hidden";bb(a,b);e=i("tbody tr:eq(0)",b).children();if(e.length===0)e=W(a,i("thead",b)[0]);if(a.oScroll.sX!==""){for(f=d=c=0;f<a.aoColumns.length;f++)if(a.aoColumns[f].bVisible){c+=a.aoColumns[f].sWidthOrig===null?i(e[d]).outerWidth():parseInt(a.aoColumns[f].sWidth.replace("px",""),10)+(i(e[d]).outerWidth()-i(e[d]).width());d++}b.style.width=s(c);a.nTable.style.width=s(c)}for(f=d=0;f<a.aoColumns.length;f++)if(a.aoColumns[f].bVisible){c=
i(e[d]).width();if(c!==null&&c>0)a.aoColumns[f].sWidth=s(c);d++}e=i(b).css("width");a.nTable.style.width=e.indexOf("%")!==-1?e:s(i(b).outerWidth());b.parentNode.removeChild(b)}if(j)a.nTable.style.width=s(j)}function bb(a,b){if(a.oScroll.sX===""&&a.oScroll.sY!==""){i(b).width();b.style.width=s(i(b).outerWidth()-a.oScroll.iBarWidth)}else if(a.oScroll.sX!=="")b.style.width=s(i(b).outerWidth())}function ab(a,b){var c=cb(a,b);if(c<0)return null;if(a.aoData[c].nTr===null){var d=t.createElement("td");d.innerHTML=
E(a,c,b,"");return d}return T(a,c)[b]}function cb(a,b){for(var c=-1,d=-1,e=0;e<a.aoData.length;e++){var f=E(a,e,b,"display")+"";f=f.replace(/<.*?>/g,"");if(f.length>c){c=f.length;d=e}}return d}function s(a){if(a===null)return"0px";if(typeof a=="number"){if(a<0)return"0px";return a+"px"}var b=a.charCodeAt(a.length-1);if(b<48||b>57)return a;return a+"px"}function db(){var a=t.createElement("p"),b=a.style;b.width="100%";b.height="200px";b.padding="0px";var c=t.createElement("div");b=c.style;b.position=
"absolute";b.top="0px";b.left="0px";b.visibility="hidden";b.width="200px";b.height="150px";b.padding="0px";b.overflow="hidden";c.appendChild(a);t.body.appendChild(c);b=a.offsetWidth;c.style.overflow="scroll";a=a.offsetWidth;if(b==a)a=c.clientWidth;t.body.removeChild(c);return b-a}function X(a,b){var c,d,e,f,g,j,k=[],l=[],y=m.ext.oSort,u=a.aoData,w=a.aoColumns,A=a.oLanguage.oAria;if(!a.oFeatures.bServerSide&&(a.aaSorting.length!==0||a.aaSortingFixed!==null)){k=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):
a.aaSorting.slice();for(c=0;c<k.length;c++){d=k[c][0];e=x(a,d);f=a.aoColumns[d].sSortDataType;if(m.ext.afnSortData[f]){g=m.ext.afnSortData[f].call(a.oInstance,a,d,e);if(g.length===u.length){e=0;for(f=u.length;e<f;e++)R(a,e,d,g[e])}else M(a,0,"Returned data sort array (col "+d+") is the wrong length")}}c=0;for(d=a.aiDisplayMaster.length;c<d;c++)l[a.aiDisplayMaster[c]]=c;var Y=k.length,C;c=0;for(d=u.length;c<d;c++)for(e=0;e<Y;e++){C=w[k[e][0]].aDataSort;g=0;for(j=C.length;g<j;g++){f=w[C[g]].sType;f=
y[(f?f:"string")+"-pre"];u[c]._aSortData[C[g]]=f?f(E(a,c,C[g],"sort")):E(a,c,C[g],"sort")}}a.aiDisplayMaster.sort(function(ia,I){var P,Z,eb,$,ja;for(P=0;P<Y;P++){ja=w[k[P][0]].aDataSort;Z=0;for(eb=ja.length;Z<eb;Z++){$=w[ja[Z]].sType;$=y[($?$:"string")+"-"+k[P][1]](u[ia]._aSortData[ja[Z]],u[I]._aSortData[ja[Z]]);if($!==0)return $}}return y["numeric-asc"](l[ia],l[I])})}if((b===q||b)&&!a.oFeatures.bDeferRender)aa(a);c=0;for(d=a.aoColumns.length;c<d;c++){e=w[c].sTitle.replace(/<.*?>/g,"");b=w[c].nTh;
b.removeAttribute("aria-sort");b.removeAttribute("aria-label");if(w[c].bSortable)if(k.length>0&&k[0][0]==c){b.setAttribute("aria-sort",k[0][1]=="asc"?"ascending":"descending");b.setAttribute("aria-label",e+((w[c].asSorting[k[0][2]+1]?w[c].asSorting[k[0][2]+1]:w[c].asSorting[0])=="asc"?A.sSortAscending:A.sSortDescending))}else b.setAttribute("aria-label",e+(w[c].asSorting[0]=="asc"?A.sSortAscending:A.sSortDescending));else b.setAttribute("aria-label",e)}a.bSorted=true;i(a.oInstance).trigger("sort",
a);if(a.oFeatures.bFilter)U(a,a.oPreviousSearch,1);else{a.aiDisplay=a.aiDisplayMaster.slice();a._iDisplayStart=0;J(a);H(a)}}function wa(a,b,c,d){fb(b,{},function(e){if(a.aoColumns[c].bSortable!==false){var f=function(){var g,j;if(e.shiftKey){for(var k=false,l=0;l<a.aaSorting.length;l++)if(a.aaSorting[l][0]==c){k=true;g=a.aaSorting[l][0];j=a.aaSorting[l][2]+1;if(a.aoColumns[g].asSorting[j]){a.aaSorting[l][1]=a.aoColumns[g].asSorting[j];a.aaSorting[l][2]=j}else a.aaSorting.splice(l,1);break}k===false&&
a.aaSorting.push([c,a.aoColumns[c].asSorting[0],0])}else if(a.aaSorting.length==1&&a.aaSorting[0][0]==c){g=a.aaSorting[0][0];j=a.aaSorting[0][2]+1;a.aoColumns[g].asSorting[j]||(j=0);a.aaSorting[0][1]=a.aoColumns[g].asSorting[j];a.aaSorting[0][2]=j}else{a.aaSorting.splice(0,a.aaSorting.length);a.aaSorting.push([c,a.aoColumns[c].asSorting[0],0])}X(a)};if(a.oFeatures.bProcessing){N(a,true);setTimeout(function(){f();a.oFeatures.bServerSide||N(a,false)},0)}else f();typeof d=="function"&&d(a)}})}function aa(a){var b,
c,d,e,f,g=a.aoColumns.length,j=a.oClasses;for(b=0;b<g;b++)a.aoColumns[b].bSortable&&i(a.aoColumns[b].nTh).removeClass(j.sSortAsc+" "+j.sSortDesc+" "+a.aoColumns[b].sSortingClass);e=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):a.aaSorting.slice();for(b=0;b<a.aoColumns.length;b++)if(a.aoColumns[b].bSortable){f=a.aoColumns[b].sSortingClass;d=-1;for(c=0;c<e.length;c++)if(e[c][0]==b){f=e[c][1]=="asc"?j.sSortAsc:j.sSortDesc;d=c;break}i(a.aoColumns[b].nTh).addClass(f);if(a.bJUI){c=i("span."+
j.sSortIcon,a.aoColumns[b].nTh);c.removeClass(j.sSortJUIAsc+" "+j.sSortJUIDesc+" "+j.sSortJUI+" "+j.sSortJUIAscAllowed+" "+j.sSortJUIDescAllowed);c.addClass(d==-1?a.aoColumns[b].sSortingClassJUI:e[d][1]=="asc"?j.sSortJUIAsc:j.sSortJUIDesc)}}else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);f=j.sSortColumn;if(a.oFeatures.bSort&&a.oFeatures.bSortClasses){d=T(a);if(a.oFeatures.bDeferRender)i(d).removeClass(f+"1 "+f+"2 "+f+"3");else if(d.length>=g)for(b=0;b<g;b++)if(d[b].className.indexOf(f+
"1")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(f+"1",""))}else if(d[b].className.indexOf(f+"2")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(f+"2",""))}else if(d[b].className.indexOf(f+"3")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(" "+f+"3",""))}j=1;var k;for(b=0;b<e.length;b++){k=parseInt(e[b][0],10);c=0;for(a=d.length/g;c<a;c++)d[g*c+k].className+=" "+f+j;j<3&&j++}}}
function Fa(a){if(!(!a.oFeatures.bStateSave||a.bDestroying)){var b,c;b=a.oScroll.bInfinite;var d={iCreate:(new Date).getTime(),iStart:b?0:a._iDisplayStart,iEnd:b?a._iDisplayLength:a._iDisplayEnd,iLength:a._iDisplayLength,aaSorting:i.extend(true,[],a.aaSorting),oSearch:i.extend(true,{},a.oPreviousSearch),aoSearchCols:i.extend(true,[],a.aoPreSearchCols),abVisCols:[]};b=0;for(c=a.aoColumns.length;b<c;b++)d.abVisCols.push(a.aoColumns[b].bVisible);L(a,"aoStateSaveParams","stateSaveParams",[a,d]);a.fnStateSave.call(a.oInstance,
a,d)}}function gb(a,b){if(a.oFeatures.bStateSave){var c=a.fnStateLoad.call(a.oInstance,a);if(c){var d=L(a,"aoStateLoadParams","stateLoadParams",[a,c]);if(i.inArray(false,d)===-1){a.oLoadedState=i.extend(true,{},c);a._iDisplayStart=c.iStart;a.iInitDisplayStart=c.iStart;a._iDisplayEnd=c.iEnd;a._iDisplayLength=c.iLength;a.aaSorting=c.aaSorting.slice();a.saved_aaSorting=c.aaSorting.slice();i.extend(a.oPreviousSearch,c.oSearch);i.extend(true,a.aoPreSearchCols,c.aoSearchCols);b.saved_aoColumns=[];for(d=
0;d<c.abVisCols.length;d++){b.saved_aoColumns[d]={};b.saved_aoColumns[d].bVisible=c.abVisCols[d]}L(a,"aoStateLoaded","stateLoaded",[a,c])}}}}function mb(a,b,c,d,e){var f=new Date;f.setTime(f.getTime()+c*1E3);c=ka.location.pathname.split("/");a=a+"_"+c.pop().replace(/[\/:]/g,"").toLowerCase();var g;if(e!==null){g=typeof i.parseJSON==="function"?i.parseJSON(b):eval("("+b+")");b=e(a,g,f.toGMTString(),c.join("/")+"/")}else b=a+"="+encodeURIComponent(b)+"; expires="+f.toGMTString()+"; path="+c.join("/")+
"/";e="";f=9999999999999;if((hb(a)!==null?t.cookie.length:b.length+t.cookie.length)+10>4096){a=t.cookie.split(";");for(var j=0,k=a.length;j<k;j++)if(a[j].indexOf(d)!=-1){var l=a[j].split("=");try{g=eval("("+decodeURIComponent(l[1])+")")}catch(y){continue}if(g.iCreate&&g.iCreate<f){e=l[0];f=g.iCreate}}if(e!=="")t.cookie=e+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path="+c.join("/")+"/"}t.cookie=b}function hb(a){var b=ka.location.pathname.split("/");a=a+"_"+b[b.length-1].replace(/[\/:]/g,"").toLowerCase()+
"=";b=t.cookie.split(";");for(var c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)===0)return decodeURIComponent(d.substring(a.length,d.length))}return null}function B(a){for(var b=0;b<m.settings.length;b++)if(m.settings[b].nTable===a)return m.settings[b];return null}function ea(a){var b=[];a=a.aoData;for(var c=0,d=a.length;c<d;c++)a[c].nTr!==null&&b.push(a[c].nTr);return b}function T(a,b){var c=[],d,e,f,g,j;e=0;var k=a.aoData.length;if(b!==q){e=b;k=b+
1}for(e=e;e<k;e++){j=a.aoData[e];if(j.nTr!==null){b=[];f=0;for(g=j.nTr.childNodes.length;f<g;f++){d=j.nTr.childNodes[f].nodeName.toLowerCase();if(d=="td"||d=="th")b.push(j.nTr.childNodes[f])}f=d=0;for(g=a.aoColumns.length;f<g;f++)if(a.aoColumns[f].bVisible)c.push(b[f-d]);else{c.push(j._anHidden[f]);d++}}}return c}function M(a,b,c){a=a===null?"DataTables warning: "+c:"DataTables warning (table id = '"+a.sTableId+"'): "+c;if(b===0)if(m.ext.sErrMode=="alert")alert(a);else throw new Error(a);else ka.console&&
console.log&&console.log(a)}function r(a,b,c,d){if(d===q)d=c;if(b[c]!==q)a[d]=b[c]}function ib(a,b){var c;for(var d in b)if(b.hasOwnProperty(d)){c=b[d];if(typeof h[d]==="object"&&c!==null&&i.isArray(c)===false)i.extend(true,a[d],c);else a[d]=c}return a}function fb(a,b,c){i(a).bind("click.DT",b,function(d){a.blur();c(d)}).bind("keypress.DT",b,function(d){d.which===13&&c(d)}).bind("selectstart.DT",function(){return false})}function K(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function L(a,b,c,d){b=a[b];
for(var e=[],f=b.length-1;f>=0;f--)e.push(b[f].fn.apply(a.oInstance,d));c!==null&&i(a.oInstance).trigger(c,d);return e}function jb(a){var b=i('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; height:50px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];t.body.appendChild(b);a.oBrowser.bScrollOversize=i("#DT_BrowserTest",b)[0].offsetWidth===100?true:
false;t.body.removeChild(b)}function kb(a){return function(){var b=[B(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.oApi[a].apply(this,b)}}var fa=/\[.*?\]$/,lb=ka.JSON?JSON.stringify:function(a){var b=typeof a;if(b!=="object"||a===null){if(b==="string")a='"'+a+'"';return a+""}var c,d,e=[],f=i.isArray(a);for(c in a){d=a[c];b=typeof d;if(b==="string")d='"'+d+'"';else if(b==="object"&&d!==null)d=lb(d);e.push((f?"":'"'+c+'":')+d)}return(f?"[":"{")+e+(f?"]":"}")};this.$=
function(a,b){var c,d=[],e;c=B(this[m.ext.iApiIndex]);var f=c.aoData,g=c.aiDisplay,j=c.aiDisplayMaster;b||(b={});b=i.extend({},{filter:"none",order:"current",page:"all"},b);if(b.page=="current"){b=c._iDisplayStart;for(c=c.fnDisplayEnd();b<c;b++)(e=f[g[b]].nTr)&&d.push(e)}else if(b.order=="current"&&b.filter=="none"){b=0;for(c=j.length;b<c;b++)(e=f[j[b]].nTr)&&d.push(e)}else if(b.order=="current"&&b.filter=="applied"){b=0;for(c=g.length;b<c;b++)(e=f[g[b]].nTr)&&d.push(e)}else if(b.order=="original"&&
b.filter=="none"){b=0;for(c=f.length;b<c;b++)(e=f[b].nTr)&&d.push(e)}else if(b.order=="original"&&b.filter=="applied"){b=0;for(c=f.length;b<c;b++){e=f[b].nTr;i.inArray(b,g)!==-1&&e&&d.push(e)}}else M(c,1,"Unknown selection options");f=i(d);d=f.filter(a);a=f.find(a);return i([].concat(i.makeArray(d),i.makeArray(a)))};this._=function(a,b){var c=[],d=this.$(a,b);a=0;for(b=d.length;a<b;a++)c.push(this.fnGetData(d[a]));return c};this.fnAddData=function(a,b){if(a.length===0)return[];var c=[],d,e=B(this[m.ext.iApiIndex]);
if(typeof a[0]==="object"&&a[0]!==null)for(var f=0;f<a.length;f++){d=O(e,a[f]);if(d==-1)return c;c.push(d)}else{d=O(e,a);if(d==-1)return c;c.push(d)}e.aiDisplay=e.aiDisplayMaster.slice();if(b===q||b)pa(e);return c};this.fnAdjustColumnSizing=function(a){var b=B(this[m.ext.iApiIndex]);o(b);if(a===q||a)this.fnDraw(false);else if(b.oScroll.sX!==""||b.oScroll.sY!=="")this.oApi._fnScrollDraw(b)};this.fnClearTable=function(a){var b=B(this[m.ext.iApiIndex]);ua(b);if(a===q||a)H(b)};this.fnClose=function(a){for(var b=
B(this[m.ext.iApiIndex]),c=0;c<b.aoOpenRows.length;c++)if(b.aoOpenRows[c].nParent==a){(a=b.aoOpenRows[c].nTr.parentNode)&&a.removeChild(b.aoOpenRows[c].nTr);b.aoOpenRows.splice(c,1);return 0}return 1};this.fnDeleteRow=function(a,b,c){var d=B(this[m.ext.iApiIndex]),e,f;a=typeof a==="object"?S(d,a):a;var g=d.aoData.splice(a,1);e=0;for(f=d.aoData.length;e<f;e++)if(d.aoData[e].nTr!==null)d.aoData[e].nTr._DT_RowIndex=e;e=i.inArray(a,d.aiDisplay);d.asDataSearch.splice(e,1);va(d.aiDisplayMaster,a);va(d.aiDisplay,
a);typeof b==="function"&&b.call(this,d,g);if(d._iDisplayStart>=d.fnRecordsDisplay()){d._iDisplayStart-=d._iDisplayLength;if(d._iDisplayStart<0)d._iDisplayStart=0}if(c===q||c){J(d);H(d)}return g};this.fnDestroy=function(a){var b=B(this[m.ext.iApiIndex]),c=b.nTableWrapper.parentNode,d=b.nTBody,e,f;a=a===q?false:true;b.bDestroying=true;L(b,"aoDestroyCallback","destroy",[b]);e=0;for(f=b.aoColumns.length;e<f;e++)b.aoColumns[e].bVisible===false&&this.fnSetColumnVis(e,true);i(b.nTableWrapper).find("*").andSelf().unbind(".DT");
i("tbody>tr>td."+b.oClasses.sRowEmpty,b.nTable).parent().remove();if(b.nTable!=b.nTHead.parentNode){i(b.nTable).children("thead").remove();b.nTable.appendChild(b.nTHead)}if(b.nTFoot&&b.nTable!=b.nTFoot.parentNode){i(b.nTable).children("tfoot").remove();b.nTable.appendChild(b.nTFoot)}b.nTable.parentNode.removeChild(b.nTable);i(b.nTableWrapper).remove();b.aaSorting=[];b.aaSortingFixed=[];aa(b);i(ea(b)).removeClass(b.asStripeClasses.join(" "));i("th, td",b.nTHead).removeClass([b.oClasses.sSortable,b.oClasses.sSortableAsc,
b.oClasses.sSortableDesc,b.oClasses.sSortableNone].join(" "));if(b.bJUI){i("th span."+b.oClasses.sSortIcon+", td span."+b.oClasses.sSortIcon,b.nTHead).remove();i("th, td",b.nTHead).each(function(){var g=i("div."+b.oClasses.sSortJUIWrapper,this),j=g.contents();i(this).append(j);g.remove()})}if(!a&&b.nTableReinsertBefore)c.insertBefore(b.nTable,b.nTableReinsertBefore);else a||c.appendChild(b.nTable);e=0;for(f=b.aoData.length;e<f;e++)b.aoData[e].nTr!==null&&d.appendChild(b.aoData[e].nTr);if(b.oFeatures.bAutoWidth===
true)b.nTable.style.width=s(b.sDestroyWidth);i(d).children("tr:even").addClass(b.asDestroyStripes[0]);i(d).children("tr:odd").addClass(b.asDestroyStripes[1]);e=0;for(f=m.settings.length;e<f;e++)m.settings[e]==b&&m.settings.splice(e,1);b=null};this.fnDraw=function(a){var b=B(this[m.ext.iApiIndex]);if(a===false){J(b);H(b)}else pa(b)};this.fnFilter=function(a,b,c,d,e,f){var g=B(this[m.ext.iApiIndex]);if(g.oFeatures.bFilter){if(c===q||c===null)c=false;if(d===q||d===null)d=true;if(e===q||e===null)e=true;
if(f===q||f===null)f=true;if(b===q||b===null){U(g,{sSearch:a+"",bRegex:c,bSmart:d,bCaseInsensitive:f},1);if(e&&g.aanFeatures.f){b=g.aanFeatures.f;c=0;for(d=b.length;c<d;c++)i(b[c]._DT_Input).val(a)}}else{i.extend(g.aoPreSearchCols[b],{sSearch:a+"",bRegex:c,bSmart:d,bCaseInsensitive:f});U(g,g.oPreviousSearch,1)}}};this.fnGetData=function(a,b){var c=B(this[m.ext.iApiIndex]);if(a!==q){var d=a;if(typeof a==="object"){var e=a.nodeName.toLowerCase();if(e==="tr")d=S(c,a);else if(e==="td"){d=S(c,a.parentNode);
b=ta(c,d,a)}}if(b!==q)return E(c,d,b,"");return c.aoData[d]!==q?c.aoData[d]._aData:null}return na(c)};this.fnGetNodes=function(a){var b=B(this[m.ext.iApiIndex]);if(a!==q)return b.aoData[a]!==q?b.aoData[a].nTr:null;return ea(b)};this.fnGetPosition=function(a){var b=B(this[m.ext.iApiIndex]),c=a.nodeName.toUpperCase();if(c=="TR")return S(b,a);else if(c=="TD"||c=="TH"){c=S(b,a.parentNode);a=ta(b,c,a);return[c,x(b,a),a]}return null};this.fnIsOpen=function(a){for(var b=B(this[m.ext.iApiIndex]),c=0;c<b.aoOpenRows.length;c++)if(b.aoOpenRows[c].nParent==
a)return true;return false};this.fnOpen=function(a,b,c){var d=B(this[m.ext.iApiIndex]),e=ea(d);if(i.inArray(a,e)!==-1){this.fnClose(a);e=t.createElement("tr");var f=t.createElement("td");e.appendChild(f);f.className=c;f.colSpan=D(d);if(typeof b==="string")f.innerHTML=b;else i(f).html(b);b=i("tr",d.nTBody);i.inArray(a,b)!=-1&&i(e).insertAfter(a);d.aoOpenRows.push({nTr:e,nParent:a});return e}};this.fnPageChange=function(a,b){var c=B(this[m.ext.iApiIndex]);Ea(c,a);J(c);if(b===q||b)H(c)};this.fnSetColumnVis=
function(a,b,c){var d=B(this[m.ext.iApiIndex]),e,f,g=d.aoColumns,j=d.aoData,k,l;if(g[a].bVisible!=b){if(b){for(e=f=0;e<a;e++)g[e].bVisible&&f++;l=f>=D(d);if(!l)for(e=a;e<g.length;e++)if(g[e].bVisible){k=e;break}e=0;for(f=j.length;e<f;e++)if(j[e].nTr!==null)l?j[e].nTr.appendChild(j[e]._anHidden[a]):j[e].nTr.insertBefore(j[e]._anHidden[a],T(d,e)[k])}else{e=0;for(f=j.length;e<f;e++)if(j[e].nTr!==null){k=T(d,e)[a];j[e]._anHidden[a]=k;k.parentNode.removeChild(k)}}g[a].bVisible=b;ha(d,d.aoHeader);d.nTFoot&&
ha(d,d.aoFooter);e=0;for(f=d.aoOpenRows.length;e<f;e++)d.aoOpenRows[e].nTr.colSpan=D(d);if(c===q||c){o(d);H(d)}Fa(d)}};this.fnSettings=function(){return B(this[m.ext.iApiIndex])};this.fnSort=function(a){var b=B(this[m.ext.iApiIndex]);b.aaSorting=a;X(b)};this.fnSortListener=function(a,b,c){wa(B(this[m.ext.iApiIndex]),a,b,c)};this.fnUpdate=function(a,b,c,d,e){var f=B(this[m.ext.iApiIndex]);b=typeof b==="object"?S(f,b):b;if(i.isArray(a)&&c===q){f.aoData[b]._aData=a.slice();for(c=0;c<f.aoColumns.length;c++)this.fnUpdate(E(f,
b,c),b,c,false,false)}else if(i.isPlainObject(a)&&c===q){f.aoData[b]._aData=i.extend(true,{},a);for(c=0;c<f.aoColumns.length;c++)this.fnUpdate(E(f,b,c),b,c,false,false)}else{R(f,b,c,a);a=E(f,b,c,"display");var g=f.aoColumns[c];if(g.fnRender!==null){a=ca(f,b,c);g.bUseRendered&&R(f,b,c,a)}if(f.aoData[b].nTr!==null)T(f,b)[c].innerHTML=a}c=i.inArray(b,f.aiDisplay);f.asDataSearch[c]=Ba(f,ma(f,b,"filter",z(f,"bSearchable")));if(e===q||e)o(f);if(d===q||d)pa(f);return 0};this.fnVersionCheck=m.ext.fnVersionCheck;
this.oApi={_fnExternApiFunc:kb,_fnInitialise:qa,_fnInitComplete:oa,_fnLanguageCompat:Da,_fnAddColumn:n,_fnColumnOptions:p,_fnAddData:O,_fnCreateTr:sa,_fnGatherData:da,_fnBuildHead:Ja,_fnDrawHead:ha,_fnDraw:H,_fnReDraw:pa,_fnAjaxUpdate:Ka,_fnAjaxParameters:Sa,_fnAjaxUpdateDraw:Ta,_fnServerParams:ya,_fnAddOptionsHtml:La,_fnFeatureHtmlTable:Pa,_fnScrollDraw:Za,_fnAdjustColumnSizing:o,_fnFeatureHtmlFilter:Na,_fnFilterComplete:U,_fnFilterCustom:Wa,_fnFilterColumn:Va,_fnFilter:Ua,_fnBuildSearchArray:za,
_fnBuildSearchRow:Ba,_fnFilterCreateSearch:Aa,_fnDataToSearch:Xa,_fnSort:X,_fnSortAttachListener:wa,_fnSortingClasses:aa,_fnFeatureHtmlPaginate:Ra,_fnPageChange:Ea,_fnFeatureHtmlInfo:Qa,_fnUpdateInfo:Ya,_fnFeatureHtmlLength:Ma,_fnFeatureHtmlProcessing:Oa,_fnProcessingDisplay:N,_fnVisibleToColumnIndex:v,_fnColumnIndexToVisible:x,_fnNodeToDataIndex:S,_fnVisbleColumns:D,_fnCalculateEnd:J,_fnConvertToWidth:$a,_fnCalculateColumnWidths:ra,_fnScrollingWidthAdjust:bb,_fnGetWidestNode:ab,_fnGetMaxLenString:cb,
_fnStringToCss:s,_fnDetectType:F,_fnSettingsFromNode:B,_fnGetDataMaster:na,_fnGetTrNodes:ea,_fnGetTdNodes:T,_fnEscapeRegex:Ca,_fnDeleteIndex:va,_fnReOrderIndex:G,_fnColumnOrdering:Q,_fnLog:M,_fnClearTable:ua,_fnSaveState:Fa,_fnLoadState:gb,_fnCreateCookie:mb,_fnReadCookie:hb,_fnDetectHeader:ga,_fnGetUniqueThs:W,_fnScrollBarWidth:db,_fnApplyToChildren:V,_fnMap:r,_fnGetRowData:ma,_fnGetCellData:E,_fnSetCellData:R,_fnGetObjectDataFn:ba,_fnSetObjectDataFn:Ia,_fnApplyColumnDefs:la,_fnBindAction:fb,_fnExtend:ib,
_fnCallbackReg:K,_fnCallbackFire:L,_fnJsonString:lb,_fnRender:ca,_fnNodeToColumnIndex:ta,_fnInfoMacros:xa,_fnBrowserDetect:jb,_fnGetColumns:z};i.extend(m.ext.oApi,this.oApi);for(var Ga in m.ext.oApi)if(Ga)this[Ga]=kb(Ga);var Ha=this;return this.each(function(){var a=0,b,c,d;c=this.getAttribute("id");var e=false,f=false;if(this.nodeName.toLowerCase()!="table")M(null,0,"Attempted to initialise DataTables on a node which is not a table: "+this.nodeName);else{a=0;for(b=m.settings.length;a<b;a++){if(m.settings[a].nTable==
this)if(h===q||h.bRetrieve)return m.settings[a].oInstance;else if(h.bDestroy){m.settings[a].oInstance.fnDestroy();break}else{M(m.settings[a],0,"Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy");return}if(m.settings[a].sTableId==this.id){m.settings.splice(a,1);break}}if(c===null||c==="")this.id=c="DataTables_Table_"+m.ext._oExternConfig.iNextUnique++;var g=i.extend(true,{},m.models.oSettings,{nTable:this,
oApi:Ha.oApi,oInit:h,sDestroyWidth:i(this).width(),sInstance:c,sTableId:c});m.settings.push(g);g.oInstance=Ha.length===1?Ha:i(this).dataTable();h||(h={});h.oLanguage&&Da(h.oLanguage);h=ib(i.extend(true,{},m.defaults),h);r(g.oFeatures,h,"bPaginate");r(g.oFeatures,h,"bLengthChange");r(g.oFeatures,h,"bFilter");r(g.oFeatures,h,"bSort");r(g.oFeatures,h,"bInfo");r(g.oFeatures,h,"bProcessing");r(g.oFeatures,h,"bAutoWidth");r(g.oFeatures,h,"bSortClasses");r(g.oFeatures,h,"bServerSide");r(g.oFeatures,h,"bDeferRender");
r(g.oScroll,h,"sScrollX","sX");r(g.oScroll,h,"sScrollXInner","sXInner");r(g.oScroll,h,"sScrollY","sY");r(g.oScroll,h,"bScrollCollapse","bCollapse");r(g.oScroll,h,"bScrollInfinite","bInfinite");r(g.oScroll,h,"iScrollLoadGap","iLoadGap");r(g.oScroll,h,"bScrollAutoCss","bAutoCss");r(g,h,"asStripeClasses");r(g,h,"asStripClasses","asStripeClasses");r(g,h,"fnServerData");r(g,h,"fnFormatNumber");r(g,h,"sServerMethod");r(g,h,"aaSorting");r(g,h,"aaSortingFixed");r(g,h,"aLengthMenu");r(g,h,"sPaginationType");
r(g,h,"sAjaxSource");r(g,h,"sAjaxDataProp");r(g,h,"iCookieDuration");r(g,h,"sCookiePrefix");r(g,h,"sDom");r(g,h,"bSortCellsTop");r(g,h,"iTabIndex");r(g,h,"oSearch","oPreviousSearch");r(g,h,"aoSearchCols","aoPreSearchCols");r(g,h,"iDisplayLength","_iDisplayLength");r(g,h,"bJQueryUI","bJUI");r(g,h,"fnCookieCallback");r(g,h,"fnStateLoad");r(g,h,"fnStateSave");r(g.oLanguage,h,"fnInfoCallback");K(g,"aoDrawCallback",h.fnDrawCallback,"user");K(g,"aoServerParams",h.fnServerParams,"user");K(g,"aoStateSaveParams",
h.fnStateSaveParams,"user");K(g,"aoStateLoadParams",h.fnStateLoadParams,"user");K(g,"aoStateLoaded",h.fnStateLoaded,"user");K(g,"aoRowCallback",h.fnRowCallback,"user");K(g,"aoRowCreatedCallback",h.fnCreatedRow,"user");K(g,"aoHeaderCallback",h.fnHeaderCallback,"user");K(g,"aoFooterCallback",h.fnFooterCallback,"user");K(g,"aoInitComplete",h.fnInitComplete,"user");K(g,"aoPreDrawCallback",h.fnPreDrawCallback,"user");if(g.oFeatures.bServerSide&&g.oFeatures.bSort&&g.oFeatures.bSortClasses)K(g,"aoDrawCallback",
aa,"server_side_sort_classes");else g.oFeatures.bDeferRender&&K(g,"aoDrawCallback",aa,"defer_sort_classes");if(h.bJQueryUI){i.extend(g.oClasses,m.ext.oJUIClasses);if(h.sDom===m.defaults.sDom&&m.defaults.sDom==="lfrtip")g.sDom='<"H"lfr>t<"F"ip>'}else i.extend(g.oClasses,m.ext.oStdClasses);i(this).addClass(g.oClasses.sTable);if(g.oScroll.sX!==""||g.oScroll.sY!=="")g.oScroll.iBarWidth=db();if(g.iInitDisplayStart===q){g.iInitDisplayStart=h.iDisplayStart;g._iDisplayStart=h.iDisplayStart}if(h.bStateSave){g.oFeatures.bStateSave=
true;gb(g,h);K(g,"aoDrawCallback",Fa,"state_save")}if(h.iDeferLoading!==null){g.bDeferLoading=true;a=i.isArray(h.iDeferLoading);g._iRecordsDisplay=a?h.iDeferLoading[0]:h.iDeferLoading;g._iRecordsTotal=a?h.iDeferLoading[1]:h.iDeferLoading}if(h.aaData!==null)f=true;if(h.oLanguage.sUrl!==""){g.oLanguage.sUrl=h.oLanguage.sUrl;i.getJSON(g.oLanguage.sUrl,null,function(k){Da(k);i.extend(true,g.oLanguage,h.oLanguage,k);qa(g)});e=true}else i.extend(true,g.oLanguage,h.oLanguage);if(h.asStripeClasses===null)g.asStripeClasses=
[g.oClasses.sStripeOdd,g.oClasses.sStripeEven];c=false;d=i(this).children("tbody").children("tr");a=0;for(b=g.asStripeClasses.length;a<b;a++)if(d.filter(":lt(2)").hasClass(g.asStripeClasses[a])){c=true;break}if(c){g.asDestroyStripes=["",""];if(i(d[0]).hasClass(g.oClasses.sStripeOdd))g.asDestroyStripes[0]+=g.oClasses.sStripeOdd+" ";if(i(d[0]).hasClass(g.oClasses.sStripeEven))g.asDestroyStripes[0]+=g.oClasses.sStripeEven;if(i(d[1]).hasClass(g.oClasses.sStripeOdd))g.asDestroyStripes[1]+=g.oClasses.sStripeOdd+
" ";if(i(d[1]).hasClass(g.oClasses.sStripeEven))g.asDestroyStripes[1]+=g.oClasses.sStripeEven;d.removeClass(g.asStripeClasses.join(" "))}c=[];a=this.getElementsByTagName("thead");if(a.length!==0){ga(g.aoHeader,a[0]);c=W(g)}if(h.aoColumns===null){d=[];a=0;for(b=c.length;a<b;a++)d.push(null)}else d=h.aoColumns;a=0;for(b=d.length;a<b;a++){if(h.saved_aoColumns!==q&&h.saved_aoColumns.length==b){if(d[a]===null)d[a]={};d[a].bVisible=h.saved_aoColumns[a].bVisible}n(g,c?c[a]:null)}la(g,h.aoColumnDefs,d,function(k,
l){p(g,k,l)});a=0;for(b=g.aaSorting.length;a<b;a++){if(g.aaSorting[a][0]>=g.aoColumns.length)g.aaSorting[a][0]=0;var j=g.aoColumns[g.aaSorting[a][0]];if(g.aaSorting[a][2]===q)g.aaSorting[a][2]=0;if(h.aaSorting===q&&g.saved_aaSorting===q)g.aaSorting[a][1]=j.asSorting[0];c=0;for(d=j.asSorting.length;c<d;c++)if(g.aaSorting[a][1]==j.asSorting[c]){g.aaSorting[a][2]=c;break}}aa(g);jb(g);a=i(this).children("caption").each(function(){this._captionSide=i(this).css("caption-side")});b=i(this).children("thead");
if(b.length===0){b=[t.createElement("thead")];this.appendChild(b[0])}g.nTHead=b[0];b=i(this).children("tbody");if(b.length===0){b=[t.createElement("tbody")];this.appendChild(b[0])}g.nTBody=b[0];g.nTBody.setAttribute("role","alert");g.nTBody.setAttribute("aria-live","polite");g.nTBody.setAttribute("aria-relevant","all");b=i(this).children("tfoot");if(b.length===0&&a.length>0&&(g.oScroll.sX!==""||g.oScroll.sY!=="")){b=[t.createElement("tfoot")];this.appendChild(b[0])}if(b.length>0){g.nTFoot=b[0];ga(g.aoFooter,
g.nTFoot)}if(f)for(a=0;a<h.aaData.length;a++)O(g,h.aaData[a]);else da(g);g.aiDisplay=g.aiDisplayMaster.slice();g.bInitialised=true;e===false&&qa(g)}})};m.fnVersionCheck=function(h){var n=function(z,F){for(;z.length<F;)z+="0";return z},p=m.ext.sVersion.split(".");h=h.split(".");for(var o="",v="",x=0,D=h.length;x<D;x++){o+=n(p[x],3);v+=n(h[x],3)}return parseInt(o,10)>=parseInt(v,10)};m.fnIsDataTable=function(h){for(var n=m.settings,p=0;p<n.length;p++)if(n[p].nTable===h||n[p].nScrollHead===h||n[p].nScrollFoot===
h)return true;return false};m.fnTables=function(h){var n=[];jQuery.each(m.settings,function(p,o){if(!h||h===true&&i(o.nTable).is(":visible"))n.push(o.nTable)});return n};m.version="1.9.3";m.settings=[];m.models={};m.models.ext={afnFiltering:[],afnSortData:[],aoFeatures:[],aTypes:[],fnVersionCheck:m.fnVersionCheck,iApiIndex:0,ofnSearch:{},oApi:{},oStdClasses:{},oJUIClasses:{},oPagination:{},oSort:{},sVersion:m.version,sErrMode:"alert",_oExternConfig:{iNextUnique:0}};m.models.oSearch={bCaseInsensitive:true,
sSearch:"",bRegex:false,bSmart:true};m.models.oRow={nTr:null,_aData:[],_aSortData:[],_anHidden:[],_sRowStripe:""};m.models.oColumn={aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bUseRendered:null,bVisible:null,_bAutoType:true,fnCreatedCell:null,fnGetData:null,fnRender:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,
sWidthOrig:null};m.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:true,bDeferRender:false,bDestroy:false,bFilter:true,bInfo:true,bJQueryUI:false,bLengthChange:true,bPaginate:true,bProcessing:false,bRetrieve:false,bScrollAutoCss:true,bScrollCollapse:false,bScrollInfinite:false,bServerSide:false,bSort:true,bSortCellsTop:false,bSortClasses:true,bStateSave:false,fnCookieCallback:null,
fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(h){if(h<1E3)return h;var n=h+"";h=n.split("");var p="";n=n.length;for(var o=0;o<n;o++){if(o%3===0&&o!==0)p=this.oLanguage.sInfoThousands+p;p=h[n-o-1]+p}return p},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:function(h,n,p,o){o.jqXHR=i.ajax({url:h,data:n,success:function(v){v.sError&&o.oApi._fnLog(o,0,v.sError);i(o.oInstance).trigger("xhr",[o,v]);
p(v)},dataType:"json",cache:false,type:o.sServerMethod,error:function(v,x){x=="parsererror"&&o.oApi._fnLog(o,0,"DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")}})},fnServerParams:null,fnStateLoad:function(h){h=this.oApi._fnReadCookie(h.sCookiePrefix+h.sInstance);var n;try{n=typeof i.parseJSON==="function"?i.parseJSON(h):eval("("+h+")")}catch(p){n=null}return n},fnStateLoadParams:null,fnStateLoaded:null,fnStateSave:function(h,n){this.oApi._fnCreateCookie(h.sCookiePrefix+
h.sInstance,this.oApi._fnJsonString(n),h.iCookieDuration,h.sCookiePrefix,h.fnCookieCallback)},fnStateSaveParams:null,iCookieDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iScrollLoadGap:100,iTabIndex:0,oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",
sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sInfoThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sUrl:"",sZeroRecords:"No matching records found"},oSearch:i.extend({},m.models.oSearch),sAjaxDataProp:"aaData",sAjaxSource:null,sCookiePrefix:"SpryMedia_DataTables_",sDom:"lfrtip",sPaginationType:"two_button",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET"};
m.defaults.columns={aDataSort:null,asSorting:["asc","desc"],bSearchable:true,bSortable:true,bUseRendered:true,bVisible:true,fnCreatedCell:null,fnRender:null,iDataSort:-1,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortClasses:null,
bStateSave:null},oScroll:{bAutoCss:null,bCollapse:null,bInfinite:null,iBarWidth:0,iLoadGap:null,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:false},aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],asDataSearch:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:null,asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],
aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:false,bInitialised:false,aoOpenRows:[],sDom:null,sPaginationType:"two_button",iCookieDuration:0,sCookiePrefix:"",fnCookieCallback:null,aoStateSave:[],aoStateLoad:[],oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:true,jqXHR:null,fnServerData:null,aoServerParams:[],sServerMethod:null,
fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:false,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iDisplayEnd:10,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:false,bSorted:false,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return this.oFeatures.bServerSide?parseInt(this._iRecordsTotal,10):this.aiDisplayMaster.length},fnRecordsDisplay:function(){return this.oFeatures.bServerSide?parseInt(this._iRecordsDisplay,10):this.aiDisplay.length},
fnDisplayEnd:function(){return this.oFeatures.bServerSide?this.oFeatures.bPaginate===false||this._iDisplayLength==-1?this._iDisplayStart+this.aiDisplay.length:Math.min(this._iDisplayStart+this._iDisplayLength,this._iRecordsDisplay):this._iDisplayEnd},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null};m.ext=i.extend(true,{},m.models.ext);i.extend(m.ext.oStdClasses,{sTable:"dataTable",sPagePrevEnabled:"paginate_enabled_previous",sPagePrevDisabled:"paginate_disabled_previous",
sPageNextEnabled:"paginate_enabled_next",sPageNextDisabled:"paginate_disabled_next",sPageJUINext:"",sPageJUIPrev:"",sPageButton:"paginate_button",sPageButtonActive:"paginate_active",sPageButtonStaticDisabled:"paginate_button paginate_button_disabled",sPageFirst:"first",sPagePrevious:"previous",sPageNext:"next",sPageLast:"last",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",
sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",
sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sFooterTH:"",sJUIHeader:"",sJUIFooter:""});i.extend(m.ext.oJUIClasses,m.ext.oStdClasses,{sPagePrevEnabled:"fg-button ui-button ui-state-default ui-corner-left",sPagePrevDisabled:"fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",sPageNextEnabled:"fg-button ui-button ui-state-default ui-corner-right",sPageNextDisabled:"fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",sPageJUINext:"ui-icon ui-icon-circle-arrow-e",
sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w",sPageButton:"fg-button ui-button ui-state-default",sPageButtonActive:"fg-button ui-button ui-state-default ui-state-disabled",sPageButtonStaticDisabled:"fg-button ui-button ui-state-default ui-state-disabled",sPageFirst:"first ui-corner-tl ui-corner-bl",sPageLast:"last ui-corner-tr ui-corner-br",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:"ui-state-default",sSortDesc:"ui-state-default",
sSortable:"ui-state-default",sSortableAsc:"ui-state-default",sSortableDesc:"ui-state-default",sSortableNone:"ui-state-default",sSortJUIAsc:"css_right ui-icon ui-icon-triangle-1-n",sSortJUIDesc:"css_right ui-icon ui-icon-triangle-1-s",sSortJUI:"css_right ui-icon ui-icon-carat-2-n-s",sSortJUIAscAllowed:"css_right ui-icon ui-icon-carat-1-n",sSortJUIDescAllowed:"css_right ui-icon ui-icon-carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead ui-state-default",
sScrollFoot:"dataTables_scrollFoot ui-state-default",sFooterTH:"ui-state-default",sJUIHeader:"fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",sJUIFooter:"fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"});i.extend(m.ext.oPagination,{two_button:{fnInit:function(h,n,p){var o=h.oLanguage.oPaginate,v=function(D){h.oApi._fnPageChange(h,D.data.action)&&p(h)};o=!h.bJUI?'<a class="'+h.oClasses.sPagePrevDisabled+'" tabindex="'+h.iTabIndex+
'" role="button">'+o.sPrevious+'</a><a class="'+h.oClasses.sPageNextDisabled+'" tabindex="'+h.iTabIndex+'" role="button">'+o.sNext+"</a>":'<a class="'+h.oClasses.sPagePrevDisabled+'" tabindex="'+h.iTabIndex+'" role="button"><span class="'+h.oClasses.sPageJUIPrev+'"></span></a><a class="'+h.oClasses.sPageNextDisabled+'" tabindex="'+h.iTabIndex+'" role="button"><span class="'+h.oClasses.sPageJUINext+'"></span></a>';i(n).append(o);var x=i("a",n);o=x[0];x=x[1];h.oApi._fnBindAction(o,{action:"previous"},
v);h.oApi._fnBindAction(x,{action:"next"},v);if(!h.aanFeatures.p){n.id=h.sTableId+"_paginate";o.id=h.sTableId+"_previous";x.id=h.sTableId+"_next";o.setAttribute("aria-controls",h.sTableId);x.setAttribute("aria-controls",h.sTableId)}},fnUpdate:function(h){if(h.aanFeatures.p)for(var n=h.oClasses,p=h.aanFeatures.p,o=0,v=p.length;o<v;o++)if(p[o].childNodes.length!==0){p[o].childNodes[0].className=h._iDisplayStart===0?n.sPagePrevDisabled:n.sPagePrevEnabled;p[o].childNodes[1].className=h.fnDisplayEnd()==
h.fnRecordsDisplay()?n.sPageNextDisabled:n.sPageNextEnabled}}},iFullNumbersShowPages:5,full_numbers:{fnInit:function(h,n,p){var o=h.oLanguage.oPaginate,v=h.oClasses,x=function(F){h.oApi._fnPageChange(h,F.data.action)&&p(h)};i(n).append('<a  tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPageFirst+'">'+o.sFirst+'</a><a  tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPagePrevious+'">'+o.sPrevious+'</a><span></span><a tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPageNext+
'">'+o.sNext+'</a><a tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPageLast+'">'+o.sLast+"</a>");var D=i("a",n);o=D[0];v=D[1];var z=D[2];D=D[3];h.oApi._fnBindAction(o,{action:"first"},x);h.oApi._fnBindAction(v,{action:"previous"},x);h.oApi._fnBindAction(z,{action:"next"},x);h.oApi._fnBindAction(D,{action:"last"},x);if(!h.aanFeatures.p){n.id=h.sTableId+"_paginate";o.id=h.sTableId+"_first";v.id=h.sTableId+"_previous";z.id=h.sTableId+"_next";D.id=h.sTableId+"_last"}},fnUpdate:function(h,n){if(h.aanFeatures.p){var p=
m.ext.oPagination.iFullNumbersShowPages,o=Math.floor(p/2),v=Math.ceil(h.fnRecordsDisplay()/h._iDisplayLength),x=Math.ceil(h._iDisplayStart/h._iDisplayLength)+1,D="",z,F=h.oClasses,G,Q=h.aanFeatures.p,la=function(O){h.oApi._fnBindAction(this,{page:O+z-1},function(da){h.oApi._fnPageChange(h,da.data.page);n(h);da.preventDefault()})};if(h._iDisplayLength===-1)x=o=z=1;else if(v<p){z=1;o=v}else if(x<=o){z=1;o=p}else if(x>=v-o){z=v-p+1;o=v}else{z=x-Math.ceil(p/2)+1;o=z+p-1}for(p=z;p<=o;p++)D+=x!==p?'<a tabindex="'+
h.iTabIndex+'" class="'+F.sPageButton+'">'+h.fnFormatNumber(p)+"</a>":'<a tabindex="'+h.iTabIndex+'" class="'+F.sPageButtonActive+'">'+h.fnFormatNumber(p)+"</a>";p=0;for(o=Q.length;p<o;p++)if(Q[p].childNodes.length!==0){i("span:eq(0)",Q[p]).html(D).children("a").each(la);G=Q[p].getElementsByTagName("a");G=[G[0],G[1],G[G.length-2],G[G.length-1]];i(G).removeClass(F.sPageButton+" "+F.sPageButtonActive+" "+F.sPageButtonStaticDisabled);i([G[0],G[1]]).addClass(x==1?F.sPageButtonStaticDisabled:F.sPageButton);
i([G[2],G[3]]).addClass(v===0||x===v||h._iDisplayLength===-1?F.sPageButtonStaticDisabled:F.sPageButton)}}}}});i.extend(m.ext.oSort,{"string-pre":function(h){if(typeof h!="string")h=h!==null&&h.toString?h.toString():"";return h.toLowerCase()},"string-asc":function(h,n){return h<n?-1:h>n?1:0},"string-desc":function(h,n){return h<n?1:h>n?-1:0},"html-pre":function(h){return h.replace(/<.*?>/g,"").toLowerCase()},"html-asc":function(h,n){return h<n?-1:h>n?1:0},"html-desc":function(h,n){return h<n?1:h>n?
-1:0},"date-pre":function(h){h=Date.parse(h);if(isNaN(h)||h==="")h=Date.parse("01/01/1970 00:00:00");return h},"date-asc":function(h,n){return h-n},"date-desc":function(h,n){return n-h},"numeric-pre":function(h){return h=="-"||h===""?0:h*1},"numeric-asc":function(h,n){return h-n},"numeric-desc":function(h,n){return n-h}});i.extend(m.ext.aTypes,[function(h){if(typeof h==="number")return"numeric";else if(typeof h!=="string")return null;var n,p=false;n=h.charAt(0);if("0123456789-".indexOf(n)==-1)return null;
for(var o=1;o<h.length;o++){n=h.charAt(o);if("0123456789.".indexOf(n)==-1)return null;if(n=="."){if(p)return null;p=true}}return"numeric"},function(h){var n=Date.parse(h);if(n!==null&&!isNaN(n)||typeof h==="string"&&h.length===0)return"date";return null},function(h){if(typeof h==="string"&&h.indexOf("<")!=-1&&h.indexOf(">")!=-1)return"html";return null}]);i.fn.DataTable=m;i.fn.dataTable=m;i.fn.dataTableSettings=m.settings;i.fn.dataTableExt=m.ext})(jQuery,window,document,undefined);
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-datatable.js
 *  Description: 데이터테이블을 반응형 웹에 맞는 화면을 보여주고, 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD Hybrid 포맷
        define(function (require, exports, module) {
            var $ = require("jquery");
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {
    var pluginName = "featuredDataTable";

    // 데이터테이블 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        var defaultOptions = {
            "bProcessing": false,
            sPaginationType:"bootstrap",
            sDom:"<'row'<'span8'l><'span4'f>r>t<'row'<'span12'i><'span12'p>>",
            oLanguage:{sLengthMenu:"_MENU_ 페이지별 레코드수"}
        };

        options = $.extend(true, defaultOptions, options);

        return this.each(function () {
            $(this).dataTable(options);
        });
    };

    /* 기본 클래스명 정의 */
    $.extend($.fn.dataTableExt.oStdClasses, {
        "sSortAsc":"header headerSortDown",
        "sSortDesc":"header headerSortUp",
        "sSortable":"header"
    });

    /* API method to get paging information */
    $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
        return {
            "iStart":oSettings._iDisplayStart,
            "iEnd":oSettings.fnDisplayEnd(),
            "iLength":oSettings._iDisplayLength,
            "iTotal":oSettings.fnRecordsTotal(),
            "iFilteredTotal":oSettings.fnRecordsDisplay(),
            "iPage":Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
            "iTotalPages":Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
        };
    }

    /* 부트스트랩 페이지네이션 스타일링 기능 확장 */
    $.extend($.fn.dataTableExt.oPagination, {
        "bootstrap":{
            "fnInit":function (oSettings, nPaging, fnDraw) {
                var oLang = oSettings.oLanguage.oPaginate;
                var fnClickHandler = function (e) {
                    e.preventDefault();
                    if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                        fnDraw(oSettings);
                    }
                };
                $(nPaging).addClass('pagination2').append(
                    '<ul>' +
                        '<li><a href="#"><span></span></a></li>' +
                        '<li><a href="#"><span></span></a></li>' +
                        '</ul>'
                );
                var els = $('a', nPaging);
                $(els[0]).bind('click.DT', { action:"previous" }, fnClickHandler);
                $(els[1]).bind('click.DT', { action:"next" }, fnClickHandler);
            },

            "fnUpdate":function (oSettings, fnDraw) {
                var iListLength = 5;
                var oPaging = oSettings.oInstance.fnPagingInfo();
                var an = oSettings.aanFeatures.p;
                var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

                if (oPaging.iTotalPages < iListLength) {
                    iStart = 1;
                    iEnd = oPaging.iTotalPages;
                }
                else if (oPaging.iPage <= iHalf) {
                    iStart = 1;
                    iEnd = iListLength;
                } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                    iStart = oPaging.iTotalPages - iListLength + 1;
                    iEnd = oPaging.iTotalPages;
                } else {
                    iStart = oPaging.iPage - iHalf + 1;
                    iEnd = iStart + iListLength - 1;
                }

                for (i = 0, iLen = an.length; i < iLen; i++) {
                    // Remove the middle elements
                    $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                    // Add the new list items and their event handlers
                    for (j = iStart; j <= iEnd; j++) {
                        sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                        $('<li ' + sClass + '><a href="#" >' + j + '</a></li>')
                            .insertBefore($('li:last', an[i])[0])
                            .bind('click', function (e) {
                                e.preventDefault();
                                oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                                fnDraw(oSettings);
                            });
                    }

                    // Add / remove disabled classes from the static elements
                    if (oPaging.iPage === 0) {
                        $('li:first', an[i]).addClass('disabled');
                    } else {
                        $('li:first', an[i]).removeClass('disabled');
                    }

                    if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                        $('li:last', an[i]).addClass('disabled');
                    } else {
                        $('li:last', an[i]).removeClass('disabled');
                    }
                }
            }
        }
    });

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=datatable]").each(function (i) {
        $(this)[pluginName]({
            "sAjaxSource":$(this).data("datatableBind")
        });
    });
}));//     (c) 2012 Airbnb, Inc.
//     
//     infinity.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/infinity

!function(window, Math, $) {
  'use strict';


  // Welcome To Infinity
  // ===================
  //
  // infinity.js is a UITableView for the web. Use it to speed up scroll
  // performance of long- or infinitely-scrolling lists of items.
  //
  // infinity.js has several caveats:
  //
  // 1. All DOM elements must either be visible or in the current layout.
  // infinity.js does not support elements that will at some point affect the
  // layout, but are currently hidden using `display:none`.
  //
  // 2. ListViews can't be nested.
  //
  // 3. Non-ListItem elements can't be the immediate children of ListView
  // elements. Only ListItems can be immediate children of ListViews.
  //
  // 4. ListView elements can't have heights set directly on them. In most
  // cases it is also likely that `min-height`s and `max-height`s will break.
  // However, setting heights on ListItems is ok.
  //
  // If you're reading this, we probably want to hear from you. If the feeling
  // is mutual: [get in touch.](http://www.airbnb.com/jobs)


  // Initial Setup
  // =============

  // Cached objects
  var $window = $(window);

  // Packaging:
  var oldInfinity = window.infinity,
      infinity = window.infinity = {},
      config = infinity.config = {};

  // Constants:
  var PAGE_ID_ATTRIBUTE = 'data-infinity-pageid',
      NUM_BUFFER_PAGES = 1,
      PAGES_ONSCREEN = NUM_BUFFER_PAGES * 2 + 1;

  // Config:
  config.PAGE_TO_SCREEN_RATIO = 3;
  config.SCROLL_THROTTLE = 350;



  // ListView Class
  // ==============


  // ### Constructor
  //
  // Creates a new instance of a ListView.
  //
  // Takes:
  //
  // - `$el`: a jQuery element.
  // - `options`: an optional hash of options

  function ListView($el, options) {
    options = options || {};

    this.$el = blankDiv();
    this.$shadow = blankDiv();
    $el.append(this.$el);
    // don't append the shadow element -- it's meant to only be used for
    // finding elements outside of the DOM

    this.lazy = !!options.lazy;
    this.lazyFn = options.lazy || null;

    initBuffer(this);

    this.top = this.$el.offset().top;
    this.width = 0;
    this.height = 0;

    this.pages = [];
    this.startIndex = 0;

    DOMEvent.attach(this);
  }


  // ### initBuffer
  //
  // Private ListView method. Initializes the buffer element.

  function initBuffer(listView) {
    listView._$buffer = blankDiv()
                        .prependTo(listView.$el);
  }


  // ### updateBuffer
  //
  // Private ListView method. Updates the buffer to correctly push forward the
  // first page.

  function updateBuffer(listView) {
    var firstPage,
        pages = listView.pages,
        $buffer = listView._$buffer;

    if(pages.length > 0) {
      firstPage = pages[listView.startIndex];
      $buffer.height(firstPage.top);
    } else {
      $buffer.height(0);
    }
  }

  // ListView manipulation
  // ---------------------


  // ### append
  //
  // Appends a jQuery element or a ListItem to the ListView.
  //
  // Takes:
  //
  // - `obj`: a jQuery element, a string of valid HTML, or a ListItem.
  //
  // TODO: optimized batch appends

  ListView.prototype.append = function(obj) {
    if(!obj || !obj.length) return null;

    var lastPage,
        item = convertToItem(this, obj),
        pages = this.pages;

    this.height += item.height;
    this.$el.height(this.height);

    lastPage = pages[pages.length - 1];

    if(!lastPage || !lastPage.hasVacancy()) {
      lastPage = new Page(this);
      pages.push(lastPage);
    }

    lastPage.append(item);
    insertPagesInView(this);

    return item;
  };


  // ### cacheCoordsFor
  //
  // Caches the coordinates for a given ListItem within the given ListView.
  //
  // Takes:
  //
  // - `listView`: a ListView.
  // - `listItem`: the ListItem whose coordinates you want to cache.

  function cacheCoordsFor(listView, listItem) {
    listItem.$el.remove();

    // WARNING: this will always break for prepends. Once support gets added for
    // prepends, change this.
    listView.$el.append(listItem.$el);
    updateCoords(listItem, listView.height);
    listItem.$el.remove();
  }


  // ### insertPagesInView
  //
  // Inserts any uninserted pages the given ListView owns.
  //
  // Takes:
  //
  // - `listView`: the ListView whose onscreen pages you'd like to insert.

  function insertPagesInView(listView) {
    var index, length, curr,
        pages = listView.pages,
        inserted = false,
        inOrder = true;
    index = listView.startIndex;
    length = Math.min(index + PAGES_ONSCREEN, pages.length);

    for(index; index < length; index++) {
      curr = pages[index];
      if(listView.lazy) curr.lazyload(listView.lazyFn);
      if(inserted && curr.onscreen) inOrder = false;

      if(!inOrder) {
        curr.stash(listView.$shadow);
        curr.appendTo(listView.$el);
      } else if(!curr.onscreen) {
        inserted = true;
        curr.appendTo(listView.$el);
      }
    }
  }


  // ### updateStartIndex
  //
  // Updates a given ListView when the throttled scroll event fires. Attempts
  // to do as little work as possible: if the `startIndex` doesn't change,
  // it'll exit early. If the `startIndex` does change, it finds all pages
  // that have been scrolled out of view and removes them, then inserts only
  // pages that have been now been scrolled into view.
  //
  // Takes:
  //
  // - `listView`: the ListView needing to be updated.

  function updateStartIndex(listView) {
    var index, length, pages, lastIndex, nextLastIndex,
        startIndex = listView.startIndex,
        viewTop = $window.scrollTop() - listView.top,
        viewHeight = $window.height(),
        viewBottom = viewTop + viewHeight,
        nextIndex = startIndexWithinRange(listView, viewTop, viewBottom);

    if( nextIndex < 0 || nextIndex === startIndex) return startIndex;

    pages = listView.pages;
    startIndex = listView.startIndex;
    lastIndex = Math.min(startIndex + PAGES_ONSCREEN, pages.length);
    nextLastIndex = Math.min(nextIndex + PAGES_ONSCREEN, pages.length);

    // sweep any invalid old pages
    for(index = startIndex, length = lastIndex; index < length; index++) {
      if(index < nextIndex || index >= nextLastIndex)
        pages[index].stash(listView.$shadow);
    }

    listView.startIndex = nextIndex;

    insertPagesInView(listView);
    updateBuffer(listView);
    return nextIndex;
  }


  // ### remove
  //
  // Removes the ListView from the DOM and cleans up after it.

  ListView.prototype.remove = function() {
    this.$el.remove();
    this.cleanup();
  };


  // ### convertToItem
  //
  // Given an object that is either a ListItem instance, a jQuery element, or a
  // string of valid HTML, makes sure to return either the ListItem itself or
  // a new ListItem that wraps the element.
  //
  // Takes:
  //
  // - `listView`: the ListView instance that wants the item.
  // - `possibleItem`: an object that is either a ListItem, a jQuery element,
  // or a string of valid HTML.

  function convertToItem(listView, possibleItem) {
    var item;
    if(possibleItem instanceof ListItem) return possibleItem;
    if(typeof possibleItem === 'string') possibleItem = $(possibleItem);
    item = new ListItem(possibleItem);
    cacheCoordsFor(listView, item);
    return item;
  }


  // ### tooSmall
  //
  // Alerts the given ListView that the given Page is too small. May result
  // in modifications to the `pages` array.

  function tooSmall(listView, page) {
    // Naive solution:
    repartition(listView);
  }


  // ### repartition
  //
  // Repartitions the pages array. This can be used for either defragmenting
  // the array, or recalculating everything on screen resize.

  function repartition(listView) {
    var currPage, newPage, index, length, itemIndex, pageLength, currItems, currItem,
        nextItem,
        pages = listView.pages,
        newPages = [];

    newPage = new Page(listView);
    newPages.push(newPage);

    for(index = 0, length = pages.length; index < length; index++) {
      currPage = pages[index];
      currItems = currPage.items;
      for(itemIndex = 0, pageLength = currItems.length; itemIndex < pageLength; itemIndex++) {
        currItem = currItems[itemIndex];
        nextItem = currItem.clone();
        if(newPage.hasVacancy()) {
          newPage.append(nextItem);
        } else {
          newPage = new Page(listView);
          newPages.push(newPage);
          newPage.append(nextItem);
        }
      }
      currPage.remove();
    }

    listView.pages = newPages;
    insertPagesInView(listView);
  }


  // ListView querying
  // -----------------

  // ### find
  //
  // Given a selector string or jQuery element, return the items that hold the
  // given or matching elements.
  //
  // Note: this is slower than an ordinary jQuery find. However, using jQuery
  // to find elements will be bug-prone, since most of the elements won't be in
  // the DOM tree. Caching elements is usually important, but it's even more
  // important to do here.
  //
  // Arguments:
  //
  // - `findObj`: A selector string, or a jQuery element.
  //
  // Returns a ListItem.

  ListView.prototype.find = function(findObj) {
    var items, $onscreen, $offscreen;

    // If given a selector string, find everything matching onscreen and
    // offscreen, and return both.
    if(typeof findObj === 'string') {
      $onscreen = this.$el.find(findObj);
      $offscreen = this.$shadow.find(findObj);
      return this.find($onscreen).concat(this.find($offscreen));
    }

    // Silly option, but might as well.
    if(findObj instanceof ListItem) return [findObj];

    // jQuery element
    items = [];
    findObj.each(function() {
      var pageId, page, pageItems, index, length, currItem,
          $itemEl = $(this).parentsUntil('[' + PAGE_ID_ATTRIBUTE + ']').andSelf().first(),
          $pageEl = $itemEl.parent();


      pageId = $pageEl.attr(PAGE_ID_ATTRIBUTE);
      page = PageRegistry.lookup(pageId);
      if(page) {
        pageItems = page.items;
        for(index = 0, length = pageItems.length; index < length; index++) {
          currItem = pageItems[index];
          if(currItem.$el.is($itemEl)) {
            items.push(currItem);
            break;
          }
        }
      }
    });

    return items;
  };

  // ### startIndexWithinRange
  //
  // Finds the starting index for a listView, given a range. Wraps
  // indexWithinRange.
  //
  // Takes:
  //
  // - `listView`: the ListView whose startIndex you're calculating.
  // - `top`: the top of the range.
  // - `bottom`: the bottom of the range.

  function startIndexWithinRange(listView, top, bottom) {
    var index = indexWithinRange(listView, top, bottom);
    index = Math.max(index - NUM_BUFFER_PAGES, 0);
    index = Math.min(index, listView.pages.length);
    return index;
  }


  // ### indexWithinRange
  //
  // Finds the index of the page closest to being within a given range. It's
  // less useful than its wrapper function startIndexWithinRange, and you
  // probably won't need to call this unwrapped version.
  //
  // Takes:
  //
  // - `listView`: the ListView instance whose pages you're looking at.
  // - `top`: the top of the range.
  // - `bottom`: the bottom of the range.

  function indexWithinRange(listView, top, bottom) {
    var index, length, curr, startIndex, midpoint, diff, prevDiff,
        pages = listView.pages,
        rangeMidpoint = top + (bottom - top)/2;

    // Start looking at the index of the page last contained by the screen --
    // not the first page in the onscreen pages
    startIndex = Math.min(listView.startIndex + NUM_BUFFER_PAGES,
                          pages.length - 1);

    if(pages.length <= 0) return -1;

    curr = pages[startIndex];
    midpoint = curr.top + curr.height/2;
    prevDiff = rangeMidpoint - midpoint;
    if(prevDiff < 0) {
      // Search above
      for(index = startIndex - 1; index >= 0; index--) {
        curr = pages[index];
        midpoint = curr.top + curr.height/2;
        diff = rangeMidpoint - midpoint;
        if(diff > 0) {
          if(diff < -prevDiff) return index;
          return index + 1;
        }
        prevDiff = diff;
      }
      return 0;
    } else if (prevDiff > 0) {
      // Search below
      for(index = startIndex + 1, length = pages.length; index < length; index++) {
        curr = pages[index];
        midpoint = curr.top + curr.height/2;
        diff = rangeMidpoint - midpoint;
        if(diff < 0) {
          if(-diff < prevDiff) return index;
          return index - 1;
        }
        prevDiff = diff;
      }
      return pages.length - 1;
    }

    // Perfect hit! Return it.
    return startIndex;
  }


  // ListView cleanup
  // ----------------

  ListView.prototype.cleanup = function() {
    var pages = this.pages,
        page;
    DOMEvent.detach(this);
    while(page = pages.pop()) {
      page.cleanup();
    }
  };


  // ListView event binding
  // ----------------------
  //
  // Internal scroll and resize  binding and throttling. Allows ListViews to
  // bind to a throttled scroll event (and debounced resize event), and updates
  // them as it fires.

  var DOMEvent = (function() {
    var eventIsBound = false,
        scrollScheduled = false,
        resizeTimeout = null,
        boundViews = [];


    // ### scrollHandler
    //
    // Callback called on scroll. Schedules a `scrollAll` callback if needed,
    // and disallows future scheduling.

    function scrollHandler() {
      if(!scrollScheduled) {
        setTimeout(scrollAll, config.SCROLL_THROTTLE);
        scrollScheduled = true;
      }
    }


    // ### scrollAll
    //
    // Callback passed to the setTimeout throttle. Calls `scrollListView` on
    // every bound ListView, and then allows new scroll events to be
    // scheduled.

    function scrollAll() {
      var index, length;
      for(index = 0, length = boundViews.length; index < length; index++) {
        updateStartIndex(boundViews[index]);
      }
      scrollScheduled = false;
    }


    // ### resizeHandler
    //
    // Callback called on resize. Debounces a `resizeAll` callback.

    function resizeHandler() {
      if(resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeAll, 200);
    }


    // ### resizeAll
    //
    // Handles resizing all ListViews. Just calls `repartition` on them for
    // now.

    function resizeAll() {
      var index, curr;
      for(index = 0; curr = boundViews[index]; index++) {
        repartition(curr);
      }
    }

    return {

      // ### attach
      //
      // Binds a given ListView to a throttled scroll event. Does not create
      // multiple event handlers if called by multiple ListViews.
      //
      // Takes:
      //
      // - `listView`: a ListView that is not currently bound to the scroll
      //   event.

      attach: function(listView) {
        if(!eventIsBound) {
          $window.on('scroll', scrollHandler);
          $window.on('resize', resizeHandler);
          eventIsBound = true;
        }
        boundViews.push(listView);
      },


      // ### detach
      //
      // Detaches a bound ListView from the throttled scroll event. If no
      // ListViews remain bound to the throttled scroll, unbinds the scroll
      // handler from the window's scroll event.
      //
      // Returns true if the listView was successfully detached, and false
      // otherwise.
      //
      // Takes:
      //
      // - `listView`: a ListView that is currently bound to the scroll event.

      detach: function(listView) {
        var index, length;
        for(index = 0, length = boundViews.length; index < length; index++) {
          if(boundViews[index] === listView) {
            boundViews.splice(index, 1);
            if(boundViews.length === 0) {
              $window.off('scroll', scrollHandler);
              $window.off('resize', resizeHandler);
              eventIsBound = false;
            }
            return true;
          }
        }
        return false;
      }
    };
  }());


  // Page class
  // ==========
  //
  // An internal class used for ordering items into roughly screen-sized pages.
  // Pages are removed and added to the DOM wholesale as they come in and out
  // of view.

  function Page(parent) {
    this.parent = parent;

    this.items = [];
    this.$el = blankDiv();

    this.id = PageRegistry.generatePageId(this);
    this.$el.attr(PAGE_ID_ATTRIBUTE, this.id);

    this.top = 0;
    this.bottom = 0;
    this.width = 0;
    this.height = 0;

    this.lazyloaded = false;

    this.onscreen = false;
  }


  // ### append
  //
  // Appends a ListItem to the Page.
  //
  // Takes:
  //
  // - `item`: a ListItem.

  Page.prototype.append = function(item) {
    var items = this.items;

    // Recompute coords, sizing.
    if(items.length === 0) this.top = item.top;
    this.bottom = item.bottom;
    this.width = this.width > item.width ? this.width : item.width;
    this.height = this.bottom - this.top;

    items.push(item);
    item.parent = this;
    this.$el.append(item.$el);

    this.lazyloaded = false;
  };


  // ### prepend
  //
  // Prepends a ListItem to the Page.
  //
  // Takes:
  //
  // - `item`: a ListItem.

  Page.prototype.prepend = function(item) {
    var items = this.items;

    // Recompute coords, sizing.
    this.bottom += item.height;
    this.width = this.width > item.width ? this.width : item.width;
    this.height = this.bottom - this.top;

    items.push(item);
    item.parent = this;
    this.$el.prepend(item.$el);

    this.lazyloaded = false;
  };


  // ### hasVacancy
  //
  // Returns false if the Page is at max capacity; false otherwise.

  Page.prototype.hasVacancy = function() {
    return this.height < $window.height() * config.PAGE_TO_SCREEN_RATIO;
  };


  // ### appendTo
  //
  // Proxies to jQuery to append the Page to the given jQuery element.

  Page.prototype.appendTo = function($el) {
    if(!this.onscreen) {
      this.$el.appendTo($el);
      this.onscreen = true;
    }
  };


  // ### prependTo
  //
  // Proxies to jQuery to prepend the Page to the given jQuery element.

  Page.prototype.prependTo = function($el) {
    if(!this.onscreen) {
      this.$el.prependTo($el);
      this.onscreen = true;
    }
  };

  // ### stash
  //
  // Temporarily stash the onscreen page under a different element.

  Page.prototype.stash = function($el) {
    if(this.onscreen) {
      this.$el.appendTo($el);
      this.onscreen = false;
    }
  };


  // ### remove
  //
  // Removes the Page from the DOM and cleans up after it.

  Page.prototype.remove = function() {
    if(this.onscreen) {
      this.$el.remove();
      this.onscreen = false;
    }
    this.cleanup();
  };


  // ### cleanup
  //
  // Cleans up the Page without removing it.

  Page.prototype.cleanup = function() {
    var items = this.items,
        item;

    this.parent = null;
    PageRegistry.remove(this);
    while (item = items.pop()) {
      item.cleanup();
    }
  };


  // ### lazyload
  //
  // Runs the given lazy-loading callback on all unloaded page content.
  //
  // Takes:
  //
  // - `callback`: a function of the form `function([$el]){}`. Will run on
  // each unloaded element, and will use the element as its calling context.

  Page.prototype.lazyload = function(callback) {
    var $el = this.$el,
        index, length;
    if (!this.lazyloaded) {
      for (index = 0, length = $el.length; index < length; index++) {
        callback.call($el[index], $el[index]);
      }
      this.lazyloaded = true;
    }
  };


  // Page Registry
  // ------------

  var PageRegistry = (function() {
    var pages = [];
    return {
      generatePageId: function(page) {
        return pages.push(page) - 1;
      },
      lookup: function(id) {
        return pages[id] || null;
      },
      remove: function(page) {
        var id = page.id;
        if(!pages[id]) return false;
        pages[id] = null;
        return true;
      }
    };
  }());


  // ### removeItemFromPage
  //
  // Removes a given ListItem from the given Page.

  function removeItemFromPage(item, page) {
    var index, length, foundIndex,
        items = page.items;
    for(index = 0, length = items.length; index < length; index++) {
      if(items[index] === item) {
        foundIndex = index;
        break;
      }
    }

    if(foundIndex == null) return false;

    items.splice(foundIndex, 1);
    page.bottom -= item.height;
    page.height = page.bottom - page.top;
    if(page.hasVacancy()) tooSmall(page.parent, page);

    return true;
  }


  // ListItem class
  // ==============
  //
  // An individual item in the ListView.
  //
  // Has cached top, bottom, width, and height properties, determined from
  // jQuery. This positioning data will be determined when the ListItem is
  // inserted into a ListView; it can't be determined ahead of time.
  //
  // All positioning data is relative to the containing ListView.

  function ListItem($el) {
    this.$el = $el;

    this.parent = null;

    this.top = 0;
    this.bottom = 0;
    this.width = 0;
    this.height = 0;
  }


  // ### clone
  //
  // Clones the ListItem.
  ListItem.prototype.clone = function() {
    var item = new ListItem(this.$el);
    item.top = this.top;
    item.bottom = this.bottom;
    item.width = this.width;
    item.height = this.height;
    return item;
  };

  // ### remove
  //
  // Removes the ListItem and its elements from the page, and cleans up after
  // them.

  ListItem.prototype.remove = function() {
    this.$el.remove();
    removeItemFromPage(this, this.parent);
    this.cleanup();
  };


  // ### cleanup
  //
  // Cleans up after the ListItem without removing it from the page.

  ListItem.prototype.cleanup = function() {
    this.parent = null;
  };


  // ### updateCoords
  //
  // Updates the coordinates of the given ListItem, assuming a given y-offset
  // from the parent ListView.
  //
  // Takes:
  //
  //  - `listItem`: the ListItem whose cached coordinates you want to update.
  //  - `yOffset`: the y-offset of the ListItem from its ListView parent.

  function updateCoords(listItem, yOffset) {
    var $el = listItem.$el;

    listItem.top = yOffset;
    listItem.height = $el.outerHeight(true);
    listItem.bottom = listItem.top + listItem.height;
    listItem.width = $el.width();
  }



  // Helper functions
  // ================


  // ### blankDiv
  //
  // Returns a new, empty `<div>` jQuery element. The `<div>` will have its
  // border, margin, and padding set to zero or none, as appropriate.

  function blankDiv() {
    return $('<div>').css({
      margin: 0,
      padding: 0,
      border: 'none'
    });
  }


  // ### pxToInt
  //
  // Converts pixel values returned by jQuery to base-10 ints.
  //
  // Takes:
  //
  // - `px`: a string value, which starts with a number and is
  //   postfixed with the string `'px'`.

  //function pxToInt(px) {
  //  return parseInt(px, 10);
  //}


  // Export
  // ======

  // Classes:
  infinity.ListView = ListView;
  infinity.Page = Page;
  infinity.ListItem = ListItem;

  //jQuery plugin
  function registerPlugin(infinity) {
    var ListView;
    if(infinity) {
      ListView = infinity.ListView;

      $.fn.listView = function (options) {
        return new ListView(this, options);
      };
    }
    else {
      delete $.fn.listView;
    }
  }

  registerPlugin(infinity);

  // Destroy own packaging:
  infinity.noConflict = function() {
    window.infinity = oldInfinity;
    registerPlugin(oldInfinity);
    return infinity;
  };

}(window, Math, jQuery);
/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-listview.js
 *  Description: 리스트뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD Hybrid 포맷
        define(function (require, exports, module) {
            var $ = require("jquery");
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {
    var pluginName = "featuredScrollView";

    // 데이터테이블 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        var defaultOptions = {
            "bProcessing": false,
            sPaginationType:"bootstrap",
            sDom:"<'row'<'span8'l><'span4'f>r>t<'row'<'span12'i><'span12'p>>",
            oLanguage:{sLengthMenu:"_MENU_ 페이지별 레코드수"}
        };

        options = $.extend(true, defaultOptions, options);

        return this.each(function () {
            $(this).dataTable(options);
        });
    };

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=scrollview]").each(function (i) {
        $(this)[pluginName]({
            "sAjaxSource":$(this).data("datatableBind")
        });
    });
}));/*!
* MediaElement.js
* HTML5 <video> and <audio> shim and player
* http://mediaelementjs.com/
*
* Creates a JavaScript object that mimics HTML5 MediaElement API
* for browsers that don't understand HTML5 or can't play the provided codec
* Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
*
* Copyright 2010-2012, John Dyer (http://j.hn)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
*/
// Namespace
var mejs = mejs || {};

// version number
mejs.version = '2.9.3';

// player number (for missing, same id attr)
mejs.meIndex = 0;

// media types accepted by plugins
mejs.plugins = {
	silverlight: [
		{version: [3,0], types: ['video/mp4','video/m4v','video/mov','video/wmv','audio/wma','audio/m4a','audio/mp3','audio/wav','audio/mpeg']}
	],
	flash: [
		{version: [9,0,124], types: ['video/mp4','video/m4v','video/mov','video/flv','video/x-flv','audio/flv','audio/x-flv','audio/mp3','audio/m4a','audio/mpeg', 'video/youtube', 'video/x-youtube']}
		//,{version: [12,0], types: ['video/webm']} // for future reference (hopefully!)
	],
	youtube: [
		{version: null, types: ['video/youtube', 'video/x-youtube']}
	],
	vimeo: [
		{version: null, types: ['video/vimeo']}
	]
};

/*
Utility methods
*/
mejs.Utility = {
	encodeUrl: function(url) {
		return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');
	},
	escapeHTML: function(s) {
		return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');
	},
	absolutizeUrl: function(url) {
		var el = document.createElement('div');
		el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
		return el.firstChild.href;
	},
	getScriptPath: function(scriptNames) {
		var
			i = 0,
			j,
			path = '',
			name = '',
			script,
			scripts = document.getElementsByTagName('script'),
			il = scripts.length,
			jl = scriptNames.length;

		for (; i < il; i++) {
			script = scripts[i].src;
			for (j = 0; j < jl; j++) {
				name = scriptNames[j];
				if (script.indexOf(name) > -1) {
					path = script.substring(0, script.indexOf(name));
					break;
				}
			}
			if (path !== '') {
				break;
			}
		}
		return path;
	},
	secondsToTimeCode: function(time, forceHours, showFrameCount, fps) {
		//add framecount
		if (typeof showFrameCount == 'undefined') {
		    showFrameCount=false;
		} else if(typeof fps == 'undefined') {
		    fps = 25;
		}
	
		var hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1)*fps).toFixed(3)),
			result = 
					( (forceHours || hours > 0) ? (hours < 10 ? '0' + hours : hours) + ':' : '')
						+ (minutes < 10 ? '0' + minutes : minutes) + ':'
						+ (seconds < 10 ? '0' + seconds : seconds)
						+ ((showFrameCount) ? ':' + (frames < 10 ? '0' + frames : frames) : '');
	
		return result;
	},
	
	timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps){
		if (typeof showFrameCount == 'undefined') {
		    showFrameCount=false;
		} else if(typeof fps == 'undefined') {
		    fps = 25;
		}
	
		var tc_array = hh_mm_ss_ff.split(":"),
			tc_hh = parseInt(tc_array[0], 10),
			tc_mm = parseInt(tc_array[1], 10),
			tc_ss = parseInt(tc_array[2], 10),
			tc_ff = 0,
			tc_in_seconds = 0;
		
		if (showFrameCount) {
		    tc_ff = parseInt(tc_array[3])/fps;
		}
		
		tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;
		
		return tc_in_seconds;
	},
	
	/* borrowed from SWFObject: http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js#474 */
	removeSwf: function(id) {
		var obj = document.getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (mejs.MediaFeatures.isIE) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						mejs.Utility.removeObjectInIE(id);
					} else {
						setTimeout(arguments.callee, 10);
					}
				})();
			} else {
				obj.parentNode.removeChild(obj);
			}
		}
	},
	removeObjectInIE: function(id) {
		var obj = document.getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}		
	}
};


// Core detector, plugins are added below
mejs.PluginDetector = {

	// main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
	hasPluginVersion: function(plugin, v) {
		var pv = this.plugins[plugin];
		v[1] = v[1] || 0;
		v[2] = v[2] || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	},

	// cached values
	nav: window.navigator,
	ua: window.navigator.userAgent.toLowerCase(),

	// stored version numbers
	plugins: [],

	// runs detectPlugin() and stores the version number
	addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
		this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
	},

	// get the version number from the mimetype (all but IE) or ActiveX (IE)
	detectPlugin: function(pluginName, mimeType, activeX, axDetect) {

		var version = [0,0,0],
			description,
			i,
			ax;

		// Firefox, Webkit, Opera
		if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
			description = this.nav.plugins[pluginName].description;
			if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/,'').replace(/\sr/gi,'.').split('.');
				for (i=0; i<version.length; i++) {
					version[i] = parseInt(version[i].match(/\d+/), 10);
				}
			}
		// Internet Explorer / ActiveX
		} else if (typeof(window.ActiveXObject) != 'undefined') {
			try {
				ax = new ActiveXObject(activeX);
				if (ax) {
					version = axDetect(ax);
				}
			}
			catch (e) { }
		}
		return version;
	}
};

// Add Flash detection
mejs.PluginDetector.addPlugin('flash','Shockwave Flash','application/x-shockwave-flash','ShockwaveFlash.ShockwaveFlash', function(ax) {
	// adapted from SWFObject
	var version = [],
		d = ax.GetVariable("$version");
	if (d) {
		d = d.split(" ")[1].split(",");
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});

// Add Silverlight detection
mejs.PluginDetector.addPlugin('silverlight','Silverlight Plug-In','application/x-silverlight-2','AgControl.AgControl', function (ax) {
	// Silverlight cannot report its version number to IE
	// but it does have a isVersionSupported function, so we have to loop through it to get a version number.
	// adapted from http://www.silverlightversion.com/
	var v = [0,0,0,0],
		loopMatch = function(ax, v, i, n) {
			while(ax.isVersionSupported(v[0]+ "."+ v[1] + "." + v[2] + "." + v[3])){
				v[i]+=n;
			}
			v[i] -= n;
		};
	loopMatch(ax, v, 0, 1);
	loopMatch(ax, v, 1, 1);
	loopMatch(ax, v, 2, 10000); // the third place in the version number is usually 5 digits (4.0.xxxxx)
	loopMatch(ax, v, 2, 1000);
	loopMatch(ax, v, 2, 100);
	loopMatch(ax, v, 2, 10);
	loopMatch(ax, v, 2, 1);
	loopMatch(ax, v, 3, 1);

	return v;
});
// add adobe acrobat
/*
PluginDetector.addPlugin('acrobat','Adobe Acrobat','application/pdf','AcroPDF.PDF', function (ax) {
	var version = [],
		d = ax.GetVersions().split(',')[0].split('=')[1].split('.');

	if (d) {
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});
*/
// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
	init: function() {
		var
			t = this,
			d = document,
			nav = mejs.PluginDetector.nav,
			ua = mejs.PluginDetector.ua.toLowerCase(),
			i,
			v,
			html5Elements = ['source','track','audio','video'];

		// detect browsers (only the ones that have some kind of quirk we need to work around)
		t.isiPad = (ua.match(/ipad/i) !== null);
		t.isiPhone = (ua.match(/iphone/i) !== null);
		t.isiOS = t.isiPhone || t.isiPad;
		t.isAndroid = (ua.match(/android/i) !== null);
		t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
		t.isIE = (nav.appName.toLowerCase().indexOf("microsoft") != -1);
		t.isChrome = (ua.match(/chrome/gi) !== null);
		t.isFirefox = (ua.match(/firefox/gi) !== null);
		t.isWebkit = (ua.match(/webkit/gi) !== null);
		t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit;
		t.isOpera = (ua.match(/opera/gi) !== null);
		t.hasTouch = ('ontouchstart' in window);

		// create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
		for (i=0; i<html5Elements.length; i++) {
			v = document.createElement(html5Elements[i]);
		}
		
		t.supportsMediaTag = (typeof v.canPlayType !== 'undefined' || t.isBustedAndroid);

		// detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)
		
		// iOS
		t.hasSemiNativeFullScreen = (typeof v.webkitEnterFullscreen !== 'undefined');
		
		// Webkit/firefox
		t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== 'undefined');
		t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== 'undefined');
		
		t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen);
		t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;
		if (t.hasMozNativeFullScreen) {
			t.nativeFullScreenEnabled = v.mozFullScreenEnabled;
		}
		
		
		if (this.isChrome) {
			t.hasSemiNativeFullScreen = false;
		}
		
		if (t.hasTrueNativeFullScreen) {
			t.fullScreenEventName = (t.hasWebkitNativeFullScreen) ? 'webkitfullscreenchange' : 'mozfullscreenchange';
			
			
			t.isFullScreen = function() {
				if (v.mozRequestFullScreen) {
					return d.mozFullScreen;
				} else if (v.webkitRequestFullScreen) {
					return d.webkitIsFullScreen;
				}
			}
					
			t.requestFullScreen = function(el) {
		
				if (t.hasWebkitNativeFullScreen) {
					el.webkitRequestFullScreen();
				} else if (t.hasMozNativeFullScreen) {
					el.mozRequestFullScreen();
				}
			}
			
			t.cancelFullScreen = function() {				
				if (t.hasWebkitNativeFullScreen) {
					document.webkitCancelFullScreen();
				} else if (t.hasMozNativeFullScreen) {
					document.mozCancelFullScreen();
				}
			}	
			
		}
		
		
		// OS X 10.5 can't do this even if it says it can :(
		if (t.hasSemiNativeFullScreen && ua.match(/mac os x 10_5/i)) {
			t.hasNativeFullScreen = false;
			t.hasSemiNativeFullScreen = false;
		}
		
	}
};
mejs.MediaFeatures.init();


/*
extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
*/
mejs.HtmlMediaElement = {
	pluginType: 'native',
	isFullScreen: false,

	setCurrentTime: function (time) {
		this.currentTime = time;
	},

	setMuted: function (muted) {
		this.muted = muted;
	},

	setVolume: function (volume) {
		this.volume = volume;
	},

	// for parity with the plugin versions
	stop: function () {
		this.pause();
	},

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		
		// Fix for IE9 which can't set .src when there are <source> elements. Awesome, right?
		var 
			existingSources = this.getElementsByTagName('source');
		while (existingSources.length > 0){
			this.removeChild(existingSources[0]);
		}
	
		if (typeof url == 'string') {
			this.src = url;
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.src = media.src;
				}
			}
		}
	},

	setVideoSize: function (width, height) {
		this.width = width;
		this.height = height;
	}
};

/*
Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
*/
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
	this.id = pluginid;
	this.pluginType = pluginType;
	this.src = mediaUrl;
	this.events = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
mejs.PluginMediaElement.prototype = {

	// special
	pluginElement: null,
	pluginType: '',
	isFullScreen: false,

	// not implemented :(
	playbackRate: -1,
	defaultPlaybackRate: -1,
	seekable: [],
	played: [],

	// HTML5 read-only properties
	paused: true,
	ended: false,
	seeking: false,
	duration: 0,
	error: null,
	tagName: '',

	// HTML5 get/set properties, but only set (updated by event handlers)
	muted: false,
	volume: 1,
	currentTime: 0,

	// HTML5 methods
	play: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				this.pluginApi.playVideo();
			} else {
				this.pluginApi.playMedia();
			}
			this.paused = false;
		}
	},
	load: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
			} else {
				this.pluginApi.loadMedia();
			}
			
			this.paused = false;
		}
	},
	pause: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				this.pluginApi.pauseVideo();
			} else {
				this.pluginApi.pauseMedia();
			}			
			
			
			this.paused = true;
		}
	},
	stop: function () {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				this.pluginApi.stopVideo();
			} else {
				this.pluginApi.stopMedia();
			}	
			this.paused = true;
		}
	},
	canPlayType: function(type) {
		var i,
			j,
			pluginInfo,
			pluginVersions = mejs.plugins[this.pluginType];

		for (i=0; i<pluginVersions.length; i++) {
			pluginInfo = pluginVersions[i];

			// test if user has the correct plugin version
			if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {

				// test for plugin playback types
				for (j=0; j<pluginInfo.types.length; j++) {
					// find plugin that can play the type
					if (type == pluginInfo.types[j]) {
						return true;
					}
				}
			}
		}

		return false;
	},
	
	positionFullscreenButton: function(x,y,visibleAndAbove) {
		if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
			this.pluginApi.positionFullscreenButton(x,y,visibleAndAbove);
		}
	},
	
	hideFullscreenButton: function() {
		if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
			this.pluginApi.hideFullscreenButton();
		}		
	},	
	

	// custom methods since not all JavaScript implementations support get/set

	// This can be a url string
	// or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
	setSrc: function (url) {
		if (typeof url == 'string') {
			this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
			this.src = mejs.Utility.absolutizeUrl(url);
		} else {
			var i, media;

			for (i=0; i<url.length; i++) {
				media = url[i];
				if (this.canPlayType(media.type)) {
					this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
					this.src = mejs.Utility.absolutizeUrl(url);
				}
			}
		}

	},
	setCurrentTime: function (time) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				this.pluginApi.seekTo(time);
			} else {
				this.pluginApi.setCurrentTime(time);
			}				
			
			
			
			this.currentTime = time;
		}
	},
	setVolume: function (volume) {
		if (this.pluginApi != null) {
			// same on YouTube and MEjs
			if (this.pluginType == 'youtube') {
				this.pluginApi.setVolume(volume * 100);
			} else {
				this.pluginApi.setVolume(volume);
			}
			this.volume = volume;
		}
	},
	setMuted: function (muted) {
		if (this.pluginApi != null) {
			if (this.pluginType == 'youtube') {
				if (muted) {
					this.pluginApi.mute();
				} else {
					this.pluginApi.unMute();
				}
				this.muted = muted;
				this.dispatchEvent('volumechange');
			} else {
				this.pluginApi.setMuted(muted);
			}
			this.muted = muted;
		}
	},

	// additional non-HTML5 methods
	setVideoSize: function (width, height) {
		
		//if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
			if ( this.pluginElement.style) {
				this.pluginElement.style.width = width + 'px';
				this.pluginElement.style.height = height + 'px';
			}
			if (this.pluginApi != null && this.pluginApi.setVideoSize) {
				this.pluginApi.setVideoSize(width, height);
			}
		//}
	},

	setFullscreen: function (fullscreen) {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.pluginApi.setFullscreen(fullscreen);
		}
	},
	
	enterFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(true);
		}		
		
	},
	
	exitFullScreen: function() {
		if (this.pluginApi != null && this.pluginApi.setFullscreen) {
			this.setFullscreen(false);
		}
	},	

	// start: fake events
	addEventListener: function (eventName, callback, bubble) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(callback);
	},
	removeEventListener: function (eventName, callback) {
		if (!eventName) { this.events = {}; return true; }
		var callbacks = this.events[eventName];
		if (!callbacks) return true;
		if (!callback) { this.events[eventName] = []; return true; }
		for (i = 0; i < callbacks.length; i++) {
			if (callbacks[i] === callback) {
				this.events[eventName].splice(i, 1);
				return true;
			}
		}
		return false;
	},	
	dispatchEvent: function (eventName) {
		var i,
			args,
			callbacks = this.events[eventName];

		if (callbacks) {
			args = Array.prototype.slice.call(arguments, 1);
			for (i = 0; i < callbacks.length; i++) {
				callbacks[i].apply(null, args);
			}
		}
	},
	// end: fake events
	
	// fake DOM attribute methods
	attributes: {},
	hasAttribute: function(name){
		return (name in this.attributes);  
	},
	removeAttribute: function(name){
		delete this.attributes[name];
	},
	getAttribute: function(name){
		if (this.hasAttribute(name)) {
			return this.attributes[name];
		}
		return '';
	},
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},

	remove: function() {
		mejs.Utility.removeSwf(this.pluginElement.id);
	}
};

// Handles calls from Flash/Silverlight and reports them as native <video/audio> events and properties
mejs.MediaPluginBridge = {

	pluginMediaElements:{},
	htmlMediaElements:{},

	registerPluginElement: function (id, pluginMediaElement, htmlMediaElement) {
		this.pluginMediaElements[id] = pluginMediaElement;
		this.htmlMediaElements[id] = htmlMediaElement;
	},

	// when Flash/Silverlight is ready, it calls out to this method
	initPlugin: function (id) {

		var pluginMediaElement = this.pluginMediaElements[id],
			htmlMediaElement = this.htmlMediaElements[id];

		if (pluginMediaElement) {
			// find the javascript bridge
			switch (pluginMediaElement.pluginType) {
				case "flash":
					pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(id);
					break;
				case "silverlight":
					pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
					pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
					break;
			}
	
			if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
				pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
			}
		}
	},

	// receives events from Flash/Silverlight and sends them out as HTML5 media events
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
	fireEvent: function (id, eventName, values) {

		var
			e,
			i,
			bufferedTime,
			pluginMediaElement = this.pluginMediaElements[id];

		pluginMediaElement.ended = false;
		pluginMediaElement.paused = true;

		// fake event object to mimic real HTML media event.
		e = {
			type: eventName,
			target: pluginMediaElement
		};

		// attach all values to element and event object
		for (i in values) {
			pluginMediaElement[i] = values[i];
			e[i] = values[i];
		}

		// fake the newer W3C buffered TimeRange (loaded and total have been removed)
		bufferedTime = values.bufferedTime || 0;

		e.target.buffered = e.buffered = {
			start: function(index) {
				return 0;
			},
			end: function (index) {
				return bufferedTime;
			},
			length: 1
		};

		pluginMediaElement.dispatchEvent(e.type, e);
	}
};

/*
Default options
*/
mejs.MediaElementDefaults = {
	// allows testing on HTML5, flash, silverlight
	// auto: attempts to detect what the browser can do
	// auto_plugin: prefer plugins and then attempt native HTML5
	// native: forces HTML5 playback
	// shim: disallows HTML5, will attempt either Flash or Silverlight
	// none: forces fallback view
	mode: 'auto',
	// remove or reorder to change plugin priority and availability
	plugins: ['flash','silverlight','youtube','vimeo'],
	// shows debug errors on screen
	enablePluginDebug: false,
	// overrides the type specified, useful for dynamic instantiation
	type: '',
	// path to Flash and Silverlight plugins
	pluginPath: mejs.Utility.getScriptPath(['mediaelement.js','mediaelement.min.js','mediaelement-and-player.js','mediaelement-and-player.min.js']),
	// name of flash file
	flashName: 'flashmediaelement.swf',
	// turns on the smoothing filter in Flash
	enablePluginSmoothing: false,
	// name of silverlight file
	silverlightName: 'silverlightmediaelement.xap',
	// default if the <video width> is not specified
	defaultVideoWidth: 480,
	// default if the <video height> is not specified
	defaultVideoHeight: 270,
	// overrides <video width>
	pluginWidth: -1,
	// overrides <video height>
	pluginHeight: -1,
	// additional plugin variables in 'key=value' form
	pluginVars: [],	
	// rate in milliseconds for Flash and Silverlight to fire the timeupdate event
	// larger number is less accurate, but less strain on plugin->JavaScript bridge
	timerRate: 250,
	// initial volume for player
	startVolume: 0.8,
	success: function () { },
	error: function () { }
};

/*
Determines if a browser supports the <video> or <audio> element
and returns either the native element or a Flash/Silverlight version that
mimics HTML5 MediaElement
*/
mejs.MediaElement = function (el, o) {
	return mejs.HtmlMediaElementShim.create(el,o);
};

mejs.HtmlMediaElementShim = {

	create: function(el, o) {
		var
			options = mejs.MediaElementDefaults,
			htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
			tagName = htmlMediaElement.tagName.toLowerCase(),
			isMediaTag = (tagName === 'audio' || tagName === 'video'),
			src = (isMediaTag) ? htmlMediaElement.getAttribute('src') : htmlMediaElement.getAttribute('href'),
			poster = htmlMediaElement.getAttribute('poster'),
			autoplay =  htmlMediaElement.getAttribute('autoplay'),
			preload =  htmlMediaElement.getAttribute('preload'),
			controls =  htmlMediaElement.getAttribute('controls'),
			playback,
			prop;

		// extend options
		for (prop in o) {
			options[prop] = o[prop];
		}

		// clean up attributes
		src = 		(typeof src == 'undefined' 	|| src === null || src == '') ? null : src;		
		poster =	(typeof poster == 'undefined' 	|| poster === null) ? '' : poster;
		preload = 	(typeof preload == 'undefined' 	|| preload === null || preload === 'false') ? 'none' : preload;
		autoplay = 	!(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
		controls = 	!(typeof controls == 'undefined' || controls === null || controls === 'false');

		// test for HTML5 and plugin capabilities
		playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
		playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '';

		if (playback.method == 'native') {
			// second fix for android
			if (mejs.MediaFeatures.isBustedAndroid) {
				htmlMediaElement.src = playback.url;
				htmlMediaElement.addEventListener('click', function() {
					htmlMediaElement.play();
				}, false);
			}
		
			// add methods to native HTMLMediaElement
			return this.updateNative(playback, options, autoplay, preload);
		} else if (playback.method !== '') {
			// create plugin to mimic HTMLMediaElement
			
			return this.createPlugin( playback,  options, poster, autoplay, preload, controls);
		} else {
			// boo, no HTML5, no Flash, no Silverlight.
			this.createErrorMessage( playback, options, poster );
			
			return this;
		}
	},
	
	determinePlayback: function(htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
		var
			mediaFiles = [],
			i,
			j,
			k,
			l,
			n,
			type,
			result = { method: '', url: '', htmlMediaElement: htmlMediaElement, isVideo: (htmlMediaElement.tagName.toLowerCase() != 'audio')},
			pluginName,
			pluginVersions,
			pluginInfo,
			dummy;
			
		// STEP 1: Get URL and type from <video src> or <source src>

		// supplied type overrides <video type> and <source type>
		if (typeof options.type != 'undefined' && options.type !== '') {
			
			// accept either string or array of types
			if (typeof options.type == 'string') {
				mediaFiles.push({type:options.type, url:src});
			} else {
				
				for (i=0; i<options.type.length; i++) {
					mediaFiles.push({type:options.type[i], url:src});
				}
			}

		// test for src attribute first
		} else if (src !== null) {
			type = this.formatType(src, htmlMediaElement.getAttribute('type'));
			mediaFiles.push({type:type, url:src});

		// then test for <source> elements
		} else {
			// test <source> types to see if they are usable
			for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
				n = htmlMediaElement.childNodes[i];
				if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
					src = n.getAttribute('src');
					type = this.formatType(src, n.getAttribute('type'));
					mediaFiles.push({type:type, url:src});
				}
			}
		}
		
		// in the case of dynamicly created players
		// check for audio types
		if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf('audio') > -1) {
			result.isVideo = false;
		}
		

		// STEP 2: Test for playback method
		
		// special case for Android which sadly doesn't implement the canPlayType function (always returns '')
		if (mejs.MediaFeatures.isBustedAndroid) {
			htmlMediaElement.canPlayType = function(type) {
				return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'maybe' : '';
			};
		}		
		

		// test for native playback first
		if (supportsMediaTag && (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'native')) {
						
			if (!isMediaTag) {

				// create a real HTML5 Media Element 
				dummy = document.createElement( result.isVideo ? 'video' : 'audio');			
				htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
				htmlMediaElement.style.display = 'none';
				
				// use this one from now on
				result.htmlMediaElement = htmlMediaElement = dummy;
			}
				
			for (i=0; i<mediaFiles.length; i++) {
				// normal check
				if (htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== '' 
					// special case for Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
					|| htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/,'mpeg')).replace(/no/, '') !== '') {
					result.method = 'native';
					result.url = mediaFiles[i].url;
					break;
				}
			}			
			
			if (result.method === 'native') {
				if (result.url !== null) {
					htmlMediaElement.src = result.url;
				}
			
				// if `auto_plugin` mode, then cache the native result but try plugins.
				if (options.mode !== 'auto_plugin') {
					return result;
				}
			}
		}

		// if native playback didn't work, then test plugins
		if (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'shim') {
			for (i=0; i<mediaFiles.length; i++) {
				type = mediaFiles[i].type;

				// test all plugins in order of preference [silverlight, flash]
				for (j=0; j<options.plugins.length; j++) {

					pluginName = options.plugins[j];
			
					// test version of plugin (for future features)
					pluginVersions = mejs.plugins[pluginName];				
					
					for (k=0; k<pluginVersions.length; k++) {
						pluginInfo = pluginVersions[k];
					
						// test if user has the correct plugin version
						
						// for youtube/vimeo
						if (pluginInfo.version == null || 
							
							mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {

							// test for plugin playback types
							for (l=0; l<pluginInfo.types.length; l++) {
								// find plugin that can play the type
								if (type == pluginInfo.types[l]) {
									result.method = pluginName;
									result.url = mediaFiles[i].url;
									return result;
								}
							}
						}
					}
				}
			}
		}
		
		// at this point, being in 'auto_plugin' mode implies that we tried plugins but failed.
		// if we have native support then return that.
		if (options.mode === 'auto_plugin' && result.method === 'native') {
			return result;
		}

		// what if there's nothing to play? just grab the first available
		if (result.method === '' && mediaFiles.length > 0) {
			result.url = mediaFiles[0].url;
		}

		return result;
	},

	formatType: function(url, type) {
		var ext;

		// if no type is supplied, fake it with the extension
		if (url && !type) {		
			return this.getTypeFromFile(url);
		} else {
			// only return the mime part of the type in case the attribute contains the codec
			// see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
			// `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
			
			if (type && ~type.indexOf(';')) {
				return type.substr(0, type.indexOf(';')); 
			} else {
				return type;
			}
		}
	},
	
	getTypeFromFile: function(url) {
		var ext = url.substring(url.lastIndexOf('.') + 1);
		return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video' : 'audio') + '/' + this.getTypeFromExtension(ext);
	},
	
	getTypeFromExtension: function(ext) {
		
		switch (ext) {
			case 'mp4':
			case 'm4v':
				return 'mp4';
			case 'webm':
			case 'webma':
			case 'webmv':	
				return 'webm';
			case 'ogg':
			case 'oga':
			case 'ogv':	
				return 'ogg';
			default:
				return ext;
		}
	},

	createErrorMessage: function(playback, options, poster) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			errorContainer = document.createElement('div');
			
		errorContainer.className = 'me-cannotplay';

		try {
			errorContainer.style.width = htmlMediaElement.width + 'px';
			errorContainer.style.height = htmlMediaElement.height + 'px';
		} catch (e) {}

		errorContainer.innerHTML = (poster !== '') ?
			'<a href="' + playback.url + '"><img src="' + poster + '" width="100%" height="100%" /></a>' :
			'<a href="' + playback.url + '"><span>Download File</span></a>';

		htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
		htmlMediaElement.style.display = 'none';

		options.error(htmlMediaElement);
	},

	createPlugin:function(playback, options, poster, autoplay, preload, controls) {
		var 
			htmlMediaElement = playback.htmlMediaElement,
			width = 1,
			height = 1,
			pluginid = 'me_' + playback.method + '_' + (mejs.meIndex++),
			pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
			container = document.createElement('div'),
			specialIEContainer,
			node,
			initVars;

		// copy tagName from html media element
		pluginMediaElement.tagName = htmlMediaElement.tagName

		// copy attributes from html media element to plugin media element
		for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
			var attribute = htmlMediaElement.attributes[i];
			if (attribute.specified == true) {
				pluginMediaElement.setAttribute(attribute.name, attribute.value);
			}
		}

		// check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
		node = htmlMediaElement.parentNode;
		while (node !== null && node.tagName.toLowerCase() != 'body') {
			if (node.parentNode.tagName.toLowerCase() == 'p') {
				node.parentNode.parentNode.insertBefore(node, node.parentNode);
				break;
			}
			node = node.parentNode;
		}

		if (playback.isVideo) {
			width = (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
			height = (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;
		
			// in case of '%' make sure it's encoded
			width = mejs.Utility.encodeUrl(width);
			height = mejs.Utility.encodeUrl(height);
		
		} else {
			if (options.enablePluginDebug) {
				width = 320;
				height = 240;
			}
		}

		// register plugin
		pluginMediaElement.success = options.success;
		mejs.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);

		// add container (must be added to DOM before inserting HTML for IE)
		container.className = 'me-plugin';
		container.id = pluginid + '_container';
		
		if (playback.isVideo) {
				htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
		} else {
				document.body.insertBefore(container, document.body.childNodes[0]);
		}

		// flash/silverlight vars
		initVars = [
			'id=' + pluginid,
			'isvideo=' + ((playback.isVideo) ? "true" : "false"),
			'autoplay=' + ((autoplay) ? "true" : "false"),
			'preload=' + preload,
			'width=' + width,
			'startvolume=' + options.startVolume,
			'timerrate=' + options.timerRate,
			'height=' + height];

		if (playback.url !== null) {
			if (playback.method == 'flash') {
				initVars.push('file=' + mejs.Utility.encodeUrl(playback.url));
			} else {
				initVars.push('file=' + playback.url);
			}
		}
		if (options.enablePluginDebug) {
			initVars.push('debug=true');
		}
		if (options.enablePluginSmoothing) {
			initVars.push('smoothing=true');
		}
		if (controls) {
			initVars.push('controls=true'); // shows controls in the plugin if desired
		}
		if (options.pluginVars) {
			initVars = initVars.concat(options.pluginVars);
		}		

		switch (playback.method) {
			case 'silverlight':
				container.innerHTML =
'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="initParams" value="' + initVars.join(',') + '" />' +
'<param name="windowless" value="true" />' +
'<param name="background" value="black" />' +
'<param name="minRuntimeVersion" value="3.0.0.0" />' +
'<param name="autoUpgrade" value="true" />' +
'<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
'</object>';
					break;

			case 'flash':

				if (mejs.MediaFeatures.isIE) {
					specialIEContainer = document.createElement('div');
					container.appendChild(specialIEContainer);
					specialIEContainer.outerHTML =
'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + pluginid + '" width="' + width + '" height="' + height + '">' +
'<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" />' +
'<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
'<param name="quality" value="high" />' +
'<param name="bgcolor" value="#000000" />' +
'<param name="wmode" value="transparent" />' +
'<param name="allowScriptAccess" value="always" />' +
'<param name="allowFullScreen" value="true" />' +
'</object>';

				} else {

					container.innerHTML =
'<embed id="' + pluginid + '" name="' + pluginid + '" ' +
'play="true" ' +
'loop="false" ' +
'quality="high" ' +
'bgcolor="#000000" ' +
'wmode="transparent" ' +
'allowScriptAccess="always" ' +
'allowFullScreen="true" ' +
'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' +
'src="' + options.pluginPath + options.flashName + '" ' +
'flashvars="' + initVars.join('&') + '" ' +
'width="' + width + '" ' +
'height="' + height + '"></embed>';
				}
				break;
			
			case 'youtube':
			
				
				var
					videoId = playback.url.substr(playback.url.lastIndexOf('=')+1);
					youtubeSettings = {
						container: container,
						containerId: container.id,
						pluginMediaElement: pluginMediaElement,
						pluginId: pluginid,
						videoId: videoId,
						height: height,
						width: width	
					};				
				
				if (mejs.PluginDetector.hasPluginVersion('flash', [10,0,0]) ) {
					mejs.YouTubeApi.createFlash(youtubeSettings);
				} else {
					mejs.YouTubeApi.enqueueIframe(youtubeSettings);		
				}
				
				break;
			
			// DEMO Code. Does NOT work.
			case 'vimeo':
				//console.log('vimeoid');
				
				pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf('/')+1);
				
				container.innerHTML =
					'<object width="' + width + '" height="' + height + '">' +
						'<param name="allowfullscreen" value="true" />' +
						'<param name="allowscriptaccess" value="always" />' +
						'<param name="flashvars" value="api=1" />' + 
						'<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + pluginMediaElement.vimeoid  + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" />' +
						'<embed src="//vimeo.com/moogaloop.swf?api=1&amp;clip_id=' + pluginMediaElement.vimeoid + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + width + '" height="' + height + '"></embed>' +
					'</object>';
					
				break;			
		}
		// hide original element
		htmlMediaElement.style.display = 'none';

		// FYI: options.success will be fired by the MediaPluginBridge
		
		return pluginMediaElement;
	},

	updateNative: function(playback, options, autoplay, preload) {
		
		var htmlMediaElement = playback.htmlMediaElement,
			m;
		
		
		// add methods to video object to bring it into parity with Flash Object
		for (m in mejs.HtmlMediaElement) {
			htmlMediaElement[m] = mejs.HtmlMediaElement[m];
		}

		/*
		Chrome now supports preload="none"
		if (mejs.MediaFeatures.isChrome) {
		
			// special case to enforce preload attribute (Chrome doesn't respect this)
			if (preload === 'none' && !autoplay) {
			
				// forces the browser to stop loading (note: fails in IE9)
				htmlMediaElement.src = '';
				htmlMediaElement.load();
				htmlMediaElement.canceledPreload = true;

				htmlMediaElement.addEventListener('play',function() {
					if (htmlMediaElement.canceledPreload) {
						htmlMediaElement.src = playback.url;
						htmlMediaElement.load();
						htmlMediaElement.play();
						htmlMediaElement.canceledPreload = false;
					}
				}, false);
			// for some reason Chrome forgets how to autoplay sometimes.
			} else if (autoplay) {
				htmlMediaElement.load();
				htmlMediaElement.play();
			}
		}
		*/

		// fire success code
		options.success(htmlMediaElement, htmlMediaElement);
		
		return htmlMediaElement;
	}
};

/*
 - test on IE (object vs. embed)
 - determine when to use iframe (Firefox, Safari, Mobile) vs. Flash (Chrome, IE)
 - fullscreen?
*/

// YouTube Flash and Iframe API
mejs.YouTubeApi = {
	isIframeStarted: false,
	isIframeLoaded: false,
	loadIframeApi: function() {
		if (!this.isIframeStarted) {
			var tag = document.createElement('script');
			tag.src = "http://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			this.isIframeStarted = true;
		}
	},
	iframeQueue: [],
	enqueueIframe: function(yt) {
		
		if (this.isLoaded) {
			this.createIframe(yt);
		} else {
			this.loadIframeApi();
			this.iframeQueue.push(yt);
		}
	},
	createIframe: function(settings) {
		
		var
		pluginMediaElement = settings.pluginMediaElement,	
		player = new YT.Player(settings.containerId, {
			height: settings.height,
			width: settings.width,
			videoId: settings.videoId,
			playerVars: {controls:0},
			events: {
				'onReady': function() {
					
					// hook up iframe object to MEjs
					settings.pluginMediaElement.pluginApi = player;
					
					// init mejs
					mejs.MediaPluginBridge.initPlugin(settings.pluginId);
					
					// create timer
					setInterval(function() {
						mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
					}, 250);					
				},
				'onStateChange': function(e) {
					
					mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);
					
				}
			}
		});
	},
	
	createEvent: function (player, pluginMediaElement, eventName) {
		var obj = {
			type: eventName,
			target: pluginMediaElement
		};

		if (player && player.getDuration) {
			
			// time 
			pluginMediaElement.currentTime = obj.currentTime = player.getCurrentTime();
			pluginMediaElement.duration = obj.duration = player.getDuration();
			
			// state
			obj.paused = pluginMediaElement.paused;
			obj.ended = pluginMediaElement.ended;			
			
			// sound
			obj.muted = player.isMuted();
			obj.volume = player.getVolume() / 100;
			
			// progress
			obj.bytesTotal = player.getVideoBytesTotal();
			obj.bufferedBytes = player.getVideoBytesLoaded();
			
			// fake the W3C buffered TimeRange
			var bufferedTime = obj.bufferedBytes / obj.bytesTotal * obj.duration;
			
			obj.target.buffered = obj.buffered = {
				start: function(index) {
					return 0;
				},
				end: function (index) {
					return bufferedTime;
				},
				length: 1
			};
			
		}
		
		// send event up the chain
		pluginMediaElement.dispatchEvent(obj.type, obj);
	},	
	
	iFrameReady: function() {
		
		this.isLoaded = true;
		this.isIframeLoaded = true;
		
		while (this.iframeQueue.length > 0) {
			var settings = this.iframeQueue.pop();
			this.createIframe(settings);
		}	
	},
	
	// FLASH!
	flashPlayers: {},
	createFlash: function(settings) {
		
		this.flashPlayers[settings.pluginId] = settings;
		
		/*
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
				'<param name="allowScriptAccess" value="always">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		*/

		var specialIEContainer,
			youtubeUrl = 'http://www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';
			
		if (mejs.MediaFeatures.isIE) {
			
			specialIEContainer = document.createElement('div');
			settings.container.appendChild(specialIEContainer);
			specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
'id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '">' +
	'<param name="movie" value="' + youtubeUrl + '" />' +
	'<param name="wmode" value="transparent" />' +
	'<param name="allowScriptAccess" value="always" />' +
	'<param name="allowFullScreen" value="true" />' +
'</object>';
		} else {
		settings.container.innerHTML =
			'<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" ' +
				'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
				'<param name="allowScriptAccess" value="always">' +
				'<param name="wmode" value="transparent">' +
			'</object>';
		}		
		
	},
	
	flashReady: function(id) {
		var
			settings = this.flashPlayers[id],
			player = document.getElementById(id),
			pluginMediaElement = settings.pluginMediaElement;
		
		// hook up and return to MediaELementPlayer.success	
		pluginMediaElement.pluginApi = 
		pluginMediaElement.pluginElement = player;
		mejs.MediaPluginBridge.initPlugin(id);
		
		// load the youtube video
		player.cueVideoById(settings.videoId);
		
		var callbackName = settings.containerId + '_callback'
		
		window[callbackName] = function(e) {
			mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
		}
		
		player.addEventListener('onStateChange', callbackName);
		
		setInterval(function() {
			mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
		}, 250);
	},
	
	handleStateChange: function(youTubeState, player, pluginMediaElement) {
		switch (youTubeState) {
			case -1: // not started
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'loadedmetadata');
				//createYouTubeEvent(player, pluginMediaElement, 'loadeddata');
				break;
			case 0:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = true;
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'ended');
				break;
			case 1:
				pluginMediaElement.paused = false;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'play');
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'playing');
				break;
			case 2:
				pluginMediaElement.paused = true;
				pluginMediaElement.ended = false;				
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'pause');
				break;
			case 3: // buffering
				mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'progress');
				break;
			case 5:
				// cued?
				break;						
			
		}			
		
	}
}
// IFRAME
function onYouTubePlayerAPIReady() {
	mejs.YouTubeApi.iFrameReady();
}
// FLASH
function onYouTubePlayerReady(id) {
	mejs.YouTubeApi.flashReady(id);
}

window.mejs = mejs;
window.MediaElement = mejs.MediaElement;


/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2012, John Dyer (http://j.hn/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
if (typeof jQuery != 'undefined') {
	mejs.$ = jQuery;
} else if (typeof ender != 'undefined') {
	mejs.$ = ender;
}
(function ($) {

	// default player values
	mejs.MepDefaults = {
		// url to poster (to fix iOS 3.x)
		poster: '',
		// default if the <video width> is not specified
		defaultVideoWidth: 480,
		// default if the <video height> is not specified
		defaultVideoHeight: 270,
		// if set, overrides <video width>
		videoWidth: -1,
		// if set, overrides <video height>
		videoHeight: -1,
		// default if the user doesn't specify
		defaultAudioWidth: 400,
		// default if the user doesn't specify
		defaultAudioHeight: 30,

		// default amount to move back when back key is pressed		
		defaultSeekBackwardInterval: function(media) {
			return (media.duration * 0.05);
		},		
		// default amount to move forward when forward key is pressed				
		defaultSeekForwardInterval: function(media) {
			return (media.duration * 0.05);
		},		
		
		// width of audio player
		audioWidth: -1,
		// height of audio player
		audioHeight: -1,		
		// initial volume when the player starts (overrided by user cookie)
		startVolume: 0.8,
		// useful for <audio> player loops
		loop: false,
		// resize to media dimensions
		enableAutosize: true,
		// forces the hour marker (##:00:00)
		alwaysShowHours: false,

		// show framecount in timecode (##:00:00:00)
		showTimecodeFrameCount: false,
		// used when showTimecodeFrameCount is set to true
		framesPerSecond: 25,
		
		// automatically calculate the width of the progress bar based on the sizes of other elements
		autosizeProgress : true,
		// Hide controls when playing and mouse is not over the video
		alwaysShowControls: false,
		// force iPad's native controls
		iPadUseNativeControls: false,
		// force iPhone's native controls
		iPhoneUseNativeControls: false,	
		// force Android's native controls
		AndroidUseNativeControls: false,			
		// features to show
		features: ['playpause','current','progress','duration','tracks','volume','fullscreen'],
		// only for dynamic
		isVideo: true,
		
		// turns keyboard support on and off for this instance
		enableKeyboard: true,
		
		// whenthis player starts, it will pause other players
		pauseOtherPlayers: true,
		
		// array of keyboard actions such as play pause
		keyActions: [
				{
						keys: [
								32, // SPACE
								179 // GOOGLE play/pause button
							  ],
						action: function(player, media) {
								if (media.paused || media.ended) {
										media.play();	
								} else {
										media.pause();
								}										
						}
				},
				{
						keys: [38], // UP
						action: function(player, media) {
								var newVolume = Math.min(media.volume + 0.1, 1);
								media.setVolume(newVolume);
						}
				},
				{
						keys: [40], // DOWN
						action: function(player, media) {
								var newVolume = Math.max(media.volume - 0.1, 0);
								media.setVolume(newVolume);
						}
				},
				{
						keys: [
								37, // LEFT
								227 // Google TV rewind
						],
						action: function(player, media) {
								if (!isNaN(media.duration) && media.duration > 0) {
										if (player.isVideo) {
												player.showControls();
												player.startControlsTimer();
										}
										
										// 5%
										var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);
										media.setCurrentTime(newTime);
								}
						}
				},
				{
						keys: [
								39, // RIGHT
								228 // Google TV forward
						], 
						action: function(player, media) {
								if (!isNaN(media.duration) && media.duration > 0) {
										if (player.isVideo) {
												player.showControls();
												player.startControlsTimer();
										}
										
										// 5%
										var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);										
										media.setCurrentTime(newTime);
								}
						}
				},
				{
						keys: [70], // f
						action: function(player, media) {
								if (typeof player.enterFullScreen != 'undefined') {
										if (player.isFullScreen) {
												player.exitFullScreen();
										} else {
												player.enterFullScreen();
										}
								}
						}
				}					
		]		
	};

	mejs.mepIndex = 0;
	
	mejs.players = [];

	// wraps a MediaElement object in player controls
	mejs.MediaElementPlayer = function(node, o) {
		// enforce object, even without "new" (via John Resig)
		if ( !(this instanceof mejs.MediaElementPlayer) ) {
			return new mejs.MediaElementPlayer(node, o);
		} 

		var t = this;
		
		// these will be reset after the MediaElement.success fires
		t.$media = t.$node = $(node);
		t.node = t.media = t.$media[0];		
		
		// check for existing player
		if (typeof t.node.player != 'undefined') {
			return t.node.player;
		} else {
			// attach player to DOM node for reference
			t.node.player = t;
		}
				
				
		// try to get options from data-mejsoptions
		if (typeof o == 'undefined') {
			o = t.$node.data('mejsoptions');	
		}
			
		// extend default options
		t.options = $.extend({},mejs.MepDefaults,o);
		
		// add to player array (for focus events)
		mejs.players.push(t);
		
		// start up
		t.init();

		return t;
	};

	// actual player
	mejs.MediaElementPlayer.prototype = {
		
		hasFocus: false,
		
		controlsAreVisible: true,
		
		init: function() {

			var
				t = this,
				mf = mejs.MediaFeatures,
				// options for MediaElement (shim)
				meOptions = $.extend(true, {}, t.options, {
					success: function(media, domNode) { t.meReady(media, domNode); },
					error: function(e) { t.handleError(e);}
				}),
				tagName = t.media.tagName.toLowerCase();
		
			t.isDynamic = (tagName !== 'audio' && tagName !== 'video');
			
			if (t.isDynamic) {	
				// get video from src or href?				
				t.isVideo = t.options.isVideo;						
			} else {
				t.isVideo = (tagName !== 'audio' && t.options.isVideo);
			}
		
			// use native controls in iPad, iPhone, and Android	
			if ((mf.isiPad && t.options.iPadUseNativeControls) || (mf.isiPhone && t.options.iPhoneUseNativeControls)) {
				
				// add controls and stop
				t.$media.attr('controls', 'controls');

				// attempt to fix iOS 3 bug
				//t.$media.removeAttr('poster');
                                // no Issue found on iOS3 -ttroxell

				// override Apple's autoplay override for iPads
				if (mf.isiPad && t.media.getAttribute('autoplay') !== null) {
					t.media.load();
					t.media.play();
				}
					
			} else if (mf.isAndroid && t.AndroidUseNativeControls) {
				
				// leave default player

			} else {

				// DESKTOP: use MediaElementPlayer controls
				
				// remove native controls 			
				t.$media.removeAttr('controls');					
				
				// unique ID
				t.id = 'mep_' + mejs.mepIndex++;

				// build container
				t.container =
					$('<div id="' + t.id + '" class="mejs-container">'+
						'<div class="mejs-inner">'+
							'<div class="mejs-mediaelement"></div>'+
							'<div class="mejs-layers"></div>'+
							'<div class="mejs-controls"></div>'+
							'<div class="mejs-clear"></div>'+
						'</div>' +
					'</div>')
					.addClass(t.$media[0].className)
					.insertBefore(t.$media);	
					
				// add classes for user and content
				t.container.addClass(
					(mf.isAndroid ? 'mejs-android ' : '') +
					(mf.isiOS ? 'mejs-ios ' : '') +
					(mf.isiPad ? 'mejs-ipad ' : '') +
					(mf.isiPhone ? 'mejs-iphone ' : '') +
					(t.isVideo ? 'mejs-video ' : 'mejs-audio ')
				);	
					

				// move the <video/video> tag into the right spot
				if (mf.isiOS) {
				
					// sadly, you can't move nodes in iOS, so we have to destroy and recreate it!
					var $newMedia = t.$media.clone();
					
					t.container.find('.mejs-mediaelement').append($newMedia);
					
					t.$media.remove();
					t.$node = t.$media = $newMedia;
					t.node = t.media = $newMedia[0]
					
				} else {
					
					// normal way of moving it into place (doesn't work on iOS)
					t.container.find('.mejs-mediaelement').append(t.$media);
				}
				
				// find parts
				t.controls = t.container.find('.mejs-controls');
				t.layers = t.container.find('.mejs-layers');

				// determine the size
				
				/* size priority:
					(1) videoWidth (forced), 
					(2) style="width;height;"
					(3) width attribute,
					(4) defaultVideoWidth (for unspecified cases)
				*/
				
				var tagType = (t.isVideo ? 'video' : 'audio'),
					capsTagName = tagType.substring(0,1).toUpperCase() + tagType.substring(1);
					
				
				if (t.options[tagType + 'Width'] > 0 || t.options[tagType + 'Width'].toString().indexOf('%') > -1) {
					t.width = t.options[tagType + 'Width'];
				} else if (t.media.style.width !== '' && t.media.style.width !== null) {
					t.width = t.media.style.width;						
				} else if (t.media.getAttribute('width') !== null) {
					t.width = t.$media.attr('width');
				} else {
					t.width = t.options['default' + capsTagName + 'Width'];
				}
				
				if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {
					t.height = t.options[tagType + 'Height'];
				} else if (t.media.style.height !== '' && t.media.style.height !== null) {
					t.height = t.media.style.height;
				} else if (t.$media[0].getAttribute('height') !== null) {
					t.height = t.$media.attr('height');	
				} else {
					t.height = t.options['default' + capsTagName + 'Height'];
				}

				// set the size, while we wait for the plugins to load below
				t.setPlayerSize(t.width, t.height);
				
				// create MediaElementShim
				meOptions.pluginWidth = t.height;
				meOptions.pluginHeight = t.width;				
			}
			
			

			// create MediaElement shim
			mejs.MediaElement(t.$media[0], meOptions);
		},
		
		showControls: function(doAnimation) {
			var t = this;
			
			doAnimation = typeof doAnimation == 'undefined' || doAnimation;
			
			if (t.controlsAreVisible)
				return;
			
			if (doAnimation) {
				t.controls
					.css('visibility','visible')
					.stop(true, true).fadeIn(200, function() {t.controlsAreVisible = true;});	
	
				// any additional controls people might add and want to hide
				t.container.find('.mejs-control')
					.css('visibility','visible')
					.stop(true, true).fadeIn(200, function() {t.controlsAreVisible = true;});	
					
			} else {
				t.controls
					.css('visibility','visible')
					.css('display','block');
	
				// any additional controls people might add and want to hide
				t.container.find('.mejs-control')
					.css('visibility','visible')
					.css('display','block');
					
				t.controlsAreVisible = true;
			}
			
			t.setControlsSize();
			
		},

		hideControls: function(doAnimation) {
			var t = this;
			
			doAnimation = typeof doAnimation == 'undefined' || doAnimation;
			
			if (!t.controlsAreVisible)
				return;
			
			if (doAnimation) {
				// fade out main controls
				t.controls.stop(true, true).fadeOut(200, function() {
					$(this)
						.css('visibility','hidden')
						.css('display','block');
						
					t.controlsAreVisible = false;
				});	
	
				// any additional controls people might add and want to hide
				t.container.find('.mejs-control').stop(true, true).fadeOut(200, function() {
					$(this)
						.css('visibility','hidden')
						.css('display','block');
				});	
			} else {
				
				// hide main controls
				t.controls
					.css('visibility','hidden')
					.css('display','block');		
				
				// hide others
				t.container.find('.mejs-control')
					.css('visibility','hidden')
					.css('display','block');
					
				t.controlsAreVisible = false;
			}
		},		

		controlsTimer: null,

		startControlsTimer: function(timeout) {

			var t = this;
			
			timeout = typeof timeout != 'undefined' ? timeout : 1500;

			t.killControlsTimer('start');

			t.controlsTimer = setTimeout(function() {
				//console.log('timer fired');
				t.hideControls();
				t.killControlsTimer('hide');
			}, timeout);
		},

		killControlsTimer: function(src) {

			var t = this;

			if (t.controlsTimer !== null) {
				clearTimeout(t.controlsTimer);
				delete t.controlsTimer;
				t.controlsTimer = null;
			}
		},		
		
		controlsEnabled: true,
		
		disableControls: function() {
			var t= this;
			
			t.killControlsTimer();
			t.hideControls(false);
			this.controlsEnabled = false;
		},
		
		enableControls: function() {
			var t= this;
			
			t.showControls(false);
			
			t.controlsEnabled = true;
		},		
		

		// Sets up all controls and events
		meReady: function(media, domNode) {			
		
		
			var t = this,
				mf = mejs.MediaFeatures,
				autoplayAttr = domNode.getAttribute('autoplay'),
				autoplay = !(typeof autoplayAttr == 'undefined' || autoplayAttr === null || autoplayAttr === 'false'),
				featureIndex,
				feature;

			// make sure it can't create itself again if a plugin reloads
			if (t.created)
				return;
			else
				t.created = true;			

			t.media = media;
			t.domNode = domNode;
			
			if (!(mf.isAndroid && t.options.AndroidUseNativeControls) && !(mf.isiPad && t.options.iPadUseNativeControls) && !(mf.isiPhone && t.options.iPhoneUseNativeControls)) {				
				
				// two built in features
				t.buildposter(t, t.controls, t.layers, t.media);
				t.buildkeyboard(t, t.controls, t.layers, t.media);
				t.buildoverlays(t, t.controls, t.layers, t.media);

				// grab for use by features
				t.findTracks();

				// add user-defined features/controls
				for (featureIndex in t.options.features) {
					feature = t.options.features[featureIndex];
					if (t['build' + feature]) {
						try {
							t['build' + feature](t, t.controls, t.layers, t.media);
						} catch (e) {
							// TODO: report control error
							//throw e;
							//console.log('error building ' + feature);
							//console.log(e);
						}
					}
				}

				t.container.trigger('controlsready');
				
				// reset all layers and controls
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();
				

				// controls fade
				if (t.isVideo) {
				
					if (mejs.MediaFeatures.hasTouch) {
						
						// for touch devices (iOS, Android)
						// show/hide without animation on touch
						
						t.$media.bind('touchstart', function() {
							
							
							// toggle controls
							if (t.controlsAreVisible) {
								t.hideControls(false);
							} else {
								if (t.controlsEnabled) {
									t.showControls(false);
								}
							}
						});					
					
					} else {
						// click controls
						var clickElement = (t.media.pluginType == 'native') ? t.$media : $(t.media.pluginElement);
						
						// click to play/pause
						clickElement.click(function() {
							if (media.paused) {
								media.play();
							} else {
								media.pause();
							}
						});
						
					
						// show/hide controls
						t.container
							.bind('mouseenter mouseover', function () {
								if (t.controlsEnabled) {
									if (!t.options.alwaysShowControls) {								
										t.killControlsTimer('enter');
										t.showControls();
										t.startControlsTimer(2500);		
									}
								}
							})
							.bind('mousemove', function() {
								if (t.controlsEnabled) {
									if (!t.controlsAreVisible) {
										t.showControls();
									}
									//t.killControlsTimer('move');
									if (!t.options.alwaysShowControls) {
										t.startControlsTimer(2500);
									}
								}
							})
							.bind('mouseleave', function () {
								if (t.controlsEnabled) {
									if (!t.media.paused && !t.options.alwaysShowControls) {
										t.startControlsTimer(1000);								
									}
								}
							});
					}
					
					// check for autoplay
					if (autoplay && !t.options.alwaysShowControls) {
						t.hideControls();
					}

					// resizer
					if (t.options.enableAutosize) {
						t.media.addEventListener('loadedmetadata', function(e) {
							// if the <video height> was not set and the options.videoHeight was not set
							// then resize to the real dimensions
							if (t.options.videoHeight <= 0 && t.domNode.getAttribute('height') === null && !isNaN(e.target.videoHeight)) {
								t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
								t.setControlsSize();
								t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);
							}
						}, false);
					}
				}
				
				// EVENTS

				// FOCUS: when a video starts playing, it takes focus from other players (possibily pausing them)
				media.addEventListener('play', function() {

						// go through all other players
						for (var i=0, il=mejs.players.length; i<il; i++) {
							var p = mejs.players[i];
							if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
								p.pause();
							}
							p.hasFocus = false;
						}

						t.hasFocus = true;
				},false);
								

				// ended for all
				t.media.addEventListener('ended', function (e) {
					try{
						t.media.setCurrentTime(0);
					} catch (exp) {
						
					}
					t.media.pause();
					
					if (t.setProgressRail)
						t.setProgressRail();
					if (t.setCurrentRail)
						t.setCurrentRail();						

					if (t.options.loop) {
						t.media.play();
					} else if (!t.options.alwaysShowControls && t.controlsEnabled) {
						t.showControls();
					}
				}, false);
				
				// resize on the first play
				t.media.addEventListener('loadedmetadata', function(e) {
					if (t.updateDuration) {
						t.updateDuration();
					}
					if (t.updateCurrent) {
						t.updateCurrent();
					}
					
					if (!t.isFullScreen) {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}
				}, false);


				// webkit has trouble doing this without a delay
				setTimeout(function () {
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();
				}, 50);

				// adjust controls whenever window sizes (used to be in fullscreen only)
				$(window).resize(function() {

					// don't resize for fullscreen mode
					if ( !(t.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen)) ) {
						t.setPlayerSize(t.width, t.height);
					}

					// always adjust controls
					t.setControlsSize();
				});

				// TEMP: needs to be moved somewhere else
				if (t.media.pluginType == 'youtube') {
					t.container.find('.mejs-overlay-play').hide();	
				}
			}
			
			// force autoplay for HTML5
			if (autoplay && media.pluginType == 'native') {
				media.load();
				media.play();
			}


			if (t.options.success) {
				
				if (typeof t.options.success == 'string') {
						window[t.options.success](t.media, t.domNode, t);
				} else {
						t.options.success(t.media, t.domNode, t);
				}
			}
		},

		handleError: function(e) {
			var t = this;
			
			t.controls.hide();
		
			// Tell user that the file cannot be played
			if (t.options.error) {
				t.options.error(e);
			}
		},

		setPlayerSize: function(width,height) {
			var t = this;

			if (typeof width != 'undefined')
				t.width = width;
				
			if (typeof height != 'undefined')
				t.height = height;

			// detect 100% mode
			if (t.height.toString().indexOf('%') > 0 || t.$node.css('max-width') === '100%') {
			
				// do we have the native dimensions yet?
				var 
					nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth,
					nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight,
					parentWidth = t.container.parent().width(),
					newHeight = parseInt(parentWidth * nativeHeight/nativeWidth, 10);

				if (t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {
					parentWidth = $(window).width();
					newHeight = $(window).height();
				}
				
				if ( newHeight != 0 ) {
					// set outer container size
					t.container
						.width(parentWidth)
						.height(newHeight);
						
					// set native <video>
					t.$media
						.width('100%')
						.height('100%');
						
					// set shims
					t.container.find('object, embed, iframe')
						.width('100%')
						.height('100%');
						
					// if shim is ready, send the size to the embeded plugin	
					if (t.isVideo) {
						if (t.media.setVideoSize) {
							t.media.setVideoSize(parentWidth, newHeight);
						}
					}
					
					// set the layers
					t.layers.children('.mejs-layer')
						.width('100%')
						.height('100%');
				}
			
			
			} else {

				t.container
					.width(t.width)
					.height(t.height);
	
				t.layers.children('.mejs-layer')
					.width(t.width)
					.height(t.height);
					
			}
		},

		setControlsSize: function() {
			var t = this,
				usedWidth = 0,
				railWidth = 0,
				rail = t.controls.find('.mejs-time-rail'),
				total = t.controls.find('.mejs-time-total'),
				current = t.controls.find('.mejs-time-current'),
				loaded = t.controls.find('.mejs-time-loaded'),
				others = rail.siblings();
			

			// allow the size to come from custom CSS
			if (t.options && !t.options.autosizeProgress) {
				// Also, frontends devs can be more flexible 
				// due the opportunity of absolute positioning.
				railWidth = parseInt(rail.css('width'));
			}
			
			// attempt to autosize
			if (railWidth === 0 || !railWidth) {
				
				// find the size of all the other controls besides the rail
				others.each(function() {
					if ($(this).css('position') != 'absolute') {
						usedWidth += $(this).outerWidth(true);
					}
				});
				
				// fit the rail into the remaining space
				railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.width());
			}

			// outer area
			rail.width(railWidth);
			// dark space
			total.width(railWidth - (total.outerWidth(true) - total.width()));
			
			if (t.setProgressRail)
				t.setProgressRail();
			if (t.setCurrentRail)
				t.setCurrentRail();				
		},


		buildposter: function(player, controls, layers, media) {
			var t = this,
				poster = 
				$('<div class="mejs-poster mejs-layer">' +
				'</div>')
					.appendTo(layers),
				posterUrl = player.$media.attr('poster');

			// prioriy goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
			if (player.options.poster !== '') {
				posterUrl = player.options.poster;
			}	
				
			// second, try the real poster
			if (posterUrl !== '' && posterUrl != null) {
				t.setPoster(posterUrl);
			} else {
				poster.hide();
			}

			media.addEventListener('play',function() {
				poster.hide();
			}, false);
		},
		
		setPoster: function(url) {
			var t = this,
				posterDiv = t.container.find('.mejs-poster'),
				posterImg = posterDiv.find('img');
				
			if (posterImg.length == 0) {
				posterImg = $('<img width="100%" height="100%" />').appendTo(posterDiv);
			}	
			
			posterImg.attr('src', url);
		},

		buildoverlays: function(player, controls, layers, media) {
			if (!player.isVideo)
				return;

			var 
			loading = 
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-loading"><span></span></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),
			error = 
				$('<div class="mejs-overlay mejs-layer">'+
					'<div class="mejs-overlay-error"></div>'+
				'</div>')
				.hide() // start out hidden
				.appendTo(layers),
			// this needs to come last so it's on top
			bigPlay = 
				$('<div class="mejs-overlay mejs-layer mejs-overlay-play">'+
					'<div class="mejs-overlay-button"></div>'+
				'</div>')
				.appendTo(layers)
				.click(function() {
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
				});
			
			/*
			if (mejs.MediaFeatures.isiOS || mejs.MediaFeatures.isAndroid) {
				bigPlay.remove();
				loading.remove();
			}
			*/
	

			// show/hide big play button
			media.addEventListener('play',function() {
				bigPlay.hide();
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
				error.hide();
			}, false);	
			
			media.addEventListener('playing', function() {
				bigPlay.hide();
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
				error.hide();
			}, false);

			media.addEventListener('seeking', function() {
				loading.show();
				controls.find('.mejs-time-buffering').show();
			}, false);

			media.addEventListener('seeked', function() {
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
			}, false);
	
			media.addEventListener('pause',function() {
				if (!mejs.MediaFeatures.isiPhone) {
					bigPlay.show();
				}
			}, false);
			
			media.addEventListener('waiting', function() {
				loading.show();	
				controls.find('.mejs-time-buffering').show();
			}, false);			
			
			
			// show/hide loading			
			media.addEventListener('loadeddata',function() {
				// for some reason Chrome is firing this event
				//if (mejs.MediaFeatures.isChrome && media.getAttribute && media.getAttribute('preload') === 'none')
				//	return;
					
				loading.show();
				controls.find('.mejs-time-buffering').show();
			}, false);	
			media.addEventListener('canplay',function() {
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
			}, false);	

			// error handling
			media.addEventListener('error',function() {
				loading.hide();
				controls.find('.mejs-time-buffering').hide();
				error.show();
				error.find('mejs-overlay-error').html("Error loading this resource");
			}, false);				
		},
		
		buildkeyboard: function(player, controls, layers, media) {

				var t = this;
				
				// listen for key presses
				$(document).keydown(function(e) {
						
						if (player.hasFocus && player.options.enableKeyboard) {
										
								// find a matching key
								for (var i=0, il=player.options.keyActions.length; i<il; i++) {
										var keyAction = player.options.keyActions[i];
										
										for (var j=0, jl=keyAction.keys.length; j<jl; j++) {
												if (e.keyCode == keyAction.keys[j]) {
														e.preventDefault();
														keyAction.action(player, media, e.keyCode);
														return false;
												}												
										}
								}
						}
						
						return true;
				});
				
				// check if someone clicked outside a player region, then kill its focus
				$(document).click(function(event) {
						if ($(event.target).closest('.mejs-container').length == 0) {
								player.hasFocus = false;
						}
				});
			
		},

		findTracks: function() {
			var t = this,
				tracktags = t.$media.find('track');

			// store for use by plugins
			t.tracks = [];
			tracktags.each(function(index, track) {
				
				track = $(track);
				
				t.tracks.push({
					srclang: track.attr('srclang').toLowerCase(),
					src: track.attr('src'),
					kind: track.attr('kind'),
					label: track.attr('label') || '',
					entries: [],
					isLoaded: false
				});
			});
		},
		changeSkin: function(className) {
			this.container[0].className = 'mejs-container ' + className;
			this.setPlayerSize(this.width, this.height);
			this.setControlsSize();
		},
		play: function() {
			this.media.play();
		},
		pause: function() {
			this.media.pause();
		},
		load: function() {
			this.media.load();
		},
		setMuted: function(muted) {
			this.media.setMuted(muted);
		},
		setCurrentTime: function(time) {
			this.media.setCurrentTime(time);
		},
		getCurrentTime: function() {
			return this.media.currentTime;
		},
		setVolume: function(volume) {
			this.media.setVolume(volume);
		},
		getVolume: function() {
			return this.media.volume;
		},
		setSrc: function(src) {
			this.media.setSrc(src);
		},
		remove: function() {
			var t = this;
			
			if (t.media.pluginType === 'flash') {
				t.media.remove();
			} else if (t.media.pluginType === 'native') {
				t.$media.prop('controls', true);
			}
			
			// grab video and put it back in place
			if (!t.isDynamic) {
				t.$node.insertBefore(t.container)
			}
			
			t.container.remove();
		}
	};

	// turn into jQuery plugin
	if (typeof jQuery != 'undefined') {
		jQuery.fn.mediaelementplayer = function (options) {
			return this.each(function () {
				new mejs.MediaElementPlayer(this, options);
			});
		};
	}
	
	$(document).ready(function() {
		// auto enable using JSON attribute
		$('.mejs-player').mediaelementplayer();
	});
	
	// push out to window
	window.MediaElementPlayer = mejs.MediaElementPlayer;

})(mejs.$);

(function($) {

	$.extend(mejs.MepDefaults, {
		playpauseText: 'Play/Pause'
	});

	// PLAY/pause BUTTON
	$.extend(MediaElementPlayer.prototype, {
		buildplaypause: function(player, controls, layers, media) {
			var 
				t = this,
				play = 
				$('<div class="mejs-button mejs-playpause-button mejs-play" >' +
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.playpauseText + '"></button>' +
				'</div>')
				.appendTo(controls)
				.click(function(e) {
					e.preventDefault();
				
					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}
					
					return false;
				});

			media.addEventListener('play',function() {
				play.removeClass('mejs-play').addClass('mejs-pause');
			}, false);
			media.addEventListener('playing',function() {
				play.removeClass('mejs-play').addClass('mejs-pause');
			}, false);


			media.addEventListener('pause',function() {
				play.removeClass('mejs-pause').addClass('mejs-play');
			}, false);
			media.addEventListener('paused',function() {
				play.removeClass('mejs-pause').addClass('mejs-play');
			}, false);
		}
	});
	
})(mejs.$);
(function($) {

	$.extend(mejs.MepDefaults, {
		stopText: 'Stop'
	});

	// STOP BUTTON
	$.extend(MediaElementPlayer.prototype, {
		buildstop: function(player, controls, layers, media) {
			var t = this,
				stop = 
				$('<div class="mejs-button mejs-stop-button mejs-stop">' +
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.stopText + '"></button>' +
				'</div>')
				.appendTo(controls)
				.click(function() {
					if (!media.paused) {
						media.pause();
					}
					if (media.currentTime > 0) {
						media.setCurrentTime(0);	
						controls.find('.mejs-time-current').width('0px');
						controls.find('.mejs-time-handle').css('left', '0px');
						controls.find('.mejs-time-float-current').html( mejs.Utility.secondsToTimeCode(0) );
						controls.find('.mejs-currenttime').html( mejs.Utility.secondsToTimeCode(0) );					
						layers.find('.mejs-poster').show();
					}
				});
		}
	});
	
})(mejs.$);
(function($) {
	// progress/loaded bar
	$.extend(MediaElementPlayer.prototype, {
		buildprogress: function(player, controls, layers, media) {

			$('<div class="mejs-time-rail">'+
				'<span class="mejs-time-total">'+
					'<span class="mejs-time-buffering"></span>'+
					'<span class="mejs-time-loaded"></span>'+
					'<span class="mejs-time-current"></span>'+
					'<span class="mejs-time-handle"></span>'+
					'<span class="mejs-time-float">' + 
						'<span class="mejs-time-float-current">00:00</span>' + 
						'<span class="mejs-time-float-corner"></span>' + 
					'</span>'+
				'</span>'+
			'</div>')
				.appendTo(controls);
				controls.find('.mejs-time-buffering').hide();

			var 
				t = this,
				total = controls.find('.mejs-time-total'),
				loaded  = controls.find('.mejs-time-loaded'),
				current  = controls.find('.mejs-time-current'),
				handle  = controls.find('.mejs-time-handle'),
				timefloat  = controls.find('.mejs-time-float'),
				timefloatcurrent  = controls.find('.mejs-time-float-current'),
				handleMouseMove = function (e) {
					// mouse position relative to the object
					var x = e.pageX,
						offset = total.offset(),
						width = total.outerWidth(),
						percentage = 0,
						newTime = 0,
						pos = x - offset.left;


					if (x > offset.left && x <= width + offset.left && media.duration) {
						percentage = ((x - offset.left) / width);
						newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;

						// seek to where the mouse is
						if (mouseIsDown) {
							media.setCurrentTime(newTime);
						}

						// position floating time box
						if (!mejs.MediaFeatures.hasTouch) {
								timefloat.css('left', pos);
								timefloatcurrent.html( mejs.Utility.secondsToTimeCode(newTime) );
								timefloat.show();
						}
					}
				},
				mouseIsDown = false,
				mouseIsOver = false;

			// handle clicks
			//controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
			total
				.bind('mousedown', function (e) {
					// only handle left clicks
					if (e.which === 1) {
						mouseIsDown = true;
						handleMouseMove(e);
						$(document)
							.bind('mousemove.dur', function(e) {
								handleMouseMove(e);
							})
							.bind('mouseup.dur', function (e) {
								mouseIsDown = false;
								timefloat.hide();
								$(document).unbind('.dur');
							});
						return false;
					}
				})
				.bind('mouseenter', function(e) {
					mouseIsOver = true;
					$(document).bind('mousemove.dur', function(e) {
						handleMouseMove(e);
					});
					if (!mejs.MediaFeatures.hasTouch) {
						timefloat.show();
					}
				})
				.bind('mouseleave',function(e) {
					mouseIsOver = false;
					if (!mouseIsDown) {
						$(document).unbind('.dur');
						timefloat.hide();
					}
				});

			// loading
			media.addEventListener('progress', function (e) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
			}, false);

			// current time
			media.addEventListener('timeupdate', function(e) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
			}, false);
			
			
			// store for later use
			t.loaded = loaded;
			t.total = total;
			t.current = current;
			t.handle = handle;
		},
		setProgressRail: function(e) {

			var
				t = this,
				target = (e != undefined) ? e.target : t.media,
				percent = null;			

			// newest HTML5 spec has buffered array (FF4, Webkit)
			if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
				// TODO: account for a real array with multiple values (only Firefox 4 has this so far) 
				percent = target.buffered.end(0) / target.duration;
			} 
			// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
			// to be anything other than 0. If the byte count is available we use this instead.
			// Browsers that support the else if do not seem to have the bufferedBytes value and
			// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
			else if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
				percent = target.bufferedBytes / target.bytesTotal;
			}
			// Firefox 3 with an Ogg file seems to go this way
			else if (e && e.lengthComputable && e.total != 0) {
				percent = e.loaded/e.total;
			}

			// finally update the progress bar
			if (percent !== null) {
				percent = Math.min(1, Math.max(0, percent));
				// update loaded bar
				if (t.loaded && t.total) {
					t.loaded.width(t.total.width() * percent);
				}
			}
		},
		setCurrentRail: function() {

			var t = this;
		
			if (t.media.currentTime != undefined && t.media.duration) {

				// update bar and handle
				if (t.total && t.handle) {
					var 
						newWidth = t.total.width() * t.media.currentTime / t.media.duration,
						handlePos = newWidth - (t.handle.outerWidth(true) / 2);

					t.current.width(newWidth);
					t.handle.css('left', handlePos);
				}
			}

		}	
	});
})(mejs.$);
(function($) {
	
	// options
	$.extend(mejs.MepDefaults, {
		duration: -1,
		timeAndDurationSeparator: ' <span> | </span> '
	});


	// current and duration 00:00 / 00:00
	$.extend(MediaElementPlayer.prototype, {
		buildcurrent: function(player, controls, layers, media) {
			var t = this;
			
			$('<div class="mejs-time">'+
					'<span class="mejs-currenttime">' + (player.options.alwaysShowHours ? '00:' : '')
					+ (player.options.showTimecodeFrameCount? '00:00:00':'00:00')+ '</span>'+
					'</div>')
					.appendTo(controls);
			
			t.currenttime = t.controls.find('.mejs-currenttime');

			media.addEventListener('timeupdate',function() {
				player.updateCurrent();
			}, false);
		},


		buildduration: function(player, controls, layers, media) {
			var t = this;
			
			if (controls.children().last().find('.mejs-currenttime').length > 0) {
				$(t.options.timeAndDurationSeparator +
					'<span class="mejs-duration">' + 
						(t.options.duration > 0 ? 
							mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25) :
				   			((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount? '00:00:00':'00:00')) 
				   		) + 
					'</span>')
					.appendTo(controls.find('.mejs-time'));
			} else {

				// add class to current time
				controls.find('.mejs-currenttime').parent().addClass('mejs-currenttime-container');
				
				$('<div class="mejs-time mejs-duration-container">'+
					'<span class="mejs-duration">' + 
						(t.options.duration > 0 ? 
							mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25) :
				   			((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount? '00:00:00':'00:00')) 
				   		) + 
					'</span>' +
				'</div>')
				.appendTo(controls);
			}
			
			t.durationD = t.controls.find('.mejs-duration');

			media.addEventListener('timeupdate',function() {
				player.updateDuration();
			}, false);
		},
		
		updateCurrent:  function() {
			var t = this;

			if (t.currenttime) {
				t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount,  t.options.framesPerSecond || 25));
			}
		},
		
		updateDuration: function() {	
			var t = this;
			
			if (t.media.duration && t.durationD) {
				t.durationD.html(mejs.Utility.secondsToTimeCode(t.media.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));
			}		
		}
	});

})(mejs.$);
(function($) {

	$.extend(mejs.MepDefaults, {
		muteText: 'Mute Toggle',
		hideVolumeOnTouchDevices: true,
		
		audioVolume: 'horizontal',
		videoVolume: 'vertical'
	});

	$.extend(MediaElementPlayer.prototype, {
		buildvolume: function(player, controls, layers, media) {
				
			// Android and iOS don't support volume controls
			if (mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)
				return;
			
			var t = this,
				mode = (t.isVideo) ? t.options.videoVolume : t.options.audioVolume,
				mute = (mode == 'horizontal') ?
				
				// horizontal version
				$('<div class="mejs-button mejs-volume-button mejs-mute">'+
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>'+
				'</div>' +
				'<div class="mejs-horizontal-volume-slider">'+ // outer background
					'<div class="mejs-horizontal-volume-total"></div>'+ // line background
					'<div class="mejs-horizontal-volume-current"></div>'+ // current volume
					'<div class="mejs-horizontal-volume-handle"></div>'+ // handle
				'</div>'
				)
					.appendTo(controls) :
				
				// vertical version
				$('<div class="mejs-button mejs-volume-button mejs-mute">'+
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>'+
					'<div class="mejs-volume-slider">'+ // outer background
						'<div class="mejs-volume-total"></div>'+ // line background
						'<div class="mejs-volume-current"></div>'+ // current volume
						'<div class="mejs-volume-handle"></div>'+ // handle
					'</div>'+
				'</div>')
					.appendTo(controls),
			volumeSlider = t.container.find('.mejs-volume-slider, .mejs-horizontal-volume-slider'),
			volumeTotal = t.container.find('.mejs-volume-total, .mejs-horizontal-volume-total'),
			volumeCurrent = t.container.find('.mejs-volume-current, .mejs-horizontal-volume-current'),
			volumeHandle = t.container.find('.mejs-volume-handle, .mejs-horizontal-volume-handle'),

			positionVolumeHandle = function(volume, secondTry) {

				if (!volumeSlider.is(':visible') && typeof secondTry != 'undefined') {
					volumeSlider.show();
					positionVolumeHandle(volume, true);
					volumeSlider.hide()
					return;
				}
			
				// correct to 0-1
				volume = Math.max(0,volume);
				volume = Math.min(volume,1);					
				
				// ajust mute button style
				if (volume == 0) {
					mute.removeClass('mejs-mute').addClass('mejs-unmute');
				} else {
					mute.removeClass('mejs-unmute').addClass('mejs-mute');
				}				

				// position slider 
				if (mode == 'vertical') {
					var 
					
						// height of the full size volume slider background
						totalHeight = volumeTotal.height(),
						
						// top/left of full size volume slider background
						totalPosition = volumeTotal.position(),
						
						// the new top position based on the current volume
						// 70% volume on 100px height == top:30px
						newTop = totalHeight - (totalHeight * volume);
	
					// handle
					volumeHandle.css('top', totalPosition.top + newTop - (volumeHandle.height() / 2));
	
					// show the current visibility
					volumeCurrent.height(totalHeight - newTop );
					volumeCurrent.css('top', totalPosition.top + newTop);
				} else {
					var 
					
						// height of the full size volume slider background
						totalWidth = volumeTotal.width(),
						
						// top/left of full size volume slider background
						totalPosition = volumeTotal.position(),
						
						// the new left position based on the current volume
						newLeft = totalWidth * volume;
	
					// handle
					volumeHandle.css('left', totalPosition.left + newLeft - (volumeHandle.width() / 2));
	
					// rezize the current part of the volume bar
					volumeCurrent.width( newLeft );
				}
			},
			handleVolumeMove = function(e) {
				
				var volume = null,
					totalOffset = volumeTotal.offset();
				
				// calculate the new volume based on the moust position
				if (mode == 'vertical') {
				
					var
						railHeight = volumeTotal.height(),
						totalTop = parseInt(volumeTotal.css('top').replace(/px/,''),10),
						newY = e.pageY - totalOffset.top;
						
					volume = (railHeight - newY) / railHeight;
						
					// the controls just hide themselves (usually when mouse moves too far up)
					if (totalOffset.top == 0 || totalOffset.left == 0)
						return;
					
				} else {
					var
						railWidth = volumeTotal.width(),
						newX = e.pageX - totalOffset.left;
						
					volume = newX / railWidth;
				}
				
				// ensure the volume isn't outside 0-1
				volume = Math.max(0,volume);
				volume = Math.min(volume,1);
				
				// position the slider and handle			
				positionVolumeHandle(volume);
				
				// set the media object (this will trigger the volumechanged event)
				if (volume == 0) {
					media.setMuted(true);
				} else {
					media.setMuted(false);
				}
				media.setVolume(volume);			
			},
			mouseIsDown = false,
			mouseIsOver = false;

			// SLIDER
			
			mute
				.hover(function() {
					volumeSlider.show();
					mouseIsOver = true;
				}, function() {
					mouseIsOver = false;	
						
					if (!mouseIsDown && mode == 'vertical')	{
						volumeSlider.hide();
					}
				});
			
			volumeSlider
				.bind('mouseover', function() {
					mouseIsOver = true;	
				})
				.bind('mousedown', function (e) {
					handleVolumeMove(e);
					$(document)
						.bind('mousemove.vol', function(e) {
							handleVolumeMove(e);
						})
						.bind('mouseup.vol', function () {
							mouseIsDown = false;
							$(document).unbind('.vol');

							if (!mouseIsOver && mode == 'vertical') {
								volumeSlider.hide();
							}
						});
					mouseIsDown = true;
						
					return false;
				});


			// MUTE button
			mute.find('button').click(function() {
				media.setMuted( !media.muted );
			});

			// listen for volume change events from other sources
			media.addEventListener('volumechange', function(e) {
				if (!mouseIsDown) {
					if (media.muted) {
						positionVolumeHandle(0);
						mute.removeClass('mejs-mute').addClass('mejs-unmute');
					} else {
						positionVolumeHandle(media.volume);
						mute.removeClass('mejs-unmute').addClass('mejs-mute');
					}
				}
			}, false);

			if (t.container.is(':visible')) {
				// set initial volume
				positionVolumeHandle(player.options.startVolume);
				
				// shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
				if (media.pluginType === 'native') {
					media.setVolume(player.options.startVolume);
				}
			}
		}
	});
	
})(mejs.$);

(function($) {
	
	$.extend(mejs.MepDefaults, {
		usePluginFullScreen: true,
		newWindowCallback: function() { return '';},
		fullscreenText: 'Fullscreen'
	});
	
	$.extend(MediaElementPlayer.prototype, {
		
		isFullScreen: false,
		
		isNativeFullScreen: false,
		
		docStyleOverflow: null,
		
		isInIframe: false,
		
		buildfullscreen: function(player, controls, layers, media) {

			if (!player.isVideo)
				return;
				
			player.isInIframe = (window.location != window.parent.location);
				
			// native events
			if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
				
				// chrome doesn't alays fire this in an iframe
				var target = null;
				
				if (mejs.MediaFeatures.hasMozNativeFullScreen) {
					target = $(document);
				} else {
					target = player.container;
				}
				
				target.bind(mejs.MediaFeatures.fullScreenEventName, function(e) {
							
					if (mejs.MediaFeatures.isFullScreen()) {
						player.isNativeFullScreen = true;
						// reset the controls once we are fully in full screen
						player.setControlsSize();
					} else {
						player.isNativeFullScreen = false;
						// when a user presses ESC
						// make sure to put the player back into place								
						player.exitFullScreen();				
					}
				});
			}

			var t = this,		
				normalHeight = 0,
				normalWidth = 0,
				container = player.container,						
				fullscreenBtn = 
					$('<div class="mejs-button mejs-fullscreen-button">' + 
						'<button type="button" aria-controls="' + t.id + '" title="' + t.options.fullscreenText + '"></button>' + 
					'</div>')
					.appendTo(controls);
				
				if (t.media.pluginType === 'native' || (!t.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)) {
					
					fullscreenBtn.click(function() {
						var isFullScreen = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || player.isFullScreen;													
						
						if (isFullScreen) {
							player.exitFullScreen();
						} else {						
							player.enterFullScreen();
						}
					});
					
				} else {

					var hideTimeout = null,
						supportsPointerEvents = (function() {
							// TAKEN FROM MODERNIZR
							var element = document.createElement('x'),
								documentElement = document.documentElement,
								getComputedStyle = window.getComputedStyle,
								supports;
							if(!('pointerEvents' in element.style)){
								return false;
							}
							element.style.pointerEvents = 'auto';
							element.style.pointerEvents = 'x';
							documentElement.appendChild(element);
							supports = getComputedStyle && 
								getComputedStyle(element, '').pointerEvents === 'auto';
							documentElement.removeChild(element);
							return !!supports;							
						})();
						
					//console.log('supportsPointerEvents', supportsPointerEvents);
						
					if (supportsPointerEvents && !mejs.MediaFeatures.isOpera) { // opera doesn't allow this :(
						
						// allows clicking through the fullscreen button and controls down directly to Flash
						
						/*
						 When a user puts his mouse over the fullscreen button, the controls are disabled
						 So we put a div over the video and another one on iether side of the fullscreen button
						 that caputre mouse movement
						 and restore the controls once the mouse moves outside of the fullscreen button
						*/
						
						var fullscreenIsDisabled = false,
							restoreControls = function() {
								if (fullscreenIsDisabled) {
									// hide the hovers
									videoHoverDiv.hide();
									controlsLeftHoverDiv.hide();
									controlsRightHoverDiv.hide();
									
									// restore the control bar
									fullscreenBtn.css('pointer-events', '');
									t.controls.css('pointer-events', '');
									
									// store for later
									fullscreenIsDisabled = false;
								}
							},
							videoHoverDiv = $('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls),
							controlsLeftHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),
							controlsRightHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),
							positionHoverDivs = function() {
								var style = {position: 'absolute', top: 0, left: 0}; //, backgroundColor: '#f00'};
								videoHoverDiv.css(style);
								controlsLeftHoverDiv.css(style);
								controlsRightHoverDiv.css(style);
								
								// over video, but not controls
								videoHoverDiv
									.width( t.container.width() )
									.height( t.container.height() - t.controls.height() );
								
								// over controls, but not the fullscreen button
								var fullScreenBtnOffset = fullscreenBtn.offset().left - t.container.offset().left;
									fullScreenBtnWidth = fullscreenBtn.outerWidth(true);
									
								controlsLeftHoverDiv
									.width( fullScreenBtnOffset )
									.height( t.controls.height() )
									.css({top: t.container.height() - t.controls.height()});
									
								// after the fullscreen button
								controlsRightHoverDiv
									.width( t.container.width() - fullScreenBtnOffset - fullScreenBtnWidth )
									.height( t.controls.height() )
									.css({top: t.container.height() - t.controls.height(),
										 left: fullScreenBtnOffset + fullScreenBtnWidth});								
							};
						
						$(document).resize(function() {
							positionHoverDivs();
						});
												
						// on hover, kill the fullscreen button's HTML handling, allowing clicks down to Flash
						fullscreenBtn
							.mouseover(function() {
								
								if (!t.isFullScreen) {
									
									var buttonPos = fullscreenBtn.offset(),
										containerPos = player.container.offset();
									
									// move the button in Flash into place
									media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);									
									
									// allows click through
									fullscreenBtn.css('pointer-events', 'none');
									t.controls.css('pointer-events', 'none');
									
									// show the divs that will restore things
									videoHoverDiv.show();
									controlsRightHoverDiv.show();
									controlsLeftHoverDiv.show();
									positionHoverDivs();
									
									fullscreenIsDisabled = true;
								}
							
							});
						
						// restore controls anytime the user enters or leaves fullscreen	
						media.addEventListener('fullscreenchange', function(e) {
							restoreControls();
						});
						
						
						// the mouseout event doesn't work on the fullscren button, because we already killed the pointer-events
						// so we use the document.mousemove event to restore controls when the mouse moves outside the fullscreen button 
						/*
						$(document).mousemove(function(e) {
							
							// if the mouse is anywhere but the fullsceen button, then restore it all
							if (fullscreenIsDisabled) {
								
								var fullscreenBtnPos = fullscreenBtn.offset();
								

								if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) ||
									e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)
									) {
								
									fullscreenBtn.css('pointer-events', '');
									t.controls.css('pointer-events', '');
									
									fullscreenIsDisabled = false;
								}
							}
						});
						*/
						
						
					} else {
						
						// the hover state will show the fullscreen button in Flash to hover up and click
						
						fullscreenBtn
							.mouseover(function() {
								
								if (hideTimeout !== null) {
									clearTimeout(hideTimeout);
									delete hideTimeout;
								}
								
								var buttonPos = fullscreenBtn.offset(),
									containerPos = player.container.offset();
									
								media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);
							
							})
							.mouseout(function() {
							
								if (hideTimeout !== null) {
									clearTimeout(hideTimeout);
									delete hideTimeout;
								}
								
								hideTimeout = setTimeout(function() {	
									media.hideFullscreenButton();
								}, 1500);
								
								
							});						
					}
				}
			
			player.fullscreenBtn = fullscreenBtn;	

			$(document).bind('keydown',function (e) {
				if (((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || t.isFullScreen) && e.keyCode == 27) {
					player.exitFullScreen();
				}
			});
				
		},
		enterFullScreen: function() {
			
			var t = this;
			
			// firefox+flash can't adjust plugin sizes without resetting :(
			if (t.media.pluginType !== 'native' && (mejs.MediaFeatures.isFirefox || t.options.usePluginFullScreen)) {
				//t.media.setFullscreen(true);
				//player.isFullScreen = true;
				return;
			}			
						
			// store overflow 
			docStyleOverflow = document.documentElement.style.overflow;
			// set it to not show scroll bars so 100% will work
			document.documentElement.style.overflow = 'hidden';			
		
			// store sizing
			normalHeight = t.container.height();
			normalWidth = t.container.width();
			console.log(normalHeight, normalWidth);
			// attempt to do true fullscreen (Safari 5.1 and Firefox Nightly only for now)
			if (t.media.pluginType === 'native') {
				if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
							
					mejs.MediaFeatures.requestFullScreen(t.container[0]);
					//return;
					
					if (t.isInIframe) {
						// sometimes exiting from fullscreen doesn't work
						// notably in Chrome <iframe>. Fixed in version 17
						setTimeout(function checkFullscreen() {
								
							if (t.isNativeFullScreen) {
								
								// check if the video is suddenly not really fullscreen
								if ($(window).width() !== screen.width) {
									// manually exit
									t.exitFullScreen();
								} else {
									// test again
									setTimeout(checkFullscreen, 500);														
								}
							}
							
							
						}, 500);
					}
					
				} else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
					t.media.webkitEnterFullscreen();
					return;
				}
			}
			
			// check for iframe launch
			if (t.isInIframe) {
				var url = t.options.newWindowCallback(this);
				
				
				if (url !== '') {
					
					// launch immediately
					if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
						t.pause();
						window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');
						return;
					} else {
						setTimeout(function() {
							if (!t.isNativeFullScreen) {
								t.pause();
								window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');								
							}
						}, 250);
					}
				}	
				
			}
			
			// full window code

			

			// make full size
			t.container
				.addClass('mejs-container-fullscreen')
				.width('100%')
				.height('100%');
				//.css({position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', width: '100%', height: '100%', 'z-index': 1000});				

			// Only needed for safari 5.1 native full screen, can cause display issues elsewhere
			// Actually, it seems to be needed for IE8, too
			//if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
				setTimeout(function() {
					t.container.css({width: '100%', height: '100%'});
					t.setControlsSize();
				}, 500);
			//}
				
			if (t.pluginType === 'native') {
				t.$media
					.width('100%')
					.height('100%');
			} else {
				t.container.find('object, embed, iframe')
					.width('100%')
					.height('100%');
					
				//if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
					t.media.setVideoSize($(window).width(),$(window).height());
				//}
			}
			
			t.layers.children('div')
				.width('100%')
				.height('100%');

			if (t.fullscreenBtn) {
				t.fullscreenBtn
					.removeClass('mejs-fullscreen')
					.addClass('mejs-unfullscreen');
			}

			t.setControlsSize();
			t.isFullScreen = true;
		},
		
		exitFullScreen: function() {
			
			var t = this;		
		
			// firefox can't adjust plugins
			if (t.media.pluginType !== 'native' && mejs.MediaFeatures.isFirefox) {				
				t.media.setFullscreen(false);
				//player.isFullScreen = false;
				return;
			}		
		
			// come outo of native fullscreen
			if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen)) {
				mejs.MediaFeatures.cancelFullScreen();
			}	

			// restore scroll bars to document
			document.documentElement.style.overflow = docStyleOverflow;					
				
			t.container
				.removeClass('mejs-container-fullscreen')
				.width(normalWidth)
				.height(normalHeight);
				//.css({position: '', left: '', top: '', right: '', bottom: '', overflow: 'inherit', width: normalWidth + 'px', height: normalHeight + 'px', 'z-index': 1});
			
			if (t.pluginType === 'native') {
				t.$media
					.width(normalWidth)
					.height(normalHeight);
			} else {
				t.container.find('object embed')
					.width(normalWidth)
					.height(normalHeight);
					
				t.media.setVideoSize(normalWidth, normalHeight);
			}				

			t.layers.children('div')
				.width(normalWidth)
				.height(normalHeight);

			t.fullscreenBtn
				.removeClass('mejs-unfullscreen')
				.addClass('mejs-fullscreen');

			t.setControlsSize();
			t.isFullScreen = false;
		}	
	});

})(mejs.$);

(function($) {

	// add extra default options 
	$.extend(mejs.MepDefaults, {
		// this will automatically turn on a <track>
		startLanguage: '',
		
		tracksText: 'Captions/Subtitles'
	});

	$.extend(MediaElementPlayer.prototype, {
	
		hasChapters: false,

		buildtracks: function(player, controls, layers, media) {
			if (!player.isVideo)
				return;

			if (player.tracks.length == 0)
				return;

			var t= this, i, options = '';

			player.chapters = 
					$('<div class="mejs-chapters mejs-layer"></div>')
						.prependTo(layers).hide();
			player.captions = 
					$('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>')
						.prependTo(layers).hide();
			player.captionsText = player.captions.find('.mejs-captions-text');
			player.captionsButton = 
					$('<div class="mejs-button mejs-captions-button">'+
						'<button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '"></button>'+
						'<div class="mejs-captions-selector">'+
							'<ul>'+
								'<li>'+
									'<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
									'<label for="' + player.id + '_captions_none">None</label>'+
								'</li>'	+
							'</ul>'+
						'</div>'+
					'</div>')
						.appendTo(controls)
						
						// hover
						.hover(function() {
							$(this).find('.mejs-captions-selector').css('visibility','visible');
						}, function() {
							$(this).find('.mejs-captions-selector').css('visibility','hidden');
						})					
						
						// handle clicks to the language radio buttons
						.delegate('input[type=radio]','click',function() {
							lang = this.value;

							if (lang == 'none') {
								player.selectedTrack = null;
							} else {
								for (i=0; i<player.tracks.length; i++) {
									if (player.tracks[i].srclang == lang) {
										player.selectedTrack = player.tracks[i];
										player.captions.attr('lang', player.selectedTrack.srclang);
										player.displayCaptions();
										break;
									}
								}
							}
						});
						//.bind('mouseenter', function() {
						//	player.captionsButton.find('.mejs-captions-selector').css('visibility','visible')
						//});

			if (!player.options.alwaysShowControls) {
				// move with controls
				player.container
					.bind('mouseenter', function () {
						// push captions above controls
						player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

					})
					.bind('mouseleave', function () {
						if (!media.paused) {
							// move back to normal place
							player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
						}
					});
			} else {
				player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');
			}

			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;

			

			// add to list
			for (i=0; i<player.tracks.length; i++) {
				if (player.tracks[i].kind == 'subtitles') {
					player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
				}
			}

			player.loadNextTrack();


			media.addEventListener('timeupdate',function(e) {
				player.displayCaptions();
			}, false);

			media.addEventListener('loadedmetadata', function(e) {
				player.displayChapters();
			}, false);

			player.container.hover(
				function () {
					// chapters
					if (player.hasChapters) {
						player.chapters.css('visibility','visible');
						player.chapters.fadeIn(200).height(player.chapters.find('.mejs-chapter').outerHeight());
					}
				},
				function () {
					if (player.hasChapters && !media.paused) {
						player.chapters.fadeOut(200, function() {
							$(this).css('visibility','hidden');
							$(this).css('display','block');
						});
					}
				});
				
			// check for autoplay
			if (player.node.getAttribute('autoplay') !== null) {
				player.chapters.css('visibility','hidden');
			}
		},

		loadNextTrack: function() {
			var t = this;

			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				// add done?
				t.isLoadingTrack = false;
			}
		},

		loadTrack: function(index){
			var
				t = this,
				track = t.tracks[index],
				after = function() {

					track.isLoaded = true;

					// create button
					//t.addTrackButton(track.srclang);
					t.enableTrackButton(track.srclang, track.label);

					t.loadNextTrack();

				};

			if (track.isTranslation) {

				// translate the first track
				mejs.TrackFormatParser.translateTrackText(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, t.options.googleApiKey, function(newOne) {

					// store the new translation
					track.entries = newOne;

					after();
				});

			} else {
				$.ajax({
					url: track.src,
					success: function(d) {

						// parse the loaded file
						track.entries = mejs.TrackFormatParser.parse(d);
						after();

						if (track.kind == 'chapters' && t.media.duration > 0) {
							t.drawChapters(track);
						}
					},
					error: function() {
						t.loadNextTrack();
					}
				});
			}
		},

		enableTrackButton: function(lang, label) {
			var t = this;
			
			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}			

			t.captionsButton
				.find('input[value=' + lang + ']')
					.prop('disabled',false)
				.siblings('label')
					.html( label );

			// auto select
			if (t.options.startLanguage == lang) {
				$('#' + t.id + '_captions_' + lang).click();
			}

			t.adjustLanguageBox();
		},

		addTrackButton: function(lang, label) {
			var t = this;
			if (label === '') {
				label = mejs.language.codes[lang] || lang;
			}

			t.captionsButton.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
					'<label for="' + t.id + '_captions_' + lang + '">' + label + ' (loading)' + '</label>'+
				'</li>')
			);

			t.adjustLanguageBox();

			// remove this from the dropdownlist (if it exists)
			t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
		},

		adjustLanguageBox:function() {
			var t = this;
			// adjust the size of the outer box
			t.captionsButton.find('.mejs-captions-selector').height(
				t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
				t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
			);
		},

		displayCaptions: function() {

			if (typeof this.tracks == 'undefined')
				return;

			var
				t = this,
				i,
				track = t.selectedTrack;

			if (track != null && track.isLoaded) {
				for (i=0; i<track.entries.times.length; i++) {
					if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop){
						t.captionsText.html(track.entries.text[i]);
						t.captions.show().height(0);
						return; // exit out if one is visible;
					}
				}
				t.captions.hide();
			} else {
				t.captions.hide();
			}
		},

		displayChapters: function() {
			var 
				t = this,
				i;

			for (i=0; i<t.tracks.length; i++) {
				if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
					t.drawChapters(t.tracks[i]);
					t.hasChapters = true;
					break;
				}
			}
		},

		drawChapters: function(chapters) {
			var 
				t = this,
				i,
				dur,
				//width,
				//left,
				percent = 0,
				usedPercent = 0;

			t.chapters.empty();

			for (i=0; i<chapters.entries.times.length; i++) {
				dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
				percent = Math.floor(dur / t.media.duration * 100);
				if (percent + usedPercent > 100 || // too large
					i == chapters.entries.times.length-1 && percent + usedPercent < 100) // not going to fill it in
					{
					percent = 100 - usedPercent;
				}
				//width = Math.floor(t.width * dur / t.media.duration);
				//left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
				//if (left + width > t.width) {
				//	width = t.width - left;
				//}

				t.chapters.append( $(
					'<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' + 
						'<div class="mejs-chapter-block' + ((i==chapters.entries.times.length-1) ? ' mejs-chapter-block-last' : '') + '">' + 
							'<span class="ch-title">' + chapters.entries.text[i] + '</span>' + 
							'<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + '</span>' + 
						'</div>' +
					'</div>'));
				usedPercent += percent;
			}

			t.chapters.find('div.mejs-chapter').click(function() {
				t.media.setCurrentTime( parseFloat( $(this).attr('rel') ) );
				if (t.media.paused) {
					t.media.play(); 
				}
			});

			t.chapters.show();
		}
	});



	mejs.language = {
		codes:  {
			af:'Afrikaans',
			sq:'Albanian',
			ar:'Arabic',
			be:'Belarusian',
			bg:'Bulgarian',
			ca:'Catalan',
			zh:'Chinese',
			'zh-cn':'Chinese Simplified',
			'zh-tw':'Chinese Traditional',
			hr:'Croatian',
			cs:'Czech',
			da:'Danish',
			nl:'Dutch',
			en:'English',
			et:'Estonian',
			tl:'Filipino',
			fi:'Finnish',
			fr:'French',
			gl:'Galician',
			de:'German',
			el:'Greek',
			ht:'Haitian Creole',
			iw:'Hebrew',
			hi:'Hindi',
			hu:'Hungarian',
			is:'Icelandic',
			id:'Indonesian',
			ga:'Irish',
			it:'Italian',
			ja:'Japanese',
			ko:'Korean',
			lv:'Latvian',
			lt:'Lithuanian',
			mk:'Macedonian',
			ms:'Malay',
			mt:'Maltese',
			no:'Norwegian',
			fa:'Persian',
			pl:'Polish',
			pt:'Portuguese',
			//'pt-pt':'Portuguese (Portugal)',
			ro:'Romanian',
			ru:'Russian',
			sr:'Serbian',
			sk:'Slovak',
			sl:'Slovenian',
			es:'Spanish',
			sw:'Swahili',
			sv:'Swedish',
			tl:'Tagalog',
			th:'Thai',
			tr:'Turkish',
			uk:'Ukrainian',
			vi:'Vietnamese',
			cy:'Welsh',
			yi:'Yiddish'
		}
	};

	/*
	Parses WebVVT format which should be formatted as
	================================
	WEBVTT
	
	1
	00:00:01,1 --> 00:00:05,000
	A line of text

	2
	00:01:15,1 --> 00:02:05,000
	A second line of text
	
	===============================

	Adapted from: http://www.delphiki.com/html5/playr
	*/
	mejs.TrackFormatParser = {
		// match start "chapter-" (or anythingelse)
		pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
		pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

		split2: function (text, regex) {
			// normal version for compliant browsers
			// see below for IE fix
			return text.split(regex);
		},
		parse: function(trackText) {
			var 
				i = 0,
				lines = this.split2(trackText, /\r?\n/),
				entries = {text:[], times:[]},
				timecode,
				text;

			for(; i<lines.length; i++) {
				// check for the line number
				if (this.pattern_identifier.exec(lines[i])){
					// skip to the next line where the start --> end time code should be
					i++;
					timecode = this.pattern_timecode.exec(lines[i]);				
					
					if (timecode && i<lines.length){
						i++;
						// grab all the (possibly multi-line) text that follows
						text = lines[i];
						i++;
						while(lines[i] !== '' && i<lines.length){
							text = text + '\n' + lines[i];
							i++;
						}

						// Text is in a different array so I can use .join
						entries.text.push(text);
						entries.times.push(
						{
							start: mejs.Utility.timeCodeToSeconds(timecode[1]),
							stop: mejs.Utility.timeCodeToSeconds(timecode[3]),
							settings: timecode[5]
						});
					}
				}
			}

			return entries;
		}
	};
	
	// test for browsers with bad String.split method.
	if ('x\n\ny'.split(/\n/gi).length != 3) {
		// add super slow IE8 and below version
		mejs.TrackFormatParser.split2 = function(text, regex) {
			var 
				parts = [], 
				chunk = '',
				i;

			for (i=0; i<text.length; i++) {
				chunk += text.substring(i,i+1);
				if (regex.test(chunk)) {
					parts.push(chunk.replace(regex, ''));
					chunk = '';
				}
			}
			parts.push(chunk);
			return parts;
		}
	}	

})(mejs.$);

/*
* ContextMenu Plugin
* 
*
*/

(function($) {

$.extend(mejs.MepDefaults,
	{ 'contextMenuItems': [
		// demo of a fullscreen option
		{ 
			render: function(player) {
				
				// check for fullscreen plugin
				if (typeof player.enterFullScreen == 'undefined')
					return null;
			
				if (player.isFullScreen) {
					return "Turn off Fullscreen";
				} else {
					return "Go Fullscreen";
				}
			},
			click: function(player) {
				if (player.isFullScreen) {
					player.exitFullScreen();
				} else {
					player.enterFullScreen();
				}
			}
		}
		,
		// demo of a mute/unmute button
		{ 
			render: function(player) {
				if (player.media.muted) {
					return "Unmute";
				} else {
					return "Mute";
				}
			},
			click: function(player) {
				if (player.media.muted) {
					player.setMuted(false);
				} else {
					player.setMuted(true);
				}
			}
		},
		// separator
		{
			isSeparator: true
		}
		,
		// demo of simple download video
		{ 
			render: function(player) {
				return "Download Video";
			},
			click: function(player) {
				window.location.href = player.media.currentSrc;
			}
		}	
	]}
);


	$.extend(MediaElementPlayer.prototype, {
		buildcontextmenu: function(player, controls, layers, media) {
			
			// create context menu
			player.contextMenu = $('<div class="mejs-contextmenu"></div>')
								.appendTo($('body'))
								.hide();
			
			// create events for showing context menu
			player.container.bind('contextmenu', function(e) {
				if (player.isContextMenuEnabled) {
					e.preventDefault();
					player.renderContextMenu(e.clientX-1, e.clientY-1);
					return false;
				}
			});
			player.container.bind('click', function() {
				player.contextMenu.hide();
			});	
			player.contextMenu.bind('mouseleave', function() {

				//console.log('context hover out');
				player.startContextMenuTimer();
				
			});		
		},
		
		isContextMenuEnabled: true,
		enableContextMenu: function() {
			this.isContextMenuEnabled = true;
		},
		disableContextMenu: function() {
			this.isContextMenuEnabled = false;
		},
		
		contextMenuTimeout: null,
		startContextMenuTimer: function() {
			//console.log('startContextMenuTimer');
			
			var t = this;
			
			t.killContextMenuTimer();
			
			t.contextMenuTimer = setTimeout(function() {
				t.hideContextMenu();
				t.killContextMenuTimer();
			}, 750);
		},
		killContextMenuTimer: function() {
			var timer = this.contextMenuTimer;
			
			//console.log('killContextMenuTimer', timer);
			
			if (timer != null) {				
				clearTimeout(timer);
				delete timer;
				timer = null;
			}
		},		
		
		hideContextMenu: function() {
			this.contextMenu.hide();
		},
		
		renderContextMenu: function(x,y) {
			
			// alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly
			var t = this,
				html = '',
				items = t.options.contextMenuItems;
			
			for (var i=0, il=items.length; i<il; i++) {
				
				if (items[i].isSeparator) {
					html += '<div class="mejs-contextmenu-separator"></div>';
				} else {
				
					var rendered = items[i].render(t);
				
					// render can return null if the item doesn't need to be used at the moment
					if (rendered != null) {
						html += '<div class="mejs-contextmenu-item" data-itemindex="' + i + '" id="element-' + (Math.random()*1000000) + '">' + rendered + '</div>';
					}
				}
			}
			
			// position and show the context menu
			t.contextMenu
				.empty()
				.append($(html))
				.css({top:y, left:x})
				.show();
				
			// bind events
			t.contextMenu.find('.mejs-contextmenu-item').each(function() {
							
				// which one is this?
				var $dom = $(this),
					itemIndex = parseInt( $dom.data('itemindex'), 10 ),
					item = t.options.contextMenuItems[itemIndex];
				
				// bind extra functionality?
				if (typeof item.show != 'undefined')
					item.show( $dom , t);
				
				// bind click action
				$dom.click(function() {			
					// perform click action
					if (typeof item.click != 'undefined')
						item.click(t);
					
					// close
					t.contextMenu.hide();				
				});				
			});	
			
			// stop the controls from hiding
			setTimeout(function() {
				t.killControlsTimer('rev3');	
			}, 100);
						
		}
	});
	
})(mejs.$);

/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-media.js
 *  Description: 미디어 피처드는 반응형웹에 맞는 화면을 보여주고, 동영상의 비율을 설정할 수 있는 옵션등이 추가적으로 들어갔으며, DATA-API를 사용해서
 *  스크립트 사용없이 마크업 속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([ "jquery" ], function ($) {
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document, undefined) {

    var pluginName = "featuredMedia";

    $.fn[pluginName] = function (options) {
        // 기본 화면 비율값을 옵션으로 정의한다.
        var defaultOptions = {
            rate: "16:9"
        }
        options = $.extend(true, defaultOptions, options);
        return this.each(function () {
            // 4:3, 16:9, 16:10 비율 옵션 추가
            mejs.MediaElementPlayer.prototype.setPlayerSize = function (width, height) {
                var t = this;

                if (typeof width != 'undefined')
                    t.width = width;

                if (typeof height != 'undefined')
                    t.height = height;

                // detect 100% mode
                if (t.height.toString().indexOf('%') > 0 || t.$node.css('max-width') === '100%') {

                    // do we have the native dimensions yet?
                    var nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth,
                        nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight;

                    if (navigator.userAgent.match("Android")) {
                        nativeWidth = t.options.defaultVideoWidth;
                        nativeHeight = t.options.defaultVideoHeight;
                    }

                    // 옵션으로 화면 비율 값을 받아서 실제 보여줄 영상의 비율을 설정한다.
                    if (typeof t.options.rate === "string" && t.options.rate.match(":") && t.options.rate.split(":").length > 1) {
                        nativeWidth = t.options.rate.split(":")[0];
                        nativeHeight = t.options.rate.split(":")[1];
                    }

                    var parentWidth = t.container.parent().width(),
                        newHeight = parseInt(parentWidth * nativeHeight / nativeWidth, 10);

                    if (t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {
                        parentWidth = $(window).width();
                        newHeight = $(window).height();
                    }

                    if (newHeight != 0) {
                        // set outer container size
                        t.container
                            .width(parentWidth)
                            .height(newHeight);

                        // set native <video>
                        t.$media
                            .width('100%')
                            .height('100%');

                        // set shims
                        t.container.find('object, embed, iframe')
                            .width('100%')
                            .height('100%');

                        // if shim is ready, send the size to the embeded plugin
                        if (t.isVideo) {
                            if (t.media.setVideoSize) {
                                t.media.setVideoSize(parentWidth, newHeight);
                            }
                        }

                        // set the layers
                        t.layers.children('.mejs-layer')
                            .width('100%')
                            .height('100%');
                    }


                } else {

                    t.container
                        .width(t.width)
                        .height(t.height);

                    t.layers.children('.mejs-layer')
                        .width(t.width)
                        .height(t.height);

                }
            };

            var mePlayer = new mejs.MediaElementPlayer(this, options);
        });
    };


    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=media]").each(function (i) {
        var self = this;
        $(this)[pluginName]({
            alwaysShowControls:true,
            rate:$(self).data("mediaRate")
        });
    });
}));/*!
 * iScroll v4.2.2 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(window, doc){
var m = Math,
	dummyStyle = doc.createElement('div').style,
	vendor = (function () {
		var vendors = 't,webkitT,MozT,msT,OT'.split(','),
			t,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			t = vendors[i] + 'ransform';
			if ( t in dummyStyle ) {
				return vendors[i].substr(0, vendors[i].length - 1);
			}
		}

		return false;
	})(),
	cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

	// Style properties
	transform = prefixStyle('transform'),
	transitionProperty = prefixStyle('transitionProperty'),
	transitionDuration = prefixStyle('transitionDuration'),
	transformOrigin = prefixStyle('transformOrigin'),
	transitionTimingFunction = prefixStyle('transitionTimingFunction'),
	transitionDelay = prefixStyle('transitionDelay'),

    // Browser capabilities
	isAndroid = (/android/gi).test(navigator.appVersion),
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = prefixStyle('perspective') in dummyStyle,
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = !!vendor,
    hasTransitionEnd = prefixStyle('transition') in dummyStyle,

	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
	TRNEND_EV = (function () {
		if ( vendor === false ) return false;

		var transitionEnd = {
				''			: 'transitionend',
				'webkit'	: 'webkitTransitionEnd',
				'Moz'		: 'transitionend',
				'O'			: 'otransitionend',
				'ms'		: 'MSTransitionEnd'
			};

		return transitionEnd[vendor];
	})(),

	nextFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) { return setTimeout(callback, 1); };
	})(),
	cancelFrame = (function () {
		return window.cancelRequestAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
	})(),

	// Helpers
	translateZ = has3d ? ' translateZ(0)' : '',

	// Constructor
	iScroll = function (el, options) {
		var that = this,
			i;

		that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
		that.wrapper.style.overflow = 'hidden';
		that.scroller = that.wrapper.children[0];

		// Default options
		that.options = {
			hScroll: true,
			vScroll: true,
			x: 0,
			y: 0,
			bounce: true,
			bounceLock: false,
			momentum: true,
			lockDirection: true,
			useTransform: true,
			useTransition: false,
			topOffset: 0,
			checkDOMChanges: false,		// Experimental
			handleClick: true,

			// Scrollbar
			hScrollbar: true,
			vScrollbar: true,
			fixedScrollbar: isAndroid,
			hideScrollbar: isIDevice,
			fadeScrollbar: isIDevice && has3d,
			scrollbarClass: '',

			// Zoom
			zoom: false,
			zoomMin: 1,
			zoomMax: 4,
			doubleTapZoom: 2,
			wheelAction: 'scroll',

			// Snap
			snap: false,
			snapThreshold: 1,

			// Events
			onRefresh: null,
			onBeforeScrollStart: function (e) { e.preventDefault(); },
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null,
			onZoomStart: null,
			onZoom: null,
			onZoomEnd: null
		};

		// User defined options
		for (i in options) that.options[i] = options[i];
		
		// Set starting position
		that.x = that.options.x;
		that.y = that.options.y;

		// Normalize options
		that.options.useTransform = hasTransform && that.options.useTransform;
		that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
		that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
		that.options.zoom = that.options.useTransform && that.options.zoom;
		that.options.useTransition = hasTransitionEnd && that.options.useTransition;

		// Helpers FIX ANDROID BUG!
		// translate3d and scale doesn't work together!
		// Ignoring 3d ONLY WHEN YOU SET that.options.zoom
		if ( that.options.zoom && isAndroid ){
			translateZ = '';
		}

		// Set some default styles
		that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
		that.scroller.style[transitionDuration] = '0';
		that.scroller.style[transformOrigin] = '0 0';
		if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';
		
		if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
		else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

		if (that.options.useTransition) that.options.fixedScrollbar = true;

		that.refresh();

		that._bind(RESIZE_EV, window);
		that._bind(START_EV);
		if (!hasTouch) {
			if (that.options.wheelAction != 'none')
				that._bind(WHEEL_EV);
		}

		if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
			that._checkDOMChanges();
		}, 500);
	};

// Prototype
iScroll.prototype = {
	enabled: true,
	x: 0,
	y: 0,
	steps: [],
	scale: 1,
	currPageX: 0, currPageY: 0,
	pagesX: [], pagesY: [],
	aniTime: null,
	wheelZoomCount: 0,
	
	handleEvent: function (e) {
		var that = this;
		switch(e.type) {
			case START_EV:
				if (!hasTouch && e.button !== 0) return;
				that._start(e);
				break;
			case MOVE_EV: that._move(e); break;
			case END_EV:
			case CANCEL_EV: that._end(e); break;
			case RESIZE_EV: that._resize(); break;
			case WHEEL_EV: that._wheel(e); break;
			case TRNEND_EV: that._transitionEnd(e); break;
		}
	},
	
	_checkDOMChanges: function () {
		if (this.moved || this.zoomed || this.animating ||
			(this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

		this.refresh();
	},
	
	_scrollbar: function (dir) {
		var that = this,
			bar;

		if (!that[dir + 'Scrollbar']) {
			if (that[dir + 'ScrollbarWrapper']) {
				if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
				that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
				that[dir + 'ScrollbarWrapper'] = null;
				that[dir + 'ScrollbarIndicator'] = null;
			}

			return;
		}

		if (!that[dir + 'ScrollbarWrapper']) {
			// Create the scrollbar wrapper
			bar = doc.createElement('div');

			if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
			else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

			bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

			that.wrapper.appendChild(bar);
			that[dir + 'ScrollbarWrapper'] = bar;

			// Create the scrollbar indicator
			bar = doc.createElement('div');
			if (!that.options.scrollbarClass) {
				bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';
			}
			bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
			if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

			that[dir + 'ScrollbarWrapper'].appendChild(bar);
			that[dir + 'ScrollbarIndicator'] = bar;
		}

		if (dir == 'h') {
			that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
			that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
			that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
			that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
			that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
		} else {
			that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
			that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
			that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
			that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
			that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
		}

		// Reset position
		that._scrollbarPos(dir, true);
	},
	
	_resize: function () {
		var that = this;
		setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
	},
	
	_pos: function (x, y) {
		if (this.zoomed) return;

		x = this.hScroll ? x : 0;
		y = this.vScroll ? y : 0;

		if (this.options.useTransform) {
			this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
		} else {
			x = m.round(x);
			y = m.round(y);
			this.scroller.style.left = x + 'px';
			this.scroller.style.top = y + 'px';
		}

		this.x = x;
		this.y = y;

		this._scrollbarPos('h');
		this._scrollbarPos('v');
	},

	_scrollbarPos: function (dir, hidden) {
		var that = this,
			pos = dir == 'h' ? that.x : that.y,
			size;

		if (!that[dir + 'Scrollbar']) return;

		pos = that[dir + 'ScrollbarProp'] * pos;

		if (pos < 0) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
			}
			pos = 0;
		} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
				pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
			} else {
				pos = that[dir + 'ScrollbarMaxScroll'];
			}
		}

		that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
		that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
		that[dir + 'ScrollbarIndicator'].style[transform] = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
	},
	
	_start: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			matrix, x, y,
			c1, c2;

		if (!that.enabled) return;

		if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

		if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

		that.moved = false;
		that.animating = false;
		that.zoomed = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;

		// Gesture start
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
			that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

			that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
			that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

			if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
		}

		if (that.options.momentum) {
			if (that.options.useTransform) {
				// Very lame general purpose alternative to CSSMatrix
				matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
				x = +matrix[4];
				y = +matrix[5];
			} else {
				x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
				y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
			}
			
			if (x != that.x || y != that.y) {
				if (that.options.useTransition) that._unbind(TRNEND_EV);
				else cancelFrame(that.aniTime);
				that.steps = [];
				that._pos(x, y);
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
			}
		}

		that.absStartX = that.x;	// Needed by snap threshold
		that.absStartY = that.y;

		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;

		that.startTime = e.timeStamp || Date.now();

		if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

		that._bind(MOVE_EV, window);
		that._bind(END_EV, window);
		that._bind(CANCEL_EV, window);
	},
	
	_move: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			deltaX = point.pageX - that.pointX,
			deltaY = point.pageY - that.pointY,
			newX = that.x + deltaX,
			newY = that.y + deltaY,
			c1, c2, scale,
			timestamp = e.timeStamp || Date.now();

		if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

		// Zoom
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
			that.touchesDist = m.sqrt(c1*c1+c2*c2);

			that.zoomed = true;

			scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

			if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
			else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

			that.lastScale = scale / this.scale;

			newX = this.originX - this.originX * that.lastScale + this.x,
			newY = this.originY - this.originY * that.lastScale + this.y;

			this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;

			if (that.options.onZoom) that.options.onZoom.call(that, e);
			return;
		}

		that.pointX = point.pageX;
		that.pointY = point.pageY;

		// Slow down if outside of the boundaries
		if (newX > 0 || newX < that.maxScrollX) {
			newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
		}
		if (newY > that.minScrollY || newY < that.maxScrollY) {
			newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
		}

		that.distX += deltaX;
		that.distY += deltaY;
		that.absDistX = m.abs(that.distX);
		that.absDistY = m.abs(that.distY);

		if (that.absDistX < 6 && that.absDistY < 6) {
			return;
		}

		// Lock direction
		if (that.options.lockDirection) {
			if (that.absDistX > that.absDistY + 5) {
				newY = that.y;
				deltaY = 0;
			} else if (that.absDistY > that.absDistX + 5) {
				newX = that.x;
				deltaX = 0;
			}
		}

		that.moved = true;
		that._pos(newX, newY);
		that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if (timestamp - that.startTime > 300) {
			that.startTime = timestamp;
			that.startX = that.x;
			that.startY = that.y;
		}
		
		if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
	},
	
	_end: function (e) {
		if (hasTouch && e.touches.length !== 0) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			target, ev,
			momentumX = { dist:0, time:0 },
			momentumY = { dist:0, time:0 },
			duration = (e.timeStamp || Date.now()) - that.startTime,
			newPosX = that.x,
			newPosY = that.y,
			distX, distY,
			newDuration,
			snap,
			scale;

		that._unbind(MOVE_EV, window);
		that._unbind(END_EV, window);
		that._unbind(CANCEL_EV, window);

		if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

		if (that.zoomed) {
			scale = that.scale * that.lastScale;
			scale = Math.max(that.options.zoomMin, scale);
			scale = Math.min(that.options.zoomMax, scale);
			that.lastScale = scale / that.scale;
			that.scale = scale;

			that.x = that.originX - that.originX * that.lastScale + that.x;
			that.y = that.originY - that.originY * that.lastScale + that.y;
			
			that.scroller.style[transitionDuration] = '200ms';
			that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
			
			that.zoomed = false;
			that.refresh();

			if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
			return;
		}

		if (!that.moved) {
			if (hasTouch) {
				if (that.doubleTapTimer && that.options.zoom) {
					// Double tapped
					clearTimeout(that.doubleTapTimer);
					that.doubleTapTimer = null;
					if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
					that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
					if (that.options.onZoomEnd) {
						setTimeout(function() {
							that.options.onZoomEnd.call(that, e);
						}, 200); // 200 is default zoom duration
					}
				} else if (this.options.handleClick) {
					that.doubleTapTimer = setTimeout(function () {
						that.doubleTapTimer = null;

						// Find the last touched element
						target = point.target;
						while (target.nodeType != 1) target = target.parentNode;

						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
							ev = doc.createEvent('MouseEvents');
							ev.initMouseEvent('click', true, true, e.view, 1,
								point.screenX, point.screenY, point.clientX, point.clientY,
								e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
								0, null);
							ev._fake = true;
							target.dispatchEvent(ev);
						}
					}, that.options.zoom ? 250 : 0);
				}
			}

			that._resetPos(400);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		if (duration < 300 && that.options.momentum) {
			momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
			momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

			newPosX = that.x + momentumX.dist;
			newPosY = that.y + momentumY.dist;

			if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
			if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
		}

		if (momentumX.dist || momentumY.dist) {
			newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

			// Do we need to snap?
			if (that.options.snap) {
				distX = newPosX - that.absStartX;
				distY = newPosY - that.absStartY;
				if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
				else {
					snap = that._snap(newPosX, newPosY);
					newPosX = snap.x;
					newPosY = snap.y;
					newDuration = m.max(snap.time, newDuration);
				}
			}

			that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		// Do we need to snap?
		if (that.options.snap) {
			distX = newPosX - that.absStartX;
			distY = newPosY - that.absStartY;
			if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
			else {
				snap = that._snap(that.x, that.y);
				if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
			}

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		that._resetPos(200);
		if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	},
	
	_resetPos: function (time) {
		var that = this,
			resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
			resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		if (resetX == that.x && resetY == that.y) {
			if (that.moved) {
				that.moved = false;
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
			}

			if (that.hScrollbar && that.options.hideScrollbar) {
				if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
				that.hScrollbarWrapper.style.opacity = '0';
			}
			if (that.vScrollbar && that.options.hideScrollbar) {
				if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
				that.vScrollbarWrapper.style.opacity = '0';
			}

			return;
		}

		that.scrollTo(resetX, resetY, time || 0);
	},

	_wheel: function (e) {
		var that = this,
			wheelDeltaX, wheelDeltaY,
			deltaX, deltaY,
			deltaScale;

		if ('wheelDeltaX' in e) {
			wheelDeltaX = e.wheelDeltaX / 12;
			wheelDeltaY = e.wheelDeltaY / 12;
		} else if('wheelDelta' in e) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
		} else if ('detail' in e) {
			wheelDeltaX = wheelDeltaY = -e.detail * 3;
		} else {
			return;
		}
		
		if (that.options.wheelAction == 'zoom') {
			deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
			if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
			if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
			
			if (deltaScale != that.scale) {
				if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
				that.wheelZoomCount++;
				
				that.zoom(e.pageX, e.pageY, deltaScale, 400);
				
				setTimeout(function() {
					that.wheelZoomCount--;
					if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
				}, 400);
			}
			
			return;
		}
		
		deltaX = that.x + wheelDeltaX;
		deltaY = that.y + wheelDeltaY;

		if (deltaX > 0) deltaX = 0;
		else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

		if (deltaY > that.minScrollY) deltaY = that.minScrollY;
		else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
    
		if (that.maxScrollY < 0) {
			that.scrollTo(deltaX, deltaY, 0);
		}
	},
	
	_transitionEnd: function (e) {
		var that = this;

		if (e.target != that.scroller) return;

		that._unbind(TRNEND_EV);
		
		that._startAni();
	},


	/**
	*
	* Utilities
	*
	*/
	_startAni: function () {
		var that = this,
			startX = that.x, startY = that.y,
			startTime = Date.now(),
			step, easeOut,
			animate;

		if (that.animating) return;
		
		if (!that.steps.length) {
			that._resetPos(400);
			return;
		}
		
		step = that.steps.shift();
		
		if (step.x == startX && step.y == startY) step.time = 0;

		that.animating = true;
		that.moved = true;
		
		if (that.options.useTransition) {
			that._transitionTime(step.time);
			that._pos(step.x, step.y);
			that.animating = false;
			if (step.time) that._bind(TRNEND_EV);
			else that._resetPos(0);
			return;
		}

		animate = function () {
			var now = Date.now(),
				newX, newY;

			if (now >= startTime + step.time) {
				that._pos(step.x, step.y);
				that.animating = false;
				if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
				that._startAni();
				return;
			}

			now = (now - startTime) / step.time - 1;
			easeOut = m.sqrt(1 - now * now);
			newX = (step.x - startX) * easeOut + startX;
			newY = (step.y - startY) * easeOut + startY;
			that._pos(newX, newY);
			if (that.animating) that.aniTime = nextFrame(animate);
		};

		animate();
	},

	_transitionTime: function (time) {
		time += 'ms';
		this.scroller.style[transitionDuration] = time;
		if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
		if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
	},

	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
		var deceleration = 0.0006,
			speed = m.abs(dist) / time,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = 0, outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries
		if (dist > 0 && newDist > maxDistUpper) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistUpper = maxDistUpper + outsideDist;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		} else if (dist < 0 && newDist > maxDistLower) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistLower = maxDistLower + outsideDist;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

        // TODO 가속도 및 이동 거리 제한
//        newDist = newDist > 1000 ? 1000 : (newDist < -1000 ? -1000 : newDist);
//        speed = speed > 0.1 ? 0.1 : speed;

		return { dist: newDist, time: m.round(newTime) };
	},

	_offset: function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;
			
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		
		if (el != this.wrapper) {
			left *= this.scale;
			top *= this.scale;
		}

		return { left: left, top: top };
	},

	_snap: function (x, y) {
		var that = this,
			i, l,
			page, time,
			sizeX, sizeY;

		// Check page X
		page = that.pagesX.length - 1;
		for (i=0, l=that.pagesX.length; i<l; i++) {
			if (x >= that.pagesX[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
		x = that.pagesX[page];
		sizeX = m.abs(x - that.pagesX[that.currPageX]);
		sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
		that.currPageX = page;

		// Check page Y
		page = that.pagesY.length-1;
		for (i=0; i<page; i++) {
			if (y >= that.pagesY[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
		y = that.pagesY[page];
		sizeY = m.abs(y - that.pagesY[that.currPageY]);
		sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
		that.currPageY = page;

		// Snap with constant speed (proportional duration)
		time = m.round(m.max(sizeX, sizeY)) || 200;

		return { x: x, y: y, time: time };
	},

	_bind: function (type, el, bubble) {
		(el || this.scroller).addEventListener(type, this, !!bubble);
	},

	_unbind: function (type, el, bubble) {
		(el || this.scroller).removeEventListener(type, this, !!bubble);
	},


	/**
	*
	* Public methods
	*
	*/
	destroy: function () {
		var that = this;

		that.scroller.style[transform] = '';

		// Remove the scrollbars
		that.hScrollbar = false;
		that.vScrollbar = false;
		that._scrollbar('h');
		that._scrollbar('v');

		// Remove the event listeners
		that._unbind(RESIZE_EV, window);
		that._unbind(START_EV);
		that._unbind(MOVE_EV, window);
		that._unbind(END_EV, window);
		that._unbind(CANCEL_EV, window);
		
		if (!that.options.hasTouch) {
			that._unbind(WHEEL_EV);
		}
		
		if (that.options.useTransition) that._unbind(TRNEND_EV);
		
		if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
		
		if (that.options.onDestroy) that.options.onDestroy.call(that);
	},

	refresh: function () {
		var that = this,
			offset,
			i, l,
			els,
			pos = 0,
			page = 0;

		if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
		that.wrapperW = that.wrapper.clientWidth || 1;
		that.wrapperH = that.wrapper.clientHeight || 1;

		that.minScrollY = -that.options.topOffset || 0;
		that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
		that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
		that.maxScrollX = that.wrapperW - that.scrollerW;
		that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
		that.dirX = 0;
		that.dirY = 0;

		if (that.options.onRefresh) that.options.onRefresh.call(that);

		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

		that.hScrollbar = that.hScroll && that.options.hScrollbar;
		that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

		offset = that._offset(that.wrapper);
		that.wrapperOffsetLeft = -offset.left;
		that.wrapperOffsetTop = -offset.top;

		// Prepare snap
		if (typeof that.options.snap == 'string') {
			that.pagesX = [];
			that.pagesY = [];
			els = that.scroller.querySelectorAll(that.options.snap);
			for (i=0, l=els.length; i<l; i++) {
				pos = that._offset(els[i]);
				pos.left += that.wrapperOffsetLeft;
				pos.top += that.wrapperOffsetTop;
				that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
				that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
			}
		} else if (that.options.snap) {
			that.pagesX = [];
			while (pos >= that.maxScrollX) {
				that.pagesX[page] = pos;
				pos = pos - that.wrapperW;
				page++;
			}
			if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];

			pos = 0;
			page = 0;
			that.pagesY = [];
			while (pos >= that.maxScrollY) {
				that.pagesY[page] = pos;
				pos = pos - that.wrapperH;
				page++;
			}
			if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
		}

		// Prepare the scrollbars
		that._scrollbar('h');
		that._scrollbar('v');

		if (!that.zoomed) {
			that.scroller.style[transitionDuration] = '0';
			that._resetPos(400);
		}
	},

	scrollTo: function (x, y, time, relative) {
		var that = this,
			step = x,
			i, l;

		that.stop();

		if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
		
		for (i=0, l=step.length; i<l; i++) {
			if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
			that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
		}

		that._startAni();
	},

	scrollToElement: function (el, time) {
		var that = this, pos;
		el = el.nodeType ? el : that.scroller.querySelector(el);
		if (!el) return;

		pos = that._offset(el);
		pos.left += that.wrapperOffsetLeft;
		pos.top += that.wrapperOffsetTop;

		pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
		pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
		time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

		that.scrollTo(pos.left, pos.top, time);
	},

	scrollToPage: function (pageX, pageY, time) {
		var that = this, x, y;
		
		time = time === undefined ? 400 : time;

		if (that.options.onScrollStart) that.options.onScrollStart.call(that);

		if (that.options.snap) {
			pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
			pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;

			pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
			pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;

			that.currPageX = pageX;
			that.currPageY = pageY;
			x = that.pagesX[pageX];
			y = that.pagesY[pageY];
		} else {
			x = -that.wrapperW * pageX;
			y = -that.wrapperH * pageY;
			if (x < that.maxScrollX) x = that.maxScrollX;
			if (y < that.maxScrollY) y = that.maxScrollY;
		}

		that.scrollTo(x, y, time);
	},

	disable: function () {
		this.stop();
		this._resetPos(0);
		this.enabled = false;

		// If disabled after touchstart we make sure that there are no left over events
		this._unbind(MOVE_EV, window);
		this._unbind(END_EV, window);
		this._unbind(CANCEL_EV, window);
	},
	
	enable: function () {
		this.enabled = true;
	},
	
	stop: function () {
		if (this.options.useTransition) this._unbind(TRNEND_EV);
		else cancelFrame(this.aniTime);
		this.steps = [];
		this.moved = false;
		this.animating = false;
	},
	
	zoom: function (x, y, scale, time) {
		var that = this,
			relScale = scale / that.scale;

		if (!that.options.useTransform) return;

		that.zoomed = true;
		time = time === undefined ? 200 : time;
		x = x - that.wrapperOffsetLeft - that.x;
		y = y - that.wrapperOffsetTop - that.y;
		that.x = x - x * relScale + that.x;
		that.y = y - y * relScale + that.y;

		that.scale = scale;
		that.refresh();

		that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
		that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		that.scroller.style[transitionDuration] = time + 'ms';
		that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
		that.zoomed = false;
	},
	
	isReady: function () {
		return !this.moved && !this.zoomed && !this.animating;
	}
};

function prefixStyle (style) {
	if ( vendor === '' ) return style;

	style = style.charAt(0).toUpperCase() + style.substr(1);
	return vendor + style;
}

dummyStyle = null;	// for the sake of it

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})(window, document);/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : featured-scrollview.js
 *  Description: 스크롤뷰는 코너스톤 UI에 맞게 기본적으로 설정하며, DATA-API를 사용해서 스크립트 사용없이 마크업
 *  속성만으로 작동되도록 구현함.
 *  Author: 김우섭
 *  License :
 */

(function (root, doc, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD Hybrid 포맷
        define(function (require, exports, module) {
            var $ = require("jquery");
            return factory($, root, doc);
        });
    } else {
        // Browser globals
        factory(root.jQuery, root, doc);
    }
}(this, document, function ($, window, document) {

    var pluginName = "featuredScrollView",
        myScroll, pullDownEl, pullDownOffset,
        pullUpEl, pullUpOffset,
        defaultOptions = {
            formFields:undefined,
            pullDownID:undefined,
            pullUpID:undefined,
            pullDownAction:undefined,
            pullUpAction:undefined
        };

    var Plugin = function (element, options) {
        var self = this;
        this.options = options;
        this.$el = $(element);

        this.formCheck();
        this.pullToRefresh();

        options = $.extend(true, defaultOptions, options);
        this.iscroll = new iScroll(this.$el[0], options);

        this.$el.on("scrollview.refresh", function(e) {
            self.refresh();
        });
    };

    Plugin.prototype.refresh = function () {
        this.iscroll.refresh();
    };

    // 폼 엘리먼트인 경우 드래그로 입력박스 터치불가한 문제를 해결
    Plugin.prototype.formCheck = function () {
        if (!(!$.isEmptyObject(this.options) && $.isArray(this.options.formFields) && this.options.formFields.length > 0)) {
            return false;
        }
        var self = this;
        // 폼 엘리먼트인 경우 드래그 이벤트를 무시하도록 하기 위한 예외처리
        var onBeforeScrollStart = function (e) {
            var target = e.target;
            var isNotField = true;
            while (target.nodeType != 1) target = target.parentNode;

            // 배열로 예외처리할 폼 엘리먼트를 tagName과 비교한다.
            $.grep(self.options.formFields, function (n, i) {
                isNotField = isNotField && target.tagName != n;
//                console.log(target.tagName, n, target.tagName != n, isNotField);
            });

            if (isNotField)
                e.preventDefault();
        };
        defaultOptions.onBeforeScrollStart = onBeforeScrollStart;
    };

    // Pull to refresh
    Plugin.prototype.pullToRefresh = function () {
        if (!(this.options != null && typeof this.options.pullDownID === "string" && typeof this.options.pullUpID === "string")) {
            return false;
        }

        var self = this;
        pullDownEl = document.getElementById(this.options.pullDownID);
        pullDownOffset = pullDownEl.offsetHeight;
        pullUpEl = document.getElementById(this.options.pullUpID);
        pullUpOffset = pullUpEl.offsetHeight;

        var topOffset = pullDownOffset;
        var onRefresh = function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
            }
        };
        var onScrollMove = function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                this.maxScrollY = pullUpOffset;
            }
        };
        var onScrollEnd = function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
//                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '로딩 중...';
                self.options.pullDownAction();	// Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
//                    pullUpEl.querySelector('.pullUpLabel').innerHTML = '로딩 중...';
                self.options.pullUpAction();	// Execute custom function (ajax call?)
            }
        };

        defaultOptions.topOffset = topOffset;
        defaultOptions.onRefresh = onRefresh;
        defaultOptions.onScrollMove = onScrollMove;
        defaultOptions.onScrollEnd = onScrollEnd;
    };

    // 스크롤뷰 플러그인 랩핑 및 기본값 설정
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            myScroll = new Plugin(this, options);
        });
    };

    /**
     * DATA API (HTML5 Data Attribute)
     */
    $("[data-featured=scrollView]").each(function (i) {
        $(this)[pluginName]();
    });
}));