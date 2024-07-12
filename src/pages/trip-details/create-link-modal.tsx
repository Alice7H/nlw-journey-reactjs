import { Link2, Tag} from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal";

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
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400"/>
            <label htmlFor="travel-link-title" className="sr-only">Título do link</label>
            <input
              type="text"
              name="travel-link-title"
              id="travel-link-title"
              placeholder="Título do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="size-5 text-zinc-400"/>
            <label htmlFor="travel-link-url" className="sr-only">URL</label>
            <input
              type="text"
              name="travel-link-url"
              id="travel-link-url"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size="full">Salvar link </Button>
        </form>
      </Modal>
    </>
  )
}