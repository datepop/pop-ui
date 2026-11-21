import { useState } from "react";

import { Modal } from ".";
import { Button } from "../Button";

import type { Meta, StoryObj } from "@storybook/react-vite";

export default {
  title: "Core/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>;

export const DefaultModal: StoryObj<typeof Modal> = {
  args: {
    children: "test",
    opened: true,
    centered: false,
  },
};

export const OpenAndClose: StoryObj<typeof Modal> = {
  name: "열기와 닫기",
  parameters: { layout: "centered" },
  render: function Example() {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Button onClick={() => setOpened(true)}>예약 정보 보기</Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          size="xs"
          title="예약 정보"
          withCloseButton
          closeButtonProps={{ "aria-label": "닫기" }}
          centered
        >
          <div style={{ paddingInline: 16 }}>예약 내용을 확인하세요.</div>
        </Modal>
      </>
    );
  },
};
