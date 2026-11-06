import { DOCUMENT } from '@angular/common';
import { type Signal, afterNextRender, effect, inject, Injector } from '@angular/core';

/**
 * Returns the keyboard focus to the row's edit button after the user saved or cancelled an edit
 * (the edit button is replaced by Save/Cancel while editing, so the focus would otherwise be lost).
 * The edit button of a row must have the id `buttonIdPrefix + rowId`.
 */
export function injectTableEditFocus(editEnded: Signal<{ readonly rowId: string } | null>, buttonIdPrefix: string): void {
  const document = inject(DOCUMENT);
  const injector = inject(Injector);

  effect(() => {
    const ended = editEnded();

    if (ended === null) {
      return;
    }

    afterNextRender(
      () => {
        document.getElementById(buttonIdPrefix + ended.rowId)?.focus();
      },
      { injector },
    );
  });
}
