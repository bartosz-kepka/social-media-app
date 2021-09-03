export const normalizeUserIdentities = (userIdentities) => {
  const userIdentitiesObject = {};
  for (const { id, ...userIdentity } of userIdentities) {
    userIdentitiesObject[id] = userIdentity;
  }
  return userIdentitiesObject;
};