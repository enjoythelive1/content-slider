(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, undefined) {
    function ComponetSlider(element, options) {
        this.element = element;
        this.options = options;
        this.current = 0;
        this.element.on('click touchstart', '.controls .next, .controls .previous, [data-slider-goto], [data-slider-previous], [data-slider-next]', this.onControlClick.bind(this));
    }

    ComponetSlider.prototype = {
        isHorizontal: function isHorizontal() {
            if (typeof this.options.horizontal === 'boolean') {
                return this.options.horizontal;
            } else {
                return this.element.is('.horizontal');
            }
        },

        onControlClick: function onControlClick(event) {
            var $target = $(event.target);

            if ($target.is('.next, [data-slider-next]')) {
                this.goNext();
            } else if ($target.is('.previous, [data-slider-previous]')) {
                this.goPrevious();
            } else if ('[data-slider-goto]') {
                this.goTo($target.data('slider-goto'));
            }
        },

        goNext: function goNext() {
            if (this.current < this.getSlideCount()) {
                this.goTo(this.current + 1);
            }
        },

        goPrevious: function goPrevious() {
            if (this.current > 0) {
                this.goTo(this.current - 1);
            }
        },

        goTo: function goTo(position) {
            if (isNaN(parseInt(position, 10))) {
                position = this.getSlidePosition(position);
            }

            var $slide = this.element.children('.slide').eq(position);
            if ($slide.length) {
                var slideOffset = $slide.offset();

                this.element.animate({
                    scrollLeft: slideOffset.left,
                    scrollTop: slideOffset.top,
                }, this.options.scrollTime, this.options.scrollAnimation);

                this.current = position;
            }
        },

        getSlidePosition: function getSlidePosition(position) {
            return this.element.children('.slide').index(position);
        },

        getSlideCount: function getSlideCount() {
            return this.element.children('.slide').length;
        },

        animateSroll: function animateSroll(property, amount) {
            var options = {};
            options[property] = amount;
            this.element.animate(options, this.options.scrollTime, this.options.scrollAnimation);
        }
    };

    ComponetSlider.defaultOptions = {
        scrollTime: 500,
        scrollAnimation: undefined
    };

    $.fn.componentSlider = function (options) {
        this.each(function (index, element) {
            var instance = this.data('component-slider-instance');
            if (instance instanceof ComponetSlider) {
                if (options == 'instance') {
                    return instance;
                } else if (typeof instance[options] === 'function') {
                    return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
                }
            } else {
                this.data('component-slider-instance', new ComponetSlider($(element), $.extend({}, options, ComponetSlider.defaultOptions)));
            }
        });
    };
}));
