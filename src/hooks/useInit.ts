import { useAppSelector } from "@/app/providers/redux";
import { useFlags } from "./useFlags";
import { setFlags, setLoader } from "@/utils/constants/redux/sets";

export const useInit = () => {
  const { loader } = useAppSelector((s) => s.main.session);

  const flags = useFlags();

  setTimeout(() => {
    if (flags.testFlag) {
      setLoader(false);
      setFlags(flags);
    }
  }, 1000);

  return { loader };
};
