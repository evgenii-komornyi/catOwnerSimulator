export const findCatById = (cats, id) => {
    return cats.find((cat) => cat.id === id);
};
