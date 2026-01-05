import Link from "next/link"
import css from "./SideBarNotes.module.css"


 const SideBarNotes = () => {
  return (
    <div className={css.container}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/All`} className={css.menuLink}>
            All notes
          </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Personal`} className={css.menuLink}>
          personal
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Work`} className={css.menuLink}>
          work
        </Link>
      </li>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/Todo`} className={css.menuLink}>
          todo
        </Link>
      </li>
    </ul>
    </div>
   
  )
}

export default SideBarNotes