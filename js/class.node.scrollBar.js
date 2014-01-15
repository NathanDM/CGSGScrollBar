/**
 * A CGSGNodeSliderHandle represent a slider handle
 *
 * @class CGSGNodeSliderHandle
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} handleWidth width of the handle
 * @type {CGSGNodeSliderHandle}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeScrollBarHandle = CGSGNode.extend({

    initialize: function (handleWidth) {
        this._super(0, 0);
        this.resizeTo(handleWidth, handleWidth);
        this.color = "#CCCCCC";
        this.isDraggable = true;
        this.onDrag = this.onSlide;
    },

    /**
     * Restrain movement to x axis
     *
     * @method onSlide
     * @protected
     */
    onSlide: function () {
        this.handleWidth = Math.min(this._parentNode.getHeight(), this._parentNode.getWidth()) * 2;
        var halfWidth = this.handleWidth / 2,
            width = this._parentNode.getWidth(),
            height = this._parentNode.getHeight();

        if (width > height) {
            var x = this.position.x;
            if (x < -halfWidth) {
                x = -halfWidth;
            } else if (x > width - halfWidth) {
                x = width - halfWidth;
            }
            this.translateTo(x, 0);
            var range = this._parentNode.max - this._parentNode.min;
            this._parentNode.value = (this.position.x + halfWidth) * (range / width) + this._parentNode.min;
        } else {
            var y = this.position.y;
//            if (y < -halfWidth) {
//                y = -halfWidth;
//            } else if (y > height - halfWidth) {
//                y = height - halfWidth;
//            }
            this.translateTo(-this.handleWidth / 4, y);
            var range = this._parentNode.max - this._parentNode.min;
            this._parentNode.value = (this.position.y + halfWidth) * (range / height) + this._parentNode.min;
        }
    },

    /**
     * Default handle rendering (A rounded square with some "volume" effect)
     *
     * @method render
     * @protected
     * @param {CanvasRenderingContext2D} context the context into render the node
     */
    render: function (context) {

        this.handleWidth = Math.min(this._parentNode.getHeight(), this._parentNode.getWidth());

        context.strokeStyle = this.color;
        context.rect(0,0, this.handleWidth, this.handleWidth);
        context.stroke();

    }
});

/**
 * A CGSGNodeSlider represent a slider
 *
 * @class CGSGNodeSlider
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @type {CGSGNodeSlider}
 * @author Jeremie (jeremie.lussiez@capgemini.com)
 */
var CGSGNodeScrollBar = CGSGNode.extend({

    initialize: function (x, y, width, height) {
        this._super(x, y);
        this.resizeTo(width, height);
        this.backgroundColor = "#EEEEEE";
        this.valueColor = "#50479E";
        this.min = -10;
        this.max = 10;
        this.value = 5;
        this.isRoundingFixed = true;
        this.rounding = 20;
        this.mustRenderValue = true;
       // this.rotationCenter = new CGSGPosition(0.5, 0.5);


    //    this.onResize = this.updateSliderHandle;

      this.setHandle();
    },

//    /**
//     * Render slider value (Fills background with color).
//     *
//     * @method updateSliderHandle
//     * @protected
//     */
//    updateSliderHandle: function () {
//
//        var handleWidth = Math.min(this.getWidth(), this.getHeight()) * 2;
//        var handleOffset = Math.max(this.getHandle().getWidth(), this.getHandle().getHeight()) + 2;
//
//        this.handle.resizeTo(handleWidth, handleWidth);
//        var valuePosition = (this.getWidth() - handleOffset) / Math.abs(this.max - this.min) * Math.abs(this.value - this.min);
//
//        if (this.getWidth() > this.getHeight()) {
//            this.handle.translateTo(valuePosition - this.xOffset * handleWidth, -this.yOffset * handleWidth, true);
//        } else {
//            this.handle.translateTo(-this.yOffset * handleWidth, valuePosition - this.xOffset * handleWidth, true);
//        }
//    },

    /**
     * Set default or custom handle for this slider
     *
     * @method setHandle
     * @public
     * @param {CGSGNode} [handle] slider's handle
     */
    setHandle: function (handle, xOffset, yOffset) {
        this.removeAll();
        this.handle = handle;
        var handleWidth = Math.min(this.getWidth(), this.getHeight());
        if (handle == undefined) {
            this.handle = new CGSGNodeScrollBarHandle(handleWidth);
            this.handle.color = "black";//this.backgroundColor;
        }
        this.addChild(this.handle);

//        var valuePosition = this.getWidth() / Math.abs(this.max - this.min) * Math.abs(this.value - this.min);
//        // - handleWidth / 4
//        if (xOffset == null) {
//            xOffset = 0.5;
//        }
//        if (yOffset == null) {
//            yOffset = 0.25;
//        }
//
//        this.xOffset = xOffset;
//        this.yOffset = yOffset;
//        this.handle.translateTo(valuePosition - xOffset, -yOffset);
    },

    /**
     * Set lower bound of this slider and recompute handle position
     *
     * @method addHandle
     * @public
     * @param {Number} min lower bound of this slider
     */
    setMin: function (min) {
        if (min != null && min != this.min && min < this.max) {
            this.min = min;
            this.updateSliderHandle();
        }
    },

    /**
     * Set upper bound of this slider and recompute handle position
     *
     * @method setMax
     * @public
     * @param {Number} max upper bound of this slider
     */
    setMax: function (max) {
        if (max != null && max != this.max && max > this.min) {
            this.max = max;
            this.updateSliderHandle();
        }
    },

    /**
     * Set value of this slider and recompute handle position
     *
     * @method setValue
     * @public
     * @param {Number} value of this slider
     */
    setValue: function (value) {
        if (value >= this.min && value <= this.max) {
            this.value = value;
            this.updateSliderHandle();
        }
    },

    render: function (ctx) {
        ctx.fillStyle = this.backgroundColor;
        ctx.rect(0, 0, this.getWidth(), this.getHeight());
        ctx.fill();
    }

});
