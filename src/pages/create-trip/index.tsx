import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/inivite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    "diego@rocketseat.com.br",
    "john@acme.com",
  ]);

  const openGuestsInput = () => setIsGuestsInputOpen(true);
  const closeGuestsInput = ()  => setIsGuestsInputOpen(false);
  const openGuestsModal = () => setIsGuestsModalOpen(true);
  const closeGuestsModal = () => setIsGuestsModalOpen(false);
  const openConfirmTripModal = () => setIsConfirmTripModalOpen(true);
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false);

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('travel-guests-email')?.toString();

    if(!email) return;
    if(emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList);
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/trips/123");
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <header className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="logo plann.er" />
          <h1 className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</h1>
        </header>

        <main className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
          />

          { isGuestsInputOpen  && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </main>

        <footer className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso </a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </footer>
      </div>

      { isGuestsModalOpen &&
        <InviteGuestModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      }

      { isConfirmTripModalOpen &&
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      }
    </div>
  )
}
