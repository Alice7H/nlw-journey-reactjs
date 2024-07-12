import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface ActivityHeaderProps {
  activityDate: string
}

export function ActivityHeader({activityDate}: ActivityHeaderProps) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-zinc-300 text-xl font-semibold">Dia {format(activityDate, "d")}</span>
      <span className="text-zinc-500 text-xs">{format(activityDate, "eeee", {locale: ptBR})}</span>
    </div>
  )
}