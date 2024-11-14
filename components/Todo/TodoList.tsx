"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

type TodoItem = {
    checked: boolean;
    text: string
}

export default function TodoList() {
    const [mounted, setMounted] = useState(false)
    const [items, setItems] = useState<TodoItem[]>(() => {
        if (typeof window === 'undefined') return []
        const params = new URLSearchParams(window.location.search)
        const data = params.get('data')
        return data ? JSON.parse(data) : []
    })
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
            e.preventDefault()
            setItems(prev => [...prev, { checked: false, text: inputText }])
            setInputText("")
        }
    }

    const handleChangeText = (text: string, index: number) => {
        setItems(prev => {
            const newArray = [...prev]
            newArray[index] = { checked: prev[index].checked, text }
            return newArray
        })
    }

    const handleChangeChecked = (checked: boolean, index: number) => {
        setItems(prev => {
            const newArray = [...prev]
            newArray[index] = { checked, text: prev[index].text }
            return newArray
        })
    }

    useEffect(() => {
        if (items.length > 0) {
            const stringData = JSON.stringify(items)
            const newUrl = `${window.location.pathname}?data=${stringData}`
            window.history.pushState({}, '', newUrl)
        }
    }, [items])

    if (!mounted) {
        return null
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Todo List</h1>
            
            <div className="space-y-4">
                {items.map((item, index) => (
                    <Card key={index} className="flex space-x-2 p-4">
                        <Checkbox 
                            checked={item.checked} 
                            onCheckedChange={(checked) => handleChangeChecked(checked as boolean, index)}
                        />
                        <Textarea
                            value={item.text}
                            onChange={(e) => handleChangeText(e.target.value, index)}
                            className="min-h-[2.5rem] resize-y"
                        />
                    </Card>
                ))}
            </div>

            <div className="mt-6">
                <Card className="flex space-x-2 p-4">
                    <Checkbox checked={false} disabled />
                    <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add new todo (press Enter)"
                        className="min-h-[2.5rem] resize-y"
                    />
                </Card>
            </div>
        </div>
    )
}