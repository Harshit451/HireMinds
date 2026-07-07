// Lightweight PDF text extractor
export async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
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

function extractTextFromBytes(bytes: Uint8Array): string {
  const pdfString = new TextDecoder('latin1').decode(bytes);
  const textParts: string[] = [];
  
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

function decodePDFString(str: string): string {
  return str
    .replace(/\\(\d{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\')
    .replace(/\\([()])/g, '$1');
}

function generatePlaceholderText(filename: string): string {
  return `Resume: ${filename}

This PDF uses advanced encoding. Please paste your resume text directly for better analysis.

Common resume sections to include:
- Contact Information
- Professional Summary
- Work Experience
- Education
- Skills
- Certifications`;
}
