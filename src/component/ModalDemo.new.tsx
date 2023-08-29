import "react-modal-global/styles/layouts.scss";
import "react-modal-global/styles/modal.scss";

import { FormEvent } from "react";
import { PopupLayout, useModalWindow } from "react-modal-global";

import Modal from "./Modal.new";

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
  async function openModal() {
    // Get User that will be edited.
    const user = await fetchAPI("get", "user");
    Modal.open(PopupEditUserForm, { user });
  }

  return (
    <div className="section">
      <h2>Update User</h2>
      <button onClick={openModal}>Open Modal</button>
    </div>
  );
}

interface PopupEditUserFormProps {
  user: User;
  onSave?(newUser: User): void;
}

function PopupEditUserForm(props: PopupEditUserFormProps) {
  const modal = useModalWindow();

  async function editUser(partialUser: Partial<User>) {
    const newUser = await fetchAPI("patch", "user", partialUser);
    return newUser;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget.elements as FormElements<keyof User>;
    const username = elements.username.value;
    const avatar = elements.avatar.value;
    const firstName = elements.firstName.value;
    const lastName = elements.lastName.value;

    const newUser = await editUser({ username, avatar, firstName, lastName });
    props.onSave?.(newUser);

    // Closing popup from itself.
    modal.close();
  }

  return (
    <PopupLayout>
      <h2>A react-modal-global example</h2>
      <p>I am a modal</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" defaultValue={props.user.username} />
        <input type="text" name="avatar" defaultValue={props.user.avatar} />
        <input
          type="text"
          name="firstName"
          defaultValue={props.user.firstName}
        />
        <input type="text" name="lastName" defaultValue={props.user.lastName} />
        <button type="submit">Save</button>
      </form>
    </PopupLayout>
  );
}
