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

// Recovered 2026-10-06 from deployed version 4 ("v3 - Web App Configured"): the Gemini text
// rewriter called by the deployed index.html was never committed to git. Kept verbatim.
// Needs Script Property GEMINI_API_KEY; the web app runs with access MYSELF.
function adjustTextContent(text, mode, targetCount) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const apiKey = scriptProperties.getProperty('GEMINI_API_KEY');

  if (!apiKey) {
    throw new Error("API Key is missing. Please set 'GEMINI_API_KEY' in Project Settings > Script Properties.");
  }

  const modelId = 'gemini-1.5-flash'; // Using stable flash model for speed
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

  let specificInstruction = "";
  switch (mode) {
    case 'REDUCE':
      specificInstruction = `Reduce the text length efficiently while preserving the core message. Remove fluff and redundancy.`;
      break;
    case 'ADD':
      specificInstruction = `Expand the text with relevant details, clearer explanations, and more descriptive language to increase length without losing the original tone.`;
      break;
    case 'EQUAL':
      specificInstruction = `Rewrite the text to be as close to the target character count as possible. Pad or trim carefully to match the length while maintaining natural flow.`;
      break;
    case 'CONDENSE':
      specificInstruction = `Heavily summarize and condense the text to fit the constraint. Prioritize the absolute most important information only.`;
      break;
  }

  const prompt = {
    contents: [{
      parts: [{
        text: `
          Input Text:
          """
          ${text}
          """

          Task: Rewrite the above text.
          Mode: ${mode}
          Target Character Count: Approximately ${targetCount} characters.
          
          Instructions:
          1. ${specificInstruction}
          2. Maintain the original semantic meaning, intent, and tone.
          3. Ensure the final character count is very close to ${targetCount}.
          4. Do not output the character count, just the revised text.
          5. Do not add markdown formatting or quotes around the output unless present in the original.
        `
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192
    }
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(prompt),
    'muteHttpExceptions': true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const code = response.getResponseCode();
    const json = JSON.parse(response.getContentText());

    if (code !== 200) {
      throw new Error(`Gemini API Error (${code}): ${json.error ? json.error.message : 'Unknown error'}`);
    }

    if (json.candidates && json.candidates.length > 0 && json.candidates[0].content) {
      return json.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Empty response from AI model.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
