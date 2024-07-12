import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Trip } from "../../types/trip";
import { ptBR } from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { EditTripModal } from "./edit-trip-modal";

export function DestinationAndDateHeader() {
  const {tripId} = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);

  const openEditTripModal = () => setIsEditTripModalOpen(true);
  const closeEditTripModal = () => setIsEditTripModalOpen(false);

  useEffect(()=> {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
  },[tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d").concat(' até ').concat(format(trip.ends_at, "d 'de' LLLL", {locale: ptBR}))
    : null;

  return (
    <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400"/>
          <span className="text-zinc-100 text-lg">
            {trip?.destination}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400"/>
            <span className="text-zinc-100 text-lg">
              { displayedDate }
            </span>
          </div>
          <div className="w-px h-6 bg-zinc-800"/>
          <Button variant="secondary" onClick={openEditTripModal}>
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        </div>

        {
          isEditTripModalOpen && <EditTripModal closeEditTripModal={closeEditTripModal}/>
        }
      </header>
  )
}