L.Control.BottomMenu = L.Control.extend({
    options: {
        position: 'topleft',
        width: window.innerWidth,
        height: window.innerHeight,
        delay: '0',
        openTo: 76,
    },
    _category: '',
    _open: false,

    initialize: function (innerHTML, categoryTree, options) {

      L.Util.setOptions(this, options);
        
      if (L.Browser.mobile && window.innerWidth < 768) {
         this.options.mobile = true;
      } else {
         this.options.mobile = false;
         this.options.width = 360;
         this.options.height = 500;
      }
      
      this._innerHTML = innerHTML;
      this._startPosition = (parseInt(this.options.height, 10)) - 80;
      this._isLeftPosition = this.options.position == 'topleft' ||
      this.options.position == 'bottomleft' ? true : false;
        

      this.options.iconQty = 4;
      this.options.iconSize = 80;
      this.options.scrollbarWidth = 18; // IE / FF
      this.options.iconSpace = Math.floor((this.options.width - (this.options.iconQty * this.options.iconSize)) / (this.options.iconQty)
                                                              - (this.options.scrollbarWidth / (this.options.iconQty)));
        
      var contents = "";
      contents += '<ul class="leaflet-bottommenu-ul">';
      //@TODO: improve!!!!!!
      contents += '<li style="margin-left: ' + this.options.iconSpace + 'px !important; width: ' + this.options.iconSize + 'px !important"><a id="catMenuMobile-1" class="leaflet-bottommenu-a" href="#" onclick="_this._toogleCompleted();event.preventDefault();"><div class="circle" style="background-color: purple; border-color: purple"><span id="catCheckMark" class="icon-checkmark"' + (mapOptions.showCompleted?' style="color: gold; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;"':' style="color: white; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;"')+ '></span></div><p id="lblComplete">' + (mapOptions.showCompleted?'Hide Completed':'Show Completed') + '</p></a></li>';
      for (var i = 0; i < categoryTree.length; i++) {
         contents += '<li style="margin-left: ' + this.options.iconSpace + 'px !important; width: ' + this.options.iconSize + 'px !important"><a id="catMenuMobile' + categoryTree[i].id + '" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(' + categoryTree[i].id +  ');event.preventDefault();"><div class="circle" style="background-color: ' + categoryTree[i].color + '; border-color: ' + categoryTree[i].color + '"><span class="icon-' + categoryTree[i].img + '"></span></div><p>' + categoryTree[i].name + '</p></a></li>';
         if (categoryTree[i].children.length > 0) {
            for (var j = 0; j < categoryTree[i].children.length; j++) {
               contents += '<li style="margin-left: ' + this.options.iconSpace + 'px !important; width: ' + this.options.iconSize + 'px !important"><a id="catMenuMobile' + categoryTree[i].children[j].id + '" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(' + categoryTree[i].children[j].id +  ');event.preventDefault();"><div class="circle" style="background-color: ' + categoryTree[i].color + '; border-color: ' + categoryTree[i].color + '"><span class="icon-' + categoryTree[i].children[j].img + '"></span></div><p>' + categoryTree[i].children[j].name + '</p></a></li>';
            }
         }
      }
      contents += '</ul>';
      this._category = contents;
         
    },
    
    createIcon: function(container, img, name, color) {
       var li = L.DomUtil.create('li', 'leaflet-bottommenu-ul', container);
       li.style.marginLeft = this.options.iconSpace + 'px';
       li.style.width = this.options.iconSize + 'px';
       
       var a = L.DomUtil.create('a', 'leaflet-bottommenu-a', li);
       a.id = 'catMenuMobile' + categoryTree[i].id;
       a.href = "#";
       
       var circle = L.DomUtil.create('div', 'circle', a);
       circle.style.backgroundColor = categoryTree[i].color;
       circle.style.borderColor = categoryTree[i].color;
       
       var span = L.DomUtil.create('span', 'icon-' + categoryTree[i].children[j].img, circle);
       
       var p = L.DomUtil.create('p', '', a);
       p.innerHTML = categoryTree[i].children[j].name;
    },
    
    onAdd: function (map) {

        var containerClass;
        
        this._menu;
        // If mobile, render the menu directy on the map container
        if (this.options.mobile) {
           this._container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control-layers-expanded leaflet-control leaflet-bottommenu'); //leaflet-control-layers leaflet-control-layers-expanded leaflet-control
           this._menu = L.DomUtil.create('div', 'leaflet-bottommenu', map._container);
        } else {
           this._container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-control-layers-expanded leaflet-control leaflet-bottommenu'); //leaflet-control-layers leaflet-control-layers-expanded leaflet-control
           this._menu = L.DomUtil.create('div', '', this._container);
           this._container.style.padding = '0px';
        }
        
        
        this._menu.style.width = this.options.width + 'px';
        this._menu.style.height = (this.options.height - this.options.openTo) + 'px';
       
        var headerMenu = L.DomUtil.create('header', 'ex1', this._menu);
        var xDown = null;                                                        
        var yDown = null;
        
        if( this.options.mobile) {
            L.DomEvent
               .on(headerMenu, 'click', L.DomEvent.stopPropagation)
               .on( headerMenu, 'touchstart', function( e) {
                   xDown = e.touches[0].clientX;                                      
                   yDown = e.touches[0].clientY;
               }, this)
               .on( headerMenu, 'touchmove', function( e) {
                   if ( ! xDown || ! yDown ) {
                       return;
                   }

                   var xUp = e.touches[0].clientX;                                    
                   var yUp = e.touches[0].clientY;

                   var xDiff = xDown - xUp;
                   var yDiff = yDown - yUp;

                   // ensures y movement is more significant
                   if ( Math.abs( xDiff ) < Math.abs( yDiff ) ) {/*most significant*/
                       if ( yDiff > 0 ) { // swipe up
                           //console.log('swipe up');
                           //console.log( this._open);
                           if( !this._open)
                           {
                               this._animate(this._menu, this._startPosition, this.options.openTo, true);
                               this._open = true;
                           }  
                       } else { // swipe down
                           //console.log('swipe down');
                           //console.log( this._open);
                           if( this._open)
                           {
                               this._animate(this._menu, this.options.openTo, this._startPosition, false);
                               this._open = false;
                               //TODO reset contents
                           }
                       }                       
                   }
                      
                   /* reset values */
                   xDown = null;
                   yDown = null;  
               }, this);
        }
        
        // Left Header Div
        /*
        var leftText = 'Categories';
        var leftDiv = L.DomUtil.create('div', 'header-right', headerMenu);
        leftDiv.style.marginRight = '40px';
        var leftDivLink = L.DomUtil.create('a', 'leaflet-bottommenu-a', leftDiv);
        leftDivLink.title = leftText;
        L.DomUtil.create('span', 'leaflet-bottommenu-header-icon icon-BotW_Weapons', leftDivLink);
        L.DomUtil.create('br', '', leftDivLink);
        var leftDivLinkText = L.DomUtil.create('p', '', leftDivLink);
        leftDivLinkText.innerHTML = leftText;
        L.DomEvent
            .on(leftDivLink, 'click', L.DomEvent.stopPropagation)
            .on(leftDivLink, 'click', function() {
                // Open
                this._open = !this._open;
                if (this._open) {
                  this._animate(this._menu, this._startPosition, OPEN_TO, this._open);
                } else {
                   this._animate(this._menu, OPEN_TO, this._startPosition, this._open);
                }
            }, this);
        
        // Right Header Div
        var rightText = 'Game';
        var rightDiv = L.DomUtil.create('div', 'header-right', headerMenu);
        var rightDivLink = L.DomUtil.create('a', 'leaflet-bottommenu-a', rightDiv);
        rightDivLink.title = rightText;
        L.DomUtil.create('span', 'leaflet-bottommenu-header-icon icon-BotW_Weapons', rightDivLink);
        L.DomUtil.create('br', '', rightDivLink);
        var rightDivLinkText = L.DomUtil.create('p', '', rightDivLink);
        rightDivLinkText.innerHTML = rightText;
        L.DomEvent
            .on(rightDivLink, 'click', L.DomEvent.stopPropagation)
            .on(rightDivLink, 'click', function() {
                // Open
                this._open = !this._open;
                if (this._open) {
                  this._animate(this._menu, this._startPosition, OPEN_TO, this._open);
                } else {
                   this._animate(this._menu, OPEN_TO, this._startPosition, this._open);
                }
            }, this);
        */
        
        if (this.options.mobile) {
	        // Grabber
			L.DomUtil.create('div', 'grabber', this._menu);
		}
            
        // Logo
        var logoDiv = L.DomUtil.create('div', 'logo', headerMenu);
        var imgLogo = L.DomUtil.create('img', '', logoDiv);
        imgLogo.src  = 'images/zmaps_white.png';

		
        L.DomUtil.create('hr', '', this._menu);

        
        L.DomEvent.disableClickPropagation(this._menu);
        /** 001 - BEGIN **/
        // Add mouse wheel 
        L.DomEvent.on(this._menu, 'mousewheel', L.DomEvent.stopPropagation);
        /** 001 - END **/
        if (this.options.mobile) {
            if (this._isLeftPosition) {
               this._menu.style.top = this._startPosition + 'px';
            }
            else {
               this._menu.style.right = '-' + this.options.width;
            }
            
         }
         
         this._contents = L.DomUtil.create('div', 'leaflet-bottommenu-contents', this._menu);
         //this._contents.innerHTML = '<ul class="leaflet-bottommenu-ul"><li><a id="catMenu1911" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1911);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Meat"></span><br><p>Food (Beef)</p></a></li><li><a id="catMenu1912" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1912);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Fish"></span><br><p>Food (Fish)</p></a></li><li><a id="catMenu1913" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1913);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Herb"></span><br><p>Herbs</p></a></li><li><a id="catMenu1914" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1914);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Mushroom"></span><br><p>Mushrooms</p></a></li><li><a id="catMenu1915" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1915);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Materials"></span><br><p>Materials</p></a></li><li><a id="catMenu1916" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1916);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Korok-Seeds"></span><br><p>Korok Seeds</p></a></li></ul>';
         this._contents.id = 'menu-custom-content';
         this._contents.innerHTML = "";
         this._contents.style.display = 'none';
         if (this.options.mobile) {
            this._contents.style.height = (this.options.height - this.options.openTo - 80) + 'px';
         } else {
            this._contents.style.height = (this.options.height - this.options.openTo - 80) + 'px';
         }
         
         this._contentsCat = L.DomUtil.create('div', 'leaflet-bottommenu-contents', this._menu);
         //this._contents.innerHTML = '<ul class="leaflet-bottommenu-ul"><li><a id="catMenu1911" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1911);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Meat"></span><br><p>Food (Beef)</p></a></li><li><a id="catMenu1912" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1912);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Fish"></span><br><p>Food (Fish)</p></a></li><li><a id="catMenu1913" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1913);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Herb"></span><br><p>Herbs</p></a></li><li><a id="catMenu1914" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1914);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Mushroom"></span><br><p>Mushrooms</p></a></li><li><a id="catMenu1915" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1915);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Materials"></span><br><p>Materials</p></a></li><li><a id="catMenu1916" class="leaflet-bottommenu-a" href="#" onclick="_this._updateCategoryVisibility(1916);event.preventDefault();"><span class="leaflet-bottommenu-icon icon-BotW_Korok-Seeds"></span><br><p>Korok Seeds</p></a></li></ul>';
         this._contentsCat.id = 'menu-cat-content';
         this._contentsCat.innerHTML = this._category;
         this._contentsCat.style.clear = 'both';
         if (this.options.mobile) {
            this._contentsCat.style.height = (this.options.height - this.options.openTo - 80) + 'px';
         } else {
            this._contentsCat.style.height = (this.options.height - this.options.openTo - 80) + 'px';
         }
        
        this._baseContents = this._contents;
        return this._container;
    },

    onRemove: function(map){
        //Remove sliding menu from DOM
        map._container.removeChild(this._menu);
        delete this._menu;
    },


    setContents: function(innerHTML) {
         this._innerHTML = innerHTML;
         this._contents.innerHTML = this._innerHTML;
         this._contents.style.display = '';
         this._contentsCat.style.display = 'none';
         if (innerHTML != null && (innerHTML.search("<ul>") >= 0 || innerHTML.search("<ul class=") >= 0)) {
            
            slider = $('#' + this._contents.id).unslider({keys: false,               //  Enable keyboard (left, right) arrow shortcuts
                                                          dots: true,               //  Display dot navigation
                                                          arrows: true,
                                                          fluid: true,
                                                        });
            $.each( $("li[id^='citem-']"), function () {
                  $(this).show();
               });
            slider.unslider('initSwipe');
         }
    },
    
    /** 001 - BEGIN **/
    show: function() {
       bottomMenu._open = true;
       this._animate(this._menu, this._startPosition, this.options.openTo, true);
    },
    
    isMobile: function() {
       return this.options.mobile;
    },
    /** 001 - END **/

    _animate: function(menu, from, to, isOpen) {
        if ((isOpen && from < to) || (!isOpen && from > to)) {
            from = to;
        }

        if (this._isLeftPosition) {
            menu.style.top = from + "px";
        }
        else {
            menu.style.top = from + "px";
        }
        
        if (from == to) {
           if (!isOpen) {
              this._contents.style.display = 'none';
              this._contentsCat.style.display = '';

           }
           return;
        }

        setTimeout(function(bottomMenu) {
            var value = isOpen ? from - 10 : from + 10;
            if (isOpen && from < to) {
               value = to;
            }
            bottomMenu._animate(bottomMenu._menu, value, to, isOpen);
        }, this.options.delay, this);
    }
});

L.control.bottomMenu = function(innerHTML, options) {
    return new L.Control.BottomMenu(innerHTML, options);
}