/**
 * @fileoverview Main entry point for the TextFlow Web Application.
 * Served via HtmlService.
 */

/**
 * Serves the web app.
 * @return {HtmlOutput} The HTML output.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('TextFlow')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Includes the content of a file.
 * Useful for separating CSS and JS into different files.
 * @param {string} filename - The name of the file to include.
 * @return {string} The content of the file.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Example backend function.
 * @return {string} A generic greeting.
 */
function getBackendData() {
  return "Connected to TextFlow Backend: " + new Date().toString();
}
