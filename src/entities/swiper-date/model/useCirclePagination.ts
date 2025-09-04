import { useCallback, useRef } from "react";
import gsap from "gsap";

type UseCirclePaginationProps = {
    dataLength: number;
};

export const useCirclePagination = ({
    dataLength,
}: UseCirclePaginationProps) => {  

    const startAngle = -Math.PI / 2;
    const currentDeg = useRef(0);

    const positionBullets = useCallback(
        (paginationEl: HTMLElement) => {
            if (!paginationEl) return;

            const bullets = paginationEl.querySelectorAll<HTMLElement>(
                ".swiper-pagination-bullet"
            );

            bullets.forEach((bullet, index) => {
                const radius = paginationEl.offsetWidth / 2;
                const angle = ((2 * Math.PI) / dataLength) * index + startAngle;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                gsap.set(bullet, {
                    x,
                    y,
                });
            });
        },
        [dataLength]
    );

    const rotateCircle = useCallback(
        (paginationEl: HTMLElement, activeIndex: number) => {
            if (!paginationEl) return;

            const angle =
                ((2 * Math.PI) / dataLength) * activeIndex + startAngle;

            const targetDeg = -angle * (180 / Math.PI) - 45;
            let diff = targetDeg - currentDeg.current;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;

            const newDeg = currentDeg.current + diff;
            currentDeg.current = newDeg;

            gsap.to(paginationEl, {
                rotate: newDeg,
                duration: 0.5,
                ease: "power2.out",
            });

            const bullets = paginationEl.querySelectorAll<HTMLElement>(
                ".swiper-pagination-bullet"
            );

            bullets.forEach((bullet) => {
                gsap.to(bullet, {
                    rotate: -newDeg,
                    duration: 0.5,
                    ease: "power2.out",
                });
            });
        },
        [dataLength]
    );

    return {
        positionBullets,
        rotateCircle,
    };
};
