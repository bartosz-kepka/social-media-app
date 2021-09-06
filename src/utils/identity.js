export const normalizeUserIdentities = (userIdentities) => {
  const userIdentitiesObject = {};
  for (const userIdentity of userIdentities) {
    userIdentitiesObject[userIdentity.id] = {
      ...userIdentity
    };
  }
  return userIdentitiesObject;
};