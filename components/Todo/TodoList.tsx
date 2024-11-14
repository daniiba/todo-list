"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

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

    const handleDelete = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    useEffect(() => {
        if (items.length > 0) {
            const stringData = JSON.stringify(items)
            const newUrl = `${window.location.pathname}?data=${stringData}`
            window.history.pushState({}, '', newUrl)
        } else {
            // Clear URL when no items
            window.history.pushState({}, '', window.location.pathname)
        }
    }, [items])

    if (!mounted) {
        return null
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>
            
            <div className="space-y-3">
                {items.map((item, index) => (
                    <Card key={index} className="flex items-start gap-4 p-4 hover:shadow-md transition-shadow">
                        <Checkbox 
                            checked={item.checked} 
                            onCheckedChange={(checked) => handleChangeChecked(checked as boolean, index)}
                            className="mt-2"
                        />
                        <Textarea
                            value={item.text}
                            onChange={(e) => handleChangeText(e.target.value, index)}
                            className="flex-1 resize-none border-none focus:ring-0 p-1"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(index)}
                            className="mt-1 text-gray-500 hover:text-red-500"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>

            <div className="mt-6">
                <Card className="flex items-start gap-4 p-4 hover:shadow-md transition-shadow">
                    <Checkbox checked={false} disabled className="mt-2 opacity-50" />
                    <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add new todo (press Enter)"
                        className="flex-1 resize-none border-none focus:ring-0 p-1"
                    />
                </Card>
            </div>
        </div>
    )
}