import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import Firebase from "../Firebase";
import FirebaseContext from "../Firebase/context";

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <FirebaseContext.Consumer>
      {(firebase) => <SignUpForm firebase={firebase!} />}
    </FirebaseContext.Consumer>
  </div>
);

interface SignUpFormPropType {
  firebase: Firebase;
}

const SignUpForm = (props: SignUpFormPropType) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [PasswordOne, setPasswordOne] = useState("");
  const [PasswordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState<null | Error>(null);
  const onSubmit = (event: FormEvent) => {
    props.firebase
      .doCreateUserWithEmailAndPassword(email, PasswordOne)
      .then(() => {
        setUsername("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");
        setError(null);
      })
      .catch((err: Error) => {
        setError(err);
      });
    event.preventDefault();
  };
  const isInvalid =
    PasswordOne !== PasswordTwo ||
    PasswordOne === "" ||
    email === "" ||
    username === "";
  return (
    <form onSubmit={onSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Full Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        value={PasswordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <input
        value={PasswordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
