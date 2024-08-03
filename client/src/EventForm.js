import { useState } from 'react';
import { Box, Button, Input, Textarea, Stack } from '@chakra-ui/react';

const EventForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState( (initialData !== null && initialData !== undefined) ? initialData.name:'');
  const [description, setDescription] = useState((initialData !== null && initialData !== undefined) ? initialData.description:'');
  const [date, setDate] = useState((initialData !== null && initialData !== undefined) ? initialData.date:'');
  const [location, setLocation] = useState((initialData !== null && initialData !== undefined) ? initialData.location:'');

  const handleSubmit = (e) => {
    e.preventDefault();
    (initialData !== null && initialData !== undefined) ? onSubmit({ name, description,date,location, id: initialData.id }):onSubmit({ name, description,date,location});
    setName('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} mb={8}>
      <Stack spacing={4}>
        <Input 
          placeholder="Event Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <Input
          type="date"
          variant="outline"
          value={date}
          placeholder="Event Date"
          focusBorderColor="teal.500"
          onChange={(e) => setDate(e.target.value)} 
        />
        <Input 
          placeholder="Event Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <Textarea 
          placeholder="Event Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <Stack direction="row" spacing={4}>
          <Button colorScheme="teal" type="submit">Save</Button>
          <Button colorScheme="gray" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EventForm;
