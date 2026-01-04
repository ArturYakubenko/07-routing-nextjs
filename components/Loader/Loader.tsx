import css from "./Loader.module.css"

const Loader = () => {
    return (     
        <div className={css.loader}>
            <p>Loading, please wait...</p>
        </div>
       
    )
}

export default Loader