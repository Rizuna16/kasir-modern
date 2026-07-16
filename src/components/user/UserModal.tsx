import type { ReactNode } from "react";

import Modal from "../ui/Modal";

interface Props {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;
}

export default function UserModal({
  isOpen,

  title,

  children,

  onClose,
}: Props) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      {children}
    </Modal>
  );
}
