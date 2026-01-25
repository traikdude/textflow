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

/**
 * ------------------------------------------------------------------
 * PYTHON / COLAB INTEGRATION TOOLS
 * ------------------------------------------------------------------
 */

/**
 * Opens the associated Google Colab notebook for data analysis.
 * NOTE: Since this is a standalone Web App, this menu will verify
 * availability if run from a bound container or via the Editor.
 */
function openColabNotebook() {
  const url = 'https://colab.research.google.com/github/traikdude/textflow/blob/main/python/notebooks/main_analysis.ipynb';
  const htmlOutput = HtmlService
    .createHtmlOutput('<script>window.open("' + url + '", "_blank"); google.script.host.close();</script>')
    .setWidth(250)
    .setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Opening Colab...');
}

/**
 * Opens the GitHub repository.
 */
function openGitHubRepo() {
  const url = 'https://github.com/traikdude/textflow';
  const htmlOutput = HtmlService
    .createHtmlOutput('<script>window.open("' + url + '", "_blank"); google.script.host.close();</script>')
    .setWidth(250)
    .setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Opening GitHub...');
}