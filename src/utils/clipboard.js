export function clipboard(copiedString)
{
    const toClipboard = navigator.clipboard.writeText(copiedString);

    return toClipboard;
}