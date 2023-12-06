import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
export default function ThemeSwitchBtn() {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["light"]));
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setSelectedKeys(new Set([localStorage.getItem("theme")||'light']))
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const handleAction = (key) => {
        setTheme(key)
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="capitalize"
                >
                    {theme}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys as any}
                onAction={(key) => {
                    handleAction(key)
                }}
            >
                <DropdownItem key="light">light</DropdownItem>
                <DropdownItem key="dark">dark</DropdownItem>
                <DropdownItem key="purple-dark">purple-dark</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
