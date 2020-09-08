import * as utilities from './utilities';

/*
 * Default specfific package options
 */
let packageOptions = {
    uglify:    true,
    modernizr: {
        'tests': ['formattribute'],
        'crawl': false
    }
};

/*
 * Default gulp options
 */
let gulpOptions = {
    src: {
        allowEmpty: utilities.doContinue()
    }
};

export { packageOptions, gulpOptions };
