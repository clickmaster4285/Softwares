const WORDS_PER_MINUTE = 220;
const IMAGE_SECONDS = 10;

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function toPlainText(value: string) {
  return decodeEntities(
    value
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

type ReadTimeInput = {
  html?: string;
  fallbackParts?: Array<string | undefined>;
};

function countWords(value: string) {
  // Count latin words + CJK characters for better multilingual accuracy.
  const latinWordCount = (value.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) || []).length;
  const cjkCount = (value.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) || []).length;
  return latinWordCount + cjkCount;
}

function countImages(html: string) {
  return (html.match(/<img\b/gi) || []).length;
}

export function calculateReadTime({ html, fallbackParts = [] }: ReadTimeInput) {
  const contentText = toPlainText(html ?? '');
  const fallbackText = toPlainText(fallbackParts.filter(Boolean).join(' '));
  const sourceText = contentText || fallbackText;
  const words = countWords(sourceText);
  const imageAdjustmentMinutes = Math.ceil((countImages(html ?? '') * IMAGE_SECONDS) / 60);
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE) + imageAdjustmentMinutes);
  return { words, minutes, text: `${minutes} min read` };
}

export function calculateReadTimeText(input: ReadTimeInput) {
  return calculateReadTime(input).text;
}
