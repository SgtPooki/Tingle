// ZLayers - The main, desktop-specific control for the site.

L.Control.ZLayers = L.Control.Layers.extend({
  _className: "L.Control.ZLayers",

  options: {
    className: "leaflet-control-layers",
    handlerRootNames: [
      "setContent",
      "resetContent",
      "_expand"
    ],
    collapsed: true,
    position: 'topleft',
    autoZIndex: false,
    headerHeight: 80,
    defaultContentType: 'category'
  },
  _categoryMenu: null,
  _contentType: null,
  // Currently existing modes/types:
  // - category
  // - m<markerId>
  // - newMarker
  // - registerForm
  // - lostPasswordForm
  // - changePasswordForm
  // - loginForm
  // - accountPage
  // - search

  initialize: function (baseLayers, categoryTree, options) {
    L.Control.ZControl.prototype.initialize.call(this, options);

    this._initHandlers();
    this._attachHandlers();

    this.options.width = 360;
    this.options.scrollbarWidth = 18; // IE / FF

    this._initContainer();
    this._addCollapseHandler();
  },

  _initContainer: function(t) {
    this._container = L.DomUtil.create('div', this.options.className);
  },
	_initLayout: function () {
    var container = this._container;

      if (!this.options.showMapControl) {
         container.style.display = 'none';
         container.style.marginTop = '0px';
      }

		if (!L.Browser.touch) {
			L.DomEvent.disableClickPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form1 = this._form = L.DomUtil.create('form', this.options.className + '-list');
		var form2 = this._form2 = L.DomUtil.create('form', this.options.className + '-list');

		// Why did we need the expand click iteraction at least?
		// This was getting in the way of having a nice default focus
		// into the search area.
      // L.DomEvent
      //     .on(container, 'click', this._expand, this)
      //     //.on(container, 'mouseout', this._collapse, this)
      // ;

      var link = this._layersLink = L.DomUtil.create('a', this.options.className + '-toggle', container);
      link.href = '#';
      link.title = 'Layers';

      L.DomEvent
          .on(container, 'click', L.DomEvent.stopPropagation)
          //.on(container, 'click', L.DomEvent.preventDefault)
          .on(container, 'dblclick', L.DomEvent.stopPropagation)
          .on(container, 'dblclick', L.DomEvent.preventDefault);

      if (L.Browser.touch) {
         L.DomEvent
            /*.on(link, 'click', L.DomEvent.stopPropagation)
             .on(link, 'click', L.DomEvent.preventDefault)*/
             .on(link, 'click', this._expand, this);
      }
      else {
         L.DomEvent.on(link, 'focus', this._expand, this);
      }

      form1.style.width = '360px';

      this.headerBar = new HeaderBar({
        parent: form1,
        mapControl: this
      });

      this._separator = L.DomUtil.create('div', this.options.className + '-separator', form1);

      var headerMenu = L.DomUtil.create('header', 'ex1', form1);
      headerMenu.style.height = (this.options.headerHeight - 2) + 'px'; // Need to remove 2px because of the separator

      var logo = new Logo({ parent: headerMenu });

      _thisLayer = this;
      this._gameMenu = this.createGameMenu();
      this._mapsMenu = this.createMapsMenu();

      var mapsButton = new MapButton({
        toggledOn: true,
        onToggle: function() {
           _thisLayer.setContent(_thisLayer._mapsMenu.domNode, "maps");
	      } // Where should the cookie code come from.... some config object with an abstracted persistence layer?,
      });
      // this.categoryButtonCompleted.domNode.on('toggle', opts.onCompletedToggle.bind(this.categoryButtonCompleted));
      $(headerMenu).append(mapsButton.domNode);

      var gamesButton = new GameButton({
        toggledOn: true,
        onToggle: function() {
           _thisLayer.setContent(_thisLayer._gameMenu.domNode, "game");
	      } // Where should the cookie code come from.... some config object with an abstracted persistence layer?,
      });
      // this.categoryButtonCompleted.domNode.on('toggle', opts.onCompletedToggle.bind(this.categoryButtonCompleted));
      $(headerMenu).append(gamesButton.domNode);



      this._separator = L.DomUtil.create('div', this.options.className + '-separator', form1);

      this._contents = L.DomUtil.create('div', 'main-content ' + this.options.className + '-list');
      L.DomEvent.disableClickPropagation(this._contents);
      L.DomEvent.on(this._contents, 'mousewheel', L.DomEvent.stopPropagation);
      this._contents.id = 'menu-cat-content';

      this._categoryMenu = this.createCategoryMenu();


      this.resetContent();

      this._contents.style.clear = 'both';
      this._contents.style.maxHeight = (window.innerHeight>250?window.innerHeight  - 250:250) + 'px';
      this._contents.style.width = '360px';

		container.appendChild(form1);
    container.appendChild(this._contents);
   },

   rebuildMapsMenu: function () {
      this._mapsMenu = this.createMapsMenu();
   },

  createCategoryMenu: function() {
    return new CategoryMenu({
     categoryTree: categoryTree
   });
  },

  onRemove: function (map) {},
  _updateLayerControl: function(obj) {},
  _update: function () {},
  _addItem: function (obj, vInputClick) {},

  _initHandlers: function() {
    if(!this.handlers)
      this.handlers = {};

    Array.flatten(this.options.handlerRootNames.map(function(handlerRootName) {
      return ['before', 'after'].map(function(handlerPrefix) {
        return "" +
          handlerPrefix +
          handlerRootName[0].toUpperCase() +
          handlerRootName.substr(1)
        ;
      });
    })).forEach(function(handlerName) {
      if(!this.handlers[handlerName])
        this.handlers[handlerName] = [];
    }, this);
  },
  _attachHandlers: function() {
    for(handlerClientName in this.handlers) {
      [
        this[handlerClientName],
        this.options[handlerClientName]
      ].forEach(function(handler) {
        if(handler) this.addHandler(handlerClientName, handler);
      }, this);
    }
  },

  createGameMenu: function() {
    return new GameMenu({
     categoryTree: games,
     onCategoryToggle: function(toggledOn, category) {
       (
         window.location.replace(location.protocol + '//' + location.host + location.pathname + "?game=" + category.shortName)
       ).call(zMap, category, toggledOn)
     }.bind(this), // TODO: Have a handler pass in the zMap's method from even higher above, for this function and others?!
     categorySelectionMethod: this.options.categorySelectionMethod,
     defaultToggledState: (this.options.categorySelectionMethod == "focus")
   });
  },


  createGameMenu: function() {
    return new GameMenu({
     categoryTree: games,
     onCategoryToggle: function(toggledOn, category) {
       (
         window.location.replace(location.protocol + '//' + location.host + location.pathname + "?game=" + category.shortName)
       ).call(zMap, category, toggledOn)
     }.bind(this), // TODO: Have a handler pass in the zMap's method from even higher above, for this function and others?!
     categorySelectionMethod: this.options.categorySelectionMethod,
     defaultToggledState: (this.options.categorySelectionMethod == "focus")
   });
  },

  createMapsMenu: function() {
    return new MapsMenu({
     categoryTree: maps,
     onCategoryToggle: function(toggledOn, category) {
         if (this.currentMapLayer.id != category.id) {
               map.removeLayer(this.currentMapLayer);
               map.addLayer(category);
               this.currentMapLayer = category;
               this.currentMapLayer.bringToBack();
               map.fire("baselayerchange", this.currentMapLayer);
         }
     }.bind(this), // TODO: Have a handler pass in the zMap's method from even higher above, for this function and others?!
     categorySelectionMethod: this.options.categorySelectionMethod,
     defaultToggledState: (this.options.categorySelectionMethod == "focus")
   });
  },

  changeMapLayer: function(category) {

  },

  _addCollapseHandler: function() {
    $(document).on('keydown', function(e) {
      if(e.key == "Escape") {
        this._resetOrToggle(e);
      }
    }.bind(this));
  },

  addHandler: function(eventName, handleFunction) {
    if(handleFunction)
      this.handlers[eventName].push(handleFunction.bind(this));
  },
  _triggerHandler: function(handleName) {
    var handlerArgs = Array.prototype.slice.call(arguments, 1);
    this.handlers[handleName].forEach(function(handler) {
      handler.apply(null, handlerArgs);
    }, this);
  },

  setContent: function(vContent, vType) {
    this._triggerHandler("beforeSetContent", vContent, vType);
    this._setContent(vContent, vType);
    this._triggerHandler("afterSetContent", vContent, vType);
  },
  // To be used directly by internal functions and avoid
  // unecessary handlers being triggered, as otherwise
  // it may be seen as an action setting content worth
  // opening and focusing on, when they are really only
  // initializing or cleaning up the widget, and should
  // be ignored.
  _setContent: function(vContent, vType) {
    // Our fix for re-using the CategoryMenu not just for
    // more efficient code style, but also to retain the event
    // listeners set-up during intialization.
    if(this._contentType == 'category') {// in the future when everything is a widget with re-usable DOM elements, we won't need the check here, or even detach, as we should be hiding!
      $(this._categoryMenu.domNode).detach();
    }
    if(this._contentType == 'game') {// in the future when everything is a widget with re-usable DOM elements, we won't need the check here, or even detach, as we should be hiding!
      $(this._gameMenu.domNode).detach();
    }
    if(this._contentType == 'maps') {// in the future when everything is a widget with re-usable DOM elements, we won't need the check here, or even detach, as we should be hiding!
      $(this._mapsMenu.domNode).detach();
    }
    $(this._contents).empty();
    if(vType != 'category') {
      var closeButton = L.DomUtil.create('a', 'button back-button', this._contents);
      closeButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
      closeButton.href="#close";
      L.DomEvent
         .on(closeButton, 'click', L.DomEvent.stopPropagation)
         .on(closeButton, 'click', function(e) {
             // Open
             this.resetContent();
             e.preventDefault();
         }, this)
    }

    var content = L.DomUtil.create('div', '', this._contents);
    $(content).append(vContent);
    content.className = 'menu-cat-content-inner';

    this._contentType = vType;
    $("#menu-cat-content").animate({ scrollTop: 0 }, "fast");
  },
  _resetContent: function(runNestedHooks = true) {
    //@TODO: New Marker should be from the map!
    if (newMarker != null) {
       map.removeLayer(newMarker);
    }

    ((runNestedHooks)
      ? (this.setContent)
      : (this._setContent)
    ).call(
      this,
      this._categoryMenu.domNode,
      this.options.defaultContentType
    );
    $("#menu-cat-content").animate({ scrollTop: 0 }, "fast");
  },
  toggleContent: function(targetContentType, setContentFunction) {
     if(this._contentType == targetContentType) {
       this.resetContent();
     } else {
       setContentFunction();
     }
   },
  // Sets it to the default category selector scene,
  // or whatever is set as the intended default scene.
  resetContent: function() {
    this._triggerHandler("beforeResetContent");
    this._resetContent();
    this._triggerHandler("afterResetContent");
  },
  _resetOrToggle: function(e) {
    if(!this.isShowingDefaultContent()) {
      L.DomEvent.stopPropagation(e);
      e.stopImmediatePropagation()
      this.resetContent();
    } else {
      this.toggle();
    }
  },
  getContentType() {
    return this._contentType;
  },
  isShowingDefaultContent() {
    return this._contentType == this.options.defaultContentType;
  },

  isCollapsed: function () {
    return this.options.collapsed;
  },
  _collapse: function() {
    this.resetContent();
    this.options.collapsed = true;
    return this.collapse();
  },
  _expand: function() {
     this._triggerHandler("before_expand");
      if (this._contents != undefined) {
         this._contents.style.maxHeight = (window.innerHeight>250?window.innerHeight  - 250:250) + 'px';
      }

      this.options.collapsed = false;
      this.expand();
    this._triggerHandler("after_expand");
   },
  after_expand: function() {
    this.setDefaultFocus();
  },
  toggle: function() {
    (this.isCollapsed()) ? this._expand() : this._collapse();
  },

  _removeLayers: $.noop,
  _addLayer: function (layer, name, overlay, instanceLayer) {},
  _checkDisabledLayers: function () {

  },

  getCurrentMap: function() {
    return {mapId: this.currentMap, subMapId: this.currentSubMap}
  },
  setCurrentMap: function(vMap, vSubMap) {
    this.currentMap = vMap;
    this.currentSubMap = vSubMap;
  },
  setCurrentMapLayer: function(vMap) {
    this.currentMapLayer = vMap;
  },
	// Needs improvements
	changeMap: function(mapId, subMapId) {
		inputs = this._form.getElementsByTagName('input'),
		inputsLen = inputs.length;

      for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			if ('mID' + mapId == input.mapId) {
				if (!input.checked) {
					input.checked = true;
					this._onInputClick(subMapId);
				}

				inputs = this._form2.getElementsByTagName('input'),
				inputsLen = inputs.length;
				for (j = 0; j < inputsLen; j++) {
					input = inputs[j];
					if ('mID' + subMapId == input.mapId) {
						input.checked = true;
						this._onInputClick2();
                  this.currentMap = mapId;
                  this.currentSubMap = subMapId;
						return;
					}
				}

            this.currentMap = mapId;
            this.currentSubMap = subMapId;
				return;
			}
		}

	},

  setDefaultFocus: function() {
     this.headerBar.focus();
  },

  isCapturingInput() {
    return !this.isShowingDefaultContent();
  }
});
$.extend(L.Control.ZLayers.prototype, DebugMixin.prototype);


L.Control.ZLayers.addInitHook(function() {
  this._area = this.options.width * this.options.length;
});

L.control.zlayers = function(baseLayers, overlays, options) {
	return new L.Control.ZLayers(baseLayers, overlays, options);
};
