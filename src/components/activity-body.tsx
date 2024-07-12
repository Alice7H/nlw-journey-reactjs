import { format } from "date-fns";
import { CircleCheck, CircleDashed } from "lucide-react";

interface ActivityBodyProps {
  activity: {
    occurs_at: string;
    title: string;
  };
}
export function ActivityBody({ activity }: ActivityBodyProps) {
  return(
    <div className="space-y-2.5">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        {
        (activity.occurs_at > new Date(Date.now()).toISOString())
        ? <CircleDashed className="size-5 text-zinc-400" />
        : <CircleCheck className="size-5 text-lime-300" />
        }
        <span className="text-zinc-100">{activity.title}</span>
        <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, "hh:mm")}h</span>
      </div>
    </div>
  )
}