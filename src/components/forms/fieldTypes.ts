import {
  Type,
  AlignLeft,
  Mail,
  Hash,
  Calendar,
  ChevronDownSquare,
  CircleDot,
  CheckSquare,
  Paperclip,
  ImageIcon,
  type LucideIcon,
} from 'lucide-react';
import type { FormFieldType } from '@/types';

export const fieldTypeMeta: Record<FormFieldType, { label: string; icon: LucideIcon; hasOptions: boolean }> = {
  'short-text': { label: 'Short text', icon: Type, hasOptions: false },
  'long-text': { label: 'Paragraph', icon: AlignLeft, hasOptions: false },
  email: { label: 'Email', icon: Mail, hasOptions: false },
  number: { label: 'Number', icon: Hash, hasOptions: false },
  date: { label: 'Date', icon: Calendar, hasOptions: false },
  dropdown: { label: 'Dropdown', icon: ChevronDownSquare, hasOptions: true },
  radio: { label: 'Single choice', icon: CircleDot, hasOptions: true },
  checkbox: { label: 'Checkboxes', icon: CheckSquare, hasOptions: true },
  file: { label: 'File upload', icon: Paperclip, hasOptions: false },
  image: { label: 'Image upload', icon: ImageIcon, hasOptions: false },
};

export const fieldTypeOrder: FormFieldType[] = [
  'short-text',
  'long-text',
  'email',
  'number',
  'date',
  'dropdown',
  'radio',
  'checkbox',
  'file',
  'image',
];
