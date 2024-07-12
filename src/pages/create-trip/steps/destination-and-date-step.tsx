import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { Modal } from "../../../components/modal";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  closeGuestsInput: () => void;
  openGuestsInput: () => void;
  rangeDates: DateRange | undefined;
  setRangeDates: (rangeDates: DateRange | undefined)=> void;
  setDestination: (destination: string) => void;
}

export function DestinationAndDateStep({ isGuestsInputOpen, openGuestsInput, closeGuestsInput, setDestination, rangeDates, setRangeDates}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const displayedDate = rangeDates && rangeDates.from && rangeDates.to
    ? `${format(rangeDates.from, "d 'de' LLL", { locale: ptBR})} até ${format(rangeDates.to, "d 'de' LLL", {locale: ptBR})}`
    : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <label htmlFor="travel-location" className="sr-only">Para onde você vai?</label>
        <input disabled={isGuestsInputOpen} type="text" name="travel-location" id="travel-location" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={event => setDestination(event.target.value)}
        />
      </div>
      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 outline-none text-left w-[240px]">
        <Calendar className="size-5 text-zinc-400" />
        <span className=" text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?" }
        </span>
      </button>

      { isDatePickerOpen && (
        <Modal
          closeModal={closeDatePicker}
          title={"Selecione a data"}
          description={""}
          size="w-auto"
        >
          <DayPicker locale={ptBR} mode="range" min={2} max={30} selected={rangeDates} onSelect={setRangeDates} />
        </Modal>
      )}

      <div className="w-px h-6 bg-zinc-800"/>

      { isGuestsInputOpen ?
        <Button onClick={closeGuestsInput} variant="secondary" >
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
        :
        <Button onClick={openGuestsInput} >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      }
    </div>
  )
}