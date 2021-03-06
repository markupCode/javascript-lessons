const LEFT_UP = -1;
const RIGHT_DOWN = 1;
const ENABLE = 'enable';
const DISABLE = 'disable';

function AnimationElement(element) {
    let self = this;

    let component = document.createElement('div');
    component.style.position = 'absolute';
    component.appendChild(element);

    let animationDirection = RIGHT_DOWN;
    let state = DISABLE;

    let animationValue = 10;

    function walk() {
        let top = self.getTop();
        let bottom = self.getTop() + component.clientHeight;
        let left = self.getLeft();
        let right = self.getLeft() + component.clientWidth;

        if (top <= 0 || left <= 0) animationDirection = RIGHT_DOWN;
        else if (bottom > innerHeight || right > document.body.clientWidth)
            animationDirection = LEFT_UP;

        self.updateTop(animationDirection * animationValue);
        self.updateLeft(animationDirection * animationValue);

        if (state === ENABLE) requestAnimationFrame(walk);
    }

    this.getTop = function() {
        if (component.style.top === '')
            return 0;
        return parseInt(component.style.top);
    }

    this.setTop = function(value) {
        component.style.top = `${value}px`;
    }

    this.updateTop = function(value) {
        self.setTop(value + self.getTop());
    }

    this.getLeft = function() {
        if (component.style.left === '')
            return 0;
        return parseInt(component.style.left);
    }

    this.setLeft = function(value) {
        component.style.left = `${value}px`;
    }

    this.updateLeft = function(value) {
        self.setLeft(value + self.getLeft());
    }

    this.getRight = function() {
        if (component.style.right === '')
            return 0;
        return parseInt(component.style.right);
    }

    this.setRight = function(value) {
        component.style.right = `${value}px`;
    }

    this.updateRight = function(value) {
        self.setRigth(value + self.getRight());
    }

    this.getBottom = function() {
        if (component.style.bottom === '')
            return 0;
        return parseInt(component.style.bottom);
    }

    this.setBottom = function(value) {
        component.style.bottom = `${value}px`;
    }

    this.updateBottom = function(value) {
        self.setBottom(value + self.getBottom());
    }

    this.run = function () {
        state = ENABLE;
        requestAnimationFrame(walk);
    }

    this.stop = function () {
        state = DISABLE;
    }

    this.component = function () {
        return component;
    }
}

function getHeader(content) {
    let header = document.createElement('h1');
    
    header.innerHTML = content;
    
    return header;
}

let animationHeader = new AnimationElement(getHeader("Walk!"));
document.body.appendChild(animationHeader.component());
