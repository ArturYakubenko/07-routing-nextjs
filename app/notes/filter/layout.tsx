import SideBarNotes from "./@sidebar/SideBarNotes"

interface FilterLayoutProps {
    children: React.ReactNode
}

const FilterLayout = ({children}: FilterLayoutProps) => {
    return (
        <div>
            <SideBarNotes/>
            {children}
            <div id="modal-root">
            </div>
        </div>
    )
}

export default FilterLayout