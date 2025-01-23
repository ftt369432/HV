import React from 'react';

const testimonials = [
  {
    content: "HealthVibes has completely transformed my approach to wellness. The personalized plans make it so easy to stay on track.",
    author: "Sarah Johnson",
    role: "Fitness Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    content: "The mental wellness features have helped me maintain balance in my busy life. It's like having a personal wellness coach.",
    author: "Michael Chen",
    role: "Tech Professional",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  },
  {
    content: "I've tried many wellness apps, but HealthVibes stands out with its holistic approach and intuitive interface.",
    author: "Emma Rodriguez",
    role: "Yoga Teacher",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  return (
    <div id="testimonials" className="bg-gray-50 dark:bg-gray-800 py-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Loved by wellness enthusiasts
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Here's what our community has to say about their HealthVibes journey
          </p>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.image}
                  alt={testimonial.author}
                />
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}