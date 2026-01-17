import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import mammoth from 'mammoth';

// ✅ Use unpkg which supports newer versions better
pdfjsLib.GlobalWorkerOptions.workerSrc = 
  `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts text content from TXT, PDF, or DOCX files
 * @param file - The file to extract text from
 * @returns Promise resolving to the extracted text
 * @throws Error if file type is unsupported or extraction fails
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;

  try {
    // TXT
    if (fileType === 'text/plain') {
      return await file.text();
    }

    // PDF
    if (fileType === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => {
            // Type guard for text items
            if ('str' in item) {
              return (item as TextItem).str;
            }
            return '';
          })
          .join(' ');
        text += pageText + '\n';
      }
      return text.trim();
    }

    // DOCX
    if (
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }

    throw new Error(`Unsupported file type: ${fileType}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to extract text from file: ${error.message}`);
    }
    throw new Error('Failed to extract text from file: Unknown error');
  }
}