import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { nanoid } from 'nanoid'

export const  useSetPoint = create(
  persist(
(set) => ({
    point: 0,
    setpoint: (test) => set((state) => ({ point: test })),
    live: 3,
    setLive: ()=>set((state) => ({ live: state.live - 1 })),
  
  }),{
    name:'persistPinball',
  }
  
))
