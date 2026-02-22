// simple job scheduler for periodic tasks
// like refreshing news cache, cleanup, etc
class TaskScheduler {
  constructor() {
    this.tasks = new Map();
  }
  schedule(name, fn, intervalMs) {
    if (this.tasks.has(name)) {
      console.warn(`Task "${name}" already scheduled, skipping`);
      return;
    }
    const id = setInterval(async () => {
      try {
        console.log(`[Scheduler] Running "${name}"`);
        await fn();
      } catch (err) {
        console.error(`[Scheduler] "${name}" failed:`, err.message);
      }
    }, intervalMs);
    this.tasks.set(name, { id, interval: intervalMs, fn });
    console.log(`[Scheduler] Scheduled "${name}" every ${intervalMs / 1000}s`);
  }
  cancel(name) {
    const task = this.tasks.get(name);
    if (task) {
      clearInterval(task.id);
      this.tasks.delete(name);
    }
  }
  cancelAll() {
    for (const [name] of this.tasks) this.cancel(name);
  }
  list() {
    return Array.from(this.tasks.entries()).map(([name, t]) => ({ name, interval: t.interval }));
  }
}
module.exports = TaskScheduler;
