import { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Code
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/auth';
import { PresenceContext } from 'framer-motion';

const CodeSiteModal = ({ site, children, route }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        mr={2}
        onClick={() => {setIsOpen(true)}}
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Copy Iframe Snippet
          </AlertDialogHeader>
          <AlertDialogBody>
            <Code overflowX='scroll' maxW='100%'>
<pre>
{`
<iframe
src="https://fastfeedback-blush.vercel.app/embed/${site?.id}${route !== undefined ? '/'+route : ''}"
width="100%"
height="2000px"
/>
`}
</pre>

            </Code>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CodeSiteModal;