/**
 * Конвертирует значение процента в hex
 *
 * @param  {number} p - процент
 *
 * @returns {string}
 */
const percentToHex = (p: number) => {
  const percent = Math.max(0, Math.min(100, p));
  const intValue = Math.round((percent / 100) * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, '0').toUpperCase();
};

/**
 * Создается строковое значение цвета с прозрачностью в шестнадцатеричном представлении
 *
 * @param {string} color - значение цвета в HEX (hexadecimal)
 * @param {number} opacity - значение прозрачности от 0 до 100 (decimal)
 *
 * @returns {string}
 */
export const getHexWithOpacity = (color: string, opacity: number) => {
  if (!/#[a-f\d]{3}(?:[a-f\d]{3})?\b/i.test(color)) {
    return color;
  }

  const checkedOpacity = opacity > 100 ? 100 : opacity;

  return color + percentToHex(checkedOpacity);
};
