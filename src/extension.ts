import * as vscode from 'vscode';
import ollama from 'ollama';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "deepseek-ext" is now active!');

	const disposable = vscode.commands.registerCommand('deepseek-ext.start', () => {
		const panel = vscode.window.createWebviewPanel(
			'deepChat',
			'Deep Seek Chat',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = getWebviewContent();

		panel.webview.onDidReceiveMessage(async (message: any) => {
			if (message.command === 'ask') {
				const userPrompt = message.text;
				let responseText = '';

				try {
					const streamResponse = await ollama.chat({
						model: 'deepseek-r1:7b',
						messages: [{ role: 'user', content: userPrompt }],
						stream: true
					});

					for await (const part of streamResponse) {
						responseText += part.message.content;
						panel.webview.postMessage({ command: 'chatResponse', text: responseText });
					}
				} catch (error) {	
					panel.webview.postMessage({ command: 'chatResponse', text: `Error: ${String(error)}` });
				}
			}
		}); 

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


function getWebviewContent(): string {
	return /*html*/`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body { font-family: sans-serif; margin: 1rem; }
				#prompt { width: 100%; box-sizing: border-box; }
				#response {border: 1px solid #ccc; margin-top: 1rem; padding: 0.5rem; min-height: 10%; }
			</style>
			<title>DeepSeek</title>
		</head>
		<body>
			<h2>DeepSeek VS Code Extension</h2>
			<textarea id="prompt" rows="3" placeholder="Ask DeepSeek anything..."></textarea><br />
			<button id="askBtn">Enter</button>
			<div id="response"></div>

			<script>
				const vscode = acquireVsCodeApi();

				document.getElementById('askBtn').addEventListener('click', () => {
					const prompt = document.getElementById('prompt').value;
					vscode.postMessage({
						command: 'ask',
						text: prompt
					});
				});

				window.addEventListener('message', event => {
					const { command, text } = event.data;
					if (command === 'chatResponse') {
						document.getElementById('response').innerText = text;
					}
				});
			</script>
			
		</body>
		</html>
	`;
}
