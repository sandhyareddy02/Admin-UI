export const searchINUsers = (search, users) => {
  const tempOfSearching = search.toLowerCase();
  return users.map((user) => {
    const isMatching =
      user.name.toLowerCase().includes(tempOfSearching) ||
      user.email.toLowerCase().includes(tempOfSearching) ||
      user.role.toLowerCase().includes(tempOfSearching);
    user.show = isMatching;
    return user;
  });
};
