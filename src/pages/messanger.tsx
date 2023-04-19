import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import "firebase/firestore";
import "firebase/auth";
import { auth, firestore } from "../firebase/clientApp";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { NextPage } from "next";
import { Button, Image, Modal, ModalProps } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  limitToLast,
  serverTimestamp,
} from "firebase/firestore";
import { useMessages } from "../hooks/useMessages";
import SignUp from "../components/Modal/Auth/SignUp";
import { ModalView } from "../atoms/authModalAtom";

import { useCollection } from "react-firebase-hooks/firestore";

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    uid: string;
    photoURL: string;
  };
}

type messangerProps = {};

const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    {children}
  </Modal>
);

const messanger: NextPage<messangerProps> = () => {
  const [user] = useAuthState(auth);
  const [alertShown, setAlertShown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user && !alertShown) {
      window.alert("Sign In Please!");
      setAlertShown(true);
      router.push("/");
    }
  }, [user, alertShown, router]);

  return (
    <div className="App">
      <header>
        {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
      </header>
      <section>{user ? <ChatRoom /> : <></>}</section>
    </div>
  );
};

function ChatRoom() {
  const messages = useMessages();
  const [formValue, setFormValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    const { uid, photoURL } = auth.currentUser;

    const messagesRef = collection(firestore, "messages");

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={scrollRef}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    uid: string;
    photoURL: string;
  };
}

function ChatMessage(props: ChatMessageProps) {
  const { text, uid, photoURL } = props.message;
  const currentUser = auth.currentUser;
  const messageClass =
    currentUser && uid === currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || "https://i.pravatar.cc/30"} alt="User avatar" />
      <p>{text}</p>
    </div>
  );
}

export default messanger;
