import { useRef } from 'react';
import Header from './header';
import Image from './image'

export default function Post({ content }) {
    return (
        <div className='rounded col-span-4 border bg-white border-gray-primary mb-12'>
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
        </div>
    )
}