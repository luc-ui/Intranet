import styles from '../styles/components/Publis.module.css'

export default function Afficher({ children, publi }) {
    return (
        <section className={styles.section} key={publi.id}>
            <div className={styles.header}>
                <h4 className={styles.title}>{publi.title}</h4>
                <p className={styles.strass}>Le {publi.date} par {publi.strassName}</p>
            </div>
            <div dangerouslySetInnerHTML={{__html: publi.content}} className={styles.content}/>
            {children}
        </section>
    )
}