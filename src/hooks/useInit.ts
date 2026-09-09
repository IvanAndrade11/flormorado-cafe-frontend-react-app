import { useEffect } from "react";
import { useAppSelector } from "@/app/providers/redux";
import { useFlags } from "./useFlags";
import { setFlags, setLoader } from "@/utils/constants/redux/sets";

export const useInit = () => {
  const { loader } = useAppSelector((s) => s.main.session);

  const {
    loading,
    testFlag,
    storeProducts,
    storeCategories,
    coffeeGrowers,
    blog,
  } = useFlags();

  useEffect(() => {
    if (!loading) {
      setFlags({
        testFlag,
        storeProducts,
        storeCategories,
        coffeeGrowers,
        blog,
      });
      setLoader(false);
    }
  }, [loading, testFlag, storeProducts, storeCategories, coffeeGrowers, blog]);

  return { loader };
};
