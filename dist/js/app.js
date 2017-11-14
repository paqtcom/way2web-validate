'use strict';

/**
 * Validate a form with ajax.
 *
 * @param {object} $element
 *
 * @return {object}
 */
function Way2Validate($element) {
    /**
     * Global variables.
     *
     * @type {Object}
     */
    var globals = {
        errors: {},
        formGroups: []
    };

    var selectors = {
        group: '.form-group',
        input: '.form-control'
    };

    var attributes = {
        validate: 'validate',
        method: 'method'
    };

    var classes = {
        error: 'has-error',
        help: 'help-block'
    };

    /**
     * [init description]
     *
     * @return {object}
     */
    function init() {
        $element.on('submit', send);
        globals.formGroups = $element.find(selectors.input).closest(selectors.group);

        return this;
    }

    /**
     * Submit the form.
     *
     * @param {object} event
     */
    function send(event) {
        var url = $(this).data(attributes.validate);
        var method = $(this).attr(attributes.method);
        var data = $(this).serialize();

        axios({
            method: method,
            url: route(url),
            data: data,
            validateStatus: function validateStatus(status) {
                return status < 500;
            }
        }).then(success).catch(error);

        event.preventDefault();
    }

    /**
     * success
     *
     * @param {object} data
     */
    function success(data) {
        if (data.status == 200) {
            globals.errors = {};

            $element.unbind('submit').submit();
        } else {
            globals.formGroups.removeClass(classes.error);
            globals.formGroups.find('.' + classes.help).remove();

            globals.errors = data.data.errors;
            $.each(data.data.errors, showErrors);
        }
    }

    /**
     * Show the errors.
     *
     * @param {string} field
     * @param {array}  errors
     */
    function showErrors(field, errors) {
        var fornGroup = $element.find($('input[name="' + field + '"]')).closest(selectors.group);

        fornGroup.addClass(classes.error);
        fornGroup.append('<span class="' + classes.help + '"><strong>' + errors.join(', ') + '</strong></span>');
    }

    /**
     * Error
     *
     * @param {object} error
     */
    function error(error) {
        console.error('error', error);
    }

    return {
        init: init
    };
}
//# sourceMappingURL=app.js.map
