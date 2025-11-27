<a
href='#galery'
className="flex py-1.5 text-sm leading-normal hover:opacity-80 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] hover:cursor-pointer"
>
<div className='flex flex-col justify-center items-center text-xs'>
    <Images  />
    gallery
</div>
</a>

{/* galery foto*/}
<main id='galery' className='border-t-4 border-[#c9a965] h-screen mx-auto'>
    
    <div className='relative h-full overflow-y-scroll w-full mx-auto border-2'>
    <h1 className='flex font-bold mx-auto justify-center py-2'>Gallery Foto</h1>
    
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