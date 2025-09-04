import { CategoryHistoryType } from "@/shared/types";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Virtual } from "swiper/modules";
import { useSwiperDates } from "../model/useSwiperDates ";
import CountUp from "react-countup";
import { useCirclePagination } from "../model/useCirclePagination";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import * as styles from "./SwiperDate.module.scss";
import { useAnimateSwiper } from "../model/useAnimateSwiper";

export const SwiperDate = ({ data }: { data: CategoryHistoryType }) => {
    const {
        activeIndex,
        activeSlides,
        firstDateStart,
        firstDateEnd,
        lastDateStart,
        lastDateEnd,
        handleSlideChange,
    } = useSwiperDates(data);

    const { positionBullets, rotateCircle } = useCirclePagination({
        dataLength: data.length,
    });
    const swiperCategoryRef = useAnimateSwiper(activeIndex);

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 1224px)",
    });

    return (
        <>
            {Array.isArray(data) && data.length ? (
                <>
                    <Swiper
                        modules={[Pagination, EffectFade, Navigation]}
                        slidesPerView={1}
                        spaceBetween={20}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        className={styles["swiper-date"]}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<div class="${className}" data-category="${
                                    data[index].category
                                }" ><span data-count="${++index}"></span></div>`;
                            },
                        }}
                        navigation={{
                            nextEl: `.${styles["swiper-date"]} .swiper-button-next`,
                            prevEl: `.${styles["swiper-date"]} .swiper-button-prev`,
                        }}
                        onSwiper={(swiper) => {
                            if (isDesktopOrLaptop) {
                                const paginationEl = swiper.pagination
                                    .el as HTMLElement;

                                positionBullets(paginationEl);
                                rotateCircle(paginationEl, swiper.activeIndex);
                            }
                        }}
                        onSlideChange={(swiper: SwiperClass) => {
                            handleSlideChange(swiper);
                            if (isDesktopOrLaptop) {
                                const paginationEl = swiper.pagination
                                    .el as HTMLElement;
                                rotateCircle(paginationEl, swiper.activeIndex);
                            }
                        }}
                    >
                        {data.map(({ id }) => (
                            <SwiperSlide key={id}>
                                <CountUp
                                    start={firstDateStart}
                                    end={firstDateEnd}
                                    duration={1}
                                    separator=""
                                />{" "}
                                <CountUp
                                    start={lastDateStart}
                                    end={lastDateEnd}
                                    duration={1}
                                    separator=""
                                />
                            </SwiperSlide>
                        ))}

                        <div className={styles["swiper-date-actions"]}>
                            <div
                                className={styles["swiper-date-actions__count"]}
                            >
                                {(activeIndex + 1).toString().padStart(2, "0")}/
                                {data.length.toString().padStart(2, "0")}
                            </div>
                            <button
                                className={clsx(
                                    styles["swiper-date-actions__btn"],
                                    "swiper-button-prev"
                                )}
                            ></button>
                            <button
                                className={clsx(
                                    styles["swiper-date-actions__btn"],
                                    "swiper-button-next"
                                )}
                            ></button>
                        </div>
                    </Swiper>
                    <Swiper
                        ref={swiperCategoryRef}
                        modules={[Virtual, Navigation]}
                        virtual
                        breakpoints={{
                            1180: {
                                slidesPerView: 3,
                                spaceBetween: 80,
                            },
                            0: {
                                slidesPerView: 1.5,
                                spaceBetween: 25,
                            },
                        }}
                        className={styles["swiper-category"]}
                        navigation={{
                            nextEl: `.${styles["swiper-category"]} .swiper-button-next`,
                            prevEl: `.${styles["swiper-category"]} .swiper-button-prev`,
                        }}
                    >
                        {activeSlides.map((slide) => (
                            <SwiperSlide key={slide.id} virtualIndex={slide.id}>
                                <div className="">
                                    <p className="">{slide.date}</p>
                                    <p>{slide.content}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className={styles["swiper-category__nav-btns"]}>
                            <button
                                className={clsx(
                                    styles["swiper-category__nav-btn"],
                                    "swiper-button-prev"
                                )}
                            ></button>
                            <button
                                className={clsx(
                                    styles["swiper-category__nav-btn"],
                                    "swiper-button-next"
                                )}
                            ></button>
                        </div>
                    </Swiper>
                </>
            ) : (
                <h2>Data not found</h2>
            )}
        </>
    );
};
