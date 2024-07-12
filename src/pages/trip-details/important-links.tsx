import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { Link } from "../../types/link";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

export function ImportantLinks() {
  const [isCreateLinkModalOpen, setCreateLinkModalOpen] = useState(false);
  const openCreateLinkModal = () => setCreateLinkModalOpen(true);
  const closeCreateLinkModal = () => setCreateLinkModalOpen(false);

  const {tripId} = useParams();
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links));
  },[tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        { links.map(link => (
          <div className="flex items-center justify-between gap-4" key={link.id}>
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <a href={link.url} target="_blank" className="block text-zinc-400 text-xs truncate hover:text-zinc-200">
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>
      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      { isCreateLinkModalOpen && <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />}
    </div>
  )
}