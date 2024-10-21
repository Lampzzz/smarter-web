import { Separator } from "@/components/ui/separator";

export default function Appearance() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-zinc-500">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <div className="space-y-4"></div>
    </div>
  );
}
