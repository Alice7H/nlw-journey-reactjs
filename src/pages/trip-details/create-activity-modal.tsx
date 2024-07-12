import { Calendar, Tag } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal";
import { LabelInput } from "../../components/label-input";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({closeCreateActivityModal} : CreateActivityModalProps) {
  const { tripId } = useParams();

  async function saveActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('travel-activity-title')?.toString();
    const occurs_at = data.get('travel-activity-datetime')?.toString();

    if(!title) return;
    if(!occurs_at) return;

    await api.post(`/trips/${tripId}/activities`, { title, occurs_at})
    window.document.location.reload();
  }

  return (
    <>
      <Modal
        closeModal={closeCreateActivityModal}
        title={"Cadastrar atividade"}
        description={"Todos convidados podem visualizar as atividades."}
      >
        <form onSubmit={saveActivity} className="space-y-3">
          <LabelInput
            type="text"
            name="travel-activity-title"
            placeholder="Qual a atividade?"
            icon={<Tag className="size-5 text-zinc-400"/>}
          />

          <LabelInput
            type="datetime-local"
            name="travel-activity-datetime"
            placeholder="Data e horário da atividade"
            icon={<Calendar className="size-5 text-zinc-400"/>}
          />

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </Modal>
    </>
  )
}