import { Title } from '@/shared/ui';
import { SwiperDate } from '@/entities/swiper-date';
import { dataSwiper } from '../model/mocks';
import * as styles from './SwiperContainer.module.scss';

export const SwiperContainers = () => {
    return (
        <section className={styles['swiper-containers']}>
            <Title content='Исторические даты' />
            <SwiperDate data={dataSwiper} />
        </section>
    )
}
