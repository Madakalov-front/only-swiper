import * as styles from './Title.module.scss';

type TitleProps = {
    content: string;
}

export const Title = ({ content }: TitleProps) => {
    return (
        <h1 className={styles.title}>{content}</h1>
    )
}
