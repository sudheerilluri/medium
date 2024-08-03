import { Box, Button, Heading, Text, Stack } from '@chakra-ui/react';

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Heading as="h3" size="md">{event.name}</Heading>
      <Text mt={2}>{event.date}</Text>
      <Text mt={2}>{event.location}</Text>
      <Text mt={2}>{event.description}</Text>
      <Stack direction="row" mt={4} spacing={4}>
        <Button colorScheme="blue" onClick={() => onEdit(event)}>Edit</Button>
        <Button colorScheme="red" onClick={() => onDelete(event.id)}>Delete</Button>
      </Stack>
    </Box>
  );
};

export default EventCard;
