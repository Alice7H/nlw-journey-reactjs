import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale/pt-BR";
import { Modal } from "../../components/modal";
import { LabelInput } from "../../components/label-input";

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
        <LabelInput
          type="text"
          name="travel-user-name"
          placeholder="Seu nome completo"
          icon={<User className="size-5 text-zinc-400"/>}
          onChange={(event)=> setOwnerName(event.target.value)}
        />

        <LabelInput
          type="email"
          name="travel-user-email"
          placeholder="Seu e-mail pessoal"
          icon={<Mail className="size-5 text-zinc-400"/>}
          onChange={(event)=> setOwnerEmail(event.target.value)}
        />

        <Button type="submit" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}