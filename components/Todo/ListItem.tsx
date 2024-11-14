"use client"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

interface TodoItem {
    text: string
    checked: boolean
}

interface ListItemProps {
    item: TodoItem
    changeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    changeChecked: (checked: boolean) => void
    onDelete: () => void
}

export default function ListItem({ item, changeText, changeChecked, onDelete }: ListItemProps) {
    const { text, checked } = item

    return (
        <Card className="flex items-start gap-4 p-4">
            <Checkbox checked={checked} onCheckedChange={changeChecked} className="mt-2" />
            <Textarea 
                value={text} 
                onChange={changeText} 
                className="flex-1 resize-none border-none focus:ring-0 p-1" 
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                className="mt-1 text-gray-500 hover:text-red-500"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </Card>
    )
}