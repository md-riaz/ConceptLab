import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { router } from '../../app/router';

describe('Routing Tests - Checkpoint 1', () => {
  it('should render Home page at root route', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText('Algorithm Visualizer')).toBeInTheDocument();
    expect(screen.getByText('Watch every concept step out in real time')).toBeInTheDocument();
  });

  it('should render Topics list page', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/topics'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByRole('heading', { name: 'All Topics', level: 1 })).toBeInTheDocument();
  });

  it('should render Topic detail page with slug parameter', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/topics/bubble-sort'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByRole('heading', { name: 'Bubble Sort', level: 1 })).toBeInTheDocument();
  });

  it('should render Visualizer page with algoId parameter', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/visualizer/bubble-sort'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText('Choose an algorithm, hit start, and watch each step play out in real time')).toBeInTheDocument();
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });

  it('should render Paths list page', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/paths'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByRole('heading', { name: 'Learning Paths', level: 1 })).toBeInTheDocument();
  });

  it('should render Path detail page with pathId parameter', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/paths/dsa-beginner'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByRole('heading', { name: 'DSA & CS Fundamentals Path', level: 1 })).toBeInTheDocument();
  });

  it('should render Settings page', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/settings'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByRole('heading', { name: 'Settings', level: 1 })).toBeInTheDocument();
  });

  it('should render Header and Footer on all pages', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });
    
    render(<RouterProvider router={testRouter} />);
    expect(screen.getAllByText(/ConceptLab/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Built to help learners visualize abstract processes step-by-step/)).toBeInTheDocument();
  });
});
