// Lightweight PDF text extractor (pure JavaScript)
/**
 * Extract plain text from a PDF file.
 * Returns the extracted text as a string. If the PDF contains very little
 * recognizable text, a placeholder message is returned instead.
 *
 * @param {File} file - The PDF file object selected by the user.
 * @returns {Promise<string>} Promise that resolves with the extracted text.
 */
export async function extractTextFromPDF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result;
        const bytes = new Uint8Array(arrayBuffer);
        const text = extractTextFromBytes(bytes);
        if (text.trim().length < 50) {
          resolve(generatePlaceholderText(file.name));
        } else {
          resolve(text);
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

/** Extract printable text from a Uint8Array representing PDF bytes */
function extractTextFromBytes(bytes) {
  const pdfString = new TextDecoder('latin1').decode(bytes);
  const textParts = [];
  // Extract text from PDF text objects
  const textMatches = pdfString.matchAll(/\(([^)]+)\)/g);
  for (const match of textMatches) {
    const decoded = decodePDFString(match[1]);
    if (decoded.length > 2 && /[a-zA-Z]/.test(decoded)) {
      textParts.push(decoded);
    }
  }
  // Extract from BT...ET blocks
  const btMatches = pdfString.matchAll(/BT[\s\S]*?ET/g);
  for (const match of btMatches) {
    const blockText = match[0].matchAll(/\(([^)]+)\)/g);
    for (const t of blockText) {
      const decoded = decodePDFString(t[1]);
      if (decoded.length > 1) {
        textParts.push(decoded);
      }
    }
  }
  // Clean and join
  let text = textParts.join(' ');
  text = text.replace(/\\n/g, '\n');
  text = text.replace(/\\r/g, '');
  text = text.replace(/\s+/g, ' ');
  return text.trim();
}

/** Decode PDF string escape sequences */
function decodePDFString(str) {
  return str
    .replace(/\\(\d{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\')
    .replace(/\\([()])/g, '$1');
}

/** Generate placeholder text when PDF content is too minimal */
function generatePlaceholderText(filename) {
  return `Resume: ${filename}\n\nThis PDF uses advanced encoding. Please paste your resume text directly for better analysis.\n\nCommon resume sections to include:\n- Contact Information\n- Professional Summary\n- Work Experience\n- Education\n- Skills\n- Certifications`;
}
