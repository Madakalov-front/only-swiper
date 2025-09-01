import { CategoryHistoryType } from '@/shared/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules';

export const SwiperDate = ({ data }: { data: CategoryHistoryType }) => {
    // я предполагаю, что данные отсортированы на стороне бека, поэтому не буду искать min/max
    return (
        Array.isArray(data) && data.length ?
            <Swiper modules={[Pagination]} pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                    return `<span className="${className}">${data[index].category}</span>`
                },
            }}>
                {data.map(({ id, category, content_category }) => {
                    const firstDate = content_category[0].date;
                    const lastDate = content_category.length >= 2 ? content_category.at(-1)?.date : content_category[0].date;
                    return (
                        <SwiperSlide key={id}>
                            {firstDate}  {lastDate}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            : (<h2>Data not found</h2>)
    )
}
