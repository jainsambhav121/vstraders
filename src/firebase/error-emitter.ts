
// An event emitter for named events
type Listener<T> = (data: T) => void;

class EventEmitter<T> {
  private listeners: { [event: string]: Listener<T>[] } = {};

  on(event: string, listener: Listener<T>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Listener<T>): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  emit(event: string, data: T): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(listener => listener(data));
  }
}

export const errorEmitter = new EventEmitter<any>();
