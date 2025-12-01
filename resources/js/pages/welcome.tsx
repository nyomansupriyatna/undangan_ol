import { Button } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { House, Users, Map, Images, SquarePen, CalendarDays, Volume2, VolumeX, LoaderCircle, Clock, ChevronsRight, ChevronsLeft, Star, Heart  } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { motion, useInView, AnimatePresence } from "framer-motion";
// import FadeInSection from './fadeInSection';
// import { ref2, isInView2 } from "./useInView2.js" ;


interface ucapan {
    id: number;
    nama: string;
    ucapan: string;
    created_at: string;
}

export default function Welcome( {...props}: { ucapans: ucapan[] } ) {
    const { ucapans } = props;
    const [bukaUndangan, setBukaUndangan ] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const [soundtrack] = useState(new Audio('/music/Shane Filan - Beautiful In White.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);

    const [index, setIndex] = useState<number>();
    const [opImage, setOpImage] = useState<boolean>(false);

    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [autoScroll, setAutoScroll] = useState(true);

    const [isVisible, setIsVisible] = useState(true);

    const ref = useRef(null);
    // const ref2 = useRef(null);
    const isInView =  useInView(ref, { once: false, margin: "0px" });
    // const isInView2 =  useInView(ref2, { once: false, margin: "0px" });


    useEffect(() =>{
        if (isInView) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         } 
        console.log("is in view, visible ->",isInView, isVisible);
    },[])
   
   
    const [mouseY, setMouseY] = useState(0);

   
    // mouse move
    useEffect(() => {
        const handleMove = (e) => {
        setMouseY(e.clientY);    // Y position relative to viewport
        };

        console.log('museY', mouseY);

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);



    // const names = ["Tita & Kamron"]; // nama pengantin
    const names = [
        "Tita & Kamron", 
        "Tita "+ <Heart />+" Kamron", 
        "Kamron  Tita",
        "Tita & Kamron Wedding"
    ];

    // const ite
    // ms = [];


    // console.log('isPlaying', isPlaying)

    // count down -----------------------------------------------
    const targetDate = new Date("2026-02-06T11:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    // count down -----------------------------------------------
    useEffect(() => {
        const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            return;
        }

        setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, targetDate]);
    
    // const viewImage = (index:number) => {
    //     console.log('indexnya:',index);
    //     setOpImage(true);
    //     setIndex(index);
    //     return (
    //         <>
    //             <div className='fixed top-0 z-60 border-2 border-blue-500 min-h-24 h-full w-full'>
    //                 <img  src={`\\gallery\\${slides[index].src}`} alt={slides[index].title} className='border-2 border-red-500 h-full object-cover' />
    //             </div>
    //         </>

    //     )
    // }

    // const panahKiri = (index:number) => {
    //     if (index == 0 ) {
    //         setIndex((slides.length)-1);
    //     } else {
    //         setIndex(index-1);
    //     }
    // }
    
    // const panahKanan = (index:number) => {
    //     if (index == (slides.length)-1 ) {
    //         setIndex(0);
    //     } else {
    //         setIndex(index+1);
    //     }
    // }

     const openUndangan = () => {
        setBukaUndangan(true);
        setIsPlaying(true)
    };
    const closeUndangan = () => {
        setBukaUndangan(false);
        setIsPlaying(false)
        // soundtrack.currentTime = 0; // Reset the playback position to the start
    };
   
    const toggleAudio = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (isPlaying) {
            soundtrack.play();
        } else {
            soundtrack.pause();
        }
    }, [isPlaying, soundtrack]); // The effect runs when isPlaying state changes

    // Cleanup function for when the component unmounts
    useEffect(() => {
        return () => {
        soundtrack.pause();
        // soundtrack.currentTime = 0;
        };
    }, [soundtrack]);

    const { data, setData, post,  processing, errors, reset } = useForm({
            nama:  '',
            ucapan:  '',
        });

    // simpan ucapan -------------------------------------------
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('ucapan.simpan'), {
            onSuccess: ( function() {
                 window.scrollTo({top: 2445, behavior: 'instant'}); // bevahior: smooth, instant, animate, dll
                 reset();
            })
        });
    };


    return (
        <>
            <Head title="Tita & Kamron Wedding">
                
            </Head>
            {/* box gray xxx*/}
            <div   className="relative flex h-[150] min-h-screen flex-col items-center  justify-center bg-gray-700 overflow-y-scroll text-[#c9a965] ">
            <p className='fixed z-50 text-white bg-black top-0 flex justify-start'>Mouse Y Offset: {mouseY}px</p>

                {/* box undangan hitam texture max-widh-lg*/}
                <div className="absolute mx-auto top-0 bg-linear-to-br from-black to-gray-800 border-4 border-[#c9a965]  text-[#c9a965] w-full max-w-lg  justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 overflow-clip ">

                     <>
                        {/* ornamen pojok atas kiri*/}
                        <div className='absolute -rotate-90'>
                            <img className='h-28 opacity-70' src="\image\patra-pojok.webp" alt="patra-pojok" />
                        </div>
                        {/* ornamen pojok atas kanan */}
                        <div className='absolute right-0'>
                            <img className='h-28  opacity-70' src="\image\patra-pojok.webp" alt="patra-pojok" />
                        </div>

                        {/* ornamen pojok bawah kiri*/}
                        <div className='absolute bottom-0 -rotate-180'>
                            <img className='h-28 opacity-70' src="\image\patra-pojok.webp" alt="patra-pojok" />
                        </div>
                        {/* ornamen pojok bawah kanan*/}
                        <div className='absolute bottom-0 right-0 rotate-90'>
                            <img className='h-28 opacity-70' src="\image\patra-pojok.webp" alt="patra-pojok" />
                        </div>
                        
                    </>


                   {/* random text nama pengantin */}
                    {/* {items.map((item, i) => (
                        <div
                        key={i}
                        className="absolute text-teal-900 whitespace-nowrap pointer-events-none z-0"
                        style={{
                            top: `${item.top}%`,
                            left: `${item.left}%`,
                            opacity: item.opacity,
                            transform: `rotate(${item.rotate}deg)`,
                        }}
                        >
                         {item.text}
                        </div>
                    ))} */}

                    {/* test button........................... */}
                        <motion.button
                            onClick={()=>setIsVisible(!isVisible)}
                            className='w-full bg-red-500'
                        >
                            Show/Hide
                        </motion.button>
                    {/* end test............................... */}
               
                    {/* halaman 0 sebelum buka undangan */}
                  
                    {!bukaUndangan && (
                        <div className='min-h-screen'>
                            <main className=" pt-4 text-[#c9a965] flex justify-center flex-col ">

                                <label className='mx-auto text-md md:text-xl mt-12 noto-serif-balinese-regular animate-fadeInScale text-[#c9a965] mb-12 md:mb-18 '>The Wedding Of</label>

                                  <div className='flex justify-center'>
                                    <img className='h-36 w-36 rounded-full border-3 border-[#c9a965] object-cover z-50' src="\image\tita-kamron.webp" alt="backround-img" />
                                </div>

                                <label className='mx-auto font-bold py-4 dancing-script text-[#c9a965]  text-xl md:text-2xl'>Tita & Kamron</label>
                                
                                <div className='px-16 mb-5'>
                                    <hr className='border-1 border-[#c9a965]' />
                                </div>
                                
                                <div className='flex flex-col justify-center items-center'>
                                    <label className='mx-auto text-xl py-2 '>Kepada yth:</label>
                                    {/* kotak nama dan alamat */}
                                    {(searchParams.size > 0) && (<div className='rounded-md mx-auto flex flex-col w-fit px-5 text-center'>
                                        <label className='mx-auto text-lg font-bold'>{searchParams.get('nama')}</label>
                                        {(searchParams.get('alamat')) && (
                                        <label className='mx-auto'>di {searchParams.get('alamat')}</label>)}
                                        <label className='mx-auto text-xs opacity-80 mt-3'>Mohon maaf apabila ada kesalahan penulisan nama/gelar</label>
                                    </div>)}
                                    <label className='mx-auto text-xs pt-6 pb-3 text-center'>Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk menghadiri acara kami</label>

                                    
                                    {!bukaUndangan &&  (<Button className='m-auto w-fit hover:opacity-80 hover:cursor-pointer px-4 py-2 rounded border-[#c9a965]  border-2 bg-[#141413] noto-serif-balinese-regular' onClick={openUndangan}>
                                    <span className=''>Buka Undangan</span>  
                                    </Button> )}
                                </div>
                                
                            </main>
                        </div>
                    )}
                
                </div>


                {/* Halaman 1 undangan dibuka */}
                    {bukaUndangan && (
                        <>
                       
                        {/* menu bar */}
                        <footer className="fixed z-20 bottom-0 bg-linear-to-br from-black to-gray-800 text-[#c9a965]  w-full max-w-lg text-sm border-x-4 border-y-2 border-[#c9a965] px-2">
                            <nav className="flex items-center justify-between 3">
                                <> {/* menu bar bawah*/}
                                    <div
                                        onClick={closeUndangan}
                                        className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <House/>
                                            home
                                        </div>
                                    </div>
                                     <a 
                                        href='#acara'
                                        className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <CalendarDays />
                                            acara
                                        </div>
                                    </a>
                                    <a 
                                        href='#mepandes'
                                        className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <Users />
                                            metatah
                                        </div>
                                    </a>
                                    <a 
                                        href='#maps'
                                        className="flex  py-1.5 text-sm leading-normal hover:opacity-80 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <Map />
                                            maps
                                        </div>
                                    </a>
                                    <a 
                                        href='#ucapan'
                                        className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <SquarePen   />
                                            ucapan
                                        </div>
                                    </a>
                                     <a
                                        href='#galery'
                                        className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] hover:cursor-pointer"
                                    >
                                        <div className='flex flex-col justify-center items-center text-xs'>
                                            <Images  />
                                            galery
                                        </div>
                                    </a>
                                    
                                </>
                            </nav>
                        </footer>
                       
                        {/* volume pause */}
                        <div 
                            onClick={toggleAudio}
                            className='fixed w-full max-w-lg bottom-16 z-50 flex flex-col mx-auto hover:cursor-pointer'>
                            
                            {isPlaying ? (<span className='flex justify-end mr-5'>
                                <Volume2 className='text-[#c9a956] h-8 w-8 opacity-60 bg-green-200 px-1 rounded-full'/>
                            </span>) :
                            (<span className='flex justify-end mr-5'>
                                <VolumeX className='text-gray-700 h-8 w-8 opacity-60 bg-gray-200 px-1 rounded-full'/>
                            </span>)}
                        </div>

                        {/* test start -------------- */}
                        
                        <div 
                            className="relative mx-auto text-[#c9a965] border-4 border-[#c9a965] bg-linear-to-br from-black to-gray-800  w-full max-w-lg  justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 ">
                            {/* <div className='relative bg-white pb-36'> */}
                               
                                {/* Acara--------------------------------- */}
                                <main 
                                    ref={ref}
                                    id='acara' 
                                    className="px-4  text-[#c9a965] flex justify-center flex-col h-screen max-h-screen">

                                    <label className='mx-auto text-md md:text-xl mt-2 noto-serif-balinese-regular animate-fadeInScale text-[#c9a965] mb-3 md:mb-6 '>The Wedding Of</label>

                                    <div  className="">
                                        <AnimatePresence mode='popLayout'>
                                        {isVisible &&
                                            <motion.img
                                                src="\image\tita-kamron.webp"
                                                className='h-20 w-20 rounded-full border-3 border-[#c9a965] object-cover z-50 ' 
                                                initial={{
                                                    rotate: "0deg",
                                                    scale: 0,
                                                    y: 0
                                                }}
                                                animate={{
                                                    rotate: "360deg",
                                                    scale: 1,
                                                    y: [0, 150, -150, -150, 0],
                                                }}
                                                exit={{
                                                    rotate: "0deg",
                                                    scale: 0,
                                                    y: [0, 150, -150, -150, 0],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    // type: "spring",
                                                    ease: "backInOut",
                                                    times: [0, 0.25, 0.5, 0.85, 1]
                                                }}
                                            
                                            />
                                        
                                        }
                                        </AnimatePresence>
                                    </div>

                                    <div className='flex justify-center'>
                                        <img className='h-20 w-20 rounded-full border-3 border-[#c9a965] object-cover z-50 ' src="\image\tita-kamron.webp" alt="backround-img" />
                                    </div>

                                    <label className='mx-auto font-bold py-4 dancing-script text-[#c9a965]  text-xl md:text-2xl'>Tita & Kamron</label>
                                    
                                    <div className='px-16 mb-5'>
                                        <hr className='border-1 border-[#c9a965]' />
                                    </div>
                                        
                                    <div className='flex flex-col justify-center items-center'>
                                        <label className='mx-auto text-sm text-center'>Kami sangat berterimakasih jika Bapak/Ibu/Saudara/i:</label>
                                        {/* kotak nama dan alamat */}
                                       <div className='mx-auto flex flex-col w-fit px-5 text-center'>
                                        <label className='mx-auto text-md font-bold mb-4 '>{searchParams.get('nama')}</label>
                                            
                                            <label className='mx-auto text-md text-center mb-3'>berkenan hadir pada:</label>
                                            <div className='border rounded-md flex flex-col py-2 px-5   border-amber-500 mx-auto'>
                                                <label className='mx-auto text-md md:text-xl font-bold text-center noto-serif-balinese-regular'>Jumat, 6 Pebruari 2026</label>
                                                <label className='mx-auto text-md md:text-xl font-bold text-center noto-serif-balinese-regular'>Pukul 18.00 - 20.00</label>
                                            </div>
                                            <label className='mx-auto text-sm md:text-md font-bold text-center noto-serif-balinese-regular mt-2 py-2 '>Lokasi di <span className='font-bold '>Banjar Tegeha No 2</span>, Sempidi, Mengwi, Badung</label>

                                        </div>
                                        <label className='mx-auto text-xs pt-6 pb-3 text-center'></label>
                                    
                                    </div>

                                      {/* count down */}
                                    < div className='flex justify-center'>
                                        <div className="flex gap-2 text-center">
                                            <div className="bg-gray-800 p-2 rounded-xl w-16">
                                                <p className="text-3xl font-bold">{timeLeft.days}</p>
                                                <p className="text-sm">Hari</p>
                                            </div>

                                            <div className="bg-gray-800 p-2 rounded-xl w-16">
                                                <p className="text-3xl font-bold">{timeLeft.hours}</p>
                                                <p className="text-sm">Jam</p>
                                            </div>

                                            <div className="bg-gray-800 p-2 rounded-xl w-16">
                                                <p className="text-3xl font-bold">{timeLeft.minutes}</p>
                                                <p className="text-sm">Menit</p>
                                            </div>

                                            <div className="bg-gray-800 p-2 rounded-xl w-16">
                                                <p className="text-3xl font-bold">{timeLeft.seconds}</p>
                                                <p className="text-sm">Detik</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </main>

                                {/* Sane Mepandes*/}
                                <main id='mepandes' className='border-t-4 border-[#c9a965] pt-2 pb-3 px-2 min-h-screen'>
                                    <div>
                                        
                                    
                                    </div>
                                </main>

                                {/* google maps*/}
                                <main id='maps' className='border-t-4 border-[#c9a965] min-h-screen py-6 px-2'>
                                    <div className='overflow-hidden'>
                                        <div className='flex flex-col justify-center mx-auto text-center'>
                                            <label className='text-xl mt-4 text-center'>Lokasi Acara</label>
                                            <label className='text-md text-center'>Taman Prakerti Bhuana</label>
                                            <label className='text-md mb-4 text-center'>Jl. Gunung Agung, Beng, Gianyar, Bali</label>

                                        </div>
                                        <iframe className='h-full w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.728826869535!2d115.32599447381867!3d-8.525686686366983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd216542cc4ede7%3A0x2308fdb0be993019!2sTaman%20Prakerti%20Bhuana!5e0!3m2!1sen!2sid!4v1763222995590!5m2!1sen!2sid" 
                                        // width="600" 
                                        // height="450" 
                                        allowFullScreen
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title='Responsive Google Map'>
                                        </iframe>
                                    </div>
                                    <div className='flex flex-col justify-center mt-5 p-3'>
                                        <label className='mx-auto font-serif mb-3'>Scan QR Code dibawah untuk mendapatkan lokasi upacara</label>
                                       
                                    </div>
                                </main>

                                {/* galery foto*/}
                                <main id='galery' className='border-t-4 border-[#c9a965] h-screen  mx-auto'>
                                   
                                    <div className='relative h-full overflow-y-scroll w-full mx-auto'>
                                    <h1 className='font-bold p-2'>Galery foto</h1>
                                    
                                    


                                 
                                    </div> 
                                   
                                   
                                    {/* {console.log(slides)}  */}


                                </main>

                                {/* Ucapan dan doa*/}
                                <main id='ucapan' className='border-t-4 border-[#c9a965] min-h-screen py-2 px-1'>
                                   <Label className='flex font-bold mx-auto justify-center py-2'>Ucapan dan Doa</Label>

                                    <div className="flex flex-1 flex-col gap-4 rounded-xl p-0">
                                        <Card>
                                            
                                            <CardContent>
                                                <form
                                                    onSubmit={submit}
                                                    className="flex flex-col gap-4"
                                                    autoComplete="off"
                                                >
                                                    <div className="grid gap-6">
                                                        {/* Nama ucapan */}
                                                        <div className="grid gap-1">
                                                            <Label>
                                                                Nama 
                                                            </Label>
                                                            <Input
                                                                value={data.nama}
                                                                onChange={(e) =>setData('nama', e.target.value,)}
                                                                id="nama"
                                                                name="nama"
                                                                type="text"
                                                                placeholder="Nama"
                                                                // autoFocus
                                                                tabIndex={1}
                                                                disabled={processing}
                                                            />

                                                            <InputError message={errors.nama} />
                                                        </div>

                                                        {/* Alamat ucapan */}
                                                        <div className="grid gap-1">
                                                            <Label>
                                                                Ucapan / Doa
                                                            </Label>

                                                            <CustomTextarea
                                                                value={data.ucapan}
                                                                onChange={(e) =>setData('ucapan',e.target.value,)}
                                                                id="ucapan"
                                                                name="ucapan"
                                                                placeholder="Ucapan"
                                                                // autoFocus
                                                                rows={2}
                                                                tabIndex={2}
                                                                disabled={processing}
                                                            />
                                                            <InputError
                                                                message={errors.ucapan}
                                                            />
                                                        </div>
                                                      
                                                        {/* button kirim ucapan */}
                                                        <Button
                                                            type="submit"
                                                            className="mx-2 w-fit cursor-pointer text-white font-bold bg-amber-800 py-1 px-3 rounded-sm"
                                                            tabIndex={5}
                                                        >
                                                            {processing && (
                                                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                                            )}
                                                            {processing}
                                                                Kirim
                                                        </Button>
                                                        <hr />
                                                    </div>
                                                </form>
                                                {/* tampilkan ucapan dan doa */}
                                                <div className='h-screen overflow-y-scroll pb-6'>
                                                    <div className='mt-3'>
                                                    {ucapans.length > 0 ? (
                                                            ucapans.map((ucapan, index) => (
                                                                <div key={index} className="text-gray-800 flex flex-row  border-b-1 pb-2 pt-2">
                                                                    <div className='flex flex-col'>
                                                                        <span className='font-bold'>{ucapan.nama}</span> 
                                                                        <span className='flex gap-2 text-xs mb-2 text-purple-500'><Clock className='h-4 w-4'/>{ucapan.created_at}</span> 
                                                                        <span>{ucapan.ucapan}</span> 
                                                                    </div>
                                                                </div>
                                                                
                                                            ))
                                                        ) : (
                                                            <div
                                                                className="text-md py-4 text-center font-bold text-red-700"
                                                            >
                                                                No Records Found!
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                </main>

                        </div>
                        </>
                        
                    )}

            </div>
        </>
    );
}




