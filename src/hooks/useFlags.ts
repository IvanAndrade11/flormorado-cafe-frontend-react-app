import * as configCat from "configcat-react";

export const useFlags = () => {
  const { value: testFlag } = configCat.useFeatureFlag("testFlag", false);

  return { testFlag };
};
