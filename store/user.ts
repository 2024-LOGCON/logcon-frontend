import { RecoilEnv, atom } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const userInfoState = atom<{
  loaded: boolean;
  id?: string | null;
}>({
  key: "userInfo",
  default: {
    loaded: false,
    id: null,
  },
});
