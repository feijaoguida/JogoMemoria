"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

const generateDeck = () => {
  const memoryCards = [
    'brush-my-teeth',
    'exercise',
    'get-dressed',
    'go-to-school',
    'go-to-sleep',
    'make-lunch',
    'play-a-game',
    'play-soccer'
  ];

  const deck = [...memoryCards, ...memoryCards]
  return deck.sort(() => Math.random() - 0.5)
}

export default function MemoryGAme() {

  const [cards, setCards] = useState<string[]>(generateDeck())
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if(cards[first] === cards[second]) {
        setSolved([...solved, ...flipped])
      }

      setFlipped([])
    }
    

    if (flipped.length === 2) {
      checkForMatch()
    }
  }, [cards, flipped, solved])

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2 ){
      setFlipped([...flipped, index])
    }
    
  }

  return (
  <>
    <div className="grid grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div 
          className="flex justify-center items-center text-4xl font-bold text-black bg-slate-50 w-28 h-28 transform cursor-pointer" 
          key={index} 
          onClick={() => handleClick(index)}
        >

          
          
          { flipped.includes(index) ? (
            <Image 
              src={`/memory-cards/${card}.png`} 
              fill 
              alt="Memory card" 
            />
          ) : ("?") }
          
        </div>
      ))  
      }
    </div>
  </>
  )
}