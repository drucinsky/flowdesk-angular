import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';

@Service()
export class FileDownloadService {
  private readonly _document = inject(DOCUMENT);

  download(content: string, fileName: string, mimeType: string): void {
    const view = this._document.defaultView;

    if (!view) {
      return;
    }

    const url = view.URL.createObjectURL(new Blob([content], { type: mimeType }));
    const anchor = this._document.createElement('a');

    anchor.href = url;
    anchor.download = fileName;
    anchor.hidden = true;

    this._document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    view.setTimeout(() => {
      view.URL.revokeObjectURL(url);
    });
  }
}
