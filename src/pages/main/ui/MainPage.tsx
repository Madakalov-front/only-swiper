
import { SwiperContainers } from '@/widgets/swiper-containers';
import * as styles from './MainPage.module.scss';

export const MainPage = () => {
    return (
        <main className={styles['main-page']}>
            <div className="container">
                <SwiperContainers />
            </div>
        </main>
    )
}
