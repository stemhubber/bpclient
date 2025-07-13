// utils/changeLogger.js
export const logChange = (storeId, oldProduct, newProduct) => {
  if (!oldProduct || !newProduct) return false;

  const changedFields = {};
  Object.keys(newProduct).forEach(key => {
    if (newProduct[key] !== oldProduct[key]) {
      changedFields[key] = {
        from: oldProduct[key],
        to: newProduct[key],
      };
    }
  });

  if (Object.keys(changedFields).length > 0) {
    console.log(`[Change Log] Store: ${storeId}`, changedFields);
    return changedFields;
  }

  return false;
};
