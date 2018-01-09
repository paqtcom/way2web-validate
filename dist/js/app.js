'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Validate forms with ajax.
 */
var Way2Validate = function () {
    /**
     * Constructor.
     *
     * @param {object} $element
     */
    function Way2Validate($element) {
        _classCallCheck(this, Way2Validate);

        /** @type {string} */
        this.version = '1.0.0';

        /**
         * Global variables.
         *
         * @type {Object}
         */
        this.globals = {
            errors: {},
            formGroups: []
        };

        /**
         * Selectors.
         *
         * @type {Object}
         */
        this.selectors = {
            group: '.form-group',
            input: '.form-control'
        };

        /**
         * Attributes.
         *
         * @type {Object}
         */
        this.attributes = {
            url: 'validate-url',
            method: 'method'
        };

        /**
         * Classes.
         *
         * @type {Object}
         */
        this.classes = {
            error: 'has-error',
            help: 'help-block'
        };

        this.element = $element;
        this.element.on('submit', this.send.bind(this));
    }

    /**
     * Submit the form.
     *
     * @param {object} event
     */


    _createClass(Way2Validate, [{
        key: 'send',
        value: function send(event) {
            this.element = $(event.target);
            var url = this.element.data(this.attributes.url);
            var method = this.element.attr(this.attributes.method);
            var data = this.element.serialize();

            if (!url || !method) {
                this.error();

                return;
            }

            axios({
                method: method,
                url: url,
                data: data,
                validateStatus: function validateStatus(status) {
                    return status < 500;
                }
            }).then(this.success.bind(this)).catch(this.error.bind(this));

            event.preventDefault();
        }

        /**
         * Handles a successful validation.
         *
         * @param {object} data
         */

    }, {
        key: 'success',
        value: function success(data) {
            var formGroups = this.element.find(this.selectors.group);

            if (data.status == 200) {
                this.globals.errors = {};

                this.element.unbind('submit').submit();
            } else {
                formGroups.removeClass(this.classes.error);
                formGroups.find('.' + this.classes.help).remove();

                this.globals.errors = data.data.errors;

                $.each(data.data.errors, this.showErrors.bind(this));
            }
        }

        /**
         * Show the errors.
         *
         * @param {string} field
         * @param {array}  errors
         */

    }, {
        key: 'showErrors',
        value: function showErrors(field, errors) {
            var formGroup = this.element.find(this.selectors.input + '[name="' + field + '"]').closest(this.selectors.group);

            formGroup.addClass(this.classes.error);
            formGroup.append('<span class="' + this.classes.help + '"><strong>' + errors.join(', ') + '</strong></span>');
        }

        /**
         * Handles a validation error.
         *
         * @param {object} error
         */

    }, {
        key: 'error',
        value: function error(_error) {
            console.error('error', _error);
        }
    }]);

    return Way2Validate;
}();
//# sourceMappingURL=app.js.map
