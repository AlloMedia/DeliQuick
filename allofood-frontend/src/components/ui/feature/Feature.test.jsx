import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feature from './Feature';
import { servicesData } from "../../../constants/services-data";

describe('Feature Component', () => {
  test('renders all service items from servicesData', () => {
    render(<Feature />);

    servicesData.forEach((service, index) => {
      // Check if the title is rendered
      expect(screen.getByText(service.title)).toBeInTheDocument();

      // Check if the description text is rendered
      expect(screen.getByText(service.text.trim())).toBeInTheDocument();

      // Check if the image is rendered with the correct src
      const images = screen.getAllByRole('img');
      expect(images[index]).toHaveAttribute('src', service.imageUrl);
    });

    // Check if the correct number of service items are rendered
    const serviceItems = screen.getAllByRole('img');
    expect(serviceItems).toHaveLength(servicesData.length);
  });

  test('applies correct CSS classes', () => {
    render(<Feature />);

    // Check image classes
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveClass('inline-block mx-auto w-24 mb-3');
    });

    // Check title classes
    const titles = screen.getAllByRole('heading', { level: 5 });
    titles.forEach(title => {
      expect(title).toHaveClass('font-semibold text-xl mb-3');
    });

    // Check description classes
    const descriptions = screen.getAllByText(/Lorem, ipsum dolor sit amet/);
    descriptions.forEach(desc => {
      expect(desc).toHaveClass('text-gray-600 text-base');
    });
  });

});