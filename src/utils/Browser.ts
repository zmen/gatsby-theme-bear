/**
 * clear document selection
 */
export function clearSelection (): void {
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection.empty) {
      selection.empty();
    } else if (selection.removeAllRanges) {
      selection.removeAllRanges();
    }
  } else if ((document as any).selection) {
    // IE
    (document as any).selection.empty();
  }
}
