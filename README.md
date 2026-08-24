<!-- ✨ TEXTFLOW — REPOSITORY PRESENTATION (L3 SHOWCASE) -->

<div align="center">

<img src="docs/assets/banner.png" alt="TextFlow banner" width="100%">

# **✨ TextFlow**

**A lightweight, joyful cloud text processing web application and Python Colab integration pipeline built with Google Apps Script HtmlService and V8.**

[![Status](https://img.shields.io/badge/status-active%20%26%20verified-success?style=flat-square)](#-core-features)
[![Engine](https://img.shields.io/badge/engine-Google%20Apps%20Script%20V8-34A853?style=flat-square&logo=google)](appsscript.json)
[![Deployment](https://img.shields.io/badge/deployment-Clasp%20%2B%20HtmlService-orange?style=flat-square)](.clasp.json)
[![Analytics](https://img.shields.io/badge/analytics-Python%20%7C%20Google%20Colab-3776AB?style=flat-square&logo=python)](python/)
[![License: MIT](https://img.shields.io/badge/license-MIT-informational?style=flat-square)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/traikdude/textflow?style=flat-square&color=2ea44f)](https://github.com/traikdude/textflow)

<p align="center">
  <a href="#-overview"><b>Overview</b></a> •
  <a href="#-core-features"><b>Features</b></a> •
  <a href="#-architecture--rpc-pipeline"><b>Architecture</b></a> •
  <a href="#-python-colab-bridge"><b>Colab Bridge</b></a> •
  <a href="#-quick-start--clasp"><b>Quick Start</b></a> •
  <a href="#-contributing"><b>Contributing</b></a> •
  <a href="#-license"><b>License</b></a>
</p>

</div>

---

## 📑 Table of Contents

- [✨ Overview](#-overview)
- [🚀 Core Features](#-core-features)
  - [1. Joyful UI & Instant WebApp Deployment](#1-joyful-ui--instant-webapp-deployment)
  - [2. Google Apps Script HtmlService Engine](#2-google-apps-script-htmlservice-engine)
  - [3. Python & Google Colab Analytics Bridge](#3-python--google-colab-analytics-bridge)
  - [4. Real-Time Telemetry & Monitoring](#4-real-time-telemetry--monitoring)
- [🏗️ Architecture & RPC Pipeline](#-architecture--rpc-pipeline)
- [🐍 Python & Google Colab Bridge](#-python--google-colab-bridge)
- [⚡ Quick Start & Clasp Deployment](#-quick-start--clasp-deployment)
- [🗂️ Repository Structure](#-repository-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Overview

**TextFlow** is a lightweight Google Apps Script cloud text processing web application designed to demonstrate clean client-to-server RPC architecture and Python data analytics bridging.

Featuring a cheerful Joyful UI design system (warm pastel pink and electric sky blue gradients), modular Apps Script backend handlers (`Code.js`, `monitoring.gs`), and integrated Google Colab notebooks, TextFlow serves as a reliable micro-app template for Workspace developers.

---

## 🚀 Core Features

```mermaid
mindmap
  root((✨ TextFlow))
    🎨 Joyful UI
      Poppins Typography
      Responsive Mobile-Friendly Card
      Interactive RPC Handlers
    ☁️ Apps Script Core
      HtmlService Template Engine
      doGet / doPost Endpoints
      Asynchronous google.script.run
    🐍 Python Analytics
      Google Colab Integration
      Jupyter Analysis Notebooks
      Data Extraction Pipelines
    📡 Telemetry
      Execution Logging
      Heartbeat Health Checks
```

### 1. Joyful UI & Instant WebApp Deployment
Clean, accessible user interface built with modern CSS custom properties, Poppins typography, and instant feedback animations.

### 2. Google Apps Script HtmlService Engine
Renders dynamic HTML templates using `HtmlService.createTemplateFromFile()` with modular file inclusion helpers.

### 3. Python & Google Colab Analytics Bridge
Built-in helper dialogs to launch connected Google Colab research notebooks directly from the Apps Script runtime.

### 4. Real-Time Telemetry & Monitoring
Logs connection timestamps, server execution health, and trigger status via [`monitoring.gs`](monitoring.gs).

---

## 🏗️ Architecture & RPC Pipeline

```mermaid
flowchart TD
    subgraph FRONTEND["🖥️ Web App Client (index.html)"]
        UI["Joyful UI Card & Action Buttons"]
        RPC["google.script.run Callbacks"]
        UI --> RPC
    end

    subgraph BACKEND["☁️ Google Apps Script (Code.js)"]
        DOGET["doGet(e) -> HtmlService"]
        GETDATA["getBackendData()"]
        COLAB["openColabNotebook()"]
    end

    subgraph CLOUD["🐍 Cloud & Analytics"]
        JUPYTER["Google Colab Notebook"]
        GITHUB["GitHub Traikdude Repository"]
    end

    RPC <-->|"Async RPC"| GETDATA
    DOGET --> FRONTEND
    COLAB --> JUPYTER & GITHUB
```

---

## 🐍 Python & Google Colab Bridge

Open the linked analysis notebook directly from the Apps Script editor or webapp:

* **Notebook Path**: `python/notebooks/main_analysis.ipynb`
* **Colab Launcher**: Triggered via `openColabNotebook()` inside `Code.js`.

---

## ⚡ Quick Start & Clasp Deployment

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [@google/clasp](https://www.npmjs.com/package/@google/clasp)

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/traikdude/textflow.git
   cd textflow
   ```
2. Login to Google Apps Script:
   ```bash
   clasp login
   ```
3. Push changes to your Apps Script container:
   ```bash
   clasp push
   ```
4. Open the deployed web app:
   ```bash
   clasp open --webapp
   ```

---

## 🗂️ Repository Structure

```text
textflow/
├── docs/                        # Presentation & visual assets
│   └── assets/
│       └── banner.png           # L3 Showcase high-resolution hero banner
├── python/                      # Python analysis scripts & Colab notebooks
│   └── notebooks/
│       └── main_analysis.ipynb  # Primary text pipeline analysis
├── Code.js                      # Core Apps Script server endpoints
├── index.html                   # Joyful UI HTML template
├── monitoring.gs                # Telemetry & execution health logger
├── appsscript.json              # Apps Script project manifest
├── .clasp.json                  # Google Apps Script project binding
├── README.md                    # L3 Showcase presentation documentation
└── LICENSE                      # MIT Open Source License
```

---

## 🤝 Contributing

1. Fork the repository and create your branch (`git checkout -b feature/new-textflow-endpoint`).
2. Add new server endpoints in `Code.js` or UI components in `index.html`.
3. Push to your Apps Script sandbox via `clasp push`.
4. Submit a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

<div align="center">

*Engineered for Joyful Cloud Computing, Workspace Automators & AI Agents.*  
**TextFlow · Google Apps Script · Python · Google Colab**

</div>
