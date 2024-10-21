import { Separator } from "@/components/ui/separator";

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-zinc-500">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <div className="space-y-4"></div>
    </div>
  );
}
