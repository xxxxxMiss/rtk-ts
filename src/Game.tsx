import { useState, useEffect, useSyncExternalStore } from 'react'
import ContentLoader from 'react-content-loader'
import { ReactComponent as ExplainGood } from '~imgs/explain-good.svg'

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  )
}

interface GameProps {
  val: number
}

export default function Game({ val }: GameProps) {
  const [card, setCard] = useState<{ gold: boolean } | null>(null)
  const [goldCardCount, setGoldCardCount] = useState(0)
  const [round, setRound] = useState(1)
  const [isGameOver, setIsGameOver] = useState(false)

  const isOnline = useOnlineStatus()
  console.log('--------isOnline--', isOnline)

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1)
    }
  }, [card])

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0)
    }
  }, [goldCardCount])

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true)
    }
  }, [round])

  // useEffect(() => {
  //   alert('Good game!')
  // }, [isGameOver])

  // function handlePlaceCard(nextCard) {
  //   if (isGameOver) {
  //     throw Error('Game already ended.')
  //   } else {
  //     setCard(nextCard)
  //   }
  // }
  return (
    <>
      <h3>Game{val}</h3>

      <ContentLoader width={412} height={200}>
        <ExplainGood />
      </ContentLoader>
      <ExplainGood />
    </>
  )
}
