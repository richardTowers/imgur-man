var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
define(["require", "exports", '../types'], function(require, exports, __types__) {
    var types = __types__;

    var Blinky = (function (_super) {
        __extends(Blinky, _super);
        function Blinky() {
                _super.call(this);
        }
        Blinky.prototype.move = function () {
        };
        return Blinky;
    })(types.Enemy);
    exports.Blinky = Blinky;    
})

//@ sourceMappingURL=blinky.js.map
