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
  const [attempt, setAttempt] = useState<number>(0)

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if(cards[first] === cards[second]) {
        setSolved([...solved, ...flipped])
      }

      setFlipped([])
    }
    

    if (flipped.length === 2) {
      setTimeout(() => {
        setAttempt(attempt + 1)
        checkForMatch()
      }, 1000)
    }
  }, [cards, flipped, solved])

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2 ){
      setFlipped([...flipped, index])
    }
  }

  const gameOver = solved.length === cards.length
  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([])
    setSolved([])
    setAttempt(0)
  }

  return (
  <div className="text-center">
    <h1> Memory Game </h1>
  { gameOver && <h2 className="p-5"> You Won!!! Congrats!</h2> }
  <h2>Attempt: {attempt}</h2>
    <div className="grid grid-cols-4 gap-5 mt-5">
      {cards.map((card, index) => (
        <div 
          className={`flex justify-center items-center text-4xl font-bold text-black bg-slate-50 w-28 h-28 transform cursor-pointer transition-transform duration-300 ${
            flipped.includes(index) || solved.includes(index) ? "rotate-180" : ""} `} 
          key={index} 
          onClick={() => handleClick(index)}
        >
          { flipped.includes(index) || solved.includes(index) ? (
            <Image
              className="rotate-180"
              src={`/memory-cards/${card}.png`} 
              fill 
              alt="Memory card" 
            />
          ) : ("?") }
        </div>
      ))  
      }
    </div>
    <button className="flex p-5 bg-blue-500 rounded-md mt-5" onClick={() => resetGame()}>Restart</button>
  </div>
  )
}