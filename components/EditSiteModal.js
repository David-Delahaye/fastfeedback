import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
  Switch
} from '@chakra-ui/react';
import { createSite, updateSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/router';

const EditSiteModal = ({ site, children }) => {
  const settings = site?.settings;
  const initialRef = useRef();
  const toast = useToast();
  const { user } = useAuth();
  const route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  //const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  const onEditSite = (props) => {
    const settings = { settings: props };
    updateSite(site.id, settings);

    // mutate(
    //   ['/api/sites', user.token],
    //   async (data) => ({ sites: [{ id, ...newSite }, ...data.sites] }),
    //   false
    // );
    // const newSite = {
    //   authorId: user.uid,
    //   createdAt: new Date().toISOString(),
    //   name,
    //   url
    // };

    // const { id } = createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've updated your site.",
      status: 'success',
      duration: 5000,
      isClosable: true
    });

    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontWeight="medium"
        maxWidth="fit-content"
        variant="outline"
        backgroundColor="gray.900"
        color="white"
        size="md"
        _hover={{ bg: 'gray.800' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}>
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onEditSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl display="flex">
              <FormLabel htmlFor="show-icons">
                Show Account Type Icons
              </FormLabel>
              <Switch
                colorScheme="green"
                id="show-icons"
                name="icons"
                defaultIsChecked={settings?.icons}
                ref={register()}
              />
            </FormControl>

            <FormControl display="flex">
              <FormLabel htmlFor="show-timestamp">Show Timestamp</FormLabel>
              <Switch
                colorScheme="green"
                id="show-timestamp"
                name="timestamp"
                defaultIsChecked={settings?.timestamp}
                ref={register()}
              />
            </FormControl>

            <FormControl display="flex">
              <FormLabel htmlFor="show-ratings">Show Ratings</FormLabel>
              <Switch
                colorScheme="green"
                id="show-ratings"
                name="ratings"
                defaultIsChecked={settings?.ratings}
                ref={register()}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="green" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSiteModal;
