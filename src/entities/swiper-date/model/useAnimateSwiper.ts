import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SwiperRef } from "swiper/react";

export const useAnimateSwiper = (deps: number) => {
    const swiperRef = useRef<SwiperRef | null>(null);

    useEffect(() => {
        if (swiperRef.current) {
            gsap.fromTo(
                swiperRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
        }
    }, [deps]);

    return swiperRef;
};
