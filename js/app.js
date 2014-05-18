var slider = {
  
  // Not sure if keeping element collections like this
  // together is useful or not.
  el: {
    slider: $("#slider"),
    allSlides: $(".slide"),
    sliderNav: $(".slider-nav"),
    allNavButtons: $(".slider-nav > a")
  },
  
  timing: 1500,
  slideWidth: 300, // could measure this
 
  // In this simple example, might just move the
  // binding here to the init function
  init: function() {
    this.bindUIEvents();
  },
  
  bindUIEvents: function() {
    // You can either manually scroll...
    this.el.slider.on("scroll", function(event) {
      slider.moveSlidePosition(event);
    });
    // ... or click a thing
    this.el.sliderNav.on("click", "a", function(event) {
      slider.handleNavClick(event, this);
    });
    //this is referring to the sliderNav jQuery object
    // What would be cool is if it had touch
    // events where you could swipe but it
    // also kinda snapped into place.
  },
  
  moveSlidePosition: function(event) {
    // Magic Numbers =(
    this.el.allSlides.css({
      "background-position": $(event.target).scrollLeft()/10-100+ "px 0"
    });  
  },
  
  handleNavClick: function(event, el) {
    event.preventDefault();
    var position = $(el).attr("href").split("-").pop();
    //position returns: ahref ID "0", "1", "2"
    this.el.slider.animate({
      scrollLeft: position * this.slideWidth
    }, this.timing);
    //animate takes a plain object. In this animate(there's an object "{inside it 
    // there is a property: scrollLeft and an optional speed:timing})/
    this.changeActiveNav(el);
  },
  
  changeActiveNav: function(el) {
    this.el.allNavButtons.removeClass("active");
    $(el).addClass("active");
  }
  
};

slider.init();

// http://codepen.io/BaylorRae/pen/ImGBC
// Originally added click links, so I ported over and re-wrote