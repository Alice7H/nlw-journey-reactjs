import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale/pt-BR";
import { Modal } from "../../components/modal";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  rangeDates: DateRange | undefined;
  destination: string;
}

export function ConfirmTripModal({closeConfirmTripModal, createTrip, setOwnerName, setOwnerEmail, rangeDates, destination}: ConfirmTripModalProps) {
  const dates = rangeDates && rangeDates.from && rangeDates.to
    ? {from: format(rangeDates.from, "d 'de' LLL", { locale: ptBR}), to: format(rangeDates.to, "d 'de' LLL", { locale: ptBR})}
    : null;

  return (
    <Modal
      closeModal={closeConfirmTripModal}
      title={"Confirmar criação da viagem"}
      description={<>Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">{destination}</span> nas datas de <span className="text-zinc-100 font-semibold">{dates?.from} a {dates?.to}</span> preencha seus dados abaixo:</>}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="size-5 text-zinc-400"/>
          <label htmlFor="travel-user-name" className="sr-only">Seu nome completo</label>
          <input
            type="text"
            name="travel-user-name"
            id="travel-user-name"
            placeholder="Seu nome completo"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={(event) => setOwnerName(event.target.value)}
          />
        </div>

        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Mail className="size-5 text-zinc-400"/>
          <label htmlFor="travel-user-email" className="sr-only">Seu e-mail pessoal</label>
          <input
            type="email"
            name="travel-user-email"
            id="travel-user-email"
            placeholder="Seu e-mail pessoal"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            onChange={(event)=> setOwnerEmail(event.target.value)}
          />
        </div>

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}