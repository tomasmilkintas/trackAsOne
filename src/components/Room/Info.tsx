import React, { useState, useEffect } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { useRouter } from 'next/router';
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  arrayRemove,
  getDocs,
} from 'firebase/firestore';

import useRoom from '@/hooks/useRoom';
import { db } from '@/config/firebase';
import { defaultPic } from '@/utils/default';
import { InfoBtn } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useCollection, useDocument } from '@/hooks';
import { Layout, Header, Clipboard } from '@/components';
import { InfoSection, InfoMember, RoomNav } from '@/components/Room';

const Info: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [rerender, setRerender] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data } = useAuth();

  const [room, loading] = useRoom(id);
  const { creator, dateAdded, requests, id: roomID } = room;

  const creatorRef = doc(db, `users/${creator}`);
  const roomRef = doc(db, `rooms/${roomID}`);

  const [roomCreator] = useDocument<IUser>(creatorRef, {
    deps: [roomID],
  });
  const [roomMembers] = useCollection<IUser>(
    query(
      collection(db, 'users'),
      where('roomsJoined', 'array-contains', roomID ?? '')
    ),
    {
      deps: [roomID],
    }
  );

  useEffect(() => {
    setTimeout(() => {
      setRerender(!rerender);
    });
  }, []);

  const deleteRoom = async () => {
    await deleteDoc(roomRef);

    const roomTasks = await getDocs(collection(db, `rooms/${roomID}/tasks`));
    roomTasks.forEach(async (task) => {
      await deleteDoc(doc(db, `rooms/${roomID}/tasks/${task.id}`));
    });

    await updateDoc(creatorRef, {
      roomsCreated: arrayRemove(roomID),
    });

    router.push('/home');
  };

  const leaveRoom = async () => {
    if (data.id !== creator) {
      await updateDoc(roomRef, {
        members: arrayRemove(data.id),
      });

      await updateDoc(doc(db, `users/${data.id}`), {
        roomsJoined: arrayRemove(roomID),
      });

      router.push('/home');
    }
  };

  const copyRoomID = () => {
    navigator.clipboard.writeText(`${roomID}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Layout loaders={[loading]}>
      <RoomNav room={room} />
      <Header title='Room Info' />

      <InfoSection
        title={roomID ?? ''}
        label='room id'
        onClick={copyRoomID}
        Icon={IoMdKey}
      />
      <InfoSection
        title={dateAdded?.toDate().toDateString()}
        label='room created'
        Icon={AiFillCalendar}
      />

      <div className='w-full mb-4'>
        <InfoMember
          img={roomCreator?.photoURL ?? defaultPic}
          username={roomCreator?.username ?? ''}
          label='creator'
        />

        {roomMembers.map((member) => (
          <InfoMember
            key={member.id}
            img={member.photoURL ?? defaultPic}
            username={member.username ?? ''}
          />
        ))}

        {creator === data.id && (
          <InfoBtn
            className='mb-2'
            desc={`VIEW REQUESTS (${requests?.length})`}
            handleClick={() => router.push(`${roomID}?tab=requests`)}
          />
        )}

        <div className='flex'>
          {creator === data.id ? (
            <InfoBtn
              desc='DELETE ROOM'
              className='info-red-btn'
              handleClick={deleteRoom}
            />
          ) : (
            <InfoBtn
              desc='LEAVE ROOM'
              className='info-red-btn'
              handleClick={leaveRoom}
            />
          )}

          <InfoBtn
            desc='GO BACK'
            className='bg-secondary text-primary'
            handleClick={() => router.push(`/room/${roomID}`)}
          />
        </div>

        <div className='text-center'>
          <Clipboard copied={copied} />
        </div>
      </div>
    </Layout>
  );
};

export default Info;