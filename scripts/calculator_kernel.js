class Calculator {
    constructor(input, container) {
        this.elt = input;
        this.num1 = null;
        this.num2 = null;
        this.keysContainer = container;
        this.operator = 0;
        this.preview = false;
    }

    get_num() {
        return Big(this.elt.value);
    }

    number_key(key) {
        // key:按下的数字键，int
        // id:显示区的id
        if (this.elt.value == '0' || this.preview) {
            this.elt.value = '';
            this.preview = false;
        }
        this.elt.value += key;
        this.uncheck();
    }

    func_key(key) {
        // key:按下的功能键，int,加1，减2，乘3，除4
        if (!this.isCheck()) {
            if (this.num1 != null) {
                this.num2 = Big(this.elt.value);
                this.num1 = Big(this._calc(this.num1, this.num2, this.operator));
                this.elt.value = this.num1;
                this.preview = true;
            }
            else {
                this.num1 = Big(this.elt.value);
                this.elt.value = this.num1;
                this.preview = true;
            }
        }
        this.operator = key;

    }

    check(elt) {
        this.uncheck();
        elt.classList.add('checked');
    }

    uncheck() {
        for (const elt of this.keysContainer.children) {
            elt.classList.remove('checked');
        }
    }

    isCheck() {
        for (const elt of this.keysContainer.children) {
            if (elt.classList.contains('checked')) {
                return true;
            }
        }
        return false;
    }

    point() {
        if (this.elt.value == '') {
            this.elt.value = '0';
        }
        if (!(this.elt.value.includes('.'))) {
            this.elt.value += '.';
        }
    }

    square() {
        this.elt.value = Math.pow(Number(this.get_num().toString()), 2);
    }

    squareRoot() {
        this.elt.value = Math.sqrt(Number(this.get_num().toString()));
    }

    backspace() {
        if (this.elt.value.length > 0) {
            this.elt.value = this.elt.value.substring(0, this.elt.value.length - 1);
        }
        if (this.elt.value == '') {
            this.elt.value = '0';
        }
    }


    clear_num() {
        this.elt.value = '0';
        this.num1 = null, this.num2 = null, this.operator = 0;
        this.uncheck();
    }

    eq() {
        this.uncheck();
        if (this.operator == 0) {
            return true;
        }
        this.num2 = Big(this.elt.value);
        var num = this._calc(this.num1, this.num2, this.operator);
        this.clear_num();
        if (num != null) {
            this.elt.value = num;
            return true;
        }
        return false;
    }

    _calc(n1, n2, c) {
        switch (c) {
        case 1:
            return n1.plus(n2).toString();
        case 2:
            return n1.minus(n2).toString();
        case 3:
            return n1.times(n2).toString();
        case 4:
            return (n2 != 0) ? this.num1.div(this.num2).toString() : null;
        }
    }
}

var widgetCalculator = new Calculator($('#calc-input-widgets')[0], $('#widgets .calc>.content')[0]);
var appCalculator = new Calculator($('#calc-input')[0], $('#win-calc>.keyb')[0]);
