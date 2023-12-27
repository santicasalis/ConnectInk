'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { RiCloseFill, RiEmotionHappyLine, RiCheckFill,RiHeart3Line, RiHeart3Fill, RiMessage3Line  } from "react-icons/ri";
import { closeModalDetailPostAction } from '../../app/redux/features/modalDetailPost/modaDetailPostActions';
import Comment from '../comment/Comment';
import { cleanCommentsAction, getCommentsAction } from '../../app/redux/features/comments/commentsActions';
import { postCommentAction } from '../../app/redux/features/comments/commentsActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const ModalDetailPost = () => {
    const {isOpen, publication, userId} = useSelector((state) => state.modalDetailPost)
    const [isLike, setIsLike] = useState(false);
    const {comments} = useSelector((state) => state.comments)
    const [textCommend, setTextCommend] = useState('');
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const textareaRef = useRef(null);
    const dispatch = useDispatch();
    const imageLoader = ({src}) => {
        return src
    }
    const handleClick = () => {
        setIsLike(!isLike);
    }

    const focusTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            setIsTextareaFocused(true);
        }
    };

    const removeAboutAgo = (distance) => {
        return distance.replace(/(?:about|ago)/gi, '').trim();
    };
    
    const formatDistance = (date) => {
        const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
        const cleanedDistance = removeAboutAgo(distance);
        return cleanedDistance;
    };
    useEffect(()=>{
        if(publication.id!=''){
            dispatch(getCommentsAction(publication.id));
        }
        return () => {
            dispatch(cleanCommentsAction());
        }
    },[publication]);
    
    const handleChange = (event) => {
        setTextCommend(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            dispatch(postCommentAction({
                customerId : userId,
                publicationId : publication.id,
                text : textCommend,
            }));
            toast.success("Se subió tu comentario correctamente", {
                className:'toastSuccess',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
             });
             setTextCommend('');
        } catch (error) {
            toast.error("Hubo un error al subir el comentario", {
                className:'toastError',
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
            });
            setTextCommend('');
        }
    }

  return (
    <>
        {
            isOpen &&
            <div className='fixed top-0 left-0 flex justify-center items-center w-full h-full z-50'  style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} >
                <div className='w-full h-full flex justify-center items-center relative'>
                    <RiCloseFill className='absolute top-2 right-2 text-white text-[35px] cursor-pointer hover:text-artist' onClick={()=>dispatch(closeModalDetailPostAction())}/>
                    <div className="bg-secondary-900 z-50 opacity-100  w-[70%] h-[90%] flex flex-row  rounded-lg ">
                        <div className='min-w-[59%] max-w-[60%]'>
                            {
                                publication.image && <Image loader={imageLoader} src={publication.image} width={1000} height={1000} className='h-full object-cover'/>
                            }
                        </div>
                        <div className='flex flex-col flex-1 h-full max-w-[40%]'>
                            <div className='flex items-center  py-3 px-4 w-full border-[1px] border-b-artistfont/20 border-transparent mb-4'>
                                <div className='w-[35px] h-[35px] rounded-full overflow-hidden mr-2'>
                                    {
                                        publication.profilePic && <Image loader={imageLoader} src={publication.profilePic} width={35} height={35} className='rounded-full object-cover w-full h-full'/>
                                    }
                                </div>
                                <Link href={`/explore/${publication.artistId}`}>
                                    <span className='text-[15px] cursor-pointer text-artistfont mr-2 font-bold'>{`${publication.nameArtist}`}</span>
                                </Link>
                                <p className='text-artistfont/70 text-[13px]'>• {formatDistance(publication.createdAt)}</p>
                            </div>
                            <div className='flex-1 overflow-y-auto overflow-x-hidden pr-4'>
                                {
                                    comments?.map((comment) => {
                                        return <Comment key={comment.id} comment={comment}/>
                                    })
                                }
                            </div>
                            <div className='flex flex-col'>
                                <div  className=' text-[30px] flex flex-col mb-2 pt-3 pb-3 text-artistfont w-full border-y-[1px] border-artistfont/20 border-x-transparent'>
                                    <div className='flex gap-x-2 px-4'>
                                        {
                                            isLike
                                            ? <RiHeart3Fill onClick={handleClick} className='text-red-500 cursor-pointer'/>
                                            : <RiHeart3Line onClick={handleClick}  className='cursor-pointer hover:text-artistfont/70'/>
                                        }
                                        <RiMessage3Line className='cursor-pointer hover:text-artistfont/70' onClick={focusTextarea} />
                                    </div>
                                    <div className='px-4 flex flex-col'>
                                        <h4 className='text-[15px]'>218 Me gusta</h4>
                                        <p className='text-artistfont/60 text-[13px]'>hace {formatDistance(publication.createdAt)}</p>
                                    </div>
                                    
                                </div>
                                <div className='w-full px-3'>
                                    <form onSubmit={handleSubmit} className='m-0 p-0 flex'>
                                        <div className='pt-1 ml-auto w-[30px] '>
                                            <RiEmotionHappyLine className='cursor-pointer top-0 text-[23px] text-artistfont'/>
                                        </div>
                                        <div className='flex justify-between gap-x-3 flex-1'>
                                            <textarea type='text' onChange={handleChange} ref={textareaRef}  value={textCommend} placeholder='Añadir comentario...' rows={2} className='flex-1 py-0 h-auto resize-none text-[16px]  outline-none bg-transparent text-white/80 '/>
                                            <div className='right-2 '>
                                                <button type='submit' disabled={textCommend.length === 0} className={`flex items-start pt-0.5 ${textCommend.length==0 ? 'text-artistfont/60 cursor-auto text-[17px]' : 'text-primary text-[17px] hover:text-artistfont'}`}>
                                                    <span >Publicar</span>
                                                </button>
                                            </div>
                                            
                                        </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default ModalDetailPost