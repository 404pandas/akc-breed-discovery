export const getSavedBreedIds = () => {
  const savedBreedIds = localStorage.getItem("saved_breeds")
    ? JSON.parse(localStorage.getItem("saved_breeds"))
    : [];

  return savedBreedIds;
};

export const saveBreedIds = (breedIdArr) => {
  if (breedIdArr.length) {
    localStorage.setItem("saved_breeds", JSON.stringify(breedIdArr));
  } else {
    localStorage.removeItem("saved_breeds");
  }
};

export const removeBreedId = (breedId) => {
  const savedBreedIds = localStorage.getItem("saved_breeds")
    ? JSON.parse(localStorage.getItem("saved_breeds"))
    : null;

  if (!savedBreedIds) {
    return false;
  }

  const updatedSavedBreedIds = savedBreedIds?.filter(
    (savedBreedId) => savedBreedId !== breedId
  );
  localStorage.setItem("saved_breeds", JSON.stringify(updatedSavedBreedIds));

  return true;
};
