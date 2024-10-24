import { Heading } from "@/components/Heading";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MessagePage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Message"
            description="Read, send, and organize your messages and communication history"
          />
          <Link
            href={"/dashboard/message/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Message
          </Link>
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}
