import { AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { Modal } from "../../components/modal";

interface InviteGuestToTripsModalProps {
  closeInviteGuestsModal: () => void;
}

export function InviteGuestToTripModal({ closeInviteGuestsModal }: InviteGuestToTripsModalProps) {
  const { tripId } = useParams();

  async function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("travel-guests-email")?.toString();
    if(!email) return;

    await api.post(`/trips/${tripId}/invites`, { email })
    window.document.location.reload();
  }

  return (
    <>
      <Modal
        closeModal={closeInviteGuestsModal}
        title={"Adicionar convidados"}
        description={"Os convidados irão receber e-mails para confirmar a participação na viagem."}
      >
        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="size-5 text-zinc-400"/>
            <label htmlFor="travel-guests-email" className="sr-only">Digite o e-mail do convidado</label>
            <input
              type="email"
              name="travel-guests-email"
              id="travel-guests-email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </Modal>
    </>
  )
}