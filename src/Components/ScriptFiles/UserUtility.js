export const responseOfUser = (users) => {
  return users.map((user) => ({
    ...user,
    selected: false,
    edit: false,
    show: true
  }));
};
