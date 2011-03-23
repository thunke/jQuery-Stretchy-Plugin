/*
 * jQuery Stretch Plugin
 * https://github.com/thunke/jQuery-Stretchy-Plugin
 * Copyright (c) 2010 Tommy Hunke
 * Version: 1.0 (05/23/2010)
 * Licensed under the MIT licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.3 or later
 */
 ;(function($){

  $.fn.stretch = function(){
    
    return this.each(function(){

      var $this = $(this);
      var $container, $children, childWidth, $childWrapper, itemsPerRow, wrapperWidth;
    
      //find the parent, width of parent
      $container = $this.parent();

      //find the children, width of children (including margin, padding, border)
      $children = $this.children();
      childWidth = $children.width()
         + parseInt($children.css('margin-left'))
         + parseInt($children.css('margin-right'))
         + parseInt($children.css('padding-left'))
         + parseInt($children.css('padding-right'));
         + parseInt($children.css('border-left-width'))
         + parseInt($children.css('border-right-width'));

      //calculate items per row
      itemsPerRow = calcItemsPerRow($container.width(), childWidth);

      //insert a stretchy wrapper around each child

      var wrapperTemplate = $("<div></div>").addClass("childWrapper").css(
        { "float" : "left", 
          "min-width" : childWidth, 
          "margin-top" : $children.css("margin-top"), 
          "margin-bottom" : $children.css("margin-bottom"),  
        }
      );

      //center the child within the stretchy wrapper
      $children.wrap(wrapperTemplate).css(
        { "margin" : "0 auto", 
          "float" : "none", 
          "display" : "block",
        }
      );

      $childWrapper = $this.find('.childWrapper');

      //adjust wrapper width
      setWrapperWidth($childWrapper, calcWidth(itemsPerRow));

      //recalculate width, items per row, width of wrappers on resize
      $(window).resize(function(){
        // calc items per row
        itemsPerRow = calcItemsPerRow($container.width(), childWidth); 

        // adjust wrapper width
        setWrapperWidth($childWrapper, calcWidth(itemsPerRow));
      });

    });
    
    function calcItemsPerRow(containerWidth, childWidth){
       //how many items can fit on a row = total width / child 'width'
       return Math.floor(containerWidth / childWidth);
    }

    function setWrapperWidth($childWrapper, wWidth){
        $childWrapper.css( { "width" : wWidth+"%" } );
    }

    function calcWidth(itemsPerRow){
      return (Math.floor(100 / itemsPerRow));
    }
    
  };
  
})(jQuery);
