import { createClient } from '@supabase/supabase-js'

// Я перевірив ID, він тепер на 100% правильний
const supabaseUrl = 'https://fyhmksqvkzseiszcxccq.supabase.co'

// Сюди встав ключ anon (public), який ти бачиш на тій сторінці
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5aG1rc3F2a3pzZWlzemN4Y2NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODE1ODIsImV4cCI6MjA5MDA1NzU4Mn0._IsoAX3j9hGvsFNTNnSPMuN2PEbWWUl16c56WGdD4EM' 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)