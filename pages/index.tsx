import { onAuthStateChanged } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ChatView from '../components/ChatView'
import Menu from '../components/Menu'
import { auth } from '../lib/firebase'

const Home: NextPage = () => {
  const [openChatGroupId, setOpenChatGroupId] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return router.push('/login')
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='h-screen flex'>
        <div className={`w-full md:w-1/3 h-full ${openChatGroupId !== null && 'hidden'} md:flex`}>
          <Menu openChatGroupId={openChatGroupId} setOpenChatGroupId={setOpenChatGroupId} />
        </div>
        <div className={`flex-1 h-full ${openChatGroupId !== null ? 'flex' : 'hidden'} md:flex`}>
          {
            openChatGroupId === null ? (
              <div className='h-full w-full bg-primary-dark flex items-center justify-center'>
                <h1 className='text-white text-lg font-semibold'>Open or start a new conversation</h1>
              </div>
            ) : (
              <ChatView openChatGroupId={openChatGroupId} setOpenChatGroupId={setOpenChatGroupId} />
            )
          }
        </div>

      </main>
    </div>
  )
}

export default Home
