import { ptBR } from "date-fns/locale/pt-BR";
import { MapPin, X } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { LabelInput } from "../../components/label-input";

interface EditTripModalProps {
  closeEditTripModal: () => void;
}
export function EditTripModal({closeEditTripModal}: EditTripModalProps) {
  const { tripId } = useParams();
  const [destination, setDestination] = useState("");
  const [rangeDates, setRangeDates] = useState<DateRange | undefined>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
      const data = response.data.trip;
      setDestination(data.destination);
      setRangeDates({ from: data.starts_at, to: data.ends_at});
    })
  }, [tripId])

  async function editTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(tripId, destination, rangeDates);

    if(!rangeDates?.from) return;
    if(!rangeDates?.to) return;

    await api.put(`/trips/${tripId}`, { destination, starts_at: rangeDates?.from, ends_at: rangeDates?.to})
    window.document.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form onSubmit={editTrip} className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione o destino e a data</h2>
            <button type="button" onClick={closeEditTripModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>

          <LabelInput
            type="text"
            name="travel-location"
            placeholder="Para onde você vai?"
            icon={<MapPin className="size-5 text-zinc-400" />}
            onChange={event => setDestination(event.target.value)}
            value={destination}
          />
        </div>

        <DayPicker locale={ptBR} mode="range"
          min={2} max={30}
          selected={rangeDates}
          onSelect={setRangeDates}
        />

        <Button variant="primary" size="full">
          Atualizar viagem
        </Button>
      </form>
    </div>
  )
}