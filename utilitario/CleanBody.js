/**
 * Elimina del objeto todas las propiedades que sean:
 * - string vacío ""
 * - null
 * - undefined
 *
 * @param {Object} obj - Objeto a limpiar
 * @returns {Object} Objeto limpio con solo propiedades válidas
 */
function CleanBody(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

module.exports = CleanBody;
