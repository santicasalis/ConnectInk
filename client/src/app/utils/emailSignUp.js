import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { getUserInformation } from "../redux/features/user/userActions";

export const emailSignUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    dispatch(
      getUserInformation({
        tokenId: user.uid,
        userName: user.displayName,
        image: user.photoURL,
        email: user.email,
        phoneNumber: user.phoneNumber,
      })
    )

    return user.uid;
  } catch (createUserError) {
    const errorCode = createUserError.code;
    const errorMessage = createUserError.message;

    console.error(
      `Error al crear un nuevo usuario: ${errorCode} - ${errorMessage}`
    );
  }
};
