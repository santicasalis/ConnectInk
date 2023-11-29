import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return user.uid;
  } catch (createUserError) {
    const errorCode = createUserError.code;
    const errorMessage = createUserError.message;

    console.error(
      `Error al crear un nuevo usuario: ${errorCode} - ${errorMessage}`
    );
  }
};
