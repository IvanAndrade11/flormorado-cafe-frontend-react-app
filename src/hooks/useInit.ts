import { useEffect } from "react";
import { useAppSelector } from "@/app/providers/redux";
import { useFlags } from "./useFlags";
import { setFlags, setLoader } from "@/utils/constants/redux/sets";

export const useInit = () => {
  const { loader } = useAppSelector((s) => s.main.session);

  const { loading, ...flags } = useFlags();

  useEffect(() => {
    if (!loading) {
      setFlags(flags);
      setLoader(false);
    }
  }, [loading]);

  return { loader };
};
