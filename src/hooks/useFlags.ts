import * as configCat from "configcat-react";

export const useFlags = () => {
  const { value: testFlag } = configCat.useFeatureFlag("testFlag", false);
  const { value: storeProducts } = configCat.useFeatureFlag(
    "storeProducts",
    "Default",
  );
  const { value: storeCategories } = configCat.useFeatureFlag(
    "storeCategories",
    "Default",
  );

  return { testFlag, storeProducts, storeCategories };
};
