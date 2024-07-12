import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Participant } from "../../types/participant";
import { InviteGuestToTripModal } from "./invite-guest-to-trip-modal";

export function Guests() {
  const {tripId} = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen]= useState(false);

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants));
  },[tripId])

  const openInviteGuestsModal = () => setIsInviteGuestModalOpen(true);
  const closeInviteGuestsModal = () => setIsInviteGuestModalOpen(false);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        { participants.map((participant, index) => (
          <div className="flex items-center justify-between gap-4" key={participant.id}>
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{participant.name || `Convidado ${index}`}</span>
              <span className="block text-zinc-400 text-sm truncate">
                {participant.email}
              </span>
            </div>
            {
              participant.is_confirmed
              ? <CheckCircle2 className="text-lime-300 size-5 shrink-0" />
              : <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            }
          </div>
        ))}
      </div>
      <Button variant="secondary" size="full" onClick={openInviteGuestsModal}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      { isInviteGuestModalOpen && <InviteGuestToTripModal closeInviteGuestsModal={closeInviteGuestsModal}/> }
    </div>
  )
}