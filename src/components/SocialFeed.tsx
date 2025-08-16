import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from './EventCard';
import { Plus, Calendar, Users, MapPin } from 'lucide-react';

const SocialFeed: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: 10
  });

  const mockEvents = [
    {
      id: '1',
      title: 'Pride Book Club Meetup',
      description: 'Join us for our monthly book discussion! This month we\'re reading "Red: A Crayon\'s Story"',
      date: 'March 15, 2024',
      time: '7:00 PM',
      location: 'Rainbow Café, Downtown',
      attendees: 8,
      maxAttendees: 15,
      tags: ['Books', 'Community', 'Discussion'],
      organizer: 'Sarah Chen',
      isAttending: false
    },
    {
      id: '2',
      title: 'Queer Hiking Adventure',
      description: 'Let\'s explore nature together! Family-friendly hike with beautiful views.',
      date: 'March 18, 2024',
      time: '9:00 AM',
      location: 'Sunset Trail, Mountain Park',
      attendees: 12,
      maxAttendees: 20,
      tags: ['Outdoors', 'Hiking', 'Nature'],
      organizer: 'Alex Rivera',
      isAttending: true
    },
    {
      id: '3',
      title: 'Lesbian Speed Dating Night',
      description: 'Meet new people in a fun, relaxed environment! Ages 25-40.',
      date: 'March 22, 2024',
      time: '6:30 PM',
      location: 'The Rainbow Room',
      attendees: 24,
      maxAttendees: 30,
      tags: ['Dating', 'Social', 'Networking'],
      organizer: 'Maya Patel',
      isAttending: false
    }
  ];

  const mockPosts = [
    {
      id: '1',
      author: 'Jordan Kim',
      content: 'Just moved to the city! Looking for queer-friendly coffee shops and bookstores. Any recommendations? 🌈',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 5
    },
    {
      id: '2',
      author: 'Riley Martinez',
      content: 'Amazing turnout at last night\'s poetry slam! So proud of our community 💕',
      timestamp: '5 hours ago',
      likes: 28,
      comments: 8
    }
  ];

  const handleCreateEvent = () => {
    console.log('Creating event:', newEvent);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: 10
    });
    setShowCreateEvent(false);
  };

  const handleJoinEvent = (eventId: string) => {
    console.log('Joining event:', eventId);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="feed" className="wedding-heading">Community Feed</TabsTrigger>
          <TabsTrigger value="events" className="wedding-heading">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Create Post */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-4">
              <Textarea
                placeholder="Share something with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-3 border-pink-200 focus:border-pink-400"
              />
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                Share Post
              </Button>
            </CardContent>
          </Card>

          {/* Posts */}
          {mockPosts.map(post => (
            <Card key={post.id} className="border-pink-200">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{post.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-3">{post.content}</p>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <button className="hover:text-pink-500">❤️ {post.likes}</button>
                  <button className="hover:text-pink-500">💬 {post.comments}</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {/* Create Event Button */}
          <Button
            onClick={() => setShowCreateEvent(!showCreateEvent)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 mb-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>

          {/* Create Event Form */}
          {showCreateEvent && (
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 mb-4">
              <CardContent className="p-4 space-y-3">
                <Input
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Textarea
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
                <Input
                  placeholder="Location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateEvent} className="flex-1">Create</Button>
                  <Button variant="outline" onClick={() => setShowCreateEvent(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Events List */}
          {mockEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onJoin={handleJoinEvent}
            />
          ))}
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default SocialFeed;