import * as styles from './Title.module.scss';

type TitleProps = {
    content: string;
}

export const Title = ({ content }: TitleProps) => {
    return (
        <div className={styles.title}>
            <h1 className={styles.title__content}>{content}</h1>
        </div>
    )
}
