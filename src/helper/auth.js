export const isAuth = () => {
  return localStorage.getItem("TOKEN") ? true : false;
};
