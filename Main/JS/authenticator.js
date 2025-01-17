/**
 * Class that authenticates login of user
 */

import { GoogleAuthProvider, auth, browserSessionPersistence, signInWithPopup } from "./connect.js";


export class Authenticator {

    #key = "firebase:authUser:AIzaSyB9qifivcFXhoiUeoJUd4T-7jYVSDNgxKo:[DEFAULT]";
    async signIn(model){

        await signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            if (user != null) {
                try {
                    auth.setPersistence(browserSessionPersistence);

                } catch (e) {
                    console.log(e);
                }
                model.createAccount(user);
                // this.setUser();
                // window.location.assign("homepage.html");
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log(errorCode, errorMessage, email, credential);
            // ...
            console.log(errorCode);
        });

    }

    // signOut(){
    //     auth.signOut().then(() => {
    //         // Sign-out successful.
    //         window.location.assign("../homepage.html");
    //     }).catch((error) => {
    //         // An error happened.
    //         console.log(error);
    //     });
    // }

    isSignedIn(){
        const user = sessionStorage.getItem(this.#key);
        if (!user) {
            return false;
        }else{
            return true;
        }
    }

    getSignedInUserId(){
        const user = sessionStorage.getItem(this.#key);
        if (user) {
            return JSON.parse(user).uid;
        }
    }

    redirect(){
        window.location.assign("/login.html");
    }


}