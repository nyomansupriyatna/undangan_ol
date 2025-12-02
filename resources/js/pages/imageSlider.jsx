import { useState, useEffect } from "react";

export default function ImageSlider() {
    const images = [
        "/image/slide1.jpg",
        "/image/slide2.jpg",
        "/image/slide3.jpg",
        "/image/slide4.jpg",
        "/image/slide5.jpg",
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // 3 detik

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl shadow-lg">
            <div
                className="flex transition-all duration-700"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-full h-64 object-cover flex-shrink-0"
                    />
                ))}
            </div>
        </div>
    );
}
