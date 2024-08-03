import { useState,useEffect } from 'react';
import { supabase } from './supabaseClient';
import { ChakraProvider, Container, Button,Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EventList from './EventList';
import EventForm from './EventForm';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
      const session = supabase.auth.getSession();
    setUsers(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsers(session?.user ?? null);
    });
    
    const fetchEvents = async () => {
      try {
        const { data: { user } } = await  supabase.auth.getUser();
        let evlist = user.id;
        const response = await axios.get('http://localhost:5000/events',{
          params: {
            userid: evlist,
          }});
        setEvents(response.data); // Assuming the response data is an array of events
      } catch (err) {
        console.log(err.message || 'Error fetching events');
      }
    };
    fetchEvents();
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAddOrUpdateEvent = async (event) => {
    if (event.id) {
        let jdata = JSON.stringify({
          name: event.name,
          description:event.description,
          location:event.location,
          date:event.date
        });
          await axios.put(`http://localhost:5000/events/:${event.id}`,jdata,{headers:
          {"Content-Type" : "application/json"}});
      setEvents(events.map(e => (e.id === event.id ? event : e)));
    } else {
          let jdata = JSON.stringify({
            id: Date.now(),
            userid:users.id,
            name: event.name,
            description:event.description,
            location:event.location,
            date:event.date
          });
            await axios.post(`http://localhost:5000/events`,jdata,{headers:
            {"Content-Type" : "application/json"}});
      setEvents([...events, { ...event, id: Date.now() }]);
    }
    setIsFormVisible(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  };

  const handleDeleteEvent = async (id) => {
    const response = await axios.delete(`http://localhost:5000/events/${id}`);
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={8}>
        <Flex justifyContent="space-between" mb={4}>
          <Button colorScheme="teal" onClick={() => { setEditingEvent(null); setIsFormVisible(true); }}>
            Create Event
          </Button>
          <Button mr={8} colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
    
        {isFormVisible && (
          <EventForm 
            onSubmit={handleAddOrUpdateEvent} 
            initialData={editingEvent} 
            onCancel={() => setIsFormVisible(false)} 
          />
        )}
        <EventList 
          events={events} 
          onEdit={handleEditEvent} 
          onDelete={handleDeleteEvent} 
        />
      </Container>
    </ChakraProvider>
  );
}

export default Events;
