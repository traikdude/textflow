/**
 * @fileoverview Backend logic for TextFlow Adjuster.
 * Handles the web app serving and Gemini API communication.
 */

/**
 * Serves the web app.
 * @return {HtmlOutput} The HTML output.
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('TextFlow Adjuster')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Calls the Google Gemini API to adjust text content.
 * @param {string} text - The input text to process.
 * @param {string} mode - The adjustment mode (REDUCE, ADD, EQUAL, CONDENSE).
 * @param {number} targetCount - The target character count.
 * @return {string} The processed text.
 */
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

/**
 * Helper to include files (if needed for future splitting)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
