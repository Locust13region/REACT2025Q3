export default function fromBase64(base64: string, mimeType = 'image/png') {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: mimeType });

  return URL.createObjectURL(blob);
}
