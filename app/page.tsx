"use client"
import type React from "react"

import { useState } from "react"

export default function Home() {
  const [userInput, setUserInput] = useState("")
  const [generatedTicket, setGeneratedTicket] = useState("")
  const [editableTicket, setEditableTicket] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: userInput }),
      })
      const data = await response.json()
      setGeneratedTicket(data.ticket)
      setEditableTicket(data.ticket)
      setIsEditing(false)
    } catch (error) {
      console.error("Error generating ticket:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setGeneratedTicket(editableTicket)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditableTicket(generatedTicket)
    setIsEditing(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedTicket)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset success message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Jira Ticket Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="description" className="block text-md font-medium text-gray-700">
              Enter your ticket description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              placeholder="Describe your issue here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              maxLength={1000}
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">{userInput.length}/1000 characters</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 btn btn-primary text-white"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Ticket"}
            </button>
          </div>
        </form>
        {generatedTicket && (
          <div className="mt-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="border-b border-dashed border-gray-300 pb-4">
                  <h3 className="text-lg font-bold">GENERATED TICKET DESCRIPTION</h3>
                </div>
                {isEditing ? (
                  <textarea
                    className="font-mono text-sm w-full h-64 p-2 border border-gray-300 rounded"
                    value={editableTicket}
                    onChange={(e) => setEditableTicket(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="font-mono text-sm whitespace-pre-wrap">{generatedTicket}</div>
                )}
                <div className="border-t border-dashed border-gray-300 pt-4 text-xs text-gray-500">
                  Generated on: {new Date().toLocaleString()}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm btn btn-primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm btn btn-primary"
                      onClick={handleEdit}
                    >
                      Edit Ticket
                    </button>
                    <button type="button" className="mt-3 w-full sm:w-auto sm:mt-0 btn" onClick={handleCopy}>
                      {copySuccess ? "Copied!" : "Copy to Clipboard"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

