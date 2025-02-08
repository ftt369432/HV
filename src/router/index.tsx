import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { future } from '@remix-run/router';

// Enable v7 features early
future.v7_startTransition = true;
future.v7_relativeSplatPath = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    // ... your routes
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
); 