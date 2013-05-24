(($) ->
  $.fn.slideshow = (opts)->
    settings = $.extend
      timeOut: 4000
      elem: "ul.slides li"
      setNavi: true
    , opts

    Builder = (el) ->
      @me = $(el)
      @init()

    Builder:: =
      showSlide: ->
        sl = @
        @timeIndex = setTimeout( ->
          sl.slideSwitch()
          return
        , settings.timeOut)
        return

      setNavi: (next) -> 
        items = $("ul#slide_navi li")
        currentActive = items.filter(".active")
        nextActive = items.eq(next.index())
        currentActive.removeClass("active")
        nextActive.addClass("active")
        return

      slideSwitch: (index) ->
        @me.find(settings.elem).stop(true, true)
        active = @me.find("#{settings.elem}.active")
        if active.length == 0 
          active = @me.find("#{settings.elem}:last")
        if index == undefined
          next = if active.next(settings.elem).length
            active.next(settings.elem)
          else
            @me.find("#{settings.elem}:first")
        else
          next = @me.find("#{settings.elem}:eq(#{index})")
          if active.index() == next.index()
            return false;

        # обновляем навигацию по слайдам
        if (settings.setNavi) 
          @setNavi(next)

        active.addClass('last-active')
        next.css(opacity: 0.0).addClass("active").animate
          opacity: 1.0,
          1000, ->
            active.removeClass "active last-active"
        @showSlide()

        return

      printNavi: (pagination)->
        $(@me).append(pagination)
        return

      init: ->
        settings.setNavi = settings.setNavi && @me.find(settings.elem).length > 1
        if settings.setNavi
          sl = @
          links = ""
          i = 1
          max = @me.find(settings.elem).length
          while i <= max
            links += "<li><a href='#'>#{i}</a>"
            i++

          links = $(links).click((e) ->
            clearTimeout sl.timeIndex
            sl.slideSwitch $(@).index()
            e.preventDefault()
            return
          )


          pagination = $("<ul id='slide_navi'></ul>")
          pagination.html(links)
          sl.printNavi(pagination)
          links.filter(":first").addClass("active")
          

        @me.find(settings.elem).filter(":first").addClass("active")
        if @me.find(settings.elem).length > 1
          @showSlide()
          return

    return @each ->
      new Builder(@)
      return

  return
) jQuery
