/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EventCategory = 'infantil' | 'casamento' | 'corporativo' | 'formatura' | 'geral';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  imageSeed: string; // Used for consistent Picsum images
  minQuantity: number;
  basePrice: number; // estimated base price per item
  colors: string[]; // hex or color names
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  eventType: string;
  avatarSeed: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CustomizationState {
  productId: string;
  color: string;
  font: string;
  customText: string;
  quantity: number;
  eventType: EventCategory | 'outro';
  clientName: string;
  clientPhone: string;
  eventDate: string;
}
