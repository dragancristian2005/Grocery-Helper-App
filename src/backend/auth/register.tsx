import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth } from "../config";
import { db } from "../config";

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userRef = ref(db, "users/" + user.uid);
    await set(userRef, {});
  } catch (e) {
    alert(e);
  }
};
