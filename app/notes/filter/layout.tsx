
import React from "react";
import css from "./FilterLayout.module.css"; // Приклад стилів

interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Додано проп для паралельного маршруту @sidebar
}

const FilterLayout = ({ children, sidebar }: FilterLayoutProps) => {
  return (
    <div className={css.layoutContainer}>
      <aside className={css.sidebarWrapper}>
        {sidebar}
      </aside>
      <main className={css.mainContent}>
        {children}
      </main>
      <div id="modal-root"></div>
    </div>
  );
};

export default FilterLayout;