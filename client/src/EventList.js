import { Box, Heading } from '@chakra-ui/react';
import EventCard from './EventCard';

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={6}>Events</Heading>
      {events.map(event => (
        <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </Box>
  );
};

export default EventList;
