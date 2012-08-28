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
/*!
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

                console.log(x + " / " + y);
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

            if(!this.insertingValue && input[0].value != val) {
                this.insertingValue = true;
                input[0].value = val;
                this.insertingValue = false;
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

}));/** @preserve
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

/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
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
    /*
     * Kendo UI Complete v2012.1.515 (http://kendoui.com)
     * Copyright 2012 Telerik AD. All rights reserved.
     *
     * Kendo UI Complete commercial licenses may be obtained at http://kendoui.com/complete-license
     * If you do not own a commercial license, this file shall be governed by the trial license terms.
     */
//    (function (a, b) {
//        function n(a, b, c) {
//            return Math.max(b, Math.min(c, a))
//        }
//
//        var c = window.kendo, d = c.mobile.ui, e = d.Widget, f = c.support, g = "change", h = "km-switch-on", i = "km-switch-off", j = "margin-left", k = "km-state-active", l = f.transitions.css + "transform", m = a.proxy, o = e.extend({init:function (a, b) {
//            var d = this, f, g, h;
//            e.fn.init.call(d, a, b), d._wrapper(), d._drag(), d._background(), d._handle(), a = d.element.data(c.attr("role"), "switch"), a[0].type = "checkbox", f = d.wrapper.width(), h = d.handle.outerWidth(!0), d.constrain = f - h, d.snapPoint = f / 2 - h / 2, d._animateBackground = !0, g = d.options.checked, g === null && (g = a[0].checked), d.check(g), c.notify(d, c.mobile.ui)
//        }, events:[g], options:{name:"Switch", onLabel:"ON", offLabel:"OFF", checked:null}, check:function (a) {
//            var c = this, d = c.element[0];
//            if (a === b)return d.checked;
//            c._position(a ? c.constrain : 0), d.checked = a, c.wrapper.toggleClass(h, a).toggleClass(i, !a)
//        }, toggle:function () {
//            var a = this;
//            a.check(!a.element[0].checked)
//        }, _move:function (a) {
//            var b = this;
//            a.preventDefault(), b._position(n(b.position + a.x.delta, 0, b.constrain))
//        }, _position:function (a) {
//            var b = this;
//            b.position = a, b.handle.css(l, "translatex(" + a + "px)"), b._animateBackground && b.background.css(j, b.origin + a)
//        }, _start:function (a) {
//            this.drag.capture(), this.handle.addClass(k)
//        }, _stop:function (a) {
//            var b = this;
//            b.handle.removeClass(k), b._toggle(b.position > b.snapPoint)
//        }, _toggle:function (a) {
//            var b = this, c = b.handle, d = b.element[0], e = d.checked, f = 200, j;
//            b.wrapper.toggleClass(h, a).toggleClass(i, !a), b.position = j = a * b.constrain, b._animateBackground && b.background.kendoStop(!0, !0).kendoAnimate({effects:"slideMargin", offset:j, reverse:!a, axis:"left", duration:f, ease:"linear"}), c.kendoStop(!0, !0).kendoAnimate({effects:"slideTo", duration:f, offset:j + "px,0", complete:function () {
//                e !== a && (d.checked = a, b.trigger(g, {checked:a}))
//            }})
//        }, _background:function () {
//            var b = this, c;
//            c = a("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>").appendTo(b.wrapper).children(".km-switch-background"), b.origin = parseInt(c.css(j), 10), c.data("origin", b.origin), b.background = c
//        }, _handle:function () {
//            var b = this, c = b.options;
//            b.handle = a("<span class='km-switch-container'><span class='km-switch-handle' /></span>").appendTo(b.wrapper).children(".km-switch-handle"), b.handle.append('<span class="km-switch-label-on">' + c.onLabel + '</span><span class="km-switch-label-off">' + c.offLabel + "</span>")
//        }, _wrapper:function () {
//            var a = this, b = a.element, c = b.parent("span.km-swith");
//            c[0] || (c = b.wrap('<span class="km-switch"/>').parent()), a.wrapper = c
//        }, _drag:function () {
//            var a = this;
//            a.drag = new c.Drag(a.wrapper, {tap:function () {
//                a._toggle(!a.element[0].checked)
//            }, start:m(a._start, a), move:m(a._move, a), end:m(a._stop, a)})
//        }});
//        d.plugin(o)
//    })(jQuery)
}));/*
 *  Project: SKT HTML5 Framework
 *  CodeName : CornerStone
 *  FileName : widget.js
 *  Description: widget.js은 각종 플러그인들의 wrapping, 커스텀 플러그인, 전후 처리를 통한 최적화 및 공통적인 터치 기능 등과 같은 작업을 처리한다.
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
            }).on("mouseup.swipe.* touchend.swipe.*", function (e) {
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

     ### 플러그인 옵션

     |  이름  |   타입   | 기본값 | 설명
     |:------|:-------:|:----:|:------------:
     | x     | boolean | true | X축 드래그 활성화 여부
     | y     | boolean | true | Y축 드래그 활성화 여부
     | drag  | boolean | true | Drag 활성화 여부


     @method $().swipe
     @param option{string} 드래그 플러그인의 사용자 설정값
     @return {jQuery} chainable jQuery 클래스
     */
    $.fn.swipe = function (option) {
        var touch = new Touch();
        return touch.swipe($(this), option);
    };

}))
;