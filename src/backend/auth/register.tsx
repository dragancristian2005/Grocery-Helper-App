import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => console.log(res))
    .catch((e) => alert(e));
};
