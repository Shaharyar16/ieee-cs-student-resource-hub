import type { Destination } from '@/types';

export const destinations: Destination[] = [
  { id: 'dest-101', name: 'Room 101', typeId: 'dt-classroom', floor: 'Ground Floor', description: 'Standard lecture room, capacity 60' },
  { id: 'dest-102', name: 'Room 102', typeId: 'dt-classroom', floor: 'Ground Floor', description: 'Standard lecture room, capacity 60' },
  { id: 'dest-lab1', name: 'Lab 1', typeId: 'dt-lab', floor: 'Ground Floor', description: 'General purpose computer lab' },
  { id: 'dest-lab2', name: 'Lab 2', typeId: 'dt-lab', floor: 'First Floor', description: 'General purpose computer lab' },
  { id: 'dest-ai-lab', name: 'AI Lab', typeId: 'dt-lab', floor: 'First Floor', description: 'GPU-equipped lab for AI/ML coursework' },
  { id: 'dest-dld-lab', name: 'DLD Lab', typeId: 'dt-lab', floor: 'First Floor', description: 'Digital Logic Design hardware lab' },
  { id: 'dest-lab3', name: 'Lab 3', typeId: 'dt-lab', floor: 'First Floor', description: 'Networking and systems lab' },
  { id: 'dest-faculty-office', name: 'Faculty Office', typeId: 'dt-faculty', floor: 'Second Floor', description: 'Shared faculty office block' },
  { id: 'dest-dept-office', name: 'Department Office', typeId: 'dt-dept', floor: 'Ground Floor', description: 'CS Department administrative office' },
  { id: 'dest-seminar-hall', name: 'Seminar Hall', typeId: 'dt-seminar', floor: 'Ground Floor', description: 'Main seminar and event hall' },
];
