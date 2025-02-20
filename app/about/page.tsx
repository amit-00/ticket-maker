"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"

export default function About() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setMessage("");
    } else {
        setSubmitStatus("error");
    }

    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="btn btn-link mx-0 px-0 text-black mb-4 no-underline hover:underline">
          &larr; Back to Ticket Generator
        </Link>
        <h1 className="text-3xl font-bold mb-8">About</h1>
        <p>I&apos;m a software engineer that hates having to write out Jira ticket descriptions. I started using LLM&apos;s to write them for me. Figured this might be a useful tool that gives a bit of consistency. Please try not to burn through my tokens.</p>
        <br />
        <p>Feel free to leave any suggestions or requests you have for the app.</p>
        <br />

        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-md font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-md font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 btn btn-primary text-white">
              Send Message
            </button>
          </div>
          {submitStatus === "success" && 
            <div className="toast">
              <div className="alert alert-success text-white">
                <span>Message sent successfully!</span>
              </div>
            </div>}
          {submitStatus === "error" && 
            <div className="toast">
              <div className="alert alert-error text-white">
                <span>An error occurred. Please try again.</span>
              </div>
            </div>}
        </form>
      </div>
    </div>
  )
}

