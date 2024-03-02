import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface AuthSocketProviderProps {
  children: ReactNode;
}

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[]; // or whatever type onlineUsers is
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider: React.FC<AuthSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();
  console.log(authUser);

  // useEffect(() => {
  //   if (authUser) {
  //     const socket = io("http://localhost:8080", {
  //       query: {
  //         userId: authUser,
  //       },
  //     });

  //     setSocket(socket);

  //     // socket.on() is used to listen to the events. can be used both on client and server side
  //     socket.on("getOnlineUsers", (users) => {
  //       setOnlineUsers(users);
  //       console.log(users);
  //     });

  //     return () => socket.close();
  //   } else {
  //     if (socket) {
  //       socket.close();
  //       setSocket(null);
  //     }
  //   }
  // }, [authUser]);

  useEffect(() => {
    let cleanupFunction: () => void | undefined;

    if (authUser) {
      const socket = io("http://localhost:8080", {
        query: {
          userId: authUser,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log(users);
      });

      cleanupFunction = () => {
        socket.close();
      };
    } else {
      cleanupFunction = () => {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      };
    }

    return cleanupFunction;
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
