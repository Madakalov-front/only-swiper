import { CategoryHistoryType } from "@/shared/types";
import {  useState } from "react";
import { SwiperClass } from "swiper/react";

export const useSwiperDates = (data: CategoryHistoryType) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [activeSlides, setActiveSlides] = useState(data[activeIndex].content_category);

    const firstDateStart = data[prevIndex]?.content_category[0]?.date ?? 0;
    const firstDateEnd = data[activeIndex]?.content_category[0]?.date ?? 0;

    const lastDateStart =
        data[prevIndex]?.content_category.at(-1)?.date ??
        data[prevIndex]?.content_category[0]?.date ??
        0;

    const lastDateEnd =
        data[activeIndex]?.content_category.at(-1)?.date ??
        data[activeIndex]?.content_category[0]?.date ??
        0;

    const handleSlideChange = (swiper: SwiperClass) => {
        setPrevIndex(activeIndex);
        setActiveSlides(data[swiper.activeIndex].content_category);
        setActiveIndex(swiper.activeIndex);
    };

    return {
        activeIndex,
        prevIndex,
        activeSlides,
        firstDateStart,
        firstDateEnd,
        lastDateStart,
        lastDateEnd,
        handleSlideChange,
    };
};
