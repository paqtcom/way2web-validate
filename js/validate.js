/**
 * Validate forms with ajax.
 */
class Way2Validate {
    /**
     * Constructor.
     *
     * @param {object} $element
     */
    constructor($element) {
        /** @type {string} */
        this.version = '1.0.0';

        /**
         * Global variables.
         *
         * @type {Object}
         */
        this.globals = {
            errors:     {},
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
        };

        /**
         * Classes.
         *
         * @type {Object}
         */
        this.classes = {
            error: 'has-error',
            help:  'help-block'
        };

        this.element = $element;
        this.element.on('submit', this.send.bind(this));
    }

    /**
     * Submit the form.
     *
     * @param {object} event
     */
    send(event) {
        this.element = $(event.target);
        let url = this.element.data(this.attributes.url);
        let data = this.element.serialize();

        if(!url) {
            this.error();

            return;
        }

        axios({
            method:         'POST',
            url:            url,
            data:           data,
            validateStatus: (status) => {
                return status < 500;
            }
        })
            .then(this.success.bind(this))
            .catch(this.error.bind(this));

        event.preventDefault();
    }

    /**
     * Handles a successful validation.
     *
     * @param {object} data
     */
    success(data) {
        let formGroups = this.element.find(this.selectors.group);

        if(data.status == 200) {
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
    showErrors(field, errors) {
        let formGroup = this.element
            .find(this.selectors.input + '[name="' + field + '"]')
            .closest(this.selectors.group);

        formGroup.addClass(this.classes.error);
        formGroup.append('<span class="' + this.classes.help + '"><strong>' + errors.join(', ') + '</strong></span>');
    }

    /**
     * Handles a validation error.
     *
     * @param {object} error
     */
    error(error) {
        console.error('error', error);
    }
}
