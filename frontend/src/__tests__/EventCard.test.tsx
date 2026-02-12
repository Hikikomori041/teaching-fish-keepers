import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import { render } from "@testing-library/react";
import EventCard from "../components/EventCard";
import type { Event } from "../types";

const dom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = dom.window as unknown as Window & typeof globalThis;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;

test("renders event details", () => {
  const event: Event = {
    id: 1,
    title: "Atelier aquarium",
    description: "Nettoyage et entretien",
    date: "2024-01-01T10:00:00.000Z",
    end_date: null,
    location: "Nancy",
    image_url: "https://example.com/aquarium.jpg",
    max_participants: 12,
    created_at: "2024-01-01T09:00:00.000Z",
    updated_at: "2024-01-01T09:00:00.000Z",
  };

  const { getByText, getByAltText } = render(<EventCard event={event} />);

  expect(getByText("Atelier aquarium")).toBeInTheDocument();
  expect(getByText("Nettoyage et entretien")).toBeInTheDocument();
  expect(getByText("Nancy")).toBeInTheDocument();
  expect(getByText("12 participants max")).toBeInTheDocument();
  expect(getByAltText("Atelier aquarium")).toBeInTheDocument();
});
