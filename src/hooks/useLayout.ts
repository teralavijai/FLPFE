import { useEffect, useState } from "react";

const STORAGE_KEY = "fedlearn-sidebar-collapsed";

export default function useLayout() {
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "true";
    });

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, String(collapsed));
    }, [collapsed]);

    return {
        collapsed,
        mobileOpen,

        toggleCollapsed: () =>
            setCollapsed((prev) => !prev),

        openMobileDrawer: () =>
            setMobileOpen(true),

        closeMobileDrawer: () =>
            setMobileOpen(false),
    };
}
