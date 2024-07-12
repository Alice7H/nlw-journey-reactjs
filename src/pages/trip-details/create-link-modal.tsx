import { Link2, Tag} from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal";
import { LabelInput } from "../../components/label-input";

interface CreateLinkModaProps {
  closeCreateLinkModal: () => void;
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModaProps) {
  const { tripId } = useParams();

  async function saveLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get('travel-link-title')?.toString();
    const url = data.get('travel-link-url')?.toString();

    if(!title) return;
    if(!url) return;

    await api.post(`/trips/${tripId}/links`, { title, url })
    window.document.location.reload();
  }

  return (
    <>
      <Modal closeModal={closeCreateLinkModal}
      title={"Cadastrar link"}
      description={"Todos convidados podem visualizar os links."}
      >
        <form onSubmit={saveLink} className="space-y-3">
          <LabelInput
            type="text"
            name="travel-link-title"
            placeholder="Título do link"
            icon={<Tag className="size-5 text-zinc-400"/>}
          />

          <LabelInput
            type="text"
            name="travel-link-url"
            placeholder="URL"
            icon={<Link2 className="size-5 text-zinc-400"/>}
          />

          <Button type="submit" size="full">Salvar link </Button>
        </form>
      </Modal>
    </>
  )
}