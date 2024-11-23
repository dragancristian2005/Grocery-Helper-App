import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => signInWithEmailAndPassword(auth, email, password).catch((e) => alert(e));
