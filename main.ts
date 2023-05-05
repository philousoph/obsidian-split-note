import { Plugin, MarkdownView} from 'obsidian';

export default class ExtractNotePlugin extends Plugin {
  async onload() {
    console.log('Extract Note plugin loaded.');

    this.addCommand({
      id: 'extract-note',
      name: 'Extract Note',
      callback: () => this.extractNote(),
      hotkeys: [],
    });

    this.addCommand({
      id: 'extract-note-2',
      name: 'Extract Note with first 40 characters as filename',
      callback: () => this.extractNote2(),
      hotkeys: [],
    });
  }

  async extractNote() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView) {
      return;
    }

    let editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
    if (editor == null) {
      return;
    }
    const cursor = editor.getCursor();
    const line = cursor.line;
    const lastline = editor.lastLine();
    const ch = 0;

    const afterCursor = editor.getRange({line, ch: 0}, {line: lastline, ch: Infinity});

    const filename = await this.generateUniqueFilename(activeView.file.path, 'unknown');
    const fileContents = afterCursor;

    await this.app.vault.create(filename, fileContents);

    const start = { line, ch: 0 };
    const end = { line: lastline, ch: Infinity };
    editor.replaceRange("", start, end);
  }

  async extractNote2() {
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!activeView) {
      return;
    }

    let editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
    if (editor == null) {
      return;
    }
    const cursor = editor.getCursor();
    const line = cursor.line;
    const lastline = editor.lastLine();
    const ch = 0;

    const lineText = editor.getLine(line).substring(0, 40);
    const sanitizedFilename = lineText.replace(/[^a-zA-Z0-9-_]+/g, '_').replace(/_{2,}/g, '_').replace(/(^_|_$)/g, '');

    const afterCursor = editor.getRange({line, ch: 0}, {line: lastline, ch: Infinity});

    const filename = await this.generateUniqueFilename(activeView.file.path, sanitizedFilename);
    const fileContents = afterCursor;

    await this.app.vault.create(filename, fileContents);

    const start = { line, ch: 0 };
    const end = { line: lastline, ch: Infinity };
    editor.replaceRange("", start, end);
  }

  async generateUniqueFilename(path: string, basename: string): Promise<string> {
    const activeFile = this.app.workspace.getActiveFile();
    const parentFolderPath = this.app.vault.getAbstractFileByPath(activeFile?.parent?.path!)?.path;

    const sanitizedBasename = basename.replace(/[^a-zA-Z0-9-_]+/g, '_').replace(/_{2,}/g, '_').replace(/(^_|_$)/g, '');

    let index = 1;

    while (true) {
      const filename = `${sanitizedBasename}_${index}.md`;
      if (!(await this.app.vault.adapter.exists(parentFolderPath + '/' + filename))) {
        return parentFolderPath + '/' + filename;
      }
      index++;
    }
  }
}
