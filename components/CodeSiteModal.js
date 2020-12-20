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
  Code,
  Text,
  Input,
  Flex
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import { useAuth } from '@/lib/auth';
import { PresenceContext } from 'framer-motion';

const CodeSiteModal = ({ site, children, route }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();
  const [siteInput, setSiteInput] = useState(site?.id);
  const [routeInput, setRouteInput] = useState(route !== undefined ? route : '')

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
              <Text>
              Copy the below code Including the siteID, you may choose to add a route name if you wish to have seperate feedback for each page
              </Text>
              <Flex alignItems='center' mt={2}>
              <Text whiteSpace='nowrap'>
                Site ID
                </Text>
                <Input value={siteInput} ml={2} onChange={(event) => setSiteInput(event.target.value)}/>
                </Flex>
                <Flex alignItems='center' mb={2}>
                <Text>
                Route (Optional)
                </Text>
                <Input value={routeInput} ml={2} onChange={(event) => setRouteInput(event.target.value)} />
                </Flex>
              
            <Code overflowX='scroll' maxW='100%'>
<pre>
{`
<iframe
src="https://fastfeedback-blush.vercel.app/embed/${siteInput}${routeInput !== '' ? '/' : ''}${routeInput}"
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