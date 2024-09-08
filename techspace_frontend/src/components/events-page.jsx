'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, MapPin, Gamepad, PlusCircle } from 'lucide-react'

// Mock data for events
const events = [
  {
    id: 1,
    title: "Fortnite Tournament",
    date: "2023-07-15",
    location: "Online",
    price: 500,
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    title: "CS:GO Championship",
    date: "2023-07-22",
    location: "Nairobi, Kenya",
    price: 1000,
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 3,
    title: "League of Legends Showdown",
    date: "2023-07-29",
    location: "Online",
    price: 750,
    image: "/placeholder.svg?height=400&width=600"
  }
]

export function EventsPageJsx() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleRegister = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsModalOpen(false)
      alert('Payment successful! You are registered for the event.')
    }, 2000)
  }

  return (
    (<div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">GamersHub Events</h1>
        </div>
      </header>
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Gaming background"
            className="w-full h-full object-cover object-center opacity-50" />
        </div>
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">Level Up Your Gaming Experience</h2>
            <p className="text-xl mb-8">Join epic tournaments, connect with fellow gamers, and showcase your skills in the ultimate gaming events platform.</p>
            <div className="space-x-4">
              <Button
                size="lg"
                onClick={() => document.getElementById('events-list').scrollIntoView({ behavior: 'smooth' })}>
                <Gamepad className="mr-2 h-5 w-5" /> Explore Events
              </Button>
              <Button size="lg" variant="outline">
                <PlusCircle className="mr-2 h-5 w-5" /> Create Event
              </Button>
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 py-8">
        <h2 id="events-list" className="text-2xl font-semibold mb-6">Upcoming Gaming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">KES {event.price}</span>
                  <Button onClick={() => handleRegister(event)}>Register</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Enter your M-Pesa number to complete the registration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter M-Pesa number"
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handlePayment} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay KES ${selectedEvent?.price}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)
  );
}