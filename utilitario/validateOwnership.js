/**
 * Valida si un documento pertenece al usuario autenticado
 *
 * @param model - El modelo de Mongoose
 * @param {String} documentId - El ID del documento que se quiere acceder
 * @param {String} userId - El ID del usuario autenticado
 * @param {String} ownerField - El nombre del campo que contiene el ID del autor (por defecto: "user")
 * @returns {Promise<{ exists: boolean, isOwner: boolean, doc: Object|null }>}
 */
const validateOwnership = async (
  model,
  documentId,
  userId,
  ownerField = "user"
) => {
  const doc = await model.findById(documentId);

  if (!doc) {
    return { exists: false, isOwner: false, doc: null };
  }

  const isOwner = doc[ownerField].toString() === userId;

  return {
    exists: true,
    isOwner,
    doc,
  };
};

module.exports = validateOwnership;
