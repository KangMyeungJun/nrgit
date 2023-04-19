// src/hooks/useMessages.ts
import { useState, useEffect } from "react";
import { onSnapshot, Unsubscribe } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { collection, query, orderBy, limitToLast } from "firebase/firestore";

interface Message {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
}

export const useMessages = (): Message[] => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt"),
      limitToLast(25)
    );

    const unsubscribe: Unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];

      setMessages(messagesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return messages;
};
