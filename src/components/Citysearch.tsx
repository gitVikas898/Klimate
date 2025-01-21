import { useState } from "react";
import { Button } from "./ui/button"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Search } from "lucide-react";

const Citysearch = () => {

    const [open , setOpen] = useState(false);
    // const [query , setQuery] = useState("");
    return (
        <>

            <Button 
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            onClick={()=>setOpen(true)}>
                <Search className="mr-2 h-4 w-4"></Search>
                Search Cities...</Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="This feature is not built i am working on this " />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

        </>
    )
}

export default Citysearch