// store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs, { Dayjs } from "dayjs";

interface UserStore {
  eventName: string;
  eventDate: Dayjs | null;
  setEventName: (eventName: string) => void;
  setEventDate: (date: Dayjs | null) => void;
  reset: () => void;
  eventsList: { name: string; date: string }[];
  setEventsList: (eventsList: { name: string; date: string }[]) => void;
  addEvent: (name: string, date: Dayjs) => void;
}

const localStorageAdapter = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      eventName: "",
      eventDate: dayjs(),
      eventsList: [],
      setEventName: (eventName) => set({ eventName }),
      setEventDate: (eventDate) => set({ eventDate }),
      reset: () => set({ eventName: "", eventDate: dayjs() }),
      addEvent: (name, date) =>
        set((state) => ({
          eventsList: [...state.eventsList, { name, date: date.toISOString() }],
        })),
        setEventsList: (eventsList) => set({ eventsList }), 
    }),
    {
      name: "user-store",
      storage: localStorageAdapter, 
    }
  )
);
