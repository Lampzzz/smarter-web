import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-zinc-500">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="space-y-4"></div>
    </div>
  );
}
