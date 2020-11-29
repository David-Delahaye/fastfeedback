import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
const authContext = createContext();

import firebase from './firebase';
import { createUser } from './db';

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, user);
      setUser(user);

      Cookies.set('fast-feedback-auth', true, {
        expires: 1
      });

      return user;
    } else {
      setUser(false);
      Cookies.remove('fast-feedback-auth');
      return false;
    }
  };

  const signinWithGithub = () => {
    Router.push('/dashboard');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signinWithGoogle = () => {
    Router.push('/dashboard');
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
  };

  const signout = () => {
    Router.push('/');
    return firebase
      .auth()
      .signOut()
      .then((response) => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    token: user.ya,
    provider: user.providerData[0].providerId,
    photoUrl: user.providerData[0].photoURL
  };
};
