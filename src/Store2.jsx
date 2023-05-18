import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const  useReclama = create((set) => ({
    pokazReclami: false,
    setPokazReclami: ()   =>set((state)=>({pokazReclami:true})),
    pokazReclami1: false,
    setPokazReclami1: ()   =>set((state)=>({pokazReclami1:true})) 
  }))