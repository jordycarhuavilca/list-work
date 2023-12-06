"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserName = void 0;
function setUserName() {
    let name = prompt('write you name to greet at you every time you enter');
    if (name) {
        const motivationPhrase = document.querySelector('#motivationPhrase');
        motivationPhrase.classList.toggle('appear');
    }
}
exports.setUserName = setUserName;
//# sourceMappingURL=funct.js.map