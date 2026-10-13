export const parseCustomInput = (input, excelData) => {
  if (!input || !input.trim() || !excelData || excelData.length === 0)
    return [];

  const maxData = excelData.length;
  const indices = new Set();
  const parts = input.split(",");

  parts.forEach((part) => {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [startStr, endStr] = trimmed.split("-");
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);

      if (!isNaN(start) && !isNaN(end)) {
        const min = Math.min(start, end);
        const max = Math.max(start, end);
        for (let i = min; i <= max; i++) {
          if (i >= 1 && i <= maxData) {
            indices.add(i - 1);
          }
        }
      }
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= maxData) {
        indices.add(num - 1);
      }
    }
  });

  return Array.from(indices)
    .sort((a, b) => a - b)
    .map((idx) => excelData[idx]);
};
