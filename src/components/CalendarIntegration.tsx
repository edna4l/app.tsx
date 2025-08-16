import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Plus, ExternalLink, Clock, MapPin } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  type: 'pride' | 'social' | 'date' | 'community';
  synced: boolean;
}

const CalendarIntegration: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Pride Brunch',
      date: 'Tomorrow',
      time: '11:00 AM',
      location: 'Rainbow Cafe',
      attendees: 12,
      type: 'pride',
      synced: true
    },
    {
      id: '2',
      title: 'Lesbian Book Club',
      date: 'Friday',
      time: '7:00 PM',
      location: 'Central Library',
      attendees: 8,
      type: 'community',
      synced: false
    },
    {
      id: '3',
      title: 'Coffee Date with Sam',
      date: 'Saturday',
      time: '2:00 PM',
      location: 'Bean There Cafe',
      attendees: 2,
      type: 'date',
      synced: true
    }
  ]);

  const [connectedCalendars, setConnectedCalendars] = useState([
    { name: 'Google Calendar', connected: true },
    { name: 'Apple Calendar', connected: false },
    { name: 'Outlook', connected: false }
  ]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'pride': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'social': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'date': return 'bg-red-100 text-red-700 border-red-200';
      case 'community': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const syncEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, synced: true } : event
      )
    );
  };

  const connectCalendar = (calendarName: string) => {
    setConnectedCalendars(prev =>
      prev.map(cal => 
        cal.name === calendarName ? { ...cal, connected: true } : cal
      )
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h2 className="wedding-heading rainbow-header">Calendar</h2>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500">
          <Plus className="w-4 h-4 mr-1" />
          Add Event
        </Button>
      </div>

      {/* Connected Calendars */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Connected Calendars</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {connectedCalendars.map((calendar) => (
            <div key={calendar.name} className="flex items-center justify-between">
              <span className="text-sm">{calendar.name}</span>
              {calendar.connected ? (
                <Badge className="bg-green-100 text-green-700">Connected</Badge>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => connectCalendar(calendar.name)}
                >
                  Connect
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{event.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Badge className={getEventColor(event.type)} variant="outline">
                  {event.type}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{event.attendees} attending</span>
                {!event.synced ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => syncEvent(event.id)}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Sync
                  </Button>
                ) : (
                  <Badge className="bg-green-100 text-green-700 text-xs">Synced</Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarIntegration;