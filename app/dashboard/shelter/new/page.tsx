import { ScrollArea } from "@/components/ui/scroll-area";
import ShelterNewForm from "../_components/form/newForm";

export const metadata = {
  title: "New Shelter",
};

export default function NewShelterPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <ShelterNewForm />
      </div>
    </ScrollArea>
  );
}
