import { Calendar, Tag } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal";

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
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400"/>
            <label htmlFor="travel-activity-title" className="sr-only">Qual a atividade?</label>
            <input
              type="text"
              name="travel-activity-title"
              id="travel-activity-title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400"/>
            <label htmlFor="travel-activity-datetime" className="sr-only">Data e horário da atividade</label>
            <input
              type="datetime-local"
              name="travel-activity-datetime"
              id="travel-activity-datetime"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </Modal>
    </>
  )
}