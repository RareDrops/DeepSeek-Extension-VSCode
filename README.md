# DeepSeek-Extension-VSCode

DeepSeek is a VS Code extension that integrates the DeepSeek AI model to provide an interactive chat interface within the editor.

## Features

- Chat with the DeepSeek AI model directly within VS Code.
- Stream responses from the AI model in real-time.
- Simple and intuitive webview interface.

## Requirements

1. Download Ollama: [https://ollama.com/](https://ollama.com/)
2. Download the deepseek-r1 7b model from: [https://ollama.com/library/deepseek-r1](https://ollama.com/library/deepseek-r1) using the command:
   ```sh
   ollama run deepseek-r1:7b
   ```

## Installation
1. Clone this repository:
```bash
git clone https://github.com/Raredrops/DeepSeek-Extension-VSCode
```

2. Navigate tot he project directory:
```bash
cd DeepSeek-Extension-VSCode
```

3. Install dependencies:
```bash
npm install
```

## Usage
1. Open the project in VS Code.
2. Press `F5` to open a new window with your extension loaded.
3. Run the command ```Chat with Deepseek``` from the command pallet (Ctrl+Shift+P or Cmd+Shift+P) on Mac).
4. Interact with the DeepSeek AI model through the webview interface.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
MIT © [RareDrop](https://github.com/RareDrops) 