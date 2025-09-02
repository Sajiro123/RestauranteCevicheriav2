"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UniquePipe = void 0;
// unique.pipe.ts
var core_1 = require("@angular/core");
var UniquePipe = /** @class */ (function () {
    function UniquePipe() {
    }
    UniquePipe.prototype.transform = function (value, property) {
        if (!value || !property)
            return value;
        return value.filter(function (item, index, array) { return array.findIndex(function (t) { return t[property] === item[property]; }) === index; });
    };
    UniquePipe = __decorate([
        core_1.Pipe({
            name: 'unique',
            pure: false
        })
    ], UniquePipe);
    return UniquePipe;
}());
exports.UniquePipe = UniquePipe;
