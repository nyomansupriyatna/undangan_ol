import { Button } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { House, Users, Map, Images, SquarePen, CalendarDays, Volume2, VolumeX, LoaderCircle, Clock, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';

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
    const [selonding] = useState(new Audio('/music/selonding.mp3'));
    const [isPlaying, setIsPlaying] = useState(false);

    const [index, setIndex] = useState<number>();
    const [opImage, setOpImage] = useState<boolean>(false);

    const slides = [
        {
            src: 'tita.png',
            title: 'Tita',
            description: 'Description Tita',
        },
        {
            src: 'rai.png',
            title: 'Rai',
            description: 'Description Rai',
        },
        {
            src: "rai2.png",
            title: 'Diva',
            description: 'Description Diva',
        },
        {
            src: 'vina.png',
            title: 'Vina',
            description: 'Description Vina',
        },
    ]

    const viewImage = (index:number) => {
        console.log('indexnya:',index);
        setOpImage(true);
        setIndex(index);
        return (
            <>
                <div className='fixed top-0 z-60 border-2 border-blue-500 min-h-24 h-full w-full'>
                    <img  src={`\\gallery\\${slides[index].src}`} alt={slides[index].title} className='border-2 border-red-500 h-full object-cover' />
                </div>
            </>

        )
    }

    const panahKiri = (index:number) => {
        if (index == 0 ) {
            setIndex((slides.length)-1);
        } else {
            setIndex(index-1);
        }
    }
    
    const panahKanan = (index:number) => {
        if (index == (slides.length)-1 ) {
            setIndex(0);
        } else {
            setIndex(index+1);
        }
    }

     const openUndangan = () => {
        setBukaUndangan(true);
        setIsPlaying(true)
    };
    const closeUndangan = () => {
        setBukaUndangan(false);
        setIsPlaying(false)
        selonding.currentTime = 0; // Reset the playback position to the start
    };
   
    const toggleAudio = () => {
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (isPlaying) {
            selonding.play();
        } else {
            selonding.pause();
        }
    }, [isPlaying, selonding]); // The effect runs when isPlaying state changes

    // Cleanup function for when the component unmounts
    useEffect(() => {
        return () => {
        selonding.pause();
        // selonding.currentTime = 0;
        };
    }, [selonding]);

    
    
    const { data, setData, post,  processing, errors, reset } = useForm({
            nama:  '',
            ucapan:  '',
        });

    
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
            <Head title="Undangan Metatah">
                
            </Head>
            {/* box hitam */}
            {/* <p className='fixed z-50 text-white bg-black  flex justify-start'>Mouse Y Offset: {mouseOffsetY}px</p> */}
            <div  className="relative flex min-h-screen flex-col items-center  justify-center bg-gray-600 overflow-y-scroll  ">
               

                {/* box undangan coklat max-widh-lg*/}
                <div className="absolute mx-auto  border-4 border-[#c9a965] bg-linear-to-br repeating-linear-gradient from-black to-gray-900  text-[#3a2c02] w-full max-w-lg  justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 ">

                    {/* halaman 0 sebelum buka undangan */}
                  
                    {!bukaUndangan && (
                        <div className='min-h-screen'>
                            <>
                                {/* ornamen pojok atas kiri */}
                                <div className='absolute left-0'>
                                    <img className='h-28 opacity-80' src="\image\ornamen-pojok2.webp" alt="" />
                                </div>
                                {/* ornamen pojok atas kanan*/}
                                <div className='absolute right-0 rotate-90'>
                                        <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                </div>
                                {/* ornamen pojok bawah kiri*/}
                                <div className='absolute bottom-0 rotate-270'>
                                        <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                </div>
                                {/* ornamen pojok bawah kanan*/}
                                <div className='absolute bottom-0 right-0 rotate-180'>
                                        <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                </div>
                            </>
                            <main className="px-4 pt-4 flex justify-center flex-col text-[#c9a965]">
                                        
                                <img className='h-28 mx-auto animate-pulse brightness-125' src="\image\ongk-sket.webp" alt="logo" />

                                <label className='mx-auto md:text-lg pt-3  noto-serif-balinese-regular animate-fadeInScale text-[#c9a965] '>UNDANGAN</label>
                                <label className='mx-auto font-bold md:text-lg pb-4 noto-serif-balinese-regular '>Upacara Manusa Yadnya</label>
                                <label className='mx-auto font-bold text-xl md:text-2xl py-4 momo-signature-regular animate-wingle text-amber-200 '>Metatah / Potong Gigi</label>
                                
                                <div className='flex flex-col justify-center items-center'>
                                    <label className='mx-auto text-xl py-2 '>Kepada Bapak/Ibu/Saudara/i:</label>
                                    {/* kotak nama dan alamat */}
                                    {(searchParams.size > 0) && (<div className='border rounded-md border-yellow-800 mx-auto flex flex-col w-fit py-3 px-5 text-center'>
                                        <label className='mx-auto text-lg font-bold'>{searchParams.get('nama')}</label>
                                        {(searchParams.get('alamat')) && (
                                        <label className='mx-auto'>di {searchParams.get('alamat')}</label>)}
                                        <label className='mx-auto text-xs opacity-80 mt-3'>Mohon maaf apabila ada kesalahan penulisan nama/gelar</label>
                                    </div>)}
                                    <label className='mx-auto text-xs pt-6 pb-3 text-center'>Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk menghadiri acara kami</label>

                                    
                                    {!bukaUndangan &&  (<Button className='m-auto w-fit hover:opacity-80 hover:cursor-pointer px-4 pt-3 pb-2 rounded border-amber-200  border-2 bg-[#614007] noto-serif-balinese-regular' onClick={openUndangan}>
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
                        <footer className="fixed z-20 bottom-0 bg-linear-to-br from-black to-gray-800  text-[#c9a965]  w-full max-w-lg text-sm border-x-4 border-y-2 border-[#c9a965] px-2">
                            <nav className="flex items-center justify-between 3">
                                <>
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
                                            gallery
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
                                <Volume2 className='text-[#c9a965] h-8 w-8 opacity-70 bg-gray-800 px-1 rounded-full'/>
                            </span>) :
                            (<span className='flex justify-end mr-5'>
                                <VolumeX className='text-gray-700 h-8 w-8 opacity-60 bg-red-200 px-1 rounded-full'/>
                            </span>)}
                        </div>
                        
                        <div className="relative mx-auto  border-4 border-[#c9a965] bg-linear-to-br from-black to-gray-800 text-[#c9a965] w-full max-w-lg  justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 ">
                            {/* <div className='relative bg-white pb-36'> */}
                                <>
                                    {/* ornamen pojok atas kiri */}
                                    <div className='absolute left-0'>
                                        <img className='h-28 opacity-80' src="\image\ornamen-pojok2.webp" alt="" />
                                    </div>
                                    {/* ornamen pojok atas kanan*/}
                                    <div className='absolute right-0 rotate-90'>
                                            <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                    </div>
                                    {/* ornamen pojok bawah kiri*/}
                                    <div className='absolute bottom-12 rotate-270'>
                                            <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                    </div>
                                    {/* ornamen pojok bawah kanan*/}
                                    <div className='absolute bottom-12 right-0 rotate-180'>
                                            <img className='h-28 opacity-70' src="\image\ornamen-pojok2.webp" alt="" />
                                    </div>
                                </>

                                {/* Acara */}
                                <main id='acara' className="px-4 pt-4 text-[#c9a965] flex justify-center flex-col h-screen max-h-screen">
                                   
                                    <img className='h-16 mx-auto mb-4' src="\image\swastyastu-gold.webp" alt="logo" />
                                    <label className='mx-auto font-bold md:text-lg pt-3 noto-serif-balinese-regular'>Undangan</label>
                                    <label className='mx-auto font-bold md:text-lg noto-serif-balinese-regular'>Upacara Manusa Yadnya</label>
                                    <label className='mx-auto text-center font-bold text-md md:text-xl py-4 animate-wingle momo-signature-regular '>Metatah / Mepandes / Potong Gigi</label>
                                    
                                    <div className='flex flex-col justify-center items-center'>
                                        <label className='mx-auto text-md text-center'>Kami sangat berterimakasih jika Bapak/Ibu/Saudara/i:</label>
                                        {/* kotak nama dan alamat */}
                                       <div className='mx-auto flex flex-col w-fit px-5 text-center'>
                                        <label className='mx-auto text-lg font-bold mb-4 '>{searchParams.get('nama')}</label>
                                            
                                            <label className='mx-auto text-md text-center mb-3'>berkenan hadir pada:</label>
                                            <div className='border rounded-md flex flex-col py-2 px-5  border-yellow-800 mx-auto'>
                                                <label className='mx-auto text-md md:text-xl font-bold text-center noto-serif-balinese-regular'>Selasa, 30 Desember 2025</label>
                                                <label className='mx-auto text-md md:text-xl font-bold text-center noto-serif-balinese-regular'>Pukul 11.00 - 14.00</label>
                                            </div>
                                            <label className='mx-auto text-sm md:text-md font-bold text-center  mt-2 py-2 font-sans italic '>Lokasi Acara di: <span className=''>Taman Prakerti Bhuana</span>, Beng, Gianyar</label>

                                        </div>
                                        <label className='mx-auto text-xs pt-6 pb-3 text-center'></label>
                                    
                                    </div>
                                    
                                </main>

                                {/* Sane Mepandes*/}
                                <main id='mepandes' className='border-t-4 border-[#c9a965] pt-2 pb-3 px-2 min-h-screen text-[#c9a965]'>
                                    <div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <label className='mx-auto font-bold text-md pt-6 pb-3 momo-signature-regular md:text-xl ease-in-out animate-fadeInScale'>Om Swastyastu</label>
                                        </div>
                                        <label className='flex flex-col justify-center items-center text-xs md:text-sm text-center font-bold mb-6 momo-signature-regular mx-4 md:mx-5 leading-5'>Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, perkenankan kami mengundang Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Mepandes/Metatah/Potong Gigi putra-putri kami:</label>
                                    
                                        {/* box foto */}
                                        <div className='border-2 border-[#302103] rounded-md px-3 py-6 bg-gray-950 noto-serif-balinese-regular'>
                                            <div className='flex flex-col justify-center'>
                                                <div className=' flex flex-col justify-center items-center '>
                                                    {/* <img className='h-24 w-24 rounded-full border-2 border-[#c9a965] animate-wingle mb-2' src="\image\diva.png" alt="foto" /> */}
                                                    <label className='flex text-center mx-auto text-xs md:text-sm  mb-2  ' >Ni Putu Ayu Kartika Diva Putri</label></div>
                                                     <label className='flex text-center mx-auto text-xs md:text-sm  mb-2' >I Made Kinara Sukmantara</label>
                                                <div className=' flex flex-col justify-center items-center'>
                                                    {/* <img className='h-24 w-24 rounded-full border-2 border-[#c9a965] mb-2 animate-wingle' src="\image\rai-kinara3.png" alt="foto" /> */}
                                                   
                                                </div>
                                            </div>
                                            <div className='flex justify-center flex-col mb-6'>
                                                <label className='flex text-center mx-auto text-xs md:text-sm  mt-3'>Putri dan Putra dari Pasangan</label>
                                                <label className='flex text-center mx-auto text-xs md:text-sm'>I Made Dwipayana & Diyah Retnowati </label>
                                            </div>

                                            <hr className='border border-[#302103] mb-6' />

                                            <div className='flex flex-col justify-center'>
                                                <div className=' flex flex-col justify-center items-center '>
                                                    {/* <img className='h-24 w-24 rounded-full border-2 border-[#c9a965] mb-2 animate-wingle' src="\image\tita.png" alt="foto" /> */}
                                                    <label className='flex text-center mx-auto text-xs md:text-sm  mb-2 '>Ni Putu Elsita Esayana</label></div>
                                                <div className=' flex flex-col justify-center items-center'>
                                                    {/* <img className='h-24 w-24 rounded-full border-2 border-[#c9a965] mb-2 animate-wingle' src="\image\vina.png" alt="foto" /> */}
                                                    <label className='flex text-center mx-auto text-xs md:text-sm  mb-2'>Ni Made Vinasuya Reyana</label>
                                                </div>
                                            </div>
                                            <div className='flex justify-center flex-col'>
                                                <label className='flex text-center mx-auto text-xs md:text-sm  mt-3'>Putri dari Pasangan</label>
                                                <label className='flex text-center mx-auto text-xs md:text-sm '>I Nyoman Supriyatna & Ni Ketut Noviani</label>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </main>

                                {/* google maps*/}
                                <main id='maps' className='border-t-4 border-[#c9a965] min-h-screen py-6 px-2'>
                                    <div className='overflow-hidden'>
                                        <div className='flex flex-col justify-center mx-auto text-center'>
                                            <label className='text-xl mt-4 text-center'>Lokasi Acara</label>
                                            <label className='text-md text-center'>Taman Prakerti Bhuana</label>
                                            <label className='text-md mb-5 text-center'>Jl. Gunung Agung, Beng, Gianyar, Bali</label>

                                        </div>
                                        <div className=''>
                                            <iframe className='h-full w-full rounded' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.728826869535!2d115.32599447381867!3d-8.525686686366983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd216542cc4ede7%3A0x2308fdb0be993019!2sTaman%20Prakerti%20Bhuana!5e0!3m2!1sen!2sid!4v1763222995590!5m2!1sen!2sid" 
                                            // width="600" 
                                            // height="450" 
                                            allowFullScreen
                                            loading="lazy" 
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title='Responsive Google Map'>
                                            </iframe>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center mt-4 p-3'>
                                        <label className='mx-auto font-serif mb-3'>Scan QR Code dibawah untuk mendapatkan lokasi upacara</label>
                                        <img  src="/image/QR-Code-Taman-Prakerti.png" alt="" className="mx-auto h-48 w-48 rounded" />
                                    </div>
                                </main>

                                {/* galery foto*/}
                                <main id='galery' className='border-t-4 border-[#c9a965] h-screen  mx-auto'>
                                   
                                    <div className='relative h-full overflow-y-scroll w-full mx-auto'>
                                    <h1 className='font-bold p-2'>Gallery Foto</h1>
                                    
                                    <div className='flex flex-row justify-center mx-auto '>
                                            <div  className='flex flex-wrap gap-2 md:gap-3 justify-center md:min-h-48 h-32 md:h-48 w-fit mb-3 text-center'>
                                                {slides.map((slide, index) => (
                                                    <div key={index} className='flex justify-center min-h-24 h-full  '>
                                                        <img onClick={()=>viewImage(index)} src={`\\gallery\\${slide.src}`} alt="{slide.title}" className=' h-full object-cover rounded-md shadow-md' />

                                                    </div>
                                                ))}

                                            </div>
                                            

                                    </div>



                                    {/* full view on klik */}
                                    {opImage && <div className='absolute flex justify-center items-center opacity-100 inset-0 max-w-lg'>
                                        <div className='absolute flex items-center h-full opacity-100 border-amber-900 bg-white'>
                                            
                                            <div onClick={()=>setOpImage(false)} className='absolute z-70 right-0 top-0 rounded-bl-sm bg-grey-300 bg-red-100 hover:cursor-pointer px-2 bg-opacity-100 text-right text-xl font-bold'>
                                                x
                                            </div>
                                            <img className='w-screen h-auto border backdrop-opacity-100'
                                            src={`\\gallery\\${slides[index].src}`} alt="" />

                                           {/* panah kiri */}
                                            <div onClick={()=>panahKiri(index)}  className='rounded-full bg-black opacity-50 absolute inline-block align-middle z-70  text-white  hover:cursor-pointer  bg-opacity-100 text-xl font-bold  items-center left-0 px-1'>
                                                <ChevronsLeft className='h-8'/>
                                            </div>

                                            {/* panah kanan */}
                                            <div onClick={()=>panahKanan(index)} className='rounded-full bg-black opacity-50 absolute inline-block align-middle z-70  text-white  hover:cursor-pointer bg-opacity-100 text-xl font-bold  items-center right-1 px-1'>
                                                <ChevronsRight className='h-8'/>
                                            </div>
                                        </div>
                                    </div>}

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

