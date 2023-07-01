/**
 *
 * @param {string} variable
 * @returns {boolean}
 */
export const validarVacios = (variable) => {
  try {
    return variable.trim().length === 0;
  } catch {
    return true;
  }
};
