"use client"
import { Card } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"

interface TodoItem {
    text: string
    checked: boolean
}

interface ListItemProps {
    item: TodoItem
    changeText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    changeChecked: (checked: boolean) => void
}

export default function ListItem({ item, changeText, changeChecked }: ListItemProps) {
    const { text, checked } = item

    return (
        <Card className="flex space-x-2 p-4">
            <Checkbox checked={checked} onCheckedChange={changeChecked} />
            <Textarea value={text} onChange={changeText} className="min-h-[2.5rem] resize-y" />
        </Card>
    )
}