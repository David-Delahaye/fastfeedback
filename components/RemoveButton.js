import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useAuth } from '@/lib/auth';

export default function RemoveButton({ feedbackId }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { user } = useAuth();

  const onDelete = () => {
    deleteFeedback(feedbackId);

    mutate(
      ['/api/feedback', user.token],
      async (data) => {
        return {
          feedback: data.feedback.filter(
            (feedback) => feedback.id !== feedbackId
          )
        };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete Feedback"
        variant="ghost"
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
