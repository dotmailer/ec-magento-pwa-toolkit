/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

// Import the Targetables manager
const { Targetables } = require('@magento/pwa-buildpack');

function localIntercept(targets) {
    const targetables = Targetables.using(targets);

    /** Email capture extension */
    const {
        wrapEmailCaptureModuleTargetable
    } = require('@dotdigital/pwa-studio-email-capture/targets');
    wrapEmailCaptureModuleTargetable(targetables);

    /** Chat extension */
    const {
        wrapChatModuleTargetable
    } = require('@dotdigital/pwa-studio-chat/targets');
    wrapChatModuleTargetable(targetables);

    /** Tracking extension */
    const {
        wrapTrackingModuleTargetable
    } = require('@dotdigital/pwa-studio-tracking/targets');
    wrapTrackingModuleTargetable(targetables);
}

module.exports = localIntercept;
