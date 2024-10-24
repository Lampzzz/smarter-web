import { ScrollArea } from "@/components/ui/scroll-area";
import MessageNewForm from "../_components/form/newForm";

export const metadata = {
  title: "Dashboard: New Message",
};

export default function NewShelterPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <MessageNewForm />
      </div>
    </ScrollArea>
  );
}
