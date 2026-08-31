import * as configCat from "configcat-react";

export const useFlags = () => {
  const { value: testFlag, loading: testFlagLoading } =
    configCat.useFeatureFlag("testFlag", false);

  const { value: storeProducts, loading: storeProductsLoading } =
    configCat.useFeatureFlag("storeProducts", "Default");

  const { value: storeCategories, loading: storeCategoriesLoading } =
    configCat.useFeatureFlag("storeCategories", "Default");

  const { value: coffeeGrowers, loading: coffeeGrowersLoading } =
    configCat.useFeatureFlag("coffeeGrowers", "Default");

  const { value: blog, loading: blogLoading } = configCat.useFeatureFlag(
    "blog",
    "Default",
  );

  const loading =
    testFlagLoading ||
    storeProductsLoading ||
    storeCategoriesLoading ||
    coffeeGrowersLoading ||
    blogLoading;

  return {
    testFlag,
    storeProducts,
    storeCategories,
    coffeeGrowers,
    blog,
    loading,
  };
};
