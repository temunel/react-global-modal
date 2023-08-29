import { FormEvent, useState } from "react";
import Modal from "react-modal";

type FormElements<U extends string> = HTMLFormControlsCollection &
  Record<U, HTMLInputElement>;

interface User {
  username: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

/**
 * This is for pseudo syntax, just to demonstrate.
 */
async function fetchAPI(...args: unknown[]): Promise<User> {
  // Let's pretend there is an actual implementation.
  return args as never;
}

export default function ModalDemo() {
  const [user, setUser] = useState<User | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function afterOpenModal() {
    // Preload User.
    loadUser();
  }

  async function loadUser() {
    const user = await fetchAPI("get", "user");
    setUser(user);
  }

  async function editUser(partialUser: Partial<User>) {
    const newUser = await fetchAPI("patch", "user", partialUser);
    setUser(newUser);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as FormElements<keyof User>;
    const username = elements.username.value;
    const avatar = elements.avatar.value;
    const firstName = elements.firstName.value;
    const lastName = elements.lastName.value;

    await editUser({ username, avatar, firstName, lastName });
    setIsModalOpen(false);
  }

  return (
    <div className="section">
      <h2>Update User</h2>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <h2>A react-modal example</h2>
        <p>I am a modal</p>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" defaultValue={user?.username} />
          <input type="text" name="avatar" defaultValue={user?.avatar} />
          <input type="text" name="firstName" defaultValue={user?.firstName} />
          <input type="text" name="lastName" defaultValue={user?.lastName} />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
}
