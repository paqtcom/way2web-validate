/* eslint-env node, es6 */

'use strict';

/*
 * Setup Gulp and our Task class
 */
import gulp from 'gulp';
import gutil from 'gulp-util';
import Task from './gulp/bootstrap/task';
import { packageOptions, gulpOptions } from './gulp/bootstrap/config';

/*
 * Configure
 */

const paths = {
    root: './',
    dist: `./dist/`
};

export const folders = {
    scripts: `${paths.root}js/`,
    test: `${paths.root}test/`,
    npm: 'node_modules/'
};

export const dist = {
    root: `${paths.dist}`,
    scripts: `${paths.dist}js/`
};

/*
 * Change default options like:
 *
 * packageOptions.postcssUrls.rules.push({
 *       from: 'font/winternote',
 *       to: '../fonts/winternote/winternote'
 * });
 */
export { packageOptions, gulpOptions };

/*
 * Import all our tasks
 */
import { lintScripts } from './gulp/lint';
import { scripts } from './gulp/scripts';
import { copy } from './gulp/copy';
import { clean } from './gulp/clean';
import { bust } from './gulp/rev';
import { modernizr } from './gulp/modernizr';

/*
 * Define the tasks
 */
export const taskConfig = {
    scripts: [
        new Task(
            [
                'jquery/dist/jquery.js',
            ],
            folders.npm,
            dist.scripts + 'vendor.js',
            {
                babel: false,
                uglify: true
            }
        ),
        new Task(
            [
                'validate.js'
            ],
            folders.scripts,
            dist.scripts + 'app.js',
            {
                babel: true,
                uglify: false
            }
        )
    ],
    copy: [
        new Task(
            ['*'],
            folders.test,
            dist.root
        )
    ],
};

/*
 * Task: Watch files and perform task when changed
 */
function watch() {
    gutil.env.continue = true;
    gulp.watch(folders.scripts + '**/*.js', gulp.parallel(scripts, lintScripts));
}

/*
 * Combine tasks
 */
const lint = gulp.parallel(lintScripts);
const build = gulp.series(
    clean,
    gulp.parallel(lint, scripts, modernizr, copy),
    bust
);

/*
 * All tasks
 */
export {
    watch,
    build,
    scripts,
    lint,
    lintScripts,
    copy,
    modernizr
};

/*
 * Export a default task
 */
export default build;
