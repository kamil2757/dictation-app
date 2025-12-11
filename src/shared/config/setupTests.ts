import '@testing-library/jest-dom';

// 1. Mock matchMedia (уже был)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 2. Mock MessageChannel (уже был)
window.MessageChannel = class MessageChannel {
  port1 = {
    onmessage: null,
    postMessage: jest.fn(),
    start: jest.fn(),
    close: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MessagePort;
  
  port2 = {
    onmessage: null,
    postMessage: jest.fn(),
    start: jest.fn(),
    close: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  } as unknown as MessagePort;
} as any;

// 3. === НОВОЕ: Mock ResizeObserver (Критично для Select/Dropdown) ===
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 4. === НОВОЕ: Mock Pointer Events и Scroll (Нужно для кликов и прокрутки) ===
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.setPointerCapture = jest.fn();