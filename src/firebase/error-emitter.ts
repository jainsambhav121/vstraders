
type Listener = (data: any) => void;

class EventEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, listener: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off(event: string, listener: Listener): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
  }

  emit(event: string, data: any): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(listener => listener(data));
  }
}

export const errorEmitter = new EventEmitter();
