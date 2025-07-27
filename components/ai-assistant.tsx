"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface AIAssistantProps {
  userName: string
}

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

const aiSuggestions = [
  "What are the safest routes to Koramangala?",
  "Show me low-crime areas for evening walks",
  "Which areas should I avoid at night?",
  "Crime trends in Whitefield this week",
]

export default function AIAssistant({ userName }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messageHistory, setMessageHistory] = useState<Message[]>([])

  useEffect(() => {
    const initialMessage: Message = {
      id: "1",
      type: "ai",
      content: `Hi ${userName} 👋 Planning to explore Bangalore? Ask me for safe routes or low-crime areas!`,
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [userName])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("safe") || lowerMessage.includes("route")) {
      return "🛡️ For safe routes, I recommend:\n\n• Whitefield to Koramangala via Outer Ring Road\n• Jayanagar area is generally safe for evening walks\n• Avoid Majestic and Shivajinagar after 9 PM\n\nWould you like specific route recommendations?"
    }

    if (lowerMessage.includes("avoid") || lowerMessage.includes("night")) {
      return "🌙 Areas to avoid at night:\n\n• Majestic (High crime rate: 45 incidents)\n• Shivajinagar (38 recent incidents)\n• Isolated areas in Brigade Road\n\nStay in well-lit, populated areas and consider using ride-sharing services."
    }

    if (lowerMessage.includes("whitefield")) {
      return "📊 Whitefield Safety Report:\n\n• Crime Rate: Low (8 incidents this month)\n• Safety Score: 9/10\n• Best for: Families, evening walks\n• Peak safe hours: 6 AM - 10 PM\n\nWhitefield is one of Bangalore's safest areas!"
    }

    if (lowerMessage.includes("koramangala")) {
      return "📍 Koramangala Analysis:\n\n• Crime Rate: Medium (22 incidents)\n• Popular areas: 5th Block, Forum Mall vicinity\n• Safest times: 7 AM - 9 PM\n• Main concerns: Theft, minor vandalism\n\nGenerally safe but stay alert in crowded areas."
    }

    return "🤖 I can help you with:\n\n• Safe route planning\n• Area crime statistics\n• Best times to visit locations\n• Emergency contact information\n\nWhat specific information do you need about Bangalore's safety?"
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 animate-bounce"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 bg-black/90 backdrop-blur-md border-white/20 z-50 flex flex-col">
          <CardHeader className="pb-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center space-x-2">
                <Bot className="h-5 w-5 text-blue-400" />
                <span>AI Safety Assistant</span>
              </CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === "ai" && <Bot className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />}
                      {message.type === "user" && <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />}
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-white/10">
                <div className="text-xs text-gray-400 mb-2">Quick questions:</div>
                <div className="space-y-1">
                  {aiSuggestions.slice(0, 2).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(suggestion)}
                      className="w-full text-left text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                  placeholder="Ask about safety..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
