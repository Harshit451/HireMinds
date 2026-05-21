// Database layer - MongoDB/Prisma style ODM
// Demonstrates: SQL/NoSQL databases, Mongoose ODM, Prisma ORM

import { User, Job, Application } from '../types';
import { sampleJobs } from '../data/jobs';

// In-memory database with localStorage persistence
class Collection<T extends { id: string }> {
  private data: T[] = [];
  private storageKey: string;

  constructor(name: string, initialData: T[] = []) {
    this.storageKey = `hireminds_${name}`;
    this.load(initialData);
  }

  private load(initialData: T[]) {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      } else {
        this.data = initialData;
        this.save();
      }
    } catch {
      this.data = initialData;
    }
  }

  private save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch {}
  }

  // Mongoose/Prisma style methods
  async findAll(filter?: Partial<T>): Promise<T[]> {
    if (!filter) return [...this.data];
    return this.data.filter(item => {
      return Object.entries(filter).every(([key, value]) => 
        (item as any)[key] === value
      );
    });
  }

  async findById(id: string): Promise<T | null> {
    return this.data.find(item => item.id === id) || null;
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.data.find(item => {
      return Object.entries(filter).every(([key, value]) => 
        (item as any)[key] === value
      );
    }) || null;
  }

  async create(item: Omit<T, 'id'> & { id?: string }): Promise<T> {
    const newItem = {
      ...item,
      id: item.id || crypto.randomUUID()
    } as T;
    this.data.push(newItem);
    this.save();
    return newItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T | null> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return null;
    this.data[index] = { ...this.data[index], ...updates };
    this.save();
    return this.data[index];
  }

  async deleteById(id: string): Promise<boolean> {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    this.save();
    return true;
  }

  async search(query: string, fields: (keyof T)[]): Promise<T[]> {
    const lower = query.toLowerCase();
    return this.data.filter(item => {
      return fields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lower);
        }
        if (Array.isArray(value)) {
          return value.some(v => String(v).toLowerCase().includes(lower));
        }
        return false;
      });
    });
  }
}

// Database collections
export const Users = new Collection<User & { passwordHash: string }>('users', []);
export const Jobs = new Collection<Job>('jobs', sampleJobs);
export const Applications = new Collection<Application>('applications', []);

// Prisma-style db object
export const db = {
  users: Users,
  jobs: Jobs,
  applications: Applications
};
