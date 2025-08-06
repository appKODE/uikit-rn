let id = 0;
export const generateId = () => {
  id += 1;
  return id.toString();
};
