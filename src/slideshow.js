(function() {
  (function($) {
    $.fn.slideshow = function() {
      var Builder, settings;

      settings = $.extend({
        timeOut: 4000,
        elem: "ul.slides li",
        setNavi: true
      });
      Builder = function(el) {
        this.me = $(el);
        return this.init();
      };
      Builder.prototype = {
        showSlide: function() {
          var sl;

          sl = this;
          this.timeIndex = setTimeout(function() {
            sl.slideSwitch();
          }, settings.timeOut);
        },
        setNavi: function(next) {
          var currentActive, items, nextActive;

          items = $("ul#slide_navi li");
          currentActive = items.filter(".active");
          nextActive = items.eq(next.index());
          currentActive.removeClass("active");
          nextActive.addClass("active");
        },
        slideSwitch: function(index) {
          var active, next;

          this.me.find(settings.elem).stop(true, true);
          active = this.me.find("" + settings.elem + ".active");
          if (active.length === 0) {
            active = this.me.find("" + settings.elem + ":last");
          }
          if (index === void 0) {
            next = active.next(settings.elem).length ? active.next(settings.elem) : this.me.find("" + settings.elem + ":first");
          } else {
            next = this.me.find("" + settings.elem + ":eq(" + index + ")");
            if (active.index() === next.index()) {
              return false;
            }
          }
          if (settings.setNavi) {
            this.setNavi(next);
          }
          active.addClass('last-active');
          next.css({
            opacity: 0.0
          }).addClass("active").animate({
            opacity: 1.0
          }, 1000, function() {
            return active.removeClass("active last-active");
          });
          this.showSlide();
        },
        printNavi: function(pagination) {
          $(this.me).append(pagination);
        },
        init: function() {
          var i, links, max, pagination, sl;

          settings.setNavi = settings.setNavi && this.me.find(settings.elem).length > 1;
          if (settings.setNavi) {
            sl = this;
            links = "";
            i = 1;
            max = this.me.find(settings.elem).length;
            while (i <= max) {
              links += "<li><a href='#'>" + i + "</a>";
              i++;
            }
            links = $(links).click(function(e) {
              clearTimeout(sl.timeIndex);
              sl.slideSwitch($(this).index());
              e.preventDefault();
            });
            pagination = $("<ul id='slide_navi'></ul>");
            pagination.html(links);
            sl.printNavi(pagination);
            links.filter(":first").addClass("active");
          }
          this.me.find(settings.elem).filter(":first").addClass("active");
          if (this.me.find(settings.elem).length > 1) {
            this.showSlide();
          }
        }
      };
      return this.each(function() {
        new Builder(this);
      });
    };
  })(jQuery);

}).call(this);
