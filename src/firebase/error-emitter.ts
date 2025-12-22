
// A simple event emitter
type Listener<T> = (data: T) => void;

class EventEmitter<T> {
  private listeners: Listener<T>[] = [];

  on(listener: Listener<T>): void {
    this.listeners.push(listener);
  }

  off(listener: Listener<T>): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }
}

export const errorEmitter = new EventEmitter<any>();
