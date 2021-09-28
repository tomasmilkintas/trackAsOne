import React from 'react'
import Image from 'next/image'
import { BiDoorOpen } from 'react-icons/bi'
import { VscSignIn, VscListOrdered } from 'react-icons/vsc'
import { AiOutlineIdcard } from 'react-icons/ai'
import { HomeBtn } from './buttons/HomeBtn'
import { useFirestore } from '../context/FirestoreContext'
import { defaultPic } from '../static/utils'

export const Homepage: React.FC = () => {
  const { currentUser } = useFirestore()
  const { userTag, displayName, email, photoURL } = currentUser || {}

  const copyTag = () => {
    navigator.clipboard.writeText(userTag || '')
  }

  return (
    <section className='wrap'>
      <div className='flex-between mt-8 w-full'>
        <div className='h-[100px] w-[100px] rounded-full p-2 primary-gradient'>
          <Image
            src={photoURL || defaultPic}
            height={100}
            width={100}
            objectFit='cover'
            className='rounded-full'
            alt='profile picture'
          />
        </div>

        <div className='text-right'>
          <h1 className='text-2xl font-bold'>Hello, {displayName}</h1>
          <p>{email}</p>
          <p>{userTag}</p>
        </div>
      </div>

      <div className='bg-gradient-to-tr from-secondary to-[#FFDC54] h-[2px] my-8 w-full'></div>

      <div className='md:grid grid-cols-2 gap-x-2'>
        <button
          onClick={copyTag}
          className='rounded-[36px] bg-primary text-f9 p-2 w-[300px] px-[50px] mt-4 btnEffect flex-between'
        >
          <p className='mr-4'>copy user tag</p>{' '}
          <AiOutlineIdcard className='text-xl text-secondary' />
        </button>
        <HomeBtn link='/create' desc='create room' Icon={BiDoorOpen} />
        <HomeBtn link='/join' desc='join room' Icon={VscSignIn} />
        <HomeBtn link='/list' desc='my rooms' Icon={VscListOrdered} />
      </div>
    </section>
  )
}
