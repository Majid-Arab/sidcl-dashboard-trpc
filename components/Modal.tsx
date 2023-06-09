import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, TextInput } from "@mantine/core";

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        <TextInput placeholder="Your name" label="Full name" withAsterisk />
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
}
