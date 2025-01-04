import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosinstance } from "../lib/axios"
import { useAuthStore } from "./useAuthStore";



export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUsers: async () => {
        set({ isUserLoading: true })
        try {
            const res = await axiosinstance.get("/messages/users")
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false })
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosinstance.get(`/messages/${userId}`)
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false })
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosinstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id) return;
            set({messages:[...get().messages,newMessage]})
        });
    },

    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))